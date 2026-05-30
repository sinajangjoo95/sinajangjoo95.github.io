class MainNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <header class="site-nav" id="top">
      <div class="nav-inner">
        <a aria-label="Sina Jangjoo home" class="brand" href="index.html">
          <span aria-hidden="true" class="logo-mark"><img alt="" src="images/extracted_icon_1.png"></span>
          <span aria-hidden="true" class="brand-line"></span>
          <span class="brand-text"><strong>SINA JANGJOO</strong><span>SCHOLAR. RESEARCHER. TEACHER.</span></span>
        </a>
        <nav aria-label="Main navigation" class="main-menu">
          <a id="nav-home" href="index.html">Home</a>
          <a id="nav-about" href="index.html#about">About</a>
          <a id="nav-research" href="research.html">Research</a>
          <a id="nav-publications" href="publications.html">Publications</a>
          <a id="nav-teaching" href="teaching.html">Teaching</a>
          <a id="nav-notes" href="index.html#Research Note">Research Note</a>
          <a id="nav-contact" href="index.html#contact">Contact</a>
          
          <a id="nav-cv" 
             href="https://drive.google.com/file/d/1wV699dgGML-Hoiu8SZBhyOzrS-e5cQ9B/view?usp=sharing" 
             target="_blank" 
             rel="noopener noreferrer" 
             style="background-color: #062820; color: #ffffff; padding: 8px 18px; border-radius: 4px; margin-left: 15px; text-decoration: none; font-weight: bold; display: inline-block;">
             CV
          </a>
        </nav>
      </div>
    </header>
    `;
    
    // This part highlights the correct link depending on the page
    const activePage = this.getAttribute('active-page');
    if (activePage) {
      const activeLink = this.querySelector('#nav-' + activePage);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  }
}

// Registers the custom HTML tag
customElements.define('main-nav', MainNav);
