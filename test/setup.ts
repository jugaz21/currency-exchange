// Configuración global para las pruebas
import { expect, beforeEach, vi } from 'vitest';

// Configuración de localStorage mock
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

// Asigna el mock de localStorage al objeto global
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Limpiar localStorage antes de cada prueba
beforeEach(() => {
  window.localStorage.clear();
});
