import {create} from 'zustand';
import {Item} from './types';

interface ParameterStore {
  illness: Item[];
  medication: Item[];
  setIllness: (items: Item[]) => void;
  setMedication: (items: Item[]) => void;
}

const useParameterStore = create<ParameterStore>(set => ({
  illness: [],
  medication: [],
  setIllness: items => set({illness: items}),
  setMedication: items => set({medication: items}),
}));

export default useParameterStore;
