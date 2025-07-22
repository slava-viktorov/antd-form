import { Form, message } from 'antd';
import type { Employee } from '../employeeStore';
import { POSITIONS, FIELD_LIMITS, MESSAGES } from '../constants';
import EmployeeFormFields from './EmployeeFormFields';
import EmployeeFormActions from './EmployeeFormActions';
import useEmployeeFormState from '../hooks/useEmployeeFormState';
import useEmployeeFormValidation from '../hooks/useEmployeeFormValidation';

interface EmployeeFormProps {
  initialValues?: Employee;
  onSave: (employee: Employee) => Promise<void> | void;
  loading?: boolean;
  onBack?: () => void;
}

function EmployeeForm({
  initialValues,
  onSave,
  loading,
  onBack,
}: EmployeeFormProps) {
  const [form] = Form.useForm<Employee>();
  const isCreateMode = !initialValues;
  const {
    editing,
    changed,
    setEditing,
    setChanged,
    setBackup,
    handleUndo,
    handleEdit,
    handleValuesChange,
  } = useEmployeeFormState({
    initialValues,
    form,
    initialEditing: isCreateMode,
  });
  const { validateExperience } = useEmployeeFormValidation(form);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      await onSave({ ...values, id: values.id ?? initialValues?.id });
      setEditing(false);
      setChanged(false);
      setBackup(values);
      message.success('Сотрудник сохранён');
    } catch (error: any) {
      if (error instanceof Error) {
        if (error.message.includes('Email')) {
          form.setFields([{ name: 'email', errors: [error.message] }]);
        } else if (error.message.includes('Логин')) {
          form.setFields([{ name: 'login', errors: [error.message] }]);
        }
      }
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleValuesChange}
        disabled={loading}
      >
        <EmployeeFormFields
          editing={editing}
          validateExperience={validateExperience}
          POSITIONS={POSITIONS}
          FIELD_LIMITS={FIELD_LIMITS}
          MESSAGES={MESSAGES}
        />
        <EmployeeFormActions
          editing={editing}
          changed={changed}
          initialValues={initialValues}
          loading={loading ?? false}
          onEdit={isCreateMode ? undefined : handleEdit}
          onSave={handleSave}
          onUndo={handleUndo}
          onBack={onBack ?? (() => {})}
        />
      </Form>
    </div>
  );
}

export default EmployeeForm;
