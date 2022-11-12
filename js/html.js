function scrollToPage(id) {
    if (!location.hash) location.hash = 'menu';
    let target = document.getElementById(location.hash.substring(1));
    const targetPosY = target.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ pos: targetPosY });
}

function checkViewport() {
    const height = Math.round(window.visualViewport.height + window.visualViewport.offsetTop);
    document.getElementById('css').innerHTML = `div.wrapper{height:${height}px;}`;
    scrollToPage(location.hash.substring(1));
}

function initHtml() {
    checkViewport();
    window.visualViewport.onresize = (evt) => {
        checkViewport();
    }
}

export { initHtml };