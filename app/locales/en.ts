export default {
  app: {
    loaderTitle: "[ System Boot / Asset Preload ]",
    loading: "Loading",
    cursorView: "VIEW",
    nav: {
      work: "[Work]",
      security: "[Security]",
      contact: "[Contact]",
    },
    languageSwitcher: {
      label: "[ Locale ]",
      english: "EN",
      spanish: "ES",
    },
    languagePrompt: {
      eyebrow: "[ Locale Suggestion ]",
      title: "Switch to Spanish?",
      body: "Your browser is set to Spanish. You can keep the site in English or switch the interface to Spanish now.",
      confirm: "Use Spanish",
      dismiss: "Keep English",
    },
  },
  hero: {
    eyebrow: "[ Systems / Security / Web ]",
    role: "Software Engineer focused on Systems and Security",
    intro:
      "I design and build complex software systems, and understand how they break before others do.",
    ctaShowcase: "View Showcase",
    ctaContact: "Contact",
  },
  intro: {
    eyebrow: "[ 00 / Operating Model ]",
    line1: "I am a software engineer with experience across",
    line1Accent1: "systems programming",
    line1Accent2: "web development",
    line1Join: "and",
    line1Accent3: "applied security",
    line2:
      "My work ranges from parsers, virtual machines, and terminal tools to",
    line2Highlight:
      "production systems, microservices, data pipelines, and security research.",
    line3: "I build software that is",
    line3Highlight: "functional, understandable, scalable, and resilient.",
  },
  showcase: {
    eyebrow: "[ 01 / Project Showcase ]",
    title: "Showcase",
    description:
      "Scroll sideways through selected work. Expand the full index after the carousel.",
    filters: {
      all: "ALL",
      systems: "SYSTEMS / LOW-LEVEL",
      business: "BUSINESS",
      security: "SECURITY",
      dataAi: "DATA / AI",
    },
    trackLabels: {
      all: "the full index",
      systems: "systems / low-level",
      business: "business",
      security: "security",
      dataAi: "data / ai",
    },
    featuredLabel: "Featured",
    skip: "[ Skip Showcase ]",
    continueBelow: "[ Continue Below ]",
    track: "Track",
    stack: "Stack",
    reference: "Reference",
    role: "Role",
    focus: "Focus",
    placeholder: "[ Project visual placeholder ]",
    indexCount: "{count} projects in {track}",
    indexDescription:
      "Finished the showcase? Expand the complete list here without interrupting the main gallery flow.",
    collapse: "Collapse Full Index",
    seeAll: "See All Work",
    fullIndex: "the full index",
  },
  security: {
    eyebrow: "[ 02 / Security Case ]",
    badge: "Private Vulnerability Disclosure Program",
    title: "Remote Code Execution Vulnerability",
    vector: "Vector",
    target: "Target",
    targetValue: "NASA private vulnerability disclosure surface",
    class: "Class",
    classValue: "Remote code execution in application context",
    recognition: "Recognition",
    recognitionValue:
      "Reported through the private program and acknowledged in the NASA Hall of Fame.",
    body: "I traced an input path that crossed a trust boundary, reduced it to a reproducible execution primitive, and packaged the finding in a way that made root cause, impact, and remediation path immediately defensible.",
    method: "Method",
    outcome: "Outcome",
    methodItem1:
      "/ Enumerated exposed handlers and mapped where user-controlled data entered execution flow.",
    methodItem2:
      "/ Reduced the issue to a minimal proof-of-concept so the exploit path was precise, not anecdotal.",
    outcomeItem1:
      "/ Confirmed the blast radius in a bounded environment and documented realistic attacker impact.",
    outcomeItem2:
      "/ Delivered the report through NASA's private program and received public Hall of Fame recognition after disclosure.",
    trace1: "Attack surface mapping",
    trace2: "Exploit path reduction",
    trace3: "Disclosure and recognition",
    fullWriteup: "Link to full writeup ↗",
  },
  approach: {
    eyebrow: "[ 03 / Work Approach ]",
    title: {
      line1: "Build",
      line2: "Break",
      line3: "Harden",
    },
    rail1: "Construct",
    rail2: "Stress",
    rail3: "Verify",
    build: {
      title: "Build",
      body: "Design the smallest understandable system that can carry the real workload.",
    },
    break: {
      title: "Break",
      body: "Interrogate assumptions, abuse boundaries, and look for failure modes early.",
    },
    harden: {
      title: "Harden",
      body: "Document constraints, reduce ambiguity, and leave the system easier to operate.",
    },
    proofs: {
      cert: "eWPTX Certification",
      nasa: "NASA VDP Recognition",
      writeups: "Technical Writeups",
      github: "Active GitHub Projects",
    },
  },
    contact: {
      eyebrow: "[ Availability ]",
      status: "Currently Open",
      statusBody:
        "Taking on work where system behavior, failure modes, and delivery quality matter.",
    card1: "Freelance projects",
    card2: "Backend and systems roles",
    card3: "Security-related work",
      titleLead: "SEND THE",
      titleAccent: "PROBLEM",
      titlePunct: ",",
      titleTail: "CONSTRAINTS",
      subtitle: "and the failure mode you care about.",
      links: {
        email: "Email",
        github: "GitHub",
      },
    form: {
      name: "Name",
      email: "Email",
      projectType: "Project Type",
      inquiry: "Inquiry",
      submit: "Transmit Inquiry",
      sending: "Saving Inquiry...",
      placeholder:
        "Describe the system, constraints, timeline, and what can fail.",
      types: {
        backend: "Backend / systems build",
        security: "Security review",
        prototype: "Technical prototype",
        other: "Other inquiry",
      },
      status: {
        success: "Message received. I’ll review it soon.",
        error: "Could not save the inquiry. Try again in a moment.",
      },
    },
    mail: {
      subjectPrefix: "Portfolio inquiry",
      name: "Name",
      email: "Email",
      type: "Type",
    },
    footer: "(c) Roger Kernel // Built from first principles",
  },
  projects: {
    fleetManagement: {
      title: "Fleet Management Platform",
      signal: "TELEMETRY LOCK",
      module: "FleetOps / Live Ingest",
      metric: "Multi-tenant",
      caption: "Vehicle signals normalized into operational control surfaces.",
      description: "B2B system for real-time fleet monitoring and control.",
      role: "Full-stack product and systems implementation.",
      focus: "Operations, telemetry flow, and multi-tenant control surfaces.",
    },
    ragChatbot: {
      title: "RAG Chatbot Engine",
      signal: "VECTOR MATCH",
      module: "Retrieval / No Framework",
      metric: "Custom Dice",
      caption:
        "Retrieval behavior made inspectable without external orchestration frameworks.",
      description:
        "Custom-built retrieval-augmented system for contextual responses.",
      role: "From-scratch retrieval and serving pipeline.",
      focus:
        "Matching logic visibility and sensitive-environment adaptability.",
      svgLabel: "RAG retrieval graph",
      svgFooter: "CUSTOM RETRIEVAL PIPELINE / SORENSEN-DICE MATCHING",
    },
    threatIntel: {
      title: "Threat Intelligence Graph",
      signal: "CORRELATION",
      module: "Intel / Entity Links",
      metric: "Graph model",
      caption:
        "Fragmented security events connected into a navigable relationship graph.",
      description: "Automated system for correlating cybersecurity events.",
      role: "Collection, normalization, and graph modeling.",
      focus: "Pattern detection, event linkage, and analyst context.",
    },
    markdownParser: {
      title: "Markdown Parser",
      signal: "AST RENDER",
      module: "Parser / C++17",
      metric: "From scratch",
      caption:
        "Tokenizer, syntax tree, and renderer designed as one controlled pipeline.",
      description:
        "A custom parsing engine implementing tokenizer, AST, and rendering pipeline.",
      role: "Low-level language tooling from first principles.",
      focus: "Parsing internals, structure, and rendering flow.",
      indexTitle: "Markdown Parser (C++)",
    },
    vmExperiments: {
      title: "Virtual Machine Experiments",
      signal: "STACK MODEL",
      module: "Execution / VM",
      metric: "Instruction sets",
      caption:
        "Execution-model experiments around custom stack-based runtimes.",
      description:
        "Exploration of instruction sets and execution models through a custom stack-based VM.",
      role: "Runtime and instruction-set experimentation.",
      focus: "Execution flow, architecture tradeoffs, and low-level behavior.",
    },
    cliTui: {
      title: "CLI / TUI Tools",
      signal: "TERMINAL SURFACE",
      module: "CLI / TUI",
      metric: "Operator tools",
      caption:
        "Terminal-first tooling designed for speed, automation, and dense interaction.",
      description:
        "Terminal-based tools designed for performance, automation, and data interaction.",
      role: "Utility design and workflow acceleration.",
      focus: "Speed, ergonomics, and practical operator interfaces.",
    },
    desmodus: {
      title: "Desmodus Landing",
      signal: "POSITIONING",
      module: "Concept / Launch",
      metric: "Deployed",
      caption:
        "A deployed landing page for a software analysis and security platform concept.",
      description:
        "Product concept and deployed landing page for a software analysis and security platform.",
      role: "Product framing and frontend execution.",
      focus: "Narrative clarity, positioning, and shipping a public surface.",
    },
    bugBounty: {
      title: "Bug Bounty Research",
      signal: "ATTACK SURFACE",
      module: "Research / Findings",
      metric: "Real targets",
      caption:
        "Real-world vulnerability research with exploitable impact and responsible disclosure.",
      description:
        "Identified vulnerabilities in real-world systems, including RCE scenarios.",
      role: "Offensive analysis and disclosure work.",
      focus: "Attack surface mapping, exploitability, and reporting quality.",
    },
    writeups: {
      title: "Writeups",
      signal: "POSTMORTEM",
      module: "Research / Notes",
      metric: "Technical detail",
      caption:
        "Detailed writeups explaining the path from weakness to verified impact.",
      description:
        "Detailed analyses of exploitation processes and system weaknesses.",
      role: "Technical documentation and research communication.",
      focus: "Clarity, reproducibility, and depth of explanation.",
    },
    quantBot: {
      title: "Quant Trading Bot",
      signal: "MODEL LOOP",
      module: "Markets / Automation",
      metric: "Decision systems",
      caption:
        "Automated decision flow over market data and model-driven strategies.",
      description:
        "A system that analyzes market data and executes decision-making strategies using ML.",
      role: "Signal processing and strategy automation.",
      focus: "Data ingestion, decision loops, and execution logic.",
    },
    tcgTerminal: {
      title: "TCG Market Terminal (TUI)",
      signal: "MARKET READOUT",
      module: "Terminal / Markets",
      metric: "Pricing",
      caption:
        "Terminal-based market inspection for pricing, trends, and trading signals.",
      description:
        "A terminal-based system for analyzing trading card markets, including pricing and trends.",
      role: "Specialized data terminal design.",
      focus: "Market visibility and operator-speed interaction.",
    },
  },
} as const;
