import { create } from "zustand";
import axios from "axios";

interface ModalState {
  activeModal: string | null;
  formData: Record<string, any>;
  openModal: (modalName: string) => void;
  closeModal: () => void;
  updateFormData: (field: string, value: any) => void;
  resetForm: () => void;
  submitForm: () => Promise<void>;
}

export const useModalStore = create<ModalState>((set, get) => ({
  activeModal: null,
  formData: {},

  openModal: (modalName) => set({ activeModal: modalName, formData: {} }),
  closeModal: () => set({ activeModal: null, formData: {} }),

  updateFormData: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value },
    })),

  resetForm: () => set({ formData: {} }),

  submitForm: async () => {
    try {
      const { formData, activeModal } = get();

      let apiUrl = "";
      switch (activeModal) {
        case "addFarm":
          apiUrl = "http://localhost:4000/farms";
          break;
        case "addManualData":
          apiUrl = "http://localhost:4000/manual-data";
          break;
        case "configureFarm":
          apiUrl = "http://localhost:4000/configure-farm";
          break;
        case "purchaseDevice":
          apiUrl = "http://localhost:4000/purchase-device";
          break;
        case "raiseTicket":
          apiUrl = "http://localhost:4000/raise-ticket";
          break;
        default:
          return;
      }

      const response = await axios.post(apiUrl, formData);
      console.log("Response:", response.data);

      alert("Data submitted successfully!");
      set({ activeModal: null, formData: {} });
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data.");
    }
  },
}));
