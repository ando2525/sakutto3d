// example.tsx
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Float,
  Text,
  PresentationControls,
  ContactShadows,
} from "@react-three/drei";
import styles from "../example/example.module.scss";

export default function Example() {
  const { scene: fruit } = useGLTF(
    "https://3-contents.vercel.app/Strawberry_gltf.gltf"
  );

  if (!fruit) return <div>Loading...</div>;

  return (
    <div className={styles.object}>
      <Canvas camera={{ fov: 45, near: 0.1, far: 2000 }}>
        <PresentationControls>
          <Float rotationIntensity={4}>
            <primitive
              object={fruit}
              position={[0, -1.5, 0]}
              scale={0.3}
            ></primitive>
          </Float>
          <Text position={[0, 1, -1]}>Hello World!</Text>
          <OrbitControls />
          <ambientLight />
        </PresentationControls>
        <ContactShadows scale={6} blur={3} opacity={0.6} position-y={-1.8} />
      </Canvas>
    </div>
  );
}
