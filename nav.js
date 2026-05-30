class MainNav extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    // This reads the 'active-page' attribute from your HTML tag
    // e.g., <main-nav active-page="home"></main-nav>
    const activePage = this.getAttribute('active-page') || '';

    // A simple helper function to add the 'active' class to the correct link
    const isActive = (page) => activePage === page ? 'active' : '';

    this.innerHTML = `
      <header class="site-header">
        <div class="header-brand">
          <a href="index.html" class="logo-link">
            <img src="images/logo.png" alt="SJ Logo" class="logo">
          </a>
          <div class="vertical-divider"></div>
          <div class="brand-text">
            <h1 class="brand-name">SINA JANGJOO</h1>
            <span class="brand-subtitle">SCHOLAR. RESEARCHER. TEACHER.</span>
          </div>
        </div>

        <nav class="main-navigation">
          <a href="index.html" class="nav-link ${isActive('home')}">Home</a>
          <a href="#about" class="nav-link ${isActive('about')}">About</a>
          <a href="#research" class="nav-link ${isActive('research')}">Research</a>
          <a href="publications.html" class="nav-link ${isActive('publications')}">Publications</a>
          <a href="#teaching" class="nav-link ${isActive('teaching')}">Teaching</a>
          <a href="#research-note" class="nav-link ${isActive('research-note')}">Research Note</a>
          <a href="#contact" class="nav-link ${isActive('contact')}">Contact</a>
        </nav>

        <div class="header-action">
          <a href="https://drive.google.com/file/d/1wV699dgGML-Hoiu8SZBhyOzrS-e5cQ9B/view?usp=sharing" target="_blank" class="cv-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
              <path d="M4.5 12.5A.5.5 0 0 1 5 12h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 10h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm1.639-3.708 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V8.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V8s1.54-1.274 1.639-1.208zM6.25 6a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"/>
            </svg>
            CV
          </a>
        </div>
      </header>
    `;
  }
}

// Registers the custom <main-nav> tag with the browser
customElements.define('main-nav', MainNav);
