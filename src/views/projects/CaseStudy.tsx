import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect, Fragment } from "react"
import PageTransition from "@/components/PageTransition"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import heroImg from "@/assets/media/hero.png"
import phase1_1 from "@/assets/media/phase1-1-designer.png"
import phase1_2 from "@/assets/media/phase1-2-datasets.png"
import phase1_3 from "@/assets/media/phase1-3-evaluation-evals.png"
import phase1_4 from "@/assets/media/phase1-4-evaluation-runs.png"
import phase1_5 from "@/assets/media/phase1-5-traces.png"
import phase1_6 from "@/assets/media/phase1-6-trace-details.png"
import phase2_1 from "@/assets/media/phase2-1-canvas.png"
import phase2_2 from "@/assets/media/phase2-2-designer.png"
import phase2_3 from "@/assets/media/phase2-3-evaluation-datasets.png"
import phase2_4 from "@/assets/media/phase2-4-evaluation-runs.png"
import phase2_5 from "@/assets/media/phase2-5-evaluation-canvas.png"
import phase2_6 from "@/assets/media/phase2-6-trace.png"
import phase3_1 from "@/assets/media/phase3-1-canvas.png"
import phase3_2 from "@/assets/media/phase3-2-designer.png"
import phase3_3 from "@/assets/media/phase3-3-trace.png"
import earlyFormImg from "@/assets/media/early-form-based-agent-builder.png"
import structuredCanvasImg from "@/assets/media/structured-agent-canvas.png"
import heroPhase1Img from "@/assets/media/hero-phase1.png"
import compositionImg from "@/assets/media/composition.png"
import oo1 from "@/assets/media/operational-observability-1.png"
import oo2 from "@/assets/media/operational-observability-2.png"
import oo3 from "@/assets/media/operational-observability-3.png"
import oo4 from "@/assets/media/operational-observability-4.png"
import oo5 from "@/assets/media/operational-observability-5.png"
import oo6 from "@/assets/media/operational-observability-6.png"
import oo7 from "@/assets/media/operational-observability-7.png"
import oo8 from "@/assets/media/operational-observability-8.png"
import oo9 from "@/assets/media/operational-observability-9.png"

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

// ─── Carousel lightbox ────────────────────────────────────────────────────────

type Slide = { src: string; alt: string } | { placeholder: string }

function CarouselLightbox({
  slides,
  title,
  onClose,
}: {
  slides: Slide[]
  title: string
  onClose: () => void
}) {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((i) => (i - 1 + slides.length) % slides.length)
  const next = () => setCurrent((i) => (i + 1) % slides.length)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") setCurrent((i) => (i - 1 + slides.length) % slides.length)
      if (e.key === "ArrowRight") setCurrent((i) => (i + 1) % slides.length)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose, slides.length])

  const slide = slides[current]

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-background/92 backdrop-blur-md" />

      <motion.div
        className="relative z-10 flex flex-col gap-4 w-full"
        style={{ maxWidth: "min(1520px, 96vw)" }}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-1">
          <span className="text-sm font-medium">{title}</span>
          <span className="text-xs text-muted-foreground tabular-nums">{current + 1} / {slides.length}</span>
        </div>

        {/* Slide area — 16:9 aspect ratio matching 1920×1080 source images */}
        <div className="relative rounded-xl border border-border bg-muted/20 overflow-hidden aspect-video">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {"src" in slide ? (
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground">
                  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="opacity-30">
                    <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M5 9l2-2 2 2 2-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="4.5" cy="6.5" r="0.75" fill="currentColor" />
                  </svg>
                  <span className="text-xs text-center px-6 max-w-xs leading-snug">{slide.placeholder}</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next arrows */}
          {slides.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-border bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Previous"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-border bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Next"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Dot indicators */}
        {slides.length > 1 && (
          <div className="flex justify-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="cursor-pointer"
                aria-label={`Go to slide ${i + 1}`}
              >
                <motion.span
                  animate={{ width: i === current ? 20 : 6, opacity: i === current ? 1 : 0.3 }}
                  transition={{ duration: 0.2 }}
                  className="block h-1 rounded-full bg-foreground"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full border border-border bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        aria-label="Close preview"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </motion.div>
  )
}

// ─── Placeholder ──────────────────────────────────────────────────────────────

function MediaPlaceholder({ label, aspect = "video" }: { label: string; aspect?: "video" | "wide" | "square" }) {
  const aspectClass = aspect === "wide" ? "aspect-[21/9]" : aspect === "square" ? "aspect-square" : "aspect-video"
  return (
    <div className="space-y-2">
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
      <p className="text-xs text-muted-foreground/50 text-center leading-snug">{label}</p>
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
    <section className="h-dvh flex flex-col py-16" style={{ overflow: "visible" }}>

      {/* Center group */}
      <div className="flex-1 flex flex-col items-center justify-center gap-10" style={{ overflow: "visible" }}>
        <div className="space-y-4 text-center">
          <motion.h1
            style={{ fontSize: "clamp(52px, 7vw, 108px)", lineHeight: 1.02 }}
            className="font-semibold tracking-tight"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Agent Builder
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          >
            Designing the tooling layer for defining, evaluating, and reliably operating AI agents inside real business workflows.
          </motion.p>
        </div>

        <motion.div
          className="w-full"
          style={{ overflow: "visible" }}
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div style={{ perspective: "1200px", overflow: "visible" }}>
            <div style={{ transform: "rotateX(18deg)", overflow: "visible" }}>
              <div style={{ transform: "skewX(0.32rad)", overflow: "visible" }}>
                <img
                  src={heroImg}
                  alt="Agent Builder interface"
                  className="w-full h-auto rounded-t-xl border border-border border-b-0"
                  style={{ maskImage: "linear-gradient(to bottom, black 35%, transparent 100%)" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom — meta + scroll hint */}
      <motion.div
        className="space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { label: "Role",    value: "Product Designer" },
            { label: "Company", value: "UiPath" },
            { label: "Focus",   value: "Agent Builder · Dev Tools" },
            { label: "Scope",   value: "0→1 · Platform" },
          ].map(({ label, value }) => (
            <div key={label} className="space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
              <p className="text-sm font-medium">{value}</p>
            </div>
          ))}
        </div>

        <motion.div
          className="flex justify-center"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-muted-foreground/50">
            <path d="M10 4v12M4 10l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>

    </section>
  )
}

function ContextSection() {
  return (
    <section className="py-20">
      <FadeIn className="max-w-2xl space-y-6">
        <SectionLabel>Context</SectionLabel>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          UiPath shifted from RPA to AI-native automation
        </h2>
        <div className="space-y-3 text-muted-foreground">
          <p>Agents became the core building block for business process automation — but the platform lacked the tooling to support them.</p>
          <p>The work required defining agent behavior, evaluating performance, and ensuring reliability in production, all integrated across an existing enterprise ecosystem.</p>
        </div>
      </FadeIn>
    </section>
  )
}

const MILESTONES = [
  { date: "Dec '24", quarter: "Q4 2024", label: "Private\nPreview" },
  { date: "Feb '25", quarter: "Q1 2025", label: "Controlled\nGA" },
  { date: "May '25", quarter: "Q2 2025", label: "General\nAvailability" },
  { date: "Nov '25", quarter: "Q4 2025", label: "Conversational\nAgents GA" },
  { date: "May '26", quarter: "Q2 2026", label: "Agents in Flow\nPublic Preview" },
]
const GHOST_COUNT = 3

function ReleaseTimeline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const totalCols = MILESTONES.length + GHOST_COUNT

  return (
    <div ref={ref} className="relative select-none">

      {/* Label row */}
      <div className="flex mb-4">
        {MILESTONES.map((m, i) => (
          <motion.div
            key={m.date}
            className="text-center px-0.5"
            style={{ width: `${100 / totalCols}%` }}
            initial={{ opacity: 0, y: -6 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05 + i * 0.07, duration: 0.4, ease: "easeOut" }}
          >
            {m.label.split("\n").map((line, j) => (
              <p key={j} className={`text-sm font-medium leading-snug ${j > 0 ? "text-muted-foreground" : ""}`}>
                {line}
              </p>
            ))}
          </motion.div>
        ))}
        {Array.from({ length: GHOST_COUNT }).map((_, i) => (
          <div key={i} style={{ width: `${100 / totalCols}%` }} />
        ))}
      </div>

      {/* Dot + line row */}
      <div className="relative flex items-center py-3">
        {/* Line */}
        <div className="absolute inset-y-1/2 left-0 right-0 h-px bg-border -translate-y-px" />

        {/* Real dots */}
        {MILESTONES.map((m, i) => (
          <motion.div
            key={m.date}
            className="flex justify-center relative z-10"
            style={{ width: `${100 / totalCols}%` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.15 + i * 0.09, duration: 0.35, type: "spring", stiffness: 300 }}
          >
            <div className={`rounded-full border-2 border-background bg-foreground ${
              i === MILESTONES.length - 1 ? "w-4 h-4 ring-2 ring-foreground/20" : "w-3.5 h-3.5"
            }`} />
          </motion.div>
        ))}

        {/* Ghost dots */}
        {Array.from({ length: GHOST_COUNT }).map((_, i) => (
          <motion.div
            key={`ghost-${i}`}
            className="flex justify-center relative z-10"
            style={{ width: `${100 / totalCols}%` }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.18 - i * 0.05 } : {}}
            transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
          >
            <div className="w-3 h-3 rounded-full bg-muted-foreground" />
          </motion.div>
        ))}

        {/* Right gradient fade */}
        <div
          className="absolute right-0 top-0 bottom-0 pointer-events-none z-20"
          style={{ width: `${(GHOST_COUNT / totalCols) * 100 + 4}%`, background: "linear-gradient(to right, transparent, var(--background) 80%)" }}
        />
      </div>

      {/* Date row */}
      <div className="flex mt-3">
        {MILESTONES.map((m, i) => (
          <motion.div
            key={m.date}
            className="text-center px-0.5"
            style={{ width: `${100 / totalCols}%` }}
            initial={{ opacity: 0, y: 6 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.05 + i * 0.07, duration: 0.4, ease: "easeOut" }}
          >
            <p className="text-xs text-muted-foreground font-medium">{m.date}</p>
            <p className="text-[11px] text-muted-foreground/50">{m.quarter}</p>
          </motion.div>
        ))}
        {Array.from({ length: GHOST_COUNT }).map((_, i) => (
          <div key={i} style={{ width: `${100 / totalCols}%` }} />
        ))}
      </div>
    </div>
  )
}

function TimelineSection() {
  const phases = [
    {
      phase: "Phase 1",
      year: "2024",
      title: "Exploration",
      items: ["Ambiguous problem space", "Early prototypes & PoC", "Simple prompt-driven approach"],
      img: phase1_1,
      slides: [
        { src: phase1_1, alt: "Phase 1 — Designer" },
        { src: phase1_2, alt: "Phase 1 — Datasets" },
        { src: phase1_3, alt: "Phase 1 — Evaluation: Evals" },
        { src: phase1_4, alt: "Phase 1 — Evaluation: Runs" },
        { src: phase1_5, alt: "Phase 1 — Traces" },
        { src: phase1_6, alt: "Phase 1 — Trace details" },
      ] as Slide[],
    },
    {
      phase: "Phase 2",
      year: "2025",
      title: "Definition",
      items: ["Structured builder introduced", "Integrated into Studio IDE", "Improved control vs abstraction"],
      img: phase2_1,
      slides: [
        { src: phase2_1, alt: "Phase 2 — Canvas" },
        { src: phase2_2, alt: "Phase 2 — Designer" },
        { src: phase2_3, alt: "Phase 2 — Evaluation: Datasets" },
        { src: phase2_4, alt: "Phase 2 — Evaluation: Runs" },
        { src: phase2_5, alt: "Phase 2 — Evaluation: Canvas" },
        { src: phase2_6, alt: "Phase 2 — Trace" },
      ] as Slide[],
    },
    {
      phase: "Phase 3",
      year: "2026",
      title: "Scaling",
      items: ["Agents embedded into workflows", "Expanded and curated capabilities", "System optimized for production"],
      img: phase3_1,
      slides: [
        { src: phase3_1, alt: "Phase 3 — Canvas" },
        { src: phase3_2, alt: "Phase 3 — Designer" },
        { src: phase3_3, alt: "Phase 3 — Trace" },
      ] as Slide[],
    },
  ]

  const [lightbox, setLightbox] = useState<{ slides: Slide[]; title: string } | null>(null)

  return (
    <section className="py-20 space-y-16">
      <FadeIn>
        <SectionLabel>Timeline</SectionLabel>
      </FadeIn>

      {/* Release timeline — first */}
      <FadeIn className="space-y-5">
        <SectionLabel>Releases</SectionLabel>
        <ReleaseTimeline />
      </FadeIn>

      {/* Design phase screenshots — second */}
      <div className="space-y-5">
        <FadeIn><SectionLabel>Design phases</SectionLabel></FadeIn>
        <div className="grid grid-cols-3 gap-4">
          {phases.map(({ phase, year, title, items, img, slides }, i) => (
            <SlideIn key={phase} delay={i * 0.1} className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{phase}</Badge>
                <span className="text-sm text-muted-foreground">{title}</span>
                <span className="ml-auto text-xs text-muted-foreground/50 tabular-nums">{year}</span>
              </div>
              <button
                className="block w-full cursor-zoom-in rounded-xl overflow-hidden border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => setLightbox({ slides, title: `${phase} — ${title}` })}
                aria-label={`Preview ${phase} — ${title}`}
              >
                <img
                  src={img}
                  alt={`${phase} — ${title}`}
                  className="w-full h-auto hover:scale-[1.02] transition-transform duration-300"
                />
              </button>
              <ul className="space-y-1.5 pt-1">
                {items.map((item) => (
                  <li key={item} className="text-xs text-muted-foreground flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-muted-foreground/60 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </SlideIn>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <CarouselLightbox
            slides={lightbox.slides}
            title={lightbox.title}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function ProblemOneSection() {
  const [lightbox, setLightbox] = useState<{ slides: Slide[]; title: string } | null>(null)

  const evolutionPhases = [
    {
      phase: "Phase 1",
      title: "Form-based",
      items: ["Prompt + tools + playground", "Isolated experience"],
      media: "Form UI — early form-based agent builder",
      img: heroPhase1Img,
    },
    {
      phase: "Phase 2",
      title: "Structured Canvas",
      items: ["Agent node + components", "Improved prompting", "Trace introduced"],
      media: "Studio agent builder — structured canvas",
      img: phase2_2,
    },
    {
      phase: "Phase 3",
      title: "Embedded Workflow",
      items: ["Agents inside workflows", "Context propagation", "Multi-agent composition"],
      media: "Workflow with embedded agent",
      img: phase3_2,
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        <FadeIn>
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
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="space-y-2">
            <button
              className="block w-full cursor-zoom-in rounded-xl overflow-hidden border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => setLightbox({ slides: [{ src: earlyFormImg, alt: "Early form-based agent builder" }], title: "Early form-based agent builder" })}
              aria-label="Preview — Early form-based agent builder"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={earlyFormImg}
                  alt="Early form-based agent builder"
                  className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </button>
            <p className="text-xs text-muted-foreground/50 text-center leading-snug">Early form-based agent builder</p>
          </div>
        </FadeIn>
      </div>

      {/* Decision */}
      <div className="space-y-4">
        <FadeIn>
          <SectionLabel>Decision</SectionLabel>
        </FadeIn>
        <DecisionCallout from="Implicit behavior" to="Explicit behavior" />
        <DecisionCallout from="Prompt-driven" to="Structured system" />
        <FadeIn delay={0.1}>
          <div className="space-y-2">
            <button
              className="block w-full cursor-zoom-in rounded-xl overflow-hidden border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => setLightbox({ slides: [{ src: structuredCanvasImg, alt: "Structured agent canvas" }], title: "Structured agent canvas" })}
              aria-label="Preview — Structured agent canvas"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={structuredCanvasImg}
                  alt="Structured agent canvas"
                  className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </button>
            <p className="text-xs text-muted-foreground/50 text-center leading-snug">Structured agent canvas</p>
          </div>
        </FadeIn>
      </div>

      {/* Evolution */}
      <div className="space-y-12">
        <FadeIn>
          <SectionLabel>Evolution</SectionLabel>
        </FadeIn>
        {evolutionPhases.map(({ phase, title, items, media, img }, i) => (
          <div key={phase} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <SlideIn delay={0.05} className="space-y-4">
              <Badge variant="secondary">{phase}</Badge>
              <h3 className="text-xl font-semibold">{title}</h3>
              <OutcomeList items={items} />
            </SlideIn>
            <FadeIn delay={0.1 + i * 0.05}>
              {img ? (
                <div className="space-y-2">
                  <button
                    className="block w-full cursor-zoom-in rounded-xl overflow-hidden border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    onClick={() => setLightbox({ slides: [{ src: img, alt: media }], title: media })}
                    aria-label={`Preview — ${media}`}
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <img src={img} alt={media} className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-300" />
                    </div>
                  </button>
                  <p className="text-xs text-muted-foreground/50 text-center leading-snug">{media}</p>
                </div>
              ) : (
                <MediaPlaceholder label={media} />
              )}
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
          <div className="space-y-2">
            <button
              className="block w-full cursor-zoom-in rounded-xl overflow-hidden border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => setLightbox({ slides: [{ src: compositionImg, alt: "Composition" }], title: "Composition" })}
              aria-label="Preview — Composition"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={compositionImg}
                  alt="Composition"
                  className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </button>
            <p className="text-xs text-muted-foreground/50 text-center leading-snug">Composition</p>
          </div>
        </FadeIn>
      </div>

      {/* Outcome */}
      <FadeIn>
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
      </FadeIn>

      <AnimatePresence>
        {lightbox && (
          <CarouselLightbox
            slides={lightbox.slides}
            title={lightbox.title}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function FeedbackLoopDiagram() {
  const nodes = ["Design", "Debug & Inspect", "Evaluate", "Deploy", "Monitor"]
  const n = nodes.length
  const centers = nodes.map((_, i) => ((i + 0.5) / n) * 100)

  // viewBox is 0 0 100 100; svgH maps to pixel height of the bracket zone
  const BT_DEPTH = 38   // build-time bracket floor
  const PF_DEPTH = 78   // production feedback bracket floor
  const svgH = 104

  // Build-time: FROM Evaluate (2) → TO Design (0), full height back to node level (y=3)
  const btFrom = centers[2]   // 50
  const btTo   = centers[0]   // 10

  // Production: FROM Monitor (4) → terminates at midpoint of build-time bracket, rises to BT_DEPTH
  const pfFrom  = centers[4]              // 90
  const pfTo    = (btFrom + btTo) / 2    // 30 — midpoint of build-time horizontal

  const btLabelLeft = (btFrom + btTo) / 2    // 30
  const pfLabelLeft = (pfFrom + pfTo) / 2    // 60

  return (
    <div className="rounded-xl border border-border bg-card/30 p-6 space-y-3 select-none">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        From trial &amp; error to structured improvement
      </p>

      {/* Node row with → forward-flow arrows */}
      <div className="flex items-center">
        {nodes.map((label, i) => (
          <Fragment key={label}>
            <div className="flex-1 min-w-0 rounded-lg border border-border bg-background/80 px-2 py-2.5 flex items-center justify-center">
              <p className="text-[10px] font-semibold leading-tight text-center">{label}</p>
            </div>
            {i < nodes.length - 1 && (
              <div className="flex-shrink-0 w-4 flex items-center justify-center">
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none" className="text-muted-foreground/30">
                  <path d="M0 3.5h6.5M4.5 1.5l2 2-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </Fragment>
        ))}
      </div>

      {/* Bracket zone */}
      <div className="relative" style={{ height: svgH }}>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Build-time loop (gray):
              M Improve,top → down to BT_DEPTH → left to Design → up to top */}
          <path
            d={`M ${btFrom} 3 L ${btFrom} ${BT_DEPTH} L ${btTo} ${BT_DEPTH} L ${btTo} 3`}
            fill="none"
            stroke="oklch(0.5 0 0 / 0.45)"
            strokeWidth="1.5"
            strokeLinejoin="miter"
            vectorEffect="non-scaling-stroke"
          />
          {/* Arrowhead: pointing up at Design */}
          <path
            d={`M ${btTo - 1.1} 6.5 L ${btTo} 3 L ${btTo + 1.1} 6.5`}
            fill="none"
            stroke="oklch(0.5 0 0 / 0.45)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />

          {/* Production feedback (indigo):
              M Monitor,top → down to PF_DEPTH → left to Evaluate → up to BT_DEPTH only */}
          <path
            d={`M ${pfFrom} 3 L ${pfFrom} ${PF_DEPTH} L ${pfTo} ${PF_DEPTH} L ${pfTo} ${BT_DEPTH}`}
            fill="none"
            stroke="oklch(0.55 0.15 264 / 0.6)"
            strokeWidth="1.5"
            strokeLinejoin="miter"
            vectorEffect="non-scaling-stroke"
          />
          {/* Arrowhead: pointing up at midpoint of build-time bracket, terminating at BT_DEPTH */}
          <path
            d={`M ${pfTo - 1.1} ${BT_DEPTH + 1.5} L ${pfTo} ${BT_DEPTH} L ${pfTo + 1.1} ${BT_DEPTH + 1.5}`}
            fill="none"
            stroke="oklch(0.55 0.15 264 / 0.6)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Labels — HTML so they don't distort under non-uniform SVG x/y scaling */}
        <span
          className="absolute text-[9px] font-medium leading-none whitespace-nowrap text-muted-foreground/60"
          style={{ left: `${btLabelLeft}%`, top: (BT_DEPTH / 100) * svgH + 4, transform: "translateX(-50%)" }}
        >
          build-time loop
        </span>
        <span
          className="absolute text-[9px] font-medium leading-none whitespace-nowrap"
          style={{
            left: `${pfLabelLeft}%`,
            top: (PF_DEPTH / 100) * svgH + 4,
            transform: "translateX(-50%)",
            color: "oklch(0.55 0.15 264 / 0.85)",
          }}
        >
          production feedback
        </span>
      </div>
    </div>
  )
}

function ProblemTwoSection() {
  const [lightbox, setLightbox] = useState<{ slides: Slide[]; title: string } | null>(null)

  const ooSlides = [oo1, oo2, oo3, oo4, oo5, oo6, oo7, oo8, oo9].map((src, i) => ({
    src,
    alt: `Operational Observability ${i + 1}`,
  }))

  const pillars: {
    number: string
    title: string
    items: string[]
    media: string
    thumbnail?: string
    slides?: { src: string; alt: string }[]
  }[] = [
    {
      number: "01",
      title: "Evaluation System",
      items: ["Real and synthetic datasets", "Structured evaluation runs", "Compare outputs against expected behavior"],
      media: "Evaluation dataset + evaluation results view",
    },
    {
      number: "02",
      title: "Analysis & Tracing",
      items: ["Prompt and agent analysis", "Tool execution tracing", "Timeline for asynchronous behavior"],
      media: "Prompt / agent analyzer with warnings or suggestions",
    },
    {
      number: "03",
      title: "Operational Observability",
      items: ["Monitor agent behavior in production", "Detect anomalies and execution issues", "Establish operational feedback loops"],
      media: "Production monitoring / instance management view",
      thumbnail: oo1,
      slides: ooSlides,
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        <FadeIn>
          <div className="space-y-5">
            <SectionLabel>Problem</SectionLabel>
            <OutcomeList
              items={[
                "Non-deterministic behavior with limited visibility",
                "Difficult to diagnose failures before and after deployment",
                "Trial-and-error iteration cycles",
                "Low confidence before shipping agents to production",
              ]}
            />
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div className="space-y-2">
            <button
              className="block w-full cursor-zoom-in rounded-xl overflow-hidden border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => setLightbox({ slides: [{ src: phase1_5, alt: "Simple aggregated outputs and lack of observability" }], title: "Simple aggregated outputs and lack of observability" })}
              aria-label="Preview — Simple aggregated outputs and lack of observability"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={phase1_5}
                  alt="Simple aggregated outputs and lack of observability"
                  className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </button>
            <p className="text-xs text-muted-foreground/50 text-center leading-snug">Simple aggregated outputs and lack of observability</p>
          </div>
        </FadeIn>
      </div>

      {/* Decision */}
      <div className="space-y-4">
        <FadeIn>
          <SectionLabel>Decision</SectionLabel>
        </FadeIn>
        <DecisionCallout from="Manual iteration" to="Structured evaluation, analysis, and operational visibility" />
      </div>

      {/* Pillars */}
      <div className="space-y-12">
        <FadeIn>
          <SectionLabel>Three pillars</SectionLabel>
        </FadeIn>
        {pillars.map(({ number, title, items, media, thumbnail, slides }, i) => (
          <div key={number} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <SlideIn delay={0.05} className="space-y-4">
              <span className="text-4xl font-bold text-muted-foreground/30">{number}</span>
              <h3 className="text-xl font-semibold">{title}</h3>
              <OutcomeList items={items} />
            </SlideIn>
            <FadeIn delay={0.1}>
              {thumbnail && slides ? (
                <div className="space-y-2">
                  <button
                    className="block w-full cursor-zoom-in rounded-xl overflow-hidden border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    onClick={() => setLightbox({ slides, title })}
                    aria-label={`Preview — ${title}`}
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={thumbnail}
                        alt={title}
                        className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-300"
                      />
                    </div>
                  </button>
                  <p className="text-xs text-muted-foreground/50 text-center leading-snug">{media}</p>
                </div>
              ) : (
                <MediaPlaceholder label={media} />
              )}
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
          Improving agent quality requires a tight feedback loop between execution, evaluation, analysis, and production behavior.
        </InsightCallout>
        <FadeIn delay={0.1}>
          <FeedbackLoopDiagram />
        </FadeIn>
      </div>

      {/* Outcome */}
      <FadeIn>
        <div className="space-y-5">
          <SectionLabel>Outcome</SectionLabel>
          <OutcomeList
            items={[
              "Faster iteration",
              "Better agent quality",
              "Increased confidence before deployment",
              "Stronger production readiness",
            ]}
          />
        </div>
      </FadeIn>

      <AnimatePresence>
        {lightbox && (
          <CarouselLightbox
            slides={lightbox.slides}
            title={lightbox.title}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
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
            value="5.9K"
            label="Monthly active builders"
            description="Users actively building and iterating on agents"
            delay={0}
          />
          <StatCard
            value="100k+"
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
            value="15%"
            label="Moved to production"
            description="Running in live business workflows"
            delay={0.08}
          />
          <StatCard
            value="710"
            label="Active accounts"
            description="Organizations actively using agents in live workflows"
            delay={0}
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
                <p className="text-4xl font-bold tracking-tight">$30M+</p>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Incremental ARR</p>
                  <p className="text-xs text-muted-foreground">Reached and exceeded initial quarterly targets</p>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Card className="h-full">
              <CardContent className="pt-6 pb-7 space-y-3">
                <div className="flex items-baseline gap-2">
                  <p className="text-4xl font-bold tracking-tight">&lt;1.3 days</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Time to production</p>
                  <p className="text-xs text-muted-foreground">Reduced average deployment time from 10+ days</p>
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
      <InsightCallout>
        "The goal wasn't just to build agents, but to create the systems required to build and operate them reliably at scale."
      </InsightCallout>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {shifts.map(({ from, to }, i) => (
          <SlideIn key={from} delay={i * 0.08}>
            <div className="flex items-center gap-3 p-5 rounded-xl border border-border bg-card">
              <span className="text-muted-foreground">{from}</span>
              <span className="text-muted-foreground/40 text-sm">→</span>
              <span className="font-semibold">{to}</span>
            </div>
          </SlideIn>
        ))}
      </div>
    </section>
  )
}

function ClosingSection() {
  return (
    <section className="py-20 space-y-12">
      <Separator />
      <FadeIn>
        <div className="space-y-6">
          <SectionLabel>Final Principles</SectionLabel>
          <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
            Building reliable agent systems required balancing flexibility, visibility, and operational trust across the entire workflow lifecycle.
          </p>
          <blockquote className="space-y-1 text-2xl sm:text-3xl font-medium tracking-tight leading-snug">
            <p>Clarity over ambiguity.</p>
            <p className="text-muted-foreground">Systems over isolated features.</p>
            <p className="text-muted-foreground">Outcomes over artifacts.</p>
          </blockquote>
        </div>
      </FadeIn>
    </section>
  )
}

function QuestionsSection() {
  return (
    <section className="relative mt-20 mb-20 overflow-hidden rounded-xl">
      {/* Image — natural aspect ratio, not stretched */}
      <img
        src={heroImg}
        alt=""
        aria-hidden
        className="w-full h-auto block"
        style={{ filter: "blur(4px)", opacity: 0.9 }}
      />
      {/* Soft veil for text legibility */}
      <div className="absolute inset-0 bg-background/55" />

      {/* Text content — centered over image */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      >
        <h2 className="text-4xl sm:text-6xl font-semibold tracking-tight">
          Questions &amp; Discussion
        </h2>
        <p className="text-base text-muted-foreground max-w-md leading-relaxed">
          Happy to go deeper into the system, process, or decisions behind the work.
        </p>
      </motion.div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CaseStudy() {
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
        <QuestionsSection />
      </main>
    </PageTransition>
  )
}
