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

(() => {
  const dialog = document.getElementById("track-dialog");
  const triggers = [...document.querySelectorAll(".card-link[data-track]")];

  if (!dialog || !triggers.length || typeof dialog.showModal !== "function") return;

  const closeButton = dialog.querySelector(".track-close");
  const backButton = dialog.querySelector("[data-close-track]");
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

  let lastTrigger = null;

  const tracks = {
    computer: {
      program: "BS Computer Science",
      icon: "#icon-code",
      index: "01",
      photo: "assets/Computer Technologies.png",
      photoAlt: "Circuit boards and digital systems",
      clues: ["Pattern spotting", "Building things", "Curiosity for AI", "Problem solving"],
      why: "You like understanding how things work, then making them work better. Computer science turns that instinct into software, systems, and AI that people rely on every day.",
      tags: ["Software", "AI & machine learning", "Systems thinking"],
      heading: "Build the <em>systems</em> people depend on.",
      intro: "Computer science is broader than coding. It is a way of breaking down messy problems, designing reliable systems, and asking what technology should do for people.",
      reasons: [
        {
          title: "You ask how things could work better",
          text: "You are drawn to the logic behind a tool, not just the finished product.",
        },
        {
          title: "You are willing to learn continuously",
          text: "Technology changes quickly; curiosity matters more than knowing everything now.",
        },
        {
          title: "You want options",
          text: "This degree can lead to product, security, data, research, or your own venture.",
        },
      ],
      note: "Not a verdict. Compare course details, costs, and support before you decide.",
    },
    people: {
      program: "BA Education & Community Studies",
      icon: "#icon-groups",
      index: "02",
      photo: "assets/Teaching.png",
      photoAlt: "Students learning together in a classroom",
      clues: ["Listening", "Explaining ideas", "Community impact", "Working with people"],
      why: "You notice what people need and can explain ideas in a way that lands. This track turns those instincts into teaching, community programs, and support that changes lives.",
      tags: ["Education", "Community development", "Communication"],
      heading: "Turn understanding into <em>opportunity</em>.",
      intro: "Education and community work are not soft alternatives to technical fields. They are skilled practices built on observation, communication, and trust.",
      reasons: [
        {
          title: "You explain ideas in your own words",
          text: "That is the beginning of teaching and community leadership.",
        },
        {
          title: "You want to understand context",
          text: "The best support starts with listening to a person's whole story.",
        },
        {
          title: "You want people at the centre",
          text: "Classrooms, nonprofits, policy, and community programs all begin here.",
        },
      ],
      note: "Not a verdict. Look for supervised placements and real community partnerships.",
    },
    business: {
      program: "BS Business Analytics",
      icon: "#icon-monitoring",
      index: "03",
      photo: "assets/Stocks.jpg",
      photoAlt: "Financial data and market trends",
      clues: ["Markets", "Numbers with a story", "Strategy", "Decision making"],
      why: "You are comfortable with numbers, but you want the story behind them. Business analytics connects data to decisions, markets, and ideas that can grow.",
      tags: ["Data analysis", "Finance", "Strategy"],
      heading: "Read the numbers. See the <em>bigger picture</em>.",
      intro: "Markets move on more than numbers. This track teaches you to read evidence, question assumptions, and make decisions you can defend.",
      reasons: [
        {
          title: "You look for the reason behind a number",
          text: "A metric is only useful when you know what it is measuring.",
        },
        {
          title: "You like testing an idea",
          text: "Analytics is a loop: ask, measure, learn, and adjust.",
        },
        {
          title: "You want range",
          text: "Finance, marketing, operations, and product strategy are all within reach.",
        },
      ],
      note: "Not a verdict. Check for real datasets, internships, and industry projects.",
    },
    health: {
      program: "BS Health Sciences",
      icon: "#icon-ecg-heart",
      index: "04",
      photo: "assets/Healthcare.jpg",
      photoAlt: "Healthcare professional using a tablet",
      clues: ["Science", "Helping people", "Hands-on care", "Resilience"],
      why: "You want your work to have a visible impact on people. Health sciences gives you a science-backed path into care, recovery, and community wellbeing.",
      tags: ["Patient care", "Life sciences", "Public health"],
      heading: "Care for people. <em>Ground it in science.</em>",
      intro: "Healthcare is a team effort. This track gives you the science to understand the body and the perspective to support people through real moments.",
      reasons: [
        {
          title: "You stay calm when things are uncertain",
          text: "Care work rewards people who can think clearly under pressure.",
        },
        {
          title: "You want the science, not just the title",
          text: "Understanding the body makes you a stronger, safer practitioner.",
        },
        {
          title: "You want to keep growing",
          text: "Health sciences can lead to clinical work, public health, research, or further study.",
        },
      ],
      note: "Not a verdict. Check entry requirements, clinical placements, and student support.",
    },
  };

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

  const renderTrack = (track) => {
    clues.replaceChildren(...track.clues.map(makeChip));
    tags.replaceChildren(...track.tags.map(makeTag));
    reasons.replaceChildren(...track.reasons.map(makeReason));

    photo.src = track.photo;
    photo.alt = track.photoAlt;
    iconUse.setAttribute("href", track.icon);
    programName.textContent = track.program;
    why.textContent = track.why;
    note.textContent = track.note;
    heading.innerHTML = track.heading;
    intro.textContent = track.intro;
    index.textContent = track.index;
  };

  const openTrack = (trigger) => {
    const track = tracks[trigger.dataset.track];
    if (!track) return;

    lastTrigger = trigger;
    renderTrack(track);
    dialog.showModal();
    document.body.classList.add("has-dialog");
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openTrack(trigger));
  });

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
