(function flexible(window, document) {
    // 获取的html的根元素
    let docEl = document.documentElement;
    // dpr物理像素比
    let dpr = window.devicePixelRatio || 1;

    // adjust body font size设置我们body的字体大小
    function setBodyFontSize() {
        // 如果页面中有body 这个元素 就设置body的字体大小
        if (document.body) {
            document.body.style.fontSize = (12 * dpr) + 'px';
        } else {
            // 如果页面中没有body 这个元素，则等着我们页面主要的DOM元素加载完毕再去设置body的字体大小
            document.addEventListener('DOMContentLoaded', setBodyFontSize);
        }
    }

    setBodyFontSize();

    // set 1rem = viewWidth / 10 设置我们html元素的文字大小
    function setRemUnit() {
        let rem = docEl.clientWidth / 10;
        docEl.style.fontSize = rem + 'px';
    }

    setRemUnit();

    // reset rem unit on page resize 当我们页面尺寸大小发生变化的时候，要重新设置下rem 的大小
    window.addEventListener('resize', setRemUnit);
    // pageshow 是我们重新加载页面触发的事件
    window.addEventListener('pageshow', function (e) {
        // e.persisted 返回的是true就是说如果这个页面是从缓存取过来的页面，也需要从新计算一下rem的大小
        if (e.persisted) {
            setRemUnit();
        }
    })

    // detect 0.5px supports有些移动端的浏览器不支持0.5像素的写法
    if (dpr >= 2) {
        let fakeBody = document.createElement('body');
        let testElement = document.createElement('div');

        testElement.style.border = '.5px solid transparent';
        fakeBody.appendChild(testElement);
        docEl.appendChild(fakeBody);

        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines');
        }

        docEl.removeChild(fakeBody);
    }
}(window, document));