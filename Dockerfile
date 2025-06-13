FROM node:24-slim AS build-client
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install
COPY . .
RUN npm run build

FROM python:3.13-slim
WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY app.py .
COPY server/ ./server/

COPY --from=build-client /app/dist ./dist

EXPOSE 5067
CMD ["python", "app.py"]
# CMD ["gunicorn", "--bind", "0.0.0.0:5067", "app:app"]
