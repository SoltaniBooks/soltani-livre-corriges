const fs = require('fs');
const formulasFile = 'e:/livre/info/site_web/src/formulas.json';
let formulas = JSON.parse(fs.readFileSync(formulasFile, 'utf8'));

const newFormulas = {
    // R1E1 - Complexes
    "R1E1_E": "(E) : z^3 - (5+i)z^2 + 4(2-i)z - 12 + 4i = 0",
    "R1E1_verif1": "(-2i)^3 - (5+i)(-2i)^2 + 4(2-i)(-2i) - 12 + 4i",
    "R1E1_verif2": "= 8i - (5+i)(-4) - 8i(2-i) - 12 + 4i",
    "R1E1_verif3": "= 8i + 20 + 4i - 16i - 8 - 12 + 4i = 0",
    "R1E1_dev": "(z+2i)(az^2+bz+c) = az^3 + (b+2ia)z^2 + (c+2ib)z + 2ic",
    "R1E1_sys": "\\begin{cases} a = 1 \\\\ b + 2ia = -(5+i) \\\\ c + 2ib = 4(2-i) \\\\ 2ic = -12 + 4i \\end{cases}",
    "R1E1_abc": "\\begin{cases} a = 1 \\\\ b = -5 - 3i \\\\ c = 2 + 6i \\end{cases}",
    "R1E1_E2": "z^2 - (5+3i)z + 2 + 6i = 0",
    "R1E1_delta": "\\Delta = (-(5+3i))^2 - 4(1)(2+6i) = 25 + 30i - 9 - 8 - 24i = 8 + 6i",
    "R1E1_rac": "\\delta = 3+i \\quad (\\text{car } (3+i)^2 = 8+6i)",
    "R1E1_z1": "z_1 = \\frac{5+3i - (3+i)}{2} = 1+i",
    "R1E1_z2": "z_2 = \\frac{5+3i + (3+i)}{2} = 4+2i",
    "R1E1_sol": "S_\\mathbb{C} = \\{ -2i, \\; 1+i, \\; 4+2i \\}",
    
    // R1E2 - Arithmetique
    "R1E2_A1": "2^0 \\equiv 1, \\quad 2^1 \\equiv 2, \\quad 2^2 \\equiv 4, \\quad 2^3 \\equiv 8 \\equiv 1 \\pmod 7",
    "R1E2_A2": "2^{3k} = (2^3)^k \\equiv 1^k \\equiv 1 \\pmod 7",
    "R1E2_A3": "2025 = 7 \\times 289 + 2 \\implies 2025 \\equiv 2 \\pmod 7",
    "R1E2_A4": "2026 = 3 \\times 675 + 1 \\implies 2025^{2026} \\equiv 2^{3 \\times 675 + 1} \\equiv (2^3)^{675} \\times 2 \\equiv 2 \\pmod 7",
    "R1E2_B1": "3^3 = 27 = 28 - 1 \\equiv -1 \\pmod 7 \\implies 3^{6k} = (3^3)^{2k} \\equiv (-1)^{2k} \\equiv 1 \\pmod 7",
    "R1E2_B3": "2026 = 7 \\times 289 + 3 \\implies 2026 \\equiv 3 \\pmod 7",
    "R1E2_B4": "2025 = 6 \\times 337 + 3 \\implies 2026^{2025} \\equiv 3^{6 \\times 337 + 3} \\equiv (3^6)^{337} \\times 3^3 \\equiv 1 \\times 6 \\equiv 6 \\pmod 7",
    "R1E2_C1": "2025^{3n+1} \\equiv 2^{3n+1} = (2^3)^n \\times 2 \\equiv 1 \\times 2 \\equiv 2 \\pmod 7",
    "R1E2_C2": "2026^{6n+4} \\equiv 3^{6n+4} = (3^6)^n \\times 3^4 \\equiv 1 \\times 81 \\equiv 4 \\pmod 7",
    "R1E2_C3": "A_n \\equiv 2 + 4 + 1 \\equiv 7 \\equiv 0 \\pmod 7",

    // R1E3 - Stats
    "R1E3_r": "r \\approx 0{,}95",
    "R1E3_rZ": "r_Z \\approx 1{,}00",
    "R1E3_Z": "Z = 0{,}31x + 3{,}75",
    "R1E3_y": "y = e^{0{,}31x + 3{,}75} = e^{3{,}75} \\cdot e^{0{,}31x} \\approx 42{,}52 e^{0{,}31x}",
    "R1E3_2026": "y(10) \\approx 42{,}52 e^{3{,}1} \\approx 943 \\text{ M DT}",
    "R1E3_1000": "0{,}307x + 3{,}751 > \\ln(1000) \\implies x > 10{,}28",

    // R1E4 - Analyse
    "R1E4_f": "f(x) = (1-x^2)\\ln x",
    "R1E4_lim0": "\\lim_{x \\to 0^+} (1-x^2)\\ln x = (1) \\times (-\\infty) = -\\infty",
    "R1E4_liminf": "\\lim_{x \\to +\\infty} (1-x^2)\\ln x = (-\\infty) \\times (+\\infty) = -\\infty",
    "R1E4_limdiv": "\\frac{f(x)}{x} = \\left(\\frac{1}{x} - x\\right)\\ln x \\xrightarrow{+\\infty} (-\\infty)(+\\infty) = -\\infty",
    "R1E4_fp": "f'(x) = -2x\\ln x + \\frac{1-x^2}{x} = \\frac{1 - x^2 - 2x^2\\ln x}{x}",
    "R1E4_sign": "\\text{Sur } ]0,1[,\\; x^2-1 < 0 \\text{ et } \\ln x < 0. \\text{ Sur } ]1,+\\infty[,\\; x^2-1 > 0 \\text{ et } \\ln x > 0.",
    "R1E4_ipp1": "\\int_1^e (1-x^2)\\ln x \\,dx = \\left[ \\left(x - \\frac{x^3}{3}\\right)\\ln x \\right]_1^e - \\int_1^e \\left(1 - \\frac{x^2}{3}\\right) \\,dx",
    "R1E4_ipp2": "= \\left(e - \\frac{e^3}{3}\\right) - \\left[ x - \\frac{x^3}{9} \\right]_1^e = e - \\frac{e^3}{3} - \\left(e - \\frac{e^3}{9}\\right) + \\left(1 - \\frac{1}{9}\\right)",
    "R1E4_ipp3": "= -\\frac{2e^3}{9} + \\frac{8}{9}"
};

Object.assign(formulas, newFormulas);
fs.writeFileSync(formulasFile, JSON.stringify(formulas, null, 2));
console.log('formulas.json updated');
