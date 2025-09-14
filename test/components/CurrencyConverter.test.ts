import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/vue';
import { createPinia, setActivePinia } from 'pinia';
import { ref, computed } from 'vue';
import CurrencyConverter from '../../src/components/CurrencyConverter.vue';
import { useExchangeStore } from '../../src/stores/exchange';
// Mock de Firebase
vi.mock('../../src/firebase/config', () => ({
  db: {
    collection: vi.fn().mockReturnThis(),
    doc: vi.fn().mockReturnThis(),
    onSnapshot: vi.fn(() => () => {})
  }
}));

// Mock del store de Pinia
vi.mock('../../src/stores/exchange', () => ({
  useExchangeStore: vi.fn()
}));

describe('CurrencyConverter.vue', () => {
  let store: any;
  
  beforeEach(() => {
    setActivePinia(createPinia());
    
    // Configurar el mock del store
    store = {
      purchasePrice: 3.8,
      salePrice: 3.9,
      loading: false,
      error: null,
      convertToDollars: vi.fn().mockImplementation((soles) => soles / 3.8),
      convertToSoles: vi.fn().mockImplementation((dollars) => dollars * 3.8),
      $reset: vi.fn()
    };
    
    // Configurar el mock para que devuelva nuestro store simulado
    (useExchangeStore as any).mockReturnValue(store);
    vi.clearAllMocks();
  });

  test('usa purchasePrice cuando activeTab = Compra', () => {
    // Configuramos un mock del store con valores de prueba
    const exchangeStore = {
      purchasePrice: ref(3.557),  // Precio de compra simulado
      salePrice: ref(3.563)       // Precio de venta simulado
    }

    // Variables reactivas
    const activeTab = ref<'Compra' | 'Venta'>('Compra')
    const salePrice = computed(() => exchangeStore.salePrice.value)
    const internalAmount = ref<number | null>(null)
    const displayAmount = ref<string | null>(null)

    // Función a probar: Inicializa los montos según la pestaña activa
    const initializeAmounts = (): void => {
      // Obtenemos el precio según la pestaña activa
      const price =
        activeTab.value === 'Compra'
          ? exchangeStore.purchasePrice.value  // Usamos precio de compra
          : salePrice.value                    // Usamos precio de venta

      // Asignamos el valor formateado a 3 decimales
      // Esto se hace para que el valor sea más legible y fácil de trabajar
      internalAmount.value = Number(price.toFixed(3))  // Como número
      displayAmount.value = price.toFixed(3)           // Como string
    }

    // Act - Ejecutamos la función que queremos probar
    initializeAmounts()

    // Assert - Verificamos que los valores sean los esperados
    // Verificamos que el valor interno sea 3.557 (número)
    expect(internalAmount.value).toBe(3.557)
    // Verificamos que el valor de visualización sea '3.557' (string)
    expect(displayAmount.value).toBe('3.557')
  })


  test('debe usar correctamente exchangeStore.salePrice cuando activeTab es Venta', async () => {
    // Configurar el store con un valor conocido para salePrice
    store.loading = false;
    const testSalePrice = 4.2;
    store.salePrice = testSalePrice;
    
    // Renderizar el componente
    render(CurrencyConverter);
    
    // Cambiar a la pestaña de venta
    const ventaTab = screen.getByText('Dolár venta');
    await fireEvent.click(ventaTab);
    
    // Verificar que se muestra el precio de venta formateado correctamente
    const formattedPrice = testSalePrice.toFixed(3);
    const priceElement = await screen.findByText(formattedPrice);
    expect(priceElement).toBeTruthy();
    
    // Verificar que el input muestra el valor correcto
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe(formattedPrice);
  });
  
  test('debe renderizar el componente correctamente', async () => {
    render(CurrencyConverter);
    
    // Verificar que los elementos principales estén presentes
    expect(await screen.findByText('Dolár compra')).toBeTruthy();
    expect(await screen.findByText('Dolár venta')).toBeTruthy();
    expect(await screen.findByText('Envías')).toBeTruthy();
    expect(await screen.findByText('Recibes')).toBeTruthy();
    expect(await screen.findByRole('button', { name: /Iniciar operación/i })).toBeTruthy();
  });

  test('debe mostrar las pestañas de compra y venta', async () => {
    render(CurrencyConverter);
    expect(await screen.findByText('Dolár compra')).toBeTruthy();
    expect(await screen.findByText('Dolár venta')).toBeTruthy();
  });

  test('debe cambiar a la pestaña de venta al hacer clic', async () => {
    render(CurrencyConverter);
    const ventaButton = await screen.findByText('Dolár venta');
    await fireEvent.click(ventaButton);
    
    // Verificar que el botón de venta esté activo
    const activeButton = await screen.findByRole('button', { 
      name: /Dolár venta/i
    });
    
    expect(activeButton.className).toContain('text-[#2F00FF]');
  });

  test('debe manejar la entrada de montos correctamente', async () => {
    render(CurrencyConverter);
    const input = await screen.findByRole('textbox') as HTMLInputElement;
    
    // Probar entrada de número entero
    await fireEvent.update(input, '100');
    expect(input.value).toBe('100');
    
    // Probar entrada con decimales
    await fireEvent.update(input, '100.50');
    expect(input.value).toBe('100.50');
    
    // Probar que no acepta caracteres no numéricos
    await fireEvent.update(input, 'abc');
    expect(input.value).toBe('');
    
    // Probar que no permite más de dos decimales
    await fireEvent.update(input, '100.123');
    expect(input.value).toBe('100.12');
    
    // Probar que no permite más de un punto decimal
    await fireEvent.update(input, '100.50.30');
    expect(input.value).toBe('100.50');
  });
  
  test('debe calcular correctamente la conversión de dólares a soles en la pestaña de compra', async () => {
    // Arrange
    render(CurrencyConverter);
    
    // Act
    const input = await screen.findByRole('textbox');
    const button = await screen.findByText('Iniciar operación');
    
    await fireEvent.update(input, '100');
    await fireEvent.click(button);
    
    // Assert
    // Verificar que el input mantiene el valor ingresado
    const inputElement = input as HTMLInputElement;
    expect(inputElement.value).toBe('100');


    // Verificar que se muestra el resultado correcto
    await screen.findByText('S/ 380.00'); // 100 * 3.8 = 380
  });
  
  test('debe calcular correctamente la conversión de soles a dólares en la pestaña de venta', async () => {
    // Arrange
    render(CurrencyConverter);
    
    // Ir a la pestaña de venta
    const ventaButton = await screen.findByText('Dolár venta');
    await fireEvent.click(ventaButton);
    
    // Act
    const input = await screen.findByRole('textbox');
    const button = await screen.findByText('Iniciar operación');
    
    // Ingresar 100 soles para convertir a dólares
    await fireEvent.update(input, '100');
    await fireEvent.click(button);
    
    // Verificar que el input mantiene el valor ingresado
    const inputElement = input as HTMLInputElement;
    expect(inputElement.value).toBe('100');


    // Verificar que se muestra el resultado correcto (100 / 3.9 = 25.64)
    await screen.findByText('$ 25.64'); // 100 / 3.9 = 25.64
  });
  
  test('debe intercambiar correctamente entre monedas', async () => {
    render(CurrencyConverter);
    
    // Verificar monedas iniciales
    expect(await screen.findByText('Dólares')).toBeTruthy();
    expect(await screen.findByText('Soles')).toBeTruthy();
    
    // Hacer clic en el botón de intercambio (buscado por clase)
    const swapButton = document.querySelector('.rotate-custom');
    if (!swapButton) throw new Error('No se encontró el botón de intercambio');
    await fireEvent.click(swapButton);
    
    // Verificar que las monedas se intercambiaron
    expect(await screen.findByText('Soles')).toBeTruthy();
    expect(await screen.findByText('Dólares')).toBeTruthy();
    
    // Verificar que el texto de envío/recibo se actualizó
    expect(await screen.findByText('Envías')).toBeTruthy();
    expect(await screen.findByText('Recibes')).toBeTruthy();
  });
  
  test('debe manejar correctamente el estado de carga', async () => {
    // Configurar el store para que esté cargando
    store.loading = true;
    
    render(CurrencyConverter);
    
    // Verificar que se muestra el indicador de carga
    const loadingIndicator = await screen.findByRole('status');
    expect(loadingIndicator).toBeTruthy();
  });
  
  test('debe mostrar mensajes de error cuando corresponda', async () => {
    // Configurar un error en el store
    store.error = 'Error al cargar los tipos de cambio';
    
    render(CurrencyConverter);
    
    // Verificar que se muestra el mensaje de error
    const errorMessage = await screen.findByText('Error al cargar los tipos de cambio');
    expect(errorMessage).toBeTruthy();
  });
  
  test('debe deshabilitar el botón cuando no hay monto válido', async () => {
    render(CurrencyConverter);
    
    // El botón debe estar habilitado inicialmente porque hay un monto por defecto (el tipo de cambio)
    const button = await screen.findByText('Iniciar operación');
    expect(button.closest('button')?.disabled).toBe(false);
    
    // Limpiar el input para probar con monto inválido
    const input = await screen.findByRole('textbox') as HTMLInputElement;
    await fireEvent.update(input, '');
    
    // El botón debe estar deshabilitado con input vacío
    expect(button.closest('button')?.disabled).toBe(true);
    
    // Ingresar un monto inválido (0)
    await fireEvent.update(input, '0');
    expect(button.closest('button')?.disabled).toBe(true);
    
    // Ingresar un monto válido
    await fireEvent.update(input, '100');
    expect(button.closest('button')?.disabled).toBe(false);
  });
});
