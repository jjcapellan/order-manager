import { addDetail } from "./orders.js";
import { label } from "./strings.js";
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
const imgProductThb = document.getElementById('product-thumbnail');
const imgProduct = document.getElementById('product-img');
const photoTitle = document.getElementById('photo-title');

const product = {
    name: null,
    price: null,
    imgblob: null,
}

let productId = null;

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

function hl_btAddProduct() {
    resetProduct();
    formTitle.innerHTML = label.NEW_PRODUCT;
    scrollToAnchor('screen-form-product');
}

function hl_btCancelProduct() {
    resetProduct();
    scrollToAnchor('products');
}

function hl_btCancelProductView() {
    imgProduct.setAttribute('src', '');
    unselectRows();
    scrollToAnchor('products');
}

function hl_btDelProduct() {
    const _productId = getSelectedId(true);
    if (!_productId) {
        alert('No product selected');
        return;
    }
    productStore.del(+_productId);
    db.execTasks();
}

function hl_btEditProduct() {
    setSelected();
    db.customTask(
        () => {
            formTitle.innerHTML = label.EDIT_PRODUCT;
            populateProductForm(product);
            unselectRows();
        },
        this,
        null
    );
    db.execTasks();
    scrollToAnchor('screen-form-product');

}

function hl_btSubmitProduct(evt) {
    evt.preventDefault();
    if (formTitle.innerHTML == label.NEW_PRODUCT) {
        newProduct(product);
    } else {
        updateProduct(product);
    }
    db.customTask(
        () => {
            resetProduct();
            unselectRows();

        },
        window,
        null
    );
    db.execTasks();
    populateProductsList();
    scrollToAnchor('products');
}

function hl_btViewProduct() {
    setSelected();
    db.customTask(
        () => {
            photoTitle.innerHTML = product.name;
            const imgUrl = URL.createObjectURL(product.imgblob);
            imgProduct.setAttribute('src', imgUrl);
        },
        this,
        null
    );
    db.execTasks();
    scrollToAnchor('product-view');
}

function hl_iPhoto(evt) {
    const imgBlob = evt.target.files[0];
    if (!imgBlob) return;
    product.imgblob = imgBlob;
    let imgUrl = URL.createObjectURL(imgBlob);
    imgProductThb.setAttribute('src', imgUrl);
}

function hl_iProductName() {
    product.name = form.elements[0].value;
}

function hl_iProductPrice() {
    product.price = form.elements[1].value;
}

function hl_tblProducts(evt) {
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
        setSelected();
        db.customTask(addDetail, window, product);
        db.customTask(
            () => {
                scrollToAnchor('screen-form-order');
                unselectRows()
            },
            window,
            null
        );
        db.execTasks();
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

function getSelectedId(delRow) {
    const rowIndex = productsTable.getAttribute('data-row');
    if (rowIndex == '') {
        return null;
    }
    const tr = productsTable.rows[rowIndex];
    const _productId = tr.children[0].getAttribute('data-id');
    tr.className = '';
    productsTable.setAttribute('data-row', '');
    if (delRow) {
        tr.remove();
    }
    return _productId;
}

function newProduct(product) {
    productStore.add({ name: product.name, price: product.price, imgblob: product.imgblob });
}

function populateProductForm(_product) {
    form.elements[0].value = _product.name;
    form.elements[1].value = _product.price;

    if (!_product.imgblob) {
        return;
    }

    let imgUrl = URL.createObjectURL(_product.imgblob);
    imgProductThb.setAttribute('src', imgUrl);
}

function populateProductsList() {
    productIndex.getAll((results) => {
        let str = '';
        for (let i = 0; i < results.length; i++) {
            str += `<tr><td data-id="${results[i].id}">${results[i].name}</td><td>${results[i].price}</td></tr>`;
        }
        productsTable.innerHTML = str;
    });
    db.execTasks();
}

function resetProduct() {
    product.name = null;
    product.price = null;
    product.imgblob = null;
    productId = null;

    form.reset();
    imgProductThb.setAttribute('src', '');
}

function setSelected() {
    const rowIndex = productsTable.getAttribute('data-row');
    if (rowIndex == '') {
        return null;
    }
    const tr = productsTable.rows[rowIndex];
    const _productId = tr.children[0].getAttribute('data-id');
    productId = _productId;
    productStore.get(
        +_productId,
        (results) => {
            product.name = results[0].name;
            product.price = results[0].price;
            product.imgblob = results[0].imgblob;
        }
    );
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
    productStore.update(+productId, { name: product.name, price: product.price, imgblob: product.imgblob });

}

export {
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
    initProducts,
};