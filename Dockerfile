FROM node:20-alpine

WORKDIR /app

# Copier  tout le projet Quasar 
COPY . .

# Installer les dépendances 
RUN npm install

EXPOSE 9000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "9000"]
