import { addDetail } from "./orders.js";
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
const imgProduct = document.getElementById('product-photo');

const product = {
    name: null,
    price: null,
    imgblob: null,
}
const abc = 36;
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
    formTitle.innerHTML = 'NEW PRODUCT';
    location.replace('#screen-form-product');
}

function hl_btCancelProduct() {
    resetProduct();
    location.replace('#products');
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
            formTitle.innerHTML = 'EDIT PRODUCT';
            populateProductForm(product);            
            unselectRows();
        },
        this,
        null
    );
    db.execTasks();
    location.replace('#screen-form-product');

}

function hl_btSubmitProduct() {
    if (formTitle.innerHTML == 'NEW PRODUCT') {
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
    location.replace('#products');
    return false;
}

function hl_iPhoto(evt) {
    const imgBlob = evt.target.files[0];
    if (!imgBlob) return;
    product.imgblob = imgBlob;
    let imgUrl = URL.createObjectURL(imgBlob);
    imgProduct.setAttribute('src', imgUrl);
}

function hl_iProductName() {
    product.name = form.elements[0].value;
    console.log(product.name);
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
                location.replace('#screen-form-order');
                unselectRows()
            },
            window,
            null
        );
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

function setSelected() {
    const rowIndex = productsTable.getAttribute('data-row');
    if (rowIndex == '') {
        return null;
    }
    console.log('rowIndex', rowIndex);
    const tr = productsTable.rows[rowIndex];
    const _productId = tr.children[0].getAttribute('data-id');
    console.log('productId', _productId);
    productId = _productId;
    productStore.get(+_productId,
        (_product) => {
            product.name = _product[0].name;
            product.price = _product[0].price;
            product.imgblob = _product[0].imgblob;
        });
}

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
    imgProduct.setAttribute('src', imgUrl);
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

function resetProduct() {
    product.name = null;
    product.price = null;
    product.imgblob = null;
    productId = null;

    form.reset();
    imgProduct.setAttribute('src', '');
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
    console.log('update', productId);
    productStore.update(+productId, { name: product.name, price: product.price, imgblob: product.imgblob });
    
}

export {
    hl_btAddProduct,
    hl_btCancelProduct,
    hl_btDelProduct,
    hl_btEditProduct,
    hl_btSubmitProduct,
    hl_iPhoto,
    hl_iProductName,
    hl_iProductPrice,
    hl_tblProducts,
    initProducts,
};