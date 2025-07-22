import type { Employee } from '../employeeStore';

export function normalizeEmployeeDates(employee: Employee): Employee {
  return {
    ...employee,
    createdAt: new Date(employee.createdAt),
    updatedAt: new Date(employee.updatedAt),
    birthDate: new Date(employee.birthDate),
  };
}

export function normalizeEmployeesDates(employees: Employee[]): Employee[] {
  return employees.map(normalizeEmployeeDates);
}
