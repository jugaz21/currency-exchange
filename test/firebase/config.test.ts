import { describe, test, expect, vi, beforeEach } from "vitest";
import { db } from "../../src/firebase/config";

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

describe("Firebase Config", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("debería inicializar Firestore", () => {
    expect(db).toBe("mockedFirestore");
  });
});
