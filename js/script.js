(() => {
  const header = document.querySelector(".site-header");
  const navLinks = [...document.querySelectorAll(".main-nav a[data-section]")];
  const sections = [...document.querySelectorAll(".section")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!header || !sections.length) return;

  const scrollTopFor = (section) => {
    if (section.id === "welcome") return 0;
    return Math.max(0, section.offsetTop - header.offsetHeight);
  };

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.section === id);
    });
  };

  const activeSection = () => {
    const probe = window.scrollY + header.offsetHeight + 10;
    let current = sections[0];
    for (const section of sections) {
      if (section.offsetTop <= probe) current = section;
    }
    return current;
  };

  let frame = 0;
  const onScroll = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      setActive(activeSection().id);
    });
  };

  const scrollToSection = (section, smooth = true) => {
    const top = scrollTopFor(section);
    window.scrollTo({
      top,
      behavior: smooth && !reduceMotion ? "smooth" : "auto",
    });
    setActive(section.id);
  };

  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const id = link.getAttribute("href").slice(1);
    if (!id) {
      event.preventDefault();
      return;
    }

    const section = document.getElementById(id);
    if (!section) return;

    event.preventDefault();
    scrollToSection(section);
    history.pushState(null, "", `#${id}`);
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  const initial = window.location.hash
    ? document.getElementById(window.location.hash.slice(1))
    : null;

  if (initial) {
    requestAnimationFrame(() => scrollToSection(initial, false));
  } else {
    setActive(activeSection().id);
  }
})();

(() => {
  const dialog = document.getElementById("track-dialog");

  if (!dialog || typeof dialog.showModal !== "function") return;

  const closeButton = dialog.querySelector(".track-close");
  const backButton = dialog.querySelector("[data-close-track]");
  const media = dialog.querySelector(".track-program-media");
  const photo = document.getElementById("track-photo");
  const iconUse = document.getElementById("track-icon");
  const clues = document.getElementById("track-clues");
  const programName = document.getElementById("track-program-name");
  const why = document.getElementById("track-why");
  const tags = document.getElementById("track-tags");
  const note = document.getElementById("track-note");
  const heading = document.getElementById("track-dialog-title");
  const intro = document.getElementById("track-intro");
  const reasons = document.getElementById("track-reasons");
  const index = document.getElementById("track-index");
  const route = document.getElementById("track-route");
  const total = document.getElementById("track-index-total");
  const cluesKicker = document.getElementById("track-clues-kicker");

  let lastTrigger = null;

  const catalog = window.NextTrackData;
  const programEntries = [];

  if (catalog?.trackLibrary && catalog?.colleges) {
    for (const [key, track] of Object.entries(catalog.trackLibrary)) {
      const collegeNames = [];
      for (const college of catalog.colleges) {
        const groups = Object.values(college.groups || {});
        if (groups.some((keys) => keys.includes(key)) && !collegeNames.includes(college.name)) {
          collegeNames.push(college.name);
        }
      }
      programEntries.push({
        key,
        track,
        collegeNames,
        position: programEntries.length,
      });
    }
  }

  const categoryFor = (track) => {
    const text = `${track.name} ${(track.tags || []).join(" ")}`.toLowerCase();
    if (/(computer|computing|information technology|multimedia|software|data science|cybersecurity|game|animation)/.test(text)) return "computing";
    if (/(nursing|midwifery|medical|health|pharmacy|therapy|radiologic|respiratory|nutrition)/.test(text)) return "health";
    if (/(education|teaching|teacher|psychology|social work|human services|communication|political|library)/.test(text)) return "people";
    if (/(business|account|finance|marketing|management|entrepreneur|customs|real estate|office|tourism|hospitality)/.test(text)) return "business";
    if (/(engineering|architecture|aircraft|marine|industrial)/.test(text)) return "technical";
    return "general";
  };

  const iconFor = (category) =>
    ({
      computing: "#icon-code",
      business: "#icon-monitoring",
      health: "#icon-ecg-heart",
      people: "#icon-groups",
      technical: "#icon-logo-bold",
      general: "#icon-logo-bold",
    }[category] || "#icon-logo-bold");

  const imageFor = (category) =>
    ({
      computing: "assets/Computer Technologies.png",
      business: "assets/Stocks.jpg",
      health: "assets/Healthcare.jpg",
      people: "assets/Teaching.png",
      technical: "assets/Computer Technologies.png",
      general: "assets/FrontPage.jpeg",
    }[category] || "assets/FrontPage.jpeg");

  const makeChip = (text) => {
    const chip = document.createElement("span");
    chip.className = "track-chip";
    chip.textContent = text;
    return chip;
  };

  const makeTag = (text) => {
    const tag = document.createElement("span");
    tag.className = "track-tag";
    tag.textContent = text;
    return tag;
  };

  const makeReason = (reason, position) => {
    const item = document.createElement("li");
    item.className = "track-reason";

    const number = document.createElement("span");
    number.className = "track-reason-number";
    number.setAttribute("aria-hidden", "true");
    number.textContent = String(position + 1).padStart(2, "0");

    const copy = document.createElement("div");
    const title = document.createElement("h3");
    const text = document.createElement("p");
    title.textContent = reason.title;
    text.textContent = reason.text;
    copy.append(title, text);
    item.append(number, copy);

    return item;
  };

  const renderProgram = (entry) => {
    const { track, collegeNames, position } = entry;
    clues.replaceChildren(...(track.chips || []).map(makeChip));
    tags.replaceChildren(...(track.tags || []).map(makeTag));
    reasons.replaceChildren(...(track.reasons || []).map(makeReason));

    const category = categoryFor(track);
    const fallbackImage = imageFor(category);
    photo.onerror = () => {
      photo.onerror = null;
      photo.src = fallbackImage;
    };
    photo.src = track.photo || fallbackImage;
    photo.alt = "";
    photo.style.display = "";
    media?.classList.remove("is-icon-only");
    iconUse.setAttribute("href", iconFor(category));
    programName.textContent = track.name;
    why.textContent = track.why;
    note.textContent = track.note;
    heading.innerHTML = track.heading;
    intro.textContent = track.intro;
    index.textContent = String(position + 1).padStart(2, "0");
    if (route) {
      route.textContent =
        collegeNames.length === 1
          ? `Offered at ${collegeNames[0]}`
          : `Offered at ${collegeNames.length} colleges`;
    }
    if (total) total.textContent = `/ ${String(programEntries.length).padStart(2, "0")}`;
    if (cluesKicker) cluesKicker.textContent = "Program snapshot";
  };

  const openProgram = (trigger) => {
    const entry = programEntries.find((item) => item.key === trigger.dataset.program);
    if (!entry) return;

    lastTrigger = trigger;
    renderProgram(entry);
    dialog.showModal();
    document.body.classList.add("has-dialog");
  };

  const directory = document.getElementById("program-directory");

  if (directory && programEntries.length) {
    const search = document.getElementById("program-search");
    const collegeFilter = document.getElementById("program-college-filter");
    const count = document.getElementById("program-count");
    const empty = document.getElementById("program-empty");

    const escapeHtml = (value) =>
      String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

    const collegeSummary = (names) => {
      if (!names.length) return "College availability to confirm";
      if (names.length <= 2) return names.join(" · ");
      return `${names[0]} +${names.length - 1} more`;
    };

    const programCard = (entry) => {
      const category = categoryFor(entry.track);
      const fallbackImage = imageFor(category);
      const imageSrc = entry.track.photo || fallbackImage;
      const summary = collegeSummary(entry.collegeNames);
      const tagLine = (entry.track.tags || []).slice(0, 3).join(" · ");
      return `
        <article class="program-directory-card" data-category="${category}">
          <button class="program-directory-button" type="button" data-program="${escapeHtml(entry.key)}" aria-haspopup="dialog" aria-controls="track-dialog">
            <span class="program-directory-media">
              <img src="${escapeHtml(imageSrc)}" alt="" loading="lazy" decoding="async" data-fallback="${escapeHtml(fallbackImage)}" />
              <span class="program-directory-icon">
                <svg class="icon" aria-hidden="true"><use href="${iconFor(category)}" /></svg>
              </span>
            </span>
            <span class="program-directory-copy">
              <span class="program-directory-name">${escapeHtml(entry.track.name)}</span>
              <span class="program-directory-tags">${escapeHtml(tagLine)}</span>
              <span class="program-directory-colleges" title="${escapeHtml(entry.collegeNames.join(", "))}">${escapeHtml(summary)}</span>
            </span>
            <svg class="program-directory-arrow icon" aria-hidden="true"><use href="#icon-arrow-up-right" /></svg>
          </button>
        </article>`;
    };

    const collegeNames = [...new Set(programEntries.flatMap((entry) => entry.collegeNames))];

    if (collegeFilter) {
      collegeFilter.insertAdjacentHTML(
        "beforeend",
        collegeNames
          .map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`)
          .join("")
      );
    }

    const renderDirectory = () => {
      const query = search?.value.trim().toLowerCase() || "";
      const selectedCollege = collegeFilter?.value || "";
      const visible = programEntries.filter((entry) => {
        if (selectedCollege && !entry.collegeNames.includes(selectedCollege)) return false;
        if (!query) return true;
        const haystack = `${entry.track.name} ${(entry.track.tags || []).join(" ")} ${(entry.track.chips || []).join(" ")} ${entry.collegeNames.join(" ")}`.toLowerCase();
        return haystack.includes(query);
      });

      directory.innerHTML = visible.map(programCard).join("");
      if (count) {
        count.textContent =
          query || selectedCollege
            ? `Showing ${visible.length} of ${programEntries.length} programs`
            : `${programEntries.length} programs available`;
      }
      if (empty) empty.hidden = visible.length > 0;
    };

    search?.addEventListener("input", renderDirectory);
    collegeFilter?.addEventListener("change", renderDirectory);
    directory.addEventListener("click", (event) => {
      const trigger = event.target.closest(".program-directory-button[data-program]");
      if (trigger) openProgram(trigger);
    });

    directory.addEventListener(
      "error",
      (event) => {
        const image = event.target;
        if (!(image instanceof HTMLImageElement) || !image.dataset.fallback || image.dataset.fallbackApplied === "true") return;
        image.dataset.fallbackApplied = "true";
        image.src = image.dataset.fallback;
      },
      true
    );

    renderDirectory();
  }

  closeButton.addEventListener("click", () => dialog.close());
  backButton.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener("close", () => {
    document.body.classList.remove("has-dialog");
    if (lastTrigger) lastTrigger.focus();
  });
})();
