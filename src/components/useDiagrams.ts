import { DiagramEngine } from '@projectstorm/react-diagrams-core'
import { useState, useLayoutEffect, RefObject } from 'react'

export function useDiagrams<T> (iUp: number) {
  const [isUp, setIsUp] = useState({ up: iUp })
  useLayoutEffect(() => {
    function updateModel () {
      console.log('1!', isUp)
      setIsUp({ up: isUp.up + 1 })
    }
    window.addEventListener('mousedown', updateModel)
    updateModel()
    return () => window.removeEventListener('mousedown', updateModel)
  }, [])

  return { isUp }
}
