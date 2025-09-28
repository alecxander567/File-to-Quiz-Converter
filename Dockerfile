# Use a multi-stage build to optimize the image size

# Build the backend
FROM maven:3.8.4-openjdk-17-slim AS backend-build
WORKDIR /app
COPY backend/pom.xml .
RUN mvn dependency:go-offline
COPY backend/src ./src
RUN mvn clean package -DskipTests

# Build the frontend
FROM node:16 AS frontend-build
WORKDIR /app
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Final image
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=backend-build /app/target/*.jar app.jar
COPY --from=frontend-build /app/dist /app/public
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
