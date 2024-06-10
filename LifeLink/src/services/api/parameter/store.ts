import {create} from 'zustand';
import {Item} from './types';

interface ParameterStore {
  illness: Item[];
  medication: Item[];
  specialNeeds: Item[];
  prosthesis: Item[];
  setIllness: (items: Item[]) => void;
  setMedication: (items: Item[]) => void;
  setSpecialNeeds: (items: Item[]) => void;
  setProsthesis: (items: Item[]) => void;
}

const useParameterStore = create<ParameterStore>(set => ({
  illness: [],
  medication: [],
  specialNeeds: [],
  prosthesis: [],
  setIllness: items => set({illness: items}),
  setMedication: items => set({medication: items}),
  setSpecialNeeds: items => set({specialNeeds: items}),
  setProsthesis: items => set({prosthesis: items}),
}));

export default useParameterStore;
