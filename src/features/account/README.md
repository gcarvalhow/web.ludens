# Account

Feature responsável pelos fluxos de autenticação e conta do usuário.

## Responsabilidades

- Login
- Registro
- Recuperação de senha
- Redefinição de senha
- Sessão autenticada
- Refresh de access token
- Logout
- Consulta do usuário autenticado
- Proteção de conteúdo autenticado

## Estrutura

- `components/`: orchestration (`*FormContainer.tsx` — liga hook + mutation +
  navegação) e `RequireAuth`
- `components/forms/`: formulário visual puro (`*Form.tsx` — recebe
  `form`/`onSubmit`/`isPending` por prop, shadcn/ui `Form`/`FormField`/...)
- `components/ui/`: `AuthShell` (Server Component — título/tagline "Ludens" +
  `Card`, fonte única da composição visual comum às 4 rotas)
- `contexts/`: contexto de autenticação
- `hooks/forms/`: formulários com React Hook Form
- `hooks/mutations/`: mutations com TanStack Query
- `hooks/queries/`: queries da conta
- `schemas/`: validação com Zod
- `server/types/`: tipos derivados dos schemas
- `services/`: integração com endpoints de autenticação

## Visual

shadcn/ui (style `radix-nova`) + Tailwind, paleta **"Teatro Clássico"** (fundo
branco, vermelho `#C81E1E` de destaque) — tokens em `src/app/globals.css`.
Claro é o tema default; `next-themes` + `<ThemeToggle />` (chrome global, fora
da feature) trocam pra escuro.

## Rotas

- `/login`
- `/registro`
- `/recuperar-senha`
- `/redefinir-senha`

## Testes

`schemas/auth.schema.test.ts`, `services/auth.service.test.ts` e
`src/lib/fetcher.test.ts` (Jest — `npm run test`). Cobrem parse/rejeição de
payload, URL/método/shape de cada chamada e o fluxo de refresh em 401.
Fluxos de UI (Playwright) ainda não entraram — ver
`team.ludens/skills/frontend-architecture/references/13-testing.md`.

## Observação

A integração depende da API de autenticação disponível através de
`NEXT_PUBLIC_API_URL` (ver `.env.example` na raiz do repo).
