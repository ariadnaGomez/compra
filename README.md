# Tabla de contenidos
- [Introducción](#introducción)
- [Guías de diseño](#guías-de-diseño)
- [Instalación](#instalación)
- [Entorno de desarrollo](#entorno-de-desarrollo)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Pendiente](#pendiente)

# Introducción
Proyecto semilla (seed) para **App moviles híbridas UI-Web** que parte de la base creada en la inicializacion de un proyecto con [Ionic](http://ionicframework.com/), en concreto se ha utilizado el comando _ionic start app-ionic sidemenu_, incluyendose tareas de construccion basadas en el template de John Papa, [Hot Towel](https://github.com/johnpapa/generator-hottowel):
- Generación de estilos con [Sass](http://sass-lang.com/)
- Generación de cache de templates de [AngularJS](https://angularjs.org/)
- Optimización de imagenes
- Inyección de dependencias CSS y JavaScript en index.html
- Plugin [ngAnnotate](https://github.com/olov/ng-annotate)
- Minificacion de estilos CSS
- Concatenación y minificacion de código JavaScript
- Ejecución de pruebas con [Karma](http://karma-runner.github.io/0.13/index.html)
- Generación de reportes de pruebas unitarias y cobertura
- Generación de reportes de calidad de código con [plato](https://github.com/es-analysis/plato)
- Revision de código con [jscs](http://jscs.info/) y [jshint](http://jshint.com/)
- Automatización de pruebas funcionales E2E
- Mocks de servicios con ngMockE2E

# Guías de diseño
El proyecto sigue los patrones de diseño de John Papa: [Angular Style Guide](https://github.com/johnpapa/angular-styleguide)

## Otras referencias:
### AngularJS:
- [John Papa - AngularJS Patterns: Clean Code](http://www.pluralsight.com/courses/angularjs-patterns-clean-code)
- [AngularJS - Developer Guide](https://docs.angularjs.org/guide)
- [Egghead.io - AngularJS Lessons](https://egghead.io/technologies/angularjs)

### Ionic
- [Ionic Framework - Documentation](http://ionicframework.com/docs/)
- [Ionic IO - Documentation](http://docs.ionic.io/)

### Cordova
- [Apache Cordova](https://cordova.apache.org/)
- [ngCordova - Plugins](http://ngcordova.com/docs/plugins/)

### Pruebas unitarias
- [Full-Spectrum Testing with AngularJS and Karma](http://www.yearofmoo.com/2013/01/full-spectrum-testing-with-angularjs-and-karma.html)
- [An Introduction To Unit Testing In AngularJS Applications](http://www.smashingmagazine.com/2014/10/introduction-to-unit-testing-in-angularjs/)
- [Advanced Testing and Debugging in AngularJS](http://www.yearofmoo.com/2013/09/advanced-testing-and-debugging-in-angularjs.html)
- [AngularJS - Developer Guide / Unit Testing](https://docs.angularjs.org/guide/unit-testing)
- [AngularJS - Developer Guide / E2E Testing](https://docs.angularjs.org/guide/e2e-testing)

### Pruebas e2e
- [Protractor](http://angular.github.io/protractor)
- [Elementor](https://github.com/andresdominguez/elementor)

# Instalación

## Prerequisitos
1.- Instalar [Node.js](http://nodejs.org)
- En OSX usar [homebrew](http://brew.sh) `brew install node`
- En Windows usar [chocolatey](https://chocolatey.org/) `choco install nodejs`

Si se necesita tener diferentes versiones de Node.js se puede utilizar [Node Version Manager](https://github.com/creationix/nvm)

2.- Entornos de desarrollo para iOS y Android:
- iOS: instalar [Xcode](https://developer.apple.com/xcode/) (se necesita OSX)
- Android:
  - [SDK de Android](https://developer.android.com/sdk/installing/index.html)
  - [JDK 7](http://www.oracle.com/technetwork/es/java/javase/downloads/jdk7-downloads-1880260.html)

## Inicialización
Para inicializar el proyecto:

```
npm install -g cordova ionic@1.7.6 gulp bower jscs
bower install
npm install
./node_modules/.bin/webdriver-manager update
```

Una vez se tiene el proyecto inicializado se puede construir y ejecutar en un navegador:

```
gulp build
ionic serve
```

Si se quiere ejecutar en un emulador o dispositivo es preciso inicializar previamente las plataformas (ios y/o android) y los plugins de Apache Cordova:

```
ionic state restore
```
# Entorno de desarrollo
Se puede emplear, por ejemplo, alguna de las siguientes herramientas para la edición del código del proyecto: [Atom](https://atom.io/), [Sublime](http://www.sublimetext.com/3), [WebStorm](https://www.jetbrains.com/webstorm/)

Atom es un editor altamente hackable y libre (gratis), lo que lo convierte en una opción muy recomendable. Se incluyen a continuación algunos plugins de utilidad para Atom:
- [angularjs](https://atom.io/packages/angularjs)
- [angularjs-snippets](https://atom.io/packages/angularjs-snippets)
- [docblockr](https://atom.io/packages/docblockr)
- [emmet](https://atom.io/packages/emmet)
- [jscs-fixer](https://atom.io/packages/jscs-fixer)
- [jshint](https://atom.io/packages/jshint)
- [linter](https://atom.io/packages/linter)
- [linter-jscs](https://atom.io/packages/linter-jscs)
- [local-history](https://atom.io/packages/local-history)
- [markdown-preview-plus-opener](https://atom.io/packages/markdown-preview-plus-opener)
- [markdown-toc](https://atom.io/packages/markdown-toc)
- [markdown-toc](https://atom.io/packages/markdown-toc)
- [markdown-writer](https://atom.io/packages/markdown-writer)
- [minimap](https://atom.io/packages/minimap)
- [term2](https://atom.io/packages/term2)
- [tidy-markdown](https://atom.io/packages/tidy-markdown)
- [save-session](https://atom.io/packages/save-session)

## Uso habitual
Para desarrollar se recomienda visualizar la aplicación en un navegador o emulador iOS/Android:
1. Ejecutar en una ventana de comandos `gulp build --mocks` para construir la aplicación en el directorio www, incluyendo los mocks de la carpeta src/client/mocks, y tener una versión sincronizada con los fuentes de src/client.
2. A continuación ejecutar el siguiente comando en función de donde se quiere visualizar la aplicación:
  - Navegador: `ionic serve`.
  - Emulador: `ionic emulate --livereload <PLATFORM>`
  - Dispositivo: `ionic run --livereload <PLATFORM>`

Donde `<PLATFORM>` puede ser `ios` o `android` (o no especificar ningún valor y utilizar el de por defecto).

Tanto en el navegador como el emulador iOS/Android, en backgroud se ejecuta un watch sobre el directorio src/client de forma que los cambios que se realicen en los fuentes de la aplicación se sincronizan en la carpeta www y se actualizan de forma automática en el navegador, emulador o dispositivo. El watch incluye la opcion `--mocks` por que aunque no se haya construido con mocks si se realiza alguna modificación se hace rebuild incluyendo los mocks. Si se desea desarrollar sin mocks eliminar dicha opcion en el fichero ionic.project.

La visualización en un navegador sólo es de utilidad si no se necesita la ejecución de plugins de Apache Cordova, en caso contrario es necesario la visualización en un emulador o dispositivo real.

Para probar la versión optimizada de la aplicación (código JavaScript y CSS contenado y minificado) ejecutar `gulp package` y a continuación visualizar la aplicacion en un navegador, emulador o dispositivo real utilizando los comandos anteriores de ionic (sin la opción `--livereload`)

## Tareas de construcción
Listado de tareas principales de Gulp:

Tarea    | Descripción
-------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
help     | Muestra el listado de tareas principales y secundarias
vet      | Analiza el código JavaScript de la aplicación con jscss  y jshint
plato    | Genera el informe de calidad de código JavScript de la aplicación en el directorio /reports
test     | Ejecuta las pruebas unitarias de la aplicación. Los informes junit y de cobertura de guardan en el directorio /reports
autotest | Ejecuta de forma continua las pruebas unitarias de  la aplicación para realizar TDD. Si se ejecuta con la opción `--debug` se abre un navegador Chrome para poder depurar la ejecución de las pruebas
e2e      | Ejecuta las pruebas end to end. Previamente se tiene que tener la aplicacion publicada para ser ejecutada desde un navegador: `gulp build --mocks` y a continuación `ionic serve`. También se puede ejecutar en modo standalone y no es necesario construir ni servir con ionic en otra ventana de comandos: `gulp e2e --standalone --mocks`
jscs-fix     | Ejecuta jscs en modo fix para resolver los errores de formato del código de la aplicación de forma automática
build    | Analiza el código, ejecuta los test, compila Sass, genera templates de AngularJS, inyecta dependencias de bower, ficheros JavaScript y css en index.html, y copia el código de la aplicación en el directorio www.
         | Si se ejecuta con la opción `--mocks` se incluyen los mocks de la carpeta /src/client/mocks
         | `--env="preproduction" --uglify="true"`
watch    | Construye el proyecto y queda a la espera de cambios para realizar re-build
package  | Analiza el código, ejecuta los test, optimiza la aplicacion (minimiza css, inyecta dependencias explicitas de AngularJS, concatena JavaScript de la aplicación, minimiza JavaScript de aplicación y terceros, optimiza imagenes, incluye hash en el nombre de ficheros JavaScript), y copia la versión optimizada de la aplicación en el directorio www
clean    | Borra los directorios reports y www
dist     | Realiza el empaquetado de la aplicación, incluyendo configuración de plataformas ios y android, y plugins de Apache Cordova. Sube el paquete a PhoneGap para generar/descargar los ficheros IPA y APK. Sube la actualización de la aplicación a TestFairy

# Estructura del proyecto
Resumen de directorios que contiene el proyecto:

Directorio/Fichero | Descripción
------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
/hooks             | Hooks que se pueden incluir en el proceso de consturcción de Apache Cordova
/node_modules      | Modulos npm generados al ejecutar _npm install_ en el raiz del proyecto. Este directorio es generado y no se sube al repositorio de código
/platforms         | Proyectos nativos (iOS y Android). Es autogenerado con _ionic state restore_ y no se sube al repositorio de código
/plugins           | Plugins de Apache Cordova. Este directorio es generado con _ionic state restore_ y no se sube al repositorio de código. Para añadir nuevos plugin utilizar _ionic plugin add_
/reports           | Reportes generados por tareas de Gulp (cobertura, junit, plato) y no se sube al repositorio de código
/src               | Código del proyecto
/src/client        | Codigo de la App
/src/client/app    | Estructura modular que agrupan funcionalidades, incluyendo ficheros JavaScript, Template y Specs, en vez de utilizar una estructura plana de carpetas agrupadas por tipo de fichero de código (js, templates, test). Ver [Estructura de la aplicación](#estructura-de-la-aplicación)
/src/client/cache  | Fichero JavaScript con los templates de AngularJS. Es un directorio autogenerado por tareas de Gulp y no se versiona en el repositorio
/src/client/css    | Ficheros css y fonts. Es un directorio generado por tareas de Gulp y no se versiona en el repositorio
/src/client/img    | Ficheros de imagenes
/src/client/lib    | Dependencias manegadas con Bower. Es un directorio generado con el comando _bower intall_ y no se versiona en el repositorio de código
/src/client/scss   | Fichero Sass
/src/test/e2e      | Pruebas end to end
/src/test/helpers  | Ficheros de ayuda para la ejecución de la pruebas
/src/index.html    | Fichero index de la App
/src/mocks         | Módulo que incluye mocks de servicios para pruebas E2E
/www               | Directorio build de la App. Utilizado por Apache Cordova como código Web
.bowerrc           | Especifica el directorio donde se graban las depedencias de la aplicación manegadas con Bower
.gitignore         | Ficheros y directoris ignorados por git y no versionados en el repositorio
.io-config.json    | Configuración manejada por Ionic Platform (ionic.io)
.jscsrc            | Configuración de reglas de estilo de jscsrc
.jscsrc            | Configuración de reglas de validación de jshint
bower.json         | Configuración de depedencias de la aplicación
config.xml         | Configuración de Apache Cordova
gulpfile.js        | Configuración de Gulp. Incluye la tareas para automatizar la construcción del proyecto
ionic.project      | Identificador de la aplicación en ionic.io
karma.conf.js      | Configuración de Karma para la ejecución de las pruebas unitarias
package.json       | Configuración de npm. Incluye dependencias utilizadas por Gulp para construcción del proyecto y la configuración de ionic de plataformas (iOS y Android) y plugins de Apache Cordova

## Estructura de la aplicación
En el directorio src/client/app se incluye el código de la aplicación con la siguiente estructuración

### Blocks
El directorio blocks contiene bloques de código registrados en módulos que se pueden reutilizar entre diferentes aplicaciones.

### Core
El módulo core incluye:
- Configuración base de la aplicación
- Importación de los módulos comunes
- Servicios de acceso a datos comunes
- Servicios de utilidad comunes

### Layout
Incluye los componentes que definen el layout de la aplicación, como por ejemplo, vistas y controladores que actuan como contenedores de la aplicacion, elementos de navegación, menus, plantillas, áreas de contenidos, etc.

### Features
El directorio features incluye los módulos que implementan las funcionalidades de la aplicación.

Cada uno de los módulos puede a su vez dividirse en submódulos de forma recurrente si es conveniente por claridad y para mantener el principio de única responsabilidad.

### Services
Este directorio incluye los servicios (reglas comunes de negocio, datos, etc.) utilizados por las funcionalidades de la aplicación.

### Widgets
El módulo widget incluye directivas y filtros comunes.
