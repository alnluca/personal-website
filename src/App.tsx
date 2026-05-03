import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { site } from "@/content/site"
import Layout from "@/components/Layout"
import Intro from "@/views/Intro"
import Home from "@/views/Home"
import ProjectOne from "@/views/projects/ProjectOne"
import ProjectTwo from "@/views/projects/ProjectTwo"

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
          <Route path="/projects/project-one" element={<ProjectOne />} />
          <Route path="/projects/project-two" element={<ProjectTwo />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
