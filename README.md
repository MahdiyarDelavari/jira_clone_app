# Jira Clone App

A Jira-inspired project management app built with Next.js 14, Appwrite, Hono, React Query, and Tailwind CSS.

## Features

- Authentication with email/password and OAuth
- Workspace creation and member management
- Project creation and editing
- Task management with table, kanban, and calendar views
- Analytics for workspaces and projects
- Invite links for joining workspaces

## Tech Stack

- Next.js 14 App Router
- TypeScript
- Appwrite
- Hono
- TanStack Query
- Tailwind CSS
- shadcn/ui

## Environment Variables

Create a `.env.local` file based on `.env.example` and provide these values:

```env
NEXT_PUBLIC_APP_URL=

NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT=

NEXT_PUBLIC_APPWRITE_DATABASE_ID=
NEXT_PUBLIC_APPWRITE_WORKSPACES_ID=
NEXT_PUBLIC_APPWRITE_MEMBERS_ID=
NEXT_PUBLIC_APPWRITE_PROJECTS_ID=
NEXT_PUBLIC_APPWRITE_TASKS_ID=
NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID=

NEXT_APPWRITE_KEY=
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
src/
  app/          Next.js routes and layouts
  components/   Shared UI and layout components
  features/     Feature modules such as auth, workspaces, projects, tasks
  hooks/        Shared React hooks
  lib/          Appwrite, RPC, OAuth, and utilities
```

## Notes

- This project depends on an Appwrite backend with matching collections and bucket IDs.
- Production build has already been validated locally with `npm run build`.
