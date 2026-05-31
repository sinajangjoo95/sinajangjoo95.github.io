(function () {
  const allPosts = () => (window.SJ_BLOG_POSTS || []).slice();

  const posts = () => {
    return allPosts().filter(post => post.published !== false);
  };

  const areaMeta = {
    crf: {
      label: "Contested Rule Formation and Institutional Mismatch",
      icon: "images/extracted_icon_2.png",
      order: 1
    },
    ai: {
      label: "AI and Emerging Technology Governance",
      icon: "images/extracted_icon_3.png",
      order: 2
    },
    energy: {
      label: "Clean Energy, Rule Location, and Constrained Polycentricity",
      icon: "images/extracted_icon_4.png",
      order: 3
    },
    nonprofits: {
      label: "Civil Society, Nonprofits, and Shadow Rule-Making",
      icon: "images/extracted_icon_5.png",
      order: 4
    },
    methods: {
      label: "Collaborative Governance and Design Methods",
      icon: "images/extracted_icon_6.png",
      order: 5
    },
    urban: {
      label: "Urban Planning, Public Space, and Community Wellbeing",
      icon: "images/extracted_icon_8.png",
      order: 6
    },
    none: {
      label: "Other",
      icon: "",
      order: 99
    }
  };

  const typeMeta = {
    "research-note": {
      label: "Research Notes",
      singleLabel: "Research Note",
      className: "type-research-note",
      order: 1
    },
    "paper-report": {
      label: "Paper Reports",
      singleLabel: "Paper Report",
      className: "type-paper-summary",
      order: 2
    },
    commentary: {
      label: "Commentary",
      singleLabel: "Commentary",
      className: "type-commentary",
      order: 3
    },
    "public-media": {
      label: "Public Media",
      singleLabel: "Public Media",
      className: "type-public-media",
      order: 4
    }
  };

  function escapeHTML(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatDate(value) {
    if (!value) return "";

    const date = new Date(value + "T00:00:00");

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  }

  function latestSort(a, b) {
    const dateA = new Date((a.date || "1900-01-01") + "T00:00:00");
    const dateB = new Date((b.date || "1900-01-01") + "T00:00:00");

    return dateB - dateA;
  }

  function getPostYear(post) {
    return (post.date || "").slice(0, 4);
  }

  function postAnchorUrl(post) {
    return `blog.html#${encodeURIComponent(post.id)}`;
  }

  function postReadUrl(post) {
    return `post.html?post=${encodeURIComponent(post.id)}`;
  }

  function areaTagsHTML(post) {
    return (post.areas || [])
      .map(areaKey => {
        const area = areaMeta[areaKey];

        if (!area || !area.icon) return "";

        return `
          <span class="area-tag" tabindex="0" title="${escapeHTML(area.label)}" data-label="${escapeHTML(area.label)}">
            <img src="${escapeHTML(area.icon)}" alt="${escapeHTML(area.label)}">
          </span>
        `;
      })
      .join("");
  }

  function postCardHTML(post) {
    const type = typeMeta[post.type] || typeMeta["research-note"];
    const date = formatDate(post.date);
    const doiLink = post.doiUrl
      ? `<a href="${escapeHTML(post.doiUrl)}" target="_blank" rel="noopener">Article DOI</a>`
      : "";

    return `
      <article
        class="media-card"
        id="${escapeHTML(post.id)}"
        data-year="${escapeHTML(getPostYear(post))}"
        data-type="${escapeHTML(post.type)}"
        data-primary-area="${escapeHTML(post.primaryArea || "none")}"
      >
        <h3>
          <a href="${postReadUrl(post)}" aria-label="Read ${escapeHTML(post.title)}">
            ${escapeHTML(post.title)}
          </a>
        </h3>

        <p class="summary">${escapeHTML(post.summary)}</p>
        <p>${escapeHTML(post.excerpt)}</p>

        <div class="media-footer">
          <div class="media-meta">
            <span class="type-label ${escapeHTML(type.className)}">${escapeHTML(post.typeLabel || type.singleLabel)}</span>
            ${date ? `<span class="small">${escapeHTML(date)}</span>` : ""}

            <div class="media-links">
              ${doiLink}
            </div>
          </div>

          <div class="area-tags" aria-label="Research area tags">
            ${areaTagsHTML(post)}
          </div>
        </div>
      </article>
    `;
  }

  function featuredCardHTML(post) {
    return `
      <a class="featured-card" href="${postAnchorUrl(post)}">
        <span>${escapeHTML(post.typeLabel || "Blog")}</span>
        <h3>${escapeHTML(post.title)}</h3>
        <p>${escapeHTML(post.summary)}</p>
        <strong class="jump-note">View in Blog ↓</strong>
      </a>
    `;
  }

  function homeCardHTML(post) {
    return `
      <a class="note-card" href="${postAnchorUrl(post)}" aria-label="View ${escapeHTML(post.title)} in the Blog">
        <span>${escapeHTML(post.typeLabel || "Blog")}</span>
        <h3>${escapeHTML(post.title)}</h3>
        <p>${escapeHTML(post.summary)}</p>
        <strong class="learn">View in Blog <span>→</span></strong>
      </a>
    `;
  }

  function groupHTML(title, groupPosts) {
    if (!groupPosts.length) return "";

    return `
      <div class="media-group">
        ${title ? `<h2 class="media-group-title">${escapeHTML(title)}</h2>` : ""}
        ${groupPosts.map(postCardHTML).join("")}
      </div>
    `;
  }

  function scrollToHashWhenReady() {
    const targetId = decodeURIComponent(window.location.hash.replace("#", ""));

    if (!targetId) return;

    window.setTimeout(() => {
      const target = document.getElementById(targetId);

      if (!target) return;

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 80);
  }

  function renderLatest(containerId, limit = 3, variant = "featured") {
    const container = document.getElementById(containerId);

    if (!container) return;

    const latestPosts = posts()
      .sort(latestSort)
      .slice(0, limit);

    if (variant === "home") {
      container.innerHTML = latestPosts.map(homeCardHTML).join("");
      return;
    }

    container.innerHTML = latestPosts.map(featuredCardHTML).join("");
  }

  function renderAll(containerId, view = "default") {
    const container = document.getElementById(containerId);

    if (!container) return;

    const allVisiblePosts = posts();

    if (view === "year") {
      const years = [...new Set(allVisiblePosts.map(getPostYear))]
        .filter(Boolean)
        .sort((a, b) => Number(b) - Number(a));

      container.innerHTML = years
        .map(year => {
          const groupPosts = allVisiblePosts
            .filter(post => getPostYear(post) === year)
            .sort(latestSort);

          return groupHTML(year, groupPosts);
        })
        .join("");

      scrollToHashWhenReady();
      return;
    }

    if (view === "type") {
      const types = Object.keys(typeMeta)
        .sort((a, b) => typeMeta[a].order - typeMeta[b].order);

      container.innerHTML = types
        .map(typeKey => {
          const groupPosts = allVisiblePosts
            .filter(post => post.type === typeKey)
            .sort(latestSort);

          return groupHTML(typeMeta[typeKey].label, groupPosts);
        })
        .join("");

      scrollToHashWhenReady();
      return;
    }

    if (view === "area") {
      const areas = Object.keys(areaMeta)
        .sort((a, b) => areaMeta[a].order - areaMeta[b].order);

      container.innerHTML = areas
        .map(areaKey => {
          const groupPosts = allVisiblePosts
            .filter(post => (post.primaryArea || "none") === areaKey)
            .sort(latestSort);

          return groupHTML(areaMeta[areaKey].label, groupPosts);
        })
        .join("");

      scrollToHashWhenReady();
      return;
    }

    container.innerHTML = groupHTML("", allVisiblePosts.sort(latestSort));
    scrollToHashWhenReady();
  }

  function attachControls(containerId) {
    const buttons = document.querySelectorAll(".control-btn");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const view = button.dataset.view || "default";

        buttons.forEach(item => {
          item.classList.toggle("active", item === button);
        });

        renderAll(containerId, view);
      });
    });
  }

  function renderPost(containerId) {
    const container = document.getElementById(containerId);

    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("post") || window.location.hash.replace("#", "");
    const post = posts().find(item => item.id === id);

    if (!post) {
      container.innerHTML = `
        <article class="copy-card">
          <h1 class="section-title">Post Not Found</h1>
          <div class="section-line"></div>
          <p>The requested blog entry could not be found or is not currently published.</p>
          <p><a class="learn" href="blog.html">Return to Blog <span>→</span></a></p>
        </article>
      `;
      return;
    }

    document.title = `${post.title} | Sina Jangjoo`;

    const description = document.querySelector('meta[name="description"]');

    if (description) {
      description.setAttribute("content", post.summary || post.title);
    }

    const type = typeMeta[post.type] || typeMeta["research-note"];

    container.innerHTML = `
      <article class="post-article">
        <a class="learn" href="blog.html">← Back to Blog</a>

        <div class="post-meta-row">
          <span class="type-label ${escapeHTML(type.className)}">${escapeHTML(post.typeLabel || type.singleLabel)}</span>
          ${post.date ? `<span class="small">${escapeHTML(formatDate(post.date))}</span>` : ""}
        </div>

        <h1>${escapeHTML(post.title)}</h1>

        <p class="post-summary">${escapeHTML(post.summary)}</p>

        <div class="area-tags post-area-tags" aria-label="Research area tags">
          ${areaTagsHTML(post)}
        </div>

        <div class="post-body">
          ${post.content || `<p>${escapeHTML(post.excerpt)}</p>`}
        </div>

        ${post.doiUrl ? `<p><a class="learn" href="${escapeHTML(post.doiUrl)}" target="_blank" rel="noopener">Article DOI <span>→</span></a></p>` : ""}
      </article>
    `;
  }

  window.SJBlog = {
    renderLatest,
    renderAll,
    attachControls,
    renderPost
  };
})();
