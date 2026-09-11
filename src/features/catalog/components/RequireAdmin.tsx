'use client';

import { useEffect, type ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import {
  RequireAuth,
  useCurrentUser,
} from '@account';

interface RequireAdminProps {
  children: ReactNode;
}

function AdminGate({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  const {
    data: user,
    isLoading,
  } = useCurrentUser();

  useEffect(() => {
    if (
      !isLoading &&
      user &&
      !user.is_admin
    ) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  if (
    isLoading ||
    !user ||
    !user.is_admin
  ) {
    return null;
  }

  return <>{children}</>;
}

export function RequireAdmin({
  children,
}: RequireAdminProps) {
  return (
    <RequireAuth>
      <AdminGate>
        {children}
      </AdminGate>
    </RequireAuth>
  );
}
