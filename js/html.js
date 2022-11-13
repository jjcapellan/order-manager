import {
    btAddClient,
    btCancelSubmitClient,
    btDelClient,
    btEditClient,
    btSubmitClient,
    tableSelectClient,
} from './clients.js';

//
//
//
//// PUBLIC INIT FUNCTION ////
//////////////////////////////
//
//
//

function initHtml() {
    checkViewport();
    setupWindowEvents();
    setupClientEvents();
}

//
//
//
//// PRIVATE FUNCTIONS ////
///////////////////////////
//
//
//

function checkViewport() {
    const height = Math.round(window.visualViewport.height + window.visualViewport.offsetTop);
    document.getElementById('css').innerHTML = `div.wrapper{height:${height}px;}`;
    scrollToPage(location.hash.substring(1));
}

function scrollToPage(id) {
    if (!location.hash) location.hash = 'menu';
    let target = document.getElementById(location.hash.substring(1));
    const targetPosY = target.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ pos: targetPosY });
}

function setupClientEvents() {
    document.getElementById('form-client').addEventListener('submit', btSubmitClient);
    document.getElementById('bt-cancel-client').addEventListener('click', btCancelSubmitClient);
    document.getElementById('bt-del-client').addEventListener('click', btDelClient);
    document.getElementById('bt-add-client').addEventListener('click', btAddClient);
    document.getElementById('bt-edit-client').addEventListener('click', btEditClient);
    document.getElementById('table-clients').addEventListener('click', tableSelectClient);
}

function setupWindowEvents() {
    window.visualViewport.onresize = (evt) => {
        checkViewport();
    }
}

export { initHtml };