import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Line } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import * as THREE from "three"
import { getMousePosition } from "../hooks/useMousePosition"

/* ── Cloud Mesh — distorted sphere, right side ── */
function CloudMesh() {
  const meshRef = useRef()
  const glowRef = useRef()
  const mouse = getMousePosition()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.06
    meshRef.current.rotation.y = t * 0.1
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, 5 + mouse.x * 0.2, 0.04)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 0.3 + mouse.y * 0.12, 0.04)
    meshRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.04)
    if (glowRef.current) glowRef.current.intensity = 0.5 + Math.sin(t * 2) * 0.2
  })

  return (
    <>
      <mesh ref={meshRef} position={[5, 0.3, -2]}>
        <icosahedronGeometry args={[0.4, 3]} />
        <MeshDistortMaterial
          color="#0090ff"
          emissive="#0070dd"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.95}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.15}
          toneMapped={false}
        />
      </mesh>
      <pointLight ref={glowRef} position={[5, 0.3, -0.5]} intensity={0.5} color="#0090ff" distance={5} decay={2} />
    </>
  )
}

/* ── Data Arrows — orbiting around cloud ── */
function DataArrows() {
  const groupRef = useRef()
  const arrowRefs = useRef([])
  const mouse = getMousePosition()
  const count = 6

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 5 + mouse.x * 0.2, 0.04)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0.3 + mouse.y * 0.12, 0.04)
    arrowRefs.current.forEach((ref, i) => {
      if (!ref) return
      const angle = t * 0.5 + (i / count) * Math.PI * 2
      const dir = i % 2 === 0 ? 1 : -1
      ref.position.x = Math.cos(angle * dir) * 0.9
      ref.position.y = Math.sin(angle * dir) * 0.7
      ref.position.z = Math.sin(angle * 0.5) * 0.2
      ref.rotation.z = angle * dir + Math.PI / 2
      ref.scale.setScalar(0.6 + Math.sin(t * 2 + i) * 0.3)
    })
  })

  return (
    <group ref={groupRef} position={[5, 0.3, -2]}>
      {Array.from({ length: count }, (_, i) => (
        <mesh key={i} ref={(el) => (arrowRefs.current[i] = el)}>
          <coneGeometry args={[0.025, 0.08, 4]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#ff8800" : "#00ccff"}
            emissive={i % 2 === 0 ? "#ff8800" : "#00ccff"}
            emissiveIntensity={0.7}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ── Network Graph — connected nodes, left side ── */
function NetworkGraph() {
  const groupRef = useRef()
  const nodeRefs = useRef([])
  const mouse = getMousePosition()

  const nodes = useMemo(
    () => [
      { pos: [0, 0, 0], color: "#ff8000", size: 0.1 },
      { pos: [0.8, 0.5, 0.2], color: "#0090ff", size: 0.06 },
      { pos: [-0.6, 0.7, -0.1], color: "#0090ff", size: 0.06 },
      { pos: [0.3, -0.7, 0.3], color: "#ffaa44", size: 0.06 },
      { pos: [-0.8, -0.4, -0.2], color: "#ffaa44", size: 0.06 },
      { pos: [0.9, -0.2, -0.3], color: "#00ccff", size: 0.05 },
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
    groupRef.current.rotation.y = t * 0.1 + mouse.x * 0.06
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, -4.5 + mouse.x * 0.2, 0.04)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -0.5 + mouse.y * 0.12, 0.04)
    nodeRefs.current.forEach((ref, i) => {
      if (ref) ref.scale.setScalar(1 + Math.sin(t * 2.5 + i * 1.2) * 0.2)
    })
  })

  return (
    <group ref={groupRef} position={[-4.5, -0.5, -2]} scale={0.45}>
      {nodes.map((n, i) => (
        <mesh key={i} ref={(el) => (nodeRefs.current[i] = el)} position={n.pos}>
          <sphereGeometry args={[n.size, 10, 10]} />
          <meshStandardMaterial color={n.color} emissive={n.color} emissiveIntensity={0.7} roughness={0.2} metalness={0.85} toneMapped={false} />
        </mesh>
      ))}
      {edges.map((pts, i) => (
        <Line key={i} points={pts} color="#ff8000" lineWidth={0.6} transparent opacity={0.1} />
      ))}
      <pointLight position={[0, 0, 1]} intensity={0.6} color="#ff8000" distance={4} decay={2} />
    </group>
  )
}

/* ── @ Symbol — top-left ── */
function AtSymbol() {
  const groupRef = useRef()
  const mouse = getMousePosition()

  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 50; i++) {
      const angle = (i / 50) * Math.PI * 2.3
      const r = 0.15 + angle * 0.02
      pts.push(new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0))
    }
    return pts
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.15
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, -4.2 + mouse.x * 0.15, 0.04)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 1.8 + mouse.y * 0.08, 0.04)
  })

  return (
    <group ref={groupRef} position={[-4.2, 1.8, -2.5]} scale={0.8}>
      <Line points={points} color="#ff8800" lineWidth={1.5} transparent opacity={0.25} />
      <mesh position={[0.05, -0.02, 0]}>
        <ringGeometry args={[0.06, 0.08, 16]} />
        <meshStandardMaterial color="#ff8800" emissive="#ff6600" emissiveIntensity={0.5} transparent opacity={0.3} toneMapped={false} />
      </mesh>
    </group>
  )
}

/* ── Orbiting Ring — around cloud ── */
function CloudOrbitRing() {
  const ringRef = useRef()
  const mouse = getMousePosition()

  useFrame(({ clock }) => {
    if (!ringRef.current) return
    const t = clock.getElapsedTime()
    ringRef.current.rotation.x = t * 0.25
    ringRef.current.rotation.z = t * 0.12
    ringRef.current.position.x = THREE.MathUtils.lerp(ringRef.current.position.x, 5 + mouse.x * 0.18, 0.04)
    ringRef.current.position.y = THREE.MathUtils.lerp(ringRef.current.position.y, 0.3 + mouse.y * 0.1, 0.04)
  })

  return (
    <mesh ref={ringRef} position={[5, 0.3, -2]}>
      <torusGeometry args={[0.9, 0.012, 16, 48]} />
      <meshStandardMaterial color="#00ccff" emissive="#0090ff" emissiveIntensity={0.5} transparent opacity={0.2} toneMapped={false} />
    </mesh>
  )
}

/* ── Wireframe Dodecahedron — bottom-right ── */
function WireframeDodecahedron() {
  const meshRef = useRef()
  const mouse = getMousePosition()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.1
    meshRef.current.rotation.y = t * 0.15
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, 3.8 + mouse.x * 0.12, 0.04)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, -2.0 + mouse.y * 0.08, 0.04)
  })

  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.3}>
      <mesh ref={meshRef} position={[3.8, -2.0, -2.5]}>
        <dodecahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color="#ff8800" emissive="#ff6600" emissiveIntensity={0.5} wireframe transparent opacity={0.3} toneMapped={false} />
      </mesh>
    </Float>
  )
}

/* ── Small Spinning Tetrahedron — accent ── */
function SpinningTetrahedron() {
  const meshRef = useRef()
  const mouse = getMousePosition()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.y = t * 0.3
    meshRef.current.rotation.x = t * 0.2
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, -3.2 + mouse.x * 0.12, 0.04)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, -2.2 + mouse.y * 0.06, 0.04)
  })

  return (
    <Float speed={1.3} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[-3.2, -2.2, -3]}>
        <tetrahedronGeometry args={[0.1, 0]} />
        <meshStandardMaterial color="#00ccff" emissive="#00aaff" emissiveIntensity={0.6} metalness={0.9} roughness={0.1} toneMapped={false} />
      </mesh>
    </Float>
  )
}

/* ── Particles ── */
function DataParticles() {
  const count = 50
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
    meshRef.current.rotation.x = mouse.y * 0.04
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

export default function ContactScene() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight position={[4, 4, 4]} intensity={0.3} color="#ff8000" />
        <directionalLight position={[-4, -3, 3]} intensity={0.15} color="#0090ff" />

        <CloudMesh />
        <CloudOrbitRing />
        <DataArrows />
        <NetworkGraph />
        <AtSymbol />
        <WireframeDodecahedron />
        <SpinningTetrahedron />
        <DataParticles />

        <EffectComposer>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={0.6} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
