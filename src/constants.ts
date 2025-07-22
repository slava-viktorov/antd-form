export const POSITIONS = [
  { value: 'director', label: 'Директор', color: 'red' },
  { value: 'manager', label: 'Менеджер по работе с клиентами', color: 'blue' },
  { value: 'support', label: 'Специалист тех. поддержки', color: 'green' },
];

export const POSITION_LABELS: Record<string, string> = {
  director: 'Директор',
  manager: 'Менеджер по работе с клиентами',
  support: 'Специалист тех. поддержки',
};

export const POSITION_COLORS: Record<string, string> = {
  director: 'red',
  manager: 'blue',
  support: 'green',
};

export const FIELD_LIMITS = {
  fullName: 100,
  login: { min: 3, max: 20 },
  password: { min: 6, max: 12 },
  email: 100,
  phone: 11,
  notes: 400,
  experience: { min: 0, max: 100 },
};

export const MESSAGES = {
  requiredFullName: 'Введите ФИО',
  maxFullName: 'Максимум 100 символов',
  requiredLogin: 'Введите логин',
  loginLength: 'От 3 до 20 символов',
  requiredPassword: 'Введите пароль',
  passwordLength: 'От 6 до 12 символов',
  requiredEmail: 'Введите email',
  invalidEmail: 'Некорректный email',
  requiredPhone: 'Введите номер телефона',
  maxNotes: 'Максимум 400 символов',
  requiredPosition: 'Выберите должность',
  requiredBirthDate: 'Выберите дату рождения',
  invalidExperience: 'Проверьте стаж и дату рождения',
};
