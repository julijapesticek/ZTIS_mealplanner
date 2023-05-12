// main.js

// Modules to control application life and create native browser window
const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

// listen for app to be ready
app.on('ready', function(){
  // Create the browser window.
  mainWindow = new BrowserWindow({});
  // load html into window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'src', 'index.html'), // dirname - current directory
    protocol: 'file:',
    slashes: true
  }));
  // quit app when closed
  mainWindow.on('closed', function(){
    app.quit();
  });
})

  // build menu from template
//   const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
//   // insert the menu
//   Menu.setApplicationMenu(mainMenu);
// });

// handle create add window
// function createAddWindow(){
//   // Create the browser window.
//   addWindow = new BrowserWindow({
//     width: 300,
//     height: 200,
//     title: 'Add recipe'
//   });
//   // load html into window
//   addWindow.loadURL(url.format({
//     pathname: path.join(__dirname, 'src', 'app', 'app.component.html'), //dirname - current directory
//     protocol: 'file:',
//     slashes: true
//   }));
//   // garbage collection handle
//   addWindow.on('close', function(){
//     addWindow = null;
//   });
// }

// create menu template
// const mainMenuTemplate = [
//   {
//     label: 'Username',
//     submenu:[
//       {
//         label: 'Make meal plan',
//         click(){
//           createAddWindow();
//         }
//       },
//       {
//         label: 'Log out'
//       },
//       {
//         label: 'Quit',
//         accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
//         click(){
//           app.quit();
//         }
//       },
//     ]
//   }
// ];

// if mac add empty object to neginning of menu
// if(process.platform == 'darwin'){
//   mainMenuTemplate.unshift({});
// }

// // add developer tools item if not in production
// if(process.env.NODE_ENV !== 'production'){
//   mainMenuTemplate.push({
//     label: 'Developer Tools',
//     submenu:[
//       {
//         label: 'Add recipe',
//         click(){
//           createAddWindow();
//         }
//       },
//       {
//         label: 'Delete recipe'
//       },
//       {
//         label: 'Toggle DevTools',
//         accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
//         click(item, focusedWindow){
//           focusedWindow.toggleDevTools();
//         }
//       }
//     ]
//   });
// }