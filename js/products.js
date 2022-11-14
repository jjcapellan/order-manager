import { addOrderProduct } from "./orders.js";
//// LOCAL CONSTSTANTS ////
///////////////////////////
//
//
//

const productsTable = document.getElementById('table-products');
const form = document.getElementById('form-product');
const formTitle = document.getElementById('change-products-title');
const screenForm = document.getElementById('screen-form-product');
const orderForm = document.getElementById('screen-form-order');

//
//
//
//// PUBLIC INIT FUNCTION ////
//////////////////////////////
//
//
//

function initProducts() {
    populateProductsList();
}

//
//
//
//// PUBLIC UI HANDLERS ////
////////////////////////////
//
//
//

function btAddProduct() {
    setProductId('');
    formTitle.innerHTML = 'NEW PRODUCT';
    location.replace('#screen-form-product');
}

function btCancelSubmitProduct() {
    form.reset();
    location.replace('#products');
}

function btDelProduct() {
    const rowIndex = productsTable.getAttribute('data-row');
    if (rowIndex == '') {
        alert('No product selected');
        return;
    }
    const tr = productsTable.rows[rowIndex];
    const productId = tr.children[0].getAttribute('data-id');
    productsTable.setAttribute('data-row', '');
    tr.className = '';
    productStore.del(+productId);
    db.execTasks();
    tr.remove();
}

function btEditProduct() {
    const product = getSelected();
    if (!product) {
        alert('No product selected');
        return;
    }
    setProductId(product.id);
    formTitle.innerHTML = 'EDIT PRODUCT';
    populateProductForm(product);
    location.replace('#screen-form-product');
}

function btSubmitProduct() {
    const product = readForm(form);
    if (product.id == '') {
        newProduct(product);
    } else {
        updateProduct(product);
    }
    db.execTasks();
    form.reset();
    populateProductsList();
    location.replace('#products');
    return false;
}

function tableSelectProduct(evt) {
    const tr = evt.target.parentElement;
    let rowIndex = tr.rowIndex;
    let rowSelect = productsTable.getAttribute('data-row');

    if (rowSelect == '') {
        tr.className = 'tr-selected';
        productsTable.setAttribute('data-row', rowIndex);
    } else if (rowSelect != rowIndex) {
        productsTable.rows[rowSelect].className = '';
        tr.className = 'tr-selected';
        productsTable.setAttribute('data-row', rowIndex);
    } else if (rowSelect == rowIndex) {
        tr.className = '';
        productsTable.setAttribute('data-row', '');
    }

    const order = orderForm.getAttribute('data-active');
    if (order != '') {
        addOrderProduct(getSelected());
        location.replace('#screen-form-order');
        unselectRows();
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
    const rowIndex = productsTable.getAttribute('data-row');
    if (rowIndex == '') {
        return null;
    }
    const tr = productsTable.rows[rowIndex];
    const productId = tr.children[0].getAttribute('data-id');
    const name = tr.children[0].innerText;
    const price = tr.children[1].innerText;
    return { id: productId, name: name, price: price };
}

function newProduct(product) {
    productStore.add({ name: product.name, price: product.price });
    unselectRows();
}

function populateProductForm(product) {
    form.elements[0].value = product.name;
    form.elements[1].value = product.price;
}

function populateProductsList() {
    productIndex.getAll((result) => {
        let str = '';
        for (let i = 0; i < result.length; i++) {
            str += `<tr><td data-id="${result[i].id}">${result[i].name}</td><td>${result[i].price}</td></tr>`;
        }
        productsTable.innerHTML = str;
        console.log(productsTable);
    });
    db.execTasks();
}

function readForm(form) {
    const productId = screenForm.getAttribute('data-id');
    const name = form.elements[0].value;
    const price = form.elements[1].value;

    return { id: productId, name: name, price: price };
}

function setProductId(id) {
    screenForm.setAttribute('data-id', id);
}

function unselectRows() {
    const rowIndex = productsTable.getAttribute('data-row');
    if (rowIndex == '') {
        return;
    }
    const tr = productsTable.rows[rowIndex];
    tr.className = '';
    productsTable.setAttribute('data-row', '');
}

function updateProduct(product) {
    productStore.update(+product.id, { name: product.name, price: product.price });
    unselectRows();
}

export {
    btAddProduct,
    btCancelSubmitProduct,
    btDelProduct,
    btEditProduct,
    btSubmitProduct,
    initProducts,
    tableSelectProduct,
};