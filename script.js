(() => {
  const header = document.querySelector(".site-header");
  const navLinks = [...document.querySelectorAll(".main-nav a[data-section]")];
  const sections = [...document.querySelectorAll(".section")];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!header || !sections.length) return;

  const scrollTopFor = (section) =>
    section.id === "welcome" ? 0 : section.offsetTop;

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.section === id);
    });
  };

  const activeSection = () => {
    const probe = window.scrollY + 10;
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
