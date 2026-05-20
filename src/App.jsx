import { useState, useEffect } from 'react'
import './index.css'

export default function App() {
  const [input, setInput] = useState('')
  const [exoId, setExoId] = useState('')
  const [searched, setSearched] = useState(false)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('exo')
    if (id) {
      const u = id.trim().toUpperCase()
      setInput(u)
      setExoId(u)
      setSearched(true)
      setIsValid(checkValidity(u))
    }
  }, [])

  const checkValidity = (id) => {
    const rMatch = id.match(/^R([1-9]|1[0-2])-E[1-4]$/)
    const testMatch = id.match(/^TEST([1-5])-E[1-5]$/)
    return !!(rMatch || testMatch)
  }

  const getMetadata = (id) => {
    const rMatch = id.match(/^R([1-9]|1[0-2])-E[1-4]$/)
    if (rMatch) {
      const rNum = rMatch[1]
      const exNum = id.split('-E')[1]
      return {
        badge: `Révision ${rNum} · Ex.${exNum}`,
        title: `Corrigé Révision ${rNum}`,
        pdfName: `R${rNum}`,
        hasBelfallagui: false
      }
    }
    const testMatch = id.match(/^TEST([1-5])-E[1-5]$/)
    if (testMatch) {
      const tNum = testMatch[1]
      const exNum = id.split('-E')[1]
      return {
        badge: `Test ${tNum} · Ex.${exNum}`,
        title: `Corrigé Test ${tNum}`,
        pdfName: `TEST${tNum}`,
        hasBelfallagui: true
      }
    }
    return null
  }

  const submit = (e) => {
    e.preventDefault()
    const id = input.trim().toUpperCase()
    setInput(id)
    setExoId(id)
    setSearched(true)
    setIsValid(checkValidity(id))
    const u = new URL(window.location)
    u.searchParams.set('exo', id)
    window.history.pushState({}, '', u)
  }

  const meta = getMetadata(exoId)

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <span className="logo-main">Soltani</span>
          <br/>
          <span className="logo-accent">Books</span>
        </div>
        <div className="header-sub">Corrigés Détaillés</div>
      </header>
      <main className="main-content">
        <section className="search-section">
          <h1 className="search-title">Trouvez votre corrigé</h1>
          <p className="search-subtitle">Scannez le QR code ou entrez le code de l'exercice</p>
          <form className="search-box" onSubmit={submit}>
            <input 
              className="search-input" 
              type="text" 
              placeholder="Code exercice (ex: R1-E1)" 
              value={input} 
              onChange={e => setInput(e.target.value)} 
            />
            <button className="search-button" type="submit">Rechercher</button>
          </form>
        </section>

        {searched && isValid && meta && (
          <article className="correction-card">
            <div className="card-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <span className="exo-badge">{meta.badge}</span>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {meta.hasBelfallagui && (
                    <a 
                      href={`${import.meta.env.BASE_URL}assets/belfallagui_${meta.pdfName}.pdf`} 
                      download 
                      className="download-pdf-btn"
                      style={{ background: 'linear-gradient(135deg, #F51E65, #c9104b)', borderColor: '#F51E65' }}
                      title="Télécharger la version très détaillée Belfallagui (Sujet complet)"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                      <span>Version Belfallagui</span>
                    </a>
                  )}
                  <a 
                    href={`${import.meta.env.BASE_URL}assets/${meta.pdfName}.pdf`} 
                    download 
                    className="download-pdf-btn"
                    title="Télécharger le corrigé détaillé (PDF)"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <span>Télécharger PDF</span>
                  </a>
                </div>
              </div>
              <h2 className="card-title">{meta.title}</h2>
            </div>
            <div className="card-body">
              <div className="info-box" style={{ marginBottom: '1.5rem' }}>
                <span className="info-label">📄 Aperçu du corrigé :</span> Vous pouvez lire ou télécharger le corrigé complet ci-dessous.
              </div>
              <div className="pdf-container" style={{ width: '100%', height: '600px', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                <iframe 
                  src={`${import.meta.env.BASE_URL}assets/${meta.pdfName}.pdf`} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 'none' }}
                  title={meta.title}
                />
              </div>
            </div>
          </article>
        )}

        {searched && !isValid && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h2>Corrigé introuvable</h2>
            <p>Le code « {exoId} » n'est pas valide ou n'existe pas.</p>
          </div>
        )}
      </main>
      <footer className="footer">
        <p>© 2026 Soltani Books – Tous droits réservés.</p>
      </footer>
    </div>
  )
}
