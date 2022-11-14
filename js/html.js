import {
    btAddClient,
    btCancelSubmitClient,
    btDelClient,
    btEditClient,
    btSubmitClient,
    tableSelectClient,
} from './clients.js';

import {
    btAddProduct,
    btCancelSubmitProduct,
    btDelProduct,
    btEditProduct,
    btSubmitProduct,
    tableSelectProduct,
} from './products.js';

import {
    btSelectClient
} from './orders.js';


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
    setupProductEvents();
    setupOrderEvents();
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

function setupProductEvents() {
    document.getElementById('form-product').addEventListener('submit', btSubmitProduct);
    document.getElementById('bt-cancel-product').addEventListener('click', btCancelSubmitProduct);
    document.getElementById('bt-del-product').addEventListener('click', btDelProduct);
    document.getElementById('bt-add-product').addEventListener('click', btAddProduct);
    document.getElementById('bt-edit-product').addEventListener('click', btEditProduct);
    document.getElementById('table-products').addEventListener('click', tableSelectProduct);
}

function setupOrderEvents(){
    document.getElementById('bt-select-client').addEventListener('click', btSelectClient);
}

function setupWindowEvents() {
    window.visualViewport.onresize = (evt) => {
        checkViewport();
    }
}

export { initHtml };