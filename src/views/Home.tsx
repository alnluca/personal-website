import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { site } from "@/content/site"
import PageTransition from "@/components/PageTransition"

export default function Home() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <main className="flex min-h-screen flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            I'm {site.hero.name}
          </motion.h1>

          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
          >
            {site.hero.role}
          </motion.p>

          <motion.p
            className="text-sm text-muted-foreground/60 tracking-wide uppercase"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          >
            {site.hero.focus}
          </motion.p>
        </div>

        <motion.button
          onClick={() => navigate("/projects/case-study")}
          className="absolute bottom-12 flex items-center justify-center w-12 h-12 rounded-full border border-border text-foreground hover:bg-accent transition-colors cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="View work"
        >
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </main>
    </PageTransition>
  )
}
