import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import waterVertexShader from '../lib/shaders/water/vertex.glsl'
import waterFragmentShader from '../lib/shaders/water/fragment.glsl'
import { ModelContainer } from './three-model-wrapper'
import { Mesh } from 'three'

function throttle(cb, delay = 1000) {
  let shouldWait = false
  let waitingArgs
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false
    } else {
      cb(...waitingArgs)
      waitingArgs = null
      setTimeout(timeoutFunc, delay)
    }
  }

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args
      return
    }

    cb(...args)
    shouldWait = true

    setTimeout(timeoutFunc, delay)
  }
}
const ThreeWater = () => {
  const refContainer = useRef()
  const [debugObject, setDebugObject] = useState({
    // Colors
    depthColor: '#186691',
    surfaceColor: '#9bd8ff'
  })
  const [loading, setLoading] = useState(true)
  const [renderer, setRenderer] = useState()
  const [_camera, setCamera] = useState()
  const [target] = useState(new THREE.Vector3(-0.5, 1, 0))
  const [scene] = useState(new THREE.Scene())
  const [_controls, setControls] = useState()

  // Material
  const waterMaterial = new THREE.ShaderMaterial({
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    wireframe: true,
    // transparent: true,
    uniforms: {
      uTime: { value: 0 },

      uBigWavesElevation: { value: 0.2 },
      uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
      uBigWavesSpeed: { value: 0.75 },

      uSmallWavesElevation: { value: 0.15 },
      uSmallWavesFrequency: { value: 3 },
      uSmallWavesSpeed: { value: 0.2 },
      uSmallIterations: { value: 4 },

      uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
      uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
      uColorOffset: { value: 0.08 },
      uColorMultiplier: { value: 5 }
    }
  })

  const handleWindowResize = useCallback(() => {
    const { current: container } = refContainer
    if (container && renderer) {
      const scW = container.clientWidth
      const scH = container.clientHeight

      renderer.setSize(scW, scH)
    }
  }, [renderer])

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const { current: container } = refContainer

    if (container && !renderer) {
      const scW = window.innerWidth
      const scH = window.innerHeight
      const renderer = new THREE.WebGLRenderer()

      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(scW, scH)
      container.appendChild(renderer.domElement)
      setRenderer(renderer)

      // Geometry - responsive size based on screen width
      const screenWidth = window.innerWidth
      const baseSize = 4
      // Responsive scaling: larger geometry on smaller screens
      let scaleFactor = 1
      if (screenWidth < 480) { // Mobile phones
        scaleFactor = 2.0
      } else if (screenWidth < 768) { // Tablets
        scaleFactor = 1.5
      } else { // Desktop
        scaleFactor = 1
      }
      const geometrySize = baseSize * scaleFactor
      const waterGeometry = new THREE.PlaneBufferGeometry(geometrySize, geometrySize, 512, 512)
      // Mesh
      const water = new THREE.Mesh(waterGeometry, waterMaterial)
      water.rotation.x = -Math.PI * 0.5
      scene.add(water)

      /**
       * Camera
       */
      // Base camera - adjust FOV for different screen sizes
      let fov = 75
      let cameraDistance = 2
      if (screenWidth < 480) { // Mobile phones
        fov = 55
        cameraDistance = 1.2
      } else if (screenWidth < 768) { // Tablets
        fov = 60
        cameraDistance = 1.5
      } // Desktop keeps defaults
      const camera = new THREE.PerspectiveCamera(fov, scW / scH, 0.1, 1000)
      const initialCameraPosition = new THREE.Vector3(
        cameraDistance * Math.sin(0.2 * Math.PI),
        0.5,
        cameraDistance * Math.cos(0.2 * Math.PI)
      )
      camera.position.copy(initialCameraPosition)
      const initialCamPos = initialCameraPosition.clone()
      // camera.position.setZ(30)
      // camera.clearViewOffset()
      // camera.lookAt(target)
      setCamera(camera)

      // Controls
      const controls = new OrbitControls(camera, renderer.domElement)
      controls.enabled = true
      controls.autoRotate = false
      controls.enableDamping = true
      // controls.zoomSpeed = 5
      // controls.panSpeed = 2
      controls.enableZoom = true
      // controls.target = target
      setControls(controls)

      const addStar = () => {
        const geometrySphere = new THREE.SphereGeometry(0.25, 24, 24)
        const materialSphere = new THREE.MeshStandardMaterial({
          color: 0xffffff
        })
        const star = new THREE.Mesh(geometrySphere, materialSphere)
        const [x, y, z] = Array(3)
          .fill()
          .map(() => THREE.MathUtils.randFloatSpread(100))
        star.position.set(x, y, z)
        scene.add(star)
        console.log('adding start')
      }
      Array(200).fill().forEach(addStar)

      const onScroll = () => {
        const t = document.body.getBoundingClientRect().top

        // Smooth rotation based on scroll position
        water.rotation.z = t * -0.0001

        // Camera movement based on scroll position (add to initial position)
        camera.position.x = initialCamPos.x + t * -0.0001
        camera.position.y = initialCamPos.y + t * -0.0001
        camera.position.z = initialCamPos.z + t * -0.001
      }
      // clean up code
      const throttledOnScroll = throttle(onScroll, 16)
      window.removeEventListener('scroll', throttledOnScroll)
      window.addEventListener('scroll', throttledOnScroll, { passive: true })

      /**
       * Animate
       */
      let req = null
      const clock = new THREE.Clock()
      const animate = () => {
        const elapsedTime = clock.getElapsedTime()
        // Water
        waterMaterial.uniforms.uTime.value = elapsedTime
        // Update controls
        controls.update()
        // Render
        renderer.render(scene, camera)
        // Call animate again on the next frame
        req = requestAnimationFrame(animate)
      }

      animate()

      return () => {
        window.removeEventListener('scroll', throttledOnScroll)
        cancelAnimationFrame(req)
        renderer.dispose()
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false)
    return () => {
      window.removeEventListener('resize', handleWindowResize, false)
    }
  }, [renderer, handleWindowResize])

  return (
    <ModelContainer ref={refContainer}>
      {
        // loading logic later
      }
    </ModelContainer>
  )
}

export default ThreeWater
