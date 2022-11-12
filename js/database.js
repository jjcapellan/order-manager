import {initClients} from './clients.js';

function initDb() {

    window.db = new Sixdb('maindb');

    db.checkStore('clients', (exists) => {
        if (!exists) {
            db.newStore('clients', { keyPath: 'id', autoIncrement: true });
        }
        window.clientStore = db.openStore('clients');
        clientStore.checkIndex('names', (exists) => {
            if (!exists) {
                clientStore.newIndex('names', 'name');
            }
            window.clientIndex = clientStore.openIndex('names');
            db.customTask(initClients, window, null);
        });
    });

    db.checkStore('products', (exists) => {
        if (!exists) {
            db.newStore('products', { keyPath: 'id', autoIncrement: true });
        }
        window.productStore = db.openStore('products');
    });

    db.checkStore('orders', (exists) => {
        if (!exists) {
            db.newStore('orders', { keyPath: 'id', autoIncrement: true });
        }
        window.orderStore = db.openStore('orders');
        orderStore.checkIndex('dates', (exists) => {
            if (!exists) {
                orderStore.newIndex('dates', 'date');
            }
        });
    });

    db.execTasks();
}

export { initDb };