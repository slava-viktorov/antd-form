import { Form, Input } from 'antd';

interface NotesFieldProps {
  editing: boolean;
  FIELD_LIMITS: any;
  MESSAGES: any;
}

function NotesField({ editing, FIELD_LIMITS, MESSAGES }: NotesFieldProps) {
  return (
    <Form.Item
      label="Примечание"
      name="notes"
      rules={[{ max: FIELD_LIMITS.notes, message: MESSAGES.maxNotes }]}
    >
      <Input.TextArea
        maxLength={FIELD_LIMITS.notes}
        rows={3}
        placeholder="Примечание"
        disabled={!editing}
      />
    </Form.Item>
  );
}

export default NotesField;
