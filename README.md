# CollabCode

A collaborative development platform where teams write code together in real time, with an AI assistant, chat and meetings in one workspace.

[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/boatnIretzv)

> **Status:** front-end prototype. The screens and interactions are built, but there is no backend yet. Sign-in and team data are kept in the browser's `localStorage`, and some views use sample data.

## Features

- **Landing page** introducing the platform
- **Auth screens:** sign in, sign up and forgot password, plus an onboarding flow
- **Workspace:** code editor, file explorer, terminal and console, live preview, design canvas, and chat and meeting panes side by side
- **AI assistant** page and an in-workspace AI helper
- **Dashboard, teams, messages, analytics, docs, support and settings** pages

## Tech stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS, shadcn/ui (Radix UI), lucide-react icons
- Framer Motion for animation

## Getting started

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000.

## Project structure

```
app/          routes: auth, onboarding, dashboard, workspace, teams, messages, ai-assistant, analytics, docs, support, settings
components/   workspace panes (editor, terminal, preview, chat, meeting, canvas), dashboard, modals and shadcn/ui components
hooks/, lib/  shared hooks and utilities
```

## v0 sync

This repository was created with [v0.dev](https://v0.dev) and can be kept in sync with the v0 project. Changes deployed from v0 are pushed here, and Vercel deploys the latest commit.

## License

[MIT](LICENSE)
