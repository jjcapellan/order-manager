//// LOCAL CONSTSTANTS ////
///////////////////////////
//
//
//

const clientsTable = document.getElementById('table-clients');
const form = document.getElementById('form-client');
const formTitle = document.getElementById('change-clients-title');
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

function btAddClient() {
    setClientId('');
    formTitle.innerHTML = 'NEW CLIENT';
    location.hash = '#screen-form-client';
}

function btCancelSubmitClient() {
    form.reset();
    location.replace('#clients');
}

function btDelClient() {
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

function btEditClient() {
    const client = getSelected();
    if (!client) {
        alert('No client selected');
        return;
    }
    setClientId(client.id);
    formTitle.innerHTML = 'EDIT CLIENT';
    populateClientForm(client);
    location.hash = '#screen-form-client';
}

function btSubmitClient() {
    const client = readForm(form);
    if (client.id == '') {
        newClient(client);
    } else {
        updateClient(client);
    }
    db.execTasks();
    form.reset();
    populateClientsList();
    location.replace('#clients');
    return false;
}

function tableSelectClient(evt) {
    const tr = evt.target.parentElement;
    let rowIndex = tr.rowIndex;
    let rowSelect = clientsTable.getAttribute('data-row');

    if (rowSelect == '') {
        tr.className = 'tr-selected';
        clientsTable.setAttribute('data-row', rowIndex);
        return;
    }

    if (rowSelect != rowIndex) {
        clientsTable.rows[rowSelect].className = '';
        tr.className = 'tr-selected';
        clientsTable.setAttribute('data-row', rowIndex);
        return;
    }

    if (rowSelect == rowIndex) {
        tr.className = '';
        clientsTable.setAttribute('data-row', '');
        return;
    }
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
    unselectRows();
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
    unselectRows();
}



export {
    btAddClient,
    btCancelSubmitClient,
    btDelClient,
    btEditClient,
    btSubmitClient,
    initClients,
    tableSelectClient,
};