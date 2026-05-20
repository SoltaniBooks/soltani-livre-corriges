const fs = require('fs');
const formulasFile = 'e:/livre/info/site_web/src/formulas.json';
let formulas = JSON.parse(fs.readFileSync(formulasFile, 'utf8'));

const newFormulas = {
    // R3E1 - Matrices
    "R3E1_det": "\\det(A) = 1(1-2) - 0 + 1(6-23) = -1 - 17 = -18",
    "R3E1_prod": "A \\times B = \\begin{pmatrix}-18&0&0\\\\0&-18&0\\\\0&0&-18\\end{pmatrix} = -18I_3",
    "R3E1_inv": "A^{-1} = -\\frac{1}{18}B",
    "R3E1_sys": "X = A^{-1}V = -\\frac{1}{18}\\begin{pmatrix}-1&2&-1\\\\20&-22&2\\\\-17&-2&1\\end{pmatrix}\\begin{pmatrix}3\\\\23\\\\115\\end{pmatrix} = \\begin{pmatrix}4\\\\12\\\\-1\\end{pmatrix}",

    // R3E2 - Graphes
    "R3E2_sym": "M_{1,5} = 1 \\neq M_{5,1} = 0 \\implies G \\text{ est orienté}",
    "R3E2_deg": "d^+(A) = 1 \\neq d^-(A) = 3",
    "R3E2_m6": "M^6_{1,1} = 8",
    "R3E2_chem": "2 + 9 + 2 + 4 + 4 + 6 = 27",

    // R3E3 - Probabilités
    "R3E3_pd": "P(D) = P(S)P(D|S) + P(\\overline{S})P(D|\\overline{S}) = 0{,}25 \\times 0{,}10 + 0{,}75 \\times 0{,}05 = 0{,}0625",
    "R3E3_psd": "P(S|D) = \\frac{P(S \\cap D)}{P(D)} = \\frac{0{,}025}{0{,}0625} = 0{,}4",
    "R3E3_p3": "P = 1 - (1 - P(D))^3 = 1 - 0{,}9375^3 \\approx 0{,}176",

    // R3E4 - Analyse
    "R3E4_lim1": "\\lim_{x \\to 0^+} \\frac{\\ln x}{x} = -\\infty, \\quad \\lim_{x \\to +\\infty} \\frac{\\ln x}{x} = 0",
    "R3E4_deriv": "f'(x) = \\frac{1 - \\ln x}{x^2}",
    "R3E4_signe": "1 - \\ln x > 0 \\iff x < e",
    "R3E4_prim": "g'(x) = \\frac{1}{2} \\times 2 \\times \\frac{1}{x} \\ln x = \\frac{\\ln x}{x} = f(x)",
    "R3E4_aire": "S = \\int_1^e f(x) dx = \\left[ \\frac{1}{2}(\\ln x)^2 \\right]_1^e = \\frac{1}{2}"
};

Object.assign(formulas, newFormulas);
fs.writeFileSync(formulasFile, JSON.stringify(formulas, null, 2));

const appFile = 'e:/livre/info/site_web/src/App.jsx';
let app = fs.readFileSync(appFile, 'utf8');

const newComponents = `
// ── R3-E1 ─────────────────────────────────────────────────────────────────────
function R3E1() {
  return (<>
    <Step index={0} title="Calcul du déterminant">
      <IB label="Calcul">
        <BM t={T.R3E1_det} />
      </IB>
      <RB>$\\det(A) = -18 \\neq 0$, la matrice est inversible.</RB>
    </Step>
    <Step index={1} title="Produit matriciel et Inversion">
      <IB label="Produit A x B">
        <BM t={T.R3E1_prod} />
      </IB>
      <IB label="Déduction">
        <BM t={T.R3E1_inv} />
      </IB>
    </Step>
    <Step index={2} title="Résolution du système">
      <IB label="Calcul matriciel">
        <BM t={T.R3E1_sys} />
      </IB>
      <RB>La solution est le triplet $(4, 12, -1)$.</RB>
    </Step>
  </>)
}

// ── R3-E2 ─────────────────────────────────────────────────────────────────────
function R3E2() {
  return (<>
    <Step index={0} title="Analyse de la matrice">
      <IB label="Symétrie"><BM t={T.R3E2_sym} /></IB>
      <RB>Le graphe $G$ est orienté.</RB>
    </Step>
    <Step index={1} title="Graphe Eulérien">
      <IB label="Degrés du sommet A"><BM t={T.R3E2_deg} /></IB>
      <RB>Il n'existe ni cycle eulérien, ni chaîne eulérienne.</RB>
    </Step>
    <Step index={2} title="Chemins et circuit court">
      <IB label="Chemins de longueur 6"><BM t={T.R3E2_m6} /></IB>
      <IB label="Durée minimale"><BM t={T.R3E2_chem} /></IB>
      <RB>La durée minimale est de 27 minutes.</RB>
    </Step>
  </>)
}

// ── R3-E3 ─────────────────────────────────────────────────────────────────────
function R3E3() {
  return (<>
    <Step index={0} title="Probabilité totale">
      <IB label="P(D)"><BM t={T.R3E3_pd} /></IB>
    </Step>
    <Step index={1} title="Probabilité conditionnelle">
      <IB label="Bayes"><BM t={T.R3E3_psd} /></IB>
    </Step>
    <Step index={2} title="Événement contraire">
      <IB label="Au moins 1 défectueux"><BM t={T.R3E3_p3} /></IB>
    </Step>
  </>)
}

// ── R3-E4 ─────────────────────────────────────────────────────────────────────
function R3E4() {
  return (<>
    <Step index={0} title="Limites et Asymptotes">
      <IB label="Calcul"><BM t={T.R3E4_lim1} /></IB>
      <RB>Asymptote verticale en $x=0$, et horizontale en $y=0$.</RB>
    </Step>
    <Step index={1} title="Dérivée et Variations">
      <IB label="f'(x)"><BM t={T.R3E4_deriv} /></IB>
      <IB label="Signe"><BM t={T.R3E4_signe} /></IB>
      <RB>$f$ est croissante sur $]0, e]$ et décroissante sur $[e, +\\infty[$.</RB>
    </Step>
    <Step index={2} title="Primitive et Aire">
      <IB label="Primitive"><BM t={T.R3E4_prim} /></IB>
      <IB label="Intégrale sur [1, e]"><BM t={T.R3E4_aire} /></IB>
    </Step>
  </>)
}
`;

// Replace T3
app = app.replace(/\/\/ ── T3-E1 ──[\s\S]*?\/\/ ── T4-E1 ──/, newComponents + '\n// ── T4-E1 ──');

// Update mapping
let mappingReplace = app.indexOf('const CORRECTIONS = {');
let mappingEnd = app.indexOf('}', mappingReplace);
let mappingText = app.substring(mappingReplace, mappingEnd + 1);

let newMappingText = mappingText.replace(
  /'T3-E1'.*?\n.*?'T3-E4'.*?\n/gs,
  `'R3-E1': { C: <R3E1 />, title: "Sujet de Révision 3 - Ex 1 : Matrices", badge: "S3-E1" },
  'R3-E2': { C: <R3E2 />, title: "Sujet de Révision 3 - Ex 2 : Graphes", badge: "S3-E2" },
  'R3-E3': { C: <R3E3 />, title: "Sujet de Révision 3 - Ex 3 : Probabilités", badge: "S3-E3" },
  'R3-E4': { C: <R3E4 />, title: "Sujet de Révision 3 - Ex 4 : Analyse", badge: "S3-E4" },\n  `
);

app = app.replace(mappingText, newMappingText);
fs.writeFileSync(appFile, app);
console.log('App.jsx updated with R3E1 to R3E4');
