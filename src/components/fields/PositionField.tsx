import { Form, Select } from 'antd';

const { Option } = Select;

interface PositionFieldProps {
  editing: boolean;
  POSITIONS: { value: string; label: string }[];
  MESSAGES: any;
}

function PositionField({ editing, POSITIONS, MESSAGES }: PositionFieldProps) {
  return (
    <Form.Item
      label="Должность"
      name="position"
      rules={[{ required: true, message: MESSAGES.requiredPosition }]}
    >
      <Select placeholder="Выберите должность" disabled={!editing}>
        {POSITIONS.map((p) => (
          <Option key={p.value} value={p.value}>
            {p.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
}

export default PositionField;
