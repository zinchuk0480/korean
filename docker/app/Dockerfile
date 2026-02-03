FROM python:3.14-slim AS builder

WORKDIR /application

RUN apt update && apt install -y build-essential && rm -rf /var/lib/apt/lists/*

RUN python -m venv /opt/venv

ENV PATH="/opt/venv/bin:$PATH"

COPY requirements.txt .

RUN python -m pip install --upgrade pip && pip install --no-cache-dir -r requirements.txt


FROM python:3.14-slim

WORKDIR /application

COPY --from=builder /opt/venv /opt/venv

ENV PATH="/opt/venv/bin:$PATH"

ENV PYTHONUNBUFFERED=1

COPY ./backend /application/backend
