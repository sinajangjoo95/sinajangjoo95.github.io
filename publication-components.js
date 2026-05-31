(function () {
  function publications() {
    return (window.SJ_PUBLICATIONS || [])
      .filter(publication => publication.published !== false)
      .map((publication, index) => ({
        ...publication,
        __index: index
      }));
  }

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
      label: "Other publications",
      icon: "",
      order: 99
    }
  };

  const statusMeta = {
    published: {
      label: "Published",
      className: "status-published",
      order: 1
    },
    inpress: {
      label: "In press",
      className: "status-inpress",
      order: 2
    },
    revision: {
      label: "Under review / R&R",
      className: "status-revision",
      order: 3
    },
    dissertation: {
      label: "Dissertation chapters",
      className: "status-dissertation",
      order: 4
    },
    working: {
      label: "Working papers",
      className: "status-working",
      order: 5
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

  function getYear(publication) {
    return Number(publication.year || 0);
  }

  function sortByYearThenOriginalOrder(a, b) {
    return getYear(b) - getYear(a) || a.__index - b.__index;
  }

  function sortByOriginalOrder(a, b) {
    return a.__index - b.__index;
  }

  function areaTagsHTML(publication) {
    return (publication.areas || [])
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

  function publicationLinksHTML(publication) {
    return (publication.links || [])
      .map(link => {
        if (!link || !link.url || !link.label) return "";

        return `<a href="${escapeHTML(link.url)}" target="_blank" rel="noopener">${escapeHTML(link.label)}</a>`;
      })
      .join("");
  }

  function summaryButtonHTML(publication) {
    if (!publication.summaryUrl) return "";

    return `
      <a class="pub-summary-btn" href="${escapeHTML(publication.summaryUrl)}" aria-label="Open public summary or blog post for this publication">
        ${escapeHTML(publication.summaryLabel || "Summary")}
      </a>
    `;
  }

  function publicationCardHTML(publication) {
    const status = statusMeta[publication.status] || statusMeta.working;
    const linksHTML = publicationLinksHTML(publication);
    const tagsHTML = `${summaryButtonHTML(publication)}${areaTagsHTML(publication)}`;

    return `
      <article
        class="pub-card"
        data-year="${escapeHTML(publication.year)}"
        data-status="${escapeHTML(publication.status)}"
        data-primary-area="${escapeHTML(publication.primaryArea || "none")}"
      >
        <h3>${escapeHTML(publication.title)}</h3>
        <p class="citation">${escapeHTML(publication.citation)}</p>
        <p>${escapeHTML(publication.description)}</p>

        <div class="pub-footer">
          <div class="pub-meta">
            <span class="status ${escapeHTML(status.className)}">${escapeHTML(publication.statusLabel || status.label)}</span>
            <div class="pub-links">${linksHTML}</div>
          </div>

          <div class="area-tags" aria-label="Research area tags">${tagsHTML}</div>
        </div>
      </article>
    `;
  }

  function addGroup(container, title, items) {
    if (!items.length) return;

    const group = document.createElement("div");
    group.className = "pub-group";

    if (title) {
      const heading = document.createElement("h2");
      heading.className = "pub-group-title";
      heading.textContent = title;
      group.appendChild(heading);
    }

    group.insertAdjacentHTML("beforeend", items.map(publicationCardHTML).join(""));
    container.appendChild(group);
  }

  function renderDefault(containerId) {
    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "";

    const items = publications().sort(sortByOriginalOrder);
    addGroup(container, "", items);
  }

  function renderByYear(containerId) {
    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "";

    const allPublications = publications();
    const years = [...new Set(allPublications.map(publication => publication.year))]
      .filter(Boolean)
      .sort((a, b) => Number(b) - Number(a));

    years.forEach(year => {
      const items = allPublications
        .filter(publication => publication.year === year)
        .sort(sortByOriginalOrder);

      addGroup(container, year, items);
    });
  }

  function renderByStatus(containerId) {
    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "";

    Object.keys(statusMeta)
      .sort((a, b) => statusMeta[a].order - statusMeta[b].order)
      .forEach(statusKey => {
        const items = publications()
          .filter(publication => publication.status === statusKey)
          .sort(sortByYearThenOriginalOrder);

        addGroup(container, statusMeta[statusKey].label, items);
      });
  }

  function renderByArea(containerId) {
    const container = document.getElementById(containerId);

    if (!container) return;

    container.innerHTML = "";

    Object.keys(areaMeta)
      .sort((a, b) => areaMeta[a].order - areaMeta[b].order)
      .forEach(areaKey => {
        const items = publications()
          .filter(publication => (publication.primaryArea || "none") === areaKey)
          .sort(sortByYearThenOriginalOrder);

        addGroup(container, areaMeta[areaKey].label, items);
      });
  }

  function attachControls(containerId) {
    const buttons = document.querySelectorAll(".control-btn");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const view = button.dataset.view || "default";

        buttons.forEach(item => {
          item.classList.toggle("active", item === button);
        });

        if (view === "area") {
          renderByArea(containerId);
        } else if (view === "year") {
          renderByYear(containerId);
        } else if (view === "status") {
          renderByStatus(containerId);
        } else {
          renderDefault(containerId);
        }
      });
    });
  }

  window.SJPublications = {
    renderDefault,
    renderByYear,
    renderByStatus,
    renderByArea,
    attachControls
  };
})();
