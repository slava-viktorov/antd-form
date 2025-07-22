import { Form, Input } from 'antd';

interface PhoneFieldProps {
  editing: boolean;
  MESSAGES: any;
}

function PhoneField({ editing, MESSAGES }: PhoneFieldProps) {
  return (
    <Form.Item
      label="Номер телефона"
      name="phone"
      rules={[{ required: false, message: MESSAGES.requiredPhone }]}
    >
      <Input placeholder="Телефон" disabled={!editing} />
    </Form.Item>
  );
}

export default PhoneField;
