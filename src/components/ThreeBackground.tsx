import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Nodes({ count = 90 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 7;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      vel[i * 3] = (Math.random() - 0.5) * 0.0018;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.0018;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.0012;
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
    const maxDist = 1.4;
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
          size={0.028}
          sizeAttenuation
          color="#ffffff"
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeom}>
        <lineBasicMaterial
          color="#7fb3ff"
          transparent
          opacity={0.12}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

function Scene() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ mouse }) => {
    if (!group.current) return;
    // very slow parallax
    group.current.rotation.y += (mouse.x * 0.15 - group.current.rotation.y) * 0.02;
    group.current.rotation.x += (-mouse.y * 0.1 - group.current.rotation.x) * 0.02;
  });
  return (
    <group ref={group}>
      <Nodes />
    </group>
  );
}

export function ThreeBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6], fov: 55 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <Scene />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />
    </div>
  );
}
