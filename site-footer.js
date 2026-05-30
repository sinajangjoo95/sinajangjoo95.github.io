class SiteFooter extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.injectStyles();

    this.innerHTML = `
      <footer class="sj-footer">
        <button class="sj-back-to-top" type="button" aria-label="Back to top">
          <span class="sj-back-arrow">↑</span>
          <span>Back to Top</span>
        </button>

        <div class="sj-footer-inner">
          <div class="sj-footer-brand">
            <h2>Sina Jangjoo</h2>
            <p>Public Administration · Policy Process · Technology Governance</p>
          </div>

          <div class="sj-footer-summary">
            <a href="mailto:sjangjoo@fsu.edu">Email: sjangjoo@fsu.edu</a>
            <span>·</span>
            <a href="https://scholar.google.com/citations?user=rZ92vUkAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Google Scholar</a>
            <span>·</span>
            <a href="https://drive.google.com/file/d/1wV699dgGML-Hoiu8SZBhyOzrS-e5cQ9B/view" target="_blank" rel="noopener noreferrer">CV</a>
            <span>·</span>
            <a href="https://www.researchgate.net/profile/Sina-Jangjoo-2?ev=hdr_xprf" target="_blank" rel="noopener noreferrer">ResearchGate</a>
          </div>

          <div class="sj-footer-links">
            <a href="mailto:sjangjoo@fsu.edu">
              <span>Email</span>
              <strong>sjangjoo@fsu.edu</strong>
            </a>

            <a href="https://scholar.google.com/citations?user=rZ92vUkAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">
              <span>Google Scholar</span>
              <strong>Profile</strong>
            </a>

            <a href="https://drive.google.com/file/d/1wV699dgGML-Hoiu8SZBhyOzrS-e5cQ9B/view" target="_blank" rel="noopener noreferrer">
              <span>CV</span>
              <strong>View CV</strong>
            </a>

            <a href="https://www.researchgate.net/profile/Sina-Jangjoo-2?ev=hdr_xprf" target="_blank" rel="noopener noreferrer">
              <span>ResearchGate</span>
              <strong>Profile</strong>
            </a>
          </div>

          <div class="sj-footer-bottom">
            <p>© ${new Date().getFullYear()} Sina Jangjoo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;

    const backToTopButton = this.querySelector(".sj-back-to-top");

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });

    const toggleBackToTop = () => {
      if (window.scrollY > 350) {
        backToTopButton.classList.add("visible");
      } else {
        backToTopButton.classList.remove("visible");
      }
    };

    toggleBackToTop();
    window.addEventListener("scroll", toggleBackToTop, { passive: true });
  }

  injectStyles() {
    if (document.getElementById("sj-footer-styles")) return;

    const style = document.createElement("style");
    style.id = "sj-footer-styles";

    style.textContent = `
      .sj-footer {
        position: relative;
        background: #062820;
        color: #ffffff;
        margin-top: 56px;
        padding: 58px 0 34px;
        border-top: 1px solid rgba(255, 255, 255, 0.08);
      }

      .sj-footer-inner {
        width: min(1356px, calc(100% - 180px));
        margin: 0 auto;
      }

      .sj-footer-brand {
        text-align: center;
        margin-bottom: 24px;
      }

      .sj-footer-brand h2 {
        font-family: Georgia, "Times New Roman", serif;
        font-size: 28px;
        line-height: 1.15;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #ffffff;
        margin: 0 0 10px;
        font-weight: 600;
      }

      .sj-footer-brand p {
        margin: 0;
        color: rgba(255, 255, 255, 0.78);
        font-size: 14px;
        letter-spacing: 0.08em;
      }

      .sj-footer-summary {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        margin: 24px 0 34px;
        color: rgba(255, 255, 255, 0.82);
        font-size: 14px;
      }

      .sj-footer-summary a {
        color: rgba(255, 255, 255, 0.86);
        text-decoration: none;
        transition: color 0.2s ease;
      }

      .sj-footer-summary a:hover {
        color: #ffffff;
      }

      .sj-footer-summary span {
        color: #B08A45;
      }

      .sj-footer-links {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 18px;
        margin-top: 22px;
      }

      .sj-footer-links a {
        display: block;
        padding: 20px 22px;
        min-height: 92px;
        background: rgba(255, 255, 255, 0.045);
        border: 1px solid rgba(255, 255, 255, 0.09);
        border-radius: 7px;
        color: #ffffff;
        text-decoration: none;
        transition: background-color 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
      }

      .sj-footer-links a:hover {
        background: rgba(255, 255, 255, 0.075);
        border-color: rgba(176, 138, 69, 0.55);
        transform: translateY(-2px);
      }

      .sj-footer-links span {
        display: block;
        color: #B08A45;
        font-size: 12px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        font-weight: 700;
        margin-bottom: 8px;
      }

      .sj-footer-links strong {
        display: block;
        color: rgba(255, 255, 255, 0.9);
        font-size: 14px;
        font-weight: 500;
        overflow-wrap: anywhere;
      }

      .sj-footer-bottom {
        margin-top: 36px;
        padding-top: 24px;
        border-top: 1px solid rgba(255, 255, 255, 0.09);
        text-align: center;
      }

      .sj-footer-bottom p {
        margin: 0;
        color: rgba(255, 255, 255, 0.58);
        font-size: 13px;
      }

      .sj-back-to-top {
        position: fixed;
        right: 28px;
        bottom: 28px;
        z-index: 2000;
        height: 44px;
        padding: 0 18px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 9px;
        background: #073B32;
        color: #ffffff;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 999px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 18px 36px rgba(6, 40, 32, 0.22);
        opacity: 0;
        visibility: hidden;
        transform: translateY(12px);
        transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease, background-color 0.2s ease;
      }

      .sj-back-to-top.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .sj-back-to-top:hover {
        background: #062820;
      }

      .sj-back-arrow {
        font-size: 16px;
        line-height: 1;
        color: #B08A45;
      }

      @media (max-width: 1200px) {
        .sj-footer-inner {
          width: min(100% - 50px, 1100px);
        }

        .sj-footer-links {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 700px) {
        .sj-footer {
          padding: 48px 0 30px;
        }

        .sj-footer-inner {
          width: calc(100% - 28px);
        }

        .sj-footer-brand h2 {
          font-size: 22px;
          letter-spacing: 0.12em;
        }

        .sj-footer-brand p {
          font-size: 13px;
          line-height: 1.6;
        }

        .sj-footer-summary {
          display: block;
          text-align: center;
          line-height: 2;
        }

        .sj-footer-summary span {
          display: none;
        }

        .sj-footer-summary a {
          display: block;
        }

        .sj-footer-links {
          grid-template-columns: 1fr;
        }

        .sj-back-to-top {
          right: 18px;
          bottom: 18px;
          height: 42px;
          padding: 0 15px;
          font-size: 12px;
        }
      }
    `;

    document.head.appendChild(style);
  }
}

if (!customElements.get("site-footer")) {
  customElements.define("site-footer", SiteFooter);
}
