import { z } from 'zod';

import {
  changePasswordSchema,
  forgotSchema,
  loginSchema,
  registerSchema,
  resetSchema,
  tokenResponseSchema,
  userSchema,
} from '@account/schemas/auth.schema';

export type RegisterRequest = z.infer<typeof registerSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;
export type ChangePasswordRequest = z.infer<typeof changePasswordSchema>;
export type ForgotPasswordRequest = z.infer<typeof forgotSchema>;
export type ResetPasswordRequest = z.infer<typeof resetSchema>;

export type TokenResponse = z.infer<typeof tokenResponseSchema>;
export type User = z.infer<typeof userSchema>;
