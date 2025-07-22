# React + AntD

Базовое CRUD приложение

## Как запустить

### Предварительные требования

- Docker и Docker Compose
- Node.js 18+
- Опционально Make (для использования Makefile команд)

### Переменные окружения

Создайте файл `.env` в корневой директории или используйте `.env.local`(используется по умолчанию) для теста:

### Процесс запуска c Makefile (dev)
```bash
# Запуск в режиме разработки(.env.local)
make up
# создание тестовых данных, загрузятся автоматически в localStorage
make seed
# Остановка
make down
```
### Процесс запуска Docker (dev)
Если в вашей системе не установлен make, то используйте docker compose напрямую
```bash
docker compose -f docker-compose.dev.yml --env-file .env.local up --build
docker compose exec backend npm run seed
```

Приложение доступно по адресу для dev: http://localhost:5173<br>
Приложение доступно по адресу для prod: http://localhost:3000 (make prod и env.production)

### Остановка
```bash
# Остановка
make down
make clean
```
