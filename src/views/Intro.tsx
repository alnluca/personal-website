import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { site } from "@/content/site"
import PageTransition from "@/components/PageTransition"

export default function Intro() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
        <motion.h1
          className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          {site.intro.greeting}
        </motion.h1>

        <motion.button
          onClick={() => navigate("/home")}
          className="absolute bottom-12 flex items-center justify-center w-12 h-12 rounded-full border border-border text-foreground hover:bg-accent transition-colors cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Enter site"
        >
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </main>
    </PageTransition>
  )
}
