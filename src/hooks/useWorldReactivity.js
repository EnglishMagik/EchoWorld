import { useEffect, useState } from "react"
import { uiEventBus } from "../engine/uiEventBus"

export function useWorldReactivity(eventKey, initial = null) {
  const [value, setValue] = useState(initial)

  useEffect(() => {
    const handler = (data) => setValue(data)

    uiEventBus.on(eventKey, handler)

    return () => uiEventBus.off(eventKey, handler)
  }, [eventKey])

  return value
}