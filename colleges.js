/* =========================================
   Olongapo City Colleges — data + interactions
   ========================================= */

(() => {
  const list = document.getElementById("college-list");
  if (!list) return;

  /* -----------------------------------------
     TRACK LIBRARY
     ----------------------------------------- */
  const trackLibrary = {
    /* --- Computing --- */
    "bs-cs": {
      name: "BS Computer Science",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/computer-science.jpg",
      photoAlt: "Computer science lab and code",
      chips: ["Programming", "Algorithms", "Software design", "Problem solving"],
      why: "A Computer Science degree focuses on the theory and practice of computing — writing software, designing algorithms, and understanding how systems work under the hood. It prepares you for roles where you build, optimize, and invent with code.",
      tags: ["Software engineering", "AI & data", "Systems"],
      heading: "Build the <em>systems</em> people depend on.",
      intro: "Computer Science goes beyond learning a language. You study how computation works, how to design reliable software, and how to turn a problem into a working system.",
      reasons: [
        { title: "You like breaking problems down", text: "CS rewards people who can decompose a messy problem into smaller, solvable parts." },
        { title: "You want to build, not just use", text: "This track teaches you to create tools, apps, and systems rather than only operate them." },
        { title: "You're comfortable learning continuously", text: "Technology shifts fast; curiosity and adaptability matter more than knowing everything now." },
      ],
      note: "Not a verdict. Check the school's lab facilities, internship partners, and curriculum focus before deciding.",
    },
    "bs-it": {
      name: "BS Information Technology",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/information-technology.jpg",
      photoAlt: "Network and server infrastructure",
      chips: ["Networking", "Systems administration", "Support", "Infrastructure"],
      why: "Information Technology focuses on applying computing to real organizations — networks, servers, databases, cybersecurity, and the systems that keep businesses running. It is practical, hands-on, and infrastructure-minded.",
      tags: ["Networking", "Cybersecurity", "IT operations"],
      heading: "Keep the <em>digital world</em> running.",
      intro: "IT is about making technology work for people and organizations. You will work with networks, systems, and support processes that keep everything operational.",
      reasons: [
        { title: "You like fixing and improving systems", text: "IT work is often about diagnosing problems and making infrastructure more reliable." },
        { title: "You want practical, employable skills", text: "IT programs emphasize hands-on tools and industry-standard practices." },
        { title: "You enjoy working with people", text: "A lot of IT is helping users and teams use technology effectively." },
      ],
      note: "Not a verdict. Ask about certification prep, lab access, and industry partnerships.",
    },
    "bs-emc": {
      name: "BS Entertainment and Multimedia Computing",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/multimedia-computing.jpg",
      photoAlt: "Game development and animation workspace",
      chips: ["Game development", "Animation", "Multimedia", "Creative tech"],
      why: "Entertainment and Multimedia Computing blends programming with creative media — game development, animation, interactive design, and digital storytelling. It is for people who want to build experiences, not just software.",
      tags: ["Game dev", "Animation", "Interactive media"],
      heading: "Turn <em>creative ideas</em> into interactive experiences.",
      intro: "This track sits at the intersection of code and creativity. You will learn to build games, animations, and interactive media that people actually enjoy using.",
      reasons: [
        { title: "You think visually and technically", text: "You enjoy both the art and the logic behind interactive media." },
        { title: "You want to make experiences", text: "Games, animations, and multimedia products are built to be felt, not just used." },
        { title: "You're drawn to the creative industry", text: "This track opens doors to game studios, animation houses, and digital agencies." },
      ],
      note: "Not a verdict. Check the school's software licenses, portfolio expectations, and studio partnerships.",
    },
    "assoc-computer-tech": {
      name: "Associate in Computer Technology",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/computer-technology.jpg",
      photoAlt: "Hands-on computer hardware training",
      chips: ["2-year program", "Hardware", "Support", "Practical skills"],
      why: "A two-year Associate in Computer Technology gives you hands-on skills in computer hardware, software, and technical support. It is a faster route into entry-level IT work or a stepping stone to a bachelor's degree.",
      tags: ["2-year", "Technical support", "Entry-level"],
      heading: "Start <em>hands-on</em> and get working sooner.",
      intro: "An associate program is practical and focused. You learn the essentials of computer technology and leave ready for entry-level technical roles.",
      reasons: [
        { title: "You want to start working sooner", text: "Two-year programs get you into the workforce faster than a full bachelor's degree." },
        { title: "You prefer learning by doing", text: "Associate programs are usually more hands-on and lab-based." },
        { title: "You can continue later", text: "Many associate graduates ladder into a BS IT or CS program afterward." },
      ],
      note: "Not a verdict. Confirm whether credits transfer to a bachelor's program and what certifications are included.",
    },
    /* --- Business --- */
    "bs-accountancy": {
      name: "BS Accountancy",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/accountancy.jpg",
      photoAlt: "Financial statements and accounting work",
      chips: ["Financial reporting", "Auditing", "Taxation", "Precision"],
      why: "Accountancy teaches you to record, report, and interpret financial information. It is rigorous and detail-oriented, and it leads to roles in auditing, tax, and corporate finance — or to the CPA licensure path.",
      tags: ["CPA path", "Audit", "Finance"],
      heading: "Read the <em>numbers</em> that run a business.",
      intro: "Accountancy is about trust and accuracy. You learn how money moves through an organization and how to report it clearly and correctly.",
      reasons: [
        { title: "You are precise and detail-oriented", text: "Accounting rewards careful, accurate work and a strong sense of responsibility." },
        { title: "You want a clear professional path", text: "Accountancy has a well-defined career and licensure track." },
        { title: "You like structure and rules", text: "Financial reporting follows standards — mastering them is a core skill." },
      ],
      note: "Not a verdict. Check the school's CPA board performance and review center support.",
    },
    "bs-ba-fin": {
      name: "BS Business Administration — Financial Management",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/financial-management.jpg",
      photoAlt: "Financial analysis and charts",
      chips: ["Finance", "Investments", "Planning", "Analysis"],
      why: "This major focuses on how organizations plan, raise, and manage money — budgeting, investments, financial analysis, and strategic planning. It is broader than accountancy and leans toward decision-making.",
      tags: ["Corporate finance", "Investment", "Strategy"],
      heading: "Guide money toward <em>better decisions</em>.",
      intro: "Financial Management is about using money as a tool for growth. You learn to analyze options, manage risk, and plan for the future.",
      reasons: [
        { title: "You like numbers with a purpose", text: "Finance is about using numbers to make real business decisions." },
        { title: "You think strategically", text: "This track rewards people who can see the bigger picture behind a spreadsheet." },
        { title: "You want range", text: "Finance skills apply across banking, corporate roles, and entrepreneurship." },
      ],
      note: "Not a verdict. Ask about trading labs, internships, and software training (Excel, ERP, analytics).",
    },
    "bs-ba-hrm": {
      name: "BS Business Administration — Human Resource Management",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/human-resource.jpg",
      photoAlt: "People and teams in a workplace",
      chips: ["People", "Recruitment", "Training", "Organizational behavior"],
      why: "HR Management focuses on the people side of business — hiring, training, compensation, and building healthy workplaces. It combines business knowledge with communication and empathy.",
      tags: ["People ops", "Talent", "Culture"],
      heading: "Build workplaces where <em>people</em> thrive.",
      intro: "HR is about aligning people with organizational goals. You learn how to recruit, develop, and support employees so both the business and the people grow.",
      reasons: [
        { title: "You understand people", text: "HR rewards people who can read situations and communicate clearly." },
        { title: "You want business and empathy", text: "This major blends organizational strategy with human-centered work." },
        { title: "You like solving people problems", text: "From hiring to conflict resolution, HR is about making teams work better." },
      ],
      note: "Not a verdict. Look for internship placements in HR departments and training in HRIS tools.",
    },
    "bs-ba-mkt": {
      name: "BS Business Administration — Marketing Management",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/marketing.jpg",
      photoAlt: "Marketing campaign and brand strategy",
      chips: ["Branding", "Consumer behavior", "Sales", "Campaigns"],
      why: "Marketing Management teaches you how to understand customers, build brands, and create campaigns that connect products to people. It blends creativity with strategy and data.",
      tags: ["Branding", "Digital marketing", "Sales"],
      heading: "Connect products to <em>real people</em>.",
      intro: "Marketing is more than advertising. You learn to study consumers, position products, and measure what actually works.",
      reasons: [
        { title: "You are curious about people", text: "Marketing starts with understanding what customers want and why." },
        { title: "You enjoy creative strategy", text: "This track rewards people who can combine creativity with evidence." },
        { title: "You like measurable results", text: "Modern marketing is data-driven — campaigns can be tested and improved." },
      ],
      note: "Not a verdict. Check for digital marketing tools training, agency partnerships, and portfolio projects.",
    },
    "bs-customs": {
      name: "BS Customs Administration",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/customs.jpg",
      photoAlt: "Port and logistics operations",
      chips: ["Trade", "Logistics", "Compliance", "Clearance"],
      why: "Customs Administration prepares you for the rules and processes of international trade — import/export clearance, tariffs, and supply-chain compliance. It is a specialized, in-demand field.",
      tags: ["Trade", "Logistics", "Compliance"],
      heading: "Move goods across <em>borders</em> by the rules.",
      intro: "Customs sits at the intersection of law, logistics, and business. You learn how goods move internationally and how to keep that movement legal and efficient.",
      reasons: [
        { title: "You like rules and systems", text: "Customs work involves detailed regulations and procedures." },
        { title: "You are interested in trade", text: "This field is central to global and local supply chains." },
        { title: "You want a specialized niche", text: "Customs brokers and specialists are in steady demand." },
      ],
      note: "Not a verdict. Ask about customs broker licensure review and industry linkages.",
    },
    "bs-entrep": {
      name: "BS Entrepreneurship",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/entrepreneurship.jpg",
      photoAlt: "Startup planning and small business",
      chips: ["Startups", "Business planning", "Innovation", "Risk"],
      why: "Entrepreneurship teaches you how to spot opportunities, validate ideas, and build ventures. It combines business fundamentals with creativity, resilience, and real-world experimentation.",
      tags: ["Startups", "Small business", "Innovation"],
      heading: "Turn ideas into <em>ventures</em> that work.",
      intro: "Entrepreneurship is hands-on. You learn to test ideas, build teams, and manage the uncertainty that comes with starting something new.",
      reasons: [
        { title: "You want to build something", text: "This track is for people who would rather create than only manage." },
        { title: "You are comfortable with uncertainty", text: "Entrepreneurship teaches you to make decisions with incomplete information." },
        { title: "You want ownership", text: "You learn to run a business end-to-end, from idea to operations." },
      ],
      note: "Not a verdict. Look for incubation programs, mentorship, and opportunities to pitch real ventures.",
    },
    /* --- Health --- */
    "bs-nursing": {
      name: "BS Nursing",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/nursing.jpg",
      photoAlt: "Nursing care and clinical practice",
      chips: ["Patient care", "Clinical skills", "Health science", "Empathy"],
      why: "Nursing prepares you for direct patient care — assessing health, administering treatment, and supporting recovery. It combines strong science with hands-on clinical practice and human connection.",
      tags: ["Clinical care", "Licensure path", "Healthcare"],
      heading: "Care for people. <em>Ground it in science.</em>",
      intro: "Nursing is a demanding but deeply human profession. You learn the science of health and the practice of caring for real patients in real settings.",
      reasons: [
        { title: "You want visible impact", text: "Nursing is about making a direct difference in people's health and lives." },
        { title: "You can stay calm under pressure", text: "Clinical work rewards composure, judgment, and teamwork." },
        { title: "You want a clear professional path", text: "Nursing leads to licensure and a wide range of healthcare roles." },
      ],
      note: "Not a verdict. Check clinical placements, board exam performance, and hospital partnerships.",
    },
    "bs-midwifery": {
      name: "BS Midwifery",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/midwifery.jpg",
      photoAlt: "Maternal care and midwifery practice",
      chips: ["Maternal care", "Reproductive health", "Community", "Clinical practice"],
      why: "Midwifery focuses on pregnancy, childbirth, and reproductive health care. It is a science-based, community-oriented track that prepares you to support mothers and families through critical life moments.",
      tags: ["Maternal health", "Community care", "Licensure path"],
      heading: "Support families through <em>life's beginnings</em>.",
      intro: "Midwifery combines clinical skill with deep community connection. You learn to provide care across pregnancy, birth, and postpartum periods.",
      reasons: [
        { title: "You care about maternal health", text: "This track is centered on the wellbeing of mothers and newborns." },
        { title: "You want community-level impact", text: "Midwives often work directly in communities where care matters most." },
        { title: "You want a licensed clinical role", text: "Midwifery has its own licensure and clear career path." },
      ],
      note: "Not a verdict. Confirm clinical affiliations, licensure review, and community training sites.",
    },
    "bs-medtech": {
      name: "BS Medical Laboratory Science",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/medical-technology.jpg",
      photoAlt: "Laboratory diagnostics and analysis",
      chips: ["Laboratory science", "Diagnostics", "Biology", "Precision"],
      why: "Medical Laboratory Science trains you to run the tests behind medical decisions — blood work, microbiology, chemistry, and diagnostics. It is science-heavy, precise, and essential to healthcare.",
      tags: ["Diagnostics", "Laboratory", "Licensure path"],
      heading: "Find the <em>answers</em> inside the sample.",
      intro: "Medical technologists are the scientists behind clinical decisions. You learn to analyze samples accurately and produce results clinicians rely on.",
      reasons: [
        { title: "You like laboratory work", text: "This track is hands-on with instruments, samples, and careful procedures." },
        { title: "You are precise and patient", text: "Accuracy is critical — a single result can change a diagnosis." },
        { title: "You want to support care indirectly", text: "You contribute to patient care by providing reliable data." },
      ],
      note: "Not a verdict. Check laboratory facilities, internship hospitals, and board exam support.",
    },
    /* --- Engineering --- */
    "bs-civil": {
      name: "BS Civil Engineering",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/civil-engineering.jpg",
      photoAlt: "Infrastructure and construction",
      chips: ["Infrastructure", "Structures", "Design", "Project management"],
      why: "Civil Engineering designs and builds the infrastructure societies depend on — roads, bridges, buildings, water systems. It combines math, physics, and large-scale problem solving.",
      tags: ["Infrastructure", "Construction", "Licensure path"],
      heading: "Design the <em>infrastructure</em> people use daily.",
      intro: "Civil engineers shape the physical world. You learn to design safe, efficient structures and manage projects that serve entire communities.",
      reasons: [
        { title: "You like seeing physical results", text: "Civil engineering produces visible, lasting infrastructure." },
        { title: "You enjoy math and physics", text: "Structural and material analysis are core to the work." },
        { title: "You want a licensed profession", text: "Civil engineering has a clear licensure path and strong demand." },
      ],
      note: "Not a verdict. Check accreditation, laboratory equipment, and board exam performance.",
    },
    "bs-cpe": {
      name: "BS Computer Engineering",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/computer-engineering.jpg",
      photoAlt: "Hardware and embedded systems",
      chips: ["Hardware", "Embedded systems", "Electronics", "Programming"],
      why: "Computer Engineering bridges hardware and software — designing embedded systems, processors, and devices. It is for people who want to understand computing all the way down to the circuit.",
      tags: ["Embedded systems", "Hardware", "IoT"],
      heading: "Build the <em>hardware</em> behind computing.",
      intro: "Computer engineers work where software meets physical devices. You learn to design and program the systems inside modern technology.",
      reasons: [
        { title: "You want to understand the physical side", text: "This track goes beyond code into circuits and devices." },
        { title: "You like electronics and programming", text: "Computer engineering combines both disciplines." },
        { title: "You're interested in embedded and IoT", text: "From appliances to vehicles, embedded systems are everywhere." },
      ],
      note: "Not a verdict. Ask about lab access, microcontroller kits, and industry linkages.",
    },
    "bs-ee": {
      name: "BS Electrical Engineering",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/electrical-engineering.jpg",
      photoAlt: "Power systems and electrical work",
      chips: ["Power", "Circuits", "Energy", "Systems"],
      why: "Electrical Engineering deals with power generation, distribution, and electrical systems. It is foundational to energy, utilities, and industrial infrastructure.",
      tags: ["Power systems", "Energy", "Licensure path"],
      heading: "Power the <em>systems</em> society relies on.",
      intro: "Electrical engineers design the systems that generate, transmit, and use electricity. It is a core engineering discipline with broad applications.",
      reasons: [
        { title: "You are interested in energy", text: "Power and sustainability are growing areas of focus." },
        { title: "You like applied physics", text: "Electrical engineering applies physics to real systems." },
        { title: "You want a licensed path", text: "Electrical engineering has a clear licensure track." },
      ],
      note: "Not a verdict. Check laboratory facilities and power-systems coursework.",
    },
    "bs-ece": {
      name: "BS Electronics Engineering",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/electronics-engineering.jpg",
      photoAlt: "Electronics and communication systems",
      chips: ["Electronics", "Communications", "Signals", "Devices"],
      why: "Electronics Engineering focuses on electronic devices, communication systems, and signal processing. It underpins telecommunications, broadcasting, and modern electronics.",
      tags: ["Telecom", "Electronics", "Licensure path"],
      heading: "Design the <em>signals</em> that connect us.",
      intro: "Electronics engineers work on the devices and systems that transmit and process information. It is a technical, detail-driven field.",
      reasons: [
        { title: "You like circuits and signals", text: "This track goes deep into how electronic systems operate." },
        { title: "You're interested in communications", text: "Telecom and broadcasting depend on electronics engineering." },
        { title: "You want a licensed profession", text: "Electronics engineering has its own licensure path." },
      ],
      note: "Not a verdict. Ask about communications labs and industry partnerships.",
    },
    "bs-ie": {
      name: "BS Industrial Engineering",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/industrial-engineering.jpg",
      photoAlt: "Process optimization and operations",
      chips: ["Optimization", "Operations", "Systems", "Efficiency"],
      why: "Industrial Engineering optimizes how people, machines, and processes work together. It is about efficiency, quality, and designing better systems — from factories to service operations.",
      tags: ["Operations", "Process design", "Supply chain"],
      heading: "Make systems <em>work better</em>.",
      intro: "Industrial engineers look at the big picture of how work gets done and find ways to make it faster, safer, and more efficient.",
      reasons: [
        { title: "You like improving processes", text: "This track is about finding and fixing inefficiencies." },
        { title: "You think in systems", text: "Industrial engineering connects people, machines, and information." },
        { title: "You want versatile skills", text: "IE applies to manufacturing, logistics, healthcare, and services." },
      ],
      note: "Not a verdict. Check for simulation software training and industry projects.",
    },
    /* --- Education --- */
    "beed": {
      name: "Bachelor of Elementary Education",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/elementary-education.jpg",
      photoAlt: "Elementary classroom teaching",
      chips: ["Teaching", "Child development", "Curriculum", "Classroom"],
      why: "Elementary Education prepares you to teach children in the foundational years. It combines child development, pedagogy, and hands-on classroom practice.",
      tags: ["Teaching", "Licensure path", "Child development"],
      heading: "Shape the <em>foundation</em> of learning.",
      intro: "Elementary teachers help children build the skills and confidence they carry for life. This track teaches you how to teach, not just what to teach.",
      reasons: [
        { title: "You enjoy working with children", text: "Elementary teaching is hands-on and relationship-driven." },
        { title: "You want to explain ideas clearly", text: "Teaching is about making complex ideas accessible." },
        { title: "You want a licensed profession", text: "Education has a clear licensure path for teachers." },
      ],
      note: "Not a verdict. Check practicum placements and licensure review support.",
    },
    "bsed": {
      name: "Bachelor of Secondary Education",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/secondary-education.jpg",
      photoAlt: "High school classroom teaching",
      chips: ["Teaching", "Subject mastery", "Adolescents", "Pedagogy"],
      why: "Secondary Education prepares you to teach high school students in a chosen specialization — English, Math, Science, Filipino, or Social Studies. It combines deep subject knowledge with teaching practice.",
      tags: ["Teaching", "Licensure path", "Subject specialization"],
      heading: "Guide students through <em>deeper learning</em>.",
      intro: "Secondary teachers help students think critically and prepare for higher education or work. You learn both your subject and how to teach it well.",
      reasons: [
        { title: "You want to specialize", text: "Secondary education lets you go deeper into a subject you love." },
        { title: "You enjoy adolescent learners", text: "High school teaching is about guiding students through a pivotal stage." },
        { title: "You want classroom impact", text: "Good teachers change how students see a subject." },
      ],
      note: "Not a verdict. Confirm your chosen specialization is offered and check practicum sites.",
    },
    "beced": {
      name: "Bachelor of Early Childhood Education",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/early-childhood.jpg",
      photoAlt: "Early childhood learning environment",
      chips: ["Early learning", "Play-based", "Child development", "Care"],
      why: "Early Childhood Education focuses on the learning and development of young children. It emphasizes play-based learning, child psychology, and creating safe, nurturing environments.",
      tags: ["Early learning", "Child development", "Teaching"],
      heading: "Nurture <em>curiosity</em> from the start.",
      intro: "The early years matter most. This track teaches you how young children learn and how to create environments that support their growth.",
      reasons: [
        { title: "You care about young children", text: "This track is centered on the earliest stages of learning." },
        { title: "You like hands-on, creative work", text: "Early childhood teaching is active, playful, and relational." },
        { title: "You want foundational impact", text: "Early education shapes how children approach learning for years." },
      ],
      note: "Not a verdict. Check for child development labs and partner preschools.",
    },
    "bped": {
      name: "Bachelor of Physical Education",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/physical-education.jpg",
      photoAlt: "Sports and physical education training",
      chips: ["Sports", "Fitness", "Coaching", "Wellness"],
      why: "Physical Education prepares you to teach and promote movement, fitness, and wellness. It combines sports science, coaching, and teaching practice.",
      tags: ["Sports science", "Coaching", "Wellness"],
      heading: "Teach movement and <em>wellbeing</em>.",
      intro: "Physical education is about building healthy habits and confidence through movement. You learn to teach, coach, and support physical development.",
      reasons: [
        { title: "You love sports and movement", text: "This track turns that passion into a teaching career." },
        { title: "You want to promote health", text: "Physical education contributes to lifelong wellness." },
        { title: "You enjoy coaching", text: "The skills apply directly to sports coaching and training." },
      ],
      note: "Not a verdict. Ask about sports facilities, coaching certifications, and practicum sites.",
    },
    /* --- Arts & Communication --- */
    "ba-comm": {
      name: "BA Communication",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/communication.jpg",
      photoAlt: "Media and communication workspace",
      chips: ["Media", "Writing", "Public relations", "Storytelling"],
      why: "Communication teaches you to create and manage messages across media — journalism, public relations, advertising, and digital content. It is about clarity, creativity, and audience awareness.",
      tags: ["Media", "PR", "Content"],
      heading: "Tell stories that <em>land</em>.",
      intro: "Communication is the skill behind every industry. You learn to write, speak, and produce content that informs and persuades.",
      reasons: [
        { title: "You like words and ideas", text: "Communication rewards people who can shape a message clearly." },
        { title: "You want creative work", text: "From campaigns to documentaries, this field is creative and varied." },
        { title: "You want transferable skills", text: "Communication skills apply in every sector." },
      ],
      note: "Not a verdict. Check for production facilities, internships, and portfolio-building projects.",
    },
    "ba-multimedia": {
      name: "BA Multimedia Arts",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/multimedia-arts.jpg",
      photoAlt: "Animation and digital art studio",
      chips: ["Animation", "Digital art", "Design", "Storytelling"],
      why: "Multimedia Arts blends visual design, animation, and digital storytelling. It is for people who want to create visual content — from animation to interactive media.",
      tags: ["Animation", "Design", "Digital media"],
      heading: "Turn imagination into <em>visual media</em>.",
      intro: "Multimedia artists create the visuals people see and feel. You learn design principles, animation, and digital production.",
      reasons: [
        { title: "You think visually", text: "This track is built for people who see the world in images and motion." },
        { title: "You want creative production skills", text: "You will build a portfolio of real visual work." },
        { title: "You're interested in animation", text: "Animation is a growing field in media and entertainment." },
      ],
      note: "Not a verdict. Ask about software access, portfolio reviews, and industry mentors.",
    },
    /* --- Social Sciences --- */
    "bs-psych": {
      name: "BS Psychology",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/psychology.jpg",
      photoAlt: "Human behavior and counseling",
      chips: ["Behavior", "Research", "Counseling", "Human mind"],
      why: "Psychology is the study of human behavior and mental processes. It builds research skills and understanding of people, and it opens paths into counseling, HR, education, and further study.",
      tags: ["Behavioral science", "Research", "People"],
      heading: "Understand <em>how people think</em>.",
      intro: "Psychology combines science and empathy. You learn to study behavior rigorously while developing deep insight into people.",
      reasons: [
        { title: "You're curious about people", text: "Psychology asks why people think, feel, and act the way they do." },
        { title: "You like research", text: "Psychology is grounded in evidence and scientific method." },
        { title: "You want people-centered work", text: "The skills apply to HR, education, counseling, and beyond." },
      ],
      note: "Not a verdict. Ask about lab facilities, research opportunities, and licensure guidance.",
    },
    "ba-polsci": {
      name: "BA Political Science",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/political-science.jpg",
      photoAlt: "Government and public policy",
      chips: ["Government", "Policy", "Law", "Analysis"],
      why: "Political Science studies power, governance, and public policy. It builds strong analytical and writing skills and is a common pre-law track.",
      tags: ["Pre-law", "Policy", "Governance"],
      heading: "Study how <em>societies</em> are governed.",
      intro: "Political Science is about understanding institutions, power, and public decisions. It builds skills in analysis, argument, and research.",
      reasons: [
        { title: "You're interested in government", text: "This track explores how societies organize and make decisions." },
        { title: "You want strong analytical skills", text: "Political science trains you to read, argue, and write clearly." },
        { title: "You're considering law", text: "It is one of the most common pre-law tracks." },
      ],
      note: "Not a verdict. Ask about pre-law support, internships, and research opportunities.",
    },
    "bs-social-work": {
      name: "BS Social Work",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/social-work.jpg",
      photoAlt: "Community and social services",
      chips: ["Community", "Advocacy", "Support", "Social justice"],
      why: "Social Work prepares you to support individuals, families, and communities facing challenges. It combines counseling skills, policy knowledge, and hands-on field practice.",
      tags: ["Community", "Counseling", "Licensure path"],
      heading: "Support people through <em>difficult moments</em>.",
      intro: "Social workers help people navigate systems and circumstances. It is demanding, meaningful, and grounded in real communities.",
      reasons: [
        { title: "You want to help directly", text: "Social work is hands-on support for people in need." },
        { title: "You care about justice", text: "This field addresses inequality and access to services." },
        { title: "You want a licensed profession", text: "Social work has a licensure path and clear career structure." },
      ],
      note: "Not a verdict. Check field placement sites and licensure exam support.",
    },
    "b-human-services": {
      name: "Bachelor in Human Services",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/human-services.jpg",
      photoAlt: "Community support services",
      chips: ["Community", "Services", "Support", "People"],
      why: "Human Services prepares you to work in community and social service settings, helping people access support and improve their wellbeing. It is broad, people-centered, and practical.",
      tags: ["Community", "Social services", "People"],
      heading: "Help people find the <em>support</em> they need.",
      intro: "Human Services focuses on delivering services that improve lives — from community programs to social support systems.",
      reasons: [
        { title: "You want community impact", text: "This field is about improving access to support and services." },
        { title: "You like working with people", text: "Human services roles are relational and hands-on." },
        { title: "You want flexibility", text: "The skills apply across government, NGOs, and community programs." },
      ],
      note: "Not a verdict. Ask about field placements and partner organizations.",
    },
    /* --- Hospitality & Tourism --- */
    "bs-hm": {
      name: "BS Hospitality Management",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/hospitality.jpg",
      photoAlt: "Hotel and restaurant operations",
      chips: ["Hotels", "Food service", "Operations", "Service"],
      why: "Hospitality Management prepares you for the hotel, restaurant, and service industries. It combines business skills with hands-on service operations.",
      tags: ["Hotels", "F&B", "Service"],
      heading: "Create <em>memorable</em> guest experiences.",
      intro: "Hospitality is about service at scale. You learn how hotels and restaurants operate and how to deliver experiences people remember.",
      reasons: [
        { title: "You enjoy service", text: "Hospitality rewards people who genuinely like helping guests." },
        { title: "You want hands-on training", text: "Programs include kitchen, front desk, and operations practice." },
        { title: "You want global opportunities", text: "Hospitality skills travel well across countries." },
      ],
      note: "Not a verdict. Check for hotel partnerships, kitchen labs, and internship placements.",
    },
    "bs-tm": {
      name: "BS Tourism Management",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/tourism.jpg",
      photoAlt: "Tourism destinations and travel",
      chips: ["Travel", "Destinations", "Planning", "Tour operations"],
      why: "Tourism Management focuses on the travel and destination industry — tour operations, destination planning, and sustainable tourism. It combines business, geography, and service skills.",
      tags: ["Travel", "Tour operations", "Sustainability"],
      heading: "Connect people with <em>places</em>.",
      intro: "Tourism is about experiences, logistics, and place. You learn to plan and manage travel products and destinations.",
      reasons: [
        { title: "You love travel and culture", text: "Tourism turns that interest into a professional skill." },
        { title: "You like planning", text: "Tour operations involve logistics, scheduling, and coordination." },
        { title: "You want a growing industry", text: "Tourism is a major sector with diverse career paths." },
      ],
      note: "Not a verdict. Ask about tour operator partnerships and destination exposure.",
    },
    "bs-ihm": {
      name: "BS International Hospitality Management",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/international-hospitality.jpg",
      photoAlt: "International hotel operations",
      chips: ["Global hospitality", "Hotels", "Service", "Cross-cultural"],
      why: "International Hospitality Management prepares you for hospitality careers with a global perspective — international hotel chains, cross-cultural service, and global standards.",
      tags: ["International", "Hotels", "Service"],
      heading: "Serve guests from <em>around the world</em>.",
      intro: "This track adds an international lens to hospitality — global standards, cultures, and career mobility.",
      reasons: [
        { title: "You want global opportunities", text: "International programs prepare you for work abroad." },
        { title: "You're interested in cultures", text: "Cross-cultural service is central to international hospitality." },
        { title: "You want hotel-chain careers", text: "This track aligns with international hotel standards." },
      ],
      note: "Not a verdict. Check international partnerships, exchange programs, and language training.",
    },
    "bs-ittsm": {
      name: "BS International Tourism and Travel Services Management",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/international-tourism.jpg",
      photoAlt: "Global travel and tourism services",
      chips: ["Travel services", "Global tourism", "Operations", "Planning"],
      why: "This track prepares you for international tourism and travel services — global destinations, travel operations, and cross-border tourism management.",
      tags: ["International travel", "Tourism ops", "Global"],
      heading: "Manage travel across <em>borders</em>.",
      intro: "International tourism adds global logistics and cultural understanding to tourism management. You learn to operate across destinations and markets.",
      reasons: [
        { title: "You want a global career", text: "International tourism opens opportunities beyond local markets." },
        { title: "You like logistics", text: "Travel services involve complex coordination and planning." },
        { title: "You're curious about the world", text: "This track rewards cultural awareness and curiosity." },
      ],
      note: "Not a verdict. Ask about international linkages, language requirements, and travel exposure.",
    },
    /* --- Architecture --- */
    "bs-arch": {
      name: "BS Architecture",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/architecture.jpg",
      photoAlt: "Architectural design and models",
      chips: ["Design", "Structures", "Space", "Creativity"],
      why: "Architecture blends art and engineering to design buildings and spaces. It is creative, technical, and studio-driven, and it leads to a licensed profession.",
      tags: ["Design", "Buildings", "Licensure path"],
      heading: "Design <em>spaces</em> people live in.",
      intro: "Architecture is about shaping the built environment. You learn to balance aesthetics, function, safety, and sustainability.",
      reasons: [
        { title: "You think creatively and spatially", text: "Architecture rewards visual thinking and design sense." },
        { title: "You want a licensed profession", text: "Architects follow a clear licensure path." },
        { title: "You like technical creativity", text: "Design must also be buildable and safe." },
      ],
      note: "Not a verdict. Check studio facilities, software training, and board exam support.",
    },
    /* --- Aviation --- */
    "bs-aircraft-maint": {
      name: "BS Aircraft Maintenance Technology",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/aircraft-maintenance.jpg",
      photoAlt: "Aircraft maintenance and engineering",
      chips: ["Aviation", "Maintenance", "Safety", "Hands-on"],
      why: "Aircraft Maintenance Technology prepares you to inspect, maintain, and repair aircraft. It is highly technical, safety-critical, and hands-on.",
      tags: ["Aviation", "Maintenance", "Licensure path"],
      heading: "Keep aircraft <em>safe and flying</em>.",
      intro: "Aircraft maintenance is a precision field. You learn the systems, tools, and standards that keep aviation safe.",
      reasons: [
        { title: "You like hands-on technical work", text: "This track is practical and tool-based." },
        { title: "You want aviation careers", text: "Aircraft technicians are in demand in aviation." },
        { title: "You value safety and precision", text: "Maintenance work demands accuracy and responsibility." },
      ],
      note: "Not a verdict. Check CAAP/regulatory alignment, hangar access, and tool training.",
    },
    /* --- Maritime --- */
    "bs-marine-transpo": {
      name: "BS Marine Transportation",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/marine-transportation.jpg",
      photoAlt: "Ship navigation and deck operations",
      chips: ["Navigation", "Deck", "Maritime", "Leadership"],
      why: "Marine Transportation prepares you for deck officer roles at sea — navigation, cargo operations, and shipboard leadership. It leads to maritime licensure and international careers.",
      tags: ["Maritime", "Navigation", "Licensure path"],
      heading: "Take the <em>helm</em> on the open sea.",
      intro: "Marine Transportation is about operating ships safely and efficiently. You learn navigation, seamanship, and maritime regulations.",
      reasons: [
        { title: "You want an at-sea career", text: "This track leads to deck officer roles on ships." },
        { title: "You want international opportunities", text: "Maritime credentials are recognized globally." },
        { title: "You're comfortable with responsibility", text: "Deck officers are responsible for ship and crew." },
      ],
      note: "Not a verdict. Check MARINA alignment, shipboard training, and simulator facilities.",
    },
    "bs-marine-eng": {
      name: "BS Marine Engineering",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/marine-engineering.jpg",
      photoAlt: "Ship engine room and machinery",
      chips: ["Engines", "Machinery", "Maritime", "Maintenance"],
      why: "Marine Engineering prepares you to operate and maintain ship machinery and systems. It is technical, hands-on, and leads to international maritime careers.",
      tags: ["Maritime", "Engineering", "Licensure path"],
      heading: "Power vessels across the <em>ocean</em>.",
      intro: "Marine engineers keep ships running. You learn engines, systems, and maintenance in one of the most demanding engineering environments.",
      reasons: [
        { title: "You like engines and systems", text: "This track is deeply technical and hands-on." },
        { title: "You want to work at sea", text: "Marine engineers work aboard ships and in port facilities." },
        { title: "You want global credentials", text: "Marine engineering skills are internationally recognized." },
      ],
      note: "Not a verdict. Check MARINA alignment, engine simulator access, and shipboard training.",
    },
    /* --- Criminology --- */
    "bs-crim": {
      name: "BS Criminology",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/criminology.jpg",
      photoAlt: "Law enforcement and investigation",
      chips: ["Law enforcement", "Investigation", "Justice", "Public safety"],
      why: "Criminology prepares you for careers in law enforcement, investigation, and public safety. It combines social science, legal knowledge, and practical procedures.",
      tags: ["Law enforcement", "Investigation", "Licensure path"],
      heading: "Study crime and <em>protect communities</em>.",
      intro: "Criminology is about understanding crime and how societies respond to it. It prepares you for roles in policing, security, and justice.",
      reasons: [
        { title: "You care about public safety", text: "This track is about protecting people and communities." },
        { title: "You want a licensed career", text: "Criminology has a clear licensure path." },
        { title: "You like investigation", text: "The work involves analysis, procedure, and evidence." },
      ],
      note: "Not a verdict. Check review support, field training, and law enforcement partnerships.",
    },
    /* --- Library / Office --- */
    "bs-lis": {
      name: "BS Library and Information Science",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/library-science.jpg",
      photoAlt: "Library and information management",
      chips: ["Information", "Archives", "Research", "Organization"],
      why: "Library and Information Science teaches you to organize, manage, and provide access to information. It leads to roles in libraries, archives, and information centers.",
      tags: ["Information", "Archives", "Licensure path"],
      heading: "Organize knowledge so others can <em>find it</em>.",
      intro: "LIS is about connecting people with information. You learn cataloging, digital archives, and information services.",
      reasons: [
        { title: "You love organizing information", text: "This field is about making knowledge findable and usable." },
        { title: "You want to support learning", text: "Libraries are learning hubs, and LIS professionals make them work." },
        { title: "You want a licensed path", text: "Librarianship has its own licensure." },
      ],
      note: "Not a verdict. Ask about digital archive training, practicum sites, and licensure review.",
    },
    "bs-office-admin": {
      name: "BS Office Administration",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/office-administration.jpg",
      photoAlt: "Professional office and administrative work",
      chips: ["Administration", "Office systems", "Communication", "Organization"],
      why: "Office Administration prepares you to manage office operations, records, and business communication. It is practical and directly employable.",
      tags: ["Administration", "Office systems", "Business support"],
      heading: "Keep organizations <em>running smoothly</em>.",
      intro: "Office administration is the backbone of business operations. You learn the systems and skills that keep offices efficient.",
      reasons: [
        { title: "You are organized and practical", text: "This field rewards efficiency and attention to detail." },
        { title: "You like business support roles", text: "Administration is central to every organization." },
        { title: "You want direct employability", text: "Office skills are in demand across industries." },
      ],
      note: "Not a verdict. Check for software training (office suites, records systems) and internship links.",
    },
    /* --- Engineering Education --- */
    "b-tvte": {
      name: "Bachelor of Technical-Vocational Teacher Education",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/technical-vocational-teaching.jpg",
      photoAlt: "Technical and vocational teaching",
      chips: ["Teaching", "Technical skills", "Vocational", "Training"],
      why: "This degree prepares you to teach technical and vocational subjects. It combines teaching skills with hands-on technical expertise.",
      tags: ["Teaching", "TVET", "Licensure path"],
      heading: "Teach <em>skills</em> that lead to jobs.",
      intro: "Technical-vocational teachers equip students with practical, employable skills. This track combines pedagogy with hands-on training.",
      reasons: [
        { title: "You want to teach practical skills", text: "TVET teaching is hands-on and career-focused." },
        { title: "You value employability", text: "These skills lead directly to work opportunities." },
        { title: "You want a licensed teaching path", text: "Teacher education includes licensure preparation." },
      ],
      note: "Not a verdict. Check TESDA alignment, shop facilities, and practicum partnerships.",
    },
    /* --- Real Estate --- */
    "bs-real-estate": {
      name: "BS Real Estate Management",
      icon: "#icon-logo-bold",
      photo: "assets/tracks/real-estate.jpg",
      photoAlt: "Property and real estate",
      chips: ["Property", "Investment", "Management", "Sales"],
      why: "Real Estate Management covers property valuation, sales, and management. It prepares you for careers in real estate brokerage, property management, and investment.",
      tags: ["Property", "Sales", "Licensure path"],
      heading: "Manage property as a <em>business</em>.",
      intro: "Real estate is about property, people, and investment. You learn to evaluate, market, and manage real assets.",
      reasons: [
        { title: "You're interested in property", text: "Real estate is a visible, tangible industry." },
        { title: "You like sales and negotiation", text: "Brokerage and management are people-facing roles." },
        { title: "You want a licensed path", text: "Real estate has a licensure requirement for brokers." },
      ],
      note: "Not a verdict. Ask about PRC licensure review and industry partnerships.",
    },
  };

  /* -----------------------------------------
     COLLEGE DATA
     ----------------------------------------- */
  const colleges = [
    {
      name: "Gordon College",
      // Adding a custom flag to trigger the special banner design
      isReferenceDesign: true, 
      location: "Olongapo City, Philippines",
      program: "BS Computer Science",
      // YOU CAN REPLACE THESE URLS WITH YOUR LOCAL IMAGE PATHS
      photo: "/college profiles/GC-Background.jpg", // Building placeholder
      logo: "/college profiles/GordonCollege.png", // Gordon logo placeholder
      email: "info@gordoncollege.edu.ph",
      phone: "+63 47 222 2222",
      website: "gordoncollege.edu.ph",
      websiteUrl: "https://gordoncollege.edu.ph",
      address: "Olongapo City, Philippines",
      groups: {
        "Computing": ["bs-cs", "bs-it", "bs-emc", "assoc-computer-tech"],
        "Business & Accountancy": ["bs-accountancy", "bs-ba-fin", "bs-ba-hrm", "bs-ba-mkt", "bs-customs"],
        "Health Sciences": ["bs-nursing", "bs-midwifery"],
        "Education & Arts": ["ba-comm", "beced", "bped", "beed", "bsed"],
        "Hospitality & Tourism": ["bs-hm", "bs-tm"],
      },
      note: "Also offers an Associate in Computer Technology, Teacher Certificate Program, and graduate programs (MA Nursing, MA Education, Master in Business Management, Master in Public Administration).",
    },
    {
      name: "Columban College – Barretto",
      location: "Olongapo City, Philippines",
      program: "Program name",
      photo: "",
      logo: "/college profiles/Columban.png",
      email: "info@columban.edu.ph",
      phone: "+63 47 222 3333",
      website: "columban.edu.ph",
      websiteUrl: "https://columban.edu.ph",
      address: "Olongapo City, Philippines",
      groups: {
        "Computing": ["bs-it", "bs-cs", "bs-office-admin", "bs-lis", "assoc-computer-tech"],
        "Engineering": ["bs-civil", "bs-cpe", "bs-ee", "bs-ece", "bs-ie"],
        "Business": ["bs-accountancy", "bs-ba-fin", "bs-ba-hrm", "bs-ba-mkt"],
        "Hospitality & Tourism": ["bs-hm", "bs-tm", "bs-ihm", "bs-ittsm"],
        "Health": ["bs-nursing"],
        "Architecture": ["bs-arch"],
        "Education & Social Sciences": ["beed", "bsed", "beced", "bped", "b-human-services", "ba-comm", "ba-polsci", "bs-social-work"],
      },
      note: "The official site covers multiple Columban campuses. Confirm which degrees are available specifically at Barretto before deciding.",
    },
    {
      name: "Lyceum of Subic Bay",
      location: "Olongapo City, Philippines",
      program: "Program name",
      photo: "",
      logo: "/college profiles/Lyceum.jpg",
      email: "",
      phone: "",
      website: "",
      websiteUrl: "",
      address: "Olongapo City, Philippines",
      groups: {},
      note: "The complete current college program list could not be reliably confirmed from official sources. Program records are marked for verification until the school confirms the available degrees. Do not assume courses based on Senior High School strands.",
    },
    {
      name: "Mondriaan Aura College",
      location: "Olongapo City, Philippines",
      program: "Program name",
      photo: "",
      logo: "/college profiles/Aura.jpg",
      email: "info@mondrianaura.edu.ph",
      phone: "+63 47 222 5555",
      website: "mondrianaura.edu.ph",
      websiteUrl: "https://mondrianaura.edu.ph",
      address: "Olongapo City, Philippines",
      groups: {
        "Computing": ["bs-cs", "bs-it", "assoc-computer-tech"],
        "Engineering": ["bs-cpe", "bs-ece", "bs-ie"],
        "Business": ["bs-accountancy", "bs-ba-mkt", "bs-ba-hrm"],
        "Communication & Social Sciences": ["ba-comm", "bs-psych"],
        "Education": ["beed", "bsed"],
        "Aviation": ["bs-aircraft-maint"],
      },
      note: "Also offers Associate in Aviation Electronics Technology, Associate in Aircraft Maintenance Technology, Master in Management (HRM or Business Administration), and Master of Arts in Teaching.",
    },
    {
      name: "CELTECH College Olongapo",
      location: "Olongapo City, Philippines",
      program: "Program name",
      photo: "",
      logo: "/college profiles/Celtech.jpg",
      email: "info@celtech.edu.ph",
      phone: "+63 47 222 6666",
      website: "celtech.edu.ph",
      websiteUrl: "https://celtech.edu.ph",
      address: "Olongapo City, Philippines",
      groups: {
        "Computing & IT": ["bs-it"],
        "Maritime": ["bs-marine-transpo", "bs-marine-eng"],
        "Criminology & Public Safety": ["bs-crim"],
        "Trade & Logistics": ["bs-customs"],
        "Business": ["bs-entrep", "bs-office-admin"],
        "Hospitality & Tourism": ["bs-hm", "bs-tm"],
      },
      note: "Also offers Senior High School strands and technical-vocational programs.",
    },
    {
      name: "St. Joseph College – Olongapo",
      location: "Olongapo City, Philippines",
      program: "Program name",
      photo: "",
      logo: "/college profiles/St. Joseph.jpg",
      email: "",
      phone: "",
      website: "",
      websiteUrl: "",
      address: "Olongapo City, Philippines",
      groups: {},
      note: "The current college-level degree list needs confirmation. The institution is verified, but its Senior High School strands should not be mistaken for college degrees. Awaiting a verified college course list.",
    },
    {
      name: "COMTEQ Computer and Business College",
      location: "Olongapo City, Philippines",
      program: "Program name",
      photo: "",
      logo: "/college profiles/Comteq.png",
      email: "info@comteq.edu.ph",
      phone: "+63 47 222 8888",
      website: "comteq.edu.ph",
      websiteUrl: "https://comteq.edu.ph",
      address: "Olongapo City, Philippines",
      groups: {
        "Computing": ["bs-cs", "bs-it", "assoc-computer-tech"],
        "Business & Accountancy": ["bs-accountancy", "bs-ba-hrm", "bs-ba-mkt"],
      },
      note: "Also offers Senior High School (ABM, HUMSS, TVL) and technical-vocational qualifications including Food and Beverage Services NC II, Front Office Services NC II, Housekeeping NC II, Bartending NC II, Computer Systems Servicing NC II, and Electronic Products Assembly and Servicing NC II.",
    },
    {
      name: "Subic Bay Colleges (SBCI)",
      location: "Olongapo City, Philippines",
      program: "Program name",
      photo: "",
      logo: "/college profiles/SBCI.jpeg",
      email: "",
      phone: "",
      website: "",
      websiteUrl: "",
      address: "Olongapo City, Philippines",
      groups: {},
      note: "Official program information is limited. The following TESDA qualifications are specifically listed: Computer Systems Servicing NC II and Automotive Servicing NC I. Other college and vocational offerings need confirmation with SBCI before inclusion.",
    },
    {
      name: "The Manila Times College of Subic",
      location: "Olongapo City, Philippines",
      program: "Program name",
      photo: "",
      logo: "/college profiles/TMTCS.jpg",
      email: "info@manilatimescollege.edu.ph",
      phone: "+63 47 223 1111",
      website: "manilatimescollege.edu.ph",
      websiteUrl: "https://manilatimescollege.edu.ph",
      address: "Olongapo City, Philippines",
      groups: {
        "Health Sciences": ["bs-nursing", "bs-medtech"],
        "Arts & Media": ["ba-multimedia"],
      },
      note: "Also offers Doctor of Medicine, plus Preschool, Elementary, Junior High School, and Senior High School. Degree programs are listed separately from basic education offerings.",
    },
    {
      name: "St. Benilde Center for Global Competence",
      location: "Olongapo City, Philippines",
      program: "Program name",
      photo: "",
      logo: "/college profiles/St. Benilde.png",
      email: "info@stbenilde.edu.ph",
      phone: "+63 47 223 2222",
      website: "stbenilde.edu.ph",
      websiteUrl: "https://stbenilde.edu.ph",
      address: "Olongapo City, Philippines",
      groups: {
        "Information Technology": ["bs-it"],
        "Multimedia": ["bs-emc"],
        "Business": ["bs-accountancy", "bs-customs", "bs-entrep", "bs-real-estate"],
        "Hospitality & Tourism": ["bs-hm", "bs-tm"],
      },
      note: "Also offers diploma and 2-year programs (Travel & Tourism Technology, Cruise Ship Management, Tourism/Hotel & Restaurant Operations, Computer Information & Multimedia Technology) and TESDA qualifications (CSS NC II, Game Programming NC III, 3D Animation NC III, Visual Graphic Design NC III, and more). Senior High School: ABM, GAS, HUMSS, TVL–ICT and Home Economics.",
    },
    {
      name: "College of Subic Montessori",
      location: "Olongapo City, Philippines",
      program: "Program name",
      photo: "",
      logo: "/college profiles/montessori.jpg",
      email: "info@subicmontessori.edu.ph",
      phone: "+63 47 223 3333",
      website: "subicmontessori.edu.ph",
      websiteUrl: "https://subicmontessori.edu.ph",
      address: "Olongapo City, Philippines",
      groups: {
        "Business": ["bs-entrep"],
        "Trade & Logistics": ["bs-customs"],
        "Tourism": ["bs-tm"],
        "Education": ["b-tvte"],
        "Computing": ["assoc-computer-tech"],
      },
      note: "Also offers TESDA short courses (Massage Therapy NC II, Tour Guiding Services NC II) and Senior High School tracks (Arts/Social Science/Humanities, Business & Entrepreneurship, STEM, Technical-Professional).",
    },
    {
      name: "TESDA Zambales",
      location: "Olongapo City, Philippines",
      program: "Program name",
      photo: "",
      logo: "/college profiles/Tesda.jpg",
      email: "info@tesda-zambales.gov.ph",
      phone: "+63 47 223 4444",
      website: "tesda.gov.ph",
      websiteUrl: "https://tesda.gov.ph",
      address: "Olongapo City, Philippines",
      groups: {},
      note: "TESDA is a government agency overseeing technical-vocational training and competency certification, not a single college with a fixed degree list. Locally listed qualifications include Computer Systems Servicing NC II, Automotive Servicing NC I, and hospitality/food-service qualifications. Exact course lists vary by training provider — check the TESDA registered training institution directory.",
    },
  ];

  /* -----------------------------------------
     RENDERING HELPERS
     ----------------------------------------- */
  const escape = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const infoItem = (label, value, href) => {
    if (!value) return "";
    const content = href
      ? `<a class="college-info-value" href="${escape(href)}"${
          href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""
        }>${escape(value)}</a>`
      : `<span class="college-info-value">${escape(value)}</span>`;
    return `
      <div class="college-info-item">
        <span class="college-info-label">${escape(label)}</span>
        ${content}
      </div>`;
  };

  const trackCard = (collegeId, trackKey) => {
    const track = trackLibrary[trackKey];
    if (!track) return "";
    return `
      <button class="track-card" type="button" data-college="${collegeId}" data-track="${escape(trackKey)}">
        <span class="track-card-head">
          <span class="track-card-name">${escape(track.name)}</span>
          <svg class="track-card-icon icon" aria-hidden="true"><use href="#icon-arrow-up-right" /></svg>
        </span>
        <span class="track-card-action">Open field notes</span>
      </button>`;
  };

  const panelContent = (college, collegeId) => {
    const groupNames = Object.keys(college.groups || {});
    if (!groupNames.length) {
      return `
        <div class="college-panel-inner">
          <p class="college-panel-note">${escape(college.note)}</p>
        </div>`;
    }

    const chips = groupNames
      .map(
        (group, i) =>
          `<button class="group-chip${i === 0 ? " is-active" : ""}" type="button" data-group="${escape(
            group
          )}" data-college="${collegeId}">${escape(group)}</button>`
      )
      .join("");

    const trackCount = groupNames.reduce(
      (sum, g) => sum + (college.groups[g]?.length || 0),
      0
    );

    const firstGroupTracks = (college.groups[groupNames[0]] || [])
      .map((key) => trackCard(collegeId, key))
      .join("");

    return `
      <div class="college-panel-inner">
        <div class="college-panel-head">
          <h3 class="college-panel-title">Academic tracks</h3>
          <span class="college-panel-count">${trackCount} program${trackCount === 1 ? "" : "s"}</span>
        </div>
        <div class="college-group-chips">${chips}</div>
        <div class="track-grid" id="track-grid-${collegeId}">${firstGroupTracks}</div>
        ${college.note ? `<p class="college-panel-note" style="margin-top:22px">${escape(college.note)}</p>` : ""}
      </div>`;
  };

  const entry = (college, index) => {
    const collegeId = `college-${index}`;
    const photoSrc = college.photo || "";
    const logoSrc = college.logo || "";
    const phoneHref = college.phone
      ? `tel:${college.phone.replace(/[^\d+]/g, "")}`
      : "";
    const hasGroups = Object.keys(college.groups || {}).length > 0;
    
    // Check if this college uses the custom reference design
    const isReference = college.isReferenceDesign ? " is-reference-design" : "";
    
    // If it's the reference design, we alter the text structure slightly
    const bannerCopy = college.isReferenceDesign 
      ? `
        <p class="college-location-top">${escape(college.name)} - Olongapo City</p>
        <p class="college-location">${escape(college.location)}</p>
        <h2 class="college-name-large">${escape(college.name)}</h2>
      `
      : `
        <h2 class="college-name">${escape(college.name)}</h2>
        <p class="college-location">${escape(college.location)}</p>
        <p class="college-program">${escape(hasGroups ? "View academic tracks" : "Program list for verification")}</p>
      `;

    return `
      <article class="college-entry" id="${collegeId}">
        <button class="college-banner${isReference}" type="button" aria-expanded="false" aria-controls="${collegeId}-panel">
          <img class="college-photo" src="${escape(photoSrc)}" alt="" />
          <img class="college-logo" src="${escape(logoSrc)}" alt="" />
          <div class="college-banner-copy">
            ${bannerCopy}
          </div>
          <span class="college-banner-toggle" aria-hidden="true">
            <svg class="icon" aria-hidden="true"><use href="#icon-arrow-right" /></svg>
          </span>
        </button>
        <div class="college-info">
          ${infoItem("Email", college.email, college.email ? `mailto:${college.email}` : "")}
          ${infoItem("Phone", college.phone, phoneHref)}
          ${infoItem("Website", college.website, college.websiteUrl)}
          ${infoItem("Address", college.address, "")}
        </div>
        <div class="college-panel" id="${collegeId}-panel">
          ${panelContent(college, collegeId)}
        </div>
      </article>`;
  };

  list.innerHTML = colleges.map(entry).join("");

  // Hide broken images so the background shows through
  list.querySelectorAll(".college-photo, .college-logo").forEach((img) => {
    img.addEventListener("error", () => {
      img.style.display = "none";
    });
  });

  /* -----------------------------------------
     EXPAND / COLLAPSE COLLEGE PANELS
     ----------------------------------------- */
  list.addEventListener("click", (event) => {
    const banner = event.target.closest(".college-banner");
    if (banner) {
      const entryEl = banner.closest(".college-entry");
      const isOpen = entryEl.classList.toggle("is-open");
      banner.setAttribute("aria-expanded", String(isOpen));
      return;
    }

    const groupChip = event.target.closest(".group-chip");
    if (groupChip) {
      const collegeId = groupChip.dataset.college;
      const groupName = groupChip.dataset.group;
      const entryEl = document.getElementById(collegeId);
      if (!entryEl) return;

      entryEl
        .querySelectorAll(".group-chip")
        .forEach((chip) => chip.classList.toggle("is-active", chip === groupChip));

      const collegeIndex = Number(collegeId.replace("college-", ""));
      const college = colleges[collegeIndex];
      const grid = document.getElementById(`track-grid-${collegeId}`);
      if (!grid || !college?.groups?.[groupName]) return;

      grid.innerHTML = college.groups[groupName]
        .map((key) => trackCard(collegeId, key))
        .join("");
      return;
    }

    const trackCardEl = event.target.closest(".track-card");
    if (trackCardEl) {
      const collegeIndex = Number(
        trackCardEl.dataset.college.replace("college-", "")
      );
      const college = colleges[collegeIndex];
      const track = trackLibrary[trackCardEl.dataset.track];
      if (college && track) openTrack(college, track);
    }
  });

  /* -----------------------------------------
     TRACK DIALOG
     ----------------------------------------- */
  const dialog = document.getElementById("track-dialog");
  if (!dialog || typeof dialog.showModal !== "function") return;

  const closeButton = dialog.querySelector(".track-close");
  const backButton = dialog.querySelector("[data-close-track]");
  const photo = document.getElementById("track-photo");
  const iconUse = document.getElementById("track-icon");
  const clues = document.getElementById("track-clues");
  const programName = document.getElementById("track-program-name");
  const collegeName = document.getElementById("track-college-name");
  const why = document.getElementById("track-why");
  const tags = document.getElementById("track-tags");
  const note = document.getElementById("track-note");
  const heading = document.getElementById("track-dialog-title");
  const intro = document.getElementById("track-intro");
  const reasons = document.getElementById("track-reasons");
  const index = document.getElementById("track-index");

  let lastTrigger = null;

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

  const openTrack = (college, track) => {
    lastTrigger = document.activeElement;

    clues.replaceChildren(...track.chips.map(makeChip));
    tags.replaceChildren(...track.tags.map(makeTag));
    reasons.replaceChildren(...track.reasons.map(makeReason));

    photo.src = track.photo;
    photo.alt = track.photoAlt || "";
    if (!track.photo) {
      photo.style.display = "none";
    } else {
      photo.style.display = "";
    }
    iconUse.setAttribute("href", track.icon || "#icon-logo-bold");
    programName.textContent = track.name;
    collegeName.textContent = college.name;
    why.textContent = track.why;
    note.textContent = track.note;
    heading.innerHTML = track.heading;
    intro.textContent = track.intro;
    index.textContent = "01";

    dialog.showModal();
    document.body.classList.add("has-dialog");
  };

  const closeDialog = () => dialog.close();

  closeButton.addEventListener("click", closeDialog);
  backButton.addEventListener("click", closeDialog);

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog();
  });

  dialog.addEventListener("close", () => {
    document.body.classList.remove("has-dialog");
    if (lastTrigger && typeof lastTrigger.focus === "function") {
      lastTrigger.focus();
    }
  });
})();
