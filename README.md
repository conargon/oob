# OOB

Collaborative tool, made with *Angular* and *Spring Boot*, for multiple development teams, enabling locking of any type of Oracle object (tables, views, PL/SQL stored procedures, etc.) to prevent concurrent modifications by other developers.

![OOB](/public/screen01.png)
![OOB](/public/screen02.png)

## MAKE & INSTALL

Steps:

1. Run the script *oob.sql* located in the *db* folder.
2. Package the backend application in a *war* file and deploy it in a J2EE Server the project located in the *oralock-bg* folder.
2. Package the frontend application in a *war* file and deploy it in a J2EE Server the project located in the *oralock-fd* folder.