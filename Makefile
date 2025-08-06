.PHONY: run-dev freeze-deps install migrations migrate superuser

PYTHON_EXEC = .venv/bin/python3
MANAGE_PY = src/manage.py

run-dev:
	$(PYTHON_EXEC) $(MANAGE_PY) runserver 8000

compose:
	docker compose up -d

freeze-deps:
	$(PYTHON_EXEC) -m pip freeze > requirements.txt

install:
	$(PYTHON_EXEC) -m pip install -r requirements.txt

migrations:
	$(PYTHON_EXEC) $(MANAGE_PY) makemigrations

migrate:
	$(PYTHON_EXEC) $(MANAGE_PY) migrate

superuser:
	$(PYTHON_EXEC) $(MANAGE_PY) createsuperuser