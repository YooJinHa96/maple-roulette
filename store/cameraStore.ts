import { create } from "zustand";
import * as THREE from "three";
import { CameraControls } from "@react-three/drei";

export const useCameraStore = create<{
  camera: THREE.PerspectiveCamera;
  cameraControls: CameraControls | null;
  setCamera: (camera: THREE.PerspectiveCamera) => void;
  setCameraControls: (cameraControls: CameraControls) => void;
}>((set) => ({
  camera: new THREE.PerspectiveCamera(),
  cameraControls: null,
  setCamera: (camera) => set({ camera }),
  setCameraControls: (cameraControls) => set({ cameraControls }),
}));
