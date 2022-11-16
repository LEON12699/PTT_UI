// routes
import { ToastContainer } from 'react-toastify';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { ProviderAuth } from './hooks/useAuth';
import 'react-toastify/dist/ReactToastify.min.css'

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <ProviderAuth>
        <Router />
        <ToastContainer/>
      </ProviderAuth>
    </ThemeProvider>
  );
}
