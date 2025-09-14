import { render, screen } from "@testing-library/vue"
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest"
import { createPinia, setActivePinia } from 'pinia';
import App from "../src/App.vue"

// Mock de Firebase
vi.mock('../src/firebase/config', () => ({
  db: {
    collection: vi.fn().mockReturnThis(),
    doc: vi.fn().mockReturnThis(),
    onSnapshot: vi.fn(() => () => {})
  }
}));

// Mock del store de exchange
const mockExchangeStore = {
  purchasePrice: 3.8,
  salePrice: 3.9,
  loading: false,
  error: null,
  fetchExchangeRates: vi.fn(),
  convertToDollars: vi.fn().mockImplementation((soles) => soles / 3.8),
  convertToSoles: vi.fn().mockImplementation((dollars) => dollars * 3.8),
  $reset: vi.fn(),
  $onAction: vi.fn(),
  $patch: vi.fn(),
  $subscribe: vi.fn(),
  $dispose: vi.fn()
};

vi.mock('../src/stores/exchange', () => ({
  useExchangeStore: vi.fn(() => mockExchangeStore)
}));

describe("App.vue", () => {
  beforeEach(() => {
    // Crear una nueva instancia de Pinia para cada prueba
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("muestra el título principal", async () => {
    render(App);
    
    // Verificar que el título se muestre correctamente
    const titlePart1 = await screen.findByText(/El mejor/);
    const titlePart2 = await screen.findByText(/tipo de cambio/);
    
    expect(titlePart1).toBeTruthy();
    expect(titlePart2).toBeTruthy();
  });

  test("muestra el componente CurrencyConverter", async () => {
    // Renderizar la aplicación
    render(App);
    
    // Verificar que el componente CurrencyConverter se muestre
    const converter = await screen.findByText(/Dolár compra/);
    expect(converter).toBeTruthy();
  });
});
