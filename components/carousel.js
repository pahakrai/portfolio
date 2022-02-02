import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Pagination } from 'swiper'

import '../styles/Home.module.css'
import { P } from './common'
import TaskFrame from './task-frame'

SwiperCore.use([Pagination])

const taskList = [
  {
    type: 'Delivery',
    icon: '/images/pahak.png',
    caption: 'Delivery',
    onClick: () => false
  },
  {
    type: 'Subscribe',
    icon: '/images/pahak.png',
    caption: 'Subscribe',
    onClick: () => false
  },
  {
    type: 'Location',
    icon: '/images/pahak.png',
    caption: 'Location',
    onClick: () => false
  },
  {
    type: 'Schedule',
    icon: '/images/pahak.png',
    caption: 'Schedule',
    onClick: () => false
  }
]

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
        {taskList.map((task, idx) => (
          <SwiperSlide
            style={{
              width: '33.3%',
              marginLeft: '16px'
            }}
          >
            <TaskFrame className="text-center justify-content-center">
              <img
                style={{
                  objectFit: 'cover'
                }}
                className="d-block w-100"
                src={task.icon}
                alt={task.type}
              />
              <P style={{ textAlign: 'center' }}>{task.caption}</P>
            </TaskFrame>
          </SwiperSlide>
        ))}
        <SwiperSlide
          style={{
            width: '16px'
          }}
        />
      </Swiper>
    </>
  )
}
