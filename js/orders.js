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
const tblDetails = document.getElementById('table-details');
const tbQty = document.getElementById('tb-qty');

const order = {
    date: null,
    client: null,
    details: [],
}

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
    formTitle.innerHTML = 'NEW ORDER';
    location.replace('#screen-form-order');
}

function hl_btCancelOrder() {
    location.replace('#orders');
    resetOrder();
}

function hl_btSelectClient() {
    screenForm.setAttribute('data-active', 'true');
    location.replace('#clients');
}

function hl_btSelectProduct() {
    location.replace('#products');
}

function hl_btSubmitOrder() {
    const rowIndex = screenForm.getAttribute('data-row');
    if (rowIndex) {
        changeDetail(rowIndex);
        return;
    }
    orderStore.add(
        order,
        {
            successCallback:
                () => {
                    populateOrderList();
                    resetOrder();
                    location.replace('#orders')
                }
        });
    db.execTasks();

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
    order.details[rowIndex - 1].qty = amount;
    row.children[1].innerText = amount;

    tbQty.value = '';
    popupQty.setAttribute('hidden', '');
    tblDetails.removeAttribute('hidden');
    btSelectProduct.style.display = 'block';
    screenForm.setAttribute('data-row', '');
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

    screenForm.setAttribute('data-active', '');
    screenForm.setAttribute('data-row', '');

    tblDetails.innerHTML = '';
    btSelectClient.style.display = 'block';
    btSelectProduct.style.display = 'block';
}

function setDate() {
    let d = new Date();
    order.date = d.toISOString().substring(0, 10); // yyyy-mm-dd
}

export {
    addDetail,
    hl_btAddOrder,
    hl_btCancelOrder,
    hl_btSelectClient,
    hl_btSelectProduct,
    hl_btSubmitOrder,
    hl_tblSelectDetail,
    initOrders,
    setOrderClient,
}