const fs = require('fs');
const appFile = 'e:/livre/info/site_web/src/App.jsx';
let app = fs.readFileSync(appFile, 'utf8');

const newComponents = `
// ── R1-E1 ─────────────────────────────────────────────────────────────────────
function R1E1() {
  return (<>
    <Step index={0} title="Vérification de la solution">
      <BM t={T.R1E1_E} />
      <IB label="Calcul avec (-2i)">
        <BM t={T.R1E1_verif1} />
        <BM t={T.R1E1_verif2} />
        <BM t={T.R1E1_verif3} />
      </IB>
      <RB>(-2i) est bien solution de l'équation (E).</RB>
    </Step>
    <Step index={1} title="Détermination de a, b et c">
      <IB label="Développement">
        <BM t={T.R1E1_dev} />
      </IB>
      <IB label="Identification">
        <BM t={T.R1E1_sys} />
      </IB>
      <RB>On obtient : <BM t={T.R1E1_abc} /></RB>
    </Step>
    <Step index={2} title="Résolution de l'équation">
      <IB label="Équation du second degré">
        <BM t={T.R1E1_E2} />
      </IB>
      <IB label="Calcul du discriminant">
        <BM t={T.R1E1_delta} />
        <BM t={T.R1E1_rac} />
      </IB>
      <IB label="Solutions">
        <BM t={T.R1E1_z1} />
        <BM t={T.R1E1_z2} />
      </IB>
      <RB>Ensemble des solutions : <BM t={T.R1E1_sol} /></RB>
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
      <IB label="Limite en 0^+"><BM t={T.R1E4_lim0} /> $\\implies$ Asymptote verticale d'équation $x=0$.</IB>
      <IB label="Limite en +\\infty"><BM t={T.R1E4_liminf} /></IB>
      <IB label="Branche infinie"><BM t={T.R1E4_limdiv} /> $\\implies$ Branche parabolique de direction $(Oy)$.</IB>
    </Step>
    <Step index={1} title="Dérivée et Variations">
      <IB label="Calcul de f'(x)"><BM t={T.R1E4_fp} /></IB>
      <IB label="Signe"><BM t={T.R1E4_sign} /></IB>
      <RB>$f$ est croissante sur $]0, 1]$ et décroissante sur $[1, +\\infty[$, avec un maximum en $x=1$ valant $0$.</RB>
    </Step>
    <Step index={2} title="Aire sous la courbe">
      <IB label="Intégration par parties">
        <BM t={T.R1E4_ipp1} />
        <BM t={T.R1E4_ipp2} />
        <BM t={T.R1E4_ipp3} />
      </IB>
      <RB>L'aire est l'opposée de l'intégrale (car $f(x) \\le 0$ sur $[1, e]$) : $\\mathscr{A} = \\frac{2e^3-8}{9}$ u.a.</RB>
    </Step>
  </>)
}
`;

// Remove old T1E1 through T1E4 functions
app = app.replace(/\/\/ ── T1-E1 ──[\s\S]*?\/\/ ── T2-E1 ──/, newComponents + '\n// ── T2-E1 ──');

// Update CORRECTIONS mapping
let mappingReplace = app.indexOf('const CORRECTIONS = {');
let mappingEnd = app.indexOf('}', mappingReplace);
let mappingText = app.substring(mappingReplace, mappingEnd + 1);

let newMappingText = mappingText.replace(
  /'T1-E1'.*?\n.*?'T1-E4'.*?\n/gs,
  `'R1-E1': { C: <R1E1 />, title: "Sujet de Révision 1 - Ex 1 : Nombres Complexes", badge: "S1-E1" },
  'R1-E2': { C: <R1E2 />, title: "Sujet de Révision 1 - Ex 2 : Arithmétique", badge: "S1-E2" },
  'R1-E3': { C: <R1E3 />, title: "Sujet de Révision 1 - Ex 3 : Statistiques", badge: "S1-E3" },
  'R1-E4': { C: <R1E4 />, title: "Sujet de Révision 1 - Ex 4 : Étude de Fonction", badge: "S1-E4" },\n  `
);

app = app.replace(mappingText, newMappingText);

fs.writeFileSync(appFile, app);
console.log('App.jsx updated with R1E1 to R1E4');
