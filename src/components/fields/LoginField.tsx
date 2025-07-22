import { Form, Input } from 'antd';

interface LoginFieldProps {
  editing: boolean;
  FIELD_LIMITS: any;
  MESSAGES: any;
}

function LoginField({ editing, FIELD_LIMITS, MESSAGES }: LoginFieldProps) {
  return (
    <Form.Item
      label="Логин"
      name="login"
      rules={[
        { required: true, message: MESSAGES.requiredLogin },
        {
          min: FIELD_LIMITS.login.min,
          max: FIELD_LIMITS.login.max,
          message: MESSAGES.loginLength,
        },
      ]}
    >
      <Input
        minLength={FIELD_LIMITS.login.min}
        maxLength={FIELD_LIMITS.login.max}
        placeholder="Логин"
        disabled={!editing}
      />
    </Form.Item>
  );
}

export default LoginField;
