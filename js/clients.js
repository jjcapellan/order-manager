import { setOrderClient } from './orders.js';
import { label } from "./strings.js";
//// LOCAL CONSTSTANTS ////
///////////////////////////
//
//
//

const clientsTable = document.getElementById('table-clients');
const form = document.getElementById('form-client');
const formTitle = document.getElementById('change-clients-title');
const orderForm = document.getElementById('screen-form-order');
const screenForm = document.getElementById('screen-form-client');

//
//
//
//// PUBLIC INIT FUNCTION ////
//////////////////////////////
//
//
//

function initClients() {
    populateClientsList();
}

//
//
//
//// PUBLIC UI HANDLERS ////
////////////////////////////
//
//
//

function hl_btAddClient() {
    setClientId('');
    console.log(formTitle);
    formTitle.innerHTML = label.NEW_CLIENT;
    scrollToAnchor('screen-form-client');
}

function hl_btCancelClient() {
    form.reset();
    scrollToAnchor('clients');
}

function hl_btClientsBack() {
    scrollToAnchor('menu');
    unselectRows();
}

function hl_btDelClient() {
    const rowIndex = clientsTable.getAttribute('data-row');
    if (rowIndex == '') {
        alert('No client selected');
        return;
    }
    const tr = clientsTable.rows[rowIndex];
    const clientId = tr.children[0].getAttribute('data-id');
    clientsTable.setAttribute('data-row', '');
    tr.className = '';
    clientStore.del(+clientId);
    db.execTasks();
    tr.remove();
}

function hl_btEditClient() {
    const client = getSelected();
    if (!client) {
        alert('No client selected');
        return;
    }
    setClientId(client.id);
    formTitle.innerHTML = label.EDIT_CLIENT;
    populateClientForm(client);
    scrollToAnchor('screen-form-client');
}

function hl_btSubmitClient(evt) {
    evt.preventDefault();
    const client = readForm(form);
    if (formTitle.innerHTML == label.NEW_CLIENT) {
        newClient(client);
    } else {
        updateClient(client);
    }
    db.customTask(
        () => {
            form.reset();
            unselectRows();
        }
    )
    db.execTasks();

    populateClientsList();
    scrollToAnchor('clients');
}

function hl_tblClients(evt) {
    const tr = evt.target.parentElement;
    let rowIndex = tr.rowIndex;
    let rowSelect = clientsTable.getAttribute('data-row');

    if (rowSelect == '') {
        tr.className = 'tr-selected';
        clientsTable.setAttribute('data-row', rowIndex);
    } else if (rowSelect != rowIndex) {
        clientsTable.rows[rowSelect].className = '';
        tr.className = 'tr-selected';
        clientsTable.setAttribute('data-row', rowIndex);
    } else if (rowSelect == rowIndex) {
        tr.className = '';
        clientsTable.setAttribute('data-row', '');
    }

    const order = orderForm.getAttribute('data-active');
    if (order != '') {
        setOrderClient(getSelected());
        scrollToAnchor('screen-form-order');
        unselectRows();
    }
    return;
}

//
//
//
//// PRIVATE FUNCTIONS ////
///////////////////////////
//
//
//

function getSelected() {
    const rowIndex = clientsTable.getAttribute('data-row');
    if (rowIndex == '') {
        return null;
    }
    const tr = clientsTable.rows[rowIndex];
    const clientId = tr.children[0].getAttribute('data-id');
    const name = tr.children[0].innerText;
    const tel = tr.children[1].innerText;
    return { id: clientId, name: name, tel: tel };
}

function newClient(client) {
    clientStore.add({ name: client.name, tel: client.tel });
}

function populateClientForm(client) {
    form.elements[0].value = client.name;
    form.elements[1].value = client.tel;
}

function populateClientsList() {
    clientIndex.getAll((result) => {
        let str = '';
        for (let i = 0; i < result.length; i++) {
            str += `<tr><td data-id="${result[i].id}">${result[i].name}</td><td>${result[i].tel}</td></tr>`;
        }
        clientsTable.innerHTML = str;
    });
    db.execTasks();
}

function readForm(form) {
    const clientId = screenForm.getAttribute('data-id');
    const name = form.elements[0].value;
    const tel = form.elements[1].value;

    return { id: clientId, name: name, tel: tel };
}

function setClientId(id) {
    screenForm.setAttribute('data-id', id);
}

function unselectRows() {
    const rowIndex = clientsTable.getAttribute('data-row');
    if (rowIndex == '') {
        return;
    }
    const tr = clientsTable.rows[rowIndex];
    tr.className = '';
    clientsTable.setAttribute('data-row', '');
}

function updateClient(client) {
    clientStore.update(+client.id, { name: client.name, tel: client.tel });
}



export {
    hl_btAddClient,
    hl_btCancelClient,
    hl_btClientsBack,
    hl_btDelClient,
    hl_btEditClient,
    hl_btSubmitClient,
    initClients,
    hl_tblClients,
};