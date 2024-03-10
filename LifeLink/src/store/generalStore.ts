import {create} from 'zustand';

interface GeneralStore {
  isLoggedIn: boolean;
  setLoginState: () => void;
}

const useGeneralStore = create<GeneralStore>(set => ({
  isLoggedIn: false,
  setLoginState: () => set(state => ({isLoggedIn: state.isLoggedIn})),
}));

export default useGeneralStore;
