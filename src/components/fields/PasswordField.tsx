import { Form, Input } from 'antd';

interface PasswordFieldProps {
  editing: boolean;
  FIELD_LIMITS: any;
  MESSAGES: any;
}

function PasswordField({
  editing,
  FIELD_LIMITS,
  MESSAGES,
}: PasswordFieldProps) {
  return (
    <Form.Item
      label="Пароль"
      name="password"
      rules={[
        { required: false, message: MESSAGES.requiredPassword },
        {
          min: FIELD_LIMITS.password.min,
          max: FIELD_LIMITS.password.max,
          message: MESSAGES.passwordLength,
        },
      ]}
    >
      <Input.Password
        minLength={FIELD_LIMITS.password.min}
        maxLength={FIELD_LIMITS.password.max}
        placeholder="Пароль"
        disabled={!editing}
      />
    </Form.Item>
  );
}

export default PasswordField;
