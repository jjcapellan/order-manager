import {
    hl_btAddClient,
    hl_btCancelClient,
    hl_btDelClient,
    hl_btEditClient,
    hl_btSubmitClient,
    hl_tblClients,
} from './clients.js';

import {
    hl_btAddProduct,
    hl_btCancelProduct,
    hl_btDelProduct,
    hl_btEditProduct,
    hl_btSubmitProduct,
    hl_tblProducts,
} from './products.js';

import {
    hl_btAddOrder,
    hl_btCancelOrder,
    hl_btDelOrder,
    hl_btSelectClient,
    hl_btSelectProduct,
    hl_btSubmitOrder,
    hl_tblOrders,
    hl_tblSelectDetail,
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
    document.getElementById('bt-add-client').addEventListener('click', hl_btAddClient);
    document.getElementById('bt-cancel-client').addEventListener('click', hl_btCancelClient);
    document.getElementById('bt-del-client').addEventListener('click', hl_btDelClient);
    document.getElementById('bt-edit-client').addEventListener('click', hl_btEditClient);
    document.getElementById('form-client').addEventListener('submit', hl_btSubmitClient);
    document.getElementById('table-clients').addEventListener('click', hl_tblClients);
}

function setupOrderEvents() {
    document.getElementById('bt-add-order').addEventListener('click', hl_btAddOrder);
    document.getElementById('bt-cancel-order').addEventListener('click', hl_btCancelOrder);
    document.getElementById('bt-del-order').addEventListener('click', hl_btDelOrder);
    document.getElementById('bt-select-client').addEventListener('click', hl_btSelectClient);
    document.getElementById('bt-select-product').addEventListener('click', hl_btSelectProduct);
    document.getElementById('bt-submit-order').addEventListener('click', hl_btSubmitOrder);
    document.getElementById('table-details').addEventListener('click', hl_tblSelectDetail);
    document.getElementById('table-orders').addEventListener('click', hl_tblOrders);
}

function setupProductEvents() {
    document.getElementById('bt-add-product').addEventListener('click', hl_btAddProduct);
    document.getElementById('bt-cancel-product').addEventListener('click', hl_btCancelProduct);
    document.getElementById('bt-del-product').addEventListener('click', hl_btDelProduct);
    document.getElementById('bt-edit-product').addEventListener('click', hl_btEditProduct);
    document.getElementById('form-product').addEventListener('submit', hl_btSubmitProduct);
    document.getElementById('table-products').addEventListener('click', hl_tblProducts);
}

function setupWindowEvents() {
    window.visualViewport.onresize = (evt) => {
        checkViewport();
    }
}

export { initHtml };