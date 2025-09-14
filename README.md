# Aplicación de Conversión de Monedas

Aplicación web para conversión de monedas desarrollada con Vue 3, TypeScript, Pinia y Firebase.

## Requisitos Previos

- Node.js (versión 24.6.0 o superior)
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
   - Copia el archivo `.env.template` y renómbralo a `.env`
   - Abre el archivo `.env` y reemplaza los valores de ejemplo con tus credenciales de Firebase
   - Las credenciales las puedes obtener desde la consola de Firebase en la configuración de tu proyecto
   - El archivo debería verse similar a esto (pero con tus propias credenciales):
     ```
     VITE_FIREBASE_API_KEY=tu_api_key_aqui
     VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.com
     VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
     VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.com
     VITE_FIREBASE_MESSAGING_SENDER_ID=123..
     VITE_FIREBASE_APP_ID=1...
     ```
   - **Importante**: Nunca compartas tu archivo `.env` ni subas credenciales reales al control de versiones. El archivo `.env` está incluido en `.gitignore` por defecto para evitar esto.

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

## Enlace a la Aplicación

La aplicación está desplegada en: [https://currency-exchange-steel.vercel.app/](https://currency-exchange-steel.vercel.app/)




