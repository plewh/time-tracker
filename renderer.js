/*
const {ipcRenderer} = require('electron');

function dunno() {
    ipcRenderer.send('dunno', {"rarr":'rarrr'});
}
*/

function updateTextBox() {
    
    // get user supplied value
    let inVal = document.getElementById("root-update-current-entry-text-box")

    // create new dom elements with user value
    let node = document.createElement("div");
    node.setAttribute('class', "root-update-previous-entry-item");
    node.appendChild(document.createTextNode(inVal.value));

    // add new node to dom
    document.getElementById("root-update-previous-entry-textarea").appendChild(node);

    // clear textarea
    inVal.value = '';
    
}

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