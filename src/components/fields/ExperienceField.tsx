import { Form, Input } from 'antd';
import type { RuleObject } from 'antd/es/form';
import type { StoreValue } from 'antd/es/form/interface';

interface ExperienceFieldProps {
  editing: boolean;
  FIELD_LIMITS: any;
  validateExperience: (rule: RuleObject, value: StoreValue) => Promise<void>;
}

function ExperienceField({
  editing,
  FIELD_LIMITS,
  validateExperience,
}: ExperienceFieldProps) {
  return (
    <Form.Item
      label="Стаж (лет)"
      name="experience"
      rules={[
        {
          required: false,
          type: 'number',
          min: 0,
          max: FIELD_LIMITS?.experience?.max ?? 100,
          transform: (v) => (v == null ? undefined : Number(v)),
          message: 'Введите корректный стаж',
        },
        { validator: validateExperience },
      ]}
    >
      <Input
        type="number"
        max={FIELD_LIMITS?.experience?.max ?? 100}
        placeholder="Стаж (лет)"
        disabled={!editing}
      />
    </Form.Item>
  );
}

export default ExperienceField;
