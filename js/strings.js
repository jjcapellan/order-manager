const language = navigator.language.substring(0, 2);

const spStr = {
    btClients: 'CLIENTES',
    btProducts: 'PRODUCTOS',
    btOrders: 'PEDIDOS',
}

const enStr = {
    btClients: 'CLIENTES',
    btProducts: 'PRODUCTOS',
    btOrders: 'PEDIDOS',
}

const label = language == 'es' ? spStr : enStr;

export { label };