// Websites cannot fully hide source code.
// This only discourages casual inspection.

// Disable right click
window.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

// Block common shortcuts
window.addEventListener("keydown", function (e) {

  if (e.key === "F12") {
    e.preventDefault();
  }

  if (e.ctrlKey && e.shiftKey && e.key === "I") {
    e.preventDefault();
  }

  if (e.ctrlKey && e.shiftKey && e.key === "J") {
    e.preventDefault();
  }

  if (e.ctrlKey && e.key === "u") {
    e.preventDefault();
  }
});

// Basic devtools detection
setInterval(function () {

  const widthThreshold = window.outerWidth - window.innerWidth > 160;
  const heightThreshold = window.outerHeight - window.innerHeight > 160;

  if (widthThreshold || heightThreshold) {
    document.body.innerHTML = `
      <div class="container text-center mt-5">
        <h1>Developer Tools Detected</h1>
      </div>
    `;
  }

}, 1000);
