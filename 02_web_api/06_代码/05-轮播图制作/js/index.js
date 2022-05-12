"use script";

window.onload = function () {
    // 获取元素
    let arrowLeft = document.querySelector(".arrow-l");
    let arrowRight = document.querySelector(".arrow-r");
    let focus = document.querySelector(".focus");
    let focusWidth = focus.offsetWidth;

    // 自动播放轮播图（类似于点击了右侧按钮）
    let timer = setInterval(function () {
        // 收到调用点击事件
        arrowRight.click();
    }, 2000);

    // 鼠标经过focus，显示按钮、停止定时器
    focus.addEventListener("mouseenter", function () {
        arrowLeft.style.display = "block";
        arrowRight.style.display = "block";

        clearInterval(timer);
        timer = null; // 清除定时器变量
    });

    // 鼠标离开focus，隐藏按钮、开启定时器
    focus.addEventListener("mouseleave", function () {
        arrowLeft.style.display = "none";
        arrowRight.style.display = "none";

        timer = setInterval(function () {
            // 收到调用点击事件
            arrowRight.click();
        }, 2000);
    });

    // 动态生成小圆圈
    let ul = focus.querySelector("ul");
    let ol = focus.querySelector(".circle");

    for (let i = 0; i < ul.children.length; i++) {
        // 创建li
        let li = document.createElement("li");
        // 通过自定义属性，记录当前小圆圈的索引号
        li.setAttribute("index", i);
        // li插入到ol中
        ol.appendChild(li);
        // 绑定点击事件
        li.addEventListener("click", function () {
            // 清除其他li的current类
            for (let j = 0; j < ol.children.length; j++) {
                ol.children[j].className = "";
            }

            // 当前li留下current
            this.className = "current"

            // 点击移动图片（移动的是ul）
            let index = this.getAttribute("index");
            // 当点击了某个li，就要把这个li的索引号赋给num、circle
            num = circle = index;
            animate(ul, -(index * focusWidth));
        });
    }

    // 设置第一个li为current
    ol.children[0].className = "current";

    // 克隆第一张图片（li）放到ul最后面
    let first = ul.children[0].cloneNode(true);
    ul.appendChild(first);

    // 点击右侧按钮，图片滚动一张
    let num = 0;
    // circle控制小圆圈的播放
    let circle = 0;
    // 节流阀：当上一个函数动画内容执行完毕，再去执行下一个函数动画，让事件无法连续触发
    // 实现思路：利用回调函数，添加一个变量来控制，锁住函数和解锁函数
    let flag = true; // 节流阀

    // 点击右侧按钮移动
    arrowRight.addEventListener("click", function () {
        if (flag) {
            flag = false; // 关闭节流阀

            // 如果走到了最后复制的最后一张图片，此时ul要快速复原left改为0
            if (num === ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }

            num++;
            animate(ul, -(num * focusWidth), function () {
                flag = true; // 打开节流阀
            });

            // 点击右侧按钮，小圆圈跟随一起变化
            circle++;
            // 如果circle === 4，说明走到了克隆的最后图片
            circle = circle === ol.children.length ? 0 : circle;

            circleChange();
        }
    });

    // 点击左侧按钮移动
    arrowLeft.addEventListener("click", function () {
        if (flag) {
            flag = false;

            // 如果走到了最后复制的最后一张图片，此时ul要快速复原left改为0
            if (num === 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + "px";
            }

            num--;
            animate(ul, -(num * focusWidth), function () {
                flag = true;
            });

            // 点击右侧按钮，小圆圈跟随一起变化
            circle--;
            // 如果circle < 0，说明当前是第一张图片，则小圆圈改为第4个小圆圈
            circle = circle < 0 ? ol.children.length - 1 : circle;

            circleChange();
        }
    });

    function circleChange() {
        // 先清除当前的小圆圈的current类名
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = "";
        }
        // 留下当前的小圆圈的current类名
        ol.children[circle].className = "current";
    }
};
