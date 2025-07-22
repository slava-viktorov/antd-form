import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { normalizeEmployeeDates } from './utils/date';
import { checkUniqueEmployee } from './utils/employeeValidation';

export interface Employee {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  fullName: string;
  birthDate: Date;
  experience: number;
  position: string;
  login: string;
  password: string;
  email: string;
  phone: string;
  notes: string;
}

interface EmployeeStore {
  employees: Employee[];
  addEmployee: (employee: Employee) => void;
  updateEmployee: (employee: Employee) => void;
  removeEmployee: (id: string) => void;
  clear: () => void;
  isInitialDataLoaded: boolean;
  setInitialDataLoaded: () => void;
  resetInitialDataLoaded: () => void;
}

function sortByCreatedAtDesc(arr: Employee[]): Employee[] {
  return arr
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

export const useEmployeeStore = create<EmployeeStore>()(
  persist(
    (
      set: (
        fn: (state: EmployeeStore) => EmployeeStore | Partial<EmployeeStore>
      ) => void,
      get: () => EmployeeStore
    ) => ({
      employees: [],
      addEmployee: (employee: Employee): void => {
        const normalized = normalizeEmployeeDates(employee);
        const { emailError, loginError } = checkUniqueEmployee(
          get().employees,
          normalized.email,
          normalized.login,
          undefined
        );
        if (emailError || loginError) {
          throw new Error(emailError || loginError);
        }
        set((state: EmployeeStore) => ({
          employees: sortByCreatedAtDesc([...state.employees, normalized]),
        }));
      },
      updateEmployee: (employee: Employee): void => {
        const normalized = normalizeEmployeeDates(employee);
        const { emailError, loginError } = checkUniqueEmployee(
          get().employees,
          normalized.email,
          normalized.login,
          normalized.id
        );
        if (emailError || loginError) {
          throw new Error(emailError || loginError);
        }
        set((state: EmployeeStore) => ({
          employees: sortByCreatedAtDesc(
            state.employees.map((e: Employee) =>
              e.id === normalized.id ? { ...normalized } : e
            )
          ),
        }));
      },
      removeEmployee: (id: string): void =>
        set((state: EmployeeStore) => ({
          employees: sortByCreatedAtDesc(
            state.employees.filter((e: Employee) => e.id !== id)
          ),
        })),
      clear: (): void => set((state) => ({ ...state, employees: [] })),
      isInitialDataLoaded: false,
      setInitialDataLoaded: (): void =>
        set((state) => ({ ...state, isInitialDataLoaded: true })),
      resetInitialDataLoaded: (): void =>
        set((state) => ({ ...state, isInitialDataLoaded: false })),
    }),
    {
      name: 'employee-storage',
      partialize: (state: EmployeeStore) => ({
        employees: state.employees,
        isInitialDataLoaded: state.isInitialDataLoaded,
      }),
    }
  )
);
