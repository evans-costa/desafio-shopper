FROM node:20-alpine AS build

WORKDIR /app/backend

COPY package.json package-lock.json* ./

COPY . .

RUN npm install

RUN npm run build

RUN npm ci && npm cache clean --force

FROM node:20-alpine

WORKDIR /app/backend

COPY --from=build /app/backend/package*.json ./

COPY --from=build /app/backend/.env.development ./

COPY --from=build /app/backend/dist ./dist

COPY --from=build /app/backend/node_modules ./node_modules

EXPOSE 8080

CMD ["npm", "run", "start:local"]