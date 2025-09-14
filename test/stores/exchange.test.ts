import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useExchangeStore } from '../../src/stores/exchange';

// ======================
// Mocks de Firebase
// ======================
vi.mock('firebase/firestore', () => {
  const mockOnSnapshot = vi.fn();
  const mockDoc = vi.fn();
  const mockUnsubscribe = vi.fn();

  return {
    onSnapshot: mockOnSnapshot,
    doc: mockDoc,
    getFirestore: vi.fn(),
    initializeFirestore: vi.fn(),
    // exportar los mocks para poder acceder en los tests
    __mocks: { mockOnSnapshot, mockDoc, mockUnsubscribe },
  };
});

vi.mock('../../src/firebase/config', () => ({
  db: {},
  ratesDocRef: { path: 'rates/TDmXIypgLKKfNggHHSnw' },
}));

// Tipos para snapshot simulado
type MockSnapshot = {
  exists: () => boolean;
  data: () => { purchase_price?: number; sale_price?: number };
};

describe('useExchangeStore', () => {
  let store: ReturnType<typeof useExchangeStore>;
  let mockOnSnapshot: any;
  let mockDoc: any;
  let mockUnsubscribe: any;
  let mockOnNext: (snapshot: MockSnapshot) => void;
  let mockOnError: (error: Error) => void;

  beforeEach(async () => {
    setActivePinia(createPinia());

    // Importar mocks de firestore que devolvimos en __mocks
    const firestore = await vi.importMock<any>('firebase/firestore');
    mockOnSnapshot = firestore.__mocks.mockOnSnapshot;
    mockDoc = firestore.__mocks.mockDoc;
    mockUnsubscribe = firestore.__mocks.mockUnsubscribe;

    // Resetear
    mockOnSnapshot.mockReset();
    mockDoc.mockReset();
    mockUnsubscribe.mockReset();

    // Configurar comportamiento
    mockOnSnapshot.mockImplementation((docRef, onNext, onError) => {
      mockOnNext = onNext;
      mockOnError = onError || (() => {});
      return mockUnsubscribe;
    });

    mockDoc.mockReturnValue({ path: 'rates/TDmXIypgLKKfNggHHSnw' });

    store = useExchangeStore();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debe inicializar con valores por defecto', () => {
    expect(store.purchasePrice).toBe(0);
    expect(store.salePrice).toBe(0);
    expect(store.loading).toBe(true);
    expect(store.error).toBeNull();
  });

  it('debe suscribirse a cambios en Firestore', () => {
    expect(mockOnSnapshot).toHaveBeenCalledTimes(1);
    expect(mockDoc).toHaveBeenCalledWith({}, 'rates', 'TDmXIypgLKKfNggHHSnw');
  });

  it('debe actualizar precios cuando Firestore cambia', async () => {
    mockOnNext({
      exists: () => true,
      data: () => ({ purchase_price: 3.85, sale_price: 3.95 }),
    });

    await new Promise((r) => setTimeout(r, 0));

    expect(store.purchasePrice).toBe(3.85);
    expect(store.salePrice).toBe(3.95);
    expect(store.loading).toBe(false);
    expect(store.error).toBeNull();
  });

  it('debe manejar error de Firestore', async () => {
    const error = new Error('Error de conexión');
    mockOnError(error);

    await new Promise((r) => setTimeout(r, 0));

    expect(store.error).toBe('Error al conectar con la base de datos. Recargando...');
    expect(store.loading).toBe(false);
  });

  it('debe limpiar la suscripción al resetear', () => {
    store.$reset();
    expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
  });

  it('debe convertir de soles a dólares', () => {
    store.salePrice = 3.8;
    expect(store.convertToDollars(38)).toBeCloseTo(10);
  });

  it('debe convertir de dólares a soles', () => {
    store.purchasePrice = 3.9;
    expect(store.convertToSoles(10)).toBeCloseTo(39);
  });
});
