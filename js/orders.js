//// LOCAL CONSTSTANTS ////
///////////////////////////
//
//
//

const ordersTable = document.getElementById('table-orders');
const form = document.getElementById('form-order');
const formTitle = document.getElementById('change-order-title');
const screenForm = document.getElementById('screen-form-order');
const detailsTable = document.getElementById('table-details');
const btClient = document.getElementById('bt-select-client');
const btProduct = document.getElementById('bt-select-product');
const tbQty = document.getElementById('tb-qty');
const popupQty = document.getElementById('popup-qty');

//
//
//
//// PUBLIC UI HANDLERS ////
////////////////////////////
//
//
//

function btAddOrder() {
    setOrderId('');
    formTitle.innerHTML = 'NEW ORDER';
    location.replace('#screen-form-order');
}

function btSelectClient() {
    screenForm.setAttribute('data-active', 'true');
    location.replace('#clients');
}

function btSelectProduct() {
    location.replace('#products');
}

function btCancelOrder() {
    location.replace('#orders');
    resetOrder();
}

function resetOrder() {
    screenForm.setAttribute('data-active', '');
    screenForm.setAttribute('data-row', '');
    detailsTable.innerHTML = '';
    btClient.style.display = 'block';
    btProduct.style.display = 'block';
}

function tableSelectDetail(evt) {
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
    detailsTable.setAttribute('hidden', '');
    btProduct.style.display = 'none';
}

function addOrderProduct(product) {
    let tr = document.createElement('tr');
    let str = `<td>${product.name}</td><td>0</td>`;
    tr.innerHTML = str;
    detailsTable.appendChild(tr);
}

function btSubmitOrder() {
    const rowIndex = screenForm.getAttribute('data-row');
    if (rowIndex) {
        changeDetail(rowIndex);
        return;
    }
}

function changeDetail(rowIndex) {
    const amount = tbQty.value;
    const row = detailsTable.rows[rowIndex];
    row.children[1].innerText = amount;

    tbQty.value = '';
    popupQty.setAttribute('hidden', '');
    detailsTable.removeAttribute('hidden');
    btProduct.style.display = 'block';
    screenForm.setAttribute('data-row', '');
}

function setOrderClient(client) {
    btClient.style.display = 'none';
    let str = `<tr><th colspan="2">${client.name}</th></tr>`;
    detailsTable.innerHTML = str;
}

//
//
//
//// PRIVATE FUNCTIONS ////
///////////////////////////
//
//
//

function setOrderId(id) {
    screenForm.setAttribute('data-id', id);
}

export {
    addOrderProduct,
    btAddOrder,
    btSelectClient,
    btSelectProduct,
    btCancelOrder,
    setOrderClient,
    tableSelectDetail,
    btSubmitOrder,
}