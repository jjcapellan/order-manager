import { initDb, scrollToPage } from './init.js'
import { newClient, delClient } from './clients.js'

window.onload = () => {
    initDb();
    window.scrollToPage = scrollToPage;
    window.newClient = newClient;
    window.delClient = delClient;
}
