import { getGuildData } from "@/lib/utils";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Model = () => {
  const { scene: originalCard, animations: cardClips } = useGLTF("/card2.glb");
  const { scene: deco, animations: decoClips } = useGLTF("/deco.glb");
  const { scene: sky } = useGLTF("/sky.glb");
  // 카드 그룹 참조
  const carouselRef = useRef<THREE.Group>(null);
  const decoMixer = useRef<THREE.AnimationMixer>(null);
  const [cards, setCards] = useState<{ key: string; object: THREE.Object3D }[]>(
    []
  );

  useEffect(() => {
    const callApi = async () => {
      const data = await getGuildData();
      const items = [];
      const totalCards = data.length;

      for (let i = 0; i < totalCards; i++) {
        const texture = new THREE.TextureLoader().load(
          data[i].character_image,
          (texture) => {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1, 1);
            texture.flipY = false; // 보통 GLTF에는 false가 필요
            texture.colorSpace = THREE.SRGBColorSpace;
          }
        );
        const childrenGroup = originalCard.children[0];
        const mesh = childrenGroup.children[1] as THREE.Mesh;
        mesh.material = (mesh.material as THREE.Material).clone();
        (mesh.material as THREE.MeshStandardMaterial).map = texture;
        (mesh.material as THREE.MeshStandardMaterial).emissiveMap = texture;
        mesh.material.needsUpdate = true;
        const angle = (i / totalCards) * Math.PI * 2;
        const cardClone = originalCard.clone(true);
        cardClone.rotation.set(0, -angle, 0);
        cardClone.translateX(0.8);
        cardClone.updateMatrixWorld();
        cardClone.children[0].rotateY(-Math.PI / 3);
        cardClone.children[1].rotateY(-Math.PI / 3);

        items.push({
          key: `card-${i}`,
          object: cardClone,
        });
      }
      setCards(items);
    };

    if (originalCard) {
      callApi();
    }
  }, [originalCard]);

  useEffect(() => {
    if (decoClips.length) {
      decoMixer.current = new THREE.AnimationMixer(deco);
      decoClips.forEach((clip) => {
        decoMixer.current!.clipAction(clip).setLoop(THREE.LoopRepeat, Infinity);
      });
      decoMixer.current!.clipAction(decoClips[0]).play();
      decoMixer.current!.clipAction(decoClips[1]).play();
    }

    /* unmount 시 메모리 정리 */
    return () => {
      decoMixer.current?.stopAllAction();
    };
  }, [originalCard, deco, cardClips, decoClips]);

  /* 매 프레임마다 업데이트 */
  useFrame((_, delta) => {
    //decoMixer.current?.update(delta);

    // 회전목마 효과 - 전체 카드 그룹을 천천히 회전
    if (carouselRef.current) {
      carouselRef.current.rotation.y += delta * 0.4; // 천천히 회전
    }
  });

  return (
    <>
      <group ref={carouselRef}>
        {cards.map((card) => (
          <primitive key={card.key} object={card.object} onClick={() => {}} />
        ))}
      </group>

      <primitive object={deco} scale={1.2} />

      <primitive object={sky} />
    </>
  );
};

export default Model;
