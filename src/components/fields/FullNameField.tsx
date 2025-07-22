import { Form, Input } from 'antd';

interface FullNameFieldProps {
  editing: boolean;
  FIELD_LIMITS: any;
  MESSAGES: any;
}

function FullNameField({
  editing,
  FIELD_LIMITS,
  MESSAGES,
}: FullNameFieldProps) {
  return (
    <Form.Item
      label="ФИО"
      name="fullName"
      rules={[
        { required: true, message: MESSAGES.requiredFullName },
        { max: FIELD_LIMITS.fullName, message: MESSAGES.maxFullName },
      ]}
    >
      <Input
        maxLength={FIELD_LIMITS.fullName}
        placeholder="ФИО"
        disabled={!editing}
      />
    </Form.Item>
  );
}

export default FullNameField;
