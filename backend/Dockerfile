#when specifying the packaging with jar sprong boot will package the tomcat server inside jar file(embeded tomcat server inside jar file ! )
# so we need to build our application to generate the jar file which will be used after as a target folder for deployment so that's why we will use multistaging
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

COPY . .

RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]