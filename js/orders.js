import { label } from './strings.js';

//// LOCAL CONSTSTANTS ////
///////////////////////////
//
//
//

const btSelectClient = document.getElementById('bt-select-client');
const btSelectProduct = document.getElementById('bt-select-product');
const form = document.getElementById('form-order');
const formTitle = document.getElementById('change-orders-title');
const ordersTable = document.getElementById('table-orders');
const popupQty = document.getElementById('popup-qty');
const screenForm = document.getElementById('screen-form-order');
const btSubmitOrder = document.getElementById('bt-submit-order');
const tblDetails = document.getElementById('table-details');
const tbQty = document.getElementById('tb-qty');

const order = {
    date: null,
    client: null,
    details: [],
}

let orderId = null;

function initOrders() {
    populateOrderList();
}

//
//
//
//// PUBLIC UI HANDLERS ////
////////////////////////////
//
//
//

function hl_btAddOrder() {
    setDate();
    formTitle.innerHTML = label.NEW_ORDER;
    scrollToAnchor('screen-form-order');
    unselectRows();
}

function hl_btCancelOrder() {
    scrollToAnchor('orders');
    resetOrder();
}

function hl_btDelOrder() {
    const rowIndex = ordersTable.getAttribute('data-row');
    if (rowIndex == '') {
        alert('No order selected');
        return;
    }
    if (!window.confirm(label.DELETE_CONFIRM)) {
        return;
    }
    const tr = ordersTable.rows[rowIndex];
    const orderId = tr.children[0].getAttribute('data-id');
    ordersTable.setAttribute('data-row', '');
    tr.className = '';
    orderStore.del(+orderId);
    db.execTasks();
    tr.remove();
}

function hl_btEditOrder() {
    let rowIndex = ordersTable.getAttribute('data-row');
    if (rowIndex == '') {
        alert('No order selected');
        return;
    }
    let _orderId = ordersTable.rows[+rowIndex].children[0].getAttribute('data-id');
    orderId = _orderId;
    orderStore.get(+_orderId,
        (_order) => {
            populateOrderForm(_order[0]);
            screenForm.setAttribute('data-active', 'true');
            formTitle.innerHTML = label.EDIT_ORDER;
            scrollToAnchor('screen-form-order');
        });
    db.execTasks();
    unselectRows();
}

function hl_btOrdersBack() {
    scrollToAnchor('menu');
    unselectRows();
}

function hl_btSelectClient() {
    screenForm.setAttribute('data-active', 'true');
    scrollToAnchor('clients');
}

function hl_btSelectProduct() {
    scrollToAnchor('products');
}

function hl_btSubmitOrder() {
    const rowIndex = screenForm.getAttribute('data-row');
    if (rowIndex) {
        changeDetail(rowIndex);
        return;
    }

    if (formTitle.innerHTML == label.NEW_ORDER) {
        orderStore.add(
            order,
            {
                successCallback:
                    () => {
                        populateOrderList();
                        resetOrder();
                        scrollToAnchor('orders')
                    }
            });

    } else if (formTitle.innerHTML == label.EDIT_ORDER) {
        orderStore.update(
            +orderId,
            order,
            {
                successCallback:
                    () => {
                        resetOrder();
                        scrollToAnchor('orders');
                    }
            }
        )
    }
    db.execTasks();
}

function hl_btViewOrder() {
    let rowIndex = ordersTable.getAttribute('data-row');
    if (rowIndex == '') {
        alert('No order selected');
        return;
    }
    let _orderId = ordersTable.rows[+rowIndex].children[0].getAttribute('data-id');
    console.log(ordersTable.rows[+rowIndex].children[0]);
    orderStore.get(
        +_orderId,
        (_order) => {
            populateOrderForm(_order[0]);
            btSelectProduct.style.display = 'none';
            btSubmitOrder.style.display = 'none';
            tblDetails.style.pointerEvents = 'none';
            formTitle.innerHTML = label.VIEW_ORDER;
            unselectRows();
            scrollToAnchor('screen-form-order');
        }
    );
    db.execTasks();
}

function hl_tblOrders(evt) {
    const tr = evt.target.parentElement;
    let rowIndex = tr.rowIndex;
    let rowSelect = ordersTable.getAttribute('data-row');

    if (rowSelect == '') {
        tr.className = 'tr-selected';
        ordersTable.setAttribute('data-row', rowIndex);
    } else if (rowSelect != rowIndex) {
        ordersTable.rows[rowSelect].className = '';
        tr.className = 'tr-selected';
        ordersTable.setAttribute('data-row', rowIndex);
    } else if (rowSelect == rowIndex) {
        tr.className = '';
        ordersTable.setAttribute('data-row', '');
    }
    return;
}

function hl_tblSelectDetail(evt) {
    const row = evt.target.parentElement;
    const rowIndex = row.rowIndex;
    if (rowIndex == 0) {
        return;
    }
    const amount = +row.children[1].innerText;
    if (amount > 0) {
        tbQty.value = amount;
    }
    screenForm.setAttribute('data-row', rowIndex);
    popupQty.removeAttribute('hidden');
    tblDetails.setAttribute('hidden', '');
    btSelectProduct.style.display = 'none';
}

//
//
//
//// PUBLIC FUNCTIONS ////
///////////////////////////
//
//
//

function addDetail(product) {
    let tr = document.createElement('tr');
    order.details.push({ productId: product.id, name: product.name, qty: '0' });
    let str = `<td>${product.name}</td><td>0</td>`;
    tr.innerHTML = str;
    tblDetails.appendChild(tr);
}

function setOrderClient(client) {
    btSelectClient.style.display = 'none';
    order.client = { id: client.id, name: client.name };
    let str = `<tr><th colspan="2">${client.name}</th></tr>`;
    tblDetails.innerHTML = str;
}

//
//
//
//// PRIVATE FUNCTIONS ////
///////////////////////////
//
//
//

function changeDetail(rowIndex) {
    const amount = tbQty.value;
    const row = tblDetails.rows[rowIndex];

    if (amount && amount != '0') {
        order.details[rowIndex - 1].qty = amount;
        row.children[1].innerText = amount;
    } else {
        order.details.splice(rowIndex - 1, 1);
        row.remove();
    }

    tbQty.value = '';
    popupQty.setAttribute('hidden', '');
    tblDetails.removeAttribute('hidden');
    btSelectProduct.style.display = 'block';
    screenForm.setAttribute('data-row', '');
}

function populateOrderForm(_order) {
    btSelectClient.style.display = 'none';

    order.date = _order.date;
    setOrderClient(_order.client);
    order.details = _order.details;

    for (let i = 0; i < _order.details.length; i++) {
        let tr = document.createElement('tr');
        let str = `<td>${_order.details[i].name}</td><td>${_order.details[i].qty}</td>`;
        tr.innerHTML = str;
        tblDetails.appendChild(tr);
    }

    screenForm.setAttribute('data-active', 'true');

}

function populateOrderList() {
    orderIndex.getAll((result) => {
        let str = '';
        for (let i = 0; i < result.length; i++) {
            str += `<tr><td data-id="${result[i].id}">${result[i].date}</td><td>${result[i].client.name}</td></tr>`;
        }
        ordersTable.innerHTML = str;
    });
    db.execTasks();
}

function resetOrder() {
    order.date = null;
    order.client = null;
    order.details = [];
    orderId = null;

    screenForm.setAttribute('data-active', '');
    screenForm.setAttribute('data-row', '');

    tblDetails.innerHTML = '';
    btSelectClient.style.display = 'block';
    btSelectProduct.style.display = 'block';
    btSubmitOrder.style.display = 'initial';
    tblDetails.style.pointerEvents = 'auto';
}

function setDate() {
    let d = new Date();
    order.date = d.toISOString().substring(0, 10); // yyyy-mm-dd
}

function unselectRows() {
    const rowIndex = ordersTable.getAttribute('data-row');
    if (rowIndex == '') {
        return;
    }
    const tr = ordersTable.rows[rowIndex];
    tr.className = '';
    ordersTable.setAttribute('data-row', '');
}

export {
    addDetail,
    hl_btAddOrder,
    hl_btCancelOrder,
    hl_btDelOrder,
    hl_btEditOrder,
    hl_btOrdersBack,
    hl_btSelectClient,
    hl_btSelectProduct,
    hl_btSubmitOrder,
    hl_btViewOrder,
    hl_tblOrders,
    hl_tblSelectDetail,
    initOrders,
    setOrderClient,
}