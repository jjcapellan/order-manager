import { initDb } from './database.js';
import { initHtml } from './html.js';
import { initClients } from './clients.js';
import { initProducts } from './products.js';
import { initOrders } from './orders.js';

window.scrollToAnchor = (anchor) => {
    if (anchor == '') return;
    const el = document.getElementById(anchor);
    el.scrollIntoView({ inline: 'start' });
}
window.onload = () => {
    initHtml();
    initDb(initClients, initProducts, initOrders);
}
