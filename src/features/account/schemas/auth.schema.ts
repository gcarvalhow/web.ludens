import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório.'),
  cpf: z
    .string()
    .regex(/^\d{11}$/, 'CPF deve conter exatamente 11 dígitos.'),
  email: z.string().email('E-mail inválido.'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
});

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido.'),
  password: z.string().min(1, 'Senha é obrigatória.'),
});

export const changePasswordSchema = z.object({
  current_password: z.string().min(1, 'Senha atual é obrigatória.'),
  new_password: z.string().min(8, 'A nova senha deve ter pelo menos 8 caracteres.'),
});

export const forgotSchema = z.object({
  email: z.string().email('E-mail inválido.'),
});

export const resetSchema = z.object({
  token: z.string().min(1, 'Token é obrigatório.'),
  password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'),
});

export const tokenResponseSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
});

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  cpf: z.string(),
  is_admin: z.boolean(),
});
