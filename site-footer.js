class SiteFooter extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.injectStyles();

    this.innerHTML = `
      <footer class="sj-footer">
        <button class="sj-back-to-top" type="button" aria-label="Back to top">
          ↑
        </button>

        <div class="sj-footer-inner">
          <div class="sj-footer-main">
            <div class="sj-footer-identity">
              <div class="sj-footer-brand-line">
                <img src="images/icon w.png" alt="SJ Logo" class="sj-footer-logo">
                <h2>Sina Jangjoo</h2>
              </div>

              <p>Public Administration · Policy Process · Technology Governance</p>
            </div>

            <nav class="sj-footer-links" aria-label="Footer links">
              <a href="mailto:sjangjoo@fsu.edu">Email</a>
              <a href="https://scholar.google.com/citations?user=rZ92vUkAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Google Scholar</a>
              <a href="https://drive.google.com/file/d/1wV699dgGML-Hoiu8SZBhyOzrS-e5cQ9B/view" target="_blank" rel="noopener noreferrer">CV</a>
              <a href="https://www.researchgate.net/profile/Sina-Jangjoo-2?ev=hdr_xprf" target="_blank" rel="noopener noreferrer">ResearchGate</a>
            </nav>
          </div>

          <div class="sj-footer-bottom">
            <a href="mailto:sjangjoo@fsu.edu">sjangjoo@fsu.edu</a>
            <span>© ${new Date().getFullYear()} Sina Jangjoo</span>
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
        background: #073B32;
        color: #ffffff;
        border-top: 1px solid rgba(255, 255, 255, 0.10);
        margin-top: 56px;
        padding: 34px 0 26px;
      }

      .sj-footer-inner {
        width: min(1356px, calc(100% - 180px));
        margin: 0 auto;
      }

      .sj-footer-main {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 32px;
      }

      .sj-footer-identity {
        min-width: 0;
      }

      .sj-footer-brand-line {
        display: flex;
        align-items: center;
        gap: 11px;
        margin-bottom: 6px;
      }

      .sj-footer-logo {
        width: 23px;
        height: 28px;
        object-fit: contain;
        flex: 0 0 auto;
      }

      .sj-footer-identity h2 {
        margin: 0;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 19px;
        font-weight: 400;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #ffffff;
        line-height: 1.2;
      }

      .sj-footer-identity p {
        margin: 0;
        color: rgba(255, 255, 255, 0.72);
        font-size: 13.5px;
        line-height: 1.5;
      }

      .sj-footer-links {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        flex-wrap: wrap;
        gap: 22px;
        font-size: 13.5px;
      }

      .sj-footer-links a {
        color: rgba(255, 255, 255, 0.82);
        text-decoration: none;
        transition: color 0.2s ease;
      }

      .sj-footer-links a:hover {
        color: #ffffff;
      }

      .sj-footer-bottom {
        margin-top: 24px;
        padding-top: 18px;
        border-top: 1px solid rgba(255, 255, 255, 0.12);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        color: rgba(255, 255, 255, 0.58);
        font-size: 12.5px;
      }

      .sj-footer-bottom a {
        color: rgba(255, 255, 255, 0.58);
        text-decoration: none;
      }

      .sj-footer-bottom a:hover {
        color: #ffffff;
      }

      .sj-back-to-top {
        position: fixed;
        right: 22px;
        bottom: 22px;
        z-index: 2000;
        width: 24px;
        height: 24px;
        display: grid;
        place-items: center;
        background: #062820;
        color: #ffffff;
        border: none;
        border-radius: 50%;
        font-size: 12px;
        line-height: 1;
        cursor: pointer;
        box-shadow: 0 7px 16px rgba(6, 40, 32, 0.18);
        opacity: 0;
        visibility: hidden;
        transform: translateY(8px);
        transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease, background-color 0.2s ease;
      }

      .sj-back-to-top.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .sj-back-to-top:hover {
        background: #B08A45;
      }

      @media (max-width: 1200px) {
        .sj-footer-inner {
          width: min(100% - 50px, 1100px);
        }
      }

      @media (max-width: 760px) {
        .sj-footer {
          padding: 32px 0 24px;
        }

        .sj-footer-inner {
          width: calc(100% - 28px);
        }

        .sj-footer-main {
          display: block;
        }

        .sj-footer-brand-line {
          gap: 10px;
        }

        .sj-footer-logo {
          width: 21px;
          height: 26px;
        }

        .sj-footer-identity h2 {
          font-size: 17px;
          letter-spacing: 0.10em;
        }

        .sj-footer-identity p {
          font-size: 13px;
          line-height: 1.55;
        }

        .sj-footer-links {
          justify-content: flex-start;
          gap: 16px;
          margin-top: 18px;
        }

        .sj-footer-bottom {
          display: block;
          line-height: 1.9;
        }

        .sj-back-to-top {
          right: 16px;
          bottom: 16px;
          width: 24px;
          height: 24px;
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
