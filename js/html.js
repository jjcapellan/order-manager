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
    hl_btCancelProductView,
    hl_btDelProduct,
    hl_btEditProduct,
    hl_btSubmitProduct,
    hl_btViewProduct,
    hl_iPhoto,
    hl_iProductName,
    hl_iProductPrice,
    hl_tblProducts,
} from './products.js';

import {
    hl_btAddOrder,
    hl_btCancelOrder,
    hl_btDelOrder,
    hl_btEditOrder,
    hl_btSelectClient,
    hl_btSelectProduct,
    hl_btSubmitOrder,
    hl_btViewOrder,
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
    setupMenuEvents();
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
    scrollToAnchor(location.hash.substring(1));
}

function setupClientEvents() {
    document.getElementById('bt-add-client').addEventListener('click', hl_btAddClient);
    document.getElementById('bt-cancel-client').addEventListener('click', hl_btCancelClient);
    document.getElementById('bt-clients-back').addEventListener('click', () => { scrollToAnchor('menu'); });
    document.getElementById('bt-del-client').addEventListener('click', hl_btDelClient);
    document.getElementById('bt-edit-client').addEventListener('click', hl_btEditClient);
    document.getElementById('form-client').addEventListener('submit', hl_btSubmitClient);
    document.getElementById('table-clients').addEventListener('click', hl_tblClients);
}

function setupMenuEvents() {
    document.getElementById('bt-clients').addEventListener('click', () => { window.scrollToAnchor('clients'); });
    document.getElementById('bt-products').addEventListener('click', () => { window.scrollToAnchor('products'); });
    document.getElementById('bt-orders').addEventListener('click', () => { window.scrollToAnchor('orders'); });
}

function setupOrderEvents() {
    document.getElementById('bt-add-order').addEventListener('click', hl_btAddOrder);
    document.getElementById('bt-cancel-order').addEventListener('click', hl_btCancelOrder);
    document.getElementById('bt-del-order').addEventListener('click', hl_btDelOrder);
    document.getElementById('bt-edit-order').addEventListener('click', hl_btEditOrder);
    document.getElementById('bt-orders-back').addEventListener('click', () => { scrollToAnchor('menu'); });
    document.getElementById('bt-select-client').addEventListener('click', hl_btSelectClient);
    document.getElementById('bt-select-product').addEventListener('click', hl_btSelectProduct);
    document.getElementById('bt-submit-order').addEventListener('click', hl_btSubmitOrder);
    document.getElementById('bt-view-order').addEventListener('click', hl_btViewOrder);
    document.getElementById('table-details').addEventListener('click', hl_tblSelectDetail);
    document.getElementById('table-orders').addEventListener('click', hl_tblOrders);
}

function setupProductEvents() {
    document.getElementById('bt-add-product').addEventListener('click', hl_btAddProduct);
    document.getElementById('bt-cancel-product-view').addEventListener('click', hl_btCancelProductView);
    document.getElementById('bt-cancel-product').addEventListener('click', hl_btCancelProduct);
    document.getElementById('bt-del-product').addEventListener('click', hl_btDelProduct);
    document.getElementById('bt-edit-product').addEventListener('click', hl_btEditProduct);
    document.getElementById('bt-view-product').addEventListener('click', hl_btViewProduct);
    document.getElementById('bt-products-back').addEventListener('click', () => { scrollToAnchor('menu'); });
    document.getElementById('form-product').addEventListener('submit', hl_btSubmitProduct);
    document.getElementById('photo').addEventListener('change', hl_iPhoto);
    document.getElementById('product-name').addEventListener('change', hl_iProductName);
    document.getElementById('product-price').addEventListener('change', hl_iProductPrice);
    document.getElementById('table-products').addEventListener('click', hl_tblProducts);
}

function setupWindowEvents() {
    window.visualViewport.onresize = (evt) => {
        checkViewport();
    }
}

export { initHtml };