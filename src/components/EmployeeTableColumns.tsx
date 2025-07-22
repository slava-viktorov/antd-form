import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Tag, Popconfirm, Button, Space } from 'antd';
import type { Employee } from '../employeeStore';
import { POSITION_COLORS, POSITION_LABELS } from '../constants';

const getPositionColor = (position: string) =>
  POSITION_COLORS[position] || 'default';
const getPositionLabel = (position: string) =>
  POSITION_LABELS[position] || position;

interface GetColumnsParams {
  onEdit: (record: Employee) => void;
  deleteEmployee: (id: string) => void;
  navigate: (path: string) => void;
}

const getColumns = ({ onEdit, deleteEmployee, navigate }: GetColumnsParams) => [
  {
    title: 'ФИО',
    dataIndex: 'fullName',
    key: 'fullName',
    fixed: 'left' as const,
    width: 200,
  },
  {
    title: 'Должность',
    dataIndex: 'position',
    key: 'position',
    width: 250,
    render: (position: string) => (
      <Tag color={getPositionColor(position)}>{getPositionLabel(position)}</Tag>
    ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    width: 200,
  },
  {
    title: 'Стаж',
    dataIndex: 'experience',
    key: 'experience',
    width: 100,
    render: (experience: number | null) =>
      experience !== null && experience !== undefined
        ? `${experience} лет`
        : '-',
  },
  {
    title: 'Действия',
    key: 'actions',
    fixed: 'right' as const,
    width: 100,
    render: (_: unknown, record: Employee) => (
      <Space size={4} className="employee-actions">
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => {
            onEdit?.(record);
            navigate(`/employee/${record.id}`);
          }}
          title="Редактировать"
        />
        <Popconfirm
          title="Удалить сотрудника?"
          description="Это действие нельзя отменить"
          onConfirm={() => deleteEmployee(record.id)}
          okText="Да"
          cancelText="Нет"
        >
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            title="Удалить"
          />
        </Popconfirm>
      </Space>
    ),
  },
];

export default getColumns;
