import { useState, useEffect, useRef } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import './index.css'
import T from './formulas.json'
import { ScatterPlot, FunctionCurve, VariationTable } from './charts.jsx'

const tex = (s, d = false) => ({ __html: katex.renderToString(s, { throwOnError: false, displayMode: d }) })
const IM = ({ t }) => <span dangerouslySetInnerHTML={tex(t)} />
const BM = ({ t }) => <div className="block-math" dangerouslySetInnerHTML={tex(t, true)} />

const StatTable = ({ data }) => (
  <div className="stat-table-wrap">
    <table className="stat-table">
      <thead>
        <tr>
          <th>Paramètre</th>
          <th>Formule</th>
          <th>Résultat</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            <td>{row.label}</td>
            <td>{row.f ? <BM t={row.f} /> : null}</td>
            <td>{row.r ? <BM t={row.r} /> : null}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const GraphDegTable = ({ nodes, dPlus, dMinus, d }) => (
  <div className="stat-table-wrap" style={{ maxWidth: '600px', margin: '1.5rem auto' }}>
    <table className="stat-table">
      <thead>
        <tr>
          <th>Sommet</th>
          {nodes.map(n => <th key={n} style={{ textAlign: 'center' }}>{n}</th>)}
        </tr>
      </thead>
      <tbody>
        {d ? (
          <tr>
            <td><BM t="d" /></td>
            {d.map((val, i) => <td key={i}>{val}</td>)}
          </tr>
        ) : (
          <>
            <tr>
              <td><BM t="d^+" /></td>
              {dPlus.map((val, i) => <td key={i}>{val}</td>)}
            </tr>
            <tr>
              <td><BM t="d^-" /></td>
              {dMinus.map((val, i) => <td key={i}>{val}</td>)}
            </tr>
          </>
        )}
      </tbody>
    </table>
  </div>
)

const COLORS = ['#1d3a6e','#e0296e','#00b4a6','#7c3aed','#ea7c1e','#16803c','#dc2626']
function Step({ children, index, title }) {
  const ref = useRef(null)
  const color = COLORS[index % COLORS.length]
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('step-visible'); obs.disconnect() } }, { threshold: 0.05 })
    obs.observe(el); return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className="step step-hidden" style={{ '--step-color': color, '--delay': `${index * 0.1}s` }}>
      <div className="step-number" style={{ background: color }}>{index + 1}</div>
      <div className="step-inner">
        <h3 className="step-title" style={{ color }}>{title}</h3>
        <div className="step-body">{children}</div>
      </div>
    </div>
  )
}
const IB = ({ label, children }) => <div className="info-box"><span className="info-label">{label} :</span> {children}</div>
const RB = ({ children }) => <div className="result-box">{children}</div>
const CR = ({ label, fkey }) => <div className="calc-row">{label} : <BM t={T[fkey]} /></div>

// ── Raisonnement par récurrence ───────────────────────────────────────────────
function Rec({ prop, verif, suppo, demo }) {
  return (
    <div className="rec-box">
      <div className="rec-prop"><span className="rec-label">Propriété à démontrer</span>{prop}</div>
      <div className="rec-steps">
        <div className="rec-step rec-init">
          <div className="rec-step-badge">① Vérification</div>
          <div className="rec-step-body">{verif}</div>
        </div>
        <div className="rec-step rec-hyp">
          <div className="rec-step-badge">② Supposition (H.R.)</div>
          <div className="rec-step-body">{suppo}</div>
        </div>
        <div className="rec-step rec-demo">
          <div className="rec-step-badge">③ Démonstration</div>
          <div className="rec-step-body">{demo}</div>
        </div>
      </div>
    </div>
  )
}


// ── R1-E1 ─────────────────────────────────────────────────────────────────────
function R1E1() {
  return (<>
    <Step index={0} title="Question 1 : Figure géométrique">
      <div style={{width: '100%', height: '550px', margin: '20px 0'}}>
        <iframe src="/assets/anim_sujet1_complexe.html" width="100%" height="100%" style={{border: 'none', borderRadius: '12px'}}></iframe>
      </div>
      <RB>L'animation ci-dessus montre le placement de A, B, C, I et la construction du losange ABCD étape par étape.</RB>
      <IB label="Question 1.b - Milieu de [AC]">
        <BM t={T.R1E1_1b} />
      </IB>
      <RB>I est bien le milieu du segment [AC].</RB>
    </Step>

    <Step index={1} title="Question 2 : Triangle ABC">
      <IB label="2.a - Calcul des affixes u et u'">
        <BM t={T.R1E1_2a_u} />
        <BM t={T.R1E1_2a_v} />
      </IB>
      <IB label="2.b - Nature du triangle ABC">
        <BM t={T.R1E1_2b_AB} />
        <BM t={T.R1E1_2b_BC} />
      </IB>
      <RB>Comme AB = BC, le triangle ABC est isocèle de sommet principal B.</RB>
    </Step>

    <Step index={2} title="Question 3 : Quadrilatère ABCD">
      <IB label="3.a - Affixe du point D">
        <BM t={T.R1E1_3a_D} />
      </IB>
      <IB label="3.b - Nature de ABCD">
        <BM t={T.R1E1_3b_diag} />
        <BM t={T.R1E1_3b_cotes} />
      </IB>
      <RB>ABCD est un losange.</RB>
    </Step>

    <Step index={3} title="Question 4.a : Vérification de la solution">
      <BM t={T.R1E1_E} />
      <IB label="Calcul avec (-2i)">
        <BM t={T.R1E1_4a_sub1} />
        <BM t={T.R1E1_4a_sub2} />
        <BM t={T.R1E1_4a_sub3} />
        <BM t={T.R1E1_4a_sum} />
      </IB>
      <RB>(-2i) est bien solution de l'équation (E).</RB>
    </Step>

    <Step index={4} title="Question 4.b : Détermination de a, b et c">
      <IB label="Développement et Identification">
        <BM t={T.R1E1_dev} />
        <BM t={T.R1E1_sys} />
      </IB>
      <RB>On obtient : <BM t={T.R1E1_abc} /></RB>
    </Step>

    <Step index={5} title="Question 4.c : Résolution de l'équation">
      <IB label="Équation du second degré">
        <BM t={T.R1E1_E2} />
      </IB>
      <IB label="Calcul du discriminant">
        <BM t={T.R1E1_delta} />
        <BM t={T.R1E1_rac} />
      </IB>
      <IB label="Solutions de l'équation du second degré">
        <BM t={T.R1E1_z1} />
        <BM t={T.R1E1_z2} />
      </IB>
      <RB>L'ensemble des solutions est : <BM t={T.R1E1_sol} /></RB>
    </Step>
  </>)
}

// ── R1-E2 ─────────────────────────────────────────────────────────────────────
function R1E2() {
  return (<>
    <Step index={0} title="Partie A : Puissances de 2">
      <IB label="Question 1.a"><BM t={T.R1E2_A1} /></IB>
      <IB label="Question 1.b"><BM t={T.R1E2_A2} /></IB>
      <IB label="Question 2.a"><BM t={T.R1E2_A3} /></IB>
      <IB label="Question 2.b"><BM t={T.R1E2_A4} /></IB>
    </Step>
    <Step index={1} title="Partie B : Puissances de 3">
      <IB label="Question 1.a"><BM t={T.R1E2_B1} /></IB>
      <IB label="Question 2.a"><BM t={T.R1E2_B3} /></IB>
      <IB label="Question 2.b"><BM t={T.R1E2_B4} /></IB>
    </Step>
    <Step index={2} title="Partie C : Divisibilité de A_n">
      <IB label="Question 1"><BM t={T.R1E2_C1} /></IB>
      <IB label="Question 2"><BM t={T.R1E2_C2} /></IB>
      <RB>Somme globale : <BM t={T.R1E2_C3} /> (divisible par 7).</RB>
    </Step>
  </>)
}

// ── R1-E3 ─────────────────────────────────────────────────────────────────────
function R1E3() {
  return (<>
    <Step index={0} title="Nuage de points et Ajustement">
      <IB label="Coefficient de corrélation affine"><BM t={T.R1E3_r} /></IB>
      <IB label="Coefficient de corrélation exponentiel (Z=ln(y))"><BM t={T.R1E3_rZ} /></IB>
      <RB>L'ajustement exponentiel est plus pertinent (r plus proche de 1).</RB>
    </Step>
    <Step index={1} title="Droite de régression">
      <IB label="Équation de Z en x"><BM t={T.R1E3_Z} /></IB>
      <IB label="Expression de y en x"><BM t={T.R1E3_y} /></IB>
    </Step>
    <Step index={2} title="Estimations">
      <IB label="Pour 2026 (x=10)"><BM t={T.R1E3_2026} /></IB>
      <IB label="Dépassement de 1000 M DT"><BM t={T.R1E3_1000} /></IB>
      <RB>Le chiffre d'affaires dépassera 1000 M DT à partir de l'année 2027.</RB>
    </Step>
  </>)
}

// ── R1-E4 ─────────────────────────────────────────────────────────────────────
function R1E4() {
  return (<>
    <Step index={0} title="Limites et Asymptotes">
      <BM t={T.R1E4_f} />
      <IB label="Limite en 0^+"><BM t={T.R1E4_lim0} /> <IM t="\\implies" /> Asymptote verticale d'équation <IM t="x=0" />.</IB>
      <IB label="Limite en +\infty"><BM t={T.R1E4_liminf} /></IB>
      <IB label="Branche infinie"><BM t={T.R1E4_limdiv} /> <IM t="\\implies" /> Branche parabolique de direction <IM t="(Oy)" />.</IB>
    </Step>
    <Step index={1} title="Dérivée et Variations">
      <IB label="Calcul de f'(x)"><BM t={T.R1E4_fp} /></IB>
      <IB label="Signe"><BM t={T.R1E4_sign} /></IB>
      <RB><IM t="f" /> est croissante sur <IM t="]0, 1]" /> et décroissante sur <IM t="[1, +\\infty[" />, avec un maximum en <IM t="x=1" /> valant <IM t="0" />.</RB>
    </Step>
    <Step index={2} title="Aire sous la courbe">
      <IB label="Intégration par parties">
        <BM t={T.R1E4_ipp1} />
        <BM t={T.R1E4_ipp2} />
        <BM t={T.R1E4_ipp3} />
      </IB>
      <RB>L'aire est l'opposée de l'intégrale (car <IM t="f(x) \\le 0" /> sur <IM t="[1, e]" />) : <IM t="\\mathscr{A} = \\frac{2e^3-8}{9}" /> u.a.</RB>
    </Step>
  </>)
}




// ── TEST 1 ────────────────────────────────────────────────────────────────────
function TEST1E1() { return (<>
  <Step index={0} title="Fonctions Exponentielles — QCM"><IB label="Réponses correctes">
    <BM t={"1)\\;\\lim_{x\\to-\\infty}f(x)=-1 \\quad 2)\\;f'(x)=(x^2+x-1)e^x \\quad 3)\\;e^{1+2\\ln2}-e^{1-\\ln2}=\\frac{7e}{2}"} />
  </IB><RB><BM t={"4)\\;\\int_0^1 2e^{-2x}\\,dx = 1-e^{-2}"} /></RB></Step>
</>)}
function TEST1E2() { return (<>
  <Step index={0} title="Graphes et Matrices — QCM"><IB label="Réponses correctes">
    <BM t={"1)\\;\\text{Non orienté}\\quad 2)\\;5\\text{ arêtes}\\quad 3)\\;\\text{Non, 2 sommets impairs}"} />
  </IB><RB><BM t={"4)\\;M^2 \\text{ = nombre de chaînes de longueur 2}"} /></RB></Step>
</>)}
function TEST1E3() { return (<>
  <Step index={0} title="Probabilités — QCM"><IB label="Réponses correctes">
    <BM t={"1)\\;p(A\\cap B)=0{,}08\\quad 2)\\;p(A\\cup B)=0{,}62\\quad 3)\\;p=0{,}4"} />
  </IB><RB><BM t={"4)\\;p(X=1)=\\tfrac{54}{125}"} /></RB></Step>
</>)}
function TEST1E4() { return (<>
  <Step index={0} title="Statistiques — QCM">
    <StatTable data={[
      { label: "1) Droite", f: "Y = aX+b", r: "Y=3{,}5X+2{,}3" },
      { label: "2) Coefficient", f: "a", r: "a=3{,}5" },
      { label: "3) Ajustement", r: "\\text{Ajustement fort}" },
      { label: "4) Estimation", f: "Y(5)", r: "19{,}8" }
    ]} />
  </Step>
</>)}
function TEST1E5() { return (<>
  <Step index={0} title="Suites Numériques — QCM"><IB label="Réponses correctes">
    <BM t={"1)\\;V_0=-4\\quad 2)\\;q=\\tfrac{1}{3}\\quad 3)\\;V_n=-4\\times(\\tfrac{1}{3})^n"} />
  </IB><RB><BM t={"4)\\;\\lim U_n = 6"} /></RB></Step>
</>)}

// ── TEST 2 ────────────────────────────────────────────────────────────────────
function TEST2E1() { return (<>
  <Step index={0} title="Fonctions Logarithmes — QCM"><IB label="Réponses correctes">
    <BM t={"1)\\;0\\quad 2)\\;f'(x)=-\\frac{e^{-x}}{1+e^{-x}}\\quad 3)\\;\\ln(4e)+\\ln(e/2)-\\ln(2/e^2)=4"} />
  </IB><RB><BM t={"4)\\;\\int_1^e(1+\\tfrac{2}{x})dx = e-1+2"} /></RB></Step>
</>)}
function TEST2E2() { return (<>
  <Step index={0} title="Analyse Graphique — QCM"><IB label="Réponses correctes">
    <BM t={"1)\\;g'(-2)=4\\quad 2)\\;\\lim_{x\\to-\\infty}\\frac{g(x)}{x}=0\\quad 3)\\;\\lim_{x\\to+\\infty}(g(x)-x)=1"} />
  </IB><RB><BM t={"4)\\;\\text{La courbe coupe (Ox) 2 fois}"} /></RB></Step>
</>)}
function TEST2E3() { return (<>
  <Step index={0} title="Matrices et Systèmes — QCM"><IB label="Réponses correctes">
    <BM t={"1)\\;\\det(A)=-1\\quad 2)\\;A(A+I_3)=\\begin{pmatrix}2&-1&0\\\\1&1&-1\\\\2&0&0\\end{pmatrix}"} />
  </IB><RB><BM t={"3)\\;\\text{Matrice de (S) correcte}\\quad 4)\\;1\\text{ solution unique}"} /></RB></Step>
</>)}
function TEST2E4() { return (<>
  <Step index={0} title="Suites Numériques — QCM"><IB label="Réponses correctes">
    <BM t={"1)\\;U_n=\\frac{2-n}{2}\\quad 2)\\;\\text{Décroissante}\\quad 3)\\;\\lim U_n=-\\infty"} />
  </IB><RB><BM t={"4)\\;\\lim_{n\\to+\\infty}n\\,e^{-n+1}=0"} /></RB></Step>
</>)}
function TEST2E5() { return (<>
  <Step index={0} title="Graphes Probabilistes — QCM"><IB label="Réponses correctes">
    <BM t={"1)\\;P(B\\to A)=0{,}2\\quad 2)\\;P_1=(0{,}6\\;\\;0{,}4)\\quad 3)\\;\\text{État stable}: a=\\tfrac{1}{3},b=\\tfrac{2}{3}"} />
  </IB><RB><BM t={"4)\\;a+b=1 \\text{ toujours}"} /></RB></Step>
</>)}

// ── TEST 3 ────────────────────────────────────────────────────────────────────
function TEST3E1() { return (<>
  <Step index={0} title="Matrices ordre 3 — QCM"><IB label="Réponses correctes">
    <BM t={"1)\\;\\det(A)=8\\quad 2)\\;AX=\\begin{pmatrix}2\\\\3\\\\1\\end{pmatrix}\\quad 3)\\;X=A^{-1}\\begin{pmatrix}2\\\\3\\\\1\\end{pmatrix}"} />
  </IB><RB><BM t={"4)\\;A^{-1}=\\tfrac{1}{8}(3I_3-A)"} /></RB></Step>
</>)}
function TEST3E2() { return (<>
  <Step index={0} title="Théorie des Graphes — QCM"><IB label="Réponses correctes">
    <BM t={"1)\\;d^+(A)=2\\quad 2)\\;\\text{Oui, }d^+(A)=d^-(A)\\quad 3)\\;1\\text{ chemin de long.2 de B vers C}"} />
  </IB><RB><BM t={"4)\\;6\\text{ arcs}"} /></RB></Step>
</>)}
function TEST3E3() { return (<>
  <Step index={0} title="Probabilités et Suites — QCM"><IB label="Réponses correctes">
    <BM t={"1)\\;E(X)=-0{,}5\\text{ DT}\\quad 2)\\;\\mathcal{B}(4;0{,}3)\\quad 3)\\;C_4^2(0{,}3)^2(0{,}7)^2"} />
  </IB><RB><BM t={"4)\\;\\lim U_n=3"} /></RB></Step>
</>)}
function TEST3E4() { return (<>
  <Step index={0} title="Analyse et Aires — QCM"><IB label="Réponses correctes">
    <BM t={"1)\\;F(0)=2,\\,F(2)=0\\quad 2)\\;C_F\\text{ admet une tangente horizontale}\\quad 3)\\;\\int_0^1 f(x)\\,dx"} />
  </IB><RB><BM t={"4)\\;\\mathcal{A}=e-2\\text{ u.a.}"} /></RB></Step>
</>)}
function TEST3E5() { return (<>
  <Step index={0} title="Statistiques — QCM">
    <StatTable data={[
      { label: "1) Moyenne", f: "\\bar{X}", r: "2" },
      { label: "2) Corrélation", f: "|r|", r: "\\approx 1" },
      { label: "3) Estimation", f: "Y(10)", r: "26" },
      { label: "4) Signe de r", r: "r\\text{ est positif}" }
    ]} />
  </Step>
</>)}

// ── TEST 4 ────────────────────────────────────────────────────────────────────
function TEST4E1() { return (<>
  <Step index={0} title="Matrices et Résolution — QCM"><IB label="Réponses correctes">
    <BM t={"1)\\;\\det(A)=4\\quad 2)\\;A^{-1}=\\tfrac{1}{4}(5I_3-A)\\quad 3)\\;\\text{Somme L1}=4"} />
  </IB><RB><BM t={"4)\\;(\\tfrac{1}{4},\\tfrac{1}{4},\\tfrac{1}{4})"} /></RB></Step>
</>)}
function TEST4E2() { return (<>
  <Step index={0} title="Graphes Probabilistes — QCM"><IB label="Réponses correctes">
    <BM t={"1)\\;P_1=(0{,}55\\;\\;0{,}45)\\quad 2)\\;P=P\\times M\\quad 3)\\;a=0{,}6"} />
  </IB><RB><BM t={"4)\\;K_4\\text{ a 6 arêtes}"} /></RB></Step>
</>)}
function TEST4E3() { return (<>
  <Step index={0} title="Probabilités Conditionnelles — QCM"><IB label="Réponses correctes">
    <BM t={"1)\\;p(F\\cap L)=0{,}18\\quad 2)\\;p(L)=0{,}26\\quad 3)\\;p(F|L)\\approx 0{,}692"} />
  </IB><RB><BM t={"4)\\;1-(0{,}74)^3"} /></RB></Step>
</>)}
function TEST4E4() { return (<>
  <Step index={0} title="Analyse f(x)=xeˣ — QCM"><IB label="Réponses correctes">
    <BM t={"1)\\;\\lim_{x\\to-\\infty}xe^x=0\\quad 2)\\;F'(x)=xe^x\\quad 3)\\;\\text{minimum en }x=-1"} />
  </IB><RB><BM t={"4)\\;\\int_1^2 xe^x\\,dx = e^2"} /></RB></Step>
</>)}
function TEST4E5() { return (<>
  <Step index={0} title="Suites et Limites — QCM"><IB label="Réponses correctes">
    <BM t={"1)\\;W_n=3\\times(0{,}2)^n\\quad 2)\\;\\lim W_n=0\\quad 3)\\;\\lim S_n=\\tfrac{15}{4}\\text{ et }\\tfrac{3}{0{,}8}\\text{ (les deux)}"} />
  </IB><RB><BM t={"4)\\;n=4"} /></RB></Step>
</>)}

// ── TEST 5 ────────────────────────────────────────────────────────────────────
function TEST5E1() { return (<>
  <Step index={0} title="Analyse Graphique et Primitives — QCM"><IB label="Réponses correctes">
    <BM t={"1)\\;\\Delta: y=x-1\\quad 2)\\;\\lim(f(x)-(x-1))=0\\quad 3)\\;(\\mathcal{C})\\text{ est au dessus de }(\\Delta)"} />
  </IB><RB><BM t={"4)\\;F(x)=\\tfrac{1}{2}x^2-x+\\ln(x)"} /></RB></Step>
</>)}
function TEST5E2() { return (<>
  <Step index={0} title="Loi Binomiale — QCM"><IB label="Réponses correctes">
    <BM t={"1)\\;\\sigma(X)=1{,}2\\quad 2)\\;\\mathcal{B}(5;0{,}3)\\quad 3)\\;E(Y)=1{,}5"} />
  </IB><RB><BM t={"4)\\;P(Y=0)=(0{,}7)^5"} /></RB></Step>
</>)}
function TEST5E3() { return (<>
  <Step index={0} title="Suites et Matrices — QCM"><IB label="Réponses correctes">
    <BM t={"1)\\;V_n=U_n-6\\text{ géom. de raison }\\tfrac{1}{2}\\quad 2)\\;\\lim U_n=6\\quad 3)\\;\\det(A)=3"} />
  </IB><RB><BM t={"4)\\;\\text{1ère colonne de }A^{-1}=\\begin{pmatrix}1\\\\0\\\\0\\end{pmatrix}"} /></RB></Step>
</>)}
function TEST5E4() { return (<>
  <Step index={0} title="Graphes — Dijkstra — QCM"><IB label="Réponses correctes">
    <BM t={"1)\\;X=8(B),\\,Y=9(C)\\quad 2)\\;d(A,F)=11\\quad 3)\\;\\text{Diamètre}=4"} />
  </IB><RB><BM t={"4)\\;\\text{Non}"} /></RB></Step>
</>)}
function TEST5E5() { return (<>
  <Step index={0} title="Logarithmes et Inéquations — QCM"><IB label="Réponses correctes">
    <BM t={"1)\\;D_f=]0,+\\infty[\\quad 2)\\;X=1\\text{ et }X=2\\quad 3)\\;x=e\\text{ et }x=e^2"} />
  </IB><RB><BM t={"4)\\;\\ln(x)>1\\iff x\\in]e,+\\infty["} /></RB></Step>
</>)}

const DB = {
  'R1-E1': { title:'Nombres Complexes — Équations et Géométrie', badge:'Révision 1 · Ex.1 · Complexes',    C:<R1E1/> },
  'R1-E2': { title:'Arithmétique — Congruences et Puissances',   badge:'Révision 1 · Ex.2 · Arithmétique', C:<R1E2/> },
  'R1-E3': { title:'Statistiques — Cloud Computing en Tunisie',  badge:'Révision 1 · Ex.3 · Statistiques', C:<R1E3/> },
  'R1-E4': { title:'Étude de Fonction — f(x)=(1-x²)ln(x)',      badge:'Révision 1 · Ex.4 · Analyse',      C:<R1E4/> },
  'R2-E1': { title:'Nombres Complexes — Équations et Géométrie', badge:'Révision 2 · Ex.1', C:<R2E1/> },
  'R2-E2': { title:'Suites Numériques',        badge:'Révision 2 · Ex.2', C:<R2E2/> },
  'R2-E3': { title:'Statistiques',             badge:'Révision 2 · Ex.3', C:<R2E3/> },
  'R2-E4': { title:'Étude de Fonction',        badge:'Révision 2 · Ex.4', C:<R2E4/> },
  'R3-E1': { title:'Matrices et Suites',       badge:'Révision 3 · Ex.1', C:<R3E1/> },
  'R3-E2': { title:'Théorie des Graphes',      badge:'Révision 3 · Ex.2', C:<R3E2/> },
  'R3-E3': { title:'Probabilités',             badge:'Révision 3 · Ex.3', C:<R3E3/> },
  'R3-E4': { title:'Étude de Fonction',        badge:'Révision 3 · Ex.4', C:<R3E4/> },
  'R4-E1': { title:'Corrigé Révision 4 - Exercice 1', badge:'Révision 4 · Ex.1', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R4-E2': { title:'Corrigé Révision 4 - Exercice 2', badge:'Révision 4 · Ex.2', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R4-E3': { title:'Corrigé Révision 4 - Exercice 3', badge:'Révision 4 · Ex.3', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R4-E4': { title:'Corrigé Révision 4 - Exercice 4', badge:'Révision 4 · Ex.4', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R5-E1': { title:'Corrigé Révision 5 - Exercice 1', badge:'Révision 5 · Ex.1', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R5-E2': { title:'Corrigé Révision 5 - Exercice 2', badge:'Révision 5 · Ex.2', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R5-E3': { title:'Corrigé Révision 5 - Exercice 3', badge:'Révision 5 · Ex.3', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R5-E4': { title:'Corrigé Révision 5 - Exercice 4', badge:'Révision 5 · Ex.4', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R6-E1': { title:'Corrigé Révision 6 - Exercice 1', badge:'Révision 6 · Ex.1', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R6-E2': { title:'Corrigé Révision 6 - Exercice 2', badge:'Révision 6 · Ex.2', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R6-E3': { title:'Corrigé Révision 6 - Exercice 3', badge:'Révision 6 · Ex.3', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R6-E4': { title:'Corrigé Révision 6 - Exercice 4', badge:'Révision 6 · Ex.4', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R7-E1': { title:'Corrigé Révision 7 - Exercice 1', badge:'Révision 7 · Ex.1', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R7-E2': { title:'Corrigé Révision 7 - Exercice 2', badge:'Révision 7 · Ex.2', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R7-E3': { title:'Corrigé Révision 7 - Exercice 3', badge:'Révision 7 · Ex.3', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R7-E4': { title:'Corrigé Révision 7 - Exercice 4', badge:'Révision 7 · Ex.4', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R8-E1': { title:'Corrigé Révision 8 - Exercice 1', badge:'Révision 8 · Ex.1', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R8-E2': { title:'Corrigé Révision 8 - Exercice 2', badge:'Révision 8 · Ex.2', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R8-E3': { title:'Corrigé Révision 8 - Exercice 3', badge:'Révision 8 · Ex.3', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R8-E4': { title:'Corrigé Révision 8 - Exercice 4', badge:'Révision 8 · Ex.4', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R9-E1': { title:'Corrigé Révision 9 - Exercice 1', badge:'Révision 9 · Ex.1', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R9-E2': { title:'Corrigé Révision 9 - Exercice 2', badge:'Révision 9 · Ex.2', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R9-E3': { title:'Corrigé Révision 9 - Exercice 3', badge:'Révision 9 · Ex.3', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R9-E4': { title:'Corrigé Révision 9 - Exercice 4', badge:'Révision 9 · Ex.4', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R10-E1': { title:'Corrigé Révision 10 - Exercice 1', badge:'Révision 10 · Ex.1', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R10-E2': { title:'Corrigé Révision 10 - Exercice 2', badge:'Révision 10 · Ex.2', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R10-E3': { title:'Corrigé Révision 10 - Exercice 3', badge:'Révision 10 · Ex.3', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R10-E4': { title:'Corrigé Révision 10 - Exercice 4', badge:'Révision 10 · Ex.4', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R11-E1': { title:'Corrigé Révision 11 - Exercice 1', badge:'Révision 11 · Ex.1', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R11-E2': { title:'Corrigé Révision 11 - Exercice 2', badge:'Révision 11 · Ex.2', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R11-E3': { title:'Corrigé Révision 11 - Exercice 3', badge:'Révision 11 · Ex.3', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R11-E4': { title:'Corrigé Révision 11 - Exercice 4', badge:'Révision 11 · Ex.4', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R12-E1': { title:'Corrigé Révision 12 - Exercice 1', badge:'Révision 12 · Ex.1', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R12-E2': { title:'Corrigé Révision 12 - Exercice 2', badge:'Révision 12 · Ex.2', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R12-E3': { title:'Corrigé Révision 12 - Exercice 3', badge:'Révision 12 · Ex.3', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'R12-E4': { title:'Corrigé Révision 12 - Exercice 4', badge:'Révision 12 · Ex.4', C:<><div className="info-box"><span className="info-label">📄 Corrigé PDF disponible :</span> Téléchargez le PDF via le bouton ci-dessus.</div></> },
  'TEST1-E1': { title:'Fonctions Exponentielles', badge:'Test 1 · Ex.1', C:<TEST1E1/> },
  'TEST1-E2': { title:'Théorie des Graphes et Matrices', badge:'Test 1 · Ex.2', C:<TEST1E2/> },
  'TEST1-E3': { title:'Probabilités et Variables Aléatoires', badge:'Test 1 · Ex.3', C:<TEST1E3/> },
  'TEST1-E4': { title:'Statistiques', badge:'Test 1 · Ex.4', C:<TEST1E4/> },
  'TEST1-E5': { title:'Suites Numériques', badge:'Test 1 · Ex.5', C:<TEST1E5/> },
  'TEST2-E1': { title:'Fonctions Logarithmes', badge:'Test 2 · Ex.1', C:<TEST2E1/> },
  'TEST2-E2': { title:'Analyse et Lecture graphique', badge:'Test 2 · Ex.2', C:<TEST2E2/> },
  'TEST2-E3': { title:'Matrices et Systèmes', badge:'Test 2 · Ex.3', C:<TEST2E3/> },
  'TEST2-E4': { title:'Suites numériques', badge:'Test 2 · Ex.4', C:<TEST2E4/> },
  'TEST2-E5': { title:'Graphes Probabilistes', badge:'Test 2 · Ex.5', C:<TEST2E5/> },
  'TEST3-E1': { title:'Évaluation QCM - Ex.1', badge:'Test 3 · Ex.1', C:<TEST3E1/> },
  'TEST3-E2': { title:'Évaluation QCM - Ex.2', badge:'Test 3 · Ex.2', C:<TEST3E2/> },
  'TEST3-E3': { title:'Évaluation QCM - Ex.3', badge:'Test 3 · Ex.3', C:<TEST3E3/> },
  'TEST3-E4': { title:'Évaluation QCM - Ex.4', badge:'Test 3 · Ex.4', C:<TEST3E4/> },
  'TEST3-E5': { title:'Évaluation QCM - Ex.5', badge:'Test 3 · Ex.5', C:<TEST3E5/> },
  'TEST4-E1': { title:'Évaluation QCM - Ex.1', badge:'Test 4 · Ex.1', C:<TEST4E1/> },
  'TEST4-E2': { title:'Évaluation QCM - Ex.2', badge:'Test 4 · Ex.2', C:<TEST4E2/> },
  'TEST4-E3': { title:'Évaluation QCM - Ex.3', badge:'Test 4 · Ex.3', C:<TEST4E3/> },
  'TEST4-E4': { title:'Évaluation QCM - Ex.4', badge:'Test 4 · Ex.4', C:<TEST4E4/> },
  'TEST4-E5': { title:'Évaluation QCM - Ex.5', badge:'Test 4 · Ex.5', C:<TEST4E5/> },
  'TEST5-E1': { title:'Évaluation QCM - Ex.1', badge:'Test 5 · Ex.1', C:<TEST5E1/> },
  'TEST5-E2': { title:'Évaluation QCM - Ex.2', badge:'Test 5 · Ex.2', C:<TEST5E2/> },
  'TEST5-E3': { title:'Évaluation QCM - Ex.3', badge:'Test 5 · Ex.3', C:<TEST5E3/> },
  'TEST5-E4': { title:'Évaluation QCM - Ex.4', badge:'Test 5 · Ex.4', C:<TEST5E4/> },
  'TEST5-E5': { title:'Évaluation QCM - Ex.5', badge:'Test 5 · Ex.5', C:<TEST5E5/> }
}

export default function App() {
  console.log("App component rendering");
  const [exoId, setExoId] = useState('')
  const [input, setInput] = useState('')
  const [correction, setCorrection] = useState(null)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('exo')
    if (id) { const u = id.toUpperCase(); setExoId(u); setInput(u); load(u) }
  }, [])

  const load = (id) => { setSearched(true); setCorrection(DB[id] || null) }
  const nav = (k) => { setInput(k); setExoId(k); load(k); const u = new URL(window.location); u.searchParams.set('exo', k); window.history.pushState({}, '', u) }
  const submit = (e) => { e.preventDefault(); const id = input.trim().toUpperCase(); nav(id) }
  // Pour les sujets et les Tests, on veut télécharger le PDF du sujet complet (ex: T1 ou TEST1)
  const simplePdfName = (id) => id.split('-')[0]
  // Belfallagui: belfallagui_T1.pdf ou belfallagui_TEST1.pdf
  const belPdfName = (id) => `belfallagui_${id.split('-')[0]}`

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
            <input className="search-input" type="text" placeholder="Code exercice (ex: T1-E1)" value={input} onChange={e => setInput(e.target.value)} />
            <button className="search-button" type="submit">Rechercher</button>
          </form>
        </section>

        {searched && correction && (
          <article className="correction-card">
            <div className="card-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="exo-badge">{correction.badge}</span>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <a 
                    href={`${import.meta.env.BASE_URL}assets/${belPdfName(exoId)}.pdf`} 
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
                  <a 
                    href={`${import.meta.env.BASE_URL}assets/${simplePdfName(exoId)}.pdf`} 
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
              <h2 className="card-title">{correction.title}</h2>
            </div>
            <div className="card-body">{correction.C}</div>
          </article>
        )}
        {searched && !correction && (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h2>Corrigé introuvable</h2>
            <p>Le code « {exoId} » n'existe pas encore.</p>
          </div>
        )}
      </main>
      <footer className="footer"><p>© 2026 Soltani Books – Tous droits réservés.</p></footer>
    </div>
  )
}
