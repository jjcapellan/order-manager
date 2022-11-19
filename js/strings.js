const language = navigator.language.substring(0, 2);

const spStr = {
    CLIENTS: 'CLIENTES',
    PRODUCTS: 'PRODUCTOS',
    ORDERS: 'PEDIDOS',
}

const enStr = {
    CLIENTS: 'CLIENTS',
    PRODUCTS: 'PRODUCTS',
    ORDERS: 'ORDERS',
}

const label = language == 'es' ? spStr : enStr;

export { label };