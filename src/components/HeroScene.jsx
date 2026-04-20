import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial, Line } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import * as THREE from "three"
import { getMousePosition } from "../hooks/useMousePosition"

/* ── Neural Network — interconnected nodes, far right ── */
function NeuralNetwork() {
  const groupRef = useRef()
  const nodeRefs = useRef([])
  const mouse = getMousePosition()

  const { nodes, edges } = useMemo(() => {
    const n = []
    const sizes = [3, 5, 5, 4, 2]
    sizes.forEach((size, li) => {
      for (let ni = 0; ni < size; ni++) {
        n.push({
          x: li * 0.8 - 1.6,
          y: (ni - (size - 1) / 2) * 0.55,
          z: (Math.random() - 0.5) * 0.3,
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

  const layerColors = ["#0088ff", "#00aaff", "#ffaa44", "#ff8800", "#ff4400"]

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 4.2 + mouse.x * 0.3, 0.04)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0.2 + mouse.y * 0.2, 0.04)
    groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.2 + mouse.x * 0.08
    groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.1 + mouse.y * 0.05
    nodeRefs.current.forEach((ref, i) => {
      if (ref) ref.scale.setScalar(1 + Math.sin(t * 2.5 + i * 0.7) * 0.2)
    })
  })

  return (
    <group ref={groupRef} position={[4.2, 0.2, -2]} scale={0.5}>
      {nodes.map((n, i) => (
        <mesh key={i} ref={(el) => (nodeRefs.current[i] = el)} position={[n.x, n.y, n.z]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial
            color={layerColors[n.layer]}
            emissive={layerColors[n.layer]}
            emissiveIntensity={0.8}
            roughness={0.15}
            metalness={0.9}
            toneMapped={false}
          />
        </mesh>
      ))}
      {edges.map((pts, i) => (
        <Line key={i} points={pts} color="#ff8800" lineWidth={0.6} transparent opacity={0.12} />
      ))}
      <pointLight position={[0, 0, 1]} intensity={0.8} color="#ff8800" distance={4} decay={2} />
    </group>
  )
}

/* ── Orbiting Ring — spinning torus around the neural net ── */
function OrbitRing() {
  const ringRef = useRef()
  const mouse = getMousePosition()

  useFrame(({ clock }) => {
    if (!ringRef.current) return
    const t = clock.getElapsedTime()
    ringRef.current.rotation.x = t * 0.3
    ringRef.current.rotation.z = t * 0.15
    ringRef.current.position.x = THREE.MathUtils.lerp(ringRef.current.position.x, 4.2 + mouse.x * 0.25, 0.04)
    ringRef.current.position.y = THREE.MathUtils.lerp(ringRef.current.position.y, 0.2 + mouse.y * 0.15, 0.04)
  })

  return (
    <mesh ref={ringRef} position={[4.2, 0.2, -2]}>
      <torusGeometry args={[1.2, 0.015, 16, 64]} />
      <meshStandardMaterial
        color="#ff8800"
        emissive="#ff6600"
        emissiveIntensity={0.6}
        transparent
        opacity={0.25}
        toneMapped={false}
      />
    </mesh>
  )
}

/* ── Floating Torus Knot — decorative, bottom-left ── */
function FloatingTorusKnot() {
  const meshRef = useRef()
  const mouse = getMousePosition()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.15
    meshRef.current.rotation.y = t * 0.2
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, -4.5 + mouse.x * 0.2, 0.04)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, -1.5 + mouse.y * 0.15, 0.04)
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} position={[-4.5, -1.5, -2.5]}>
        <torusKnotGeometry args={[0.25, 0.06, 80, 12, 2, 3]} />
        <meshStandardMaterial
          color="#0090ff"
          emissive="#0070dd"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.95}
          transparent
          opacity={0.3}
          toneMapped={false}
        />
      </mesh>
    </Float>
  )
}

/* ── AI Brain — distorted sphere, bottom-right ── */
function AIBrain() {
  const meshRef = useRef()
  const glowRef = useRef()
  const mouse = getMousePosition()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.1
    meshRef.current.rotation.y = t * 0.15
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, 4.8 + mouse.x * 0.15, 0.04)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, -2.0 + mouse.y * 0.1, 0.04)
    meshRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.05)
    if (glowRef.current) glowRef.current.intensity = 0.6 + Math.sin(t * 2) * 0.2
  })

  return (
    <>
      <mesh ref={meshRef} position={[4.8, -2.0, -2.5]}>
        <icosahedronGeometry args={[0.3, 3]} />
        <MeshDistortMaterial
          color="#ff4400"
          emissive="#ff6600"
          emissiveIntensity={0.5}
          roughness={0.1}
          metalness={0.95}
          distort={0.35}
          speed={2}
          transparent
          opacity={0.2}
          toneMapped={false}
        />
      </mesh>
      <pointLight ref={glowRef} position={[4.8, -2.0, -1.5]} intensity={0.5} color="#ff6600" distance={4} decay={2} />
    </>
  )
}

/* ── Wireframe Dodecahedron — floating left ── */
function WireframeDodecahedron() {
  const meshRef = useRef()
  const mouse = getMousePosition()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.08
    meshRef.current.rotation.y = t * 0.12
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, -5.0 + mouse.x * 0.2, 0.04)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 1.0 + mouse.y * 0.15, 0.04)
  })

  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.3}>
      <mesh ref={meshRef} position={[-5.0, 1.0, -2]}>
        <dodecahedronGeometry args={[0.35, 0]} />
        <meshStandardMaterial
          color="#ff8800"
          emissive="#ff6600"
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.35}
          toneMapped={false}
        />
      </mesh>
    </Float>
  )
}

/* ── Spinning Octahedron — small accent, top-left ── */
function SpinningOctahedron() {
  const meshRef = useRef()
  const mouse = getMousePosition()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.y = t * 0.35
    meshRef.current.rotation.z = t * 0.2
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, -3.8 + mouse.x * 0.25, 0.04)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 2.2 + mouse.y * 0.12, 0.04)
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[-3.8, 2.2, -3]}>
        <octahedronGeometry args={[0.12, 0]} />
        <meshStandardMaterial
          color="#0090ff"
          emissive="#0090ff"
          emissiveIntensity={0.7}
          metalness={0.9}
          roughness={0.1}
          toneMapped={false}
        />
      </mesh>
    </Float>
  )
}

/* ── Flowing data particles ── */
function DataParticles() {
  const count = 60
  const meshRef = useRef()
  const mouse = getMousePosition()

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 3
      vel[i * 3] = (Math.random() - 0.5) * 0.005
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
      if (pos[i * 3] > 7) pos[i * 3] = -7
      if (pos[i * 3] < -7) pos[i * 3] = 7
      if (pos[i * 3 + 1] > 4) pos[i * 3 + 1] = -4
      if (pos[i * 3 + 1] < -4) pos[i * 3 + 1] = 4
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true
    meshRef.current.rotation.y = mouse.x * 0.1
    meshRef.current.rotation.x = mouse.y * 0.05
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#ff8800" size={0.025} transparent opacity={0.3} sizeAttenuation toneMapped={false} />
    </points>
  )
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 5, 5]} intensity={0.35} color="#ff8800" />
        <directionalLight position={[-5, -3, 3]} intensity={0.15} color="#0090ff" />

        <NeuralNetwork />
        <OrbitRing />
        <FloatingTorusKnot />
        <AIBrain />
        <WireframeDodecahedron />
        <SpinningOctahedron />
        <DataParticles />

        <EffectComposer>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={0.7} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
