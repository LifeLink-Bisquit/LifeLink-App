import {create} from 'zustand';
import {STORAGE_KEYS, storage} from '../constants/app.utils';

interface GeneralStore {
  isLoggedIn: boolean;
  loading: boolean;
  role: string;
  setLoginState: (isLoggedIn: boolean) => void;
  setLoadingState: (loading: boolean) => void;
  setRole: (role: string) => void;
}

const useGeneralStore = create<GeneralStore>(set => ({
  isLoggedIn: storage.contains(STORAGE_KEYS.TOKEN),
  loading: false,
  role: '',
  setLoginState: isLoggedIn => set({isLoggedIn: isLoggedIn}),
  setLoadingState: loading => set({loading: loading}),
  setRole: role => set({role: role}),
}));

export default useGeneralStore;
