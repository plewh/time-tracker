const { app, Menu, BrowserWindow, Tray, ipcMain, Dock } = require('electron')

ipcMain.on('dunno', (event, arg) => {
    tray.showTrayPopUp();
})



let win;
let tray;
let wh = 400;
let ww = 300;

function createWindow (tBounds) {
    win = new BrowserWindow({
        width: wh,
        height: ww,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        fullscreenable: false,
        resizable: false,
        frame: false,
        show: false,
    })

    //console.log(`${tBounds.x}:${tBounds.y} | ${win.getBounds().x}:${win.getBounds().y}`);
    win.setPosition(tBounds.x - wh/2, tBounds.y - ww);
    win.loadFile('index.html')
}

app.whenReady().then(() => {

    //app.dock.hide();

    tray = new Tray('noerror.ico')
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Quit',  click() {app.quit();}}
    ])
    tray.setToolTip('Left click to open, right to quit.')

    tray.toggleWindowVis = function() {

        //tray.popUpContextMenu(contextMenu, {x:rect.x + 10, y:rect.y + 10});
        //createWindow(tray.getBounds());

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