<template>
  <div class="relative w-full overflow-hidden">
    <section
      ref="heroSection"
      id="top"
      class="blueprint-section hero-shell relative flex min-h-svh w-full items-end overflow-hidden border-b border-border px-5 pb-10 pt-28 md:px-12 md:pb-14"
    >
      <canvas
        ref="heroCanvas"
        class="hero-canvas absolute inset-0"
        aria-hidden="true"
      />
      <div
        class="hero-haze hero-haze-left absolute z-[1] pointer-events-none"
        aria-hidden="true"
      />
      <div
        class="hero-haze hero-haze-right absolute z-[1] pointer-events-none"
        aria-hidden="true"
      />

      <div class="relative z-10 grid w-full grid-cols-12 gap-4">
        <div class="col-span-12">
          <p
            class="mb-5 font-mono text-xs uppercase tracking-[0.32em] text-accent md:text-sm"
          >
            {{ t("hero.eyebrow") }}
          </p>
          <h1
            class="hero-title max-w-[15ch] text-[18vw] font-black uppercase leading-[0.76] tracking-[-0.085em] text-primary md:text-[12.4vw]"
          >
            <span class="hero-type-line hero-type-roger">
              <span class="hero-type-text">{{ typedHero.roger }}</span>
            </span>
            <span class="hero-type-line hero-type-kernel">
              <span class="hero-type-text hero-kernel-text">
                {{ typedHero.kernel
                }}<span class="hero-cursor" aria-hidden="true" />
              </span>
            </span>
          </h1>
        </div>

        <div
          class="col-span-12 mt-8 border-t border-border pt-5 md:col-span-5 md:mt-10"
        >
          <p
            class="font-mono text-xs uppercase leading-relaxed tracking-[0.16em] text-secondary md:whitespace-nowrap md:text-[0.73rem] md:leading-none md:tracking-[0.24em]"
          >
            {{ t("hero.role") }}
          </p>
        </div>

        <div class="col-span-12 mt-4 md:col-span-5 md:col-start-8 md:mt-10">
          <p class="max-w-xl text-xl leading-snug text-primary md:text-3xl">
            {{ t("hero.intro") }}
          </p>
          <div
            class="mt-8 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.22em]"
          >
            <a class="blueprint-button" href="#work">{{
              t("hero.ctaShowcase")
            }}</a>
            <a
              class="blueprint-button blueprint-button-accent"
              href="#contact"
              >{{ t("hero.ctaContact") }}</a
            >
          </div>
        </div>
      </div>
    </section>

    <section
      class="intro-section blueprint-section border-b border-border px-5 py-24 md:px-12 md:py-36"
    >
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-3">
          <p
            class="font-mono text-xs uppercase tracking-[0.28em] text-secondary"
          >
            {{ t("intro.eyebrow") }}
          </p>
          <div ref="seraphimMountTrigger" class="mt-8">
            <SeraphimStage v-if="isSeraphimStageMounted" />
            <div
              v-else
              class="stage-placeholder stage-placeholder-tall"
              aria-hidden="true"
            />
          </div>
        </div>
        <div
          class="col-span-12 space-y-8 text-2xl leading-tight text-primary md:col-span-8 md:col-start-5 md:text-5xl"
        >
          <div class="overflow-hidden pb-[0.12em]">
            <p class="intro-text will-change-transform">
              {{ t("intro.line1") }}
              <span class="text-accent">{{ t("intro.line1Accent1") }}</span
              >, <span class="text-accent">{{ t("intro.line1Accent2") }}</span
              >,
              {{ t("intro.line1Join") }}
              <span class="text-accent">{{ t("intro.line1Accent3") }}</span
              >.
            </p>
          </div>
          <div class="overflow-hidden pb-[0.12em]">
            <p class="intro-text text-secondary will-change-transform">
              {{ t("intro.line2") }}
              <span class="intro-mark">{{ t("intro.line2Highlight") }}</span>
            </p>
          </div>
          <div class="overflow-hidden pb-[0.12em]">
            <p class="intro-text will-change-transform">
              {{ t("intro.line3") }}
              <span class="intro-mark">{{ t("intro.line3Highlight") }}</span>
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
            <p
              class="font-mono text-xs uppercase tracking-[0.28em] text-secondary"
            >
              {{ t("showcase.eyebrow") }}
            </p>
            <h2
              class="mt-5 text-5xl font-black uppercase leading-none tracking-[-0.06em] md:text-7xl"
            >
              {{ t("showcase.title") }}
            </h2>
          </div>
          <div class="col-span-12 self-end md:col-span-8">
            <div
              class="mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
            >
              <p
                class="showcase-description max-w-xl font-mono text-xs uppercase leading-relaxed tracking-[0.18em] text-secondary"
              >
                {{ t("showcase.description") }}
              </p>
              <button
                type="button"
                class="showcase-skip-button showcase-skip-button-local shrink-0 md:self-start"
                @click="skipShowcase"
              >
                {{ t("showcase.skip") }}
              </button>
            </div>
            <div
              class="showcase-filter-rail sticky top-16 z-20 flex items-center gap-2 overflow-x-auto bg-background/90 py-3 backdrop-blur md:flex-wrap md:justify-between md:gap-x-6 md:gap-y-3 md:overflow-visible"
            >
              <button
                v-for="filter in filters"
                :key="`showcase-${filter.id}`"
                type="button"
                class="filter-button showcase-filter-button shrink-0 whitespace-nowrap"
                :class="{
                  'filter-button-active': showcaseFilter === filter.id,
                }"
                @click="setShowcaseFilter(filter.id)"
              >
                [ {{ filter.label }} ]
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
              class="featured-card showcase-card grid min-h-[680px] w-[90vw] max-w-[1280px] shrink-0 snap-start grid-cols-12 content-start gap-4 border border-border bg-background px-4 py-8 md:min-h-[760px] md:w-[calc(100vw-8rem)] md:content-center md:px-8 md:py-10 lg:px-10"
            >
              <div
                class="col-span-12 mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-[0.28em] text-secondary"
              >
                <span
                  >[ Featured {{ String(index + 1).padStart(2, "0") }} ]</span
                >
                <span class="hidden text-accent md:block">{{
                  project.signal
                }}</span>
              </div>

              <div class="col-span-12 md:col-span-6 lg:col-span-7">
                <div
                  class="project-visual group relative h-[32vh] min-h-[14rem] overflow-hidden border border-border md:h-[44vh] md:min-h-72"
                  :class="
                    project.media ? 'project-visual-media' : project.visual
                  "
                >
                  <template v-if="project.mediaType === 'video'">
                    <video
                      class="project-media"
                      :src="project.media"
                      :aria-label="project.title"
                      autoplay
                      muted
                      loop
                      playsinline
                      preload="auto"
                      disablepictureinpicture
                      controlslist="nodownload noplaybackrate noremoteplayback"
                    />
                  </template>
                  <template v-else-if="project.media">
                    <img
                      :src="project.media"
                      :alt="project.title"
                      class="project-media"
                      loading="lazy"
                      decoding="async"
                    />
                  </template>
                  <template v-else-if="project.key === 'ragChatbot'">
                    <svg
                      class="rag-svg"
                      viewBox="0 0 900 520"
                      role="img"
                      :aria-label="t('projects.ragChatbot.svgLabel')"
                    >
                      <defs>
                        <linearGradient id="ragLine" x1="0" x2="1">
                          <stop
                            offset="0%"
                            :stop-color="accentHex"
                            stop-opacity="0.95"
                          />
                          <stop
                            offset="100%"
                            stop-color="#00f0ff"
                            stop-opacity="0.75"
                          />
                        </linearGradient>
                        <filter id="ragGlow">
                          <feGaussianBlur stdDeviation="4" result="blur" />
                          <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                      <g class="rag-links" filter="url(#ragGlow)">
                        <path
                          d="M135 126 C260 80 340 168 438 214 S650 302 744 230"
                        />
                        <path
                          d="M156 374 C260 330 330 360 438 214 S612 130 770 132"
                        />
                        <path d="M438 214 C432 300 482 356 612 396" />
                      </g>
                      <g class="rag-node rag-query">
                        <circle cx="135" cy="126" r="34" />
                        <text x="135" y="132">Ask</text>
                      </g>
                      <g class="rag-node">
                        <circle cx="438" cy="214" r="48" />
                        <text x="438" y="220">Helper</text>
                      </g>
                      <g class="rag-node">
                        <circle cx="744" cy="230" r="30" />
                        <text x="744" y="236">Docs</text>
                      </g>
                      <g class="rag-node">
                        <circle cx="156" cy="374" r="26" />
                        <text x="156" y="380">Web</text>
                      </g>
                      <g class="rag-node">
                        <circle cx="770" cy="132" r="26" />
                        <text x="770" y="138">Notes</text>
                      </g>
                      <g class="rag-node">
                        <circle cx="612" cy="396" r="26" />
                        <text x="612" y="402">Reply</text>
                      </g>
                      <text class="rag-label" x="64" y="468">
                        {{ t("projects.ragChatbot.svgFooter") }}
                      </text>
                    </svg>
                  </template>
                  <template v-else>
                    <div
                      class="visual-placeholder absolute inset-0 flex flex-col justify-between p-5 font-mono uppercase tracking-[0.24em]"
                    >
                      <div
                        class="flex justify-between border-b border-border pb-3 text-[10px] text-secondary"
                      >
                        <span>{{ project.module }}</span>
                        <span>{{ project.metric }}</span>
                      </div>
                      <div class="text-sm text-primary">
                        {{ t("showcase.placeholder") }}
                      </div>
                      <div class="text-[10px] leading-relaxed text-secondary">
                        {{ project.caption }}
                      </div>
                    </div>
                  </template>
                </div>
              </div>

              <div
                class="col-span-12 flex flex-col justify-end md:col-span-6 lg:col-span-5"
              >
                <h2
                  class="max-w-[12ch] text-[2.35rem] font-black uppercase leading-[0.92] tracking-[-0.055em] md:text-6xl md:leading-none"
                >
                  {{ project.title }}
                </h2>
                <div
                  class="mt-5 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[0.16em]"
                >
                  <span class="border border-border px-3 py-2 text-secondary"
                    >{{ t("showcase.track") }}:
                    {{ project.categoryLabel }}</span
                  >
                  <span
                    v-if="project.stack"
                    class="border border-border px-3 py-2 text-accent"
                    >{{ t("showcase.stack") }}: {{ project.stack }}</span
                  >
                </div>

                <p
                  class="mt-6 max-w-xl text-base leading-relaxed text-primary/88 md:mt-8 md:text-xl"
                >
                  {{ project.description }}
                </p>

                <div
                  class="mt-8 grid gap-5 font-mono text-xs leading-relaxed text-primary/85 md:mt-10 md:gap-7 md:grid-cols-2"
                >
                  <div>
                    <span
                      class="mb-3 block border-b border-border pb-2 uppercase tracking-[0.22em] text-secondary"
                      >{{ t("showcase.role") }}</span
                    >
                    <p class="showcase-meta-copy">{{ project.role }}</p>
                  </div>
                  <div>
                    <span
                      class="mb-3 block border-b border-border pb-2 uppercase tracking-[0.22em] text-secondary"
                      >{{ t("showcase.focus") }}</span
                    >
                    <p class="showcase-meta-copy">{{ project.focus }}</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
        <div class="mt-5 flex items-center justify-end gap-4">
          <button
            type="button"
            class="showcase-skip-button showcase-skip-button-local"
            @click="skipShowcase"
          >
            {{ t("showcase.continueBelow") }}
          </button>
        </div>
      </div>

      <div
        id="work-index"
        ref="showcaseAfter"
        class="showcase-more-panel mt-10 border border-border"
      >
        <div
          class="grid gap-6 p-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:p-7"
        >
          <div>
            <p
              class="font-mono text-[10px] uppercase tracking-[0.24em] text-secondary"
            >
              {{
                t("showcase.indexCount", {
                  count: filteredProjects.length,
                  track: activeTrackLabel,
                })
              }}
            </p>
            <p
              class="mt-3 max-w-2xl text-lg leading-relaxed text-primary md:text-2xl"
            >
              {{ t("showcase.indexDescription") }}
            </p>
          </div>
          <button
            type="button"
            class="blueprint-button justify-center md:min-w-56"
            @click="isAllWorkExpanded = !isAllWorkExpanded"
          >
            {{
              isAllWorkExpanded ? t("showcase.collapse") : t("showcase.seeAll")
            }}
          </button>
        </div>

        <Transition name="index-reveal">
          <div
            v-if="isAllWorkExpanded"
            class="border-t border-border px-5 pb-5 md:px-7 md:pb-7"
          >
            <div class="showcase-index-list">
              <a
                v-for="project in filteredProjects"
                :key="project.title"
                href="#contact"
                class="showcase-index-row group grid grid-cols-12 gap-4 border-b border-border py-5 transition-colors hover:bg-accent hover:text-background"
              >
                <span
                  class="col-span-12 text-2xl font-black uppercase tracking-[-0.035em] md:col-span-4"
                >
                  {{ project.title }}
                </span>
                <span
                  class="col-span-12 font-mono text-sm leading-relaxed text-secondary transition-colors group-hover:text-background md:col-span-7"
                >
                  {{ project.description }}
                </span>
                <span
                  class="col-span-12 text-right font-mono text-xs uppercase tracking-[0.24em] md:col-span-1"
                >
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
      <div
        class="security-grid absolute inset-0 opacity-60"
        aria-hidden="true"
      />
      <div class="relative z-10 grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-4 md:flex md:h-full md:flex-col">
          <p
            class="font-mono text-xs uppercase tracking-[0.28em] text-secondary"
          >
            {{ t("security.eyebrow") }}
          </p>
          <div
            ref="securityMountTrigger"
            class="mt-8 flex flex-1 items-center justify-center md:mt-0 md:mx-0"
          >
            <SecurityTerminalStage
              v-if="isSecurityStageMounted"
              class="security-stage-shell w-screen max-w-none -mx-5 md:mx-0 md:w-full md:max-w-[22rem]"
            />
            <div
              v-else
              class="stage-placeholder stage-placeholder-wide security-stage-shell w-screen max-w-none -mx-5 md:mx-0 md:w-full md:max-w-[22rem]"
              aria-hidden="true"
            />
          </div>
        </div>
        <div class="col-span-12 md:col-span-7 md:col-start-6">
          <div
            class="mb-8 inline-flex border border-accent/50 px-4 py-2 font-mono text-xs uppercase tracking-[0.28em] text-accent"
          >
            {{ t("security.badge") }}
          </div>
          <h2
            class="decrypt-title text-5xl font-black uppercase leading-none tracking-[-0.06em] text-primary md:text-8xl"
          >
            {{ t("security.title") }}
          </h2>
          <div class="security-panel mt-12 border border-border">
            <div class="grid gap-0 md:grid-cols-12">
              <aside
                class="border-b border-border p-5 md:col-span-4 md:border-b-0 md:border-r"
              >
                <p
                  class="mb-6 font-mono text-xs uppercase tracking-[0.24em] text-secondary"
                >
                  {{ t("security.vector") }}
                </p>
                <dl
                  class="space-y-5 font-mono text-sm leading-relaxed text-primary/85"
                >
                  <div>
                    <dt
                      class="text-[10px] uppercase tracking-[0.22em] text-secondary"
                    >
                      {{ t("security.target") }}
                    </dt>
                    <dd>{{ t("security.targetValue") }}</dd>
                  </div>
                  <div>
                    <dt
                      class="text-[10px] uppercase tracking-[0.22em] text-secondary"
                    >
                      {{ t("security.class") }}
                    </dt>
                    <dd>{{ t("security.classValue") }}</dd>
                  </div>
                  <div>
                    <dt
                      class="text-[10px] uppercase tracking-[0.22em] text-secondary"
                    >
                      {{ t("security.recognition") }}
                    </dt>
                    <dd>{{ t("security.recognitionValue") }}</dd>
                  </div>
                </dl>
              </aside>
              <div class="p-5 md:col-span-8">
                <p class="max-w-3xl text-lg leading-relaxed text-primary">
                  {{ t("security.body") }}
                </p>
                <div class="mt-8 grid gap-8 md:grid-cols-2">
                  <div>
                    <p
                      class="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-accent"
                    >
                      {{ t("security.method") }}
                    </p>
                    <ul
                      class="space-y-3 font-mono text-sm leading-relaxed text-primary/85"
                    >
                      <li>{{ t("security.methodItem1") }}</li>
                      <li>{{ t("security.methodItem2") }}</li>
                    </ul>
                  </div>
                  <div>
                    <p
                      class="mb-3 font-mono text-xs uppercase tracking-[0.24em] text-accent"
                    >
                      {{ t("security.outcome") }}
                    </p>
                    <ul
                      class="space-y-3 font-mono text-sm leading-relaxed text-primary/85"
                    >
                      <li>{{ t("security.outcomeItem1") }}</li>
                      <li>{{ t("security.outcomeItem2") }}</li>
                    </ul>
                  </div>
                </div>
                <div class="security-trace mt-8 grid gap-4 md:grid-cols-3">
                  <div class="security-trace-cell">
                    <span>01</span>
                    <p>{{ t("security.trace1") }}</p>
                  </div>
                  <div class="security-trace-cell">
                    <span>02</span>
                    <p>{{ t("security.trace2") }}</p>
                  </div>
                  <div class="security-trace-cell">
                    <span>03</span>
                    <p>{{ t("security.trace3") }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a
            class="mt-8 inline-flex font-mono text-xs uppercase tracking-[0.26em] text-accent hover:text-primary"
            href="#contact"
          >
            {{ t("security.fullWriteup") }}
          </a>
        </div>
      </div>
    </section>

    <section
      class="approach-section blueprint-section border-b border-border px-5 py-20 md:px-12 md:py-28"
    >
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 md:col-span-5">
          <p
            class="font-mono text-xs uppercase tracking-[0.28em] text-secondary"
          >
            {{ t("approach.eyebrow") }}
          </p>
          <h2
            class="mt-6 text-6xl font-black uppercase leading-[0.82] tracking-[-0.065em] md:text-8xl"
          >
            {{ t("approach.title.line1") }}<br /><span class="text-accent">{{
              t("approach.title.line2")
            }}</span
            ><br />{{ t("approach.title.line3") }}
          </h2>
        </div>
        <div class="col-span-12 mt-10 md:col-span-7 md:mt-0">
          <div class="approach-machine">
            <div class="machine-rail">
              <span>{{ t("approach.rail1") }}</span>
              <span>{{ t("approach.rail2") }}</span>
              <span>{{ t("approach.rail3") }}</span>
            </div>
            <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <div class="machine-cell">
                <span>{{ t("approach.build.title") }}</span>
                <p>{{ t("approach.build.body") }}</p>
              </div>
              <div class="machine-cell machine-cell-accent">
                <span>{{ t("approach.break.title") }}</span>
                <p>{{ t("approach.break.body") }}</p>
              </div>
              <div class="machine-cell md:col-span-2 xl:col-span-1">
                <span>{{ t("approach.harden.title") }}</span>
                <p>{{ t("approach.harden.body") }}</p>
              </div>
            </div>
            <div class="mt-6 divide-y divide-border border-y border-border">
              <p
                v-for="proof in proofItems"
                :key="proof"
                class="py-5 font-mono text-sm uppercase tracking-[0.22em] text-primary"
              >
                / {{ t(proof) }}
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
          <p
            class="font-mono text-xs uppercase tracking-[0.28em] text-secondary"
          >
            {{ t("contact.eyebrow") }}
          </p>
          <div class="availability-side mt-6">
            <span class="availability-status">{{ t("contact.status") }}</span>
            <p class="mt-4 max-w-xs text-sm leading-relaxed text-primary/82">
              {{ t("contact.statusBody") }}
            </p>
          </div>
        </div>
        <div class="col-span-12 mt-16 md:col-span-8 md:col-start-5 md:mt-0">
          <div class="availability-grid mb-12 grid gap-3 md:grid-cols-3">
            <div class="availability-card availability-card-no-grid">
              <span>01</span>
              <p>{{ t("contact.card1") }}</p>
            </div>
            <div class="availability-card availability-card-accent">
              <span>02</span>
              <p>{{ t("contact.card2") }}</p>
            </div>
            <div class="availability-card availability-card-no-grid">
              <span>03</span>
              <p>{{ t("contact.card3") }}</p>
            </div>
          </div>
          <h2
            class="max-w-4xl text-4xl font-black uppercase leading-[0.92] tracking-[-0.06em] text-primary md:text-6xl"
          >
            <span>{{ t("contact.titleLead") }}&nbsp;</span
            ><span class="text-accent">{{ t("contact.titleAccent") }}</span
            >{{ t("contact.titlePunct") }}<br class="hidden md:block" /><span
              >{{ t("contact.titleTail") }}</span
            >
          </h2>
          <p
            class="mt-3 max-w-2xl font-mono text-sm tracking-[0.08em] text-secondary md:text-base"
          >
            {{ t("contact.subtitle") }}
          </p>
          <div ref="magneticLinks" class="mt-8 flex flex-wrap gap-3">
            <a
              v-for="link in contactLinks"
              :key="link.labelKey"
              class="contact-link-button magnetic-link inline-flex items-center border border-border px-5 py-3 font-mono text-xs uppercase tracking-[0.22em] text-primary transition-colors hover:border-accent hover:text-accent"
              :href="link.href"
            >
              {{ t(link.labelKey) }}
            </a>
          </div>
          <form
            class="inquiry-form mt-14 grid gap-3 font-mono"
            @submit.prevent="submitInquiry"
          >
            <div class="grid gap-3 md:grid-cols-2">
              <label>
                <span>{{ t("contact.form.name") }}</span>
                <input
                  v-model="inquiry.name"
                  required
                  type="text"
                  autocomplete="name"
                />
              </label>
              <label>
                <span>{{ t("contact.form.email") }}</span>
                <input
                  v-model="inquiry.email"
                  required
                  type="email"
                  autocomplete="email"
                />
              </label>
            </div>
            <label>
              <span>{{ t("contact.form.projectType") }}</span>
              <select v-model="inquiry.type">
                <option
                  v-for="type in inquiryTypes"
                  :key="type.id"
                  :value="type.id"
                >
                  {{ type.label }}
                </option>
              </select>
            </label>
            <label>
              <span>{{ t("contact.form.inquiry") }}</span>
              <textarea
                v-model="inquiry.message"
                required
                rows="5"
                :placeholder="t('contact.form.placeholder')"
              />
            </label>
            <button
              class="inquiry-submit"
              type="submit"
              :disabled="contactSubmissionState === 'sending'"
            >
              {{ contactSubmitLabel }}
            </button>
            <p
              v-if="contactSubmissionMessage"
              class="inquiry-status"
              :class="{
                'inquiry-status-success': contactSubmissionState === 'success',
                'inquiry-status-error': contactSubmissionState === 'error',
              }"
              role="status"
              aria-live="polite"
            >
              {{ contactSubmissionMessage }}
            </p>
          </form>
        </div>
      </div>
      <p
        class="absolute bottom-5 left-5 right-5 font-mono text-[10px] uppercase tracking-[0.24em] text-secondary md:left-12 md:right-12"
      >
        {{ t("contact.footer") }}
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  defineAsyncComponent,
  nextTick,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
} from "vue";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useAccentTheme } from "~/composables/useAccentTheme";
import { useModelPreloader } from "~/composables/useModelPreloader";
import { useSiteLoader } from "~/composables/useSiteLoader";
import { SERAPHIM_MODEL_URL, TERMINAL_MODEL_URL } from "~/utils/modelUrls";

const SeraphimStage = defineAsyncComponent(
  () => import("~/components/SeraphimStage.client.vue"),
);
const SecurityTerminalStage = defineAsyncComponent(
  () => import("~/components/SecurityTerminalStage.client.vue"),
);
const CONTACT_API_URL =
  "https://portfolio-web-contact.rogerpicar.workers.dev/api/contact";

const heroCanvas = ref<HTMLCanvasElement | null>(null);
const heroSection = ref<HTMLElement | null>(null);
const showcaseViewport = ref<HTMLElement | null>(null);
const showcaseScroller = ref<HTMLElement | null>(null);
const showcaseSection = ref<HTMLElement | null>(null);
const showcasePinStage = ref<HTMLElement | null>(null);
const showcaseAfter = ref<HTMLElement | null>(null);
const magneticLinks = ref<HTMLElement | null>(null);
const seraphimMountTrigger = ref<HTMLElement | null>(null);
const securityMountTrigger = ref<HTMLElement | null>(null);
const isSeraphimStageMounted = ref(false);
const isSecurityStageMounted = ref(false);
const { t } = useI18n();
const { accentHex, accentRgba } = useAccentTheme();
const typedHero = reactive({
  roger: "",
  kernel: "",
});

const showcaseFilter = ref("all");
const isAllWorkExpanded = ref(false);

const filterDefs = [
  { id: "all", key: "showcase.filters.all" },
  { id: "systems", key: "showcase.filters.systems" },
  { id: "business", key: "showcase.filters.business" },
  { id: "security", key: "showcase.filters.security" },
  { id: "dataAi", key: "showcase.filters.dataAi" },
] as const;

const featuredProjectDefs = [
  {
    key: "tcgTerminal",
    category: "dataAi",
    stack: "Rust with Ratatui, Python with FastAPI, SQLite",
    visual: "visual-placeholder-shell",
    media: "/projects/tcgterminal.mp4",
    mediaType: "video",
  },
  {
    key: "desmodus",
    category: "business",
    stack: "Nuxt.js, GSAP",
    visual: "visual-placeholder-shell",
    media: "/projects/desmoduslanding.mp4",
    mediaType: "video",
  },
  {
    key: "ragChatbot",
    category: "dataAi",
    stack: "Python, TypeScript, vector database concepts",
    visual: "visual-rag",
  },
  {
    key: "fleetManagement",
    category: "business",
    stack: "Laravel, Vue, Python, MongoDB, REST APIs",
    visual: "visual-placeholder-shell",
    media: "/projects/fleetmanager.mp4",
    mediaType: "video",
  },
  {
    key: "quantBot",
    category: "dataAi",
    stack: "Python, XGBoost, scikit-learn",
    visual: "visual-placeholder-shell",
    media: "/projects/quantbot.png",
    mediaType: "image",
  },
  {
    key: "markdownParser",
    category: "systems",
    stack: "C++17",
    visual: "visual-placeholder-shell",
    media: "/projects/paser_cpp.png",
    mediaType: "image",
  },
  {
    key: "threatIntel",
    category: "security",
    stack: "Python, data processing, graph modeling",
    visual: "visual-placeholder-shell",
    media: "/projects/intelgraph.png",
    mediaType: "image",
  },
  {
    key: "writeups",
    category: "security",
    stack: "Ruby on Rails, JavaScript, documentation",
    visual: "visual-placeholder-shell",
    media: "/projects/writeups.png",
    mediaType: "image",
  },
];

const allProjectDefs = [
  { key: "markdownParser", category: "systems" },
  { key: "vmExperiments", category: "systems" },
  { key: "cliTui", category: "systems" },
  { key: "fleetManagement", category: "business" },
  { key: "desmodus", category: "business" },
  { key: "bugBounty", category: "security" },
  { key: "writeups", category: "security" },
  { key: "threatIntel", category: "security" },
  { key: "quantBot", category: "dataAi" },
  { key: "ragChatbot", category: "dataAi" },
  { key: "tcgTerminal", category: "dataAi" },
] as const;

const proofItems = [
  "approach.proofs.cert",
  "approach.proofs.nasa",
  "approach.proofs.writeups",
  "approach.proofs.github",
] as const;

const contactLinks = [
  { labelKey: "contact.links.email", href: "mailto:contact@roger.ac" },
  { labelKey: "contact.links.github", href: "https://github.com/r6h" },
] as const;

const inquiryTypes = computed(() => [
  { id: "backend", label: t("contact.form.types.backend") },
  { id: "security", label: t("contact.form.types.security") },
  { id: "prototype", label: t("contact.form.types.prototype") },
  { id: "other", label: t("contact.form.types.other") },
]);

const contactSubmissionState = ref<"idle" | "sending" | "success" | "error">(
  "idle",
);
const contactSubmissionMessage = ref("");

const contactSubmitLabel = computed(() =>
  contactSubmissionState.value === "sending"
    ? t("contact.form.sending")
    : t("contact.form.submit"),
);

const inquiry = reactive({
  name: "",
  email: "",
  type: "backend",
  message: "",
});

const filters = computed(() =>
  filterDefs.map((filter) => ({
    id: filter.id,
    label: t(filter.key),
  })),
);

const categoryLabel = (category: string) => t(`showcase.filters.${category}`);

const featuredProjects = computed(() =>
  featuredProjectDefs.map((project) => ({
    ...project,
    title: t(`projects.${project.key}.title`),
    signal: t(`projects.${project.key}.signal`),
    module: t(`projects.${project.key}.module`),
    metric: t(`projects.${project.key}.metric`),
    caption: t(`projects.${project.key}.caption`),
    description: t(`projects.${project.key}.description`),
    role: t(`projects.${project.key}.role`),
    focus: t(`projects.${project.key}.focus`),
    categoryLabel: categoryLabel(project.category),
  })),
);

const allProjects = computed(() =>
  allProjectDefs.map((project) => ({
    ...project,
    title:
      project.key === "markdownParser"
        ? t("projects.markdownParser.indexTitle")
        : t(`projects.${project.key}.title`),
    description: t(`projects.${project.key}.description`),
    categoryLabel: categoryLabel(project.category),
  })),
);

const filteredFeaturedProjects = computed(() => {
  if (showcaseFilter.value === "all") return featuredProjects.value;
  return featuredProjects.value.filter(
    (project) => project.category === showcaseFilter.value,
  );
});

const filteredProjects = computed(() => {
  if (showcaseFilter.value === "all") return allProjects.value;
  return allProjects.value.filter(
    (project) => project.category === showcaseFilter.value,
  );
});

const activeTrackLabel = computed(() => {
  if (showcaseFilter.value === "all") return t("showcase.fullIndex");
  return t(`showcase.trackLabels.${showcaseFilter.value}`);
});

const setShowcaseFilter = async (filter: string) => {
  const preserveScrollY = window.scrollY;
  showcaseFilter.value = filter;
  isAllWorkExpanded.value = false;
  await nextTick();
  if (showcaseScroller.value) {
    showcaseScroller.value.scrollLeft = 0;
  }
  refreshScrollTrigger();
  window.requestAnimationFrame(() => {
    const lenis = (
      window as Window & {
        __rkLenis?: {
          scrollTo: (target: number, options?: Record<string, unknown>) => void;
        };
      }
    ).__rkLenis;
    if (lenis) {
      lenis.scrollTo(preserveScrollY, { immediate: true, force: true });
      return;
    }
    window.scrollTo({ top: preserveScrollY, left: 0, behavior: "auto" });
  });
};

const submitInquiry = async () => {
  if (contactSubmissionState.value === "sending") return;
  const inquiryTypeLabel =
    inquiryTypes.value.find((type) => type.id === inquiry.type)?.label ??
    inquiry.type;
  contactSubmissionState.value = "sending";
  contactSubmissionMessage.value = "";

  try {
    const response = await fetch(CONTACT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inquiry.name.trim(),
        email: inquiry.email.trim(),
        type: inquiry.type,
        typeLabel: inquiryTypeLabel,
        message: inquiry.message.trim(),
      }),
    });

    const payload = (await response.json().catch(() => null)) as {
      ok?: boolean;
      error?: string;
    } | null;

    if (!response.ok || !payload?.ok) {
      throw new Error(payload?.error ?? t("contact.form.status.error"));
    }

    inquiry.name = "";
    inquiry.email = "";
    inquiry.type = "backend";
    inquiry.message = "";
    contactSubmissionState.value = "success";
    contactSubmissionMessage.value = t("contact.form.status.success");
  } catch (error) {
    console.error("Contact form submission failed:", error);
    contactSubmissionState.value = "error";
    contactSubmissionMessage.value =
      error instanceof Error && error.message
        ? error.message
        : t("contact.form.status.error");
  }
};

let ctx: { revert: () => void } | undefined;
let heroRaf = 0;
let heroTimeouts: number[] = [];
let heroResizeHandler: (() => void) | undefined;
let heroObserver: IntersectionObserver | null = null;
let heroVisible = true;
let showcaseMedia:
  | { add: (...args: any[]) => any; revert: () => void }
  | undefined;
let deferredStageObservers: IntersectionObserver[] = [];
const SHOWCASE_HEADER_OFFSET = 96;
const FEATURED_VIDEO_URLS = [
  "/projects/tcgterminal.mp4",
  "/projects/desmoduslanding.mp4",
  "/projects/fleetmanager.mp4",
] as const;
let pageExperienceStarted = false;
let heroAssetMarkedLoaded = false;
let pageMotionMarkedLoaded = false;
let gsapModule: (typeof import("gsap"))["default"] | null = null;
let scrollTriggerModule:
  | (typeof import("gsap/ScrollTrigger"))["default"]
  | null = null;

const {
  isExperienceReady,
  isHeroIntroReady,
  markAssetsLoaded,
  registerAssets,
} = useSiteLoader();
const { preloadModel } = useModelPreloader();
const videoPromises = new Map<string, Promise<void>>();

const preloadVideo = (src: string) => {
  const existing = videoPromises.get(src);
  if (existing) return existing;

  const promise = new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }

    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.src = src;

    const cleanup = () => {
      video.removeEventListener("canplaythrough", handleReady);
      video.removeEventListener("loadeddata", handleReady);
      video.removeEventListener("error", handleError);
    };

    const handleReady = () => {
      cleanup();
      resolve();
    };

    const handleError = () => {
      cleanup();
      reject(new Error(`Failed to preload video: ${src}`));
    };

    video.addEventListener("canplaythrough", handleReady, { once: true });
    video.addEventListener("loadeddata", handleReady, { once: true });
    video.addEventListener("error", handleError, { once: true });
    video.load();
  });

  videoPromises.set(src, promise);
  return promise;
};

const ensureGsap = async () => {
  if (gsapModule && scrollTriggerModule) return;

  const [{ default: gsapLib }, { default: scrollTriggerLib }] =
    await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);

  gsapLib.registerPlugin(scrollTriggerLib);
  gsapModule = gsapLib;
  scrollTriggerModule = scrollTriggerLib;
};

const refreshScrollTrigger = () => {
  scrollTriggerModule?.refresh();
};

const updateScrollTrigger = () => {
  scrollTriggerModule?.update();
};

const mountDeferredStage = (
  target: HTMLElement | null,
  flag: typeof isSeraphimStageMounted,
) => {
  if (!target || flag.value) {
    flag.value = true;
    return;
  }

  if (!("IntersectionObserver" in window)) {
    flag.value = true;
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0]?.isIntersecting) return;
      flag.value = true;
      observer.disconnect();
    },
    { rootMargin: "280px 0px" },
  );

  observer.observe(target);
  deferredStageObservers.push(observer);
};

const skipShowcase = () => {
  if (!showcaseAfter.value) return;

  const targetTop =
    window.scrollY +
    showcaseAfter.value.getBoundingClientRect().top -
    SHOWCASE_HEADER_OFFSET;
  const nextScrollTop = Math.max(targetTop, 0);
  const isDesktop = window.matchMedia("(min-width: 768px)").matches;
  const lenis = (
    window as Window & {
      __rkLenis?: {
        stop: () => void;
        start: () => void;
        scrollTo: (target: number, options?: Record<string, unknown>) => void;
      };
    }
  ).__rkLenis;

  if (isDesktop && lenis) {
    lenis.stop();
    lenis.scrollTo(nextScrollTop, { immediate: true, force: true });
    window.requestAnimationFrame(() => {
      updateScrollTrigger();
      lenis.start();
    });
    return;
  }

  if (lenis) {
    lenis.scrollTo(nextScrollTop, { duration: 1, force: true });
    return;
  }

  window.scrollTo({
    top: nextScrollTop,
    behavior: isDesktop ? "auto" : "smooth",
  });
};

watch(filteredFeaturedProjects, async () => {
  await nextTick();
  if (showcaseScroller.value && gsapModule) {
    gsapModule.set(showcaseScroller.value, { x: 0 });
  }
  refreshScrollTrigger();
});

onMounted(async () => {
  registerAssets(7);

  void Promise.allSettled([
    preloadModel("seraphim-model", () =>
      new GLTFLoader().loadAsync(SERAPHIM_MODEL_URL),
    ),
    preloadModel("terminal-model", () =>
      new GLTFLoader().loadAsync(TERMINAL_MODEL_URL),
    ),
    ...FEATURED_VIDEO_URLS.map((src) => preloadVideo(src)),
  ]).then((results) => {
    for (const result of results) {
      if (result.status === "rejected") {
        console.warn(result.reason);
      }
    }
    markAssetsLoaded(5);
  });

  mountDeferredStage(seraphimMountTrigger.value, isSeraphimStageMounted);
  mountDeferredStage(securityMountTrigger.value, isSecurityStageMounted);

  await ensureGsap();
  if (!gsapModule) return;

  const gsap = gsapModule;
  let renderTopology: ((time: number) => void) | null = null;
  const startHeroLoop = () => {
    if (heroRaf || !heroVisible || !renderTopology || !isExperienceReady.value)
      return;
    heroRaf = window.requestAnimationFrame(renderTopology);
  };

  const typeSequence = (
    value: string,
    key: "roger" | "kernel",
    startDelay: number,
  ) => {
    for (const [index, char] of [...value].entries()) {
      const timeoutId = window.setTimeout(
        () => {
          typedHero[key] += char;
        },
        startDelay + index * 105,
      );
      heroTimeouts.push(timeoutId);
    }
  };

  const startPageExperience = () => {
    if (pageExperienceStarted) return;
    pageExperienceStarted = true;
    typeSequence("Roger", "roger", 80);
    typeSequence("Kernel", "kernel", 520);
    startHeroLoop();
  };

  if (heroCanvas.value) {
    const canvas = heroCanvas.value;
    const context = canvas.getContext("2d");

    if (context) {
      const contourNodes = Array.from({ length: 4 }, () => ({
        x: 0.1 + Math.random() * 0.8,
        y: 0.1 + Math.random() * 0.8,
        amplitude: 0.14 + Math.random() * 0.18,
        frequency: 14 + Math.random() * 16,
        driftX: (Math.random() - 0.5) * 0.08,
        driftY: (Math.random() - 0.5) * 0.08,
        speed: 0.65 + Math.random() * 0.75,
        phase: Math.random() * Math.PI * 2,
      }));
      const thresholds = [-1.05, -0.55, -0.05, 0.45, 0.95];
      let renderWidth = 0;
      let renderHeight = 0;
      let gridSize = 20;
      let cols = 0;
      let rows = 0;
      let fieldValues = new Float32Array(0);
      let pixelRatioCap = 1.25;

      const resizeCanvas = () => {
        pixelRatioCap = window.matchMedia("(max-width: 767px)").matches
          ? 1.05
          : 1.25;
        const ratio = Math.min(window.devicePixelRatio || 1, pixelRatioCap);
        renderWidth = Math.max(canvas.clientWidth, 1);
        renderHeight = Math.max(canvas.clientHeight, 1);
        gridSize = renderWidth > 1200 ? 28 : renderWidth > 720 ? 24 : 22;
        cols = Math.ceil(renderWidth / gridSize) + 1;
        rows = Math.ceil(renderHeight / gridSize) + 1;

        const requiredCells = rows * cols;
        if (fieldValues.length !== requiredCells) {
          fieldValues = new Float32Array(requiredCells);
        }

        canvas.width = Math.floor(renderWidth * ratio);
        canvas.height = Math.floor(renderHeight * ratio);
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
      };

      const fieldIndex = (row: number, col: number) => row * cols + col;

      const sampleField = (
        x: number,
        y: number,
        time: number,
        width: number,
        height: number,
      ) => {
        const nx = x / width;
        const ny = y / height;
        let value =
          Math.sin(
            nx * 8.4 +
              Math.sin(ny * 2.6 + time * 0.0001) * 1.05 +
              time * 0.00014,
          ) *
            0.62 +
          Math.cos(
            ny * 7.9 +
              Math.sin(nx * 2.3 - time * 0.00008) * 1.1 -
              time * 0.00011,
          ) *
            0.56 +
          Math.sin((nx + ny) * 11.8 - time * 0.00009) * 0.24 +
          Math.cos((nx - ny) * 9.6 + time * 0.00007) * 0.18;

        for (const node of contourNodes) {
          const cx =
            node.x +
            Math.sin(time * 0.00008 * node.speed + node.phase) * node.driftX;
          const cy =
            node.y +
            Math.cos(time * 0.00007 * node.speed + node.phase * 1.2) *
              node.driftY;
          const dx = nx - cx;
          const dy = ny - cy;
          const distance = Math.sqrt(dx * dx + dy * dy);
          value +=
            (node.amplitude *
              Math.cos(
                distance * node.frequency -
                  time * 0.00013 * node.speed +
                  node.phase,
              )) /
            (1 + distance * 12);
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
        const titleFade = Math.max(
          0,
          Math.min(1, (titleDistance - 0.18) / 0.82),
        );

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

        const width = renderWidth;
        const height = renderHeight;
        const accentPulse = 0.14 + (Math.sin(time * 0.0022) + 1) * 0.5 * 0.26;

        context.clearRect(0, 0, width, height);
        context.lineWidth = width > 1200 ? 1.55 : 1.3;
        context.lineCap = "round";
        context.lineJoin = "round";

        for (let row = 0; row < rows; row += 1) {
          for (let col = 0; col < cols; col += 1) {
            fieldValues[fieldIndex(row, col)] = sampleField(
              col * gridSize,
              row * gridSize,
              time,
              width,
              height,
            );
          }
        }

        for (let row = 0; row < rows - 1; row += 1) {
          for (let col = 0; col < cols - 1; col += 1) {
            const x = col * gridSize;
            const y = row * gridSize;
            const topLeft = fieldValues[fieldIndex(row, col)];
            const topRight = fieldValues[fieldIndex(row, col + 1)];
            const bottomRight = fieldValues[fieldIndex(row + 1, col + 1)];
            const bottomLeft = fieldValues[fieldIndex(row + 1, col)];

            for (let tIndex = 0; tIndex < thresholds.length; tIndex += 1) {
              const threshold = thresholds[tIndex];
              const points = [];

              if (topLeft > threshold !== topRight > threshold) {
                points.push(
                  interpolate(
                    x,
                    y,
                    topLeft,
                    x + gridSize,
                    y,
                    topRight,
                    threshold,
                  ),
                );
              }
              if (topRight > threshold !== bottomRight > threshold) {
                points.push(
                  interpolate(
                    x + gridSize,
                    y,
                    topRight,
                    x + gridSize,
                    y + gridSize,
                    bottomRight,
                    threshold,
                  ),
                );
              }
              if (bottomRight > threshold !== bottomLeft > threshold) {
                points.push(
                  interpolate(
                    x + gridSize,
                    y + gridSize,
                    bottomRight,
                    x,
                    y + gridSize,
                    bottomLeft,
                    threshold,
                  ),
                );
              }
              if (bottomLeft > threshold !== topLeft > threshold) {
                points.push(
                  interpolate(
                    x,
                    y + gridSize,
                    bottomLeft,
                    x,
                    y,
                    topLeft,
                    threshold,
                  ),
                );
              }

              if (points.length === 2) {
                const isAccent = tIndex === 2 || tIndex === 6 || tIndex === 9;
                const segmentAlpha =
                  0.16 + tIndex * 0.034 + (isAccent ? accentPulse : 0);
                drawSegment(
                  points[0].x,
                  points[0].y,
                  points[1].x,
                  points[1].y,
                  width,
                  height,
                  segmentAlpha,
                  isAccent
                    ? accentRgba("__ALPHA__")
                    : tIndex % 3 === 0
                      ? `rgba(245,245,245,__ALPHA__)`
                      : `rgba(212,212,212,__ALPHA__)`,
                );
              } else if (points.length === 4) {
                const isAccent = tIndex === 2 || tIndex === 6 || tIndex === 9;
                const strokeColor = isAccent
                  ? accentRgba("__ALPHA__")
                  : tIndex % 3 === 0
                    ? `rgba(245,245,245,__ALPHA__)`
                    : `rgba(212,212,212,__ALPHA__)`;
                const segmentAlpha =
                  0.14 + tIndex * 0.03 + (isAccent ? accentPulse : 0);
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
      if (!heroAssetMarkedLoaded) {
        markAssetsLoaded(1);
        heroAssetMarkedLoaded = true;
      }
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
      if (
        !showcasePinStage.value ||
        !showcaseViewport.value ||
        !showcaseScroller.value
      )
        return undefined;

      const viewport = showcaseViewport.value;
      const track = showcaseScroller.value;
      const getTravel = () =>
        Math.max(track.scrollWidth - viewport.clientWidth, 0);

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
          gsap.to(link, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.45)",
          });
        });
      });
    }
  });

  if (!pageMotionMarkedLoaded) {
    markAssetsLoaded(1);
    pageMotionMarkedLoaded = true;
  }

  watch(
    isHeroIntroReady,
    (ready) => {
      if (!ready) return;
      startPageExperience();
    },
    { immediate: true },
  );

  watch(
    isExperienceReady,
    (ready) => {
      if (!ready) return;
      refreshScrollTrigger();
    },
    { immediate: true },
  );
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
  for (const observer of deferredStageObservers) {
    observer.disconnect();
  }
  deferredStageObservers = [];
  showcaseMedia?.revert();
  ctx?.revert();
});
</script>
