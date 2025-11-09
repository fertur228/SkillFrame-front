import { Outlet } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';

export const App = () => (
  <AppLayout>
    <Outlet />
  </AppLayout>
);

export default App;
