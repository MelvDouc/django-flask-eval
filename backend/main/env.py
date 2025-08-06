import os


def get_env(name: str) -> str:
    value = os.getenv(name)

    if value is None:
        raise Exception(f"Environment variable '{name}' is not set.")

    return value
