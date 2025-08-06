.PHONY: compose-up compose-down freeze-deps install migrations migrate superuser

PYTHON_EXEC = .venv/bin/python3
MANAGE_PY = $(PYTHON_EXEC) backend/manage.py
REQUIREMENTS = backend/requirements.txt

compose-up:
	docker compose up --build

compose-down:
	docker compose down

freeze-deps:
	$(PYTHON_EXEC) -m pip freeze > $(REQUIREMENTS)

install:
	$(PYTHON_EXEC) -m pip install -r $(REQUIREMENTS)

migrations:
	$(MANAGE_PY) makemigrations

migrate:
	$(MANAGE_PY) migrate

superuser:
	$(MANAGE_PY) createsuperuser