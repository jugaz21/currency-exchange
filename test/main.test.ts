import { describe, test, expect, vi } from 'vitest';

// Mock básico de la aplicación Vue
const mockApp = {
  use: vi.fn().mockReturnThis(),
  mount: vi.fn()
};

// Mock de Vue
vi.mock('vue', () => ({
  createApp: vi.fn(() => mockApp)
}));

// Mock de Pinia
vi.mock('pinia', () => ({
  createPinia: vi.fn(() => ({})),
  defineStore: vi.fn()
}));

// Mock de Firebase
vi.mock('../src/firebase/config', () => ({
  db: {},
  auth: {}
}));

// Mock del componente App
vi.mock('../src/App.vue', () => ({
  default: {
    template: '<div>Test App</div>'
  }
}));

describe('main.ts', () => {
  test('debería inicializar la aplicación sin errores', async () => {
    // Esta prueba solo verifica que el archivo se puede importar sin errores
    await expect(import('../src/main')).resolves.not.toThrow();
  });

  test('debería crear una instancia de la aplicación', async () => {
    const { createApp } = await import('vue');
    await import('../src/main');
    expect(createApp).toHaveBeenCalled();
  });

  test('debería montar la aplicación en el elemento #app', async () => {
    await import('../src/main');
    expect(mockApp.mount).toHaveBeenCalledWith('#app');
  });
});
