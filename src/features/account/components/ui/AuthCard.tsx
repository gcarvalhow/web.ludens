import type { ReactNode } from 'react';

type AuthCardProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
};

export function AuthCard({
  title,
  description,
  icon = '🎭',
  children,
}: AuthCardProps) {
  return (
    <div className="login-form">
      <div className="form-header">
        <span>{icon}</span>
        <h2>{title}</h2>

        {description && (
          <p>{description}</p>
        )}
      </div>

      {children}
    </div>
  );
}
