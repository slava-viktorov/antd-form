import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import type { FormInstance, FormProps } from 'antd';
import type { Employee } from '../employeeStore';

interface UseEmployeeFormStateProps {
  initialValues?: Employee;
  form: FormInstance<Employee>;
  initialEditing?: boolean;
}

export default function useEmployeeFormState({
  initialValues,
  form,
  initialEditing = false,
}: UseEmployeeFormStateProps) {
  const [editing, setEditing] = useState<boolean>(initialEditing);
  const [changed, setChanged] = useState<boolean>(false);
  const [backup, setBackup] = useState<Employee | undefined>(initialValues);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        birthDate: initialValues.birthDate
          ? dayjs(initialValues.birthDate)
          : undefined,
        password: '******',
      });
      setBackup(initialValues);
      setChanged(false);
      setEditing(false);
    } else if (initialEditing) {
      setEditing(true);
    }
  }, [initialValues, form, initialEditing]);

  const handleUndo = () => {
    if (backup) {
      form.setFieldsValue({
        ...backup,
        birthDate: backup.birthDate ? dayjs(backup.birthDate) : undefined,
        password: '******',
      });
      setChanged(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleValuesChange: FormProps<Employee>['onValuesChange'] = (
    changedFields,
    _allValues
  ) => {
    setChanged(true);
    if (changedFields.birthDate) {
      form.validateFields(['experience']);
    }
  };

  return {
    editing,
    changed,
    backup,
    setEditing,
    setChanged,
    setBackup,
    handleUndo,
    handleEdit,
    handleValuesChange,
  };
}
