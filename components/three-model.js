import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { loadGLTFModel } from '../lib/three-loader'
import { ModelSpinner, ModelContainer } from './three-model-wrapper'
import { gsap } from 'gsap'

// function easeOutCirc(x) {
//   return Math.sqrt(1 - Math.pow(x - 1, 4))
// }

const PortfolioModel = () => {
  const refContainer = useRef()
  const loadingBarElement = useRef(null)
  const elementRef1 = useRef(null)
  const elementRef2 = useRef(null)
  const elementRef3 = useRef(null)
  const [loading, setLoading] = useState(true)
  const [renderer, setRenderer] = useState()
  const [_camera, setCamera] = useState()
  const [target] = useState(new THREE.Vector3(-0.5, 1.2, 0))
  const [initialCameraPosition] = useState(
    new THREE.Vector3(
      20 * Math.sin(0.2 * Math.PI),
      10,
      20 * Math.cos(0.2 * Math.PI)
    )
  )
  const [scene] = useState(new THREE.Scene())
  const [sceneReady, setSceneReady] = useState(false)
  const [_controls, setControls] = useState()

  /**
   * Overlay
   */
  const overlayGeometry = new THREE.PlaneBufferGeometry(0.5, 0.5, 1, 1)
  const overlayMaterial = new THREE.ShaderMaterial({
    // wireframe: true,
    transparent: true,
    uniforms: {
      uAlpha: { value: 1 }
    },
    vertexShader: `
          void main()
          {
              gl_Position = vec4(position, 1.0);
          }
      `,
    fragmentShader: `
          uniform float uAlpha;

          void main()
          {
              gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
          }
      `
  })
  const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
  scene.add(overlay)

  const loadingManager = new THREE.LoadingManager(
    // Loaded
    () => {
      // Wait a little
      setTimeout(() => {
        // Animate overlay
        gsap.to(overlayMaterial.uniforms.uAlpha, {
          duration: 3,
          value: 0,
          delay: 1
        })
        // Update loadingBarElement
        loadingBarElement.current.classList.add('ended')
        loadingBarElement.current.style.transform = ''
      }, 500)

      setTimeout(() => {
        setSceneReady(true)
      }, 2000)
    },
    // Progress
    (itemUrl, itemsLoaded, itemsTotal) => {
      // Calculate the progress and update the loadingBarElement
      const progressRatio = itemsLoaded / itemsTotal
      loadingBarElement.current.style.transform = `scaleX(${progressRatio})`
    }
  )

  /**
   * Points of interest
   */
  const raycaster = new THREE.Raycaster()
  const points = [
    {
      position: new THREE.Vector3(1.55, 0.3, -0.6),
      elementRef: elementRef1
    },
    {
      position: new THREE.Vector3(0.5, 0.8, -1.6),
      elementRef: elementRef2
    },
    {
      position: new THREE.Vector3(1.6, -1.3, -0.7),
      elementRef: elementRef3
    }
  ]

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
      const scW = container.clientWidth
      const scH = container.clientHeight

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(scW, scH)
      renderer.outputEncoding = THREE.sRGBEncoding
      container.appendChild(renderer.domElement)
      setRenderer(renderer)

      // 640 -> 240
      // 8   -> 6
      const scale = scH * 0.005 + 4.8
      const camera = new THREE.OrthographicCamera(
        -scale,
        scale,
        scale,
        -scale,
        0.01,
        50000
      )
      camera.position.copy(initialCameraPosition)
      camera.lookAt(target)
      setCamera(camera)

      const ambientLight = new THREE.AmbientLight(0xcccccc, 1)
      scene.add(ambientLight)

      const controls = new OrbitControls(camera, renderer.domElement)
      controls.autoRotate = true
      controls.target = target
      setControls(controls)

      loadGLTFModel(
        scene,
        '/pahak.glb',
        {
          receiveShadow: false,
          castShadow: false
        },
        null,
        loadingManager
      ).then(() => {
        animate()
        setLoading(false)
      })

      let req = null
      // NOTE: OLD ANIMATE
      // let frame = 0
      // const animate = () => {
      //   req = requestAnimationFrame(animate)
      //   // NOTE: OLD CODE FOR REFERENCE
      //   frame = frame <= 100 ? frame + 1 : frame

      //   if (frame <= 100) {
      //     const p = initialCameraPosition
      //     const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20

      //     camera.position.y = 10
      //     camera.position.x =
      //       p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
      //     camera.position.z =
      //       p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
      //     camera.lookAt(target)
      //   } else {
      //     controls.update()
      //   }

      //   renderer.render(scene, camera)
      // }
      const animate = () => {
        req = requestAnimationFrame(animate)

        // Update controls
        controls.update()

        // Update points only when the scene is ready
        if (true) {
          // Go through each point
          for (const point of points) {
            console.log(point, 'point what')
            // Get 2D screen position
            const screenPosition = point.position.clone()
            screenPosition.project(camera)

            // Set the raycaster
            raycaster.setFromCamera(screenPosition, camera)
            const intersects = raycaster.intersectObjects(scene.children, true)

            // No intersect found
            if (intersects.length === 0) {
              // Show
              point.elementRef.current.classList.add('visible')
            }

            // Intersect found
            else {
              // Get the distance of the intersection and the distance of the point
              const intersectionDistance = intersects[0].distance
              const pointDistance = point.position.distanceTo(camera.position)

              //  Intersection is close than the point
              if (intersectionDistance < pointDistance) {
                // Hide
                point.elementRef.current.classList.remove('visible')
              }
              // Intersection is further than the point
              else {
                // Show
                point.elementRef.current.classList.add('visible')
              }
            }

            const translateX = screenPosition.x * container.clientWidth * 0.5
            const translateY = -screenPosition.y * container.clientHeight * 0.5
            point.elementRef.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
            camera.lookAt(target)
          }
        }

        // NOTE: OLD CODE FOR REFERENCE
        // frame = frame <= 100 ? frame + 1 : frame

        // if (frame <= 100) {
        //   const p = initialCameraPosition
        //   const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20

        //   camera.position.y = 10
        //   camera.position.x =
        //     p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed)
        //   camera.position.z =
        //     p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed)
        //   camera.lookAt(target)
        // } else {
        //   controls.update()
        // }

        renderer.render(scene, camera)
      }

      return () => {
        console.log('unmount')
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
      {/* {loading && <ModelSpinner />} */}
      {!sceneReady && (
        <div
          ref={loadingBarElement}
          className="loading-bar"
          // style={{ display: 'none' }}
        ></div>
      )}
      <div ref={elementRef1} className="point point-0">
        <div className="label">1</div>
        <div className="text">
          Front and top screen with HUD aggregating terrain and battle
          informations.
        </div>
      </div>
      <div ref={elementRef2} className="point point-1">
        <div className="label">2</div>
        <div className="text">
          Ventilation with air purifier and detection of environment toxicity.
        </div>
      </div>
      <div ref={elementRef3} className="point point-2">
        <div className="label">3</div>
        <div className="text">
          Cameras supporting night vision and heat vision with automatic
          adjustment.
        </div>
      </div>
    </ModelContainer>
  )
}

export default PortfolioModel
