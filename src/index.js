const { app, BrowserWindow, autoUpdater, dialog } = require('electron');
const path = require('path');

const server = 'https://github.com/'
const url = `${server}/RisDN/utolso-palcika/releases/tag/1v`
autoUpdater.setFeedURL({ url })


require('update-electron-app')()


let ablak

setInterval(() => {
    autoUpdater.checkForUpdates()
}, 60000)

autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
        type: 'info',
        buttons: ['Restart', 'Later'],
        title: 'Application Update',
        message: process.platform === 'win32' ? releaseNotes : releaseName,
        detail: 'A new version has been downloaded. Restart the application to apply the updates.'
    }

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
        if (returnValue.response === 0) autoUpdater.quitAndInstall()
    })
})


app.on('ready', () => {
    ablak = new BrowserWindow({
        title: 'Utolsó pálcika',
        width: 1000,
        height: 600,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    })
    ablak.setIcon(path.join(__dirname, 'src/ikon.ico'))
    ablak.loadFile(path.join(__dirname, 'index.html'));
    ablak.removeMenu()
        //ablak.webContents.openDevTools();
})


if (require('electron-squirrel-startup')) {
    app.quit();
}