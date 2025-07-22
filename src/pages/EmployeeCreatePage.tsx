import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import { useEmployeeStore } from '../employeeStore';
import EmployeeForm from '../components/EmployeeForm';
import { uuid4 } from '../utils/crypto';

function EmployeeCreatePage() {
  const addEmployee = useEmployeeStore((s) => s.addEmployee);
  const navigate = useNavigate();

  const handleSave = (employeeData: any) => {
    const now = new Date();
    addEmployee({
      ...employeeData,
      id: uuid4(),
      createdAt: now,
      updatedAt: now,
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
      <EmployeeForm onSave={handleSave} loading={false} />
    </div>
  );
}

export default EmployeeCreatePage;
