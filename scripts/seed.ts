import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker/locale/ru';

import { createHash } from 'node:crypto';

function sha256(data: string): string {
  return createHash('sha256').update(data).digest('hex');
}

interface Employee {
  id: string;
  fullName: string;
  birthDate: Date;
  experience: number;
  position: string;
  login: string;
  password: string;
  email: string;
  phone: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const positions = [
  { value: 'director', label: 'Директор' },
  { value: 'manager', label: 'Менеджер по работе с клиентами' },
  { value: 'support', label: 'Специалист тех. поддержки' },
];

function generateEmployee(): Employee {
  const birthDate = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });
  const createdAt = faker.date.past();
  const updatedAt = new Date();

  const currentYear = new Date().getFullYear();
  const birthYear = birthDate.getFullYear();
  const maxExperience = currentYear - birthYear;
  const experience = faker.number.int({
    min: 0,
    max: Math.min(maxExperience, 20),
  });

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const middleName = faker.person.middleName();
  const fullName = `${lastName} ${firstName} ${middleName}`;

  const position = faker.helpers.arrayElement(positions);
  const login = faker.internet
    .username({ firstName, lastName })
    .substring(0, 20);
  const email = faker.internet.email({ firstName, lastName });

  // Генерируем пароль и хешируем его
  const plainPassword = faker.internet.password({ length: 8 });
  const hashedPassword = sha256(plainPassword);

  return {
    id: faker.string.uuid(),
    fullName,
    birthDate,
    experience,
    position: position.value,
    login,
    password: hashedPassword, // Сохраняем хешированный пароль
    email,
    phone: `7${faker.phone.number()}`,
    notes: faker.lorem.paragraph({ min: 1, max: 3 }),
    createdAt,
    updatedAt,
  };
}

function generateEmployees(count = 10): Employee[] {
  const employees: Employee[] = [];

  for (let i = 0; i < count; i += 1) {
    employees.push(generateEmployee());
  }

  return employees;
}

function saveToJsonFile(employees: Employee[], filename = 'testData.json') {
  const outputPath = path.join(process.cwd(), 'public', filename);

  // Создаем папку public если её нет
  const publicDir = path.dirname(outputPath);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Сохраняем данные в JSON файл
  fs.writeFileSync(outputPath, JSON.stringify(employees, null, 2));
  console.log(
    `✅ Сохранено ${employees.length} сотрудников в файл: ${outputPath}`
  );
}

function main() {
  console.log('🌱 Генерация тестовых данных...');

  const count = process.argv[2] ? parseInt(process.argv[2], 10) : 10;
  console.log(`📊 Создаем ${count} тестовых сотрудников...`);

  const employees = generateEmployees(count);

  // Выводим статистику
  const positionStats = employees.reduce(
    (acc, emp) => {
      acc[emp.position] = (acc[emp.position] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  console.log('\n📈 Статистика по должностям:');
  Object.entries(positionStats).forEach(([position, countPosition]) => {
    const label =
      positions.find((p) => p.value === position)?.label || position;
    console.log(`  ${label}: ${countPosition}`);
  });

  console.log('\n👥 Примеры сотрудников:');
  employees.slice(0, 3).forEach((emp, index) => {
    console.log(
      `  ${index + 1}. ${emp.fullName} - ${positions.find((p) => p.value === emp.position)?.label}`
    );
  });

  // Сохраняем в JSON файл
  saveToJsonFile(employees);

  console.log('\n✅ Генерация завершена!');
  console.log('📁 Файл сохранен в: public/testData.json');
}

// Запускаем main функцию
main();

export { generateEmployee, generateEmployees };
