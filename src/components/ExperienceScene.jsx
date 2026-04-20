import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Line } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import * as THREE from "three"
import { getMousePosition } from "../hooks/useMousePosition"

/* ── Server Stack — glowing boxes, left side ── */
function ServerStack() {
  const groupRef = useRef()
  const boxRefs = useRef([])
  const mouse = getMousePosition()

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.08 + mouse.x * 0.06
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, -5 + mouse.x * 0.2, 0.04)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0 + mouse.y * 0.12, 0.04)
    boxRefs.current.forEach((ref, i) => {
      if (ref) ref.scale.x = 1 + Math.sin(t * 2.5 + i * 1.5) * 0.06
    })
  })

  return (
    <group ref={groupRef} position={[-5, 0, -2]} scale={0.4}>
      {[0.8, 0.2, -0.4, -1.0].map((y, i) => (
        <group key={i}>
          <mesh ref={(el) => (boxRefs.current[i] = el)} position={[0, y, 0]}>
            <boxGeometry args={[1.4, 0.4, 0.6]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#0090ff" : "#223344"}
              emissive={i % 2 === 0 ? "#0070dd" : "#0090ff"}
              emissiveIntensity={0.4}
              roughness={0.2}
              metalness={0.9}
              transparent
              opacity={0.2}
              toneMapped={false}
            />
          </mesh>
          {/* LED indicators */}
          {[0.4, 0.5, 0.6].map((x, j) => (
            <mesh key={j} position={[x, y, 0.31]}>
              <sphereGeometry args={[0.025, 6, 6]} />
              <meshStandardMaterial
                color={j === 0 ? "#00ff66" : "#ff8800"}
                emissive={j === 0 ? "#00ff66" : "#ff8800"}
                emissiveIntensity={0.8}
                toneMapped={false}
              />
            </mesh>
          ))}
        </group>
      ))}
      <pointLight position={[0, 0, 1.5]} intensity={0.7} color="#0090ff" distance={5} decay={2} />
    </group>
  )
}

/* ── Git Branches — branching lines, right side ── */
function GitBranches() {
  const groupRef = useRef()
  const mouse = getMousePosition()

  const branches = useMemo(() => {
    const main = Array.from({ length: 8 }, (_, i) => new THREE.Vector3(0, i * 0.3 - 0.9, 0))
    const feat = [
      new THREE.Vector3(0, 0.3, 0),
      new THREE.Vector3(0.6, 0.6, 0),
      new THREE.Vector3(0.8, 0.9, 0),
      new THREE.Vector3(0.6, 1.2, 0),
      new THREE.Vector3(0, 1.2, 0),
    ]
    const fix = [new THREE.Vector3(0, -0.3, 0), new THREE.Vector3(-0.5, -0.5, 0), new THREE.Vector3(-0.6, -0.2, 0), new THREE.Vector3(0, 0, 0)]
    return { main, feat, fix }
  }, [])

  const commits = useMemo(
    () => [
      { pos: [0, -0.9, 0], color: "#0090ff" },
      { pos: [0, -0.3, 0], color: "#0090ff" },
      { pos: [0, 0, 0], color: "#0090ff" },
      { pos: [0, 0.3, 0], color: "#0090ff" },
      { pos: [0, 1.2, 0], color: "#0090ff" },
      { pos: [0.8, 0.9, 0], color: "#ff8800" },
      { pos: [-0.6, -0.2, 0], color: "#00ff66" },
    ],
    []
  )

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const t = clock.getElapsedTime()
    groupRef.current.rotation.y = t * 0.1 + mouse.x * 0.06
    groupRef.current.rotation.z = Math.sin(t * 0.2) * 0.08
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 5 + mouse.x * 0.2, 0.04)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0 + mouse.y * 0.12, 0.04)
  })

  return (
    <group ref={groupRef} position={[5, 0, -2]} scale={0.45}>
      <Line points={branches.main} color="#0090ff" lineWidth={1.5} transparent opacity={0.3} />
      <Line points={branches.feat} color="#ff8800" lineWidth={1.2} transparent opacity={0.25} />
      <Line points={branches.fix} color="#00ff66" lineWidth={1.2} transparent opacity={0.25} />
      {commits.map((c, i) => (
        <mesh key={i} position={c.pos}>
          <sphereGeometry args={[0.06, 10, 10]} />
          <meshStandardMaterial color={c.color} emissive={c.color} emissiveIntensity={0.7} roughness={0.2} metalness={0.85} toneMapped={false} />
        </mesh>
      ))}
      <pointLight position={[0, 0, 1]} intensity={0.6} color="#ff8800" distance={4} decay={2} />
    </group>
  )
}

/* ── Terminal Cursor — blinking, top-right ── */
function TerminalCursor() {
  const meshRef = useRef()
  const mouse = getMousePosition()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.material.emissiveIntensity = Math.sin(t * 4) > 0 ? 0.8 : 0.1
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, 4.5 + mouse.x * 0.15, 0.04)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, 2.5 + mouse.y * 0.08, 0.04)
  })

  return (
    <mesh ref={meshRef} position={[4.5, 2.5, -2.5]}>
      <boxGeometry args={[0.04, 0.14, 0.01]} />
      <meshStandardMaterial color="#00ff66" emissive="#00ff66" emissiveIntensity={0.8} toneMapped={false} />
    </mesh>
  )
}

/* ── Orbiting Ring — around server stack ── */
function ServerOrbitRing() {
  const ringRef = useRef()
  const mouse = getMousePosition()

  useFrame(({ clock }) => {
    if (!ringRef.current) return
    const t = clock.getElapsedTime()
    ringRef.current.rotation.x = t * 0.2
    ringRef.current.rotation.z = t * 0.15
    ringRef.current.position.x = THREE.MathUtils.lerp(ringRef.current.position.x, -5 + mouse.x * 0.18, 0.04)
    ringRef.current.position.y = THREE.MathUtils.lerp(ringRef.current.position.y, 0 + mouse.y * 0.1, 0.04)
  })

  return (
    <mesh ref={ringRef} position={[-5, 0, -2]}>
      <torusGeometry args={[0.8, 0.012, 16, 48]} />
      <meshStandardMaterial color="#0090ff" emissive="#0070dd" emissiveIntensity={0.5} transparent opacity={0.2} toneMapped={false} />
    </mesh>
  )
}

/* ── Wireframe Cube — floating, bottom-right ── */
function WireframeCube() {
  const meshRef = useRef()
  const mouse = getMousePosition()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.1
    meshRef.current.rotation.y = t * 0.15
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, 3.5 + mouse.x * 0.15, 0.04)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, -2.0 + mouse.y * 0.08, 0.04)
  })

  return (
    <Float speed={0.7} rotationIntensity={0.15} floatIntensity={0.3}>
      <mesh ref={meshRef} position={[3.5, -2.0, -2.5]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial color="#ff8800" emissive="#ff6600" emissiveIntensity={0.5} wireframe transparent opacity={0.3} toneMapped={false} />
      </mesh>
    </Float>
  )
}

/* ── Spinning Torus Knot — decorative, bottom-left ── */
function FloatingTorusKnot() {
  const meshRef = useRef()
  const mouse = getMousePosition()

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    meshRef.current.rotation.x = t * 0.15
    meshRef.current.rotation.y = t * 0.2
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, -3.8 + mouse.x * 0.15, 0.04)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, -2.0 + mouse.y * 0.08, 0.04)
  })

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef} position={[-3.8, -2.0, -2.5]}>
        <torusKnotGeometry args={[0.18, 0.05, 64, 10, 3, 2]} />
        <meshStandardMaterial color="#ff8800" emissive="#ff6600" emissiveIntensity={0.5} roughness={0.1} metalness={0.95} transparent opacity={0.25} toneMapped={false} />
      </mesh>
    </Float>
  )
}

/* ── Small Spinning Diamonds — accents ── */
function SpinningDiamonds() {
  const refs = useRef([])
  const mouse = getMousePosition()

  const diamonds = useMemo(
    () => [
      { pos: [-3.5, 2.2, -3], color: "#0090ff", size: 0.08 },
      { pos: [2.5, 2.3, -3.5], color: "#ff8800", size: 0.06 },
    ],
    []
  )

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    refs.current.forEach((ref, i) => {
      if (!ref) return
      ref.rotation.y = t * (0.3 + i * 0.2)
      ref.rotation.z = t * 0.15
      ref.position.x += (mouse.x * 0.1 - ref.position.x + diamonds[i].pos[0]) * 0.02
      ref.position.y += (mouse.y * 0.08 - ref.position.y + diamonds[i].pos[1]) * 0.02
    })
  })

  return (
    <>
      {diamonds.map((d, i) => (
        <Float key={i} speed={1.2} rotationIntensity={0.25} floatIntensity={0.4}>
          <mesh ref={(el) => (refs.current[i] = el)} position={d.pos}>
            <octahedronGeometry args={[d.size, 0]} />
            <meshStandardMaterial color={d.color} emissive={d.color} emissiveIntensity={0.6} metalness={0.9} roughness={0.1} toneMapped={false} />
          </mesh>
        </Float>
      ))}
    </>
  )
}

/* ── Particles ── */
function Particles() {
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
    meshRef.current.rotation.x = mouse.y * 0.04
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#0090ff" size={0.02} transparent opacity={0.25} sizeAttenuation toneMapped={false} />
    </points>
  )
}

export default function ExperienceScene() {
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

        <ServerStack />
        <ServerOrbitRing />
        <GitBranches />
        <TerminalCursor />
        <WireframeCube />
        <FloatingTorusKnot />
        <SpinningDiamonds />
        <Particles />

        <EffectComposer>
          <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={0.6} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
