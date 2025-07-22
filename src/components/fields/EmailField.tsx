import { Form, Input } from 'antd';

interface EmailFieldProps {
  editing: boolean;
  FIELD_LIMITS: any;
  MESSAGES: any;
}

function EmailField({ editing, FIELD_LIMITS, MESSAGES }: EmailFieldProps) {
  return (
    <Form.Item
      label="Email"
      name="email"
      rules={[
        { required: true, message: MESSAGES.requiredEmail },
        { type: 'email', message: MESSAGES.invalidEmail },
      ]}
    >
      <Input
        maxLength={FIELD_LIMITS.email}
        placeholder="Email"
        disabled={!editing}
      />
    </Form.Item>
  );
}

export default EmailField;
