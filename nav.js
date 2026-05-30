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
        <nav aria-label="Main navigation" class="main-menu" style="display: flex; align-items: center; width: 100%;">
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
             style="background-color: #062820; color: #ffffff; padding: 10px 20px; border-radius: 6px; margin-left: auto; text-decoration: none; font-weight: bold; display: flex; align-items: center; gap: 8px; transition: opacity 0.2s;">
             
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
               <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
               <polyline points="14 2 14 8 20 8"></polyline>
               <line x1="16" y1="13" x2="8" y2="13"></line>
               <line x1="16" y1="17" x2="8" y2="17"></line>
               <polyline points="10 9 9 9 8 9"></polyline>
             </svg>
             CV
          </a>
        </nav>
      </div>
    </header>
    `;
    
    // Highlights the correct link depending on the page
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
