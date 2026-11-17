'use strict';

const { app, BrowserWindow, net, protocol, session } = require('electron');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const APP_URL = 'meufinanceiro://app/index.html';
const INDEX_PATH = path.join(__dirname, 'index.html');
let mainWindow = null;

// Origem estável e segura: mantém localStorage entre aberturas e atualizações.
protocol.registerSchemesAsPrivileged([
  {
    scheme: 'meufinanceiro',
    privileges: { standard: true, secure: true, supportFetchAPI: true },
  },
]);

function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'Meu Financeiro',
    width: 1240,
    height: 820,
    minWidth: 370,
    minHeight: 540,
    backgroundColor: '#F5F7FB',
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
    },
  });

  // O aplicativo só navega para sua própria interface local.
  mainWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
  mainWindow.webContents.on('will-navigate', (event, targetUrl) => {
    if (targetUrl !== APP_URL) event.preventDefault();
  });

  mainWindow.once('ready-to-show', () => mainWindow?.show());
  mainWindow.on('closed', () => { mainWindow = null; });
  mainWindow.loadURL(APP_URL);
}

app.setAppUserModelId('com.fernandohsmarques04.meufinanceiro');

app.whenReady().then(() => {
  protocol.handle('meufinanceiro', (request) => {
    const requested = new URL(request.url);
    if (requested.host !== 'app' || requested.pathname !== '/index.html') {
      return new Response('Arquivo não encontrado', { status: 404 });
    }
    return net.fetch(pathToFileURL(INDEX_PATH).toString());
  });

  session.defaultSession.setPermissionRequestHandler((_webContents, _permission, callback) => callback(false));
  createWindow();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
