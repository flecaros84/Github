FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copia el JAR compilado
COPY target/*.jar app.jar

# Exponer el puerto dinámico o por defecto
EXPOSE 8080

# Ejecutar sin perfiles (usará application.properties + variables de entorno)
ENTRYPOINT ["java","-jar","app.jar"]