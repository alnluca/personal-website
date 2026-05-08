# personal-website

A password-protected portfolio and case study presentation built with React, Vite, and Tailwind CSS.

## Stack

- **React 19** + **TypeScript**
- **Vite 8** — dev server and build
- **Tailwind CSS v4** — utility-first styling
- **Framer Motion** — page transitions and scroll-driven animations
- **React Flow (@xyflow/react)** — interactive diagram for the feedback loop visualization
- **React Router v7** — client-side routing
- **shadcn/ui** — Badge, Card, Separator components
- **Lucide React** — icons

## Structure

```
src/
├── content/
│   └── site.ts          # All editable copy: name, intro greeting, nav, project list
├── views/
│   ├── Intro.tsx         # Landing screen (greeting)
│   ├── Home.tsx          # Hero screen
│   └── projects/
│       ├── CaseStudy.tsx # Agent Builder case study (main content)
│       └── ProjectTwo.tsx
├── components/
│   ├── Layout.tsx
│   ├── Nav.tsx
│   └── PageTransition.tsx
└── assets/media/         # All case study images
```

## Getting started

```bash
npm install
npm run dev
```

The site runs at `http://localhost:5173`.

## Password

All pages are behind a session-based password gate. The password is stored in `App.tsx` inside the `PasswordGate` component and resets on tab close (sessionStorage).

## Customizing content

Edit `src/content/site.ts` to change the intro greeting, hero name/role, and navigation links without touching any components.

## Deploy

Deployed on Vercel. Push to `main` triggers a production build via `tsc -b && vite build`.
