// =========================
// EZLink Security
// =========================

(function () {

  "use strict";

  // BLOCK RIGHT CLICK

  window.addEventListener("contextmenu", function (e) {

    e.preventDefault();

  }, true);

  // BLOCK KEY COMBINATIONS

  window.addEventListener("keydown", function (e) {

    const key = e.key.toLowerCase();

    // F12
    if (e.keyCode === 123) {

      e.preventDefault();
      e.stopPropagation();

      return false;

    }

    // CTRL + SHIFT + I
    if (e.ctrlKey && e.shiftKey && key === "i") {

      e.preventDefault();
      e.stopPropagation();

      return false;

    }

    // CTRL + SHIFT + J
    if (e.ctrlKey && e.shiftKey && key === "j") {

      e.preventDefault();
      e.stopPropagation();

      return false;

    }

    // CTRL + SHIFT + C
    if (e.ctrlKey && e.shiftKey && key === "c") {

      e.preventDefault();
      e.stopPropagation();

      return false;

    }

    // CTRL + U
    if (e.ctrlKey && key === "u") {

      e.preventDefault();
      e.stopPropagation();

      return false;

    }

    // CTRL + S
    if (e.ctrlKey && key === "s") {

      e.preventDefault();
      e.stopPropagation();

      return false;

    }

  }, true);

  // DEVTOOLS DETECTION

  function detectDevTools() {

    const widthThreshold =
      window.outerWidth - window.innerWidth > 160;

    const heightThreshold =
      window.outerHeight - window.innerHeight > 160;

    if (widthThreshold || heightThreshold) {

      document.body.innerHTML = `

        <div style="
          background:black;
          color:white;
          width:100%;
          height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          flex-direction:column;
          font-family:Arial;
        ">

          <h1>Access Denied</h1>

          <p>Developer tools detected.</p>

        </div>

      `;

    }

  }

  setInterval(detectDevTools, 500);

  // CLEAR CONSOLE

  setInterval(function () {

    console.clear();

  }, 1000);

})();
