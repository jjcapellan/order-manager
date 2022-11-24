const language = navigator.language.substring(0, 2);

const spStr = {
    AMOUNT: 'CANTIDAD',
    CLIENTS: 'CLIENTES',
    DELETE_CONFIRM: '¿Eliminar este elemento?',
    EDIT_CLIENT: 'MODIFICAR CLIENTE',
    EDIT_ORDER: 'MODIFICAR PEDIDO',
    EDIT_PRODUCT: 'MODIFICAR PRODUCTO',
    Image: 'Imagen',
    NAME: 'NOMBRE',
    NEW_CLIENT: 'NUEVO CLIENTE',
    NEW_ORDER: 'NUEVO PEDIDO',
    NEW_PRODUCT: 'NUEVO PRODUCTO',
    ORDERS: 'PEDIDOS',
    PRICE: 'PRECIO',
    PRODUCTS: 'PRODUCTOS',
    TELEPHONE: 'TELEFONO',
    VIEW_ORDER: 'VISTA PEDIDO',
    Zero_to_remove_product: 'Cero borra este producto',
}

const enStr = {
    AMOUNT: 'AMOUNT',
    CLIENTS: 'CLIENTS',
    DELETE_CONFIRM: 'Delete this item?',
    EDIT_CLIENT: 'EDIT_CLIENT',
    EDIT_ORDER: 'EDIT ORDER',
    EDIT_PRODUCT: 'EDIT PRODUCT',
    Image: 'Image',
    NAME: 'NAME',
    NEW_CLIENT: 'NEW CLIENT',
    NEW_ORDER: 'NEW ORDER',
    NEW_PRODUCT: 'NEW PRODUCT',
    ORDERS: 'ORDERS',
    PRICE: 'PRICE',
    PRODUCTS: 'PRODUCTS',
    TELEPHONE: 'TELEPHONE',
    VIEW_ORDER: 'VIEW_ORDER',
    Zero_to_remove_product: 'Zero removes this product',
}

const label = language == 'es' ? spStr : enStr;

export { label };
