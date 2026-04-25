import { QueryProvider } from './providers/query-provider';
import { AppRouter } from './router/router';

export const App = () => (
  <QueryProvider>
    <AppRouter />
  </QueryProvider>
);
