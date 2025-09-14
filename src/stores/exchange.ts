import { defineStore } from 'pinia';
import { ref, computed, onUnmounted } from 'vue';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useExchangeStore = defineStore('exchange', () => {
  // Estado
  const purchasePrice = ref(0);
  const salePrice = ref(0);
  const loading = ref(true);
  const error = ref<string | null>(null);

  // Referencia al documento de tasas de cambio
  const ratesDocRef = doc(db, 'rates', 'TDmXIypgLKKfNggHHSnw');
  
  // Escuchar cambios en Firestore
  const unsubscribe = onSnapshot(
    ratesDocRef,
    (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        if (data) {

          purchasePrice.value = data.purchase_price || 0;
          salePrice.value = data.sale_price || 0;
          loading.value = false;
          error.value = null;
        }
      } else {
        error.value = 'No se encontró el documento de tasas de cambio';
        loading.value = false;
      }
    },
    (err) => {
      error.value = 'Error al conectar con la base de datos. Recargando...';
      loading.value = false;
      console.error('Error en la suscripción a Firestore:', err);
      // Intentar reconectar después de un tiempo
      setTimeout(() => window.location.reload(), 3000);
    }
  );

  // Getters
  const rates = computed(() => ({
    purchase: purchasePrice.value,
    sale: salePrice.value
  }));

  // Acciones
  function convertToDollars(soles: number): number {
    if (!salePrice.value) return 0;
    const result = soles / salePrice.value;
    // Redondear a 2 decimales para moneda
    return Math.round(result * 100) / 100;
  }

  function convertToSoles(dollars: number): number {
    if (!purchasePrice.value) return 0;
    const result = dollars * purchasePrice.value;
    // Redondear a 2 decimales para moneda
    return Math.round(result * 100) / 100;
  }

  // Clean up subscription on unmount
  function $reset() {
    if (unsubscribe) {
      unsubscribe();
    }
  }
  
  // Clean up on component unmount
  onUnmounted(() => {
    $reset();
  });

  return {
    // Estado
    purchasePrice,
    salePrice,
    loading,
    error,
    
    // Getters
    rates,
    
    // Acciones
    convertToDollars,
    convertToSoles,
    $reset
  };
});
