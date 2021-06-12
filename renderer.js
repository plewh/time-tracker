const {ipcRenderer} = require('electron');

ipcRenderer.on('dunno-reply', (event, args) => {
    console.log(args);
})

function updateText() {
    
    // get user supplied value
    let inVal = document.getElementById("root-update-current-entry-text-box")

    // create update object
    let uItem = {
        "datetime":Date.now(),
        "text":inVal.value
    };

    // update log
    ipcRenderer.send('sendUpdateObj', uItem);

    // create new dom elements with user value
    let node = document.createElement("div");
    node.setAttribute('class', "root-update-previous-entry-item");
    node.appendChild(document.createTextNode(`${uItem.datetime} - ${uItem.text}`));

    // add new node to dom
    document.getElementById("root-update-previous-entry-textarea").appendChild(node);

    // clear textarea
    inVal.value = '';
    
}

function readLog() {

    ipcRenderer.send('getUpdateObj');

}

ipcRenderer.on('getUpdateObjReply', (event, args) => {
  
    console.log("cool updates bro");
    
})

setInterval(() => {

    let prevUpdates = document.getElementById("root-update-previous-entry-textarea");
    prevUpdates.scrollTop = prevUpdates.scrollHeight - prevUpdates.clientHeight;

    /*
    let isOnBottom = prevUpdates.scrollHeight - prevUpdates.clientHeight <= prevUpdates.scrollTop + 1;
    if (isOnBottom) {
        prevUpdates.scrollTop = prevUpdates.scrollHeight - prevUpdates.clientHeight;
    };
    */

}, 200);

document.getElementById("root-update-current-entry-text-box").addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        document.getElementById("root-update-current-entry-buttons-update").click();
    }
})

window.onload = (event, args) => {
    readLog();
}