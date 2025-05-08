const SoulCalculator = (function () {
  const EXP_TABLE = {
    legend: [
      0, 717, 789, 867, 1302, 1431, 1575, 1732, 1905, 3239, 3563, 3919, 4312,
      4742, 9484, 10433, 11476, 17214, 18935, 28403, 31243, 31868, 32505, 33155,
      33818, 34494,
    ],
    immortal: [
      0, 2151, 2367, 2601, 3906, 4293, 4725, 5196, 5715, 9717, 10689, 11757,
      12936, 14226, 28452, 31299, 34428, 51642, 56805, 85209, 93729, 95604,
      97515, 99465, 101454, 103482,
    ],
    dosak: [
      0, 717, 789, 867, 1302, 1431, 1575, 1732, 1905, 3239, 3563, 3919, 4312,
      4742, 9484, 10433, 11476, 17214, 18935, 28403, 31243, 31868, 32505, 33155,
      33818, 34494,
    ],
  };

  const SOUL_VALUE = {
    high: 1000,
    mid: 100,
    low: 10,
  };

  const TYPE_NAME = {
    legend: "전설",
    immortal: "불멸",
    dosak: "도색",
  };

  const TYPE_COLORS = {
    legend: {
      bg: "#e74c3c",
      border: "#c0392b",
      text: "white",
    },
    immortal: {
      bg: "#f1c40f",
      border: "#d4ac0d",
      text: "white",
    },
  };

  function setupEventListeners() {
    document
      .getElementById("currentLevel")
      .addEventListener("change", validateInputs);
    document
      .getElementById("targetLevel")
      .addEventListener("change", validateInputs);
    document
      .getElementById("calculateBtn")
      .addEventListener("click", handleCalculateClick);
    document
      .getElementById("expType")
      .addEventListener("change", handleExpTypeChange);

    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach((input) => {
      input.addEventListener("input", function () {
        if (this.value < 0) this.value = 0;
      });
    });
  }

  function handleExpTypeChange() {
    const type = document.getElementById("expType").value;

    const expTabs = document.querySelectorAll(".exp-tab");
    expTabs.forEach((tab) => {
      tab.classList.remove("active");
      if (tab.getAttribute("data-type") === type) {
        tab.classList.add("active");
      }
    });

    updateExpTables(type);
    highlightCurrentTables();
  }

  function handleCalculateClick() {
    const btn = document.getElementById("calculateBtn");

    btn.classList.add("clicked");
    setTimeout(() => {
      btn.classList.remove("clicked");
    }, 700);

    const resultBoxes = document.querySelectorAll(".result-box");
    resultBoxes.forEach((box) => {
      box.classList.remove("flash");
      void box.offsetWidth;
      box.classList.add("flash");
    });

    calculate();

    const resultsPanel = document.getElementById("resultsPanel");
    resultsPanel.classList.remove("hidden");
  }

  function setupExpTypeTabs() {
    const expTabs = document.querySelectorAll(".exp-tab");

    expTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        const type = this.getAttribute("data-type");

        expTabs.forEach((t) => t.classList.remove("active"));
        this.classList.add("active");

        updateSelectedExpType(type);
        updateExpTables(type);
        highlightCurrentTables();
      });
    });

    updateExpTables("legend");
  }

  function updateExpTables(type) {
    const leftTable = document.getElementById("expTableLeft");
    const rightTable = document.getElementById("expTableRight");

    leftTable.innerHTML = "";
    rightTable.innerHTML = "";

    const expData = EXP_TABLE[type];

    for (let lv = 0; lv <= 13; lv++) {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${lv}</td>
              <td>${expData[lv].toLocaleString()}</td>
          `;
      leftTable.appendChild(row);
    }

    for (let lv = 14; lv <= 25; lv++) {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${lv}</td>
              <td>${expData[lv].toLocaleString()}</td>
          `;
      rightTable.appendChild(row);
    }

    highlightCurrentTables();
  }

  function updateSelectedExpType(type) {
    document.getElementById("expType").value = type;
  }

  function validateInputs() {
    let currentLevel = document.getElementById("currentLevel");
    let targetLevel = document.getElementById("targetLevel");

    if (parseInt(currentLevel.value) > 24) {
      currentLevel.value = 24;
    } else if (parseInt(currentLevel.value) < 0) {
      currentLevel.value = 0;
    }

    if (parseInt(targetLevel.value) > 25) {
      targetLevel.value = 25;
    } else if (parseInt(targetLevel.value) <= parseInt(currentLevel.value)) {
      targetLevel.value = parseInt(currentLevel.value) + 1;
      if (parseInt(targetLevel.value) > 25) targetLevel.value = 25;
    }

    highlightCurrentTables();
  }

  function calculate() {
    const type = document.getElementById("expType").value;
    const typeName = TYPE_NAME[type] || type;
    const typeColor = TYPE_COLORS[type] || {
      bg: "#f5f5f5",
      border: "#e0e0e0",
      text: "#333",
    };

    const current =
      parseInt(document.getElementById("currentLevel").value) || 0;
    const target = parseInt(document.getElementById("targetLevel").value) || 1;
    const requiredDiv = document.getElementById("required");
    const maxLevelDiv = document.getElementById("maxLevel");

    const highSoul = parseInt(document.getElementById("highSoul").value) || 0;
    const midSoul = parseInt(document.getElementById("midSoul").value) || 0;
    const lowSoul = parseInt(document.getElementById("lowSoul").value) || 0;

    const ownedExp =
      highSoul * SOUL_VALUE.high +
      midSoul * SOUL_VALUE.mid +
      lowSoul * SOUL_VALUE.low;

    if (
      isNaN(current) ||
      isNaN(target) ||
      current < 0 ||
      current > 24 ||
      target <= current ||
      target > 25
    ) {
      requiredDiv.innerHTML = `<div class="result-title insufficient">레벨 범위 오류</div>
          현재 레벨(0~24)과 목표 레벨(1~25)을 확인해주세요.`;
      maxLevelDiv.innerHTML = "";
      return;
    }

    const expData = EXP_TABLE[type];

    const requiredExp = expData
      .slice(current + 1, target + 1)
      .reduce((sum, val) => sum + val, 0);

    const top = Math.floor(requiredExp / SOUL_VALUE.high);
    const mid = Math.floor((requiredExp % SOUL_VALUE.high) / SOUL_VALUE.mid);
    const low = Math.ceil((requiredExp % SOUL_VALUE.mid) / SOUL_VALUE.low);

    const remainingExp = Math.max(0, requiredExp - ownedExp);
    const topNeeded = Math.floor(remainingExp / SOUL_VALUE.high);
    const midNeeded = Math.floor(
      (remainingExp % SOUL_VALUE.high) / SOUL_VALUE.mid
    );
    const lowNeeded = Math.ceil(
      (remainingExp % SOUL_VALUE.mid) / SOUL_VALUE.low
    );

    const typeBadgeStyle = `background-color: ${typeColor.bg}; border-color: ${typeColor.border}; color: ${typeColor.text};`;

    requiredDiv.innerHTML = renderRequiredDiv(
      typeName,
      typeBadgeStyle,
      current,
      target,
      requiredExp,
      top,
      mid,
      low,
      highSoul,
      midSoul,
      lowSoul,
      ownedExp,
      topNeeded,
      midNeeded,
      lowNeeded
    );

    const maxLevelInfo = calculateMaxLevel(current, expData, ownedExp);
    const { maxLevel, nextLevelExp, nextLevelProgress, remainingOwnedExp } =
      maxLevelInfo;

    maxLevelDiv.innerHTML = renderMaxLevelDiv(
      typeName,
      typeBadgeStyle,
      ownedExp,
      highSoul,
      midSoul,
      lowSoul,
      maxLevel,
      target,
      requiredExp,
      nextLevelExp,
      nextLevelProgress,
      remainingOwnedExp
    );

    highlightCurrentTables();
  }

  function renderRequiredDiv(
    typeName,
    typeBadgeStyle,
    current,
    target,
    requiredExp,
    top,
    mid,
    low,
    highSoul,
    midSoul,
    lowSoul,
    ownedExp,
    topNeeded,
    midNeeded,
    lowNeeded
  ) {
    let html = `
      <div class="result-title required-title">필요 환수혼 <span class="type-badge" style="${typeBadgeStyle}">${typeName}</span></div>
      <div class="result-section">
        <div class="data-row">
          <span>레벨 ${current} → ${target}</span>
          <span class="data-value highlight">${requiredExp.toLocaleString()}exp</span>
        </div>
      </div>
      
      <div class="sub-title">필요 환수혼 수량</div>
      <div class="data-row">
        <span><img src="assets/img/high-soul.jpg" alt="최상급" class="soul-icon">최상급</span>
        <span class="data-value">${top}개 ${
      highSoul >= top
        ? '<span class="sufficient">✓</span>'
        : `<span class="insufficient">-${top - highSoul}</span>`
    }</span>
      </div>
      <div class="data-row">
        <span><img src="assets/img/mid-soul.jpg" alt="상급" class="soul-icon">상급</span>
        <span class="data-value">${mid}개 ${
      midSoul >= mid
        ? '<span class="sufficient">✓</span>'
        : `<span class="insufficient">-${mid - midSoul}</span>`
    }</span>
      </div>
      <div class="data-row">
        <span><img src="assets/img/low-soul.jpg" alt="하급" class="soul-icon">하급</span>
        <span class="data-value">${low}개 ${
      lowSoul >= low
        ? '<span class="sufficient">✓</span>'
        : `<span class="insufficient">-${low - lowSoul}</span>`
    }</span>
      </div>`;

    if (ownedExp < requiredExp) {
      html += `
          <div class="sub-title">추가 필요(최적 조합)</div>
          <div class="data-row">
            <span><img src="assets/img/high-soul.jpg" alt="최상급" class="soul-icon">최상급</span>
            <span class="data-value">${topNeeded}개</span>
          </div>
          <div class="data-row">
            <span><img src="assets/img/mid-soul.jpg" alt="상급" class="soul-icon">상급</span>
            <span class="data-value">${midNeeded}개</span>
          </div>
          <div class="data-row">
            <span><img src="assets/img/low-soul.jpg" alt="하급" class="soul-icon">하급</span>
            <span class="data-value">${lowNeeded}개</span>
          </div>`;
    }

    return html;
  }

  function renderMaxLevelDiv(
    typeName,
    typeBadgeStyle,
    ownedExp,
    highSoul,
    midSoul,
    lowSoul,
    maxLevel,
    target,
    requiredExp,
    nextLevelExp,
    nextLevelProgress,
    remainingOwnedExp
  ) {
    let html = `
      <div class="result-title max-title">도달 가능 레벨 <span class="type-badge" style="${typeBadgeStyle}">${typeName}</span></div>
      <div class="result-section">
        <div class="data-row">
          <span>보유 환수혼</span>
          <span class="data-value highlight">${ownedExp.toLocaleString()}exp</span>
        </div>
        <div class="data-row">
          <span>
            <img src="assets/img/high-soul.jpg" alt="최상급" class="soul-icon">${highSoul}
            <img src="assets/img/mid-soul.jpg" alt="상급" class="soul-icon">${midSoul}
            <img src="assets/img/low-soul.jpg" alt="하급" class="soul-icon">${lowSoul}
          </span>
        </div>
      </div>
      
      <div class="result-section">
        <div class="data-row">
          <span>최대 도달 레벨</span>
          <span class="data-value highlight">${maxLevel}</span>
        </div>`;

    if (maxLevel < 25) {
      html += `
          <div class="data-row">
            <span>다음 레벨 진행도</span>
            <span class="data-value">${nextLevelProgress}%</span>
          </div>
          <div class="data-row">
            <span>남은 경험치</span>
            <span class="data-value">${remainingOwnedExp.toLocaleString()} / ${nextLevelExp.toLocaleString()}</span>
          </div>`;
    }

    html += `
      </div>
      
      <div class="result-section">
        ${
          maxLevel >= target
            ? `<span class="sufficient">목표 레벨 ${target} 달성 가능!</span>`
            : `<span class="insufficient">목표 레벨 ${target}까지 ${
                requiredExp - ownedExp
              } 경험치 부족</span>`
        }
      </div>`;

    return html;
  }

  function calculateMaxLevel(current, expData, ownedExp) {
    let maxLevel = current;
    let remainingOwnedExp = ownedExp;

    for (let lv = current + 1; lv <= 25; lv++) {
      if (remainingOwnedExp >= expData[lv]) {
        remainingOwnedExp -= expData[lv];
        maxLevel = lv;
      } else {
        break;
      }
    }

    let nextLevelExp = 0;
    let nextLevelProgress = 0;

    if (maxLevel < 25) {
      nextLevelExp = expData[maxLevel + 1];
      nextLevelProgress = Math.floor((remainingOwnedExp / nextLevelExp) * 100);
    }

    return {
      maxLevel,
      nextLevelExp,
      nextLevelProgress,
      remainingOwnedExp,
    };
  }

  function highlightCurrentTables() {
    const current =
      parseInt(document.getElementById("currentLevel").value) || 0;
    const target = parseInt(document.getElementById("targetLevel").value) || 1;

    const leftRows = document.querySelectorAll("#expTableLeft tr");
    const rightRows = document.querySelectorAll("#expTableRight tr");

    clearTableHighlights(leftRows);
    clearTableHighlights(rightRows);

    if (current >= 0 && current <= 13) {
      leftRows[current].classList.add("current-level");
    } else if (current > 13 && current <= 24) {
      rightRows[current - 14].classList.add("current-level");
    }

    if (target >= 1 && target <= 13) {
      leftRows[target].classList.add("target-level");
    } else if (target > 13 && target <= 25) {
      rightRows[target - 14].classList.add("target-level");
    }

    if (document.getElementById("resultsPanel").classList.contains("hidden")) {
      return;
    }

    const highSoul = parseInt(document.getElementById("highSoul").value) || 0;
    const midSoul = parseInt(document.getElementById("midSoul").value) || 0;
    const lowSoul = parseInt(document.getElementById("lowSoul").value) || 0;

    if (highSoul > 0 || midSoul > 0 || lowSoul > 0) {
      const ownedExp =
        highSoul * SOUL_VALUE.high +
        midSoul * SOUL_VALUE.mid +
        lowSoul * SOUL_VALUE.low;
      const type = document.getElementById("expType").value;
      const expData = EXP_TABLE[type];

      let maxLevel = current;
      let remainingOwnedExp = ownedExp;

      for (let lv = current + 1; lv <= 25; lv++) {
        if (remainingOwnedExp >= expData[lv]) {
          remainingOwnedExp -= expData[lv];
          maxLevel = lv;
        } else {
          break;
        }
      }

      if (maxLevel !== target) {
        if (maxLevel >= 0 && maxLevel <= 13) {
          leftRows[maxLevel].classList.add("max-level");
        } else if (maxLevel > 13 && maxLevel <= 25) {
          rightRows[maxLevel - 14].classList.add("max-level");
        }
      }
    }
  }

  function clearTableHighlights(rows) {
    rows.forEach((row) => {
      row.classList.remove("current-level");
      row.classList.remove("target-level");
      row.classList.remove("max-level");
    });
  }

  function initializeApp() {
    setupEventListeners();
    setupExpTypeTabs();
    highlightCurrentTables();
  }

  return {
    initialize: initializeApp,
    handleExpTypeChange: handleExpTypeChange,
    validateInputs: validateInputs,
    calculate: calculate,
    updateExpTables: updateExpTables,
    highlightCurrentTables: highlightCurrentTables,
  };
})();
