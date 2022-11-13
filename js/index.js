import { initDb } from './database.js';
import { initHtml } from './html.js';
import { initClients } from './clients.js';

window.onload = () => {
    initHtml();
    initDb(initClients);
}
