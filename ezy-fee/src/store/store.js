import { create } from 'zustand';
import { devtools, persist} from 'zustand/middleware';

const store = (set) => ({
    user: null,
    setUser: (user) =>set({ user }),
    clearUser: () => set({user: null})
})

const useStore = create(devtools(persist(store,{name: 'user'})));

export default useStore;