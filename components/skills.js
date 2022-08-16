import { motion } from 'framer-motion'

const Skills = () => {
  const skills = [
    {
      name: 'HTML',
      bgColor: '#fff',
      icon: 'html.png'
    },
    {
      name: 'CSS',
      bgColor: '#fff',
      icon: 'css.png'
    },
    {
      name: 'JS',
      bgColor: '#fff',
      icon: 'javascript.png'
    },
    {
      name: 'TS',
      bgColor: '#fff',
      icon: 'typescript.png'
    },
    {
      name: 'Redux',
      bgColor: '#fff',
      icon: 'redux.png'
    },
    {
      name: 'GraphQL',
      bgColor: '#fff',
      icon: 'graphql.png'
    },
    {
      name: 'Git',
      bgColor: '#fff',
      icon: 'git.png'
    },
    {
      name: 'Mongo',
      bgColor: '#fff',
      icon: 'mongo.png'
    },
    {
      name: 'Node',
      bgColor: '#fff',
      icon: 'node.png'
    },
    {
      name: 'API',
      bgColor: '#fff',
      icon: 'api.png'
    }
  ]
  return (
    <div className="app__skills-container">
      <motion.div className="app__skills-list">
        {skills.map(skill => (
          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
            className="app__skills-item app__flex"
            key={skill.name}
          >
            <div
              className="app__flex"
              style={{ backgroundColor: skill.bgColor }}
            >
              <img src={skill.icon} alt={skill.name} />
            </div>
            <p className="p-text">{skill.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default Skills
