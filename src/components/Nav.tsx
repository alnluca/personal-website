import { NavLink } from "react-router-dom"
import { site } from "@/content/site"

export default function Nav() {
  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-1 px-2 py-2 rounded-full border border-border bg-background/80 backdrop-blur-sm shadow-sm">
        <NavLink
          to="/home"
          className="px-4 py-1.5 text-sm font-semibold text-foreground rounded-full"
        >
          {site.name}
        </NavLink>
        <div className="w-px h-4 bg-border mx-1" />
        {site.nav.map((link) => (
          <NavLink
            key={link.href}
            to={link.href}
            className={({ isActive }) =>
              `px-4 py-1.5 text-sm rounded-full transition-colors ${
                isActive
                  ? "bg-foreground text-background font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
