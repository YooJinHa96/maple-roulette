import { TransformControls } from "@react-three/drei";
import useObjectStore from "@/store/ObjectStore";

const Gizmo = () => {
  const { selectedObject } = useObjectStore();
  if (selectedObject) {
    return <TransformControls mode="translate" object={selectedObject} />;
  }
  return null;
};

export default Gizmo;
