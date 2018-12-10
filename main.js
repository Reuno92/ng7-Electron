const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let win;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });

  //Chargement du dossier dist d'Angular
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );


// Le suivi est optionnel et sera ouvert dans la devTools: win.webContents.openDevTools()

  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

// Sur macOS, fermeture de la fenêtre qui ne quitte pas l'app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Initialise la principale fenêtre de l'app
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
