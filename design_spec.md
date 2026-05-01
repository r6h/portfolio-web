# DESIGN SPECIFICATION: "THE FLUID BLUEPRINT"
**Project:** Roger Kernel - Portfolio
**Role:** Software Engineer (Systems & Security)
**Art Direction:** Kinetic Editorial / Technical High-End

---

## 1. CORE PHILOSOPHY
The portfolio is designed as a "Fluid Blueprint"—a highly structured technical document that reacts physically to the user. It is 100% information-dense, but uses fluid math (WebGL) and kinetic typography (GSAP) to make reading the information feel like interacting with a premium, high-end application. It balances brutalist engineering aesthetics with award-winning creative motion.

---

## 2. TECH STACK
- **Framework:** Nuxt 3 (Vue.js ecosystem) for SSR, routing, and native `<Transition>` support.
- **Styling:** Tailwind CSS for strict 12-column grid adherence and utility-class styling.
- **Scroll Engine:** Lenis for buttery-smooth, inertia-based scrolling (essential for kinetic effects).
- **Animation:** GSAP (GreenSock) + ScrollTrigger for scroll-velocity math, text reveals, and pinning.
- **WebGL / Shaders:** TresJS (or OGL via Vue wrapper) strictly for applying fluid/glitch shaders to project images on hover.

---

## 3. DESIGN SYSTEM

### 3.1. Color Palette
- **Background:** Jet Black (`#050505`) – Creates infinite depth.
- **Primary Text:** Off-White (`#EDEDED`) – High readability for long-form text.
- **Secondary Text/Borders:** Deep Grey (`#333333` to `#555555`) – For grid lines and subtext.
- **Interactive Accent:** Electric Cyan (`#00F0FF`) OR Acid Green (`#CCFF00`) – Used *exclusively* for the custom cursor, active filters, and WebGL highlight states.

### 3.2. Typography
- **Display/Headers:** *Satoshi* or *Clash Display* (Sans-serif, geometric, bold). Used for massive section titles and the Hero name.
- **Body/Technical Data:** *Geist Mono* or *JetBrains Mono*. Used for the "Stack" lists, descriptions, problem/solution grids, and navigation.

### 3.3. Global UI Elements
- **Custom Cursor:** A small neon dot (`4px`). On hover of text, it uses CSS `mix-blend-mode: difference`. On hover of a project link/image, it expands to `60px` with the word "VIEW" or "DECRYPT" inside.
- **Navigation:** Sticky top-bar, hidden on scroll-down, revealed on scroll-up.
  - *Left:* `RK` (Logo)
  - *Right:* `[Work]` `[Security]` `[Contact]` (Monospace)
- **Grid:** Visible 1px border lines (`border-gray-800`) framing major sections to emphasize "Structure".

---

## 4. SECTION-BY-SECTION BLUEPRINT & COPYWRITE

### SECTION 1 & 2: HERO & SHORT INTRO
**Layout:** Full viewport height (`100vh`). Massive typography.
**Interaction:** 
- **Scroll-Velocity Distortion:** The massive "ROGER KERNEL" text bends and slants slightly depending on how fast the user scrolls down (GSAP + Lenis velocity tracking).
- **Mask Reveal:** The intro text reveals itself line-by-line sliding up from invisible overflow masks.

**Copywrite:**
> **[Display Title]**
> ROGER KERNEL
> 
> **[Monospace Subtitle]**
> Software Engineer focused on Systems and Security
> 
> **[Body Block]**
> I design and build complex software systems, and understand how they break before others do.
> 
> **[Primary Actions - Outlined Buttons]**
> [ View Work ]  [ Contact ]
> 
> **[Short Intro - Revealed on initial scroll]**
> I am a software engineer with experience across systems programming, backend development, and applied security. 
> My work ranges from low-level tooling (parsers, virtual machines, CLI/TUI tools) to production-oriented systems (B2B platforms, microservices, data pipelines), as well as security research and analysis.
> I focus on building software that is not only functional, but understandable, scalable, and resilient.

---

### SECTION 3: FEATURED WORK
**Layout:** Pinned Horizontal Scroll. The vertical scroll locks, and the user scrolls left-to-right through 4 massive project cards.
**Interaction:** WebGL Fluid Image Shader. When the custom cursor hovers over the project image, it ripples like liquid or exhibits a subtle RGB-split glitch.

**Copywrite (Per Card):**

**Card 1:**
> **Title:** Fleet Management Platform (B2B)
> **Stack:** `[Laravel, Vue, Python, MongoDB, REST APIs]`
> **Problem:** Companies operating fleets lack centralized visibility and control over their vehicles and telemetry data.
> **Solution:** I built a multi-tenant system combining a Laravel backend for core business logic, a Vue-based frontend for operational control, and Python microservices for device communication and data processing.
> **Impact:**
> - Real-time monitoring capabilities
> - Scalable architecture for multiple clients
> - Clear separation between data ingestion and business logic

**Card 2:**
> **Title:** RAG Chatbot Engine (No External Libraries)
> **Stack:** `[Python, TypeScript, vector database concepts]`
> **Problem:** Most chatbot systems rely heavily on external frameworks, limiting control and understanding of internal behavior.
> **Solution:** I implemented a custom retrieval pipeline, a vector-based similarity system (Sørensen–Dice), and backend services to integrate and serve responses.
> **Impact:**
> - Full control over retrieval logic
> - Deep understanding of RAG internals
> - Adaptable to sensitive environments

**Card 3:**
> **Title:** Threat Intelligence Graph System
> **Stack:** `[Python, data processing, graph modeling]`
> **Problem:** Security information is fragmented and difficult to correlate manually.
> **Solution:** Crawled multiple sources of threat intelligence, processed and normalized content, and built a graph structure linking related events.
> **Impact:**
> - Automated pattern detection
> - Improved situational awareness
> - Foundation for intelligence analysis tools

**Card 4:**
> **Title:** Markdown Parser (C++)
> **Stack:** `[C++17]`
> **Problem:** Most developers use existing libraries without understanding how parsing systems actually work.
> **Solution:** Built a tokenizer, designed an AST structure, and implemented rendering logic to HTML.
> **Impact:**
> - Demonstrates understanding of language processing
> - Shows ability to design structured systems from first principles

---

### SECTION 4: ALL PROJECTS (THE FLUID FILTER)
**Layout:** A tabular data list with large filter headers at the top.
**Interaction:** Vue `<TransitionGroup>`. When a filter is clicked, non-matching rows shrink and fade (GSAP scale down), while matching rows instantly and smoothly glide into the newly collapsed space.

**Filters:** `[ ALL ]` `[ SYSTEMS / LOW-LEVEL ]` `[ BUSINESS ]` `[ SECURITY ]` `[ DATA / AI ]`

**Copywrite (Row Format: Title | Description):**
> - **Markdown Parser (C++)** | A custom parsing engine implementing tokenizer, AST, and rendering pipeline.
> - **Virtual Machine Experiments** | Exploration of instruction sets and execution models through a custom stack-based VM.
> - **CLI / TUI Tools** | Terminal-based tools designed for performance, automation, and data interaction.
> - **Fleet Management Platform** | B2B system for real-time fleet monitoring and control.
> - **Desmodus Landing** | Product concept and deployed landing page for a software analysis and security platform.
> - **Bug Bounty Research** | Identified vulnerabilities in real-world systems, including RCE scenarios.
> - **Writeups** | Detailed analyses of exploitation processes and system weaknesses.
> - **Threat Intelligence Graph** | Automated system for correlating cybersecurity events.
> - **Quant Trading Bot** | A system that analyzes market data and executes decision-making strategies using ML.
> - **RAG Chatbot Engine** | Custom-built retrieval-augmented system for contextual responses.
> - **TCG Market Terminal (TUI)** | A terminal-based system for analyzing trading card markets, including pricing.

---

### SECTION 5: SELECTED CASE STUDIES (SECURITY)
**Layout:** Editorial blockquote/report format. Deep contrast.
**Interaction:** Decrypt Reveal. As the section enters the viewport, the headers rapidly scramble with hex/ASCII characters before resolving into English (e.g., `0x4A... -> Remote Code Execution`).

**Copywrite:**
> **Remote Code Execution Vulnerability**
> **Summary:** Discovered a vulnerability allowing execution of arbitrary code within an application context.
> **Impact:** An attacker could gain control over the application and compromise user environments.
> **Approach:**
> - Identified attack surface
> - Developed proof-of-concept exploit
> - Reported findings responsibly
> **Outcome:** Official recognition through a vulnerability disclosure program.
> **More Details:** [ Link to full writeup ↗ ]

---

### SECTION 6 & 7: WORK APPROACH & PROOF OF WORK
**Layout:** 50/50 Split Screen.
**Interaction:** Parallax scroll. The Proof of Work column scrolls slightly faster on the Y-axis than the Work Approach column, creating structural depth.

**Copywrite (Left Column - Work Approach):**
> **WORK APPROACH**
> I approach software from both a construction and analysis perspective:
> - I build systems from first principles
> - I analyze how systems fail or can be exploited
> - I prioritize clarity, structure, and long-term maintainability

**Copywrite (Right Column - Proof of Work):**
> **PROOF OF WORK**
> - eWPTX Certification
> - Bug bounty recognition (including NASA VDP)
> - Technical blog with writeups and research
> - Active GitHub with ongoing projects

---

### SECTION 8: CONTACT (FOOTER)
**Layout:** Massive bottom section.
**Interaction:** Magnetic target. The email link is huge; as the cursor gets near it, the cursor snaps to the center of the text, and the text follows the mouse movement slightly before springing back.

**Copywrite:**
> **OPEN TO:**
> - Freelance projects
> - Backend / systems roles
> - Security-related work
> 
> **[Giant Magnetic Links]**
> EMAIL / LINKEDIN / GITHUB
> 
> *(Small footer text)*: (c) ROGER KERNEL // BUILT FROM FIRST PRINCIPLES