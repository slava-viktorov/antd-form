import { useNavigate } from 'react-router-dom';
import { Card, Table, Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import getColumns from './EmployeeTableColumns';
import type { Employee } from '../employeeStore';

const { Title } = Typography;

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
}

function EmployeeTable({
  employees,
  onEdit,
  onDelete,
  onAdd,
}: EmployeeTableProps) {
  const navigate = useNavigate();

  const columns = getColumns({
    onEdit,
    deleteEmployee: onDelete,
    navigate,
  });

  return (
    <Card>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}
      >
        <Title level={3} style={{ margin: 0 }}>
          Список сотрудников ({employees.length})
        </Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={onAdd}>
          Добавить сотрудника
        </Button>
      </div>

      <div className="employee-table-container">
        <Table
          columns={columns}
          dataSource={employees}
          rowKey="id"
          scroll={{ x: 900 }}
          pagination={false}
          style={{ minWidth: '100%' }}
        />
      </div>
    </Card>
  );
}

export default EmployeeTable;
