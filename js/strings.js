const language = navigator.language.substring(0, 2);

const spStr = {
    CLIENTS: 'CLIENTES',
    PRODUCTS: 'PRODUCTOS',
    ORDERS: 'PEDIDOS',
    NEW_CLIENT: 'NUEVO CLIENTE',
    NEW_PRODUCT: 'NUEVO PRODUCTO',
    NEW_ORDER: 'NUEVO PEDIDO',
    EDIT_PRODUCT: 'MODIFICAR PRODUCTO',
    EDIT_CLIENT: 'MODIFICAR CLIENTE',
    EDIT_ORDER: 'MODIFICAR PEDIDO',
    VIEW_ORDER: 'VISTA PEDIDO',
    Image: 'Imagen',
    Zero_to_remove_product: 'Cero borra este producto',
}

const enStr = {
    CLIENTS: 'CLIENTS',
    PRODUCTS: 'PRODUCTS',
    ORDERS: 'ORDERS',
    NEW_CLIENT: 'NEW CLIENT',
    NEW_PRODUCT: 'NEW PRODUCT',
    NEW_ORDER: 'NEW ORDER',
    EDIT_PRODUCT: 'EDIT PRODUCT',
    EDIT_CLIENT: 'EDIT_CLIENT',
    EDIT_ORDER: 'EDIT ORDER',
    VIEW_ORDER: 'VIEW_ORDER',
    Image: 'Image',
    Zero_to_remove_product: 'Zero removes this product',
}

const label = language == 'es' ? spStr : enStr;

export { label };
