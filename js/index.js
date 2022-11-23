import { initDb } from './database.js';
import { initHtml } from './html.js';
import { initClients } from './clients.js';
import {
    initProducts,
    restoreProductForm,
} from './products.js';
import { initOrders } from './orders.js';

window.currentAnchor = 'menu';

window.scrollToAnchor = (anchor) => {
    if (anchor == '') return;
    const el = document.getElementById(anchor);
    window.currentAnchor = anchor;
    el.scrollIntoView({ inline: 'start' });
}
window.onload = () => {
    initHtml();
    initDb(initClients, initProducts, initOrders);

    // Checks if browser was closed after open mobile camera app (OS closes browser on low memory) 
    // and restores previus state
    const title = localStorage.getItem('title');
    if (title) {
        const product = JSON.parse(localStorage.getItem('product'));
        restoreProductForm(product, title);
    }
}
