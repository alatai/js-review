'use strict';

window.addEventListener('load', function () {
    /* 案例分析 */
    /* ① 整个案例可以分为三个功能模块 */
    /* ② 鼠标经过小图片盒子，黄色的遮挡层和大图片盒子显示，离开隐藏两个盒子功能 */
    /* ③ 黄色的遮挡层跟随鼠标功能 */
    /* ④ 大图片跟随移动功能 */

    let previewImg = document.querySelector('.preview_img');
    let mask = document.querySelector('.mask');
    let big = document.querySelector('.big');

    // 鼠标经过previewImg，显示和隐藏mask遮挡层和big大盒子
    previewImg.addEventListener('mouseover', function () {
        mask.style.display = 'block';
        big.style.display = 'block';
    });

    previewImg.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    });

    // 把鼠标坐标给遮挡层不合适，因为遮挡层坐标以父盒子为准
    previewImg.addEventListener('mousemove', function (e) {
        // 首先获得鼠标在盒子的坐标
        let x = e.pageX - this.offsetLeft;
        let y = e.pageY - this.offsetTop;

        // 移动距离
        let maskX = x - mask.offsetWidth / 2;
        let maskY = y - mask.offsetHeight / 2;

        // 遮挡层最大距离
        let maskMax = previewImg.offsetWidth - mask.offsetWidth;

        // 如果x < 0，则停在0位置处...
        maskX = maskX <= 0 ? 0 : maskX;
        maskX = maskX >= maskMax ? maskMax : maskX;
        // 如果y < 0，则停在0位置处...
        maskY = maskY <= 0 ? 0 : maskY;
        maskY = maskY >= maskMax ? maskMax : maskY;

        // 数值给遮挡层作为left和top值
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';

        // 大图片移动距离 = 遮挡层移动距离 * 大图片最大移动距离 / 遮挡层最大移动距离
        let bigImg = document.querySelector('.bigImg');
        let bigMax = bigImg.offsetWidth - big.offsetWidth;
        let bigX = maskX * bigMax / maskMax;
        let bigY = maskY * bigMax / maskMax;

        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    });
});