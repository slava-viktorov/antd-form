import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';
import EmployeeForm from '../EmployeeForm';
import type { Employee } from '../../employeeStore';

const defaultEmployee: Employee = {
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
};

describe('EmployeeForm', () => {
  it('создаёт нового сотрудника при валидных данных', async () => {
    const handleSave = vi.fn();
    render(<EmployeeForm onSave={handleSave} />);
    fireEvent.click(screen.getByText('Изменить'));
    fireEvent.change(screen.getByLabelText(/ФИО/i), {
      target: { value: 'Петров Петр Петрович' },
    });
    fireEvent.change(screen.getByLabelText(/Логин/i), {
      target: { value: 'petrov' },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'petrov@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Пароль/i), {
      target: { value: '123456' },
    });
    fireEvent.change(screen.getByLabelText(/Стаж/i), { target: { value: 3 } });
    fireEvent.change(screen.getByLabelText(/Номер телефона/i), {
      target: { value: '79991234567' },
    });
    // Выбор даты рождения через user-event
    const birthDateInput = screen.getByLabelText(/Дата рождения/i);
    await userEvent.clear(birthDateInput);
    await userEvent.type(
      birthDateInput,
      dayjs('1995-01-01').format('01.01.1995')
    );
    fireEvent.blur(birthDateInput);
    // Выбор должности через user-event
    const select = screen.getByLabelText(/Должность/i);
    fireEvent.mouseDown(select);
    await userEvent.click(screen.getByText(/Менеджер по работе с клиентами/i));
    fireEvent.click(screen.getByText('Сохранить'));
    await waitFor(() => expect(handleSave).toHaveBeenCalled());
  });

  it('редактирует сотрудника', async () => {
    const handleSave = vi.fn();
    render(
      <EmployeeForm initialValues={defaultEmployee} onSave={handleSave} />
    );
    fireEvent.click(screen.getByText('Изменить'));
    fireEvent.change(screen.getByLabelText(/ФИО/i), {
      target: { value: 'Иванов Иван Иванович-2' },
    });
    fireEvent.click(screen.getByText('Сохранить'));
    await waitFor(() => expect(handleSave).toHaveBeenCalled());
  });

  it('валидирует обязательные поля', async () => {
    const handleSave = vi.fn();
    render(<EmployeeForm onSave={handleSave} />);
    fireEvent.click(screen.getByText('Изменить'));
    fireEvent.change(screen.getByLabelText(/ФИО/i), { target: { value: '' } });
    fireEvent.click(screen.getByText('Сохранить'));
    await waitFor(() => {
      expect(screen.getByText(/Введите ФИО/i)).toBeInTheDocument();
    });
  });
});
