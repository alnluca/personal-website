import { motion } from "framer-motion"
import { site } from "@/content/site"
import PageTransition from "@/components/PageTransition"

export default function Home() {
  return (
    <PageTransition>
      <main className="flex min-h-screen flex-col items-center justify-center px-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <motion.h1
            className="font-bold tracking-tight text-foreground"
            style={{ fontSize: "clamp(100px, 18vw, 240px)", lineHeight: 1 }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            {site.hero.name}
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
      </main>
    </PageTransition>
  )
}
