(function () {

  // DISABLE RIGHT CLICK

  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  // BLOCK COMMON DEVTOOLS SHORTCUTS

  document.addEventListener("keydown", function (e) {

    // F12
    if (e.key === "F12") {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // CTRL + SHIFT + I
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i") {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // CTRL + SHIFT + J
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "j") {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // CTRL + SHIFT + C
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "c") {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // CTRL + U
    if (e.ctrlKey && e.key.toLowerCase() === "u") {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // CTRL + S
    if (e.ctrlKey && e.key.toLowerCase() === "s") {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

  }, true);

  // DEVTOOLS SIZE DETECTION

  function detectDevTools() {

    const widthThreshold =
      window.outerWidth - window.innerWidth > 160;

    const heightThreshold =
      window.outerHeight - window.innerHeight > 160;

    if (widthThreshold || heightThreshold) {

      document.body.innerHTML = `
        <div style="
          font-family: Arial;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: black;
          color: white;
          flex-direction: column;
        ">
          <h1>Access Denied</h1>
          <p>Developer tools detected.</p>
        </div>
      `;

      setTimeout(() => {
        window.location.reload();
      }, 1500);

    }

  }

  setInterval(detectDevTools, 1000);

  // CLEAR CONSOLE LOOP

  setInterval(() => {

    console.clear();

  }, 1000);

})();
