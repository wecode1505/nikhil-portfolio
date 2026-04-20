/* Global mouse position tracker — module-level for zero-overhead reads in useFrame */
const state = { x: 0, y: 0 }
let listening = false

export function getMousePosition() {
  if (!listening && typeof window !== "undefined") {
    listening = true
    window.addEventListener(
      "mousemove",
      (e) => {
        state.x = (e.clientX / window.innerWidth) * 2 - 1
        state.y = -(e.clientY / window.innerHeight) * 2 + 1
      },
      { passive: true }
    )
  }
  return state
}
