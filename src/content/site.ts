export const site = {
  name: "Alin",

  // --- Intro page ---
  // Set enabled: false to skip the intro and land directly on the hero
  intro: {
    enabled: true,
    greeting: "👋 Hi, Cresta team!",
  },

  // --- Hero ---
  hero: {
    name: "Alin",
    role: "Product Designer @ UiPath",
    focus: "Agent Builder · Developer Tools",
  },

  // --- Navigation ---
  nav: [
    { label: "About", href: "/home" },
    { label: "Work", href: "/projects/case-study" },
  ],

  // --- Projects ---
  projects: [
    { slug: "case-study", title: "AI Agent Builder" },
    { slug: "project-two", title: "Project Two" },
  ],
}
