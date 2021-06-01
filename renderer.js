
function dunno() {
    const {ipcRenderer} = require('electron');
    ipcRenderer.send('dunno', {"rarr":'rarrr'});
}