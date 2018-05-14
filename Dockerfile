FROM node:9-slim AS builder

RUN apt-get update && \
    apt-get install -y python \
                       libpng-dev
WORKDIR /app
COPY package.json /app
RUN yarn install

COPY . /app
RUN yarn run build

## Static files built. Create actual app container.
FROM python:3-alpine

WORKDIR /app
COPY --from=builder /app/requirements.txt /app

RUN pip install -r requirements.txt

COPY --from=builder /app/ddms /app

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
