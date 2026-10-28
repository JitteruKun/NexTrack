/* =========================================
   NextTrack — program finder quiz
   Weighted content-based scoring across the
   41 Olongapo college programs + TESDA paths.
   ========================================= */

(() => {
  const app = document.getElementById("quiz-app");
  if (!app) return;

  const data = window.NextTrackData;
  const quiz = window.NextTrackQuizData;

  if (!data || !quiz) {
    app.innerHTML = `
      <section class="quiz-message">
        <p class="quiz-kicker">Quiz unavailable</p>
        <h1>The program data did not load.</h1>
        <p>Open this page after <code>colleges.js</code> loads, or check the browser console for an error.</p>
      </section>`;
    return;
  }

  const {
    familyLabels,
    traitLabels,
    programProfiles,
    certificationProfiles,
    coreQuestions,
    differentiatorQuestions,
    practicalQuestions,
    certQuestions,
  } = quiz;

  const CORE_COUNT = coreQuestions.length;

  const CERT_RELATED = {
    "css-nc2": ["bs-it", "assoc-computer-tech"],
    "auto-nc1": ["bs-aircraft-maint"],
    "fbs-nc2": ["bs-hm"],
    "front-office-nc2": ["bs-hm"],
    "housekeeping-nc2": ["bs-hm"],
    "bartending-nc2": ["bs-hm"],
    "epas-nc2": ["bs-ece", "assoc-computer-tech"],
    "game-programming-nc3": ["bs-emc"],
    "3d-animation-nc3": ["bs-emc", "ba-multimedia"],
    "visual-graphic-nc3": ["ba-multimedia"],
    "massage-nc2": ["bs-nursing"],
    "tour-guiding-nc2": ["bs-tm"],
  };

  const state = {
    path: null,
    started: false,
    finished: false,
    steps: [],
    current: 0,
    answers: {},
    practicalValues: {},
    estimatedTotal: 0,
  };

  const escapeHtml = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const programName = (key) => data.trackLibrary[key]?.name || key;

  const levelLabel = (level) => {
    if (level === "associate") return "2-year associate";
    if (level === "certificate") return "Certificate";
    return "4-year degree";
  };

  const addTraits = (target, traits) => {
    if (!traits) return;
    Object.entries(traits).forEach(([trait, weight]) => {
      target[trait] = (target[trait] || 0) + weight;
    });
  };

  const cosine = (a, b) => {
    let dot = 0;
    let normA = 0;
    let normB = 0;

    Object.keys(a).forEach((key) => {
      normA += a[key] * a[key];
      if (b[key]) dot += a[key] * b[key];
    });

    Object.keys(b).forEach((key) => {
      normB += b[key] * b[key];
    });

    if (!normA || !normB) return 0;
    return dot / Math.sqrt(normA * normB);
  };

  const getUserVector = () => {
    const vector = {};
    state.steps.forEach((step) => {
      const index = state.answers[step.key];
      if (index === undefined) return;
      const option = step.question.options[index];
      addTraits(vector, option?.traits);
    });
    return vector;
  };

  const getCollegesForProgram = (key) => {
    const names = new Set();
    (data.colleges || []).forEach((college) => {
      Object.values(college.groups || {}).forEach((programs) => {
        if (Array.isArray(programs) && programs.includes(key)) {
          names.add(college.name);
        }
      });
    });
    return [...names];
  };

  const rankPrograms = (vector, options = {}) => {
    const { level = null, licensure = null, location = null } = options;

    return Object.entries(programProfiles)
      .filter(([, profile]) => !level || profile.level === level)
      .map(([key, profile]) => {
        let score = cosine(vector, profile.traits);
        const colleges = getCollegesForProgram(key);

        if (licensure === "yes") score += profile.licensure ? 0.04 : -0.02;
        if (licensure === "no") score += profile.licensure ? -0.02 : 0.02;

        if (location === "abroad") score += profile.international * 0.06;
        if (location === "local") score += (1 - profile.international) * 0.03;
        if (location === "national") score += 0.01;

        if (colleges.length >= 2) score += 0.01;
        if (colleges.length >= 4) score += 0.01;

        return {
          key,
          profile,
          colleges,
          score: Math.max(0, score),
        };
      })
      .sort(
        (a, b) =>
          b.score - a.score ||
          b.colleges.length - a.colleges.length ||
          a.key.localeCompare(b.key)
      );
  };

  const rankCertifications = (vector, options = {}) => {
    const { time = null, goal = null } = options;

    return Object.entries(certificationProfiles)
      .map(([key, profile]) => {
        let score = cosine(vector, profile.traits);

        if (time === "short" && profile.duration === "short") score += 0.03;
        if (time === "long" && profile.duration === "long") score += 0.02;

        if (goal === "abroad") score += profile.international * 0.06;
        if (goal === "local") score += (1 - profile.international) * 0.03;

        return { key, profile, score: Math.max(0, score) };
      })
      .sort((a, b) => b.score - a.score || a.key.localeCompare(b.key));
  };

  const getFamilyRanking = (ranked) => {
    const grouped = {};

    ranked.forEach((result) => {
      const family = result.profile.family;
      if (!grouped[family]) grouped[family] = [];
      grouped[family].push(result.score);
    });

    return Object.entries(grouped)
      .map(([family, scores]) => {
        scores.sort((a, b) => b - a);
        return {
          family,
          score: scores[0] + 0.4 * (scores[1] || 0),
        };
      })
      .sort((a, b) => b.score - a.score);
  };

  const buildDifferentiatorSteps = () => {
    if (state.path === "associate") return [];

    const level = state.path === "college" ? "bachelor" : null;
    const ranked = rankPrograms(getUserVector(), { level });
    const familyRanking = getFamilyRanking(ranked);
    const chosen = [];

    familyRanking.forEach(({ family }) => {
      if (chosen.length >= 3) return;
      if (chosen.includes(family)) return;
      if (!differentiatorQuestions[family]) return;

      const count = Object.values(programProfiles).filter(
        (profile) => profile.family === family
      ).length;

      if (count > 1) chosen.push(family);
    });

    return chosen.map((family) => ({
      key: differentiatorQuestions[family].id,
      type: "diff",
      question: differentiatorQuestions[family],
    }));
  };

  const buildPracticalSteps = () =>
    practicalQuestions.map((question) => ({
      key: question.id,
      type: "practical",
      question,
    }));

  const startPath = (path) => {
    state.path = path;
    state.started = true;
    state.finished = false;
    state.current = 0;
    state.answers = {};
    state.practicalValues = {};

    if (path === "tesda") {
      state.steps = certQuestions.map((question) => ({
        key: question.id,
        type: "cert",
        question,
      }));
      state.estimatedTotal = state.steps.length;
    } else {
      state.steps = coreQuestions.map((question) => ({
        key: question.id,
        type: "core",
        question,
      }));
      state.estimatedTotal =
        CORE_COUNT + practicalQuestions.length + (path === "associate" ? 0 : 3);
    }

    render();
  };

  const reset = () => {
    state.path = null;
    state.started = false;
    state.finished = false;
    state.steps = [];
    state.current = 0;
    state.answers = {};
    state.practicalValues = {};
    state.estimatedTotal = 0;
    render();
  };

  const answer = (index) => {
    const step = state.steps[state.current];
    if (!step) return;

    state.answers[step.key] = index;

    const selected = step.question.options[index];
    if (step.question.type && selected?.value) {
      state.practicalValues[step.question.type] = selected.value;
    }

    for (let i = state.current + 1; i < state.steps.length; i += 1) {
      delete state.answers[state.steps[i].key];
    }

    if (step.type === "core" && state.current === CORE_COUNT - 1) {
      state.steps = state.steps.filter((item) => item.type === "core");
      const differentiators = buildDifferentiatorSteps();
      const practicals = buildPracticalSteps();
      state.steps.push(...differentiators, ...practicals);
      state.estimatedTotal = state.steps.length;
    }

    state.current += 1;

    if (state.current >= state.steps.length) {
      state.finished = true;
    }

    render();
  };

  const goBack = () => {
    if (!state.started) return;

    if (state.finished) {
      state.finished = false;
      state.current = Math.max(0, state.steps.length - 1);
      render();
      return;
    }

    if (state.current === 0) {
      reset();
      return;
    }

    state.current -= 1;
    render();
  };

  const getWhyChips = (key, profile, vector) => {
    const contributions = Object.entries(profile.traits)
      .map(([trait, weight]) => [trait, weight * (vector[trait] || 0)])
      .filter(([, value]) => value > 0)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([trait]) => traitLabels[trait] || trait);

    if (contributions.length) return contributions;
    return (data.trackLibrary[key]?.chips || []).slice(0, 3);
  };

  const getTopUserTraits = (vector, count = 4) =>
    Object.entries(vector)
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([trait]) => traitLabels[trait] || trait);

  const renderStart = () => `
    <section class="quiz-intro">
      <p class="quiz-kicker">Program finder</p>
      <h1 class="quiz-title">Find the Olongapo program that fits you.</h1>
      <p class="quiz-lede">This quiz uses a weighted content-based match across all 41 college programs in the directory, plus TESDA certificate routes. It is a guide, not a verdict.</p>

      <div class="path-grid">
        <button class="path-card" type="button" data-path="college">
          <span class="path-number">01</span>
          <span class="path-name">4-year college degree</span>
          <span class="path-text">Best if you want a bachelor's degree and possibly a licensure path.</span>
          <span class="path-meta">Full program list</span>
        </button>
        <button class="path-card" type="button" data-path="associate">
          <span class="path-number">02</span>
          <span class="path-name">2-year associate degree</span>
          <span class="path-text">A faster, hands-on route into entry-level technical work.</span>
          <span class="path-meta">Associate in Computer Technology</span>
        </button>
        <button class="path-card" type="button" data-path="tesda">
          <span class="path-number">03</span>
          <span class="path-name">TESDA certificate</span>
          <span class="path-text">Short, skills-focused training that can lead to a National Certificate.</span>
          <span class="path-meta">12 qualifications</span>
        </button>
        <button class="path-card path-card--accent" type="button" data-path="unsure">
          <span class="path-number">04</span>
          <span class="path-name">I am not sure yet</span>
          <span class="path-text">Take the full quiz and see both college and certificate options.</span>
          <span class="path-meta">Recommended</span>
        </button>
      </div>

      <p class="quiz-note">No right or wrong answers. Your answers stay in this browser.</p>
    </section>`;

  const renderOption = (option, index, selected) => {
    const letter = String.fromCharCode(65 + index);
    return `
      <button class="quiz-option${selected === index ? " is-selected" : ""}" type="button" data-option="${index}">
        <span class="quiz-option-letter">${letter}</span>
        <span class="quiz-option-text">${escapeHtml(option.text)}</span>
      </button>`;
  };

  const renderQuestion = () => {
    const step = state.steps[state.current];
    if (!step) return renderStart();

    const question = step.question;
    const selected = state.answers[step.key];
    const phaseLabel =
      step.type === "core"
        ? "Part 1 · Interests"
        : step.type === "diff"
        ? "Part 2 · Refinement"
        : step.type === "practical"
        ? "Part 3 · Practical"
        : "Certificate path";

    const estimatedTotal = Math.max(
      state.estimatedTotal || state.steps.length,
      state.steps.length
    );
    const progress = Math.min(
      100,
      Math.round((state.current / estimatedTotal) * 100)
    );

    return `
      <section class="quiz-shell">
        <div class="quiz-progress-wrap">
          <div class="quiz-progress-meta">
            <span>${phaseLabel}</span>
            <span>Question ${state.current + 1} of ${estimatedTotal}</span>
          </div>
          <div class="quiz-progress"><span style="width:${progress}%"></span></div>
        </div>

        <p class="quiz-kicker">${step.type === "practical" ? "Practical filter" : step.type === "cert" ? "Certificate route" : "Your answer"}</p>
        <h1 class="quiz-question">${escapeHtml(question.text)}</h1>
        ${question.hint ? `<p class="quiz-hint">${escapeHtml(question.hint)}</p>` : ""}

        <div class="quiz-options${question.id === "world" ? " quiz-options--wide" : ""}">
          ${question.options
            .map((option, index) => renderOption(option, index, selected))
            .join("")}
        </div>

        <div class="quiz-nav">
          <button class="quiz-back" type="button" data-back>Back</button>
          <button class="quiz-restart" type="button" data-restart>Start over</button>
        </div>
      </section>`;
  };

  const renderProgramCard = (result, position, topScore, vector) => {
    const percent = Math.max(
      1,
      Math.round((result.score / (topScore || 1)) * 100)
    );
    const why = getWhyChips(result.key, result.profile, vector);
    const colleges = result.colleges.length
      ? result.colleges.join(" · ")
      : "Program availability pending verification";

    return `
      <article class="result-card">
        <div class="result-card-top">
          <span class="result-rank">${String(position + 1).padStart(2, "0")}</span>
          <div class="result-card-head">
            <h2 class="result-name">${escapeHtml(programName(result.key))}</h2>
            <p class="result-family">${escapeHtml(familyLabels[result.profile.family] || result.profile.family)} · ${levelLabel(result.profile.level)}${result.profile.licensure ? " · Licensure path" : ""}</p>
          </div>
          <span class="result-score">${percent}%<small>relative fit</small></span>
        </div>

        <div class="result-bar"><span style="width:${percent}%"></span></div>

        <p class="result-why-label">Why it matched</p>
        <div class="result-chips">
          ${why.map((chip) => `<span class="result-chip">${escapeHtml(chip)}</span>`).join("")}
        </div>

        <p class="result-colleges"><strong>Offered at:</strong> ${escapeHtml(colleges)}</p>
      </article>`;
  };

  const renderCertCard = (result, position, topScore) => {
    const percent = Math.max(
      1,
      Math.round((result.score / (topScore || 1)) * 100)
    );
    const related = (CERT_RELATED[result.key] || [])
      .map((key) => programName(key))
      .join(" · ");

    return `
      <article class="cert-card">
        <div class="cert-card-top">
          <span class="result-rank">${String(position + 1).padStart(2, "0")}</span>
          <div class="result-card-head">
            <h3 class="cert-name">${escapeHtml(result.profile.name)}</h3>
            <p class="result-family">${result.profile.duration === "short" ? "Short course" : "Longer certificate"} · TESDA qualification</p>
          </div>
          <span class="result-score">${percent}%<small>relative fit</small></span>
        </div>
        <div class="result-bar"><span style="width:${percent}%"></span></div>
        <p class="result-colleges"><strong>Providers:</strong> ${escapeHtml(result.profile.providers.join(" · "))}</p>
        ${related ? `<p class="result-colleges"><strong>Related college track:</strong> ${escapeHtml(related)}</p>` : ""}
      </article>`;
  };

  const renderResults = () => {
    const vector = getUserVector();
    const topTraits = getTopUserTraits(vector);
    const location = state.practicalValues.location;
    const certGoal =
      location === "abroad"
        ? "abroad"
        : location === "local" || location === "national"
        ? "local"
        : "both";

    let body = "";

    if (state.path === "tesda") {
      const certs = rankCertifications(vector, {
        time: state.practicalValues.time,
        goal: state.practicalValues.goal,
      }).slice(0, 3);
      const topScore = certs[0]?.score || 1;

      body = `
        <section class="quiz-results">
          <p class="quiz-kicker">Your results</p>
          <h1 class="quiz-title">Your certificate matches.</h1>
          <p class="quiz-lede">These are the TESDA qualifications in the directory that line up most with your answers. Each one is short and skills-focused.</p>

          ${topTraits.length ? `<div class="result-profile"><span class="result-profile-label">Your answers leaned toward</span><div class="result-chips">${topTraits.map((trait) => `<span class="result-chip">${escapeHtml(trait)}</span>`).join("")}</div></div>` : ""}

          <div class="cert-list">
            ${certs.map((cert, index) => renderCertCard(cert, index, topScore)).join("")}
          </div>

          <div class="result-actions">
            <button class="btn btn-primary" type="button" data-restart>Take the quiz again</button>
            <a class="btn btn-soft" href="colleges.html">Browse Olongapo colleges</a>
          </div>
          <p class="result-note">This is a guide, not a verdict. Confirm course availability and assessment schedules with the provider before deciding.</p>
        </section>`;
    } else {
      const level =
        state.path === "college"
          ? "bachelor"
          : state.path === "associate"
          ? "associate"
          : null;

      const programs = rankPrograms(vector, {
        level,
        licensure: state.practicalValues.licensure,
        location,
      }).slice(0, 3);

      const certs = rankCertifications(vector, {
        goal: certGoal,
      }).slice(0, 2);

      const topScore = programs[0]?.score || 1;

      body = `
        <section class="quiz-results">
          <p class="quiz-kicker">Your results</p>
          <h1 class="quiz-title">Your closest program matches.</h1>
          <p class="quiz-lede">These are the Olongapo programs that best fit your answers. The match bars compare the top result with the others, so they show relative fit, not a prediction.</p>

          ${topTraits.length ? `<div class="result-profile"><span class="result-profile-label">Your answers leaned toward</span><div class="result-chips">${topTraits.map((trait) => `<span class="result-chip">${escapeHtml(trait)}</span>`).join("")}</div></div>` : ""}

          <div class="result-list">
            ${programs.map((program, index) => renderProgramCard(program, index, topScore, vector)).join("")}
          </div>

          ${
            certs.length
              ? `<details class="cert-fallback"${state.path === "associate" ? " open" : ""}>
                  <summary>Also consider a TESDA certificate route</summary>
                  <p class="cert-fallback-lede">If a degree is not the right fit right now, these certificates connect to the same interests.</p>
                  <div class="cert-list">
                    ${certs.map((cert, index) => renderCertCard(cert, index, certs[0]?.score || 1)).join("")}
                  </div>
                </details>`
              : ""
          }

          <div class="result-actions">
            <button class="btn btn-primary" type="button" data-restart>Take the quiz again</button>
            <a class="btn btn-soft" href="colleges.html">Browse Olongapo colleges</a>
          </div>
          <p class="result-note">This is a guide, not a verdict. Check the college's current program list, facilities, and licensure support before deciding.</p>
        </section>`;
    }

    return body;
  };

  const render = () => {
    if (!state.started) {
      app.innerHTML = renderStart();
    } else if (state.finished) {
      app.innerHTML = renderResults();
    } else {
      app.innerHTML = renderQuestion();
    }

    if (state.started) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  app.addEventListener("click", (event) => {
    const pathCard = event.target.closest("[data-path]");
    if (pathCard) {
      startPath(pathCard.dataset.path);
      return;
    }

    const option = event.target.closest("[data-option]");
    if (option) {
      answer(Number(option.dataset.option));
      return;
    }

    if (event.target.closest("[data-back]")) {
      goBack();
      return;
    }

    if (event.target.closest("[data-restart]")) {
      reset();
    }
  });

  render();
})();
