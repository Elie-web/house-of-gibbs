import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'

// Contexte global de prise de rendez-vous.
// N'importe quel bouton du site peut ouvrir la modale, en pré-sélectionnant
// éventuellement un artiste : openBooking('isabelle').

type BookingContextValue = {
  isOpen: boolean
  artistId: string | null
  openBooking: (artistId?: string | null) => void
  closeBooking: () => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [artistId, setArtistId] = useState<string | null>(null)

  const openBooking = useCallback((id: string | null = null) => {
    setArtistId(id)
    setIsOpen(true)
  }, [])

  const closeBooking = useCallback(() => setIsOpen(false), [])

  return (
    <BookingContext.Provider value={{ isOpen, artistId, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used within a BookingProvider')
  return ctx
}
