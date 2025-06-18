# Plex Home Theatre

## Running in Development

```bash
docker compose --profile dev up -d --build
```

## Build and Push to Docker

```bash
docker build -t alexbmoreira/plex-home-theatre .
docker push alexbmoreira/plex-home-theatre
```
