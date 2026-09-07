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

- `components/`: componentes da interface
- `contexts/`: contexto de autenticação
- `hooks/forms/`: formulários com React Hook Form
- `hooks/mutations/`: mutations com TanStack Query
- `hooks/queries/`: queries da conta
- `schemas/`: validação com Zod
- `server/types/`: tipos derivados dos schemas
- `services/`: integração com endpoints de autenticação

## Rotas

- `/login`
- `/registro`
- `/recuperar-senha`
- `/redefinir-senha`

## Observação

A integração depende da API de autenticação disponível através de `NEXT_PUBLIC_API_URL`.
