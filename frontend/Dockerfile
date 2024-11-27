FROM node:20-alpine AS build

WORKDIR /app/frontend

COPY package.json package-lock.json* ./

COPY . .

ARG GOOGLE_API_KEY

ENV GOOGLE_API_KEY=$GOOGLE_API_KEY

RUN npm install

RUN npm run build

RUN npm ci && npm cache clean --force

FROM node:20-alpine

WORKDIR /app/frontend

COPY --from=build /app/frontend/package*.json ./

COPY --from=build /app/frontend/dist ./dist

COPY --from=build /app/frontend/node_modules ./node_modules

EXPOSE 80

CMD ["npm", "run", "preview"]