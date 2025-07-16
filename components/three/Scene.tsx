"use client";
import React, { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import Model from "./Model";
import Light from "./Light";
import { getGuildData } from "@/lib/utils";
import Gizmo from "./Gizmo";
const Scene = () => {
  useEffect(() => {
    const callApi = async () => {
      const response = await getGuildData();
      console.log(response);
    };
    callApi();
  }, []);
  return (
    <Canvas
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.localClippingEnabled = true;
      }}
      camera={{ position: [0, 10, 20], fov: 10 }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <CameraControls makeDefault />
      <Model />
      <Light />
      <Gizmo />
    </Canvas>
  );
};

export default Scene;
