(function () {
  /*
    Lightweight access gate for admin-composer.html.

    Important:
    This is NOT real server-side security.
    It only prevents casual access to the visible composer page.
    Real publishing control still happens through GitHub repository write access.
  */

  const ADMIN_PASS_HASH = "a2ce97f22b3c70511a9542d6aea0f214e2e9ef37a9deb066e91bb3455040fadf";
  const SESSION_KEY = "sj_admin_composer_unlocked";

  function createGateStyles() {
    const style = document.createElement("style");

    style.textContent = `
      body.sj-admin-locked {
        overflow: hidden;
      }

      .sj-admin-gate {
        position: fixed;
        inset: 0;
        z-index: 999999;
        background: #FAF8F4;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        color: #333333;
      }

      .sj-admin-gate-card {
        width: min(520px, 100%);
        background: #ffffff;
        border: 1px solid rgba(0, 0, 0, 0.10);
        border-radius: 10px;
        box-shadow: 0 18px 44px rgba(0, 0, 0, 0.10);
        padding: 30px;
      }

      .sj-admin-gate-card h1 {
        margin: 0 0 12px 0;
        color: #123f36;
        font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
        font-size: 1.7rem;
        line-height: 1.2;
      }

      .sj-admin-gate-card p {
        margin: 0 0 18px 0;
        color: #333333;
        font-size: 0.98rem;
        line-height: 1.65;
      }

      .sj-admin-gate-note {
        border-left: 4px solid #b58b47;
        background: #FAF8F4;
        border-radius: 8px;
        padding: 12px 14px;
        margin-bottom: 18px;
        font-size: 0.9rem;
        line-height: 1.55;
        color: #4a4038;
      }

      .sj-admin-gate-card label {
        display: block;
        color: #111111;
        font-size: 0.86rem;
        font-weight: 700;
        margin-bottom: 7px;
      }

      .sj-admin-gate-card input {
        width: 100%;
        border: 1px solid rgba(0, 0, 0, 0.14);
        border-radius: 8px;
        padding: 11px 12px;
        color: #333333;
        background: #ffffff;
        font: inherit;
        line-height: 1.45;
      }

      .sj-admin-gate-card input:focus {
        outline: 3px solid rgba(181, 139, 71, 0.28);
        border-color: rgba(181, 139, 71, 0.75);
      }

      .sj-admin-gate-actions {
        display: flex;
        align-items: center;
        gap: 10px;
        flex-wrap: wrap;
        margin-top: 16px;
      }

      .sj-admin-gate-button {
        border: 1px solid #123f36;
        background: #123f36;
        color: #ffffff;
        border-radius: 7px;
        padding: 10px 14px;
        font-size: 0.92rem;
        font-weight: 700;
        cursor: pointer;
        transition: background 0.18s ease, transform 0.18s ease;
      }

      .sj-admin-gate-button:hover {
        background: #0d3029;
        transform: translateY(-1px);
      }

      .sj-admin-gate-error {
        display: none;
        margin-top: 12px;
        color: #782F40;
        font-size: 0.88rem;
        font-weight: 700;
        line-height: 1.45;
      }

      .sj-admin-gate-error.visible {
        display: block;
      }

      .sj-admin-gate-small {
        margin-top: 14px !important;
        color: #5A5A5A !important;
        font-size: 0.82rem !important;
        line-height: 1.55 !important;
      }
    `;

    document.head.appendChild(style);
  }

  async function sha256(value) {
    const encoder = new TextEncoder();
    const data = encoder.encode(value);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray
      .map(byte => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  function showGate() {
    document.body.classList.add("sj-admin-locked");

    const gate = document.createElement("div");
    gate.className = "sj-admin-gate";
    gate.id = "sj-admin-gate";

    gate.innerHTML = `
      <div class="sj-admin-gate-card" role="dialog" aria-modal="true" aria-labelledby="sj-admin-gate-title">
        <h1 id="sj-admin-gate-title">Admin Composer</h1>
        <p>Enter your access phrase to open the composer.</p>

        <div class="sj-admin-gate-note">
          This gate prevents casual access only. Publishing is still protected by GitHub commit access.
        </div>

        <form id="sj-admin-gate-form">
          <label for="sj-admin-pass">Access phrase</label>
          <input id="sj-admin-pass" type="password" autocomplete="current-password">

          <div class="sj-admin-gate-actions">
            <button class="sj-admin-gate-button" type="submit">Open Composer</button>
          </div>

          <div class="sj-admin-gate-error" id="sj-admin-gate-error">
            Incorrect access phrase.
          </div>
        </form>

        <p class="sj-admin-gate-small">
          If this is your first setup, replace the placeholder hash in admin-gate.js before using this page.
        </p>
      </div>
    `;

    document.body.appendChild(gate);

    const form = document.getElementById("sj-admin-gate-form");
    const input = document.getElementById("sj-admin-pass");
    const error = document.getElementById("sj-admin-gate-error");

    input.focus();

    form.addEventListener("submit", async event => {
      event.preventDefault();

      const enteredValue = input.value;

      if (!enteredValue) {
        error.textContent = "Enter your access phrase.";
        error.classList.add("visible");
        return;
      }

      const enteredHash = await sha256(enteredValue);

      if (enteredHash === ADMIN_PASS_HASH) {
        sessionStorage.setItem(SESSION_KEY, "true");
        gate.remove();
        document.body.classList.remove("sj-admin-locked");
      } else {
        error.textContent = "Incorrect access phrase.";
        error.classList.add("visible");
        input.value = "";
        input.focus();
      }
    });
  }

  function showSetupWarning() {
    document.body.classList.add("sj-admin-locked");

    const gate = document.createElement("div");
    gate.className = "sj-admin-gate";
    gate.id = "sj-admin-gate";

    gate.innerHTML = `
      <div class="sj-admin-gate-card" role="dialog" aria-modal="true">
        <h1>Admin Gate Not Set Up Yet</h1>
        <p>You still need to replace the placeholder hash in <strong>admin-gate.js</strong>.</p>

        <div class="sj-admin-gate-note">
          Ask ChatGPT for Step 6, and I will show you exactly how to generate your private hash and where to paste it.
        </div>
      </div>
    `;

    document.body.appendChild(gate);
  }

  document.addEventListener("DOMContentLoaded", () => {
    createGateStyles();

    if (ADMIN_PASS_HASH === "REPLACE_THIS_WITH_YOUR_HASH") {
      showSetupWarning();
      return;
    }

    if (sessionStorage.getItem(SESSION_KEY) === "true") {
      return;
    }

    showGate();
  });
})();
