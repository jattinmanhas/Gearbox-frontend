import React from 'react'
import styles from './hero.module.css'

const Hero = () => {
  return (
    <div>
        <div>
            <h1 className={styles.hero_heading}>Power Up Your Tech Life!</h1>
            <h5 className='dark:text-white text-black'>Stay ahead of the curve with the latest tech insights, trends, and products. Dive into our expert blogs and shop the best gadgets.</h5>
        </div>
    </div>
  )
}

export default Hero