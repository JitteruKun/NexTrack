/* =========================================
   NextTrack — Beyond Olongapo renderer
   Shared cards for the quiz results and the
   college directory.
   ========================================= */

window.NextTrackPathways = (() => {
  const data = window.NextTrackPathwaysData;

  if (!data) {
    return {
      gapTracks: [],
      groups: {},
      certNames: {},
      renderCard: () => "",
      renderGroup: () => "",
      mount: () => {},
    };
  }

  const catalog = window.NextTrackData || { trackLibrary: {} };

  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const programName = (key) => catalog.trackLibrary?.[key]?.name || key;

  const certName = (key) => data.certNames?.[key] || key;

  const levelLabel = (level) => {
    if (level === "graduate") return "After a bachelor's";
    if (level === "professional") return "Professional degree";
    if (level === "bachelor") return "4-year degree";
    return "Degree pathway";
  };

  const renderCard = (track, options = {}) => {
    const { compact = false, matchPercent = null } = options;
    const bridges = (track.localBridges || []).map((key) => programName(key));
    const certs = (track.certBridges || []).map((key) => certName(key));
    const steps = compact ? track.nextSteps.slice(0, 1) : track.nextSteps;
    const links = compact ? track.officialLinks.slice(0, 1) : track.officialLinks;

    return `
      <article class="beyond-card">
        <div class="beyond-card-top">
          <span class="beyond-badge">Not offered locally</span>
          <span class="beyond-level">${escapeHtml(levelLabel(track.level))}</span>
          ${
            matchPercent !== null
              ? `<span class="beyond-score">${matchPercent}%<small>relative fit</small></span>`
              : ""
          }
        </div>

        <h3 class="beyond-name">${escapeHtml(track.name)}</h3>
        <p class="beyond-why">${escapeHtml(track.why)}</p>

        ${
          bridges.length
            ? `<p class="beyond-label">Closest local bridge</p>
               <div class="beyond-chips">${bridges
                 .map((name) => `<span class="beyond-chip">${escapeHtml(name)}</span>`)
                 .join("")}</div>`
            : `<p class="beyond-empty">No direct local bridge yet. Ask an adviser about transfer options.</p>`
        }

        ${
          certs.length
            ? `<p class="beyond-label">Local certificate bridge</p>
               <div class="beyond-chips">${certs
                 .map((name) => `<span class="beyond-chip beyond-chip--cert">${escapeHtml(name)}</span>`)
                 .join("")}</div>`
            : ""
        }

        <p class="beyond-label">Next step</p>
        <ul class="beyond-steps">
          ${steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}
        </ul>

        ${
          links.length
            ? `<div class="beyond-links">${links
                .map(
                  (link) =>
                    `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(
                      link.label
                    )}</a>`
                )
                .join("")}</div>`
            : ""
        }
      </article>`;
  };

  const renderGroup = (id, group, tracks) => `
    <details class="beyond-group"${group.order === 1 ? " open" : ""}>
      <summary class="beyond-group-summary">
        <span class="beyond-group-copy">
          <span class="beyond-group-kicker">${tracks.length} pathway${tracks.length === 1 ? "" : "s"}</span>
          <span class="beyond-group-title">${escapeHtml(group.label)}</span>
          <span class="beyond-group-desc">${escapeHtml(group.description)}</span>
        </span>
        <span class="beyond-group-toggle" aria-hidden="true"></span>
      </summary>
      <div class="beyond-grid">
        ${tracks.map((track) => renderCard(track)).join("")}
      </div>
    </details>`;

  const mount = () => {
    const root = document.getElementById("beyond-list");
    if (!root || root.dataset.ready === "true") return;

    const groups = Object.entries(data.groups).sort(
      ([, a], [, b]) => a.order - b.order
    );

    root.innerHTML = groups
      .map(([id, group]) => {
        const tracks = data.gapTracks
          .filter((track) => track.group === id)
          .sort(
            (a, b) =>
              a.priority - b.priority || a.name.localeCompare(b.name)
          );
        return renderGroup(id, group, tracks);
      })
      .join("");

    root.dataset.ready = "true";
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }

  return {
    gapTracks: data.gapTracks,
    groups: data.groups,
    certNames: data.certNames,
    renderCard,
    renderGroup,
    mount,
  };
})();
