window.addEventListener('load', function () {
    // ①自动播放
    // ②开启定时器
    // ③移动端移动，可以使用translate移动
    // ④想要图片缓慢移动，添加过度效果

    // 获取元素
    let focus = document.querySelector('.focus');
    let ul = focus.children[0];
    let width = focus.offsetWidth; // focus的宽度
    let ol = focus.children[1];

    // 利用定时器自动轮播图片
    let index = 0;
    let timer = setInterval(function () {
        index++;
        let translateX = -index * width;
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translateX + 'px)';
    }, 2000);

    // 过度完成之后，使用监听过渡完成事件判断，完成无缝滚动
    ul.addEventListener('transitionend', function () {
        // 如果索引号为3，则说明走到最后一张图片，此时索引号要复原为0
        if (index >= 3) {
            index = 0;
            let translateX = -index * width;
            // 此时图片，去掉过渡效果，然后移动
            ul.style.transition = 'none';
            ul.style.transform = 'translateX(' + translateX + 'px)';
        } else if (index < 0) { // 如果索引号小于0，说明是倒着走，索引号等于2
            index = 2;
            let translateX = -index * width;
            ul.style.transition = 'none';
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }

        // 小圆点跟随变化效果
        // ol里面li带有current类名的选出来去掉类名remove
        ol.querySelector('.current').classList.remove('current');
        // 让当前索引号的li加上current add
        ol.children[index].classList.add('current');
    });

    // 手指滑动轮播图
    // 本质就是ul跟随手指移动，简单说就是移动端拖动元素
    // 触摸元素touchstart：获取手指初始坐标
    let startX = 0;
    let moveX = 0;
    let isMoved = false;
    ul.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        // 手指触摸时停止定时器
        clearInterval(timer);
    });

    // 移动手指touchmove：计算手指的滑动距离，并且移动盒子
    ul.addEventListener('touchmove', function (e) {
        // 计算移动距离
        moveX = e.targetTouches[0].pageX - startX;
        // 移动盒子 = 盒子原理的位置 + 手指移动的距离
        let translateX = -index * width + moveX;
        // 手指拖动的时候，不需要动画效果，所以要取消过渡
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translateX + 'px)';

        // 如果用户手指移动过，再去判断否则不做判断效果
        isMoved = true;
        e.preventDefault(); // 阻止滚动屏幕行为
    });

    // 离开手指touchend：根据滑动的距离分不同的情况
    ul.addEventListener('touchend', function (e) {
        if (isMoved) {
            // 如果移动距离大于某个像素就上一张/下一张滑动
            if (Math.abs(moveX) > 50) {
                // moveX > 0 右滑，上一张
                if (moveX > 0) {
                    index--;
                } else { // moveX < 0 左滑，下一张
                    index++
                }

                let translateX = -index * width;
                ul.style.transition = 'all .3s';
                ul.style.transform = 'translateX(' + translateX + 'px)';
            } else { // 如果移动距离小于某个像素，就回弹原来的位置
                let translateX = -index * width;
                ul.style.transition = 'all .1s';
                ul.style.transform = 'translateX(' + translateX + 'px)';
            }
        }

        // 手指离开重新开启定时器
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            let translateX = -index * width;
            ul.style.transition = 'all .3s';
            ul.style.transform = 'translateX(' + translateX + 'px)';
        }, 2000);
    });

    // 返回顶部模块制作
    // 滚动到某个地方显示
    // 事件：scroll页面滚动事件
    let goBack = document.querySelector('.goBack');
    let nav = document.querySelector('nav');

    window.addEventListener('scroll', function () {
        // 如果被卷去的头部（window。pageYOffset)大于某个数值
        if (window.pageYOffset >= nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    });

    // 点击，window.scroll(0, 0)返回顶部
    goBack.addEventListener('click', function () {
        window.scroll(0, 0);
    });
});