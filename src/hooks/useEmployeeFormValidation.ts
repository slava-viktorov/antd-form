import type { RuleObject } from 'antd/es/form';
import type { StoreValue } from 'antd/es/form/interface';
import type { FormInstance } from 'antd';
import dayjs from 'dayjs';
import type { Employee } from '../employeeStore';

export default function useEmployeeFormValidation(
  form: FormInstance<Employee>
) {
  const validateExperience = async (_: RuleObject, value: StoreValue) => {
    const birthDate = form.getFieldValue('birthDate');
    if (!birthDate && value) {
      return Promise.reject(new Error('Проверьте стаж и дату рождения'));
    }
    if (!birthDate || !value) return Promise.resolve();
    const years = dayjs().diff(birthDate, 'year');
    if (value > years - 18) {
      return Promise.reject(new Error('Проверьте стаж и дату рождения'));
    }
    return Promise.resolve();
  };
  return { validateExperience };
}
