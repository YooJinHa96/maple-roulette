"use client";

import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import Model from "./Model";
import Light from "./Light";
import Gizmo from "./Gizmo";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useCameraStore } from "@/store/cameraStore";
const Scene = () => {
  const { setCamera, setCameraControls } = useCameraStore();
  const ref = useRef<CameraControls | null>(null);
  useEffect(() => {
    if (ref.current) {
      console.log(ref.current);
      ref.current.setLookAt(
        0.17997776439297952,
        1.7994428240655913,
        8.788386450475647,
        0.1682828973248205,
        1.6951550023320716,
        7.7939080543692585
      );
      setCameraControls(ref.current);
    }
  }, [ref.current]);
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl, camera }) => {
        gl.localClippingEnabled = true;

        setCamera(camera as THREE.PerspectiveCamera);
      }}
      camera={{
        position: [0.17997776439297952, 1.7994428240655913, 8.788386450475647],
        rotation: [
          -0.1044849626970507, 0.01169513366889828, 0.001226403313845441,
        ],
        fov: 10,
      }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <CameraControls makeDefault ref={ref} />
      <Model />
      <Light />
      <Gizmo />
    </Canvas>
  );
};

export default Scene;
