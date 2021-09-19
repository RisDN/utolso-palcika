const { app, BrowserWindow } = require('electron');
const path = require('path');

let ablak


app.on('ready', () => {
	ablak = new BrowserWindow({
		title: 'Utolsó pálcika',
		width: 1300,
		height: 800,
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