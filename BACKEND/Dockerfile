# Stage 1: Build the application
FROM maven:3.8.3-openjdk-17-slim AS build
WORKDIR /home/app
COPY . /home/app
RUN mvn -f /home/app/pom.xml clean package

# Stage 2: Run the application
FROM openjdk:17-jdk-slim
COPY --from=build /home/app/target/*.jar /usr/local/lib/app.jar
EXPOSE 80
ENTRYPOINT ["java","-jar","/usr/local/lib/app.jar"]