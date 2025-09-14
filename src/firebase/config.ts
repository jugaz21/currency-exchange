import { initializeApp } from 'firebase/app';
import { doc, onSnapshot, initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializar Firebase con configuración específica para CORS
const app = initializeApp(firebaseConfig);

// Configurar Firestore con opciones para desarrollo
const db = initializeFirestore(app, {
  experimentalForceLongPolling: true // Usamos solo esta opción para mejor compatibilidad
});

// Referencia al documento de tasas de cambio
const ratesDocRef = doc(db, import.meta.env.VITE_FIREBASE_COLLETCTION, import.meta.env.VITE_FIREBASE_DOC);

export { db, ratesDocRef, onSnapshot };
