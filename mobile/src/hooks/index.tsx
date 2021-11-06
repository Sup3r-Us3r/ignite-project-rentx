import React from 'react';

import { AuthProvider } from './useAuth';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <AuthProvider>
      { children }
    </AuthProvider>
  );
}
