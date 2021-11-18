import './App.css';
import { Outlet } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import Menubar from './components/menubar'

import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <div className="container ui">
        <Menubar />
        <Outlet />
      </div>
    </AuthProvider>
  );
}

export default App;
