import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { site } from "@/content/site"
import Layout from "@/components/Layout"
import Intro from "@/views/Intro"
import Home from "@/views/Home"
import CaseStudy from "@/views/projects/CaseStudy"
import ProjectTwo from "@/views/projects/ProjectTwo"

function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("authed") === "1")
  const [value, setValue] = useState("")
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  if (authed) return <>{children}</>

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value === "rong") {
      sessionStorage.setItem("authed", "1")
      setAuthed(true)
    } else {
      setError(true)
      setValue("")
      inputRef.current?.focus()
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <motion.div
        className="flex flex-col items-center gap-8 w-full max-w-[320px]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="text-center space-y-1">
          <p className="text-sm font-medium text-foreground">Protected</p>
          <p className="text-xs text-muted-foreground">Enter the password to continue</p>
        </div>

        <form onSubmit={submit} className="w-full space-y-3">
          <div className="relative">
            <input
              ref={inputRef}
              type="password"
              value={value}
              onChange={e => { setValue(e.target.value); setError(false) }}
              placeholder="••••••••"
              className={`w-full px-4 py-3 rounded-xl border bg-muted/40 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-colors placeholder:text-muted-foreground/30 ${error ? "border-destructive focus:ring-destructive/40" : "border-border"}`}
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                className="text-xs text-destructive text-center"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                Incorrect password
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 active:scale-[0.98] transition-all cursor-pointer"
          >
            Continue
          </button>
        </form>
      </motion.div>
    </main>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            site.intro.enabled ? <Intro /> : <Navigate to="/home" replace />
          }
        />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/projects/case-study" element={<CaseStudy />} />
          <Route path="/projects/project-two" element={<ProjectTwo />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <PasswordGate>
        <AnimatedRoutes />
      </PasswordGate>
    </BrowserRouter>
  )
}
