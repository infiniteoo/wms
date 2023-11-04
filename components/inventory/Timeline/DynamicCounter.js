import React, { useState, useEffect } from 'react'

const SECONDS_IN_AN_HOUR = 3600

const DynamicCounter = ({ total }) => {
  const getCurrentSecondOfHour = () => {
    const now = new Date()
    return now.getMinutes() * 60 + now.getSeconds()
  }

  const getInitialValues = () => {
    const secondsPassed = getCurrentSecondOfHour()
    const progressValue = (secondsPassed / SECONDS_IN_AN_HOUR) * 100
    const addition = (total / SECONDS_IN_AN_HOUR) * secondsPassed

    return {
      progress: progressValue,
      current: addition,
    }
  }

  const [progress, setProgress] = useState(getInitialValues().progress)
  const [current, setCurrent] = useState(getInitialValues().current)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 100 / SECONDS_IN_AN_HOUR)
      setCurrent((prevCurrent) => prevCurrent + total / SECONDS_IN_AN_HOUR)

      if (progress >= 100) {
        setProgress(100)
        clearInterval(interval)
      }

      if (current >= total) {
        setCurrent(total)
        clearInterval(interval)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [progress, current, total])

  return [progress, current]
}

export default DynamicCounter
