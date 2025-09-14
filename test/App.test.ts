import { render, screen } from "@testing-library/vue"
import { describe, it, expect, beforeEach } from "vitest"
import App from "../src/App.vue"
import { createPinia, setActivePinia } from 'pinia';
import { useExchangeStore } from '../src/stores/exchange';

describe("App.vue", () => {
  beforeEach(() => {
    // Create a fresh pinia for each test
    const pinia = createPinia();
    setActivePinia(pinia);
  });

  it("muestra el título principal", async () => {
    render(App)
    
    // The title is split across multiple elements, so we need to check for each part
    const titlePart1 = await screen.findByText(/El mejor/)
    const titlePart2 = await screen.findByText(/tipo de cambio/)
    
    expect(titlePart1).toBeTruthy()
    expect(titlePart2).toBeTruthy()
  })

  it("muestra el componente CurrencyConverter", async () => {
    render(App)
    
    // Check for some unique element in the CurrencyConverter component
    const converter = await screen.findByText(/Dolár compra/)
    expect(converter).toBeTruthy()
  })
})
