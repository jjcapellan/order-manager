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

function setOrderClient(client) {
    btClient.style.display = 'none';
    let str = `<tr><th>${client.name}</th></tr>`;
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
    btAddOrder,
    btSelectClient,
    setOrderClient,
}