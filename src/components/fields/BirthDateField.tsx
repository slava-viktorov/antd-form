import { Form, DatePicker } from 'antd';

interface BirthDateFieldProps {
  editing: boolean;
  MESSAGES: any;
}

function BirthDateField({ editing, MESSAGES }: BirthDateFieldProps) {
  return (
    <Form.Item
      label="Дата рождения"
      name="birthDate"
      rules={[{ required: true, message: MESSAGES.requiredBirthDate }]}
    >
      <DatePicker
        style={{ width: '100%' }}
        format="DD.MM.YYYY"
        disabled={!editing}
      />
    </Form.Item>
  );
}

export default BirthDateField;
