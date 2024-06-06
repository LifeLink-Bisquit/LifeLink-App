// src/store/useLocalizationStore.ts
import {createStore, useStore} from 'zustand';
import i18next from 'i18next';

type LocalizationState = {
  language: string;
  changeLanguage: (newLanguage: string) => void;
};

const store = createStore<LocalizationState>(set => ({
  language: i18next.language,
  changeLanguage: (newLanguage: string) => {
    i18next.changeLanguage(newLanguage);
    set({language: newLanguage});
  },
}));

export const useLocalizationStore = () => useStore(store);
