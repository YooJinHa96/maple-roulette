import { create } from "zustand";
import * as THREE from "three";

const useObjectStore = create<{
  selectedObject: THREE.Object3D | null;
  setSelectedObject: (object: THREE.Object3D | null) => void;
}>((set) => ({
  selectedObject: null,
  setSelectedObject: (object) => set({ selectedObject: object }),
}));

export default useObjectStore;
