// main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Load the Angular app
  win.loadURL(`file://${path.join(__dirname, 'dist', 'game-store', 'browser', 'index.html')}`);

  // win.loadURL(`http://localhost:4200`);


  // Open the DevTools (optional)
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

// This method will be called when Electron has finished initialization
app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// On macOS, re-create a window when the dock icon is clicked
app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
