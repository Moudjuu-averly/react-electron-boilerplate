const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const isDev = require("electron-is-dev");

let mainWindow;

function createWindow() {
  // Define the applications dimension
  mainWindow = new BrowserWindow({ 
    width: 1920, 
    height: 1080, 
    fullscreen: true,
    frame: false,
    title: 'Averly Digital Signage',
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true
    }
  });

  // Determine what to render based on environment
  mainWindow.setFullScreen(true);
  mainWindow.maximize()
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  // Create event to close window on close
  mainWindow.on("closed", () => (mainWindow = null));
}

// On launch create app window
app.on("ready", createWindow);
app.on("window-all-closed", () => {
    // Based on which operating system you are using
  if (process.platform !== "linux") {
      // If os not linux, close the app
      // you can add darwin(mac os), win64 and so many more
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow !== null) {
    createWindow();
  }
});
