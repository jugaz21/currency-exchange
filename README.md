# Aplicación de Conversión de Monedas

Aplicación web para conversión de monedas desarrollada con Vue 3, TypeScript, Pinia y Firebase.

## Requisitos Previos

- Node.js (versión 18 o superior)
- npm (viene con Node.js) o yarn
- Una cuenta de Firebase (para la configuración de autenticación y base de datos)

## Configuración del Entorno

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd currency-exchange
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o si usas yarn
   # yarn install
   ```

3. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto
   - Copia las variables de configuración de Firebase desde la consola de Firebase
   - El archivo debería verse así:
     ```
     VITE_FIREBASE_API_KEY=tu_api_key
     VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=tu_proyecto_id
     VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
     VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
     VITE_FIREBASE_APP_ID=tu_app_id
     ```

## Ejecutar la Aplicación

### Modo Desarrollo

Para iniciar el servidor de desarrollo con recarga en caliente:

```bash
npm run dev
# o
yarn dev
```

La aplicación estará disponible en: http://localhost:5173

### Construir para Producción

Para crear una versión optimizada para producción:

```bash
npm run build
# o
yarn build
```

Los archivos de producción se generarán en el directorio `dist/`.

### Vista Previa de Producción

Para previsualizar la versión de producción localmente:

```bash
npm run preview
# o
yarn preview
```

## Ejecutar Pruebas

Para ejecutar las pruebas unitarias:

```bash
npm test
# o
yarn test
```

Para ejecutar las pruebas con cobertura de código:

```bash
npm run coverage
# o
yarn coverage
```

## Estructura del Proyecto

- `src/` - Código fuente de la aplicación
  - `components/` - Componentes de Vue
  - `stores/` - Tiendas de Pinia
  - `firebase/` - Configuración de Firebase
- `test/` - Pruebas unitarias
- `public/` - Archivos estáticos

## Tecnologías Utilizadas

- Vue 3 - Framework de JavaScript progresivo
- TypeScript - Superset de JavaScript tipado
- Pinia - Gestión de estado
- Firebase - Autenticación y base de datos
- Vitest - Framework de pruebas
- Tailwind CSS - Framework de estilos

## LINK 
[https://currency-exchange-steel.vercel.app/](https://currency-exchange-steel.vercel.app/)

