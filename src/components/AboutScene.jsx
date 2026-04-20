import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Line } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import * as THREE from "three"
import { getMousePosition } from "../hooks/useMousePosition"

/* ── Brain Mesh — pulsing icosahedron, right side ── */
function BrainMesh() {
  const meshRef = useRef()
  const glowRef = useRef()
  const mouse = getMousePosition()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.08
    meshRef.current.rotation.y = t * 0.12
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, 5 + mouse.x * 0.2, 0.04)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 0 + mouse.y * 0.12, 0.04)
    meshRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.04)
    if (glowRef.current) glowRef.current.intensity = 0.5 + Math.sin(t * 2) * 0.2
  })

  return (
    <>
      <mesh ref={meshRef} position={[5, 0, -2]}>
        <icosahedronGeometry args={[0.45, 3]} />
        <MeshDistortMaterial
          color="#ff4400"
          emissive="#ff6600"
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
      <pointLight ref={glowRef} position={[5, 0, -0.5]} intensity={0.5} color="#ff6600" distance={5} decay={2} />
    </>
  )
}

/* ── Data Orbit — particles orbiting the brain ── */
function DataOrbit() {
  const groupRef = useRef()
  const particleRefs = useRef([])
  const mouse = getMousePosition()
  const count = 8

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 5 + mouse.x * 0.2, 0.04)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0 + mouse.y * 0.12, 0.04)
    particleRefs.current.forEach((ref, i) => {
      if (!ref) return
      const angle = t * 0.6 + (i / count) * Math.PI * 2
      ref.position.x = Math.cos(angle) * 1.1
      ref.position.y = Math.sin(angle) * 0.9
      ref.position.z = Math.sin(angle * 0.5) * 0.3
      ref.scale.setScalar(0.7 + Math.sin(t * 2 + i) * 0.3)
    })
  })

  return (
    <group ref={groupRef} position={[5, 0, -2]}>
      {Array.from({ length: count }, (_, i) => (
        <mesh key={i} ref={(el) => (particleRefs.current[i] = el)}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#ff8800" : "#0090ff"}
            emissive={i % 2 === 0 ? "#ff8800" : "#0090ff"}
            emissiveIntensity={0.7}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ── Mini Neural Layer — small net, left side ── */
function MiniNeuralLayer() {
  const groupRef = useRef()
  const mouse = getMousePosition()

  const { nodes, edges } = useMemo(() => {
    const n = []
    const layers = [3, 4, 3]
    layers.forEach((size, li) => {
      for (let ni = 0; ni < size; ni++) {
        n.push({
          x: li * 0.7 - 0.7,
          y: (ni - (size - 1) / 2) * 0.5,
          z: (Math.random() - 0.5) * 0.2,
          layer: li,
        })
      }
    })
    const e = []
    for (let i = 0; i < n.length; i++)
      for (let j = i + 1; j < n.length; j++)
        if (n[j].layer - n[i].layer === 1)
          e.push([new THREE.Vector3(n[i].x, n[i].y, n[i].z), new THREE.Vector3(n[j].x, n[j].y, n[j].z)])
    return { nodes: n, edges: e }
  }, [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.1 + mouse.x * 0.06
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, -4.5 + mouse.x * 0.2, 0.04)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, -0.8 + mouse.y * 0.12, 0.04)
  })

  return (
    <group ref={groupRef} position={[-4.5, -0.8, -2]} scale={0.4}>
      {nodes.map((n, i) => (
        <mesh key={i} position={[n.x, n.y, n.z]}>
          <sphereGeometry args={[0.06, 10, 10]} />
          <meshStandardMaterial
            color={n.layer === 1 ? "#ffaa44" : "#0090ff"}
            emissive={n.layer === 1 ? "#ffaa44" : "#0090ff"}
            emissiveIntensity={0.7}
            roughness={0.2}
            metalness={0.85}
            toneMapped={false}
          />
        </mesh>
      ))}
      {edges.map((pts, i) => (
        <Line key={i} points={pts} color="#ff8800" lineWidth={0.5} transparent opacity={0.1} />
      ))}
      <pointLight position={[0, 0, 1]} intensity={0.6} color="#ffaa44" distance={4} decay={2} />
    </group>
  )
}

/* ── Wireframe Torus — decorative, top-right ── */
function WireframeTorus() {
  const meshRef = useRef()
  const mouse = getMousePosition()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.12
    meshRef.current.rotation.z = t * 0.08
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, 3.5 + mouse.x * 0.15, 0.04)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 2.0 + mouse.y * 0.1, 0.04)
  })

  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.3}>
      <mesh ref={meshRef} position={[3.5, 2.0, -2.5]}>
        <torusGeometry args={[0.25, 0.06, 12, 32]} />
        <meshStandardMaterial color="#0090ff" emissive="#0070dd" emissiveIntensity={0.5} wireframe transparent opacity={0.3} toneMapped={false} />
      </mesh>
    </Float>
  )
}

/* ── Spinning Octahedron — accent, bottom-left ── */
function SpinningOctahedron() {
  const meshRef = useRef()
  const mouse = getMousePosition()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.y = t * 0.25
    meshRef.current.rotation.z = t * 0.15
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, -3.5 + mouse.x * 0.18, 0.04)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 1.8 + mouse.y * 0.1, 0.04)
  })

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.4}>
      <mesh ref={meshRef} position={[-3.5, 1.8, -2.5]}>
        <octahedronGeometry args={[0.14, 0]} />
        <meshStandardMaterial color="#ff8800" emissive="#ff6600" emissiveIntensity={0.6} metalness={0.9} roughness={0.1} toneMapped={false} />
      </mesh>
    </Float>
  )
}

/* ── Floating Tetrahedron — small accent, left ── */
function FloatingTetrahedron() {
  const meshRef = useRef()
  const mouse = getMousePosition()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.2
    meshRef.current.rotation.y = t * 0.3
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, -5.2 + mouse.x * 0.15, 0.04)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 1.5 + mouse.y * 0.08, 0.04)
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[-5.2, 1.5, -3]}>
        <tetrahedronGeometry args={[0.1, 0]} />
        <meshStandardMaterial color="#00ccff" emissive="#00aaff" emissiveIntensity={0.7} metalness={0.9} roughness={0.1} toneMapped={false} />
      </mesh>
    </Float>
  )
}

/* ── Particles ── */
function Particles() {
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
      <pointsMaterial color="#ff8800" size={0.02} transparent opacity={0.25} sizeAttenuation toneMapped={false} />
    </points>
  )
}

export default function AboutScene() {
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

        <BrainMesh />
        <DataOrbit />
        <MiniNeuralLayer />
        <WireframeTorus />
        <SpinningOctahedron />
        <FloatingTetrahedron />
        <Particles />

        <EffectComposer>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={0.6} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
