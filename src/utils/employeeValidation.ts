import type { Employee } from '../employeeStore';
import { sha256, uuid4 } from './crypto';

export interface UniqueCheckResult {
  emailError?: string;
  loginError?: string;
}

export function checkUniqueEmployee(
  employees: Employee[],
  email: string,
  login: string,
  excludeId?: string
): UniqueCheckResult {
  const result: UniqueCheckResult = {};
  if (employees.some((e) => e.email === email && e.id !== excludeId)) {
    result.emailError = 'Email уже используется';
  }
  if (employees.some((e) => e.login === login && e.id !== excludeId)) {
    result.loginError = 'Логин уже используется';
  }
  return result;
}

export async function hashPassword(password: string): Promise<string> {
  const hash = await sha256(password);
  return hash;
}

export function generateEmployeeId(): string {
  const id = uuid4();
  return id;
}
