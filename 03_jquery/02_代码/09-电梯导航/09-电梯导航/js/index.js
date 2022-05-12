"use strict";

$(function () {
    // 当点击了li，此时不需要执行页面滚动事件里面的li的背景选择、添加current
    // 节流阀/互斥锁
    let flag = true;

    // 品优购电梯导航
    // 当滚动到今日推荐模块，就让电梯导航显示出来
    // 因为电梯导航模块和内容区模块一一对应
    // 当点击电梯导航某个小模块，就可以拿到当前小模块的索引号
    // 就可以把animate要移动的距离求出来：当前索引号内容区模块的offset().top

    // 显示、隐藏电梯导航
    toggleTool();

    function toggleTool() {
        $(window).scroll(function () {
            let toolTop = $(".recommend").offset().top;

            if ($(document).scrollTop() >= toolTop) {
                $(".fixedtool").fadeIn();
            } else {
                $(".fixedtool").fadeOut();
            }
        });
    }

    $(window).scroll(function () {
        toggleTool();

        if (flag) {
            // 页面滚动到某个内容区域，左侧电梯导航li相应添加和删除current类名
            // 触发事件是页面滚动，因此这个功能要写到页面滚动事件里面
            // 需要用到each，遍历内容区域大模块。each里面能拿到内容区域每一个模块元素和索引号
            // 判断条件：被卷去的头部大于等于内容区域里面每个模块的offset().top
            $(".floor .w").each(function (i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
                }
            });
        }
    });

    // 点击电梯导航页面可以滚动到相应内容区域
    $(".fixedtool li").click(function () {
        let current = $('.floor .w').eq($(this).index()).offset().top;
        $("body, html").stop().animate({
            scrollTop: current
        }, function () {
            flag = true;
        });

        // 点击之后，当前li添加背景颜色current类，其他移除
        $(this).addClass("current").siblings().removeClass();

        flag = false;
    });
});