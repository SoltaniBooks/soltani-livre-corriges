const fs = require('fs');
const formulasFile = 'e:/livre/info/site_web/src/formulas.json';
let formulas = JSON.parse(fs.readFileSync(formulasFile, 'utf8'));

const newFormulas = {
    // R2E1 - Matrices
    "R2E1_det": "\\det(A) = 1(2(0) - 1(-1)) - 1(2(0) - 1(1)) + 1(2(-1) - 2(1)) = 1 + 1 - 4 = -2",
    "R2E1_prod": "A \\times B = \\begin{pmatrix}1&1&1\\\\2&2&1\\\\1&-1&0\\end{pmatrix} \\begin{pmatrix}-1&1&1\\\\-1&1&-1\\\\4&-2&0\\end{pmatrix} = \\begin{pmatrix}2&0&0\\\\0&2&0\\\\0&0&2\\end{pmatrix} = 2I_3",
    "R2E1_inv": "A^{-1} = \\frac{1}{2}B = \\frac{1}{2}\\begin{pmatrix}-1&1&1\\\\-1&1&-1\\\\4&-2&0\\end{pmatrix}",
    "R2E1_sys": "X = A^{-1}V = \\frac{1}{2}B \\times \\begin{pmatrix}70\\\\125\\\\5\\end{pmatrix} = \\frac{1}{2}\\begin{pmatrix}-70+125+5\\\\-70+125-5\\\\280-250+0\\end{pmatrix} = \\frac{1}{2}\\begin{pmatrix}60\\\\50\\\\30\\end{pmatrix} = \\begin{pmatrix}30\\\\25\\\\15\\end{pmatrix}",

    // R2E2 - Suites
    "R2E2_V": "V_{n+1} = \\ln(e^{-n}U_n) = \\ln(e^{-n}) + \\ln(U_n) = -n + V_n",
    "R2E2_Vn": "V_n - V_0 = \\sum_{k=0}^{n-1} (-k) = -\\frac{n(n-1)}{2} \\implies V_n = -\\frac{n(n-1)}{2}",
    "R2E2_Un": "U_n = e^{V_n} = e^{-\\frac{n(n-1)}{2}}",
    "R2E2_lim": "\\lim_{n \\to +\\infty} -\\frac{n(n-1)}{2} = -\\infty \\implies \\lim_{n \\to +\\infty} U_n = 0",

    // R2E3 - Stats
    "R2E3_r": "r = \\frac{\\text{Cov}(X,Y)}{\\sigma_X \\sigma_Y} \\approx \\frac{2{,}3}{7{,}07 \\times 0{,}35} \\approx 0{,}92",
    "R2E3_ab": "a = \\frac{2{,}3}{50} = 0{,}046, \\quad b = 9{,}2 - 0{,}046 \\times 11 = 8{,}694",
    "R2E3_D": "(D) : y = 0{,}046x + 8{,}694",
    "R2E3_est": "x=30 \\implies y = 0{,}046(30) + 8{,}694 = 10{,}074",
    "R2E3_prix": "10{,}074 \\times P_{\\text{mouton}} + 28{,}926 \\times 25 = 1175{,}5 \\implies P_{\\text{mouton}} \\approx 44{,}9",

    // R2E4 - Analyse
    "R2E4_impaire": "f(-x) = e^{-x} - e^x - x = -(e^x - e^{-x} + x) = -f(x)",
    "R2E4_lim": "\\lim_{x \\to +\\infty} f(x) = +\\infty, \\quad \\lim_{x \\to +\\infty} \\frac{f(x)}{x} = +\\infty",
    "R2E4_deriv": "f'(x) = e^x + e^{-x} + 1 > 0",
    "R2E4_deriv2": "f''(x) = e^x - e^{-x}. \\text{ Change de signe en 0.}",
    "R2E4_tang": "(T): y = f'(0)x + f(0) = 3x",
    "R2E4_aire": "\\mathcal{A} = 2 \\int_0^1 (e^x - e^{-x})dx = 2 \\left[ e^x + e^{-x} \\right]_0^1 = \\frac{2(e-1)^2}{e}"
};

Object.assign(formulas, newFormulas);
fs.writeFileSync(formulasFile, JSON.stringify(formulas, null, 2));
console.log('formulas.json updated with R2');
