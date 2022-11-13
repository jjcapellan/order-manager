import { initDb } from './database.js';
import { initHtml } from './html.js';
import { initClients } from './clients.js';
import { initProducts } from './products.js';

window.onload = () => {
    initHtml();
    initDb(initClients, initProducts);
}
