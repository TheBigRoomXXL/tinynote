// Configure Monaco loader to load worker correctly
window.MonacoEnvironment = {
  getWorkerUrl: function () {
    return './monaco-editor/0.51.0/min/vs/base/worker/workerMain.js';
  }
};

require.config({
  paths: {
    vs: "./monaco-editor/0.51.0/min/vs" // local (no worker)
    // vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.51.0/min/vs" // CDN
  }
});

// Match css theme to monaco theme
function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "vs-dark" : "vs";
}

// Get Saved content
const storageKey = "tinynote";
const defaultValue = "\n".repeat(42);
let changing = false;

require(["vs/editor/editor.main"], function () {
  // Instanciate monaco editor
  const editor = monaco.editor.create(document.getElementById("editor"), {
    value: localStorage.getItem(storageKey) || defaultValue,
    language: "markdown",
    theme: getSystemTheme(),
    minimap: { enabled: false },
    renderWhitespace: true,
    renderLineHighlight: "none",
    automaticLayout: true,
  });

  // Sync change from other tabs
  window.addEventListener("storage", (e) => {
    if (e.key !== storageKey || changing) return;
    console.log("storage");
    changing = true;
    editor.setValue(e.newValue || defaultValue);
    setTimeout(() => {
      changing = false;
    }, 1);
  });

  // Sync change to other tabs
  editor.getModel().onDidChangeContent(() => {
    if (changing) return;
    console.log("onDidChangeContent");
    changing = true;
    localStorage.setItem(storageKey, editor.getValue());
    setTimeout(() => {
      changing = false;
    }, 1);
  });

  // Listen to system theme changes
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
    const newTheme = e.matches ? "vs-dark" : "vs";
    monaco.editor.setTheme(newTheme);
  });
});
