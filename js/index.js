import { initDb } from './database.js';
import { initHtml } from './html.js';
import { newClient, delClient } from './clients.js';

window.onload = () => {
    initHtml();
    initDb();

    window.newClient = newClient;
    window.delClient = delClient;
}
