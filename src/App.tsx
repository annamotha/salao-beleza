import './App.css';
import { AppRoutes } from './routes';
import ResponsiveAppBar from './componentes/HeaderMui';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ResponsiveAppBar />
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
