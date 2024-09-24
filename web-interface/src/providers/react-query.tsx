import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const ReactQueryProvider = ({ children }: PropsWithChildren<unknown>) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
