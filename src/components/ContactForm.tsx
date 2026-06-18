import { useState } from 'react'
import { ArrowRight, Check, Loader2, Phone } from 'lucide-react'
import { HOUSE, ARTISTS } from '../config'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot anti-spam : si rempli, on ignore silencieusement.
    if (data.get('botcheck') || data.get('_gotcha')) return

    const artistObj = ARTISTS.find((a) => a.id === data.get('artist'))
    const artistLabel = artistObj ? `${artistObj.name} (${artistObj.handle})` : 'Indifférent'
    data.set('artist', artistLabel)
    data.append('subject', `Nouveau message · ${data.get('prenom')} · House of Gibbs`)
    if (HOUSE.formAccessKey) data.append('access_key', HOUSE.formAccessKey)

    setStatus('submitting')

    // Envoi automatique si un endpoint est configuré, sinon repli mailto.
    if (HOUSE.formEndpoint) {
      try {
        const res = await fetch(HOUSE.formEndpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: data,
        })
        if (res.ok) {
          setStatus('success')
          form.reset()
        } else {
          setStatus('error')
        }
      } catch {
        setStatus('error')
      }
    } else {
      const body = [
        `Prénom    : ${data.get('prenom')}`,
        `Téléphone : ${data.get('tel')}`,
        `E-mail    : ${data.get('email') || 'Non communiqué'}`,
        `Artiste   : ${artistLabel}`,
        '',
        'Projet :',
        `${data.get('projet')}`,
      ].join('\n')
      window.location.href = `mailto:${HOUSE.email}?subject=${encodeURIComponent(
        `Demande de contact · ${data.get('prenom')}`,
      )}&body=${encodeURIComponent(body)}`
      setStatus('success')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-3xl border border-line bg-white p-8 md:p-10 shadow-luxe text-center">
        <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-green-tint flex items-center justify-center">
          <Check size={26} strokeWidth={2.5} className="text-green-2" aria-hidden="true" />
        </div>
        <h3 className="font-display text-2xl font-500 text-ink mb-3">Message bien parti</h3>
        <p className="font-sans text-[15px] text-soft leading-relaxed max-w-sm mx-auto mb-8 text-pretty">
          {HOUSE.formEndpoint
            ? 'On a reçu votre demande. On revient vers vous en personne, rapidement, pour fixer la consultation.'
            : 'Votre messagerie s’est ouverte avec le message pré-rempli. Vérifiez, puis appuyez sur Envoyer.'}
        </p>
        <a
          href={`tel:${HOUSE.phoneRaw}`}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-ink text-canvas text-sm font-600 rounded-full hover:bg-green transition-colors active:scale-[0.96]"
        >
          <Phone size={15} strokeWidth={2.5} aria-hidden="true" />
          Ou appeler le {HOUSE.phone}
        </a>
      </div>
    )
  }

  const busy = status === 'submitting'

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-line bg-white p-6 md:p-8 shadow-luxe"
    >
      <p className="font-mono text-[11px] uppercase tracking-widest text-green mb-2">Écrivez-nous</p>
      <h3 className="font-display text-2xl font-500 text-ink mb-6 leading-tight">
        Parlez-nous de votre projet
      </h3>

      {/* Honeypot (caché) */}
      <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="c-prenom" className="block font-mono text-[10px] tracking-widest uppercase text-soft">Prénom</label>
            <input id="c-prenom" name="prenom" type="text" autoComplete="given-name" placeholder="Votre prénom" className="field" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="c-tel" className="block font-mono text-[10px] tracking-widest uppercase text-soft">Téléphone</label>
            <input id="c-tel" name="tel" type="tel" autoComplete="tel" inputMode="tel" placeholder="06 00 00 00 00" className="field" required />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="c-email" className="block font-mono text-[10px] tracking-widest uppercase text-soft">E-mail (optionnel)</label>
          <input id="c-email" name="email" type="email" autoComplete="email" spellCheck={false} placeholder="vous@email.com" className="field" />
        </div>

        <div className="space-y-2">
          <label htmlFor="c-artist" className="block font-mono text-[10px] tracking-widest uppercase text-soft">Avec quel artiste&nbsp;?</label>
          <select id="c-artist" name="artist" defaultValue="" className="field" style={{ color: '#15201B' }}>
            <option value="">Indifférent / au choix</option>
            {ARTISTS.map((a) => (
              <option key={a.id} value={a.id}>{a.name} · {a.handle}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="c-projet" className="block font-mono text-[10px] tracking-widest uppercase text-soft">Votre projet</label>
          <textarea id="c-projet" name="projet" rows={4} placeholder="Idée, emplacement, taille approximative, disponibilités…" className="field" required />
        </div>

        {status === 'error' && (
          <p role="alert" aria-live="polite" className="font-sans text-[13px] text-red-700 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
            L’envoi a échoué. Réessayez, ou appelez-nous au {HOUSE.phone}.
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="group w-full inline-flex items-center justify-center gap-2 py-4 bg-ink text-canvas font-600 rounded-full text-sm transition-colors hover:bg-green active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait"
        >
          {busy ? (
            <>
              <Loader2 size={16} strokeWidth={2.25} className="animate-spin" aria-hidden="true" />
              Envoi…
            </>
          ) : (
            <>
              Envoyer ma demande
              <ArrowRight size={16} strokeWidth={2.25} aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </button>

        <p className="text-center font-sans text-[12px] text-muted">
          Ou directement par téléphone :{' '}
          <a href={`tel:${HOUSE.phoneRaw}`} className="text-green font-600 hover:text-green-2 transition-colors">{HOUSE.phone}</a>
        </p>
      </div>
    </form>
  )
}
