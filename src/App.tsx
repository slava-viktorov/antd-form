import { BrowserRouter, Routes, Route } from 'react-router-dom';

import useInitialEmployeeData from './hooks/useInitialEmployeeData';
import AppLayout from './components/Layout';

import EmployeeListPage from './pages/EmployeeListPage';
import EmployeeFormPage from './pages/EmployeeFormPage';
import EmployeeCreatePage from './pages/EmployeeCreatePage';

function App() {
  useInitialEmployeeData();
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<EmployeeListPage />} />
          <Route path="/employee" element={<EmployeeCreatePage />} />
          <Route path="/employee/:id" element={<EmployeeFormPage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
