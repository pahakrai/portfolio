import { Box } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const AnimatedFilter = ({ tag }) => {
  const [type, setType] = useState(tag)
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
  useEffect(() => {
    if (tag) {
      setType(tag)
    }
  }, [tag])
  const dataType = ['work', 'experience', 'project']
  const filteredData = type ? data.filter(data => data.type === type) : data
  return (
    <div>
      <Box className="filter-option">
        <div className="tags">
          {dataType.map((t, idx) => (
            <button
              key={idx}
              onClick={() => setType(t)}
              className={`tag ${t === type ? 'active' : ''}`}
            >
              {t}
            </button>
          ))}
          {/* <button onClick={() => setType(null)}>clear</button> */}
        </div>
      </Box>
      <Box>
        <motion.div layout className="movies">
          {filteredData.map((pr, idx) => (
            <AnimatePresence key={idx}>
              <motion.div
                layout
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                className="filter"
              >
                <h2 style={{ position: 'absolute', padding: '20px' }}>
                  {pr.data}
                </h2>
                <img src={pr.src} alt="" style={{}}></img>
              </motion.div>
            </AnimatePresence>
          ))}
        </motion.div>
      </Box>
    </div>
  )
}

export default AnimatedFilter
