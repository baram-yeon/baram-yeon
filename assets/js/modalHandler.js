const ModalHandler = (function () {
  let modalElement = null;
  let currentStats = [];
  let currentLevel = 0;
  let currentName = "";
  let currentInfluence = "";

  function showInfo(category, imagePath, influence) {
    showInfoInModal(category, imagePath, influence);
  }

  function showInfoInModal(category, imagePath, influence) {
    modalElement = createModal();
    const modal = modalElement.container;
    const modalOverlay = modalElement.overlay;

    modal.innerHTML = "";

    const closeButton = document.createElement("button");
    closeButton.className = "modal-close";
    closeButton.innerHTML = "✕";
    closeButton.setAttribute("aria-label", "닫기");
    closeButton.onclick = closeModal;
    modal.appendChild(closeButton);

    const categoryData = window.DataManager.getData(category);
    if (!categoryData || !Array.isArray(categoryData)) {
      modal.innerHTML += "<p>정보를 표시할 수 없습니다.</p>";
      modalOverlay.style.display = "flex";
      document.body.style.overflow = "hidden";
      return;
    }

    const matched = categoryData.find(
      (item) => item && item.image === imagePath
    );
    if (!matched) {
      modal.innerHTML += "<p>선택한 환수 정보를 찾을 수 없습니다.</p>";
      modalOverlay.style.display = "flex";
      document.body.style.overflow = "hidden";
      return;
    }

    currentStats = Array.isArray(matched.stats) ? matched.stats : [];
    currentLevel = 0;
    currentName = matched.name || "이름 없음";
    currentInfluence = influence || matched.influence || "";

    const modalHeader = createModalHeader(imagePath);
    const statsContainer = createStatsContainer();

    modal.appendChild(modalHeader);
    modal.appendChild(statsContainer);

    const initialStat =
      currentStats.find((s) => s && s.level === currentLevel) || null;
    updateStatsInModal(initialStat);

    modalOverlay.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function createModalHeader(imagePath) {
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";

    const imgPreview = document.createElement("img");
    imgPreview.src = imagePath;
    imgPreview.alt = currentName;
    imgPreview.className = "modal-img-preview";

    const titleArea = document.createElement("div");
    titleArea.className = "title-area";
    const title = document.createElement("h3");
    title.textContent = currentName + " ";

    if (
      currentInfluence &&
      window.DataManager.FACTION_ICONS &&
      window.DataManager.FACTION_ICONS[currentInfluence]
    ) {
      const influenceIcon = document.createElement("img");
      influenceIcon.src = window.DataManager.FACTION_ICONS[currentInfluence];
      influenceIcon.alt = `${currentInfluence} 아이콘`;
      influenceIcon.title = currentInfluence;
      influenceIcon.className = "influence-icon";
      title.appendChild(influenceIcon);
    } else if (currentInfluence && currentInfluence !== "정보없음") {
      const influenceText = document.createElement("span");
      influenceText.textContent = `(${currentInfluence})`;
      influenceText.style.fontSize = "0.8em";
      influenceText.style.marginLeft = "5px";
      title.appendChild(influenceText);
    }

    const levelControls = createLevelControls();
    titleArea.appendChild(title);
    titleArea.appendChild(levelControls);
    modalHeader.appendChild(imgPreview);
    modalHeader.appendChild(titleArea);

    return modalHeader;
  }

  function createLevelControls() {
    const levelControls = document.createElement("div");
    levelControls.classList.add("level-controls");

    const levelMinusButton = document.createElement("button");
    levelMinusButton.innerText = "-";
    levelMinusButton.setAttribute("aria-label", "레벨 감소");
    levelMinusButton.addEventListener("click", () => changeLevel(-1));

    const levelInput = document.createElement("input");
    levelInput.type = "number";
    levelInput.min = "0";
    levelInput.max = "25";
    levelInput.value = currentLevel;
    levelInput.classList.add("level-input");
    levelInput.setAttribute("aria-label", "환수 레벨");
    levelInput.addEventListener("input", function () {
      let value = parseInt(this.value, 10);
      if (isNaN(value) || value < 0) value = 0;
      if (value > 25) value = 25;
      this.value = value;
      currentLevel = value;
      const statForLevel =
        currentStats.find((s) => s && s.level === currentLevel) || null;
      updateStatsInModal(statForLevel);
    });
    levelInput.addEventListener("keypress", (e) => {
      if (!/\d/.test(e.key)) e.preventDefault();
    });

    const levelPlusButton = document.createElement("button");
    levelPlusButton.innerText = "+";
    levelPlusButton.setAttribute("aria-label", "레벨 증가");
    levelPlusButton.addEventListener("click", () => changeLevel(1));

    const maxButton = document.createElement("button");
    maxButton.innerText = "MAX";
    maxButton.classList.add("max-button");
    maxButton.setAttribute("aria-label", "최대 레벨 설정");
    maxButton.addEventListener("click", () => {
      currentLevel = 25;
      levelInput.value = currentLevel;
      const statForLevel =
        currentStats.find((s) => s && s.level === currentLevel) || null;
      updateStatsInModal(statForLevel);
    });

    levelControls.appendChild(levelMinusButton);
    levelControls.appendChild(levelInput);
    levelControls.appendChild(levelPlusButton);
    levelControls.appendChild(maxButton);

    return levelControls;
  }

  function createStatsContainer() {
    const statsContainer = document.createElement("div");
    statsContainer.className = "stats-container";

    const leftColumn = document.createElement("div");
    leftColumn.className = "stats-column";
    const registrationHeader = document.createElement("b");
    registrationHeader.innerText = "📌 등록 효과:";
    const registrationList = document.createElement("ul");
    registrationList.id = "registrationList";
    leftColumn.appendChild(registrationHeader);
    leftColumn.appendChild(registrationList);

    const rightColumn = document.createElement("div");
    rightColumn.className = "stats-column";
    const bindHeader = document.createElement("b");
    bindHeader.innerText = "🧷 결속 효과:";
    const bindList = document.createElement("ul");
    bindList.id = "bindList";
    rightColumn.appendChild(bindHeader);
    rightColumn.appendChild(bindList);

    statsContainer.appendChild(leftColumn);
    statsContainer.appendChild(rightColumn);

    return statsContainer;
  }

  function changeLevel(diff) {
    const newLevel = currentLevel + diff;
    if (newLevel < 0 || newLevel > 25) return;
    currentLevel = newLevel;
    const levelInput = document.querySelector(".level-input");
    if (levelInput) levelInput.value = currentLevel;
    const stat = currentStats.find((s) => s && s.level === currentLevel);
    updateStatsInModal(stat || null);
  }

  function updateStatsInModal(stat) {
    const registrationList = document.getElementById("registrationList");
    const bindList = document.getElementById("bindList");
    if (!registrationList || !bindList) return;

    registrationList.innerHTML = "";
    bindList.innerHTML = "";

    const registrationColumn = registrationList.parentNode;
    const bindColumn = bindList.parentNode;
    registrationColumn
      ?.querySelectorAll(".level25-notice")
      .forEach((n) => n.remove());
    bindColumn?.querySelectorAll(".level25-notice").forEach((n) => n.remove());

    const level25Stat = currentStats.find((s) => s && s.level === 25);
    const hasRegEffectAt25 =
      level25Stat?.registrationStat &&
      Object.keys(level25Stat.registrationStat).length > 0;
    const hasBindEffectAt25 =
      level25Stat?.bindStat && Object.keys(level25Stat.bindStat).length > 0;

    if (
      stat?.registrationStat &&
      Object.keys(stat.registrationStat).length > 0
    ) {
      displayStatsInOrder(registrationList, stat.registrationStat);
    } else {
      if (currentLevel !== 25 && hasRegEffectAt25) {
        registrationList.innerHTML = `<li>현재 레벨(${currentLevel})에는 등록 효과가 없습니다.</li>`;
        const notice = document.createElement("div");
        notice.className = "level25-notice";
        notice.textContent = "※ 등록 효과는 25레벨 달성 시 적용됩니다.";
        registrationColumn?.appendChild(notice);
      } else {
        registrationList.innerHTML = `<li>레벨 ${currentLevel}: 등록 효과 정보 없음</li>`;
      }
    }

    if (stat?.bindStat && Object.keys(stat.bindStat).length > 0) {
      displayStatsInOrder(bindList, stat.bindStat);
    } else {
      if (currentLevel !== 25 && hasBindEffectAt25) {
        bindList.innerHTML = `<li>현재 레벨(${currentLevel})에는 결속 효과가 없습니다.</li>`;
        const notice = document.createElement("div");
        notice.className = "level25-notice";
        notice.textContent = "※ 결속 효과는 25레벨 달성 시 적용됩니다.";
        bindColumn?.appendChild(notice);
      } else {
        bindList.innerHTML = `<li>레벨 ${currentLevel}: 결속 효과 정보 없음</li>`;
      }
    }
  }

  function displayStatsInOrder(listElement, statsObj) {
    if (
      !statsObj ||
      typeof statsObj !== "object" ||
      Object.keys(statsObj).length === 0
    ) {
      listElement.innerHTML = "<li>정보 없음</li>";
      return;
    }

    const groupedStats = {};
    Object.entries(statsObj).forEach(([key, val]) => {
      if (
        key === null ||
        key === undefined ||
        val === null ||
        val === undefined
      )
        return;

      const statName = window.DataManager.STATS_MAPPING[key] || key.toString();
      const valueStr = val.toString();

      if (groupedStats[statName]) {
        const currentValNum = parseFloat(groupedStats[statName].val);
        const newValNum = parseFloat(valueStr);
        if (!isNaN(currentValNum) && !isNaN(newValNum)) {
          groupedStats[statName].val = (currentValNum + newValNum).toString();
        }
      } else {
        groupedStats[statName] = {
          key: key,
          val: valueStr,
          order: window.DataManager.STATS_ORDER.indexOf(key),
        };
      }
    });

    const sortedStats = Object.entries(groupedStats).sort(([, a], [, b]) => {
      const orderA = a.order;
      const orderB = b.order;
      if (orderA !== -1 && orderB !== -1) return orderA - orderB;
      if (orderA !== -1) return -1;
      if (orderB !== -1) return 1;
      return a.key.localeCompare(b.key);
    });

    listElement.innerHTML = "";
    if (sortedStats.length === 0) {
      listElement.innerHTML = "<li>표시할 능력치 없음</li>";
      return;
    }

    sortedStats.forEach(([statName, info]) => {
      const li = document.createElement("li");
      const displayValue = info.val;
      const specialClass =
        window.DataManager.SPECIAL_STAT_CLASSES[statName] || "";
      if (specialClass) {
        li.innerHTML = `<span class="${specialClass}">${statName}: ${displayValue}</span>`;
      } else {
        li.textContent = `${statName}: ${displayValue}`;
      }
      listElement.appendChild(li);
    });
  }

  function createModal() {
    let modalOverlay = document.querySelector(".modal-overlay");
    if (modalOverlay) {
      const modalContainerElement = {
        overlay: modalOverlay,
        container: modalOverlay.querySelector(".modal"),
      };
      if (!modalContainerElement.container) {
        modalOverlay.remove();
        modalOverlay = null;
      } else {
        return modalContainerElement;
      }
    }

    modalOverlay = document.createElement("div");
    modalOverlay.className = "modal-overlay";

    const modalContainer = document.createElement("div");
    modalContainer.className = "modal";

    const closeButton = document.createElement("button");
    closeButton.className = "modal-close";
    closeButton.innerHTML = "✕";
    closeButton.setAttribute("aria-label", "닫기");
    closeButton.onclick = closeModal;

    modalContainer.appendChild(closeButton);
    modalOverlay.appendChild(modalContainer);
    document.body.appendChild(modalOverlay);

    document.addEventListener("keydown", handleEscKey);
    modalOverlay.addEventListener("click", handleOverlayClick);

    return {
      overlay: modalOverlay,
      container: modalContainer,
    };
  }

  function handleEscKey(e) {
    if (e.key === "Escape" && modalElement?.overlay.style.display === "flex") {
      closeModal();
    }
  }

  function handleOverlayClick(e) {
    if (
      e.target === modalElement?.overlay &&
      modalElement?.overlay.style.display === "flex"
    ) {
      closeModal();
    }
  }

  function closeModal() {
    if (modalElement && modalElement.overlay) {
      modalElement.overlay.style.display = "none";
      document.body.style.overflow = "auto";
    }
  }

  return {
    showInfo,
    showInfoInModal,
    closeModal,
  };
})();

window.ModalHandler = ModalHandler;
