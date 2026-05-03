import { Outlet } from "react-router-dom"
import Nav from "@/components/Nav"

export default function Layout() {
  return (
    <>
      <Nav />
      <div className="pt-16">
        <Outlet />
      </div>
    </>
  )
}
