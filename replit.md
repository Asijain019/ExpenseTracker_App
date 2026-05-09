# Expense Tracker

A full-featured expense tracking web app with real backend auth, live currency conversion, charts, analytics, and a beautiful purple/violet UI.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/expense-tracker run dev` — run the frontend (uses PORT env var)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string, `SESSION_SECRET` — JWT signing secret

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Wouter (routing) + Tailwind + shadcn/ui + Recharts
- API: Express 5 + pino logging
- DB: PostgreSQL + Drizzle ORM
- Auth: JWT (jsonwebtoken) + bcryptjs password hashing
- Validation: Zod (`zod/v4`), react-hook-form, `drizzle-zod`
- Build: esbuild (CJS bundle)

## Where things live

- `lib/db/src/schema/` — DB schema: `users.ts`, `expenses.ts`, `index.ts`
- `artifacts/api-server/src/routes/` — auth.ts, expenses.ts, rates.ts, health.ts
- `artifacts/api-server/src/middlewares/auth.ts` — JWT middleware
- `artifacts/expense-tracker/src/lib/api.ts` — centralized API client (auth token storage)
- `artifacts/expense-tracker/src/pages/` — LandingPage, LoginPage, Dashboard, ExpensesPage, AnalyticsPage, SettingsPage
- `artifacts/expense-tracker/src/components/` — AppShell, AvatarDisplay, MiniCalendar, StatCard, ExpenseForm, ExpenseList, SummaryPanel, CurrencyConverter

## Architecture decisions

- JWT tokens stored in `localStorage` under keys `et_token` (JWT string) and `et_user` (JSON user object)
- JWT signed with `process.env.SESSION_SECRET || 'dev-secret'`, expires in 30 days
- All expense API routes require `Authorization: Bearer <token>` header, validated by `authMiddleware`
- Frontend API client in `src/lib/api.ts` automatically attaches the stored token to every request
- Avatar system: 12 built-in SVG cartoon avatars (IDs "1"–"12") + base64 photo upload support
- Currency conversion proxied through `/api/rates` to avoid CORS on external exchange rate API

## Product

- **Landing page**: Multi-section marketing page with hero, features, how-it-works, stats, testimonials, CTA
- **Auth**: Register/Login with JWT + Google mock picker + GitHub button. Full Sign Up form with validation.
- **Dashboard**: Stat cards (total/monthly spend, count, top category), quick-add form, recent expenses list, mini calendar with expense dots, currency converter, spend breakdown panel
- **Expenses**: Full filterable/sortable expenses table with category + date filters, CSV export with proper dates
- **Analytics**: Daily/Weekly/Monthly tab views, bar chart, pie chart, category breakdown, AI-style insights cards
- **Settings**: Avatar picker (12 SVGs + photo upload), profile form with API save, currency preference, CSV export, data clear

## User preferences

- Purple/violet color theme throughout
- "Expense Tracker" branding everywhere (not "SpendSmart")
- Green wallet logo at `/logo.png`

## Gotchas

- Always restart the API server workflow after backend code changes
- Run `pnpm --filter @workspace/db run push` after schema changes
- `pnpm --filter @workspace/expense-tracker run typecheck` to verify frontend (not `build` — build needs PORT env var)
- The `Expense.id` from the API is a number; frontend type uses `string | number` at runtime (TypeScript is satisfied)

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
