FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the JAR file
COPY demo-0.0.1-SNAPSHOT.jar app.jar

# Expose port (default Spring Boot port)
EXPOSE 8080

# Run the JAR
ENTRYPOINT ["java", "-jar", "app.jar"]
