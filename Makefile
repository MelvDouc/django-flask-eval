.PHONY: run-dev freeze-deps install migrations migrate superuser

PYTHON_EXEC = .venv/bin/python3
MANAGE_PY = $(PYTHON_EXEC) src/manage.py

run-dev:
	$(MANAGE_PY) runserver 8000

compose:
	docker compose up --build

freeze-deps:
	$(PYTHON_EXEC) -m pip freeze > requirements.txt

install:
	$(PYTHON_EXEC) -m pip install -r requirements.txt

migrations:
	$(MANAGE_PY) makemigrations

migrate:
	$(MANAGE_PY) migrate

superuser:
	$(MANAGE_PY) createsuperuser