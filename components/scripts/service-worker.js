import Script from 'next/script'
import { useEffect } from 'react'

const ServiceWorker = () => {
  useEffect(() => {
    initServiceWorker()
  }, [])

  const initServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/serviceworker.js').then(
          function (registration) {
            console.log(
              'Service Worker registration successful with scope: ',
              registration.scope
            )
          },
          function (err) {
            console.log('Service Worker registration failed: ', err)
          }
        )
      })
    }
  }

  return (
    <>
      {/* <Script
        id="service-worker"
        // src=""
        onLoad={initServiceWorker}
      /> */}
    </>
  )
}

export default ServiceWorker
