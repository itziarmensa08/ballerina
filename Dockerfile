# Etapa 1: Build Angular App
FROM node:20-alpine AS build

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos del proyecto
COPY package*.json ./
COPY angular.json ./
COPY tsconfig*.json ./
COPY . .

# Instalar dependencias
RUN npm install --legacy-peer-deps

# Build Angular app (esto generará archivos en /app/dist)
RUN npm run build

# Etapa 2: Nginx para servir la app
FROM nginx:alpine

# Eliminar default config de Nginx y copiar el nuestro
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar archivos build a la carpeta pública de nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]