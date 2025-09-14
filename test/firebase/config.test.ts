import { describe, it, expect, vi, beforeEach } from "vitest";

// 🚀 define los mocks directamente dentro del vi.mock
vi.mock("firebase/firestore", () => {
  return {
    initializeFirestore: vi.fn(() => "mockedFirestore"),
    doc: vi.fn(() => "mockedDoc"),
    onSnapshot: vi.fn(),
  };
});

vi.mock("firebase/app", () => {
  return {
    initializeApp: vi.fn(() => "mockedApp"),
  };
});

// ⚠️ importa después de los mocks
import { db } from "../../src/firebase/config";

describe("Firebase Config", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debería inicializar Firestore", () => {
    expect(db).toBe("mockedFirestore");
  });
});
