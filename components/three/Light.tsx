import { Environment } from "@react-three/drei";

const Light = () => {
  return (
    <>
      <Environment files="hdr/syferfontein_0d_clear_puresky_1k.hdr" />
      <ambientLight intensity={2} color={"#fff"} />
      <directionalLight
        castShadow
        shadow-bias={-0.0001}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        intensity={1.5}
        color={"#fff"}
        position={[-1, 3, 1]}
        visible={true}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
    </>
  );
};
export default Light;
