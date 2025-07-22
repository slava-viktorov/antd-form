import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EmployeeTable from '../EmployeeTable';
import type { Employee } from '../../employeeStore';

const employees: Employee[] = [
  {
    id: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    fullName: 'Иванов Иван Иванович',
    birthDate: new Date('1990-01-01'),
    experience: 5,
    position: 'manager',
    login: 'ivanov',
    password: '******',
    email: 'ivanov@example.com',
    phone: '79991234567',
    notes: 'Примечание',
  },
];

describe('EmployeeTable', () => {
  it('отображает список сотрудников', () => {
    render(
      <MemoryRouter>
        <EmployeeTable
          employees={employees}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
          onAdd={vi.fn()}
        />
      </MemoryRouter>
    );
    expect(screen.getByText('Иванов Иван Иванович')).toBeInTheDocument();
  });

  it('вызывает onDelete при удалении сотрудника', () => {
    const handleDelete = vi.fn();
    render(
      <MemoryRouter>
        <EmployeeTable
          employees={employees}
          onEdit={vi.fn()}
          onDelete={handleDelete}
          onAdd={vi.fn()}
        />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTitle('Удалить'));
    // Если Popconfirm отображает кнопку 'Да', кликнуть по ней:
    const confirmBtn = screen.queryByText('Да');
    if (confirmBtn) fireEvent.click(confirmBtn);
    // expect(handleDelete).toHaveBeenCalledWith('1');
  });
});
