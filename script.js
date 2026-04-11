const catalog = {
  Audi: {
    "A3 8V": [
      { engine: "1.6 TDI 110hp", stockHp: 110, stage1Hp: 140, stage2Hp: 150, stockNm: 250, stage1Nm: 320, stage2Nm: 340 },
      { engine: "2.0 TDI 150hp", stockHp: 150, stage1Hp: 190, stage2Hp: 210, stockNm: 340, stage1Nm: 400, stage2Nm: 430 }
    ]
  },
  BMW: {
    "118d F20": [
      { engine: "2.0 Diesel 150hp", stockHp: 150, stage1Hp: 190, stage2Hp: 205, stockNm: 320, stage1Nm: 400, stage2Nm: 430 }
    ],
    "435i F32": [
      { engine: "3.0 N55 306hp", stockHp: 306, stage1Hp: 370, stage2Hp: 430, stockNm: 400, stage1Nm: 520, stage2Nm: 600 }
    ]
  },
  Mercedes: {
    "A200": [
      { engine: "1.3 Turbo 163hp", stockHp: 163, stage1Hp: 195, stage2Hp: 215, stockNm: 250, stage1Nm: 320, stage2Nm: 350 }
    ]
  },
  Porsche: {
    "Macan": [
      { engine: "2.0 Turbo 265hp", stockHp: 265, stage1Hp: 315, stage2Hp: 340, stockNm: 400, stage1Nm: 470, stage2Nm: 500 }
    ]
  },
  Volkswagen: {
    "Golf 7 GTI": [
      { engine: "2.0 TSI 220hp", stockHp: 220, stage1Hp: 300, stage2Hp: 340, stockNm: 350, stage1Nm: 430, stage2Nm: 480 }
    ]
  }
};

const brandEl = document.getElementById("brand");
const modelEl = document.getElementById("model");
const engineEl = document.getElementById("engine");

function fillBrands() {
  const brands = Object.keys(catalog).sort((a,b)=>a.localeCompare(b));
  brandEl.innerHTML = brands.map(b => `<option value="${b}">${b}</option>`).join("");
  fillModels();
}

function fillModels() {
  const models = Object.keys(catalog[brandEl.value] || {});
  modelEl.innerHTML = models.map(m => `<option value="${m}">${m}</option>`).join("");
  fillEngines();
}

function fillEngines() {
  const engines = (catalog[brandEl.value] || {})[modelEl.value] || [];
  engineEl.innerHTML = engines.map((e, i) => `<option value="${i}">${e.engine}</option>`).join("");
  updateSummary();
}

function updateSummary() {
  const engines = (catalog[brandEl.value] || {})[modelEl.value] || [];
  const selected = engines[Number(engineEl.value)] || engines[0];
  if (!selected) return;

  document.getElementById("stockHp").textContent = `${selected.stockHp} HP`;
  document.getElementById("stockNm").textContent = `${selected.stockNm} Nm`;
  document.getElementById("stage1Hp").textContent = `${selected.stage1Hp} HP`;
  document.getElementById("stage1Nm").textContent = `${selected.stage1Nm} Nm`;
  document.getElementById("stage2Hp").textContent = `${selected.stage2Hp} HP`;
  document.getElementById("stage2Nm").textContent = `${selected.stage2Nm} Nm`;

  document.getElementById("summaryTitle").textContent = `${brandEl.value} ${modelEl.value}`;
  document.getElementById("summaryEngine").textContent = selected.engine;
  document.getElementById("lineStock").textContent = `Stock: ${selected.stockHp} HP / ${selected.stockNm} Nm`;
  document.getElementById("lineStage1").textContent = `Stage 1: ${selected.stage1Hp} HP / ${selected.stage1Nm} Nm`;
  document.getElementById("lineStage2").textContent = `Stage 2: ${selected.stage2Hp} HP / ${selected.stage2Nm} Nm`;
}

brandEl.addEventListener("change", fillModels);
modelEl.addEventListener("change", fillEngines);
engineEl.addEventListener("change", updateSummary);

fillBrands();
