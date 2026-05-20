const fs = require('fs');
const formulasFile = 'e:/livre/info/site_web/src/formulas.json';
let formulas = JSON.parse(fs.readFileSync(formulasFile, 'utf8'));

// Delete old keys to avoid cluttering if we are renaming them
const keysToDelete = [
  "R2E1_det", "R2E1_prod", "R2E1_inv", "R2E1_sys",
  "R2E2_V", "R2E2_Vn", "R2E2_Un", "R2E2_lim",
  "R2E3_r", "R2E3_ab", "R2E3_D", "R2E3_est", "R2E3_prix",
  "R2E4_impaire", "R2E4_lim", "R2E4_deriv", "R2E4_deriv2", "R2E4_tang", "R2E4_aire"
];
keysToDelete.forEach(k => delete formulas[k]);

const newFormulas = {
  // R2E1 - Complexes
  "R2E1_1a": "(\\sqrt{3} - 3i)^2 = 3 - 6i\\sqrt{3} - 9 = -6 - 6i\\sqrt{3}",
  "R2E1_1b_eq": "z^2 - (\\sqrt{3} + i)z + 2 + 2i\\sqrt{3} = 0",
  "R2E1_1b_delta": "\\Delta = (\\sqrt{3}+i)^2 - 4(2+2i\\sqrt{3}) = 2 + 2i\\sqrt{3} - 8 - 8i\\sqrt{3} = -6 - 6i\\sqrt{3}",
  "R2E1_1b_rac": "\\Delta = (\\sqrt{3}-3i)^2 \\implies \\delta = \\sqrt{3}-3i",
  "R2E1_1b_z1": "z_1 = \\frac{\\sqrt{3}+i - (\\sqrt{3}-3i)}{2} = 2i = z_A",
  "R2E1_1b_z2": "z_2 = \\frac{\\sqrt{3}+i + \\sqrt{3}-3i}{2} = \\sqrt{3}-i = z_B",
  "R2E1_2a_A": "OA = |z_A| = |2i| = 2 \\implies A \\in \\Gamma(O, 2)",
  "R2E1_2a_B": "OB = |z_B| = |\\sqrt{3}-i| = \\sqrt{3+1} = 2 \\implies B \\in \\Gamma(O, 2)",
  "R2E1_2c": "\\overrightarrow{AC} = \\overrightarrow{OB} \\iff z_C = z_B + z_A = \\sqrt{3} + i",
  "R2E1_2d": "OC = |z_C| = |\\sqrt{3}+i| = 2 \\implies C \\in \\Gamma(O, 2)",
  "R2E1_2e": "\\overrightarrow{AC} = \\overrightarrow{OB} \\implies OACB \\text{ est un parallélogramme.}",
  "R2E1_2e_suite": "OA = OB = 2 \\implies OACB \\text{ est un losange (côtés consécutifs égaux).}",

  // R2E2 - Arithmétique
  "R2E2_partieA_1": "11(6) - 13(5) = 66 - 65 = 1",
  "R2E2_partieA_2": "11(x-6) = 13(y-5) \\implies S_{\\mathbb{Z}^2} = \\{(13k + 6, 11k + 5) \\mid k \\in \\mathbb{Z}\\}",
  "R2E2_partieB_1a": "N \\equiv 2 \\pmod{11} \\implies N = 11u + 2, \\quad N \\equiv 11 \\pmod{13} \\implies N = 13v + 11",
  "R2E2_partieB_1b": "11u + 2 = 13v + 11 \\iff 11u - 13v = 9",
  "R2E2_partieB_2a": "11(6) - 13(5) = 1 \\implies 11(54) - 13(45) = 9 \\implies (u_0, v_0) = (54, 45)",
  "R2E2_partieB_2b": "u = 54 + 13k \\implies N = 11(54 + 13k) + 2 = 596 + 143k \\equiv 24 \\pmod{143}",
  "R2E2_partieB_3": "2020 \\leq 143k + 24 \\leq 2030 \\implies k = 14 \\implies N = 2026",

  // R2E3 - Statistiques
  "R2E3_moy_x": "\\bar{x} = \\frac{1+2+3+4+5+6+7}{7} = 4",
  "R2E3_moy_y": "\\bar{y} = \\frac{12{,}4 + 15{,}8 + 21{,}3 + 28{,}6 + 34{,}2 + 41{,}5 + 49{,}7}{7} \\approx 29{,}07",
  "R2E3_mayer_G1": "G_1(2~;~16{,}5)",
  "R2E3_mayer_G2": "G_2(6~;~41{,}8)",
  "R2E3_mayer_coef": "a = \\frac{41{,}8 - 16{,}5}{6 - 2} = 6{,}325 \\implies y = 6{,}325x + 3{,}85",
  "R2E3_mayer_err": "y = 7{,}47x + 4{,}68",
  "R2E3_mayer_est": "x = 8 \\implies y = 7{,}47(8) + 4{,}68 = 64{,}44 \\text{ (soit } 64\\,440 \\text{ incidents)}",
  "R2E3_mc_somme_x2": "\\sum x_i^2 = 140",
  "R2E3_mc_somme_xy": "\\sum x_i y_i = 991{,}3",
  "R2E3_mc_var": "V(x) = 4",
  "R2E3_mc_cov": "\\text{Cov}(x,y) = 25{,}328",
  "R2E3_mc_droite": "a = \\frac{25{,}328}{4} = 6{,}332, \\quad b = 29{,}071 - 6{,}332(4) = 3{,}743 \\implies y = 6{,}33x + 3{,}74",
  "R2E3_mc_corr": "r \\approx 0{,}989",
  "R2E3_mc_est_2025": "x = 8 \\implies y = 6{,}33(8) + 3{,}74 = 54{,}38 \\text{ (soit } 54\\,380 \\text{ incidents)}",
  "R2E3_mc_est_2026": "x = 9 \\implies y = 6{,}332(9) + 3{,}743 = 60{,}731 \\text{ (soit } 60\\,731 \\text{ incidents)}",
  "R2E3_cout_total": "60\\,731 \\times 8\\,500 = 516\\,213\\,500 \\text{ DT}",

  // R2E4 - Analyse
  "R2E4_g_x": "g(x) = 1 + \\frac{1}{x} - \\ln x",
  "R2E4_g_lim0": "\\lim_{x \\to 0^+} g(x) = +\\infty",
  "R2E4_g_liminf": "\\lim_{x \\to +\\infty} g(x) = -\\infty",
  "R2E4_g_deriv": "g'(x) = -\\frac{1}{x^2} - \\frac{1}{x} = -\\frac{1 + x}{x^2}",
  "R2E4_g_zero": "g(\\alpha) = 0 \\quad \\text{avec} \\quad \\alpha \\approx 3{,}59",
  "R2E4_g_signe": "x \\in ]0, \\alpha[ \\implies g(x) > 0, \\quad x \\in ]\\alpha, +\\infty[ \\implies g(x) < 0",
  "R2E4_f_x": "f(x) = (x + \\ln x)e^{-x}",
  "R2E4_f_lim0": "\\lim_{x \\to 0^+} f(x) = -\\infty \\implies \\text{Asymptote verticale } x=0",
  "R2E4_f_liminf": "\\lim_{x \\to +\\infty} f(x) = 0 \\implies \\text{Asymptote horizontale } y=0",
  "R2E4_f_deriv": "f'(x) = e^{-x}(g(x) - x)",
  "R2E4_f_alpha_sign": "f(\\alpha) \\geq f(1) = \\frac{1}{e} > 0",
  "R2E4_f_beta": "f(x) = 0 \\iff x + \\ln x = 0 \\implies \\text{Solution unique } \\beta \\approx 0{,}56",
  "R2E4_f_beta_prop": "\\ln\\beta = -\\beta \\implies f'(\\beta) = e^{-\\beta}(1 + \\frac{1}{\\beta})"
};

Object.assign(formulas, newFormulas);
fs.writeFileSync(formulasFile, JSON.stringify(formulas, null, 2));
console.log('formulas.json updated with Computer Science R2 formulas');
