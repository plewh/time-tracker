const {ipcRenderer} = require('electron');

function dunno() {
    ipcRenderer.send('dunno', {"rarr":'rarrr'});
}

document.addEventListener('focus', (e) => {
    console.log('focus event!');
})

document.body.onblur('blur', (e) => {
    console.log('blur event');
    ipcRenderer.send('blur', {"rarr":'rarrr'});
})