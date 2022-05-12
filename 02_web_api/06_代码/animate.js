"use strict";

/**
 * 动画原理
 * 1.获得盒子当前位置
 * 2.让盒子在当前位置加上1个移动距离
 * 3.利用定时器不断重复这个操作
 * 4.加一个结束定时器的条件
 * 5.注意此元素需要添加定位，才能使用element.style.left
 *
 * @param obj 元素对象
 * @param target 距离
 * @param callback 回调函数
 */
function animate(obj, target, callback) {
    // 当不断点击按钮，这个元素的速度会越来越快，因为开启了多个定时器
    // 解决方法：让元素只有一个定时器执行
    // 先清除以前的定时器，只保留当前的一个定时器执行
    clearInterval(obj.timer);

    // 给不同的元素指定了不同的定时器
    obj.timer = setInterval(function () {
        if (obj.offsetLeft === target) {
            clearInterval(obj.timer);
            // 执行回调函数
            callback && callback();
        }

        // 缓动动画公式：(目标值 - 现在位置) / 10
        // 把步长值改为整数，不要出现小数
        let step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        obj.style.left = obj.offsetLeft + step + "px";
    }, 15);
}