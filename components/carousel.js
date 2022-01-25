import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'

import SwiperCore, { Pagination } from 'swiper'

import '../styles/Home.module.css'
import { P } from './common'

SwiperCore.use([Pagination])

export default function Carousel() {
  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={0}
        pagination={{
          clickable: true
        }}
        style={{
          paddingBottom: '60px',
          minHeight: '100px'
        }}
        className="mySwiper"
      >
        <SwiperSlide
          style={{
            width: '33.3%',
            marginLeft: '16px'
          }}
        >
          <div
            style={{
              border: '3px solid #00000090',
              padding: '10px',
              borderRadius: '16px',
              height: '100%',
              width: '100%'
            }}
            className="text-center justify-content-center"
          >
            <img
              style={{
                objectFit: 'cover'
              }}
              className="d-block w-100"
              src="https://elfsight.com/wp-content/uploads/2019/10/image-slider-screenshot-1.jpg"
              alt="First slide"
            />
            <P>some text</P>
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ width: '33.3%', marginLeft: '16px' }}>
          <div
            style={{
              border: '3px solid #00000090',
              padding: '10px',
              borderRadius: '16px',
              height: '100%',
              width: '100%'
            }}
            className="text-center justify-content-center"
          >
            <img
              style={{
                objectFit: 'cover'
              }}
              className="d-block w-100"
              src="https://elfsight.com/wp-content/uploads/2019/10/image-slider-screenshot-1.jpg"
              alt="First slide"
            />
            <P>some text</P>
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ width: '33.3%', marginLeft: '16px' }}>
          <div
            style={{
              border: '3px solid #00000090',
              padding: '10px',
              borderRadius: '16px',
              height: '100%',
              width: '100%'
            }}
            className="text-center justify-content-center"
          >
            <img
              style={{
                objectFit: 'cover'
              }}
              className="d-block w-100"
              src="https://elfsight.com/wp-content/uploads/2019/10/image-slider-screenshot-1.jpg"
              alt="First slide"
            />
            <P>some text</P>
          </div>
        </SwiperSlide>
        <SwiperSlide
          style={{
            width: '33.3%',
            marginLeft: '16px'
          }}
        >
          <div
            style={{
              border: '3px solid #00000090',
              padding: '10px',
              borderRadius: '16px',
              height: '100%',
              width: '100%'
            }}
            className="text-center justify-content-center"
          >
            <img
              style={{
                objectFit: 'cover'
              }}
              className="d-block w-100"
              src="https://elfsight.com/wp-content/uploads/2019/10/image-slider-screenshot-1.jpg"
              alt="First slide"
            />
            <P>some text</P>
          </div>
        </SwiperSlide>
        <SwiperSlide
          style={{
            width: '16px'
          }}
        />
      </Swiper>
    </>
  )
}
