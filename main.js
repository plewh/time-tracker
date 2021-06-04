const { app,Menu,BrowserWindow,Tray,ipcMain,Dock} = require('electron');
const process = require('process');

try {
    require('electron-reloader')(module);
} catch (_) {

}

let win;
let tray;
let wh = 400;
let ww = 400;

function createWindow (tBounds) {
    win = new BrowserWindow({
        width: ww,
        height: wh,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        fullscreenable: false,
        resizable: false,
        frame: false,
        show: false,
        alwaysOnTop: true
    })
    
    win.on('blur', (e) => {
        //tray.toggleWindowVis();
    });

    win.setPosition(tBounds.x - ww/2, tBounds.y - wh);
    win.loadFile('index.html');

}

function getIconForArch() {

    switch(process.platform) {
        case 'win32':
            return 'ass/clock-multi.ico';
        default:
            return 'ass/clock-10-256.png';
    }

}

app.whenReady().then(() => {

    //app.dock.hide();

    tray = new Tray(getIconForArch());
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Quit',  click() {app.quit();}}
    ])
    tray.setToolTip('Left click to open, right to quit.')

    tray.toggleWindowVis = function() {

        if (win.isVisible()) {
            win.hide();
            return;
        }

        win.show();
    
    }

    tray.on('click', (e) => {
        tray.toggleWindowVis();
    });

    tray.setContextMenu(contextMenu)
    createWindow(tray.getBounds());

})

app.on('window-all-closed', e => e.preventDefault() );