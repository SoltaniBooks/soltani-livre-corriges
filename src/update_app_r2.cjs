const fs = require('fs');
const appFile = 'e:/livre/info/site_web/src/App.jsx';
let app = fs.readFileSync(appFile, 'utf8');

const newComponents = `
// ── R2-E1 ─────────────────────────────────────────────────────────────────────
function R2E1() {
  return (<>
    <Step index={0} title="Calcul du déterminant">
      <IB label="Calcul">
        <BM t={T.R2E1_det} />
      </IB>
      <RB>$\\det(A) = -2 \\neq 0$, donc $A$ est inversible pour $\\alpha=2$.</RB>
    </Step>
    <Step index={1} title="Matrice inverse">
      <IB label="Produit A x B">
        <BM t={T.R2E1_prod} />
      </IB>
      <IB label="Déduction">
        <BM t={T.R2E1_inv} />
      </IB>
    </Step>
    <Step index={2} title="Résolution du système">
      <IB label="Calcul vectoriel">
        <BM t={T.R2E1_sys} />
      </IB>
      <RB>Il y a 30 couples, 25 femmes seules et 15 enfants.</RB>
    </Step>
  </>)
}

// ── R2-E2 ─────────────────────────────────────────────────────────────────────
function R2E2() {
  return (<>
    <Step index={0} title="Relation de récurrence">
      <IB label="Simplification"><BM t={T.R2E2_V} /></IB>
      <RB>On en déduit que $V_{n+1} - V_n = -n$.</RB>
    </Step>
    <Step index={1} title="Expression de Vn">
      <IB label="Télescopage"><BM t={T.R2E2_Vn} /></IB>
    </Step>
    <Step index={2} title="Expression et limite de Un">
      <IB label="Expression"><BM t={T.R2E2_Un} /></IB>
      <IB label="Limite"><BM t={T.R2E2_lim} /></IB>
    </Step>
  </>)
}

// ── R2-E3 ─────────────────────────────────────────────────────────────────────
function R2E3() {
  return (<>
    <Step index={0} title="Corrélation">
      <IB label="Calcul"><BM t={T.R2E3_r} /></IB>
      <RB>Un ajustement affine est justifié car $r$ est proche de $1$.</RB>
    </Step>
    <Step index={1} title="Droite de régression">
      <IB label="Coefficients"><BM t={T.R2E3_ab} /></IB>
      <IB label="Équation"><BM t={T.R2E3_D} /></IB>
    </Step>
    <Step index={2} title="Estimation">
      <IB label="Poids à x=30"><BM t={T.R2E3_est} /></IB>
      <IB label="Calcul du prix"><BM t={T.R2E3_prix} /></IB>
      <RB>Le prix du kilogramme de viande de mouton est d'environ 44,9 DT.</RB>
    </Step>
  </>)
}

// ── R2-E4 ─────────────────────────────────────────────────────────────────────
function R2E4() {
  return (<>
    <Step index={0} title="Parité">
      <IB label="Calcul"><BM t={T.R2E4_impaire} /></IB>
      <RB>$f$ est impaire, l'origine est centre de symétrie.</RB>
    </Step>
    <Step index={1} title="Limites et Asymptotes">
      <IB label="En +\\infty"><BM t={T.R2E4_lim} /></IB>
      <RB>La courbe admet une branche parabolique de direction $(Oy)$.</RB>
    </Step>
    <Step index={2} title="Dérivées">
      <IB label="Dérivée 1"><BM t={T.R2E4_deriv} /></IB>
      <IB label="Dérivée 2"><BM t={T.R2E4_deriv2} /></IB>
      <RB>$O(0,0)$ est un point d'inflexion. Tangente <IM t="(T): y = 3x" />.</RB>
    </Step>
    <Step index={3} title="Aire sous la courbe">
      <IB label="Intégrale sur [-1, 1]"><BM t={T.R2E4_aire} /></IB>
    </Step>
  </>)
}
`;

// Remove old T2E1 through T2E4 functions
app = app.replace(/\/\/ ── T2-E1 ──[\s\S]*?\/\/ ── T3-E1 ──/, newComponents + '\n// ── T3-E1 ──');

// Update CORRECTIONS mapping
let mappingReplace = app.indexOf('const CORRECTIONS = {');
let mappingEnd = app.indexOf('}', mappingReplace);
let mappingText = app.substring(mappingReplace, mappingEnd + 1);

let newMappingText = mappingText.replace(
  /'T2-E1'.*?\n.*?'T2-E4'.*?\n/gs,
  `'R2-E1': { C: <R2E1 />, title: "Sujet de Révision 2 - Ex 1 : Matrices", badge: "S2-E1" },
  'R2-E2': { C: <R2E2 />, title: "Sujet de Révision 2 - Ex 2 : Suites", badge: "S2-E2" },
  'R2-E3': { C: <R2E3 />, title: "Sujet de Révision 2 - Ex 3 : Statistiques", badge: "S2-E3" },
  'R2-E4': { C: <R2E4 />, title: "Sujet de Révision 2 - Ex 4 : Analyse", badge: "S2-E4" },\n  `
);

app = app.replace(mappingText, newMappingText);

fs.writeFileSync(appFile, app);
console.log('App.jsx updated with R2E1 to R2E4');
