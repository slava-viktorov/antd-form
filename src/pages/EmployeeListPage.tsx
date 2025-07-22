import { useNavigate } from 'react-router-dom';

import { useEmployeeStore } from '../employeeStore';
import EmployeeTable from '../components/EmployeeTable';

function EmployeeListPage() {
  const employees = useEmployeeStore((s) => s.employees);
  const removeEmployee = useEmployeeStore((s) => s.removeEmployee);
  const navigate = useNavigate();

  const handleEdit = () => {};

  const handleDelete = (id: string) => {
    removeEmployee(id);
  };

  const handleAdd = () => {
    navigate('/employee');
  };

  return (
    <EmployeeTable
      employees={employees}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAdd={handleAdd}
    />
  );
}

export default EmployeeListPage;
