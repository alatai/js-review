"use strict";

$(function () {
    // 刷新页面不会丢失数据，因此需要用到本地存储localStorage
    // 注意：不管按下回车，还是点击复选框，都是把本地存储的数据加载到页面中，这样保证刷新页面不会丢失数据
    // 存储的数据格式：let todolist = [{title: "xxx", done: false}];

    // 按下回车，把完整数据存储到本地存储
    $("#title").on("keydown", function (evt) {
        if (evt.which === 13) {
            if ($(this).val() === "") {
                alert("请输入！");
            } else {
                // 先读取本地存储原来的数据
                let local = getDate();
                // 更新数据，替换本地存储原有数据
                local.push({title: $(this).val(), done: false});
                saveData(local);
                loadData();
                $(this).val("");
            }
        }
    });

    // 读取本地存储数据
    function getDate() {
        let date = localStorage.getItem("todolist");

        // 本地存储中的数据时字符串格式，需要转换为对象格式
        return date != null ? JSON.parse(date) : [];
    }

    // 保存本地存储数据
    function saveData(date) {
        localStorage.setItem("todolist", JSON.stringify(date));
    }

    // 渲染加载数据
    loadData();

    function loadData() {
        // 读取本地存储数据
        let date = getDate();
        let todoCount = 0; // 正在进行的个数
        let doneCount = 0; // 已经完成的个数

        // 遍历之前先要清空ol/ul里面的元素内容
        $("ol, ul").empty();
        // 遍历数据
        $.each(date, function (i, ele) {
            if (ele.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked'><p>" +
                    ele.title + "</p><a href='javascript:;' id='" + i + "'></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox'><p>" +
                    ele.title + "</p><a href='javascript:;' id='" + i + "'></a></li>");
                todoCount++;
            }
        });

        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }

    // todolist删除操作
    // 不仅删除li，还要删除本地存储对应的数据
    // 先获取本地存储数据，删除对应数据，保存给本地存储，重新渲染列表li
    // 可以给链接自定义属性记录当前的索引号
    // 根据这个索引号删除相关的数据，数组的splice(i, 1)方法
    // 存储修改后的数据，然后添加到本地存储
    // 重新渲染加载数据列表
    // 因为<a></a>是动态创建的，使用on()方法绑定事件
    $("ol").on("click", "a", function () {
        // 获取本地存储数据
        let date = getDate();
        // 修改数据
        let index = $(this).attr("id");
        date.splice(index, 1);
        // 保存到本地存储
        saveData(date);
        // 重新渲染页面
        loadData();
    });

    // todolist正在进行和已完成选项操作
    // 点击了小复选框，修改本地存储数据，再重新渲染数据列表
    // 点击之后，获取本地数据
    // 修改对应数据属性done为当前复选框的checked状态
    // 之后保存数据到本地存储
    // 重新渲染加载数据列表
    // load加载函数里面，新增一个条件，如果当前数据的done为true就是已完成的，就把列表渲染加载到ul里面
    $("ol, ul").on("click", "input", function () {
        let date = getDate();
        let index = $(this).siblings("a").attr("id");
        date[index].done = $(this).prop("checked");
        console.log(date);
        saveData(date);
        loadData();
    });
});