// routes
import { ToastContainer } from 'react-toastify';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { ProviderAuth } from './hooks/useAuth';
import 'react-toastify/dist/ReactToastify.min.css';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <ProviderAuth>
        <Router />
        <ToastContainer pauseOnHover={false} position="bottom-right" newestOnTop autoClose={3000} limit={3} />
      </ProviderAuth>
    </ThemeProvider>
  );
}
