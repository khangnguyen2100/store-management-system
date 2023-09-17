import { create } from 'zustand';

import { createCounterSlice } from './slices';
import { CounterState } from './types';

type Store = CounterState;

export const useStore = create<Store>()((...a) => ({
  ...createCounterSlice(...a),
}));

export default useStore;

// redux dev tools integration
if (typeof window !== 'undefined') {
  const connection = (window as any).__REDUX_DEVTOOLS_EXTENSION__?.connect({
    name: 'name Field',
  });
  connection?.init(useStore.getState());
  useStore.subscribe(newState => {
    connection?.send('State', newState);
  });
}
