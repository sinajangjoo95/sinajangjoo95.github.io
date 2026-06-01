class MainNav extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const manualActivePage = this.getAttribute("active-page") || "";
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const currentHash = window.location.hash.replace("#", "");

    const getActivePage = () => {
      if (manualActivePage) return manualActivePage;

      if (currentPath === "index.html") return "home";
      if (currentPath === "research.html") return "research";
      if (currentPath === "publications.html") return "publications";
      if (currentPath === "teaching.html") return "teaching";
      if (currentPath === "blog.html") return "blog";
      if (currentPath === "post.html") return "blog";
      if (currentPath === "research-note.html") return "blog";

      if (currentHash === "about") return "about";
      if (currentHash === "research") return "research";
      if (currentHash === "teaching") return "teaching";
      if (currentHash === "blog") return "blog";
      if (currentHash === "research-note") return "blog";
      if (currentHash === "contact") return "contact";

      return "home";
    };

    const activePage = getActivePage();
    const isActive = (page) => (activePage === page ? "active" : "");

    this.innerHTML = `
      <header class="sj-site-header">
        <div class="sj-header-inner">

          <div class="sj-header-brand">
            <a href="index.html" class="sj-logo-link" aria-label="Sina Jangjoo Home">
              <img src="images/icon.png" alt="SJ Logo" class="sj-logo">
            </a>

            <div class="sj-vertical-divider"></div>

            <a href="index.html" class="sj-brand-text" aria-label="Sina Jangjoo Home">
              <div class="sj-brand-name">SINA JANGJOO</div>
              <div class="sj-brand-subtitle">SCHOLAR. RESEARCHER. TEACHER.</div>
            </a>
          </div>

          <nav class="sj-main-navigation" aria-label="Main navigation">
            <a href="index.html" class="sj-nav-link ${isActive("home")}">Home</a>
            <a href="research.html" class="sj-nav-link ${isActive("research")}">Research</a>
            <a href="publications.html" class="sj-nav-link ${isActive("publications")}">Publications</a>
            <a href="teaching.html" class="sj-nav-link ${isActive("teaching")}">Teaching</a>
            <a href="blog.html" class="sj-nav-link ${isActive("blog")}">Blog</a>
            <a href="index.html#about" class="sj-nav-link ${isActive("about")}">About</a>
            <a href="index.html#contact" class="sj-nav-link ${isActive("contact")}">Contact</a>
          </nav>

          <div class="sj-header-action">
            <a 
              href="https://drive.google.com/file/d/1wV699dgGML-Hoiu8SZBhyOzrS-e5cQ9B/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              class="sj-cv-button"
              aria-label="Open CV"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                <path d="M4.5 12.5A.5.5 0 0 1 5 12h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 10h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm1.639-3.708 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V8.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V8s1.54-1.274 1.639-1.208zM6.25 6a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"/>
              </svg>
              <span>CV</span>
            </a>
          </div>

        </div>
      </header>
    `;
  }
}

if (!customElements.get("main-nav")) {
  customElements.define("main-nav", MainNav);
}
