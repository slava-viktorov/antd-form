import { useEffect, useRef } from 'react';
import { useEmployeeStore } from '../employeeStore';
import type { Employee } from '../employeeStore';

export default function useInitialEmployeeData() {
  const addEmployee = useEmployeeStore((s) => s.addEmployee);
  const isInitialDataLoaded = useEmployeeStore((s) => s.isInitialDataLoaded);
  const setInitialDataLoaded = useEmployeeStore((s) => s.setInitialDataLoaded);
  const isFetchStarted = useRef(false);

  useEffect(() => {
    const fetchData = async () => {
      if (isFetchStarted.current) return;
      isFetchStarted.current = true;
      if (isInitialDataLoaded) return;
      const response = await fetch('/testData.json');
      const data = (await response.json()) as Employee[];
      setInitialDataLoaded();
      data.forEach((e: Employee) => {
        addEmployee({
          ...e,
          createdAt: new Date(e.createdAt),
          updatedAt: new Date(e.updatedAt),
          birthDate: new Date(e.birthDate),
        });
      });
    };
    fetchData();
  }, [addEmployee, isInitialDataLoaded, setInitialDataLoaded]);
}
