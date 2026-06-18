import { useRef, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as const

// Reveal d'entrée standardisé (fade + montée, déclenché une fois en vue).
// `delay` pour orchestrer un stagger entre plusieurs blocs.
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  margin = '-70px',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  margin?: string
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: margin as never })

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
