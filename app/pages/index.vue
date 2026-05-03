<template>
  <div class="relative w-full overflow-hidden">
    <section
      ref="heroSection"
      id="top"
      class="blueprint-section hero-shell relative flex min-h-svh w-full items-end overflow-hidden border-b border-border px-5 pb-10 pt-28 md:px-12 md:pb-14"
    >
      <canvas ref="heroCanvas" class="hero-canvas absolute inset-0" aria-hidden="true" />
      <div class="hero-haze hero-haze-left absolute z-[1] pointer-events-none" aria-hidden="true" />
      <div class="hero-haze hero-haze-right absolute z-[1] pointer-events-none" aria-hidden="true" />

      <div class="relative z-10 grid w-full grid-cols-12 gap-4">
        <div class="col-span-12">
          <p class="mb-5 font-mono text-xs uppercase tracking-[0.32em] text-accent md:text-sm">
            [ Systems / Security / Backend ]
          </p>
          <h1
            class="hero-title max-w-[15ch] text-[18vw] font-black uppercase leading-[0.76] tracking-[-0.085em] text-primary md:text-[12.4vw]"
          >
            <span class="hero-type-line hero-type-roger">
              <span class="hero-type-text">{{ typedHero.roger }}</span>
            </span>
            <span class="hero-type-line hero-type-kernel">
              <span class="hero-type-text hero-kernel-text">
                {{ typedHero.kernel }}<span class="hero-cursor" aria-hidden="true" />
              </span>
            </span>
          </h1>
        </div>

        <div
          class="col-span-12 mt-8 border-t border-border pt-5 md:col-span-5 md:mt-10"
        >
          <p class="font-mono text-xs uppercase leading-relaxed tracking-[0.16em] text-secondary md:whitespace-nowrap md:text-[0.73rem] md:leading-none md:tracking-[0.24em]">
            Software Engineer focused on Systems and Security
          </p>
        </div>

        <div class="col-span-12 mt-4 md:col-span-5 md:col-start-8 md:mt-10">
          <p class="max-w-xl text-xl leading-snug text-primary md:text-3xl">
            I design and build complex software systems, and understand how they break before others do.
          </p>
          <div class="mt-8 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.22em]">
            <a class="blueprint-button" href="#work">View Showcase</a>
            <a class="blueprint-button blueprint-button-accent" href="#contact">Contact</a>
          </div>
        </div>
      </div>
    </section>

    <section class="intro-section blueprint-section border-b border-border px-5 py-24 md:px-12 md:py-36">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-3">
          <p class="font-mono text-xs uppercase tracking-[0.28em] text-secondary">
            [ 00 / Operating Model ]
          </p>
          <SeraphimStage class="mt-8" />
        </div>
        <div
          class="col-span-12 space-y-8 text-2xl leading-tight text-primary md:col-span-8 md:col-start-5 md:text-5xl"
        >
          <div class="overflow-hidden">
            <p class="intro-text will-change-transform">
              I am a software engineer with experience across
              <span class="text-accent">systems programming</span>,
              <span class="text-accent">backend development</span>, and
              <span class="text-accent">applied security</span>.
            </p>
          </div>
          <div class="overflow-hidden">
            <p class="intro-text text-secondary will-change-transform">
              My work ranges from parsers, virtual machines, and terminal tools to
              <span class="intro-mark">production systems, microservices, data pipelines, and security research.</span>
            </p>
          </div>
          <div class="overflow-hidden">
            <p class="intro-text will-change-transform">
              I build software that is
              <span class="intro-mark">functional, understandable, scalable, and resilient.</span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section
      id="work"
      ref="showcaseSection"
      class="featured-section blueprint-section relative border-b border-border bg-background px-5 py-20 md:px-12 md:py-28"
    >
      <div ref="showcasePinStage" class="showcase-pin-stage">
        <div class="mb-8 grid grid-cols-12 gap-4">
          <div class="col-span-12 md:col-span-4">
            <p class="font-mono text-xs uppercase tracking-[0.28em] text-secondary">[ 01 / Project Showcase ]</p>
            <h2 class="mt-5 text-5xl font-black uppercase leading-none tracking-[-0.06em] md:text-7xl">
              Showcase
            </h2>
          </div>
          <div class="col-span-12 self-end md:col-span-8">
            <p class="mb-5 max-w-xl font-mono text-xs uppercase leading-relaxed tracking-[0.18em] text-secondary">
              Scroll to move sideways through selected work. Expand the full index only after the carousel.
            </p>
            <div class="showcase-filter-rail sticky top-16 z-20 flex flex-wrap items-center gap-2 bg-background/90 py-3 backdrop-blur">
              <button
                v-for="filter in filters"
                :key="`showcase-${filter}`"
                type="button"
                class="filter-button"
                :class="{ 'filter-button-active': showcaseFilter === filter }"
                @click="setShowcaseFilter(filter)"
              >
                [ {{ filter }} ]
              </button>
              <button
                type="button"
                class="showcase-skip-button md:ml-auto"
                @click="skipShowcase"
              >
                [ Skip Showcase ]
              </button>
            </div>
          </div>
        </div>

        <div ref="showcaseViewport" class="showcase-viewport">
          <div
            ref="showcaseScroller"
            class="featured-track flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 md:overflow-visible"
          >
            <article
              v-for="(project, index) in filteredFeaturedProjects"
              :key="project.title"
              class="featured-card showcase-card grid min-h-[760px] w-[86vw] max-w-[1280px] shrink-0 snap-start grid-cols-12 content-center gap-4 border border-border bg-background px-5 py-10 md:w-[calc(100vw-8rem)] md:px-8 lg:px-10"
            >
              <div class="col-span-12 mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-[0.28em] text-secondary">
                <span>[ Featured {{ String(index + 1).padStart(2, "0") }} ]</span>
                <span class="hidden text-accent md:block">{{ project.signal }}</span>
              </div>

              <div class="col-span-12 md:col-span-6 lg:col-span-7">
                <div
                  class="project-visual group relative h-[44vh] min-h-72 overflow-hidden border border-border"
                  :class="project.visual"
                >
                  <template v-if="project.title === 'RAG Chatbot Engine'">
                    <svg class="rag-svg" viewBox="0 0 900 520" role="img" aria-label="RAG retrieval graph">
                      <defs>
                        <linearGradient id="ragLine" x1="0" x2="1">
                          <stop offset="0%" stop-color="#ccff00" stop-opacity="0.95" />
                          <stop offset="100%" stop-color="#00f0ff" stop-opacity="0.75" />
                        </linearGradient>
                        <filter id="ragGlow">
                          <feGaussianBlur stdDeviation="4" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                      <g class="rag-grid">
                        <path v-for="x in [80, 180, 280, 380, 480, 580, 680, 780]" :key="`x-${x}`" :d="`M${x} 30V490`" />
                        <path v-for="y in [70, 150, 230, 310, 390, 470]" :key="`y-${y}`" :d="`M40 ${y}H860`" />
                      </g>
                      <g class="rag-links" filter="url(#ragGlow)">
                        <path d="M135 126 C260 80 340 168 438 214 S650 302 744 230" />
                        <path d="M156 374 C260 330 330 360 438 214 S612 130 770 132" />
                        <path d="M438 214 C432 300 482 356 612 396" />
                      </g>
                      <g class="rag-node rag-query">
                        <circle cx="135" cy="126" r="34" />
                        <text x="135" y="132">Q</text>
                      </g>
                      <g class="rag-node">
                        <circle cx="438" cy="214" r="48" />
                        <text x="438" y="220">V</text>
                      </g>
                      <g class="rag-node">
                        <circle cx="744" cy="230" r="30" />
                        <text x="744" y="236">D1</text>
                      </g>
                      <g class="rag-node">
                        <circle cx="156" cy="374" r="26" />
                        <text x="156" y="380">D2</text>
                      </g>
                      <g class="rag-node">
                        <circle cx="770" cy="132" r="26" />
                        <text x="770" y="138">D3</text>
                      </g>
                      <g class="rag-node">
                        <circle cx="612" cy="396" r="26" />
                        <text x="612" y="402">A</text>
                      </g>
                      <text class="rag-label" x="64" y="468">CUSTOM RETRIEVAL PIPELINE / SORENSEN-DICE MATCHING</text>
                    </svg>
                  </template>
                  <template v-else>
                    <div class="visual-placeholder absolute inset-0 flex flex-col justify-between p-5 font-mono uppercase tracking-[0.24em]">
                      <div class="flex justify-between border-b border-border pb-3 text-[10px] text-secondary">
                        <span>{{ project.module }}</span>
                        <span>{{ project.metric }}</span>
                      </div>
                      <div class="text-sm text-primary">[ Project visual placeholder ]</div>
                      <div class="text-[10px] leading-relaxed text-secondary">{{ project.caption }}</div>
                    </div>
                  </template>
                </div>
              </div>

              <div class="col-span-12 flex flex-col justify-end md:col-span-6 lg:col-span-5">
                <h2 class="max-w-[12ch] text-4xl font-black uppercase leading-none tracking-[-0.055em] md:text-6xl">
                  {{ project.title }}
                </h2>
                <div class="mt-5 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.16em]">
                  <span class="border border-border px-3 py-2 text-secondary">Track: {{ project.category }}</span>
                  <span v-if="project.stack" class="border border-border px-3 py-2 text-accent">Stack: {{ project.stack }}</span>
                </div>

                <p class="mt-8 max-w-xl text-lg leading-relaxed text-primary/88 md:text-xl">
                  {{ project.description }}
                </p>

                <div class="mt-10 grid gap-7 font-mono text-xs leading-relaxed text-primary/85 md:grid-cols-2">
                  <div>
                    <span class="mb-3 block border-b border-border pb-2 uppercase tracking-[0.22em] text-secondary">Role</span>
                    <p>{{ project.role }}</p>
                  </div>
                  <div>
                    <span class="mb-3 block border-b border-border pb-2 uppercase tracking-[0.22em] text-secondary">Focus</span>
                    <p>{{ project.focus }}</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div class="mt-5 flex items-center justify-end gap-4">
          <button type="button" class="showcase-skip-button" @click="skipShowcase">
            [ Continue Below ]
          </button>
        </div>
      </div>

      <div id="work-index" ref="showcaseAfter" class="showcase-more-panel mt-10 border border-border">
        <div class="grid gap-6 p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:p-7">
          <div>
            <p class="font-mono text-[10px] uppercase tracking-[0.24em] text-secondary">
              {{ filteredProjects.length }} projects in {{ showcaseFilter === "ALL" ? "the full index" : `${showcaseFilter.toLowerCase()} track` }}
            </p>
            <p class="mt-3 max-w-2xl text-lg leading-relaxed text-primary md:text-2xl">
              Finished the showcase? Expand the complete list here without interrupting the main gallery flow.
            </p>
          </div>
          <button
            type="button"
            class="blueprint-button justify-center md:min-w-56"
            @click="isAllWorkExpanded = !isAllWorkExpanded"
          >
            {{ isAllWorkExpanded ? "Collapse Full Index" : "See All Work" }}
          </button>
        </div>

        <Transition name="index-reveal">
          <div v-if="isAllWorkExpanded" class="border-t border-border px-5 pb-5 md:px-7 md:pb-7">
            <div class="showcase-index-list">
              <a
                v-for="project in filteredProjects"
                :key="project.title"
                href="#contact"
                class="showcase-index-row group grid grid-cols-12 gap-4 border-b border-border py-5 transition-colors hover:bg-accent hover:text-background"
              >
                <span class="col-span-12 text-2xl font-black uppercase tracking-[-0.035em] md:col-span-4">
                  {{ project.title }}
                </span>
                <span class="col-span-12 font-mono text-sm leading-relaxed text-secondary transition-colors group-hover:text-background md:col-span-7">
                  {{ project.description }}
                </span>
                <span class="col-span-12 text-right font-mono text-xs uppercase tracking-[0.24em] md:col-span-1">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </Transition>
      </div>
    </section>

    <section
      id="security"
      class="case-section blueprint-section security-section relative overflow-hidden border-b border-border px-5 py-24 md:px-12 md:py-36"
    >
      <div class="security-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div class="relative z-10 grid grid-cols-12 gap-4">
        <p class="col-span-12 font-mono text-xs uppercase tracking-[0.28em] text-secondary md:col-span-3">
          [ 02 / Security Case ]
        </p>
        <div class="col-span-12 md:col-span-8 md:col-start-5">
          <div class="mb-8 inline-flex border border-accent/50 px-4 py-2 font-mono text-xs uppercase tracking-[0.28em] text-accent">
            Private Vulnerability Disclosure Program
          </div>
          <h2 class="decrypt-title text-5xl font-black uppercase leading-none tracking-[-0.06em] text-primary md:text-8xl">
            Remote Code Execution Vulnerability
          </h2>
          <div class="security-panel mt-12 border border-border">
            <div class="grid gap-0 md:grid-cols-12">
              <aside class="border-b border-border p-5 md:col-span-4 md:border-b-0 md:border-r">
                <p class="mb-6 font-mono text-xs uppercase tracking-[0.24em] text-secondary">Vector</p>
                <dl class="space-y-5 font-mono text-sm leading-relaxed text-primary/85">
                  <div>
                    <dt class="text-[10px] uppercase tracking-[0.22em] text-secondary">Target</dt>
                    <dd>NASA private vulnerability disclosure surface</dd>
                  </div>
                  <div>
                    <dt class="text-[10px] uppercase tracking-[0.22em] text-secondary">Class</dt>
                    <dd>Remote code execution in application context</dd>
                  </div>
                  <div>
                    <dt class="text-[10px] uppercase tracking-[0.22em] text-secondary">Recognition</dt>
                    <dd>Reported through the private program and acknowledged in the NASA Hall of Fame.</dd>
                  </div>
                </dl>
              </aside>
              <div class="p-5 md:col-span-8">
                <p class="max-w-3xl text-lg leading-relaxed text-primary">
                  I traced an input path that crossed a trust boundary, reduced it to a reproducible execution primitive, and packaged the finding in a way that made root cause, impact, and remediation path immediately defensible.
                </p>
                <div class="mt-8 grid gap-8 md:grid-cols-2">
                  <div>
                    <p class="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-accent">Method</p>
                    <ul class="space-y-3 font-mono text-sm leading-relaxed text-primary/85">
                      <li>/ Enumerated exposed handlers and mapped where user-controlled data entered execution flow.</li>
                      <li>/ Reduced the issue to a minimal proof-of-concept so the exploit path was precise, not anecdotal.</li>
                    </ul>
                  </div>
                  <div>
                    <p class="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-accent">Outcome</p>
                    <ul class="space-y-3 font-mono text-sm leading-relaxed text-primary/85">
                      <li>/ Confirmed the blast radius in a bounded environment and documented realistic attacker impact.</li>
                      <li>/ Delivered the report through NASA's private program and received public Hall of Fame recognition after disclosure.</li>
                    </ul>
                  </div>
                </div>
                <div class="security-trace mt-8 grid gap-4 md:grid-cols-3">
                  <div class="security-trace-cell">
                    <span>01</span>
                    <p>Attack surface mapping</p>
                  </div>
                  <div class="security-trace-cell">
                    <span>02</span>
                    <p>Exploit path reduction</p>
                  </div>
                  <div class="security-trace-cell">
                    <span>03</span>
                    <p>Disclosure and recognition</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a class="mt-8 inline-flex font-mono text-xs uppercase tracking-[0.26em] text-accent hover:text-primary" href="#contact">
            Link to full writeup ↗
          </a>
        </div>
      </div>
    </section>

    <section class="approach-section blueprint-section border-b border-border px-5 py-20 md:px-12 md:py-28">
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-5">
          <p class="font-mono text-xs uppercase tracking-[0.28em] text-secondary">[ 03 / Work Approach ]</p>
          <h2 class="mt-6 text-6xl font-black uppercase leading-[0.82] tracking-[-0.065em] md:text-8xl">
            Build<br />Break<br />Harden
          </h2>
        </div>
        <div class="col-span-12 mt-10 md:col-span-7 md:mt-0">
          <div class="approach-machine">
            <div class="machine-rail">
              <span>Construct</span>
              <span>Stress</span>
              <span>Verify</span>
            </div>
            <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <div class="machine-cell">
                <span>Build</span>
                <p>Design the smallest understandable system that can carry the real workload.</p>
              </div>
              <div class="machine-cell machine-cell-accent">
                <span>Break</span>
                <p>Interrogate assumptions, abuse boundaries, and look for failure modes early.</p>
              </div>
              <div class="machine-cell md:col-span-2 xl:col-span-1">
                <span>Harden</span>
                <p>Document constraints, reduce ambiguity, and leave the system easier to operate.</p>
              </div>
            </div>
            <div class="mt-6 divide-y divide-border border-y border-border">
              <p v-for="proof in proofItems" :key="proof" class="py-5 font-mono text-sm uppercase tracking-[0.22em] text-primary">
                / {{ proof }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      id="contact"
      class="blueprint-section relative min-h-screen overflow-hidden px-5 py-20 md:px-12 md:py-28"
    >
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-3">
          <p class="font-mono text-xs uppercase tracking-[0.28em] text-secondary">[ Availability ]</p>
          <div class="availability-side mt-6">
            <span class="availability-status">Currently Open</span>
            <p class="mt-4 max-w-xs text-sm leading-relaxed text-primary/82">
              Taking on work where system behavior, failure modes, and delivery quality matter.
            </p>
          </div>
        </div>
        <div class="col-span-12 mt-16 md:col-span-8 md:col-start-5 md:mt-0">
          <div class="availability-grid mb-12 grid gap-3 md:grid-cols-3">
            <div class="availability-card">
              <span>01</span>
              <p>Freelance projects</p>
            </div>
            <div class="availability-card availability-card-accent">
              <span>02</span>
              <p>Backend and systems roles</p>
            </div>
            <div class="availability-card">
              <span>03</span>
              <p>Security-related work</p>
            </div>
          </div>
          <h2 class="max-w-4xl text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-primary md:text-6xl">
            SEND THE PROBLEM,<br class="hidden md:block" /> CONSTRAINTS
          </h2>
          <p class="mt-3 max-w-2xl font-mono text-sm tracking-[0.08em] text-secondary md:text-base">
            and the failure mode you care about.
          </p>
          <div ref="magneticLinks" class="mt-8 flex flex-wrap gap-3">
            <a
              v-for="link in contactLinks"
              :key="link.label"
              class="contact-link-button magnetic-link inline-flex items-center border border-border px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] text-primary transition-colors hover:border-accent hover:text-accent"
              :href="link.href"
            >
              {{ link.label }}
            </a>
          </div>
          <form class="inquiry-form mt-14 grid gap-3 font-mono" @submit.prevent="submitInquiry">
            <div class="grid gap-3 md:grid-cols-2">
              <label>
                <span>Name</span>
                <input v-model="inquiry.name" required type="text" autocomplete="name" />
              </label>
              <label>
                <span>Email</span>
                <input v-model="inquiry.email" required type="email" autocomplete="email" />
              </label>
            </div>
            <label>
              <span>Project Type</span>
              <select v-model="inquiry.type">
                <option>Backend / systems build</option>
                <option>Security review</option>
                <option>Technical prototype</option>
                <option>Other inquiry</option>
              </select>
            </label>
            <label>
              <span>Inquiry</span>
              <textarea v-model="inquiry.message" required rows="5" placeholder="Describe the system, constraints, timeline, and what can fail." />
            </label>
            <button class="inquiry-submit" type="submit">Transmit Inquiry</button>
          </form>
        </div>
      </div>
      <p class="absolute bottom-5 left-5 right-5 font-mono text-[10px] uppercase tracking-[0.24em] text-secondary md:left-12 md:right-12">
        (c) Roger Kernel // Built from first principles
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SeraphimStage from "~/components/SeraphimStage.client.vue";

const heroCanvas = ref<HTMLCanvasElement | null>(null);
const heroSection = ref<HTMLElement | null>(null);
const showcaseViewport = ref<HTMLElement | null>(null);
const showcaseScroller = ref<HTMLElement | null>(null);
const showcaseSection = ref<HTMLElement | null>(null);
const showcasePinStage = ref<HTMLElement | null>(null);
const showcaseAfter = ref<HTMLElement | null>(null);
const magneticLinks = ref<HTMLElement | null>(null);
const typedHero = reactive({
  roger: "",
  kernel: "",
});

const filters = ["ALL", "SYSTEMS / LOW-LEVEL", "BUSINESS", "SECURITY", "DATA / AI"];
const showcaseFilter = ref("ALL");
const isAllWorkExpanded = ref(false);

const showcaseProjects = [
  {
    title: "Fleet Management Platform",
    category: "BUSINESS",
    signal: "TELEMETRY LOCK",
    module: "FleetOps / Live Ingest",
    metric: "Multi-tenant",
    caption: "Vehicle signals normalized into operational control surfaces.",
    stack: "Laravel, Vue, Python, MongoDB, REST APIs",
    description: "B2B system for real-time fleet monitoring and control.",
    role: "Full-stack product and systems implementation.",
    focus: "Operations, telemetry flow, and multi-tenant control surfaces.",
    visual: "visual-placeholder-shell",
  },
  {
    title: "RAG Chatbot Engine",
    category: "DATA / AI",
    signal: "VECTOR MATCH",
    module: "Retrieval / No Framework",
    metric: "Custom Dice",
    caption: "Retrieval behavior made inspectable without external orchestration frameworks.",
    stack: "Python, TypeScript, vector database concepts",
    description: "Custom-built retrieval-augmented system for contextual responses.",
    role: "From-scratch retrieval and serving pipeline.",
    focus: "Matching logic visibility and sensitive-environment adaptability.",
    visual: "visual-rag",
  },
  {
    title: "Threat Intelligence Graph",
    category: "SECURITY",
    signal: "CORRELATION",
    module: "Intel / Entity Links",
    metric: "Graph model",
    caption: "Fragmented security events connected into a navigable relationship graph.",
    stack: "Python, data processing, graph modeling",
    description: "Automated system for correlating cybersecurity events.",
    role: "Collection, normalization, and graph modeling.",
    focus: "Pattern detection, event linkage, and analyst context.",
    visual: "visual-placeholder-shell",
  },
  {
    title: "Markdown Parser",
    category: "SYSTEMS / LOW-LEVEL",
    signal: "AST RENDER",
    module: "Parser / C++17",
    metric: "From scratch",
    caption: "Tokenizer, syntax tree, and renderer designed as one controlled pipeline.",
    stack: "C++17",
    description: "A custom parsing engine implementing tokenizer, AST, and rendering pipeline.",
    role: "Low-level language tooling from first principles.",
    focus: "Parsing internals, structure, and rendering flow.",
    visual: "visual-placeholder-shell",
  },
  {
    title: "Virtual Machine Experiments",
    category: "SYSTEMS / LOW-LEVEL",
    signal: "STACK MODEL",
    module: "Execution / VM",
    metric: "Instruction sets",
    caption: "Execution-model experiments around custom stack-based runtimes.",
    stack: "",
    description: "Exploration of instruction sets and execution models through a custom stack-based VM.",
    role: "Runtime and instruction-set experimentation.",
    focus: "Execution flow, architecture tradeoffs, and low-level behavior.",
    visual: "visual-placeholder-shell",
  },
  {
    title: "CLI / TUI Tools",
    category: "SYSTEMS / LOW-LEVEL",
    signal: "TERMINAL SURFACE",
    module: "CLI / TUI",
    metric: "Operator tools",
    caption: "Terminal-first tooling designed for speed, automation, and dense interaction.",
    stack: "",
    description: "Terminal-based tools designed for performance, automation, and data interaction.",
    role: "Utility design and workflow acceleration.",
    focus: "Speed, ergonomics, and practical operator interfaces.",
    visual: "visual-placeholder-shell",
  },
  {
    title: "Desmodus Landing",
    category: "BUSINESS",
    signal: "POSITIONING",
    module: "Concept / Launch",
    metric: "Deployed",
    caption: "A deployed landing page for a software analysis and security platform concept.",
    stack: "",
    description: "Product concept and deployed landing page for a software analysis and security platform.",
    role: "Product framing and frontend execution.",
    focus: "Narrative clarity, positioning, and shipping a public surface.",
    visual: "visual-placeholder-shell",
  },
  {
    title: "Bug Bounty Research",
    category: "SECURITY",
    signal: "ATTACK SURFACE",
    module: "Research / Findings",
    metric: "Real targets",
    caption: "Real-world vulnerability research with exploitable impact and responsible disclosure.",
    stack: "",
    description: "Identified vulnerabilities in real-world systems, including RCE scenarios.",
    role: "Offensive analysis and disclosure work.",
    focus: "Attack surface mapping, exploitability, and reporting quality.",
    visual: "visual-placeholder-shell",
  },
  {
    title: "Writeups",
    category: "SECURITY",
    signal: "POSTMORTEM",
    module: "Research / Notes",
    metric: "Technical detail",
    caption: "Detailed writeups explaining the path from weakness to verified impact.",
    stack: "",
    description: "Detailed analyses of exploitation processes and system weaknesses.",
    role: "Technical documentation and research communication.",
    focus: "Clarity, reproducibility, and depth of explanation.",
    visual: "visual-placeholder-shell",
  },
  {
    title: "Quant Trading Bot",
    category: "DATA / AI",
    signal: "MODEL LOOP",
    module: "Markets / Automation",
    metric: "Decision systems",
    caption: "Automated decision flow over market data and model-driven strategies.",
    stack: "",
    description: "A system that analyzes market data and executes decision-making strategies using ML.",
    role: "Signal processing and strategy automation.",
    focus: "Data ingestion, decision loops, and execution logic.",
    visual: "visual-placeholder-shell",
  },
  {
    title: "TCG Market Terminal (TUI)",
    category: "DATA / AI",
    signal: "MARKET READOUT",
    module: "Terminal / Markets",
    metric: "Pricing",
    caption: "Terminal-based market inspection for pricing, trends, and trading signals.",
    stack: "",
    description: "A terminal-based system for analyzing trading card markets, including pricing and trends.",
    role: "Specialized data terminal design.",
    focus: "Market visibility and operator-speed interaction.",
    visual: "visual-placeholder-shell",
  },
];

const proofItems = [
  "eWPTX Certification",
  "NASA VDP Recognition",
  "Technical Writeups",
  "Active GitHub Projects",
];

const allProjects = [
  { title: "Markdown Parser (C++)", category: "SYSTEMS / LOW-LEVEL", description: "A custom parsing engine implementing tokenizer, AST, and rendering pipeline." },
  { title: "Virtual Machine Experiments", category: "SYSTEMS / LOW-LEVEL", description: "Exploration of instruction sets and execution models through a custom stack-based VM." },
  { title: "CLI / TUI Tools", category: "SYSTEMS / LOW-LEVEL", description: "Terminal-based tools designed for performance, automation, and data interaction." },
  { title: "Fleet Management Platform", category: "BUSINESS", description: "B2B system for real-time fleet monitoring and control." },
  { title: "Desmodus Landing", category: "BUSINESS", description: "Product concept and deployed landing page for a software analysis and security platform." },
  { title: "Bug Bounty Research", category: "SECURITY", description: "Identified vulnerabilities in real-world systems, including RCE scenarios." },
  { title: "Writeups", category: "SECURITY", description: "Detailed analyses of exploitation processes and system weaknesses." },
  { title: "Threat Intelligence Graph", category: "SECURITY", description: "Automated system for correlating cybersecurity events." },
  { title: "Quant Trading Bot", category: "DATA / AI", description: "A system that analyzes market data and executes decision-making strategies using ML." },
  { title: "RAG Chatbot Engine", category: "DATA / AI", description: "Custom-built retrieval-augmented system for contextual responses." },
  { title: "TCG Market Terminal (TUI)", category: "DATA / AI", description: "Terminal-based system for analyzing trading card markets, including pricing." },
];

const contactLinks = [
  { label: "Email", href: "mailto:hello@rogerkernel.dev" },
  { label: "GitHub", href: "https://github.com/" },
];

const inquiry = reactive({
  name: "",
  email: "",
  type: "Backend / systems build",
  message: "",
});

const filteredFeaturedProjects = computed(() => {
  if (showcaseFilter.value === "ALL") return showcaseProjects;
  return showcaseProjects.filter((project) => project.category === showcaseFilter.value);
});

const filteredProjects = computed(() => {
  if (showcaseFilter.value === "ALL") return allProjects;
  return allProjects.filter((project) => project.category === showcaseFilter.value);
});

const setShowcaseFilter = async (filter: string) => {
  showcaseFilter.value = filter;
  isAllWorkExpanded.value = false;
  await nextTick();
  if (showcaseScroller.value) {
    showcaseScroller.value.scrollLeft = 0;
  }
  ScrollTrigger.refresh();
};

const submitInquiry = () => {
  const subject = encodeURIComponent(`Portfolio inquiry: ${inquiry.type}`);
  const body = encodeURIComponent(
    [
      `Name: ${inquiry.name}`,
      `Email: ${inquiry.email}`,
      `Type: ${inquiry.type}`,
      "",
      inquiry.message,
    ].join("\n"),
  );

  window.location.href = `mailto:hello@rogerkernel.dev?subject=${subject}&body=${body}`;
};

let ctx: gsap.Context | undefined;
let heroRaf = 0;
let heroTimeouts: number[] = [];
let heroResizeHandler: (() => void) | undefined;
let heroObserver: IntersectionObserver | null = null;
let heroVisible = true;
let showcaseMedia: gsap.MatchMedia | undefined;

const skipShowcase = () => {
  showcaseAfter.value?.scrollIntoView({ behavior: "smooth", block: "start" });
};

watch(filteredFeaturedProjects, async () => {
  await nextTick();
  if (showcaseScroller.value) {
    gsap.set(showcaseScroller.value, { x: 0 });
  }
  ScrollTrigger.refresh();
});

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  let renderTopology: ((time: number) => void) | null = null;
  const startHeroLoop = () => {
    if (heroRaf || !heroVisible || !renderTopology) return;
    heroRaf = window.requestAnimationFrame(renderTopology);
  };

  const typeSequence = (value: string, key: "roger" | "kernel", startDelay: number) => {
    for (const [index, char] of [...value].entries()) {
      const timeoutId = window.setTimeout(() => {
        typedHero[key] += char;
      }, startDelay + index * 105);
      heroTimeouts.push(timeoutId);
    }
  };

  typeSequence("Roger", "roger", 80);
  typeSequence("Kernel", "kernel", 520);

  if (heroCanvas.value) {
    const canvas = heroCanvas.value;
    const context = canvas.getContext("2d");

    if (context) {
      const contourNodes = Array.from({ length: 5 }, () => ({
        x: 0.1 + Math.random() * 0.8,
        y: 0.1 + Math.random() * 0.8,
        amplitude: 0.14 + Math.random() * 0.18,
        frequency: 14 + Math.random() * 16,
        driftX: (Math.random() - 0.5) * 0.08,
        driftY: (Math.random() - 0.5) * 0.08,
        speed: 0.65 + Math.random() * 0.75,
        phase: Math.random() * Math.PI * 2,
      }));
      const thresholds = [-1.25, -0.85, -0.45, 0, 0.45, 0.85, 1.25];

      const resizeCanvas = () => {
        const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = Math.floor(canvas.clientWidth * ratio);
        canvas.height = Math.floor(canvas.clientHeight * ratio);
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
      };

      const sampleField = (x: number, y: number, time: number, width: number, height: number) => {
        const nx = x / width;
        const ny = y / height;
        let value =
          Math.sin(nx * 8.4 + Math.sin(ny * 2.6 + time * 0.0001) * 1.05 + time * 0.00014) * 0.62 +
          Math.cos(ny * 7.9 + Math.sin(nx * 2.3 - time * 0.00008) * 1.1 - time * 0.00011) * 0.56 +
          Math.sin((nx + ny) * 11.8 - time * 0.00009) * 0.24 +
          Math.cos((nx - ny) * 9.6 + time * 0.00007) * 0.18;

        for (const node of contourNodes) {
          const cx = node.x + Math.sin(time * 0.00008 * node.speed + node.phase) * node.driftX;
          const cy = node.y + Math.cos(time * 0.00007 * node.speed + node.phase * 1.2) * node.driftY;
          const dx = nx - cx;
          const dy = ny - cy;
          const distance = Math.sqrt(dx * dx + dy * dy);
          value += node.amplitude * Math.cos(distance * node.frequency - time * 0.00013 * node.speed + node.phase) / (1 + distance * 12);
        }

        return value;
      };

      const interpolate = (
        x1: number,
        y1: number,
        v1: number,
        x2: number,
        y2: number,
        v2: number,
        threshold: number,
      ) => {
        const denom = v2 - v1 || 1e-6;
        const t = (threshold - v1) / denom;
        return {
          x: x1 + (x2 - x1) * t,
          y: y1 + (y2 - y1) * t,
        };
      };

      const drawSegment = (
        ax: number,
        ay: number,
        bx: number,
        by: number,
        width: number,
        height: number,
        alpha: number,
        color: string,
      ) => {
        const mx = (ax + bx) * 0.5;
        const my = (ay + by) * 0.5;
        const titleDx = (mx - width * 0.28) / (width * 0.34);
        const titleDy = (my - height * 0.44) / (height * 0.4);
        const titleDistance = Math.sqrt(titleDx * titleDx + titleDy * titleDy);
        const titleFade = Math.max(0, Math.min(1, (titleDistance - 0.18) / 0.82));

        const bodyDx = (mx - width * 0.78) / (width * 0.22);
        const bodyDy = (my - height * 0.76) / (height * 0.22);
        const bodyDistance = Math.sqrt(bodyDx * bodyDx + bodyDy * bodyDy);
        const bodyFade = Math.max(0, Math.min(1, (bodyDistance - 0.16) / 0.84));

        const localAlpha = alpha * Math.min(titleFade, bodyFade);

        context.strokeStyle = color.replace("__ALPHA__", String(localAlpha));
        context.beginPath();
        context.moveTo(ax, ay);
        context.lineTo(bx, by);
        context.stroke();
      };

      renderTopology = (time: number) => {
        if (!heroVisible) {
          heroRaf = 0;
          return;
        }

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const gridSize = width > 1200 ? 24 : width > 720 ? 22 : 20;
        const accentPulse = 0.14 + ((Math.sin(time * 0.0022) + 1) * 0.5) * 0.26;

        context.clearRect(0, 0, width, height);
        context.lineWidth = width > 1200 ? 1.55 : 1.3;
        context.lineCap = "round";
        context.lineJoin = "round";

        const cols = Math.ceil(width / gridSize) + 1;
        const rows = Math.ceil(height / gridSize) + 1;
        const values = Array.from({ length: rows }, () => Array<number>(cols).fill(0));

        for (let row = 0; row < rows; row += 1) {
          for (let col = 0; col < cols; col += 1) {
            values[row][col] = sampleField(col * gridSize, row * gridSize, time, width, height);
          }
        }

        for (let row = 0; row < rows - 1; row += 1) {
          for (let col = 0; col < cols - 1; col += 1) {
            const x = col * gridSize;
            const y = row * gridSize;
            const topLeft = values[row][col];
            const topRight = values[row][col + 1];
            const bottomRight = values[row + 1][col + 1];
            const bottomLeft = values[row + 1][col];

            for (let tIndex = 0; tIndex < thresholds.length; tIndex += 1) {
              const threshold = thresholds[tIndex];
              const points = [];

              if ((topLeft > threshold) !== (topRight > threshold)) {
                points.push(interpolate(x, y, topLeft, x + gridSize, y, topRight, threshold));
              }
              if ((topRight > threshold) !== (bottomRight > threshold)) {
                points.push(interpolate(x + gridSize, y, topRight, x + gridSize, y + gridSize, bottomRight, threshold));
              }
              if ((bottomRight > threshold) !== (bottomLeft > threshold)) {
                points.push(interpolate(x + gridSize, y + gridSize, bottomRight, x, y + gridSize, bottomLeft, threshold));
              }
              if ((bottomLeft > threshold) !== (topLeft > threshold)) {
                points.push(interpolate(x, y + gridSize, bottomLeft, x, y, topLeft, threshold));
              }

              if (points.length === 2) {
                const isAccent = tIndex === 2 || tIndex === 6 || tIndex === 9;
                const segmentAlpha = (0.16 + tIndex * 0.034) + (isAccent ? accentPulse : 0);
                drawSegment(
                  points[0].x,
                  points[0].y,
                  points[1].x,
                  points[1].y,
                  width,
                  height,
                  segmentAlpha,
                  isAccent
                    ? `rgba(204,255,0,__ALPHA__)`
                    : tIndex % 3 === 0
                      ? `rgba(245,245,245,__ALPHA__)`
                      : `rgba(212,212,212,__ALPHA__)`,
                );
              } else if (points.length === 4) {
                const isAccent = tIndex === 2 || tIndex === 6 || tIndex === 9;
                const strokeColor = isAccent
                  ? `rgba(204,255,0,__ALPHA__)`
                  : tIndex % 3 === 0
                    ? `rgba(245,245,245,__ALPHA__)`
                    : `rgba(212,212,212,__ALPHA__)`;
                const segmentAlpha = (0.14 + tIndex * 0.03) + (isAccent ? accentPulse : 0);
                drawSegment(
                  points[0].x,
                  points[0].y,
                  points[1].x,
                  points[1].y,
                  width,
                  height,
                  segmentAlpha,
                  strokeColor,
                );
                drawSegment(
                  points[2].x,
                  points[2].y,
                  points[3].x,
                  points[3].y,
                  width,
                  height,
                  segmentAlpha,
                  strokeColor,
                );
              }
            }
          }
        }

        heroRaf = window.requestAnimationFrame(renderTopology);
      };

      resizeCanvas();
      startHeroLoop();
      heroResizeHandler = resizeCanvas;
      window.addEventListener("resize", heroResizeHandler);
    }
  }

  if (heroSection.value) {
    heroObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        heroVisible = Boolean(entry?.isIntersecting);
        if (heroVisible) {
          startHeroLoop();
        } else if (heroRaf) {
          window.cancelAnimationFrame(heroRaf);
          heroRaf = 0;
        }
      },
      { threshold: 0.12 },
    );
    heroObserver.observe(heroSection.value);
  }

  ctx = gsap.context(() => {
    showcaseMedia = gsap.matchMedia();

    gsap.fromTo(
      ".intro-text",
      { y: "110%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 1.15,
        stagger: 0.16,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".intro-section",
          start: "top 72%",
        },
      },
    );

    gsap.from(".project-visual", {
      scale: 0.94,
      opacity: 0,
      duration: 0.9,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".featured-section",
        start: "top 70%",
      },
    });

    if (showcaseScroller.value) {
      showcaseScroller.value.scrollLeft = 0;
      gsap.set(showcaseScroller.value, { x: 0 });
    }

    showcaseMedia.add("(min-width: 768px)", () => {
      if (!showcasePinStage.value || !showcaseViewport.value || !showcaseScroller.value) return undefined;

      const viewport = showcaseViewport.value;
      const track = showcaseScroller.value;
      const getTravel = () => Math.max(track.scrollWidth - viewport.clientWidth, 0);

      gsap.set(track, { x: 0 });

      if (getTravel() <= 0) {
        return () => {
          gsap.set(track, { clearProps: "transform" });
        };
      }

      const tween = gsap.to(track, {
        x: () => -getTravel(),
        ease: "none",
        overwrite: true,
        scrollTrigger: {
          trigger: showcasePinStage.value,
          start: "top top+=88",
          end: () => `+=${getTravel()}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(track, { clearProps: "transform" });
      };
    });

    gsap.from(".decrypt-title", {
      y: 24,
      letterSpacing: "0.08em",
      duration: 0.8,
      ease: "power3.out",
      clearProps: "letterSpacing,transform",
      scrollTrigger: {
        trigger: ".case-section",
        start: "top 68%",
      },
    });

    if (magneticLinks.value && window.matchMedia("(pointer: fine)").matches) {
      const links = magneticLinks.value.querySelectorAll("a");
      links.forEach((link) => {
        link.addEventListener("mousemove", (event) => {
          const rect = link.getBoundingClientRect();
          const x = (event.clientX - rect.left - rect.width / 2) * 0.08;
          const y = (event.clientY - rect.top - rect.height / 2) * 0.16;
          gsap.to(link, { x, y, duration: 0.35, ease: "power3.out" });
        });
        link.addEventListener("mouseleave", () => {
          gsap.to(link, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
        });
      });
    }
  });
});

onUnmounted(() => {
  for (const timeoutId of heroTimeouts) {
    window.clearTimeout(timeoutId);
  }
  if (heroRaf) {
    window.cancelAnimationFrame(heroRaf);
  }
  heroObserver?.disconnect();
  heroObserver = null;
  if (heroResizeHandler) {
    window.removeEventListener("resize", heroResizeHandler);
  }
  showcaseMedia?.revert();
  ctx?.revert();
});
</script>
