import { create } from "zustand";

interface BearState {
  counter: number;
  increase: (by: number) => void;
}

const useCounterStore = create<BearState>()((set) => ({
  counter: 0,
  increase: (by) => set((state) => ({ counter: state.counter + by })),
}));
export default useCounterStore;
