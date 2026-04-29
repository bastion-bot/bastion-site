'use client'

import { useEffect, useRef, useState } from 'react'

export function useCountUp(target: number, delay = 0) {
  const [count, setCount] = useState(0)
  const done = useRef(false)

  useEffect(() => {
    const t = setTimeout(() => {
      if (done.current) return
      done.current = true

      const step = target / 55
      let current = 0
      const iv = setInterval(() => {
        current += step
        if (current >= target) {
          setCount(target)
          clearInterval(iv)
          return
        }
        setCount(Math.floor(current))
      }, 20)
    }, delay)

    return () => clearTimeout(t)
  }, [target, delay])

  return count
}
