
function newClient() {
    const form = document.getElementById('client-form');
    const name = form.elements[0].value;
    const tel = form.elements[1].value;

    clientStore.add({ name: name, tel: tel });
    db.execTasks();
    form.reset();
    populateClientsList();
    location.replace('#clients');
}

function populateClientsList() {
    clientIndex.getAll((result) => {
        clientsTable = document.getElementById('clientsTable');
        let str = '';
        console.log(result.length);
        for (let i = 0; i < result.length; i++) {
            str += `<tr><td data-id="${result[i].id}">${result[i].name}</td><td>${result[i].tel}</td></tr>`;
        }
        clientsTable.innerHTML = str;
    });
    db.execTasks();
}

function delClient(){
    const rowIndex = clientsTable.getAttribute('data-row');
    if(rowIndex==''){
        alert('No client selected');
        return;
    }
    const tr = clientsTable.rows[rowIndex];
    const client = tr.children[0].innerText;
    clientsTable.setAttribute('data-row', '');
    tr.className = '';
    clientStore.del(`name = ${client}`);
    tr.remove();
}

function initClients() {
    populateClientsList();
    window.clientsTable = document.getElementById('clientsTable');
    clientsTable.addEventListener('click', (evt) => {
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
    });

    document.getElementById('client-form').addEventListener('click', () => {
        console.log('scrolled');
        window.scrollToPage('add-client');
    });
}

export { newClient, initClients, delClient };