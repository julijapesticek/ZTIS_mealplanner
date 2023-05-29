// // main.js

// // Modules to control application life and create native browser window
// const electron = require('electron');
// const url = require('url');
// const path = require('path');

// const { app, BrowserWindow, Menu } = electron;

// let mainWindow;

// // listen for app to be ready
// app.on('ready', function(){
//   // Create the browser window.
//   mainWindow = new BrowserWindow({});
//   // load html into window
//   mainWindow.loadURL(url.format({
//     pathname: path.join(__dirname, 'src', 'index.html'), // dirname - current directory
//     protocol: 'file:',
//     slashes: true
//   }));
//   // quit app when closed
//   mainWindow.on('closed', function(){
//     app.quit();
//   });
// })