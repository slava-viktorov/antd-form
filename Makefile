# Makefile для управления docker compose и npm-скриптами
ENV_FILE ?= .env.local

include $(ENV_FILE)

export $(shell sed 's/=.*//' $(ENV_FILE))

up:
	docker compose --project-name $(PROJECT_NAME) -f docker-compose.dev.yml --env-file .env.local up --build

down:
	docker compose --project-name $(PROJECT_NAME) down

watch:
	@echo "Starting development environment with enhanced graceful shutdown..."
	@echo "Press Ctrl+C to gracefully stop all services..."
	@trap 'echo "Received interrupt signal, starting graceful shutdown..."; \
		echo "Stopping containers gracefully..."; \
		docker compose --project-name $(PROJECT_NAME) -f docker-compose.dev.yml --env-file .env.local stop; \
		echo "Waiting for containers to stop..."; \
		sleep 5; \
		echo "Removing containers..."; \
		docker compose --project-name $(PROJECT_NAME) -f docker-compose.dev.yml --env-file .env.local down; \
		echo "Graceful shutdown completed."; \
		exit 0' INT TERM; \
	docker compose --project-name $(PROJECT_NAME) -f docker-compose.dev.yml --env-file .env.local watch

prod:
	docker compose --project-name $(PROJECT_NAME) -f docker-compose.prod.yml --env-file .env.production up --build -d

logs:
	docker compose --project-name $(PROJECT_NAME) logs -f

stop:
	docker compose --project-name $(PROJECT_NAME) stop

clean:
	docker compose --project-name $(PROJECT_NAME) down -v --remove-orphans

# NPM-скрипты
build:
	docker compose --project-name $(PROJECT_NAME) exec frontend npm run build
dev:
	docker compose --project-name $(PROJECT_NAME) exec frontend npm run dev
lint:
	docker compose --project-name $(PROJECT_NAME) exec frontend npm run lint
format:
	docker compose --project-name $(PROJECT_NAME) exec frontend npm run format
seed:
	docker compose --project-name $(PROJECT_NAME) exec frontend npm run test
test:
	docker compose --project-name $(PROJECT_NAME) exec frontend npm run test
