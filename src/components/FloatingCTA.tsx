import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import { Phone, CalendarDays } from 'lucide-react'
import { HOUSE } from '../config'
import { useBooking } from '../booking'

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScroll()
  const { openBooking } = useBooking()

  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > 560))

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden pb-safe"
      aria-hidden={!visible}
    >
      <div className="bg-canvas/90 backdrop-blur-md border-t border-line px-4 py-3 flex gap-3">
        <button
          onClick={() => openBooking()}
          className="flex-1 flex items-center justify-center gap-2.5 py-3.5 bg-ink text-canvas text-sm font-600 rounded-full"
        >
          <CalendarDays size={15} strokeWidth={2.25} />
          Prendre rendez-vous
        </button>
        <a
          href={`tel:${HOUSE.phoneRaw}`}
          className="w-14 flex items-center justify-center py-3.5 text-ink rounded-full border border-line"
          aria-label="Appeler"
        >
          <Phone size={17} strokeWidth={2.25} className="text-green" />
        </a>
      </div>
    </motion.div>
  )
}
