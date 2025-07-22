import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { useEmployeeStore } from '../employeeStore';
import EmployeeForm from '../components/EmployeeForm';

function EmployeeFormPage() {
  const { id } = useParams();
  const employees = useEmployeeStore((s) => s.employees);
  const updateEmployee = useEmployeeStore((s) => s.updateEmployee);
  const employee = id ? employees.find((e) => e.id === id) : undefined;
  const navigate = useNavigate();

  const handleSave = (employeeData: any) => {
    updateEmployee({
      ...employeeData,
      updatedAt: new Date(),
    });
    navigate('/');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <Button
        icon={<ArrowLeftOutlined />}
        onClick={handleBack}
        style={{ marginBottom: 16 }}
      >
        Назад к списку
      </Button>
      <EmployeeForm
        initialValues={employee}
        onSave={handleSave}
        loading={false}
      />
    </div>
  );
}

export default EmployeeFormPage;
