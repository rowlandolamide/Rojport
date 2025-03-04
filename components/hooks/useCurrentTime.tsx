import { useState, useEffect } from 'react'

const useCurrentTime = () => {
  const [value, setValue] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return value
}

export const Time = () => {
  const value = useCurrentTime()
  return (
    <span>
      {value.getUTCHours() + 1 === 24 ? '00' : value.getUTCHours() + 1}:
      {value.getUTCMinutes() > 9 ? '' : '0'}
      {value.getUTCMinutes()}
    </span>
  )
}

export default useCurrentTime
