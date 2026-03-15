import React from 'react';
import { Toaster } from 'sonner';

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      richColors
      closeButton
      theme="system"
      toastOptions={{
        classNames: {
          toast: 'rounded-xl shadow-lg border',
          success: 'bg-green-50 border-green-200',
          error: 'bg-red-50 border-red-200',
          info: 'bg-blue-50 border-blue-200',
          warning: 'bg-yellow-50 border-yellow-200',
        },
      }}
    />
  );
}
