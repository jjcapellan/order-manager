import {
    label,
} from './strings.js';

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

const clickHandlers = {
    // Empty function
    '': () => { },

    // Menu handlers
    'bt-clients': () => { scrollToAnchor('clients'); },
    'bt-orders': () => { scrollToAnchor('orders'); },
    'bt-products': () => { scrollToAnchor('products'); },

    // Client handlers
    'bt-add-client': hl_btAddClient,
    'bt-cancel-client': hl_btCancelClient,
    'bt-clients-back': () => { scrollToAnchor('menu'); },
    'bt-del-client': hl_btDelClient,
    'bt-edit-client': hl_btEditClient,
    'table-clients': hl_tblClients,

    // Product handlers
    'bt-add-product': hl_btAddProduct,
    'bt-cancel-product-view': hl_btCancelProductView,
    'bt-cancel-product': hl_btCancelProduct,
    'bt-del-product': hl_btDelProduct,
    'bt-edit-product': hl_btEditProduct,
    'bt-products-back': () => { scrollToAnchor('menu'); },
    'bt-view-product': hl_btViewProduct,
    'table-products': hl_tblProducts,

    // Order handlers
    'bt-select-client': hl_btSelectClient,
    'bt-add-order': hl_btAddOrder,
    'bt-cancel-order': hl_btCancelOrder,
    'bt-del-order': hl_btDelOrder,
    'bt-edit-order': hl_btEditOrder,
    'bt-orders-back': () => { scrollToAnchor('menu'); },
    'bt-select-product': hl_btSelectProduct,
    'bt-submit-order': hl_btSubmitOrder,
    'bt-view-order': hl_btViewOrder,
    'table-details': hl_tblSelectDetail,
    'table-orders': hl_tblOrders,
}


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
    setupEventHandlers();
    initLabels();
}

//
//
//
//// PRIVATE FUNCTIONS ////
///////////////////////////
//
//
//

function clickHandler(evt) {
    let id = '';
    let path = evt.composedPath();
    // -4 -> body-html-document-window
    for (let i = 0; i < path.length - 4; i++) {
        let el = path[i];
        if (el.classList.contains('clhl')) {
            id = el.id;
            break;
        }
    }
    clickHandlers[id](evt);
}

function checkViewport() {
    const height = Math.round(window.visualViewport.height + window.visualViewport.offsetTop);
    document.getElementById('css').innerHTML = `div.wrapper{height:${height}px;}`;
    scrollToAnchor(location.hash.substring(1));
}

function initLabels() {
    let strs = document.getElementsByClassName('string');
    for (let i = 0; i < strs.length; i++) {
        let newLabel = label[strs[i].innerText];
        strs[i].innerText = newLabel;
    }
}

function setupEventHandlers() {
    // Window
    window.visualViewport.onresize = (evt) => {
        checkViewport();
    }
    // Menu
    document.getElementById('menu').addEventListener('click', clickHandler);
    // Clients
    document.getElementById('clients').addEventListener('click', clickHandler);
    document.getElementById('screen-form-client').addEventListener('click', clickHandler);
    document.getElementById('form-client').addEventListener('submit', hl_btSubmitClient);
    // Products
    document.getElementById('products').addEventListener('click', clickHandler);
    document.getElementById('product-view').addEventListener('click', clickHandler);
    document.getElementById('screen-form-product').addEventListener('click', clickHandler);
    document.getElementById('form-product').addEventListener('submit', hl_btSubmitProduct);
    document.getElementById('photo').addEventListener('change', hl_iPhoto);
    document.getElementById('product-name').addEventListener('change', hl_iProductName);
    document.getElementById('product-price').addEventListener('change', hl_iProductPrice);
    // Orders
    document.getElementById('orders').addEventListener('click', clickHandler);
    document.getElementById('screen-form-order').addEventListener('click', clickHandler);
}

export { initHtml };