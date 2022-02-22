import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

const AnimatedFilter = () => {
  const [type, setType] = useState(null)
  const data = [
    {
      id: 1,
      type: 'work',
      data: 'wat wat',
      src: 'https://images.ctfassets.net/lzny33ho1g45/1V3XE89tOdr6aRGp3WxywW/b2aa4e5f754c4984e5c125e75e3aa7e3/app-tips-gooogle-meet.jpg?w=1520&fm=jpg&q=30&fit=thumb&h=760'
    },
    {
      id: 2,
      type: 'work',
      data: 'wat wat 2',
      src: 'https://images.ctfassets.net/lzny33ho1g45/1V3XE89tOdr6aRGp3WxywW/b2aa4e5f754c4984e5c125e75e3aa7e3/app-tips-gooogle-meet.jpg?w=1520&fm=jpg&q=30&fit=thumb&h=760'
    },
    {
      id: 3,
      type: 'work',
      data: 'wat wat 3',
      src: 'https://images.ctfassets.net/lzny33ho1g45/1V3XE89tOdr6aRGp3WxywW/b2aa4e5f754c4984e5c125e75e3aa7e3/app-tips-gooogle-meet.jpg?w=1520&fm=jpg&q=30&fit=thumb&h=760'
    },
    {
      id: 4,
      type: 'experience',
      data: 'wat wat 4',
      src: 'https://images.ctfassets.net/lzny33ho1g45/1V3XE89tOdr6aRGp3WxywW/b2aa4e5f754c4984e5c125e75e3aa7e3/app-tips-gooogle-meet.jpg?w=1520&fm=jpg&q=30&fit=thumb&h=760'
    },
    {
      id: 5,
      type: 'experience',
      data: 'wat wat 5',
      src: 'https://images.ctfassets.net/lzny33ho1g45/1V3XE89tOdr6aRGp3WxywW/b2aa4e5f754c4984e5c125e75e3aa7e3/app-tips-gooogle-meet.jpg?w=1520&fm=jpg&q=30&fit=thumb&h=760'
    },
    {
      id: 6,
      type: 'experience',
      data: 'wat wat 6',
      src: 'https://images.ctfassets.net/lzny33ho1g45/1V3XE89tOdr6aRGp3WxywW/b2aa4e5f754c4984e5c125e75e3aa7e3/app-tips-gooogle-meet.jpg?w=1520&fm=jpg&q=30&fit=thumb&h=760'
    },
    {
      id: 7,
      type: 'project',
      data: 'wat wat 7',
      src: 'https://images.ctfassets.net/lzny33ho1g45/1V3XE89tOdr6aRGp3WxywW/b2aa4e5f754c4984e5c125e75e3aa7e3/app-tips-gooogle-meet.jpg?w=1520&fm=jpg&q=30&fit=thumb&h=760'
    },
    {
      id: 8,
      type: 'project',
      data: 'wat wat 8',
      src: 'https://images.ctfassets.net/lzny33ho1g45/1V3XE89tOdr6aRGp3WxywW/b2aa4e5f754c4984e5c125e75e3aa7e3/app-tips-gooogle-meet.jpg?w=1520&fm=jpg&q=30&fit=thumb&h=760'
    },
    {
      id: 9,
      type: 'project',
      data: 'wat wat 9',
      src: 'https://images.ctfassets.net/lzny33ho1g45/1V3XE89tOdr6aRGp3WxywW/b2aa4e5f754c4984e5c125e75e3aa7e3/app-tips-gooogle-meet.jpg?w=1520&fm=jpg&q=30&fit=thumb&h=760'
    }
  ]
  const dataType = ['work', 'experience', 'project']
  const filteredData = type ? data.filter(data => data.type === type) : data
  return (
    <div>
      <h2>{type}</h2>
      <div>
        {dataType.map((type, idx) => (
          <button
            key={idx}
            onClick={() => setType(type)}
            style={{
              borderWidth: 2,
              borderColor: 'black',
              padding: 4,
              borderRadius: 16,
              marginRight: 4
            }}
          >
            {type}
          </button>
        ))}
        <button onClick={() => setType(null)}>clear</button>
      </div>
      <motion.div layout className="movies">
        {filteredData.map((pr, idx) => (
          <AnimatePresence key={idx}>
            <motion.div
              layout
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
            >
              <h2>{pr.data}</h2>
              <img src={pr.src} alt=""></img>
            </motion.div>
          </AnimatePresence>
        ))}
      </motion.div>
    </div>
  )
}

export default AnimatedFilter
