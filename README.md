# pil-cypress

Ejemplo basico de uso de Cypress (sin cucumber)

## INDICE

- [Como comenzar](#como-comenzar) -[Instalacion de dependencias](#instalacion-de-dependencias)
- [Escenarios a testear](#escenarios-a-testear)
- [Como ejecutar los test](#como-ejecutar-los-test)

# Como comenzar

# Instalacion de dependencias

Luego de clonar o descargar el repositorio, empelear la consola/terminal y
escribir:

> npm install

Se auto-generara una carpeta denominada "node-modules" con los archivos
necesarios para poder ejectuar los tests.

Para instalar cypress-image-diff se realiza el siguiente comando

> npm install cypress-image-diff-js

se agrega en e2e el siguiente codigo

const compareSnapshotCommand = require("cypress-image-diff-js/dist/command");
compareSnapshotCommand();

y se termina con el agregado del siguiente codigo en cypress.config.js

require("cypress-image-diff-js/dist/plugin")(on, config);
return config;

# Escenarios a Testear

[x] Barra de navegacion
[x] Ir arriba
[x] Boton Reservar
[x] Imagenes
[x] Boton de donar
[] Botoncitos circulares para pasar imagenes

# Como ejecutar los test

Para ejecutar los test se debe correr el comando "npm run cypress:open:desktop".
Cualquier comando del package.json es valido para esto.
