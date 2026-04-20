import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Line } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import * as THREE from "three"
import { getMousePosition } from "../hooks/useMousePosition"

/* ── Database Stack — glowing cylinders, right side ── */
function DatabaseStack() {
  const groupRef = useRef()
  const diskRefs = useRef([])
  const mouse = getMousePosition()

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.15 + mouse.x * 0.08
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 5 + mouse.x * 0.25, 0.04)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -0.5 + mouse.y * 0.15, 0.04)
    diskRefs.current.forEach((ref, i) => {
      if (ref) ref.scale.y = 1 + Math.sin(t * 2 + i * 1.2) * 0.08
    })
  })

  return (
    <group ref={groupRef} position={[5, -0.5, -2]} scale={0.4}>
      {[1.0, 0.35, -0.3, -0.95].map((y, i) => (
        <group key={i}>
          <mesh ref={(el) => (diskRefs.current[i] = el)} position={[0, y, 0]}>
            <cylinderGeometry args={[0.6, 0.6, 0.45, 20]} />
            <meshStandardMaterial
              color={i === 0 ? "#ff8000" : "#0090ff"}
              emissive={i === 0 ? "#ff8000" : "#0090ff"}
              emissiveIntensity={0.5}
              roughness={0.15}
              metalness={0.9}
              transparent
              opacity={0.25}
              toneMapped={false}
            />
          </mesh>
          <mesh position={[0.45, y, 0.31]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshStandardMaterial
              color={i === 0 ? "#00ff88" : "#ff8000"}
              emissive={i === 0 ? "#00ff88" : "#ff8000"}
              emissiveIntensity={0.8}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
      <pointLight position={[0, 0, 1.5]} intensity={0.8} color="#0090ff" distance={5} decay={2} />
    </group>
  )
}

/* ── Orbiting Ring around DB Stack ── */
function DBOrbitRing() {
  const ringRef = useRef()
  const mouse = getMousePosition()

  useFrame(({ clock }) => {
    if (!ringRef.current) return
    const t = clock.getElapsedTime()
    ringRef.current.rotation.x = t * 0.25
    ringRef.current.rotation.z = t * 0.18
    ringRef.current.position.x = THREE.MathUtils.lerp(ringRef.current.position.x, 5 + mouse.x * 0.2, 0.04)
    ringRef.current.position.y = THREE.MathUtils.lerp(ringRef.current.position.y, -0.5 + mouse.y * 0.12, 0.04)
  })

  return (
    <mesh ref={ringRef} position={[5, -0.5, -2]}>
      <torusGeometry args={[0.9, 0.012, 16, 48]} />
      <meshStandardMaterial color="#0090ff" emissive="#0070dd" emissiveIntensity={0.5} transparent opacity={0.2} toneMapped={false} />
    </mesh>
  )
}

/* ── API Graph — connected nodes, left side ── */
function APIGraph() {
  const groupRef = useRef()
  const nodeRefs = useRef([])
  const mouse = getMousePosition()

  const nodes = useMemo(
    () => [
      { pos: [0, 0, 0], color: "#ff8000" },
      { pos: [0.9, 0.7, 0.3], color: "#0090ff" },
      { pos: [-0.7, 0.8, -0.2], color: "#0090ff" },
      { pos: [0.5, -0.8, 0.1], color: "#ffaa44" },
      { pos: [-0.9, -0.5, 0.4], color: "#ffaa44" },
    ],
    []
  )

  const edges = useMemo(() => {
    const lines = []
    for (let i = 1; i < nodes.length; i++)
      lines.push([new THREE.Vector3(...nodes[0].pos), new THREE.Vector3(...nodes[i].pos)])
    lines.push([new THREE.Vector3(...nodes[1].pos), new THREE.Vector3(...nodes[2].pos)])
    lines.push([new THREE.Vector3(...nodes[3].pos), new THREE.Vector3(...nodes[4].pos)])
    return lines
  }, [nodes])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.12 + mouse.x * 0.06
    groupRef.current.rotation.x = Math.sin(t * 0.25) * 0.1
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, -4.5 + mouse.x * 0.2, 0.04)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0.8 + mouse.y * 0.15, 0.04)
    nodeRefs.current.forEach((ref, i) => {
      if (ref) ref.scale.setScalar(1 + Math.sin(t * 3 + i * 1.5) * 0.2)
    })
  })

  return (
    <group ref={groupRef} position={[-4.5, 0.8, -2]} scale={0.5}>
      {nodes.map((n, i) => (
        <mesh key={i} ref={(el) => (nodeRefs.current[i] = el)} position={n.pos}>
          <sphereGeometry args={[i === 0 ? 0.12 : 0.07, 12, 12]} />
          <meshStandardMaterial color={n.color} emissive={n.color} emissiveIntensity={0.7} roughness={0.15} metalness={0.9} toneMapped={false} />
        </mesh>
      ))}
      {edges.map((pts, i) => (
        <Line key={i} points={pts} color="#ff8000" lineWidth={0.7} transparent opacity={0.12} />
      ))}
      <pointLight position={[0, 0, 1]} intensity={0.6} color="#ff8000" distance={4} decay={2} />
    </group>
  )
}

/* ── Wireframe Icosahedron — top-right ── */
function WireframeIcosahedron() {
  const meshRef = useRef()
  const mouse = getMousePosition()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.1
    meshRef.current.rotation.y = t * 0.15
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, 4 + mouse.x * 0.2, 0.04)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 2.2 + mouse.y * 0.1, 0.04)
  })

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={[4, 2.2, -2.5]}>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial color="#0090ff" emissive="#0070dd" emissiveIntensity={0.5} wireframe transparent opacity={0.3} toneMapped={false} />
      </mesh>
    </Float>
  )
}

/* ── Floating Torus Knot — bottom-left ── */
function FloatingTorusKnot() {
  const meshRef = useRef()
  const mouse = getMousePosition()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.12
    meshRef.current.rotation.y = t * 0.18
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, -4.8 + mouse.x * 0.15, 0.04)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, -1.8 + mouse.y * 0.1, 0.04)
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} position={[-4.8, -1.8, -2.5]}>
        <torusKnotGeometry args={[0.2, 0.05, 64, 10, 2, 3]} />
        <meshStandardMaterial color="#ff8000" emissive="#ff6600" emissiveIntensity={0.5} roughness={0.1} metalness={0.95} transparent opacity={0.25} toneMapped={false} />
      </mesh>
    </Float>
  )
}

/* ── Spinning Cubes — scattered accents ── */
function SpinningCubes() {
  const groupRef = useRef()
  const cubeRefs = useRef([])
  const mouse = getMousePosition()

  const cubes = useMemo(
    () => [
      { pos: [3.5, 2.5, -3], color: "#ff8000", size: 0.06 },
      { pos: [-3.2, 2.0, -2.5], color: "#0090ff", size: 0.05 },
      { pos: [2.0, -2.3, -3.5], color: "#ffaa44", size: 0.07 },
      { pos: [-2.5, -2.5, -3], color: "#00ccff", size: 0.05 },
    ],
    []
  )

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    cubeRefs.current.forEach((ref, i) => {
      if (!ref) return
      ref.rotation.x = t * (0.3 + i * 0.1)
      ref.rotation.y = t * (0.2 + i * 0.15)
      ref.position.x += (mouse.x * 0.15 - ref.position.x + cubes[i].pos[0]) * 0.02
      ref.position.y += (mouse.y * 0.1 - ref.position.y + cubes[i].pos[1]) * 0.02
    })
  })

  return (
    <group ref={groupRef}>
      {cubes.map((c, i) => (
        <Float key={i} speed={1 + i * 0.3} rotationIntensity={0.3} floatIntensity={0.4}>
          <mesh ref={(el) => (cubeRefs.current[i] = el)} position={c.pos}>
            <boxGeometry args={[c.size, c.size, c.size]} />
            <meshStandardMaterial color={c.color} emissive={c.color} emissiveIntensity={0.6} metalness={0.9} roughness={0.1} toneMapped={false} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

/* ── Flowing particles ── */
function ScatteredDots() {
  const count = 45
  const meshRef = useRef()
  const mouse = getMousePosition()

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 3
      vel[i * 3] = (Math.random() - 0.5) * 0.004
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003
    }
    return { positions: pos, velocities: vel }
  }, [])

  useFrame(() => {
    if (!meshRef.current) return
    const pos = meshRef.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities[i * 3]
      pos[i * 3 + 1] += velocities[i * 3 + 1]
      if (pos[i * 3] > 8) pos[i * 3] = -8
      if (pos[i * 3] < -8) pos[i * 3] = 8
      if (pos[i * 3 + 1] > 4) pos[i * 3 + 1] = -4
      if (pos[i * 3 + 1] < -4) pos[i * 3 + 1] = 4
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
    meshRef.current.rotation.y = mouse.x * 0.08
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#ff8800" size={0.022} transparent opacity={0.25} sizeAttenuation toneMapped={false} />
    </points>
  )
}

export default function SkillsScene() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight position={[3, 5, 5]} intensity={0.3} color="#ff8000" />
        <directionalLight position={[-3, -2, 3]} intensity={0.15} color="#0090ff" />

        <DatabaseStack />
        <DBOrbitRing />
        <APIGraph />
        <WireframeIcosahedron />
        <FloatingTorusKnot />
        <SpinningCubes />
        <ScatteredDots />

        <EffectComposer>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={0.6} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
