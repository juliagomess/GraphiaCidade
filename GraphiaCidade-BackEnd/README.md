# graphia-server

Minimal [Spring Boot](http://projects.spring.io/spring-boot/) sample app.

## Requirements

For building and running the application you need:

- [JDK 1.8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- [Maven 4](https://maven.apache.org)
- [MongoDB](https://www.mongodb.com)

## Running the application locally

There are several ways to run a Spring Boot application on your local machine. One way is to execute the `main` method in the `de.codecentric.springbootsample.Application` class from your IDE.

Alternatively you can use the [Spring Boot Maven plugin](https://docs.spring.io/spring-boot/docs/current/reference/html/build-tool-plugins-maven-plugin.html) like so:

```shell
mvn spring-boot:run
```
## Running with intellij
Another useful way is to import the project using the IntelliJ idea. the idea will hide the lower-level commands to make them easier to use.
  - download intellij from jetbrains
  - select import project
  - select the pom file
  - import project]
  - find the annotation @SpringBootApplication
  - a little green play button will appear on the left
  - then you'll be able to run the project directly inside IntelliJ
## DB
MongoDB is required for this project, fortunately, spring boot auto-configures everything from scratch without any human interaction.
you can install MongoDB using docker which I recommend, or install mongo manually, however, everything that  BE needs is a database running in somewhere 
## Basic configuration
The application.properties file is responsible to hold all BE configurations. You can find the application.properties.tpl which contains the basic configuration
