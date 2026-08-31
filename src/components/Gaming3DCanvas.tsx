import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

/**
 * Optimized High-Fidelity 3D PlayStation 5 DualSense GLTF Renderer
 * Features IntersectionObserver auto-pause for 100% smooth scrolling,
 * dynamic pixel ratio scaling, light shadow map optimizations, and Gamepad API.
 */
export default function Gaming3DCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [modelLoaded, setModelLoaded] = useState(false)
  const [gamepadConnected, setGamepadConnected] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return
    const container = containerRef.current
    const w = container.clientWidth || window.innerWidth
    const h = container.clientHeight || window.innerHeight

    // ── 1. Scene & Camera Setup ──
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100)
    camera.position.set(0, 0.5, 9)

    // Optimized WebGL Renderer for 60FPS Performance
    const isMobile = window.innerWidth < 768
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile, // Disable MSAA on mobile for massive FPS boost
      powerPreference: 'high-performance',
    })
    renderer.setSize(w, h)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.3
    renderer.shadowMap.enabled = !isMobile
    if (!isMobile) {
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
    }
    container.appendChild(renderer.domElement)

    // ── 2. Studio Lighting Setup ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0x00F0FF, 3.2)
    keyLight.position.set(5, 6, 6)
    if (!isMobile) keyLight.castShadow = true
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0x8B5CF6, 2.5)
    fillLight.position.set(-6, 3, -4)
    scene.add(fillLight)

    const bottomRimLight = new THREE.PointLight(0x0070D1, 3.5, 12)
    bottomRimLight.position.set(0, -4, 4)
    scene.add(bottomRimLight)

    // Floating Cyber Particles (reduced count for performance)
    const particleCount = isMobile ? 25 : 45
    const particleGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16
      positions[i + 1] = (Math.random() - 0.5) * 10
      positions[i + 2] = (Math.random() - 0.5) * 10
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({ color: 0x00F0FF, size: 0.05, transparent: true, opacity: 0.4 })
    )
    scene.add(particles)

    // ── 3. GLTF Loader for Authentic PS5 DualSense ──
    const controllerGroup = new THREE.Group()
    scene.add(controllerGroup)

    let loadedModel: THREE.Group | null = null

    const loader = new GLTFLoader()
    loader.load(
      '/ps5_controller.glb',
      (gltf) => {
        loadedModel = gltf.scene

        // Center model geometry bounding box
        const box = new THREE.Box3().setFromObject(loadedModel)
        const center = box.getCenter(new THREE.Vector3())
        loadedModel.position.sub(center)

        // Optimize materials
        loadedModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh
            mesh.castShadow = !isMobile
            mesh.receiveShadow = !isMobile
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial
              mat.roughness = Math.max(0.2, mat.roughness)
            }
          }
        })

        controllerGroup.add(loadedModel)

        // Responsive positioning
        if (isMobile) {
          controllerGroup.position.set(0, -1.5, 0)
          controllerGroup.scale.set(0.55, 0.55, 0.55)
          controllerGroup.rotation.set(0.2, 0.2, 0)
        } else {
          controllerGroup.position.set(-3.6, -0.2, 0)
          controllerGroup.scale.set(0.9, 0.9, 0.9)
          controllerGroup.rotation.set(0.3, 0.55, -0.1)
        }

        setModelLoaded(true)
      },
      undefined,
      (err) => {
        console.warn('Could not load PS5 GLTF controller, falling back gracefully:', err)
      }
    )

    // ── 4. Mouse Parallax & Window Resize ──
    let mouseX = 0
    let mouseY = 0
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    const handleResize = () => {
      if (!containerRef.current) return
      const nw = containerRef.current.clientWidth || window.innerWidth
      const nh = containerRef.current.clientHeight || window.innerHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)

      const mobileCheck = window.innerWidth < 768
      if (controllerGroup) {
        if (mobileCheck) {
          controllerGroup.position.set(0, -1.5, 0)
          controllerGroup.scale.set(0.55, 0.55, 0.55)
        } else {
          controllerGroup.position.set(-3.6, -0.2, 0)
          controllerGroup.scale.set(0.9, 0.9, 0.9)
        }
      }
    }
    window.addEventListener('resize', handleResize)

    // Gamepad API connection listeners
    const onGamepadConnected = () => setGamepadConnected(true)
    const onGamepadDisconnected = () => setGamepadConnected(false)
    window.addEventListener('gamepadconnected', onGamepadConnected)
    window.addEventListener('gamepaddisconnected', onGamepadDisconnected)

    // ── 5. Render Loop with Visibility Optimization ──
    let animationFrameId: number
    let isVisible = true
    const clock = new THREE.Clock()

    const animate = () => {
      if (!isVisible) return

      animationFrameId = requestAnimationFrame(animate)
      const elapsedTime = clock.getElapsedTime()
      const mobileCheck = window.innerWidth < 768

      // Gamepad interaction
      let physicalInput = false
      const gamepads = navigator.getGamepads ? navigator.getGamepads() : []
      if (gamepads[0] && controllerGroup) {
        physicalInput = true
        const gp = gamepads[0]
        const lx = gp.axes[0] || 0
        const ly = gp.axes[1] || 0
        controllerGroup.rotation.y = (mobileCheck ? 0.2 : 0.55) + lx * 0.4
        controllerGroup.rotation.x = (mobileCheck ? 0.25 : 0.3) + ly * 0.3
      }

      // Smooth floating ambient animation
      if (!physicalInput && controllerGroup) {
        const baseY = mobileCheck ? -1.5 : -0.2
        const baseRotY = mobileCheck ? 0.2 : 0.55
        const baseRotX = mobileCheck ? 0.25 : 0.3

        controllerGroup.position.y = baseY + Math.sin(elapsedTime * 0.9) * (mobileCheck ? 0.12 : 0.2)
        controllerGroup.rotation.y = baseRotY + Math.sin(elapsedTime * 0.5) * 0.15
        controllerGroup.rotation.x = baseRotX + Math.cos(elapsedTime * 0.6) * 0.08

        // Mouse Parallax camera tilt
        camera.position.x += (mouseX * 1.0 - camera.position.x) * 0.05
        camera.position.y += (0.5 + mouseY * 0.5 - camera.position.y) * 0.05
        camera.lookAt(mobileCheck ? 0 : -2.0, mobileCheck ? -0.8 : 0, 0)
      }

      particles.rotation.y = elapsedTime * 0.02
      renderer.render(scene, camera)
    }

    // IntersectionObserver to PAUSE rendering when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        isVisible = entry.isIntersecting
        if (isVisible) {
          clock.start()
          animate()
        } else {
          cancelAnimationFrame(animationFrameId)
        }
      },
      { threshold: 0.05 }
    )

    observer.observe(container)

    return () => {
      observer.disconnect()
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('gamepadconnected', onGamepadConnected)
      window.removeEventListener('gamepaddisconnected', onGamepadDisconnected)
      cancelAnimationFrame(animationFrameId)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
      <div
        ref={containerRef}
        id="gaming-3d-canvas"
        data-name="Authentic PS5 DualSense 3D Canvas"
        className="w-full h-full opacity-90 transition-opacity duration-700 will-change-transform"
      />

      {/* Floating Status Indicator */}
      <div className="absolute bottom-6 right-6 pointer-events-auto z-10 hidden sm:flex items-center gap-3 px-4 py-2.5 glass-bright rounded-2xl border border-white/10 text-xs text-white shadow-xl">
        <span className={`w-2.5 h-2.5 rounded-full ${modelLoaded ? 'bg-success animate-pulse' : 'bg-warning animate-spin'}`} />
        <div className="flex flex-col">
          <span className="font-bold text-accent">
            {modelLoaded ? '🎮 PlayStation 5 DualSense 3D' : 'جاري تحميل مجسم PS5...'}
          </span>
          <span className="text-[10px] text-slate-300">
            {gamepadConnected ? 'متصل بذراع التحكم الحقيقية (Gamepad API)' : 'تحريك الماوس للتفاعل ثلاثي الأبعاد'}
          </span>
        </div>
      </div>
    </div>
  )
}
