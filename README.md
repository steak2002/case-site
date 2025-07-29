# Project Overview

## Tech Stack

- **Frontend**: Next.js, React, Chakra UI, Framer Motion, Zustand
- **Backend**: Supabase
- **Testing**: Vitest, React Testing Library
- **Language**: TypeScript
- **Deployment**: Vercel

## File Structure

- **public/**: Static assets (images, fonts, icons, etc.)
- **src/**
    - **app/**: Next.js App Router pages and layouts
        - `layout.tsx`: Root layout
        - `page.tsx`: Root page
        - `head.tsx`: Head metadata
        - *(other route folders, e.g. `dashboard/`, `about/`, ...)*
    - **features/**: Feature modules (frontend logic & UI)
        - `feature1/`
            - `model/`: Zustand stores, services, types, tests
                - `store.ts`
                - `service.ts`
                - `types.ts`
                - `store.test.ts`
            - `ui/`: Components, page wrappers, styles
                - `Feature1Page.tsx`
                - `Feature1Component.tsx`
            - `index.ts`: Barrel exports for easy imports
        - `feature2/`
        - ...
    - **shared/**: Shared UI, hooks, utils used across features
        - `components/`: Reusable components (Button, Modal, etc.)
        - `hooks/`: Custom hooks
        - `utils/`: Utility functions/helpers
        - `styles/`: Shared styles/themes
        - `types.ts`: Global TypeScript types
    - **api/**: Next.js API routes (route handlers)
        - `someModule/`
            - `contract.ts`: Request/response types, validation schemas
            - `routes.ts`: API route handlers (e.g., GET, POST)
            - `index.ts`: Barrel exports
        - `index.ts`: General API exports if needed
    - **backend/**: Backend-only logic (business/data layer)
        - `someService/`
            - `repository.ts`: DB or external API interaction
            - `service.ts`: Business logic / service layer
            - `types.ts`: Types/interfaces specific to backend
            - `test.ts`: Unit tests
            - `index.ts`: Barrel exports
        - `shared/`: Shared backend utilities & types
- `.env.local`: Environment variables
- `.gitignore`: Git ignore file
- `.eslintrc.json`: ESLint config
- `next.config.js`: Next.js config
- `next-env.d.ts`: TypeScript environment definitions
- `tsconfig.json`: TypeScript config with paths for aliases
- `yarn.lock` / `package-lock.json`


## Boilerplate
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
