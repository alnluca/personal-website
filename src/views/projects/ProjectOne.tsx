import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import PageTransition from "@/components/PageTransition"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"

// ─── Motion helpers ───────────────────────────────────────────────────────────

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SlideIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Placeholder ──────────────────────────────────────────────────────────────

function MediaPlaceholder({ label, aspect = "video" }: { label: string; aspect?: "video" | "wide" | "square" }) {
  const aspectClass = aspect === "wide" ? "aspect-[21/9]" : aspect === "square" ? "aspect-square" : "aspect-video"
  return (
    <div
      className={`${aspectClass} w-full rounded-xl border border-dashed border-border bg-muted/40 flex flex-col items-center justify-center gap-2 text-muted-foreground select-none`}
    >
      <div className="w-8 h-8 rounded-md border border-dashed border-muted-foreground/40 flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="opacity-40">
          <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M5 9l2-2 2 2 2-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="4.5" cy="6.5" r="0.75" fill="currentColor" />
        </svg>
      </div>
      <span className="text-xs font-medium text-center px-4 leading-snug max-w-xs">{label}</span>
    </div>
  )
}

// ─── Layout atoms ─────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-muted-foreground">
      {children}
    </span>
  )
}

function SectionHeader({ label, title }: { label?: string; title: string }) {
  return (
    <FadeIn className="space-y-3">
      {label && <SectionLabel>{label}</SectionLabel>}
      <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h2>
    </FadeIn>
  )
}

function SplitSection({
  content,
  media,
  flip = false,
  mediaAspect = "video",
}: {
  content: React.ReactNode
  media: string
  flip?: boolean
  mediaAspect?: "video" | "wide" | "square"
}) {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}>
      <FadeIn>{content}</FadeIn>
      <FadeIn delay={0.1}>
        <MediaPlaceholder label={media} aspect={mediaAspect} />
      </FadeIn>
    </div>
  )
}

function InsightCallout({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border-l-2 border-foreground pl-6 py-2"
    >
      <p className="text-xl sm:text-2xl font-medium leading-snug">{children}</p>
    </motion.div>
  )
}

function DecisionCallout({ from, to }: { from: string; to: string }) {
  return (
    <FadeIn>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 py-6">
        <span className="text-muted-foreground line-through text-lg">{from}</span>
        <span className="text-muted-foreground hidden sm:block">→</span>
        <span className="font-semibold text-lg">{to}</span>
      </div>
    </FadeIn>
  )
}

function OutcomeList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <SlideIn key={item} delay={i * 0.07}>
          <li className="flex items-start gap-3 text-sm text-muted-foreground">
            <span className="mt-1.5 w-1 h-1 rounded-full bg-foreground shrink-0" />
            {item}
          </li>
        </SlideIn>
      ))}
    </ul>
  )
}

function StatCard({
  value,
  label,
  description,
  delay = 0,
}: {
  value: string
  label: string
  description?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      <Card className="h-full">
        <CardContent className="pt-6 pb-6 space-y-1">
          <p className="text-3xl font-bold tracking-tight">{value}</p>
          <p className="text-sm font-medium">{label}</p>
          {description && <p className="text-xs text-muted-foreground pt-0.5">{description}</p>}
        </CardContent>
      </Card>
    </motion.div>
  )
}

// ─── Section nav ─────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  { id: "context",   label: "Context" },
  { id: "timeline",  label: "Timeline" },
  { id: "problem-1", label: "Defining Behavior" },
  { id: "problem-2", label: "Evaluating & Improving" },
  { id: "impact",    label: "Impact" },
  { id: "synthesis", label: "Synthesis" },
]

function useSectionObserver(ids: string[]) {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [ids])

  return activeId
}

function CaseStudyNav() {
  const ids = NAV_SECTIONS.map((s) => s.id)
  const activeId = useSectionObserver(ids)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById("hero")
    if (!hero) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 },
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-1"
          aria-label="Page sections"
        >
          {NAV_SECTIONS.map(({ id, label }) => {
            const isActive = activeId === id
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="group flex items-center gap-2.5 py-1 text-left cursor-pointer"
                aria-current={isActive ? "location" : undefined}
              >
                <motion.span
                  animate={{
                    width: isActive ? 20 : 8,
                    backgroundColor: isActive
                      ? "oklch(0.205 0 0)"
                      : "oklch(0.708 0 0)",
                  }}
                  transition={{ duration: 0.2 }}
                  className="block h-px rounded-full shrink-0"
                />
                <motion.span
                  animate={{ opacity: isActive ? 1 : 0.35 }}
                  transition={{ duration: 0.2 }}
                  className="text-[11px] font-medium tracking-wide whitespace-nowrap text-foreground group-hover:opacity-100 transition-opacity"
                >
                  {label}
                </motion.span>
              </button>
            )
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

// ─── Page sections ────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="pt-24 pb-20 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="space-y-6"
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">UiPath</Badge>
          <Badge variant="outline">Agent Builder</Badge>
          <Badge variant="outline">Developer Tools</Badge>
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05]">
          AI Agent Builder
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Designing the tooling layer for defining, evaluating, and reliably operating AI agents inside real business workflows.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4"
      >
        {[
          { label: "Role", value: "Product Designer" },
          { label: "Company", value: "UiPath" },
          { label: "Focus", value: "Agent Builder · Dev Tools" },
          { label: "Scope", value: "0→1 · Platform" },
        ].map(({ label, value }) => (
          <div key={label} className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
            <p className="text-sm font-medium">{value}</p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

function ContextSection() {
  return (
    <section className="py-20 space-y-16">
      <SplitSection
        media="Platform / ecosystem diagram"
        content={
          <div className="space-y-6">
            <SectionLabel>Context</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              UiPath shifted from RPA to AI-native automation
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>Agents became the core building block for business process automation — but the platform lacked the tooling to support them.</p>
              <p>The work required defining agent behavior, evaluating performance, and ensuring reliability in production, all integrated across an existing enterprise ecosystem.</p>
            </div>
          </div>
        }
      />
    </section>
  )
}

function TimelineSection() {
  const phases = [
    {
      phase: "Phase 1",
      title: "Exploration",
      items: ["Ambiguous problem space", "Early prototypes", "Prompt-driven approach"],
    },
    {
      phase: "Phase 2",
      title: "Definition",
      items: ["Structured builder introduced", "Integrated into Studio IDE", "Improved control vs abstraction"],
    },
    {
      phase: "Phase 3",
      title: "Scaling",
      items: ["Agents embedded into workflows", "Evaluation + debugging expanded", "System prepared for production"],
    },
  ]

  return (
    <section className="py-20 space-y-12">
      <FadeIn>
        <SectionLabel>Timeline</SectionLabel>
      </FadeIn>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-border rounded-xl overflow-hidden">
        {phases.map(({ phase, title, items }, i) => (
          <SlideIn key={phase} delay={i * 0.1}>
            <div className={`p-8 space-y-4 ${i < phases.length - 1 ? "border-b sm:border-b-0 sm:border-r border-border" : ""}`}>
              <Badge variant="secondary">{phase}</Badge>
              <h3 className="font-semibold text-lg">{title}</h3>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-muted-foreground shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </SlideIn>
        ))}
      </div>
      <FadeIn delay={0.2}>
        <MediaPlaceholder label="Timeline / evolution diagram" aspect="wide" />
      </FadeIn>
    </section>
  )
}

function ProblemOneSection() {
  const evolutionPhases = [
    {
      phase: "Phase 1",
      title: "Form-based",
      items: ["Prompt + tools + playground", "Isolated experience"],
      media: "Form UI — early form-based agent builder (Figma)",
    },
    {
      phase: "Phase 2",
      title: "Structured Canvas",
      items: ["Agent node + components", "Improved prompting", "Trace introduced"],
      media: "Studio agent builder — structured canvas",
    },
    {
      phase: "Phase 3",
      title: "Embedded Workflow",
      items: ["Agents inside workflows", "Context propagation", "Multi-agent composition"],
      media: "Workflow with embedded agent",
    },
  ]

  return (
    <section className="py-20 space-y-20">
      <FadeIn>
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <SectionLabel>Problem 1</SectionLabel>
        </div>
        <h2 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">
          Defining Agent Behavior
        </h2>
      </FadeIn>

      {/* Problem */}
      <SplitSection
        media="Early form-based agent builder (Figma)"
        content={
          <div className="space-y-5">
            <SectionLabel>Problem</SectionLabel>
            <OutcomeList
              items={[
                "Behavior encoded in prompts with no structure",
                "Execution was opaque and hard to reason about",
                "Low developer trust in agent outcomes",
              ]}
            />
          </div>
        }
      />

      {/* Decision */}
      <div className="space-y-4">
        <FadeIn>
          <SectionLabel>Decision</SectionLabel>
        </FadeIn>
        <DecisionCallout from="Implicit behavior" to="Explicit behavior" />
        <DecisionCallout from="Prompt-driven" to="Structured system" />
        <FadeIn delay={0.1}>
          <MediaPlaceholder label="Structured agent canvas — decision point" />
        </FadeIn>
      </div>

      {/* Evolution */}
      <div className="space-y-12">
        <FadeIn>
          <SectionLabel>Evolution</SectionLabel>
        </FadeIn>
        {evolutionPhases.map(({ phase, title, items, media }, i) => (
          <div key={phase} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <SlideIn delay={0.05} className="space-y-4">
              <Badge variant="secondary">{phase}</Badge>
              <h3 className="text-xl font-semibold">{title}</h3>
              <OutcomeList items={items} />
            </SlideIn>
            <FadeIn delay={0.1 + i * 0.05}>
              <MediaPlaceholder label={media} />
            </FadeIn>
          </div>
        ))}
      </div>

      {/* Insight */}
      <div className="space-y-8">
        <FadeIn>
          <SectionLabel>Insight</SectionLabel>
        </FadeIn>
        <InsightCallout>
          Smaller, task-specific agents outperform large, generic ones.
        </InsightCallout>
        <FadeIn delay={0.1}>
          <MediaPlaceholder label="Composition vs monolith diagram" />
        </FadeIn>
      </div>

      {/* Outcome */}
      <SplitSection
        flip
        media="Final system / combined view"
        content={
          <div className="space-y-5">
            <SectionLabel>Outcome</SectionLabel>
            <OutcomeList
              items={[
                "Improved reliability in production",
                "Clearer mental model for builders",
                "Easier debugging and iteration",
                "Production-ready agent usage",
              ]}
            />
          </div>
        }
      />
    </section>
  )
}

function ProblemTwoSection() {
  const pillars = [
    {
      number: "01",
      title: "Evaluation System",
      items: ["Datasets (real + synthetic)", "Structured evaluation runs", "Compare outputs vs expected"],
      media: "Evaluation dataset + results view",
    },
    {
      number: "02",
      title: "Analysis & Guidance",
      items: ["Prompt / agent analysis", "Identify inconsistencies", "Suggest improvements"],
      media: "Analyzer / warnings / suggestions",
    },
    {
      number: "03",
      title: "Observability",
      items: ["Reasoning visibility", "Tool execution trace", "Timeline for async behavior"],
      media: "Advanced trace with reasoning + timeline",
    },
  ]

  return (
    <section className="py-20 space-y-20">
      <FadeIn>
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 rounded-full bg-orange-500" />
          <SectionLabel>Problem 2</SectionLabel>
        </div>
        <h2 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">
          Evaluating & Improving Agent Behavior
        </h2>
      </FadeIn>

      {/* Problem */}
      <SplitSection
        media="Unclear agent output / lack of evaluation signals"
        content={
          <div className="space-y-5">
            <SectionLabel>Problem</SectionLabel>
            <OutcomeList
              items={[
                "Non-deterministic behavior with no visibility",
                "Difficult to diagnose failures in production",
                "Trial-and-error iteration cycles",
                "Low confidence before shipping",
              ]}
            />
          </div>
        }
      />

      {/* Decision */}
      <div className="space-y-4">
        <FadeIn>
          <SectionLabel>Decision</SectionLabel>
        </FadeIn>
        <DecisionCallout from="Trial & Error" to="Structured Evaluation & Feedback" />
        <FadeIn delay={0.1}>
          <MediaPlaceholder label="Evaluation system overview" />
        </FadeIn>
      </div>

      {/* Pillars */}
      <div className="space-y-12">
        <FadeIn>
          <SectionLabel>Three pillars</SectionLabel>
        </FadeIn>
        {pillars.map(({ number, title, items, media }, i) => (
          <div key={number} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <SlideIn delay={0.05} className="space-y-4">
              <span className="text-4xl font-bold text-muted-foreground/30">{number}</span>
              <h3 className="text-xl font-semibold">{title}</h3>
              <OutcomeList items={items} />
            </SlideIn>
            <FadeIn delay={0.1}>
              <MediaPlaceholder label={media} />
            </FadeIn>
          </div>
        ))}
      </div>

      {/* Insight */}
      <div className="space-y-8">
        <FadeIn>
          <SectionLabel>Insight</SectionLabel>
        </FadeIn>
        <InsightCallout>
          Improving agent quality requires a tight feedback loop between execution, evaluation, and iteration.
        </InsightCallout>
        <FadeIn delay={0.1}>
          <MediaPlaceholder label="Feedback loop diagram" />
        </FadeIn>
      </div>

      {/* Outcome */}
      <SplitSection
        flip
        media="Improved results / evaluation improvement over time"
        content={
          <div className="space-y-5">
            <SectionLabel>Outcome</SectionLabel>
            <OutcomeList
              items={[
                "Faster iteration cycles for builders",
                "Improved agent quality at scale",
                "Increased confidence before production",
                "Higher production readiness rate",
              ]}
            />
          </div>
        }
      />
    </section>
  )
}

function ImpactSection() {
  return (
    <section className="py-20 space-y-14">
      <SectionHeader label="Impact & Outcomes" title="Moving agents from experimentation to production" />

      {/* Adoption */}
      <div className="space-y-4">
        <FadeIn>
          <SectionLabel>Adoption</SectionLabel>
        </FadeIn>
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            value="~2,400"
            label="Active builders"
            description="Users who created at least one agent"
            delay={0}
          />
          <StatCard
            value="~8,500"
            label="Agents created"
            description="Across all enterprise accounts"
            delay={0.08}
          />
        </div>
      </div>

      {/* Maturity & Production */}
      <div className="space-y-4">
        <FadeIn>
          <SectionLabel>Maturity & production</SectionLabel>
        </FadeIn>
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            value="~3,200"
            label="Agents evaluated"
            description="Using structured evaluation runs"
            delay={0}
          />
          <StatCard
            value="~1,100"
            label="Agents in production"
            description="Running in live business workflows"
            delay={0.08}
          />
        </div>
      </div>

      {/* Business impact */}
      <div className="space-y-4">
        <FadeIn>
          <SectionLabel>Business impact</SectionLabel>
        </FadeIn>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <FadeIn>
            <Card>
              <CardContent className="pt-6 pb-7 space-y-3">
                <p className="text-4xl font-bold tracking-tight">~$12M</p>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Incremental ARR</p>
                  <p className="text-xs text-muted-foreground">Growing enterprise pipeline driven by real-world agent use cases</p>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Card className="h-full">
              <CardContent className="pt-6 pb-7 space-y-3">
                <p className="text-4xl font-bold tracking-tight">3×</p>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Production conversion</p>
                  <p className="text-xs text-muted-foreground">Increase in agents moving from experimentation to production after evaluation tooling shipped</p>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

function SynthesisSection() {
  const shifts = [
    { from: "Implicit", to: "Explicit" },
    { from: "Trial & Error", to: "Structured" },
    { from: "Isolated", to: "Integrated" },
    { from: "Opaque", to: "Observable" },
  ]

  return (
    <section className="py-20 space-y-12">
      <SectionHeader label="Synthesis" title="The through-line" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {shifts.map(({ from, to }, i) => (
          <SlideIn key={from} delay={i * 0.08}>
            <div className="flex items-center gap-4 p-6 rounded-xl border border-border bg-card">
              <span className="text-muted-foreground line-through">{from}</span>
              <span className="text-muted-foreground">→</span>
              <span className="font-semibold">{to}</span>
            </div>
          </SlideIn>
        ))}
      </div>
      <FadeIn delay={0.2}>
        <MediaPlaceholder label="Synthesis matrix" aspect="wide" />
      </FadeIn>
    </section>
  )
}

function ClosingSection() {
  return (
    <section className="py-20 space-y-12">
      <Separator />
      <FadeIn className="space-y-8">
        <div className="space-y-4">
          <SectionLabel>Final Principle</SectionLabel>
          <blockquote className="space-y-1 text-2xl sm:text-3xl font-medium tracking-tight leading-snug">
            <p>Clarity over complexity.</p>
            <p className="text-muted-foreground">System thinking over features.</p>
            <p className="text-muted-foreground">Outcomes over artifacts.</p>
          </blockquote>
        </div>
        <MediaPlaceholder label="Minimal closing screen" aspect="wide" />
      </FadeIn>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProjectOne() {
  return (
    <PageTransition>
      <CaseStudyNav />
      <main className="max-w-5xl mx-auto px-6 sm:px-10">
        <div id="hero">
          <Hero />
        </div>
        <Separator />
        <div id="context"><ContextSection /></div>
        <Separator />
        <div id="timeline"><TimelineSection /></div>
        <Separator />
        <div id="problem-1"><ProblemOneSection /></div>
        <Separator />
        <div id="problem-2"><ProblemTwoSection /></div>
        <Separator />
        <div id="impact"><ImpactSection /></div>
        <div id="synthesis"><SynthesisSection /></div>
        <ClosingSection />
      </main>
    </PageTransition>
  )
}
