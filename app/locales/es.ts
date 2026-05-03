export default {
  app: {
    loaderTitle: "[ Inicio del sistema / Precarga de activos ]",
    loading: "Cargando",
    cursorView: "VER",
    nav: {
      work: "[Trabajo]",
      security: "[Seguridad]",
      contact: "[Contacto]",
    },
    languageSwitcher: {
      label: "[ Idioma ]",
      english: "EN",
      spanish: "ES",
    },
    languagePrompt: {
      eyebrow: "[ Sugerencia de idioma ]",
      title: "¿Cambiar a español?",
      body: "Tu navegador está configurado en español. Puedes mantener el sitio en inglés o cambiar la interfaz a español ahora.",
      confirm: "Usar español",
      dismiss: "Mantener inglés",
    },
  },
  hero: {
    eyebrow: "[ Sistemas / Seguridad / Backend ]",
    role: "Ingeniero de software enfocado en Sistemas y Seguridad",
    intro:
      "Diseño y construyo sistemas de software complejos, y entiendo cómo se rompen antes que otros.",
    ctaShowcase: "Ver showcase",
    ctaContact: "Contacto",
  },
  intro: {
    eyebrow: "[ 00 / Modelo de trabajo ]",
    line1: "Soy un ingeniero de software con experiencia en",
    line1Accent1: "programación de sistemas",
    line1Accent2: "desarrollo backend",
    line1Join: "y",
    line1Accent3: "seguridad aplicada",
    line2:
      "Mi trabajo va desde parsers, máquinas virtuales y herramientas de terminal hasta",
    line2Highlight:
      "sistemas en producción, microservicios, pipelines de datos e investigación en seguridad.",
    line3: "Construyo software que sea",
    line3Highlight: "funcional, comprensible, escalable y resistente.",
  },
  showcase: {
    eyebrow: "[ 01 / Showcase de proyectos ]",
    title: "Showcase",
    description:
      "Desplázate lateralmente por el trabajo seleccionado. Expande el índice completo después del carrusel.",
    filters: {
      all: "TODO",
      systems: "SISTEMAS / BAJO NIVEL",
      business: "NEGOCIO",
      security: "SEGURIDAD",
      dataAi: "DATOS / IA",
    },
    trackLabels: {
      all: "el índice completo",
      systems: "sistemas / bajo nivel",
      business: "negocio",
      security: "seguridad",
      dataAi: "datos / ia",
    },
    featuredLabel: "Destacado",
    skip: "[ Saltar showcase ]",
    continueBelow: "[ Continuar abajo ]",
    track: "Área",
    stack: "Stack",
    role: "Rol",
    focus: "Enfoque",
    placeholder: "[ Placeholder visual del proyecto ]",
    indexCount: "{count} proyectos en {track}",
    indexDescription:
      "¿Terminaste el showcase? Expande aquí la lista completa sin interrumpir el flujo principal de la galería.",
    collapse: "Ocultar índice completo",
    seeAll: "Ver todo el trabajo",
    fullIndex: "el índice completo",
  },
  security: {
    eyebrow: "[ 02 / Caso de seguridad ]",
    badge: "Programa privado de divulgación de vulnerabilidades",
    title: "Vulnerabilidad de ejecución remota de código",
    vector: "Vector",
    target: "Objetivo",
    targetValue:
      "Superficie privada de divulgación de vulnerabilidades de la NASA",
    class: "Clase",
    classValue: "Ejecución remota de código en el contexto de la aplicación",
    recognition: "Reconocimiento",
    recognitionValue:
      "Reportado a través del programa privado y reconocido en el Hall of Fame de la NASA.",
    body: "Rastreé una ruta de entrada que cruzaba un límite de confianza, la reduje a una primitiva de ejecución reproducible y empaqueté el hallazgo de manera que la causa raíz, el impacto y la ruta de remediación fueran inmediatamente defendibles.",
    method: "Método",
    outcome: "Resultado",
    methodItem1:
      "/ Enumeré los handlers expuestos y mapeé dónde los datos controlados por el usuario entraban en el flujo de ejecución.",
    methodItem2:
      "/ Reduje el problema a una prueba de concepto mínima para que la ruta de explotación fuera precisa, no anecdótica.",
    outcomeItem1:
      "/ Confirmé el alcance en un entorno controlado y documenté un impacto realista para un atacante.",
    outcomeItem2:
      "/ Entregué el reporte a través del programa privado de la NASA y recibí reconocimiento público en su Hall of Fame tras la divulgación.",
    trace1: "Mapeo de superficie de ataque",
    trace2: "Reducción de la ruta de explotación",
    trace3: "Divulgación y reconocimiento",
    fullWriteup: "Enlace al writeup completo ↗",
  },
  approach: {
    eyebrow: "[ 03 / Forma de trabajar ]",
    title: {
      line1: "Construir",
      line2: "Romper",
      line3: "Fortalecer",
    },
    rail1: "Construir",
    rail2: "Presionar",
    rail3: "Verificar",
    build: {
      title: "Construir",
      body: "Diseñar el sistema más pequeño y comprensible que pueda soportar la carga real.",
    },
    break: {
      title: "Romper",
      body: "Cuestionar suposiciones, abusar de límites y buscar fallos desde el principio.",
    },
    harden: {
      title: "Fortalecer",
      body: "Documentar restricciones, reducir ambigüedad y dejar el sistema más fácil de operar.",
    },
    proofs: {
      cert: "Certificación eWPTX",
      nasa: "Reconocimiento VDP de la NASA",
      writeups: "Writeups técnicos",
      github: "Proyectos activos en GitHub",
    },
  },
  contact: {
    eyebrow: "[ Disponibilidad ]",
    status: "Disponible actualmente",
    statusBody:
      "Aceptando trabajo donde el comportamiento del sistema, los modos de fallo y la calidad de entrega importan.",
    card1: "Proyectos freelance",
    card2: "Roles backend y de sistemas",
    card3: "Trabajo relacionado con seguridad",
    titleLine1: "ENVÍA EL PROBLEMA,",
    titleLine2: "LAS RESTRICCIONES",
    subtitle: "y el modo de fallo que te importa.",
    links: {
      email: "Email",
      github: "GitHub",
    },
    form: {
      name: "Nombre",
      email: "Email",
      projectType: "Tipo de proyecto",
      inquiry: "Consulta",
      submit: "Enviar consulta",
      placeholder:
        "Describe el sistema, las restricciones, el plazo y qué es lo que puede fallar.",
      types: {
        backend: "Desarrollo backend / sistemas",
        security: "Revisión de seguridad",
        prototype: "Prototipo técnico",
        other: "Otra consulta",
      },
    },
    mail: {
      subjectPrefix: "Consulta desde el portfolio",
      name: "Nombre",
      email: "Email",
      type: "Tipo",
    },
    footer: "(c) Roger Kernel // Construido desde primeros principios",
  },
  projects: {
    fleetManagement: {
      title: "Plataforma de gestión de flotas",
      signal: "BLOQUEO DE TELEMETRÍA",
      module: "FleetOps / Ingesta en vivo",
      metric: "Multi-tenant",
      caption:
        "Señales de vehículos normalizadas en superficies de control operativas.",
      description:
        "Sistema B2B para monitorización y control de flotas en tiempo real.",
      role: "Implementación full-stack de producto y sistemas.",
      focus:
        "Operaciones, flujo de telemetría y superficies de control multi-tenant.",
    },
    ragChatbot: {
      title: "Motor de chatbot RAG",
      signal: "MATCH VECTORIAL",
      module: "Recuperación / Sin framework",
      metric: "Dice personalizado",
      caption:
        "Comportamiento de recuperación visible sin depender de frameworks externos.",
      description:
        "Sistema de retrieval-augmented generation construido a medida para respuestas contextuales.",
      role: "Pipeline de recuperación y serving construido desde cero.",
      focus:
        "Visibilidad de la lógica de matching y adaptabilidad en entornos sensibles.",
      svgLabel: "Grafo de recuperación RAG",
      svgFooter:
        "PIPELINE DE RECUPERACIÓN PERSONALIZADO / MATCHING SORENSEN-DICE",
    },
    threatIntel: {
      title: "Grafo de inteligencia de amenazas",
      signal: "CORRELACIÓN",
      module: "Intel / Enlaces de entidades",
      metric: "Modelo de grafo",
      caption:
        "Eventos de seguridad fragmentados conectados en un grafo navegable.",
      description:
        "Sistema automatizado para correlacionar eventos de ciberseguridad.",
      role: "Recolección, normalización y modelado del grafo.",
      focus:
        "Detección de patrones, enlace de eventos y contexto para analistas.",
    },
    markdownParser: {
      title: "Parser de Markdown",
      signal: "RENDER AST",
      module: "Parser / C++17",
      metric: "Desde cero",
      caption:
        "Tokenizer, árbol sintáctico y renderer diseñados como un único pipeline controlado.",
      description:
        "Motor de parsing personalizado que implementa tokenizer, AST y pipeline de renderizado.",
      role: "Herramientería de lenguaje de bajo nivel desde primeros principios.",
      focus: "Internals de parsing, estructura y flujo de renderizado.",
      indexTitle: "Parser de Markdown (C++)",
    },
    vmExperiments: {
      title: "Experimentos con máquinas virtuales",
      signal: "MODELO DE PILA",
      module: "Ejecución / VM",
      metric: "Instruction sets",
      caption:
        "Experimentos sobre modelos de ejecución alrededor de runtimes stack-based personalizados.",
      description:
        "Exploración de instruction sets y modelos de ejecución mediante una VM stack-based personalizada.",
      role: "Experimentación con runtime e instruction set.",
      focus:
        "Flujo de ejecución, tradeoffs de arquitectura y comportamiento de bajo nivel.",
    },
    cliTui: {
      title: "Herramientas CLI / TUI",
      signal: "SUPERFICIE DE TERMINAL",
      module: "CLI / TUI",
      metric: "Herramientas de operador",
      caption:
        "Tooling orientado a terminal diseñado para velocidad, automatización e interacción densa.",
      description:
        "Herramientas de terminal diseñadas para rendimiento, automatización e interacción con datos.",
      role: "Diseño de utilidades y aceleración de workflows.",
      focus: "Velocidad, ergonomía e interfaces prácticas para operadores.",
    },
    desmodus: {
      title: "Landing de Desmodus",
      signal: "POSICIONAMIENTO",
      module: "Concepto / Lanzamiento",
      metric: "Desplegado",
      caption:
        "Landing desplegada para un concepto de plataforma de análisis de software y seguridad.",
      description:
        "Concepto de producto y landing desplegada para una plataforma de análisis de software y seguridad.",
      role: "Enfoque de producto y ejecución frontend.",
      focus:
        "Claridad narrativa, posicionamiento y entrega de una superficie pública.",
    },
    bugBounty: {
      title: "Investigación bug bounty",
      signal: "SUPERFICIE DE ATAQUE",
      module: "Investigación / Hallazgos",
      metric: "Objetivos reales",
      caption:
        "Investigación de vulnerabilidades reales con impacto explotable y divulgación responsable.",
      description:
        "Identificación de vulnerabilidades en sistemas reales, incluyendo escenarios RCE.",
      role: "Análisis ofensivo y trabajo de divulgación.",
      focus:
        "Mapeo de superficie de ataque, explotabilidad y calidad del reporte.",
    },
    writeups: {
      title: "Writeups",
      signal: "POSTMORTEM",
      module: "Investigación / Notas",
      metric: "Detalle técnico",
      caption:
        "Writeups detallados que explican el camino desde la debilidad hasta el impacto verificado.",
      description:
        "Análisis detallados de procesos de explotación y debilidades del sistema.",
      role: "Documentación técnica y comunicación de investigación.",
      focus: "Claridad, reproducibilidad y profundidad de explicación.",
    },
    quantBot: {
      title: "Bot de trading cuantitativo",
      signal: "BUCLE DE MODELO",
      module: "Mercados / Automatización",
      metric: "Sistemas de decisión",
      caption:
        "Flujo automatizado de decisiones sobre datos de mercado y estrategias guiadas por modelos.",
      description:
        "Sistema que analiza datos de mercado y ejecuta estrategias de decisión mediante ML.",
      role: "Procesamiento de señales y automatización de estrategias.",
      focus: "Ingesta de datos, bucles de decisión y lógica de ejecución.",
    },
    tcgTerminal: {
      title: "Terminal TCG de mercado (TUI)",
      signal: "LECTURA DE MERCADO",
      module: "Terminal / Mercados",
      metric: "Precios",
      caption:
        "Inspección de mercado en terminal para precios, tendencias y señales de trading.",
      description:
        "Sistema de terminal para analizar mercados de cartas coleccionables, incluyendo precios y tendencias.",
      role: "Diseño de terminal especializada en datos.",
      focus: "Visibilidad del mercado e interacción rápida para operadores.",
    },
  },
} as const;
