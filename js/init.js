import { initClients } from './clients.js';

function checkStores() {

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


}

function scrollToPage(id){
    let target = document.getElementById(location.hash.substring(1));
    const targetPosY = target.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ pos: targetPosY });
}

function checkViewport() {
    const height = Math.round(window.visualViewport.height + window.visualViewport.offsetTop);
    const width = Math.round(window.visualViewport.width);
    document.getElementById('css').innerHTML = `div.container{height:${height}px;width:${width}px}`;
    scrollToPage(location.hash.substring(1));
}

function initHtml() {
    checkViewport();
    window.visualViewport.onresize = (evt) => {

        checkViewport();

    }
}

function initDb() {
    initHtml();
    window.db = new Sixdb('maindb');
    checkStores();
    db.execTasks();
}

export { initDb, scrollToPage };