import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import * as THREE from "three";

function Nodes({ count = 45 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 7;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      vel[i * 3] = (Math.random() - 0.5) * 0.0007;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.0007;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.0005;
    }
    return { positions: pos, velocities: vel };
  }, [count]);

  const lineGeom = useMemo(() => new THREE.BufferGeometry(), []);
  const maxLineVerts = count * 6;
  const linePositions = useMemo(() => new Float32Array(maxLineVerts * 3), [maxLineVerts]);
  useMemo(() => {
    lineGeom.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeom.setDrawRange(0, 0);
  }, [lineGeom, linePositions]);

  useFrame(() => {
    const points = pointsRef.current;
    if (!points) return;
    const posAttr = points.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];

      if (arr[i * 3] > 6 || arr[i * 3] < -6) velocities[i * 3] *= -1;
      if (arr[i * 3 + 1] > 3.5 || arr[i * 3 + 1] < -3.5) velocities[i * 3 + 1] *= -1;
      if (arr[i * 3 + 2] > 2 || arr[i * 3 + 2] < -2) velocities[i * 3 + 2] *= -1;
    }
    posAttr.needsUpdate = true;

    // build lines between nearby nodes
    let vertexPos = 0;
    const maxDist = 1.6;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = arr[i * 3] - arr[j * 3];
        const dy = arr[i * 3 + 1] - arr[j * 3 + 1];
        const dz = arr[i * 3 + 2] - arr[j * 3 + 2];
        const d2 = dx * dx + dy * dy + dz * dz;
        if (d2 < maxDist * maxDist && vertexPos < maxLineVerts - 2) {
          linePositions[vertexPos * 3] = arr[i * 3];
          linePositions[vertexPos * 3 + 1] = arr[i * 3 + 1];
          linePositions[vertexPos * 3 + 2] = arr[i * 3 + 2];
          vertexPos++;
          linePositions[vertexPos * 3] = arr[j * 3];
          linePositions[vertexPos * 3 + 1] = arr[j * 3 + 1];
          linePositions[vertexPos * 3 + 2] = arr[j * 3 + 2];
          vertexPos++;
        }
      }
    }
    const lineAttr = lineGeom.getAttribute("position") as THREE.BufferAttribute;
    lineAttr.needsUpdate = true;
    lineGeom.setDrawRange(0, vertexPos);
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={positions.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
  size={0.022}
  sizeAttenuation
  color="#ffffff"
  transparent
  opacity={0.9}
  depthWrite={false}
  blending={THREE.AdditiveBlending}
/>
      </points>
      <lineSegments ref={linesRef} geometry={lineGeom}>
        <lineBasicMaterial
          color="#9cc8ff"
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ mouse, clock }) => {
    if (!group.current) return;

    // Slow mouse parallax
    group.current.rotation.y +=
      (mouse.x * 0.06 - group.current.rotation.y) * 0.008;

    group.current.rotation.x +=
(-mouse.y * 0.06 - group.current.rotation.x) * 0.008;

    // Very subtle breathing
    const scale = 1 + Math.sin(clock.elapsedTime * 0.1) * 0.01;
    group.current.scale.setScalar(scale);
  });

  return (
    <group ref={group}>
      <Nodes count={25} />

      <group position={[0, 0, -2]}>
        <Nodes count={20} />
      </group>

      <group position={[0, 0, 2]}>
        <Nodes count={15} />
      </group>
    </group>
  );
}

export function ThreeBackground() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 6], fov: 55 }}
      >
        <Suspense fallback={null}>
  {/* Base ambient */}
  <ambientLight intensity={0.18} />

  {/* Main key light */}
  <directionalLight
    position={[5, 5, 5]}
    intensity={0.7}
    color="#ffffff"
  />

  {/* Soft cool fill light */}
  <directionalLight
    position={[-4, 2, 3]}
    intensity={0.28}
    color="#8dbdff"
  />

  {/* Rim light */}
  <pointLight
    position={[0, 0, 8]}
    intensity={0.25}
    color="#ffffff"
  />

  <Scene />
</Suspense>
      </Canvas>

      <div
  className="absolute inset-0"
  style={{
    background:
      "radial-gradient(circle at 50% 35%, rgba(110,170,255,0.08), transparent 55%)",
    filter: "blur(80px)",
  }}
/>

      <div
  className="absolute inset-0"
  style={{
    background: `
      radial-gradient(circle at 20% 15%, rgba(70,120,255,0.08), transparent 35%),
      radial-gradient(circle at 80% 70%, rgba(255,255,255,0.03), transparent 45%),
      linear-gradient(
        180deg,
        #05070b 0%,
        #080b11 35%,
        #0b1018 70%,
        #050608 100%
      )
    `,
  }}
/>
    </motion.div>
  );
}
