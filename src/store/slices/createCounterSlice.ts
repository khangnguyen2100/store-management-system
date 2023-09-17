import { StateCreator } from 'zustand';

import { CounterState } from '../types/counter';

const createCounterSlice: StateCreator<CounterState> = set => ({
  count: 999,
  increment: () => set(state => ({ count: state.count + 1 })),
  decrement: () => set(state => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
});
export default createCounterSlice;
