// const parts = [
//   "투구",
//   "무기",
//   "방패",
//   "의상",
//   "망토",
//   "신발",
//   "목걸이",
//   "반지",
//   "반지",
//   "보조",
//   "보조",
// ];
// const levels = Array.from({ length: 12 }, (_, i) => `+${9 + i}`);

// const equipmentContainer = document.getElementById("equipment-selector");
// const levelContainer = document.getElementById("level-selector");
// const statsContainer = document.getElementById("stats-display");

// let selectedPart = "투구";
// let selectedLevel = "+9";
// let equipmentData = {};
// let isInitialLoad = true;

// let userInputGoldButtons = 10000;
// let userInputColorBalls = 10000;
// let userGoldButtons = 10000;
// let userColorBalls = 10000;

// let firstUnlockedMap = {};
// let globalStatState = {};
// let allAvailableStats = [];
// let selectedStats = [];
// let optimizationPlan = null;

// const BOSS_STATS = ["피해저항관통", "보스몬스터추가피해", "치명위력%"];
// const PVP_STATS = [
//   "피해저항관통",
//   "피해저항",
//   "대인방어",
//   "대인피해",
//   "상태이상저항",
//   "상태이상적중",
//   "대인방어%",
//   "대인피해%",
// ];

// function getDisplayStatName(statName) {
//   return statName.replace(/\d+$/, "");
// }

// function updateUserResources() {
//   userInputGoldButtons =
//     parseInt(document.getElementById("gold-button").value) || 0;
//   userInputColorBalls =
//     parseInt(document.getElementById("color-ball").value) || 0;

//   userGoldButtons = userInputGoldButtons;
//   userColorBalls = userInputColorBalls;

//   updateResourceSummary();
// }

// function updateResourceDisplay() {
//   const goldButtonDisplay = document.getElementById("gold-button");
//   const colorBallDisplay = document.getElementById("color-ball");

//   if (goldButtonDisplay) goldButtonDisplay.value = userInputGoldButtons;
//   if (colorBallDisplay) colorBallDisplay.value = userInputColorBalls;
// }

// function updateResourceSummary() {
//   const resourceSummary = document.getElementById("resource-summary");
//   if (!resourceSummary) return;

//   const resources = calculateResources();

//   const goldButtonClass =
//     userGoldButtons < 0 ? "resource-negative" : "resource-value";
//   const colorBallClass =
//     userColorBalls < 0 ? "resource-negative" : "resource-value";

//   let html = `
//     <div class="resource-summary-item">
//       <img src="assets/img/gold-button.jpg" alt="황금단추" class="resource-icon-img">
//       <span class="resource-details">
//         <span class="${goldButtonClass}">${userGoldButtons}</span> 보유
//         / <span class="resource-value">${resources.goldButtons}</span> 소모
//       </span>
//     </div>
//     <div class="resource-summary-item">
//       <img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="resource-icon-img">
//       <span class="resource-details">
//         <span class="${colorBallClass}">${userColorBalls}</span> 보유
//         / <span class="resource-value">${resources.colorBalls}</span> 소모
//       </span>
//     </div>
//   `;

//   if (userGoldButtons < 0 || userColorBalls < 0) {
//     html += `<div class="resource-needed">`;

//     if (userGoldButtons < 0) {
//       html += `<div class="needed-item">
//         <img src="assets/img/gold-button.jpg" alt="황금단추" class="resource-icon-img">
//         <span class="resource-negative">${Math.abs(
//           userGoldButtons
//         )}</span> 추가 필요
//       </div>`;
//     }

//     if (userColorBalls < 0) {
//       html += `<div class="needed-item">
//         <img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="resource-icon-img">
//         <span class="resource-negative">${Math.abs(
//           userColorBalls
//         )}</span> 추가 필요
//       </div>`;
//     }

//     html += `</div>`;
//   }

//   resourceSummary.innerHTML = html;
// }

// function highlightSelection(container, selectedBtn, typeClass) {
//   Array.from(container.children).forEach((btn) => {
//     if (typeClass === "equip-btn") {
//       btn.classList.remove("bg-sky-500", "text-white", "font-bold");
//     } else if (typeClass === "level-btn") {
//       btn.classList.remove("bg-emerald-500", "text-white", "font-bold");
//     }
//   });

//   if (typeClass === "equip-btn") {
//     selectedBtn.classList.add("bg-sky-500", "text-white", "font-bold");
//   } else if (typeClass === "level-btn") {
//     selectedBtn.classList.add("bg-emerald-500", "text-white", "font-bold");
//   }

//   updateLevelButtonIndicators();
//   updateStatCardStatus();
// }

// function getBasePartName(part) {
//   return part.startsWith("반지") ? "반지" : part;
// }

// function renderStatCards(stats, containerId) {
//   const container = document.getElementById(containerId);
//   if (!container) return;

//   const displayedCards = new Set();

//   stats.forEach(([statName, maxValue], index) => {
//     const cardId = `${statName}_${selectedPart}_${selectedLevel}_${index}`;
//     displayedCards.add(cardId);

//     let card = document.querySelector(`[data-card-id="${cardId}"]`);

//     if (!card) {
//       card = createStatCard(statName, maxValue, container, cardId, index);
//     }

//     card.style.display = "flex";
//   });

//   // Hide cards that are not in the current stats
//   Array.from(container.children).forEach((card) => {
//     if (!displayedCards.has(card.dataset.cardId)) {
//       card.style.display = "none";
//     }
//   });

//   updateButtonStates();
//   updateStatCardStatus();
//   updateLevelButtonIndicators();
// }

// function updateButtonStates() {
//   const partLevelKey = `${selectedPart}_${selectedLevel}`;
//   const hasFirstUnlocked = firstUnlockedMap[partLevelKey] || false;

//   const visibleCards = Array.from(
//     document.querySelectorAll("#stats-display > div")
//   ).filter((card) => card.style.display !== "none");

//   visibleCards.forEach((card) => {
//     if (card.dataset.isUnlocked !== "true") {
//       const button = card.querySelector(".action-btn");
//       if (button) {
//         if (hasFirstUnlocked) {
//           button.innerHTML = `<img src="assets/img/gold-button.jpg" alt="황금단추" class="btn-icon"> <span>선택 500</span>`;
//         } else {
//           button.innerHTML = `<img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="btn-icon"> <span>선택 500</span>`;
//         }
//       }
//     } else {
//       const button = card.querySelector(".action-btn");
//       if (button) {
//         const level = parseInt(card.dataset.cardLevel || "0");
//         if (level < 3) {
//           const orbCost =
//             card.dataset.isFirst === "true" ? 500 : level === 0 ? 400 : 500;
//           button.innerHTML = `<img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="btn-icon"> <span>강화 ${orbCost}</span>`;
//         } else {
//           button.innerHTML = `<span>완료</span>`;
//           button.disabled = true;
//           button.classList.add("disabled-btn");
//         }
//       }
//     }
//   });
// }

// function updateStatCardStatus() {
//   document.querySelectorAll(".stat-card").forEach((card) => {
//     const isUnlocked = card.dataset.isUnlocked === "true";
//     const level = parseInt(card.dataset.cardLevel || "0");
//     const progressDots = card.querySelectorAll(".progress-dot");

//     if (progressDots.length > 0) {
//       progressDots.forEach((dot, index) => {
//         dot.className = "progress-dot gray";

//         if (isUnlocked) {
//           if (index < level) {
//             dot.className = "progress-dot blue";
//           } else {
//             dot.className = "progress-dot yellow";
//           }
//         }
//       });
//     }
//   });
// }

// function getStatsForPartAndLevel(part, level) {
//   const result = [];
//   const basePart = getBasePartName(part);
//   const key = `lv${level.replace("+", "")}`;

//   if (equipmentData[basePart] && equipmentData[basePart][key]) {
//     const stats = Object.entries(equipmentData[basePart][key]);

//     stats.forEach(([statName, maxValue], index) => {
//       const cardId = `${statName}_${part}_${level}_${index}`;
//       const displayName = getDisplayStatName(statName);

//       const statState = globalStatState[cardId] || {
//         level: 0,
//         value: 0,
//         isUnlocked: false,
//         isFirst: false,
//         part: part,
//         partLevel: level,
//         statName: statName,
//         maxValue: maxValue,
//       };

//       result.push({
//         name: displayName,
//         originalName: statName,
//         maxValue: maxValue,
//         state: statState,
//         index: index,
//       });
//     });
//   }

//   return result;
// }

// function updateLevelButtonIndicators() {
//   if (!selectedPart) return;

//   parts.forEach((part) => {
//     if (part === selectedPart) {
//       levels.forEach((level) => {
//         const stats = getStatsForPartAndLevel(part, level);

//         if (stats.length === 0) return;

//         const levelButtons = levelContainer.querySelectorAll(".level-btn");
//         levelButtons.forEach((btn) => {
//           const levelText = btn.querySelector(".level-text").textContent;

//           if (levelText === level) {
//             const dotsContainer = btn.querySelector(".progress-dots");
//             if (dotsContainer) {
//               dotsContainer.innerHTML = "";

//               const maxDots = Math.min(4, stats.length);

//               for (let i = 0; i < maxDots; i++) {
//                 const dot = document.createElement("span");
//                 const statState = stats[i].state;

//                 if (statState.isUnlocked) {
//                   if (statState.level === 3) {
//                     dot.className = "progress-dot blue";
//                   } else {
//                     dot.className = "progress-dot yellow";
//                   }
//                 } else {
//                   dot.className = "progress-dot gray";
//                 }

//                 dotsContainer.appendChild(dot);
//               }
//             }

//             updateLevelProgressBar(btn, stats);
//           }
//         });
//       });
//     }
//   });
// }

// function updateLevelProgressBar(btn, stats) {
//   const progressBar = btn.querySelector(".level-progress-bar");
//   const statusText = btn.querySelector(".level-status");

//   if (!progressBar || !statusText) return;

//   let totalPoints = 0;
//   let totalMaxPoints = stats.length * 3;
//   let unlockedCount = 0;

//   stats.forEach((stat) => {
//     if (stat.state.isUnlocked) {
//       totalPoints += stat.state.level;
//       unlockedCount++;
//     }
//   });

//   const percent =
//     totalMaxPoints > 0 ? Math.round((totalPoints / totalMaxPoints) * 100) : 0;
//   progressBar.style.width = `${percent}%`;

//   if (percent === 0) {
//     progressBar.classList.remove("partial", "complete");
//     progressBar.classList.add("empty");
//   } else if (percent < 100) {
//     progressBar.classList.remove("empty", "complete");
//     progressBar.classList.add("partial");
//   } else {
//     progressBar.classList.remove("empty", "partial");
//     progressBar.classList.add("complete");
//   }

//   if (unlockedCount > 0) {
//     statusText.textContent = `${unlockedCount}/${stats.length} (${percent}%)`;
//   } else {
//     statusText.textContent = "";
//   }
// }

// function renderStats() {
//   if (!selectedPart || !selectedLevel) return;

//   const basePart = getBasePartName(selectedPart);
//   const key = `lv${selectedLevel.replace("+", "")}`;
//   const partStats = equipmentData[basePart];

//   if (!partStats || !partStats[key]) {
//     document.querySelectorAll("#stats-display > div").forEach((card) => {
//       card.style.display = "none";
//     });
//     return;
//   }

//   const stats = Object.entries(partStats[key]);
//   renderStatCards(stats, "stats-display");

//   if (isInitialLoad) {
//     isInitialLoad = false;
//   } else {
//     updateTotalStats();
//   }

//   updateLevelButtonIndicators();
//   updateResourceSummary();
// }

// function collectAllStatNames() {
//   const stats = new Set();

//   for (const partName in equipmentData) {
//     for (const levelKey in equipmentData[partName]) {
//       for (const statName in equipmentData[partName][levelKey]) {
//         const displayName = getDisplayStatName(statName);
//         stats.add(displayName);
//       }
//     }
//   }

//   return Array.from(stats).sort();
// }

// function populateStatOptions() {
//   const optionsContainer = document.getElementById("stat-options");
//   if (!optionsContainer) return;

//   optionsContainer.innerHTML = "";

//   allAvailableStats.forEach((stat) => {
//     const option = document.createElement("div");
//     option.className = "stat-option";
//     option.textContent = stat;
//     option.addEventListener("click", function (e) {
//       e.stopPropagation();
//       toggleStatSelection(stat);
//     });
//     optionsContainer.appendChild(option);
//   });
// }

// function toggleStatSelection(stat) {
//   const index = selectedStats.indexOf(stat);

//   if (index === -1) {
//     selectedStats.push(stat);
//   } else {
//     selectedStats.splice(index, 1);
//   }

//   updateSelectedStatsDisplay();
//   toggleStatOptions(false);
// }

// function updateSelectedStatsDisplay() {
//   const container = document.getElementById("selected-stats");
//   if (!container) return;

//   container.innerHTML = "";

//   selectedStats.forEach((stat) => {
//     const chip = document.createElement("div");
//     chip.className = "stat-chip";
//     chip.innerHTML = `${stat} <span class="remove-stat" onclick="removeSelectedStat('${stat}')">×</span>`;
//     container.appendChild(chip);
//   });
// }

// function removeSelectedStat(stat) {
//   const index = selectedStats.indexOf(stat);
//   if (index !== -1) {
//     selectedStats.splice(index, 1);
//   }
//   updateSelectedStatsDisplay();
// }

// function filterStatOptions(filterText) {
//   const statOptions = document.getElementById("stat-options");
//   const options = statOptions.querySelectorAll(".stat-option");

//   filterText = filterText.toLowerCase();
//   let visibleCount = 0;

//   options.forEach((option) => {
//     const text = option.textContent.toLowerCase();
//     const isVisible = text.includes(filterText);

//     option.style.display = isVisible ? "flex" : "none";
//     if (isVisible) visibleCount++;
//   });

//   const noMatches = statOptions.querySelector(".no-matches");
//   if (visibleCount === 0) {
//     if (!noMatches) {
//       const noMatchesElement = document.createElement("div");
//       noMatchesElement.className = "no-matches";
//       noMatchesElement.textContent = "일치하는 항목 없음";
//       statOptions.appendChild(noMatchesElement);
//     }
//   } else {
//     if (noMatches) noMatches.remove();
//   }

//   toggleStatOptions(true);
// }

// function toggleStatOptions(show) {
//   const statOptions = document.getElementById("stat-options");
//   if (statOptions) {
//     statOptions.style.display = show ? "block" : "none";

//     if (show) {
//       statOptions.scrollTop = 0;
//     }
//   }
// }

// function searchStats() {
//   const input = document.getElementById("search-input");
//   const searchText = input.value.trim().toLowerCase();

//   if (!searchText && selectedStats.length === 0) {
//     alert("검색어를 입력하거나 능력치를 선택해주세요.");
//     return;
//   }

//   if (searchText) {
//     const matchingStats = allAvailableStats.filter((stat) =>
//       stat.toLowerCase().includes(searchText)
//     );

//     if (matchingStats.length === 0) {
//       alert("일치하는 능력치가 없습니다.");
//       return;
//     }

//     matchingStats.forEach((stat) => {
//       if (!selectedStats.includes(stat)) {
//         selectedStats.push(stat);
//       }
//     });

//     updateSelectedStatsDisplay();
//     input.value = "";
//   }

//   showSearchResults();
//   toggleStatOptions(false);
// }

// function showSearchResults() {
//   if (selectedStats.length === 0) {
//     alert("검색할 능력치를 선택해주세요.");
//     return;
//   }

//   const modal = document.getElementById("search-results-modal");
//   const resultsContainer = document.getElementById("search-results");
//   const summaryStatsContainer = document.getElementById("search-summary-stats");
//   const resourceRequirementContainer = document.getElementById(
//     "search-resource-requirement"
//   );
//   const searchedStatsContainer = document.getElementById("searched-stats-list");

//   if (
//     !modal ||
//     !resultsContainer ||
//     !summaryStatsContainer ||
//     !resourceRequirementContainer ||
//     !searchedStatsContainer
//   )
//     return;

//   let results = [];
//   const statTotalMaxValues = {};

//   selectedStats.forEach((searchStat) => {
//     statTotalMaxValues[searchStat] = 0;

//     for (const part of parts) {
//       const basePart = getBasePartName(part);
//       if (!equipmentData[basePart]) continue;

//       for (const level of levels) {
//         const key = `lv${level.replace("+", "")}`;
//         if (!equipmentData[basePart][key]) continue;

//         const stats = Object.entries(equipmentData[basePart][key]);
//         for (const [statName, maxValue] of stats) {
//           const displayName = getDisplayStatName(statName);
//           if (displayName === searchStat) {
//             const cardId = `${statName}_${part}_${level}_0`;
//             const isUnlocked = globalStatState[cardId]?.isUnlocked || false;
//             const currentLevel = globalStatState[cardId]?.level || 0;

//             statTotalMaxValues[searchStat] += maxValue;

//             results.push({
//               part: part,
//               level: level,
//               statName: displayName,
//               maxValue: maxValue,
//               cardId: cardId,
//               isUnlocked: isUnlocked,
//               currentLevel: currentLevel,
//             });
//           }
//         }
//       }
//     }
//   });

//   if (results.length === 0) {
//     resultsContainer.innerHTML = `<div class="no-results">검색 결과가 없습니다.</div>`;
//     modal.style.display = "block";
//     return;
//   }

//   const totalResources = calculateTotalResourcesForSearch(results);

//   let summaryStatsHtml = "";
//   selectedStats.forEach((stat) => {
//     const totalMaxValue = statTotalMaxValues[stat] || 0;
//     summaryStatsHtml += `<span class="summary-stat-badge">${stat} <strong>최대 +${totalMaxValue}</strong></span>`;
//   });
//   summaryStatsContainer.innerHTML = summaryStatsHtml;

//   resourceRequirementContainer.innerHTML = `
//     <div class="resource-req-item">
//       <img src="assets/img/gold-button.jpg" alt="황금단추" class="resource-icon-img-small">
//       <span>${totalResources.goldButtons}</span>
//     </div>
//     <div class="resource-req-item">
//       <img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="resource-icon-img-small">
//       <span>${totalResources.colorBalls}</span>
//     </div>
//   `;

//   let searchedStatsHtml = "";
//   selectedStats.forEach((stat) => {
//     const statResults = results.filter((result) => result.statName === stat);
//     if (statResults.length > 0) {
//       searchedStatsHtml += `
//         <div class="searched-stat-item" onclick="highlightStatInResults('${stat}')">
//           <span class="searched-stat-name">${stat}</span>
//           <span class="searched-stat-value">+${statTotalMaxValues[stat]}</span>
//         </div>`;
//     }
//   });
//   searchedStatsContainer.innerHTML = searchedStatsHtml;

//   const groupedResults = {};
//   results.forEach((result) => {
//     if (!groupedResults[result.statName]) {
//       groupedResults[result.statName] = [];
//     }
//     groupedResults[result.statName].push(result);
//   });

//   let resultsHtml = "";
//   for (const [statName, statResults] of Object.entries(groupedResults)) {
//     resultsHtml += `<div class="compact-group" data-stat="${statName}">
//       <h4 class="compact-stat-title">
//         ${statName}
//         <span class="stat-info">
//           <span class="stat-count">(${statResults.length}곳)</span>
//           <span class="stat-total-value">최대 +${statTotalMaxValues[statName]}</span>
//         </span>
//       </h4>
//       <div class="compact-locations">`;

//     statResults.sort((a, b) => {
//       if (a.part !== b.part) {
//         return parts.indexOf(a.part) - parts.indexOf(b.part);
//       }
//       return (
//         parseInt(a.level.replace("+", "")) - parseInt(b.level.replace("+", ""))
//       );
//     });

//     statResults.forEach((loc) => {
//       let statusClass = "location-unused";
//       let statusText = "미개방";

//       if (loc.isUnlocked) {
//         statusText = `${loc.currentLevel}/3`;
//         statusClass =
//           loc.currentLevel === 3 ? "location-complete" : "location-partial";
//       }

//       resultsHtml += `
//         <div class="compact-location ${statusClass}"
//              onclick="selectStatFromSearch('${loc.part}', '${loc.level}')">
//           <div class="loc-header">
//             <span class="loc-part">${loc.part}</span>
//             <span class="loc-level">${loc.level}</span>
//           </div>
//           <div class="loc-details">
//             <span class="loc-max-value">+${loc.maxValue}</span>
//           </div>
//         </div>`;
//     });

//     resultsHtml += `</div></div>`;
//   }

//   resultsContainer.innerHTML = resultsHtml;
//   modal.style.display = "block";
// }

// function calculateTotalResourcesForSearch(results) {
//   const partGroups = {};
//   let totalGoldButtons = 0;
//   let totalColorBalls = 0;

//   results.forEach((result) => {
//     const key = `${result.part}_${result.level}`;
//     if (!partGroups[key]) {
//       partGroups[key] = [];
//     }
//     partGroups[key].push(result);
//   });

//   Object.values(partGroups).forEach((group) => {
//     let hasFirstUnlocked = false;

//     group.forEach((stat) => {
//       if (stat.isUnlocked) {
//         hasFirstUnlocked = true;
//       }
//     });

//     if (!hasFirstUnlocked && group.length > 0) {
//       totalColorBalls += 500;

//       if (group.length > 1) {
//         totalGoldButtons += (group.length - 1) * 500;
//         totalColorBalls += (group.length - 1) * 1400;
//       }
//     } else {
//       group.forEach((stat) => {
//         const resources = calculateResourcesForStat(stat);
//         totalGoldButtons += resources.goldButtons;
//         totalColorBalls += resources.colorBalls;
//       });
//     }
//   });

//   return {
//     goldButtons: totalGoldButtons,
//     colorBalls: totalColorBalls,
//   };
// }

// function calculateResourcesForStat(stat) {
//   const goldButtons = stat.isUnlocked ? 0 : 500;

//   let colorBalls = 0;
//   if (stat.isUnlocked) {
//     if (stat.currentLevel < 1) colorBalls += 500;
//     if (stat.currentLevel < 2) colorBalls += 500;
//     if (stat.currentLevel < 3) colorBalls += 500;
//   } else {
//     colorBalls = 500;
//   }

//   return {
//     goldButtons: goldButtons,
//     colorBalls: colorBalls,
//   };
// }

// function closeSearchResults() {
//   const modal = document.getElementById("search-results-modal");
//   if (modal) {
//     modal.style.display = "none";
//   }
// }

// function closeOptimizeResults() {
//   const modal = document.getElementById("optimize-results-modal");
//   if (modal) {
//     modal.style.display = "none";
//   }
//   optimizationPlan = null;
// }

// function highlightStatInResults(statName) {
//   const allGroups = document.querySelectorAll(".compact-group");
//   allGroups.forEach((group) => {
//     if (group.dataset.stat === statName) {
//       group.scrollIntoView({ behavior: "smooth", block: "start" });
//     }
//   });
// }

// function selectStatFromSearch(part, level) {
//   const partButtons = document.querySelectorAll(".equip-btn");
//   let partButton = null;

//   for (const btn of partButtons) {
//     if (btn.textContent === part) {
//       partButton = btn;
//       break;
//     }
//   }

//   if (partButton) {
//     selectedPart = part;
//     highlightSelection(equipmentContainer, partButton, "equip-btn");
//   }

//   const levelButtons = document.querySelectorAll(".level-btn");
//   let levelButton = null;

//   for (const btn of levelButtons) {
//     const levelText = btn.querySelector(".level-text");
//     if (levelText && levelText.textContent === level) {
//       levelButton = btn;
//       break;
//     }
//   }

//   if (levelButton) {
//     selectedLevel = level;
//     highlightSelection(levelContainer, levelButton, "level-btn");
//   }

//   renderStats();

//   closeSearchResults();
// }

// function initUI() {
//   const goldButtonInput = document.getElementById("gold-button");
//   const colorBallInput = document.getElementById("color-ball");

//   if (goldButtonInput) {
//     goldButtonInput.addEventListener("change", updateUserResources);
//     goldButtonInput.addEventListener("input", updateUserResources);
//     userInputGoldButtons = parseInt(goldButtonInput.value) || 10000;
//     userGoldButtons = userInputGoldButtons;
//   }

//   if (colorBallInput) {
//     colorBallInput.addEventListener("change", updateUserResources);
//     colorBallInput.addEventListener("input", updateUserResources);
//     userInputColorBalls = parseInt(colorBallInput.value) || 10000;
//     userColorBalls = userInputColorBalls;
//   }

//   const searchInput = document.getElementById("search-input");
//   if (searchInput) {
//     searchInput.addEventListener("click", function (e) {
//       e.stopPropagation();
//       toggleStatOptions(true);
//     });

//     searchInput.addEventListener("focus", function () {
//       toggleStatOptions(true);
//     });

//     searchInput.addEventListener("input", function () {
//       filterStatOptions(this.value);
//     });

//     searchInput.addEventListener("keydown", function (e) {
//       if (e.key === "Enter") {
//         e.preventDefault();
//         searchStats();
//       }
//     });
//   }

//   document.addEventListener("click", function (e) {
//     const statOptions = document.getElementById("stat-options");
//     const searchInput = document.getElementById("search-input");

//     if (statOptions && searchInput) {
//       if (!searchInput.contains(e.target) && !statOptions.contains(e.target)) {
//         toggleStatOptions(false);
//       }
//     }
//   });

//   updateResourceDisplay();
//   updateResourceSummary();

//   parts.forEach((part) => {
//     const btn = document.createElement("button");
//     btn.className = "selector-btn equip-btn";
//     btn.textContent = part;
//     btn.addEventListener("click", () => {
//       selectedPart = part;
//       highlightSelection(equipmentContainer, btn, "equip-btn");
//       renderStats();
//     });
//     equipmentContainer.appendChild(btn);

//     if (part === "투구") {
//       btn.classList.add("bg-sky-500", "text-white", "font-bold");
//     }
//   });

//   levels.forEach((level) => {
//     const btn = document.createElement("button");
//     btn.className = "selector-btn level-btn";

//     const levelText = document.createElement("div");
//     levelText.className = "level-text";
//     levelText.textContent = level;
//     btn.appendChild(levelText);

//     const progressContainer = document.createElement("div");
//     progressContainer.className = "level-progress-container";

//     const statusText = document.createElement("div");
//     statusText.className = "level-status";
//     statusText.textContent = "";

//     const progressBar = document.createElement("div");
//     progressBar.className = "level-progress-bar empty";
//     progressBar.style.width = "0%";

//     progressContainer.appendChild(statusText);
//     progressContainer.appendChild(progressBar);
//     btn.appendChild(progressContainer);

//     const dotsContainer = document.createElement("div");
//     dotsContainer.className = "progress-dots";

//     for (let i = 0; i < 4; i++) {
//       const dot = document.createElement("span");
//       dot.className = "progress-dot gray";
//       dotsContainer.appendChild(dot);
//     }

//     btn.appendChild(dotsContainer);

//     btn.addEventListener("click", () => {
//       selectedLevel = level;
//       highlightSelection(levelContainer, btn, "level-btn");
//       renderStats();
//     });
//     levelContainer.appendChild(btn);

//     if (level === "+9") {
//       btn.classList.add("bg-emerald-500", "text-white", "font-bold");
//     }
//   });
// }

// function handleStatButtonClick(card, button, statName, maxValue, cardId) {
//   let currentLevel = parseInt(card.dataset.cardLevel || "0");
//   let currentValue = parseInt(card.dataset.value || "0");
//   let isUnlocked = card.dataset.isUnlocked === "true";
//   let isFirst = card.dataset.isFirst === "true";

//   const valueDisplay = card.querySelector("p.value-display");
//   const progressDisplay = card.querySelector("p.progress-display");

//   const partLevelKey = `${card.dataset.part}_${card.dataset.level}`;

//   if (!isUnlocked) {
//     let requiredGold = 0;

//     if (!firstUnlockedMap[partLevelKey]) {
//       requiredGold = 0;
//       isFirst = true;
//     } else {
//       requiredGold = 500;
//       isFirst = false;
//     }

//     if (isFirst) {
//       userColorBalls -= 500;
//     } else {
//       userGoldButtons -= requiredGold;
//     }

//     isUnlocked = true;

//     if (!firstUnlockedMap[partLevelKey]) {
//       firstUnlockedMap[partLevelKey] = true;
//       button.innerHTML = `<img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="btn-icon"> <span>강화 500</span>`;
//       card.dataset.isFirst = "true";
//       card.dataset.isUnlocked = "true";

//       Array.from(document.querySelectorAll("#stats-display > div")).forEach(
//         (otherCard) => {
//           if (
//             otherCard !== card &&
//             otherCard.dataset.part === card.dataset.part &&
//             otherCard.dataset.level === card.dataset.level &&
//             otherCard.dataset.isUnlocked !== "true"
//           ) {
//             const otherButton = otherCard.querySelector(".action-btn");
//             if (otherButton) {
//               otherButton.innerHTML = `<img src="assets/img/gold-button.jpg" alt="황금단추" class="btn-icon"> <span>선택 500</span>`;
//             }
//           }
//         }
//       );
//     } else {
//       currentValue = Math.floor(maxValue / 15);
//       button.innerHTML = `<img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="btn-icon"> <span>강화 400</span>`;
//       card.dataset.isFirst = "false";
//       card.dataset.isUnlocked = "true";
//     }

//     card.dataset.cardLevel = currentLevel;
//     card.dataset.value = currentValue;

//     if (valueDisplay)
//       valueDisplay.textContent = `${currentValue} / ${maxValue}`;
//     if (progressDisplay)
//       progressDisplay.textContent = `강화 단계: ${currentLevel}/3`;

//     updateStatGlobalState(
//       cardId,
//       currentLevel,
//       currentValue,
//       isUnlocked,
//       isFirst,
//       card.dataset.part,
//       card.dataset.level,
//       statName,
//       maxValue
//     );
//     updateTotalStats();
//     updateStatCardStatus();
//     updateLevelButtonIndicators();
//     updateResourceSummary();
//     return;
//   }

//   if (currentLevel < 3) {
//     let requiredOrbs = 0;

//     if (isFirst) {
//       requiredOrbs = 500;
//     } else {
//       if (currentLevel === 0) {
//         requiredOrbs = 400;
//       } else {
//         requiredOrbs = 500;
//       }
//     }

//     userColorBalls -= requiredOrbs;

//     currentLevel++;

//     if (isFirst) {
//       currentValue = Math.floor((maxValue / 3) * currentLevel);
//     } else {
//       if (currentLevel === 1) {
//         const initial = Math.floor(maxValue / 15);
//         const diff = Math.floor(maxValue / 3) - initial;
//         currentValue = initial + diff;
//       } else {
//         currentValue += Math.floor(maxValue / 3);
//         if (currentValue > maxValue) currentValue = maxValue;
//       }
//     }

//     card.dataset.cardLevel = currentLevel;
//     card.dataset.value = currentValue;

//     if (valueDisplay)
//       valueDisplay.textContent = `${currentValue} / ${maxValue}`;
//     if (progressDisplay)
//       progressDisplay.textContent = `강화 단계: ${currentLevel}/3`;

//     if (currentLevel < 3) {
//       const nextOrbCost = currentLevel < 2 ? 500 : 500;
//       button.innerHTML = `<img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="btn-icon"> <span>강화 ${nextOrbCost}</span>`;
//     } else {
//       button.innerHTML = `<span>완료</span>`;
//       button.disabled = true;
//       button.classList.add("disabled-btn");
//     }

//     updateStatGlobalState(
//       cardId,
//       currentLevel,
//       currentValue,
//       isUnlocked,
//       isFirst,
//       card.dataset.part,
//       card.dataset.level,
//       statName,
//       maxValue
//     );
//     updateTotalStats();
//     updateStatCardStatus();
//     updateLevelButtonIndicators();
//     updateResourceSummary();

//     if (
//       document.getElementById("search-results-modal").style.display === "block"
//     ) {
//       showSearchResults();
//     }
//   }
// }

// function createStatCard(statName, maxValue, container, cardId, statIndex) {
//   const statState = globalStatState[cardId] || {
//     level: 0,
//     value: 0,
//     isUnlocked: false,
//     isFirst: false,
//     part: selectedPart,
//     partLevel: selectedLevel,
//     statName: statName,
//     maxValue: maxValue,
//   };

//   let currentLevel = statState.level;
//   let currentValue = statState.value;
//   let isUnlocked = statState.isUnlocked;
//   let isFirst = statState.isFirst;

//   const displayStatName = getDisplayStatName(statName);

//   const card = document.createElement("div");
//   card.className = "stat-card";
//   card.dataset.statName = statName;
//   card.dataset.displayStatName = displayStatName;
//   card.dataset.part = selectedPart;
//   card.dataset.level = selectedLevel;
//   card.dataset.cardId = cardId;
//   card.dataset.statIndex = statIndex || 0;

//   const cardHeader = document.createElement("div");
//   cardHeader.className = "card-header";
//   cardHeader.style.display = "flex";
//   cardHeader.style.justifyContent = "space-between";
//   cardHeader.style.alignItems = "center";

//   const title = document.createElement("h3");
//   title.className = "text-lg font-bold";
//   title.textContent = displayStatName;

//   const resetBtn = document.createElement("button");
//   resetBtn.innerHTML = "↻";
//   resetBtn.className = "redistribute-btn";
//   resetBtn.title = "능력치 재분배";

//   resetBtn.addEventListener("click", (e) => {
//     e.stopPropagation();
//     resetStat(cardId, card);
//   });

//   cardHeader.appendChild(title);
//   cardHeader.appendChild(resetBtn);

//   const valueDisplay = document.createElement("p");
//   valueDisplay.className = "value-display";
//   valueDisplay.textContent = `${currentValue} / ${maxValue}`;

//   const progressContainer = document.createElement("div");
//   progressContainer.className = "progress-container";

//   const progressDotsContainer = document.createElement("div");
//   progressDotsContainer.className = "progress-dots";

//   for (let i = 0; i < 3; i++) {
//     const dot = document.createElement("span");
//     dot.className = "progress-dot gray";

//     if (isUnlocked) {
//       if (i < currentLevel) {
//         dot.className = "progress-dot blue";
//       } else {
//         dot.className = "progress-dot yellow";
//       }
//     }

//     progressDotsContainer.appendChild(dot);
//   }

//   progressContainer.appendChild(progressDotsContainer);

//   const progressDisplay = document.createElement("p");
//   progressDisplay.className = "progress-display text-sm text-gray-600";
//   progressDisplay.textContent = `강화 단계: ${currentLevel}/3`;
//   progressContainer.appendChild(progressDisplay);

//   const actionButton = document.createElement("button");
//   actionButton.className = "action-btn";

//   const partLevelKey = `${selectedPart}_${selectedLevel}`;
//   const hasFirstUnlocked = firstUnlockedMap[partLevelKey] || false;

//   if (isUnlocked) {
//     if (currentLevel < 3) {
//       const orbCost = isFirst ? 500 : currentLevel === 0 ? 400 : 500;
//       actionButton.innerHTML = `<img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="btn-icon"> <span>강화 ${orbCost}</span>`;
//     } else {
//       actionButton.innerHTML = `<span>완료</span>`;
//       actionButton.disabled = true;
//       actionButton.classList.add("disabled-btn");
//     }
//   } else {
//     if (hasFirstUnlocked) {
//       actionButton.innerHTML = `<img src="assets/img/gold-button.jpg" alt="황금단추" class="btn-icon"> <span>선택 500</span>`;
//     } else {
//       actionButton.innerHTML = `<img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="btn-icon"> <span>선택 500</span>`;
//     }
//   }

//   actionButton.addEventListener("click", () => {
//     handleStatButtonClick(card, actionButton, statName, maxValue, cardId);
//   });

//   card.dataset.statName = statName;
//   card.dataset.maxValue = maxValue;
//   card.dataset.cardLevel = currentLevel;
//   card.dataset.value = currentValue;
//   card.dataset.isFirst = isFirst ? "true" : "false";
//   card.dataset.isUnlocked = isUnlocked ? "true" : "false";

//   card.appendChild(cardHeader);
//   card.appendChild(valueDisplay);
//   card.appendChild(progressContainer);
//   card.appendChild(actionButton);
//   container.appendChild(card);

//   return card;
// }

// function resetStat(cardId, card) {
//   const maxValue = parseInt(card.dataset.maxValue || "0");
//   const statName = card.dataset.statName;
//   const part = card.dataset.part;
//   const level = card.dataset.level;

//   const partLevelKey = `${part}_${level}`;
//   const isUnlocked = card.dataset.isUnlocked === "true";
//   const isFirst = card.dataset.isFirst === "true";
//   const currentLevel = parseInt(card.dataset.cardLevel || "0");

//   if (isFirst && isUnlocked) {
//     firstUnlockedMap[partLevelKey] = false;

//     if (currentLevel >= 1) userColorBalls += 500;
//     if (currentLevel >= 2) userColorBalls += 500;
//     if (currentLevel >= 3) userColorBalls += 500;
//   } else if (isUnlocked) {
//     userGoldButtons += 500;

//     if (currentLevel >= 1) userColorBalls += 400;
//     if (currentLevel >= 2) userColorBalls += 500;
//     if (currentLevel >= 3) userColorBalls += 500;
//   }

//   delete globalStatState[cardId];

//   card.dataset.cardLevel = "0";
//   card.dataset.value = "0";
//   card.dataset.isFirst = "false";
//   card.dataset.isUnlocked = "false";

//   const valueDisplay = card.querySelector("p.value-display");
//   if (valueDisplay) {
//     valueDisplay.textContent = `0 / ${maxValue}`;
//   }

//   const progressDisplay = card.querySelector("p.progress-display");
//   if (progressDisplay) {
//     progressDisplay.textContent = `강화 단계: 0/3`;
//   }

//   let hasFirstUnlockedInPartLevel = false;

//   document
//     .querySelectorAll(
//       `#stats-display > div[data-part="${part}"][data-level="${level}"]`
//     )
//     .forEach((otherCard) => {
//       if (
//         otherCard.dataset.isUnlocked === "true" &&
//         otherCard.dataset.isFirst === "true"
//       ) {
//         hasFirstUnlockedInPartLevel = true;
//       }
//     });

//   firstUnlockedMap[partLevelKey] = hasFirstUnlockedInPartLevel;

//   document
//     .querySelectorAll(
//       `#stats-display > div[data-part="${part}"][data-level="${level}"]`
//     )
//     .forEach((otherCard) => {
//       if (otherCard.dataset.isUnlocked !== "true") {
//         const otherButton = otherCard.querySelector(".action-btn");
//         if (otherButton) {
//           if (hasFirstUnlockedInPartLevel) {
//             otherButton.innerHTML = `<img src="assets/img/gold-button.jpg" alt="황금단추" class="btn-icon"> <span>선택 500</span>`;
//           } else {
//             otherButton.innerHTML = `<img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="btn-icon"> <span>선택 500</span>`;
//           }
//         }
//       }
//     });

//   const actionButton = card.querySelector(".action-btn");
//   if (actionButton) {
//     if (hasFirstUnlockedInPartLevel) {
//       actionButton.innerHTML = `<img src="assets/img/gold-button.jpg" alt="황금단추" class="btn-icon"> <span>선택 500</span>`;
//     } else {
//       actionButton.innerHTML = `<img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="btn-icon"> <span>선택 500</span>`;
//     }
//     actionButton.disabled = false;
//     actionButton.classList.remove("disabled-btn");
//   }

//   updateResourceDisplay();
//   updateTotalStats();
//   updateStatCardStatus();
//   updateLevelButtonIndicators();
//   updateResourceSummary();

//   if (
//     document.getElementById("search-results-modal").style.display === "block"
//   ) {
//     showSearchResults();
//   }
// }

// function updateStatGlobalState(
//   cardId,
//   level,
//   value,
//   isUnlocked,
//   isFirst,
//   part,
//   partLevel,
//   statName,
//   maxValue
// ) {
//   globalStatState[cardId] = {
//     level,
//     value,
//     isUnlocked,
//     isFirst,
//     part,
//     partLevel,
//     statName,
//     maxValue,
//   };
// }

// function updateTotalStats() {
//   const statTotals = {};
//   let totalProgress = 0;

//   Object.entries(globalStatState).forEach(([cardId, state]) => {
//     if (state.value > 0) {
//       const displayName = getDisplayStatName(state.statName);

//       if (!statTotals[displayName]) statTotals[displayName] = 0;
//       statTotals[displayName] += state.value;
//       totalProgress += state.level;
//     }
//   });

//   const resources = calculateResources();

//   updateSummary(totalProgress, statTotals, resources);
// }

// function calculateResources() {
//   let goldButtons = 0;
//   let colorBalls = 0;

//   const partLevelGroups = {};

//   Object.entries(globalStatState).forEach(([cardId, state]) => {
//     if (!state.isUnlocked) return;

//     const groupKey = `${state.part}_${state.partLevel}`;
//     if (!partLevelGroups[groupKey]) {
//       partLevelGroups[groupKey] = [];
//     }
//     partLevelGroups[groupKey].push(state);
//   });

//   Object.entries(partLevelGroups).forEach(([groupKey, states]) => {
//     const firstStat = states.find((s) => s.isFirst);

//     states.forEach((state) => {
//       if (state.isFirst) {
//         if (state.level >= 1) colorBalls += 500;
//         if (state.level >= 2) colorBalls += 500;
//         if (state.level >= 3) colorBalls += 500;
//       } else {
//         goldButtons += 500;

//         if (state.level >= 1) colorBalls += 400;
//         if (state.level >= 2) colorBalls += 500;
//         if (state.level >= 3) colorBalls += 500;
//       }
//     });
//   });

//   return { goldButtons, colorBalls };
// }

// function updateSummary(totalProgress, statTotals, resources) {
//   const summaryDisplay = document.getElementById("summary-display");
//   if (!summaryDisplay) return;

//   let statSummaryHTML = "";

//   const sortedStats = Object.entries(statTotals).sort((a, b) => b[1] - a[1]);

//   if (sortedStats.length > 0) {
//     statSummaryHTML += `<div class="stat-list">`;
//     for (const [stat, value] of sortedStats) {
//       if (value > 0) {
//         statSummaryHTML += `
//           <div class="stat-item">
//             <span class="stat-name">${stat}</span>
//             <span class="stat-value">+${value}</span>
//           </div>`;
//       }
//     }
//     statSummaryHTML += `</div>`;
//   } else {
//     statSummaryHTML = "<p>능력치가 개방되지 않았습니다.</p>";
//   }

//   summaryDisplay.innerHTML = `
//     <div class="summary-section">
//       ${statSummaryHTML}
//     </div>
//   `;
// }

// function optimizeStats(preset) {
//   let targetStats = [];
//   let presetName = "";

//   if (preset === "boss") {
//     targetStats = BOSS_STATS;
//     presetName = "보스용";
//   } else if (preset === "pvp") {
//     targetStats = PVP_STATS;
//     presetName = "PvP용";
//   } else {
//     alert("유효하지 않은 프리셋입니다.");
//     return;
//   }

//   showPresetSearchResults(presetName, targetStats);
// }

// function showPresetSearchResults(presetName, targetStats) {
//   const modal = document.getElementById("optimize-results-modal");
//   const titleElement = document.getElementById("optimize-title");
//   const descriptionElement = document.getElementById("optimize-description");
//   const resultsContainer = document.getElementById("optimize-results");

//   if (!modal || !resultsContainer) return;

//   titleElement.textContent = `${presetName} 능력치 조합`;

//   let results = [];
//   const statMaxValues = {};

//   targetStats.forEach((searchStat) => {
//     statMaxValues[searchStat] = 0;

//     for (const part of parts) {
//       const basePart = getBasePartName(part);
//       if (!equipmentData[basePart]) continue;

//       for (const level of levels) {
//         const key = `lv${level.replace("+", "")}`;
//         if (!equipmentData[basePart][key]) continue;

//         const stats = Object.entries(equipmentData[basePart][key]);
//         for (const [statName, maxValue] of stats) {
//           const displayName = getDisplayStatName(statName);
//           if (displayName === searchStat) {
//             const cardId = `${statName}_${part}_${level}_0`;

//             const isUnlocked = globalStatState[cardId]?.isUnlocked || false;
//             const currentLevel = globalStatState[cardId]?.level || 0;

//             statMaxValues[searchStat] += maxValue;

//             results.push({
//               part: part,
//               level: level,
//               statName: displayName,
//               maxValue: maxValue,
//               cardId: cardId,
//               isUnlocked: isUnlocked,
//               currentLevel: currentLevel,
//             });
//           }
//         }
//       }
//     }
//   });

//   if (results.length === 0) {
//     resultsContainer.innerHTML = `<div class="no-results">일치하는 능력치가 없습니다.</div>`;
//     modal.style.display = "block";
//     return;
//   }

//   const totalResources = calculateTotalResourcesForPreset(results);

//   let description = `
//     <div class="preset-summary">
//       <div class="preset-header">
//         <h4>${presetName} 조합 추천 능력치</h4>
//         <div class="preset-stats">
//           ${targetStats
//             .map((stat) => {
//               return `<span class="priority-stat">${stat} <strong>최대 +${statMaxValues[stat]}</strong></span>`;
//             })
//             .join("")}
//         </div>
//       </div>
//       <div class="preset-resources">
//         <div class="resource-req-title">모든 능력치 최대 강화 시 필요 자원:</div>
//         <div class="resource-req-items">
//           <div class="resource-req-item">
//             <img src="assets/img/gold-button.jpg" alt="황금단추" class="resource-icon-img-small">
//             <span>${totalResources.goldButtons}</span>
//           </div>
//           <div class="resource-req-item">
//             <img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="resource-icon-img-small">
//             <span>${totalResources.colorBalls}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   `;
//   descriptionElement.innerHTML = description;

//   const groupedByStats = {};
//   results.forEach((result) => {
//     if (!groupedByStats[result.statName]) {
//       groupedByStats[result.statName] = [];
//     }
//     groupedByStats[result.statName].push(result);
//   });

//   let html = `<div class="compact-results">`;

//   for (const [statName, statResults] of Object.entries(groupedByStats)) {
//     html += `<div class="compact-group">
//       <h4 class="compact-stat-title">
//         ${statName}
//         <span class="stat-info">
//           <span class="stat-count">(${statResults.length}곳)</span>
//           <span class="stat-total-value">최대 +${statMaxValues[statName]}</span>
//         </span>
//       </h4>
//       <div class="compact-locations">`;

//     statResults.sort((a, b) => {
//       if (a.part !== b.part) {
//         return parts.indexOf(a.part) - parts.indexOf(b.part);
//       }
//       return (
//         parseInt(a.level.replace("+", "")) - parseInt(b.level.replace("+", ""))
//       );
//     });

//     statResults.forEach((loc) => {
//       let statusClass = "location-unused";
//       let statusText = "미개방";

//       if (loc.isUnlocked) {
//         statusText = `${loc.currentLevel}/3`;
//         statusClass =
//           loc.currentLevel === 3 ? "location-complete" : "location-partial";
//       }

//       html += `
//         <div class="compact-location ${statusClass}"
//             onclick="selectStatFromPreset('${loc.part}', '${loc.level}')">
//           <div class="loc-header">
//             <span class="loc-part">${loc.part}</span>
//             <span class="loc-level">${loc.level}</span>
//           </div>
//           <div class="loc-details">
//             <span class="loc-max-value">+${loc.maxValue}</span>
//           </div>
//         </div>`;
//     });

//     html += `</div></div>`;
//   }

//   html += `</div>`;

//   resultsContainer.innerHTML = html;

//   const applyBtn = document.querySelector(".apply-btn");
//   if (applyBtn) {
//     applyBtn.textContent = "창 닫기";
//     applyBtn.onclick = closeOptimizeResults;
//   }

//   modal.style.display = "block";
// }

// function calculateTotalResourcesForPreset(results) {
//   const partGroups = {};
//   let totalGoldButtons = 0;
//   let totalColorBalls = 0;

//   results.forEach((result) => {
//     const key = `${result.part}_${result.level}`;
//     if (!partGroups[key]) {
//       partGroups[key] = [];
//     }
//     partGroups[key].push(result);
//   });

//   Object.values(partGroups).forEach((group) => {
//     let hasFirstUnlocked = false;

//     group.forEach((stat) => {
//       if (stat.isUnlocked) {
//         hasFirstUnlocked = true;
//       }
//     });

//     if (!hasFirstUnlocked && group.length > 0) {
//       totalColorBalls += 500;

//       if (group.length > 1) {
//         totalGoldButtons += (group.length - 1) * 500;
//         totalColorBalls += (group.length - 1) * 1400;
//       }
//     } else {
//       group.forEach((stat) => {
//         const resources = calculateResourcesForStat(stat);
//         totalGoldButtons += resources.goldButtons;
//         totalColorBalls += resources.colorBalls;
//       });
//     }
//   });

//   return {
//     goldButtons: totalGoldButtons,
//     colorBalls: totalColorBalls,
//   };
// }

// function selectStatFromPreset(part, level) {
//   selectStatFromSearch(part, level);
//   closeOptimizeResults();
// }

// function applyOptimization() {
//   closeOptimizeResults();
// }

// function resetAllStats() {
//   Object.keys(globalStatState).forEach((cardId) => {
//     delete globalStatState[cardId];
//   });

//   Object.keys(firstUnlockedMap).forEach((key) => {
//     firstUnlockedMap[key] = false;
//   });
// }

// function applyStat(cardId, levelToReach, isFirst) {
//   const [statName, part, level, index] = cardId.split("_");
//   const basePart = getBasePartName(part);
//   const key = `lv${level.replace("+", "")}`;

//   if (
//     !equipmentData[basePart] ||
//     !equipmentData[basePart][key] ||
//     !equipmentData[basePart][key][statName]
//   ) {
//     return;
//   }

//   const maxValue = equipmentData[basePart][key][statName];
//   const partLevelKey = `${part}_${level}`;

//   if (isFirst) {
//     firstUnlockedMap[partLevelKey] = true;
//   }

//   let value = 0;

//   if (levelToReach === 0) {
//     value = 0;
//   } else if (isFirst) {
//     value = Math.floor((maxValue / 3) * levelToReach);
//   } else {
//     if (levelToReach === 1) {
//       const initial = Math.floor(maxValue / 15);
//       const diff = Math.floor(maxValue / 3) - initial;
//       value = initial + diff;
//     } else {
//       value = Math.min(
//         maxValue,
//         Math.floor(maxValue / 15) +
//           Math.floor(maxValue / 3) * (levelToReach - 1)
//       );
//     }
//   }

//   globalStatState[cardId] = {
//     level: levelToReach,
//     value: value,
//     isUnlocked: true,
//     isFirst: isFirst,
//     part: part,
//     partLevel: level,
//     statName: statName,
//     maxValue: maxValue,
//   };
// }

// function openTab(name) {
//   alert(`"${name}" 탭은 구현되지 않았습니다.\n필요 시 페이지를 연결하세요.`);
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const goldButtonInput = document.getElementById("gold-button");
//   const colorBallInput = document.getElementById("color-ball");

//   if (goldButtonInput) {
//     goldButtonInput.addEventListener("change", updateUserResources);
//     goldButtonInput.addEventListener("input", updateUserResources);
//     userInputGoldButtons = parseInt(goldButtonInput.value) || 10000;
//     userGoldButtons = userInputGoldButtons;
//   }

//   if (colorBallInput) {
//     colorBallInput.addEventListener("change", updateUserResources);
//     colorBallInput.addEventListener("input", updateUserResources);
//     userInputColorBalls = parseInt(colorBallInput.value) || 10000;
//     userColorBalls = userInputColorBalls;
//   }

//   const searchInput = document.getElementById("search-input");
//   if (searchInput) {
//     searchInput.addEventListener("click", function (e) {
//       e.stopPropagation();
//       toggleStatOptions(true);
//     });

//     searchInput.addEventListener("focus", function () {
//       toggleStatOptions(true);
//     });

//     searchInput.addEventListener("input", function () {
//       filterStatOptions(this.value);
//     });

//     searchInput.addEventListener("keydown", function (e) {
//       if (e.key === "Enter") {
//         e.preventDefault();
//         searchStats();
//       }
//     });
//   }

//   document.addEventListener("click", function (e) {
//     const statOptions = document.getElementById("stat-options");
//     const searchInput = document.getElementById("search-input");

//     if (statOptions && searchInput) {
//       if (!searchInput.contains(e.target) && !statOptions.contains(e.target)) {
//         toggleStatOptions(false);
//       }
//     }
//   });
// });

// document.addEventListener("touchstart", function () {}, { passive: true });

// fetch("output/chak.json")
//   .then((response) => {
//     if (!response.ok) throw new Error("데이터를 불러오는 데 실패했습니다.");
//     return response.json();
//   })
//   .then((data) => {
//     equipmentData = data;
//     allAvailableStats = collectAllStatNames();
//     initUI();
//     populateStatOptions();
//     renderStats();
//     updateResourceSummary();
//   })
//   .catch((error) => {
//     if (statsContainer) {
//       statsContainer.innerHTML = `<p class="text-red-500">${error.message}</p>`;
//     }
//   });

const parts = [
  "투구",
  "무기",
  "방패",
  "의상",
  "망토",
  "신발",
  "목걸이",
  "반지",
  "반지",
  "보조",
  "보조",
];
const levels = Array.from({ length: 12 }, (_, i) => `+${9 + i}`);

const equipmentContainer = document.getElementById("equipment-selector");
const levelContainer = document.getElementById("level-selector");
const statsContainer = document.getElementById("stats-display");

let selectedPart = "투구";
let selectedLevel = "+9";
let equipmentData = {};
let isInitialLoad = true;

let userInputGoldButtons = 10000;
let userInputColorBalls = 10000;
let userGoldButtons = 10000;
let userColorBalls = 10000;

let firstUnlockedMap = {};
let globalStatState = {};
let allAvailableStats = [];
let selectedStats = [];
let optimizationPlan = null;

const BOSS_STATS = ["피해저항관통", "보스몬스터추가피해", "치명위력%"];
const PVP_STATS = [
  "피해저항관통",
  "피해저항",
  "대인방어",
  "대인피해",
  "상태이상저항",
  "상태이상적중",
  "대인방어%",
  "대인피해%",
];

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWBbe8carOdeIzP6hQsarDOz5H0TuEj9A",
  authDomain: "baram-yeon.firebaseapp.com",
  projectId: "baram-yeon",
  storageBucket: "baram-yeon.firebasestorage.app",
  messagingSenderId: "924298156656",
  appId: "1:924298156656:web:845c94e771625fbd24b2b5",
  measurementId: "G-F2BT2T7HCL",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function getCachedData(key, fetchFunction, expiryHours = 24) {
  const cachedData = localStorage.getItem(key);
  const cachedTime = localStorage.getItem(`${key}_time`);

  const now = new Date().getTime();
  const expiryTime = expiryHours * 60 * 60 * 1000;

  if (cachedData && cachedTime && now - parseInt(cachedTime) < expiryTime) {
    return JSON.parse(cachedData);
  }

  const freshData = await fetchFunction();

  localStorage.setItem(key, JSON.stringify(freshData));
  localStorage.setItem(`${key}_time`, now.toString());

  return freshData;
}

async function getFirestoreDocument(fileName) {
  try {
    const documentMap = {
      "chak.json": "data-1744943781291",
      "factionSetEffects.json": "data-1744943824244",
      "gradeSetEffects.json": "data-1744943824244",
    };

    const docId = documentMap[fileName];

    if (!docId) {
      throw new Error(`No mapping for ${fileName}`);
    }

    const docRef = await db.collection("jsonData").doc(docId).get();

    if (!docRef.exists) {
      throw new Error(`Document ${docId} not found`);
    }

    const data = docRef.data();

    if (!data) {
      throw new Error(`Document ${docId} exists but has no data`);
    }

    return data;
  } catch (error) {
    console.error(`Firestore error for ${fileName}:`, error);
    const response = await fetch(`output/${fileName}`);
    return await response.json();
  }
}

function getDisplayStatName(statName) {
  return statName.replace(/\d+$/, "");
}

function updateUserResources() {
  userInputGoldButtons =
    parseInt(document.getElementById("gold-button").value) || 0;
  userInputColorBalls =
    parseInt(document.getElementById("color-ball").value) || 0;

  userGoldButtons = userInputGoldButtons;
  userColorBalls = userInputColorBalls;

  updateResourceSummary();
}

function updateResourceDisplay() {
  const goldButtonDisplay = document.getElementById("gold-button");
  const colorBallDisplay = document.getElementById("color-ball");

  if (goldButtonDisplay) goldButtonDisplay.value = userInputGoldButtons;
  if (colorBallDisplay) colorBallDisplay.value = userInputColorBalls;
}

function updateResourceSummary() {
  const resourceSummary = document.getElementById("resource-summary");
  if (!resourceSummary) return;

  const resources = calculateResources();

  const goldButtonClass =
    userGoldButtons < 0 ? "resource-negative" : "resource-value";
  const colorBallClass =
    userColorBalls < 0 ? "resource-negative" : "resource-value";

  let html = `
    <div class="resource-summary-item">
      <img src="assets/img/gold-button.jpg" alt="황금단추" class="resource-icon-img">
      <span class="resource-details">
        <span class="${goldButtonClass}">${userGoldButtons}</span> 보유
        / <span class="resource-value">${resources.goldButtons}</span> 소모
      </span>
    </div>
    <div class="resource-summary-item">
      <img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="resource-icon-img">
      <span class="resource-details">
        <span class="${colorBallClass}">${userColorBalls}</span> 보유
        / <span class="resource-value">${resources.colorBalls}</span> 소모
      </span>
    </div>
  `;

  if (userGoldButtons < 0 || userColorBalls < 0) {
    html += `<div class="resource-needed">`;

    if (userGoldButtons < 0) {
      html += `<div class="needed-item">
        <img src="assets/img/gold-button.jpg" alt="황금단추" class="resource-icon-img">
        <span class="resource-negative">${Math.abs(
          userGoldButtons
        )}</span> 추가 필요
      </div>`;
    }

    if (userColorBalls < 0) {
      html += `<div class="needed-item">
        <img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="resource-icon-img">
        <span class="resource-negative">${Math.abs(
          userColorBalls
        )}</span> 추가 필요
      </div>`;
    }

    html += `</div>`;
  }

  resourceSummary.innerHTML = html;
}

function highlightSelection(container, selectedBtn, typeClass) {
  Array.from(container.children).forEach((btn) => {
    if (typeClass === "equip-btn") {
      btn.classList.remove("bg-sky-500", "text-white", "font-bold");
    } else if (typeClass === "level-btn") {
      btn.classList.remove("bg-emerald-500", "text-white", "font-bold");
    }
  });

  if (typeClass === "equip-btn") {
    selectedBtn.classList.add("bg-sky-500", "text-white", "font-bold");
  } else if (typeClass === "level-btn") {
    selectedBtn.classList.add("bg-emerald-500", "text-white", "font-bold");
  }

  updateLevelButtonIndicators();
  updateStatCardStatus();
}

function getBasePartName(part) {
  return part.startsWith("반지") ? "반지" : part;
}

function renderStatCards(stats, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const displayedCards = new Set();

  stats.forEach(([statName, maxValue], index) => {
    const cardId = `${statName}_${selectedPart}_${selectedLevel}_${index}`;
    displayedCards.add(cardId);

    let card = document.querySelector(`[data-card-id="${cardId}"]`);

    if (!card) {
      card = createStatCard(statName, maxValue, container, cardId, index);
    }

    card.style.display = "flex";
  });

  Array.from(container.children).forEach((card) => {
    if (!displayedCards.has(card.dataset.cardId)) {
      card.style.display = "none";
    }
  });

  updateButtonStates();
  updateStatCardStatus();
  updateLevelButtonIndicators();
}

function updateButtonStates() {
  const partLevelKey = `${selectedPart}_${selectedLevel}`;
  const hasFirstUnlocked = firstUnlockedMap[partLevelKey] || false;

  const visibleCards = Array.from(
    document.querySelectorAll("#stats-display > div")
  ).filter((card) => card.style.display !== "none");

  visibleCards.forEach((card) => {
    if (card.dataset.isUnlocked !== "true") {
      const button = card.querySelector(".action-btn");
      if (button) {
        if (hasFirstUnlocked) {
          button.innerHTML = `<img src="assets/img/gold-button.jpg" alt="황금단추" class="btn-icon"> <span>선택 500</span>`;
        } else {
          button.innerHTML = `<img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="btn-icon"> <span>선택 500</span>`;
        }
      }
    } else {
      const button = card.querySelector(".action-btn");
      if (button) {
        const level = parseInt(card.dataset.cardLevel || "0");
        if (level < 3) {
          const orbCost =
            card.dataset.isFirst === "true" ? 500 : level === 0 ? 400 : 500;
          button.innerHTML = `<img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="btn-icon"> <span>강화 ${orbCost}</span>`;
        } else {
          button.innerHTML = `<span>완료</span>`;
          button.disabled = true;
          button.classList.add("disabled-btn");
        }
      }
    }
  });
}

function updateStatCardStatus() {
  document.querySelectorAll(".stat-card").forEach((card) => {
    const isUnlocked = card.dataset.isUnlocked === "true";
    const level = parseInt(card.dataset.cardLevel || "0");
    const progressDots = card.querySelectorAll(".progress-dot");

    if (progressDots.length > 0) {
      progressDots.forEach((dot, index) => {
        dot.className = "progress-dot gray";

        if (isUnlocked) {
          if (index < level) {
            dot.className = "progress-dot blue";
          } else {
            dot.className = "progress-dot yellow";
          }
        }
      });
    }
  });
}

function getStatsForPartAndLevel(part, level) {
  const result = [];
  const basePart = getBasePartName(part);
  const key = `lv${level.replace("+", "")}`;

  if (equipmentData[basePart] && equipmentData[basePart][key]) {
    const stats = Object.entries(equipmentData[basePart][key]);

    stats.forEach(([statName, maxValue], index) => {
      const cardId = `${statName}_${part}_${level}_${index}`;
      const displayName = getDisplayStatName(statName);

      const statState = globalStatState[cardId] || {
        level: 0,
        value: 0,
        isUnlocked: false,
        isFirst: false,
        part: part,
        partLevel: level,
        statName: statName,
        maxValue: maxValue,
      };

      result.push({
        name: displayName,
        originalName: statName,
        maxValue: maxValue,
        state: statState,
        index: index,
      });
    });
  }

  return result;
}

function updateLevelButtonIndicators() {
  if (!selectedPart) return;

  parts.forEach((part) => {
    if (part === selectedPart) {
      levels.forEach((level) => {
        const stats = getStatsForPartAndLevel(part, level);

        if (stats.length === 0) return;

        const levelButtons = levelContainer.querySelectorAll(".level-btn");
        levelButtons.forEach((btn) => {
          const levelText = btn.querySelector(".level-text").textContent;

          if (levelText === level) {
            const dotsContainer = btn.querySelector(".progress-dots");
            if (dotsContainer) {
              dotsContainer.innerHTML = "";

              const maxDots = Math.min(4, stats.length);

              for (let i = 0; i < maxDots; i++) {
                const dot = document.createElement("span");
                const statState = stats[i].state;

                if (statState.isUnlocked) {
                  if (statState.level === 3) {
                    dot.className = "progress-dot blue";
                  } else {
                    dot.className = "progress-dot yellow";
                  }
                } else {
                  dot.className = "progress-dot gray";
                }

                dotsContainer.appendChild(dot);
              }
            }

            updateLevelProgressBar(btn, stats);
          }
        });
      });
    }
  });
}

function updateLevelProgressBar(btn, stats) {
  const progressBar = btn.querySelector(".level-progress-bar");
  const statusText = btn.querySelector(".level-status");

  if (!progressBar || !statusText) return;

  let totalPoints = 0;
  let totalMaxPoints = stats.length * 3;
  let unlockedCount = 0;

  stats.forEach((stat) => {
    if (stat.state.isUnlocked) {
      totalPoints += stat.state.level;
      unlockedCount++;
    }
  });

  const percent =
    totalMaxPoints > 0 ? Math.round((totalPoints / totalMaxPoints) * 100) : 0;
  progressBar.style.width = `${percent}%`;

  if (percent === 0) {
    progressBar.classList.remove("partial", "complete");
    progressBar.classList.add("empty");
  } else if (percent < 100) {
    progressBar.classList.remove("empty", "complete");
    progressBar.classList.add("partial");
  } else {
    progressBar.classList.remove("empty", "partial");
    progressBar.classList.add("complete");
  }

  if (unlockedCount > 0) {
    statusText.textContent = `${unlockedCount}/${stats.length} (${percent}%)`;
  } else {
    statusText.textContent = "";
  }
}

function renderStats() {
  if (!selectedPart || !selectedLevel) return;

  const basePart = getBasePartName(selectedPart);
  const key = `lv${selectedLevel.replace("+", "")}`;
  const partStats = equipmentData[basePart];

  if (!partStats || !partStats[key]) {
    document.querySelectorAll("#stats-display > div").forEach((card) => {
      card.style.display = "none";
    });
    return;
  }

  const stats = Object.entries(partStats[key]);
  renderStatCards(stats, "stats-display");

  if (isInitialLoad) {
    isInitialLoad = false;
  } else {
    updateTotalStats();
  }

  updateLevelButtonIndicators();
  updateResourceSummary();
}

function collectAllStatNames() {
  const stats = new Set();

  for (const partName in equipmentData) {
    for (const levelKey in equipmentData[partName]) {
      for (const statName in equipmentData[partName][levelKey]) {
        const displayName = getDisplayStatName(statName);
        stats.add(displayName);
      }
    }
  }

  return Array.from(stats).sort();
}

function populateStatOptions() {
  const optionsContainer = document.getElementById("stat-options");
  if (!optionsContainer) return;

  optionsContainer.innerHTML = "";

  allAvailableStats.forEach((stat) => {
    const option = document.createElement("div");
    option.className = "stat-option";
    option.textContent = stat;
    option.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleStatSelection(stat);
    });
    optionsContainer.appendChild(option);
  });
}

function toggleStatSelection(stat) {
  const index = selectedStats.indexOf(stat);

  if (index === -1) {
    selectedStats.push(stat);
  } else {
    selectedStats.splice(index, 1);
  }

  updateSelectedStatsDisplay();
  toggleStatOptions(false);
}

function updateSelectedStatsDisplay() {
  const container = document.getElementById("selected-stats");
  if (!container) return;

  container.innerHTML = "";

  selectedStats.forEach((stat) => {
    const chip = document.createElement("div");
    chip.className = "stat-chip";
    chip.innerHTML = `${stat} <span class="remove-stat" onclick="removeSelectedStat('${stat}')">×</span>`;
    container.appendChild(chip);
  });
}

function removeSelectedStat(stat) {
  const index = selectedStats.indexOf(stat);
  if (index !== -1) {
    selectedStats.splice(index, 1);
  }
  updateSelectedStatsDisplay();
}

function filterStatOptions(filterText) {
  const statOptions = document.getElementById("stat-options");
  const options = statOptions.querySelectorAll(".stat-option");

  filterText = filterText.toLowerCase();
  let visibleCount = 0;

  options.forEach((option) => {
    const text = option.textContent.toLowerCase();
    const isVisible = text.includes(filterText);

    option.style.display = isVisible ? "flex" : "none";
    if (isVisible) visibleCount++;
  });

  const noMatches = statOptions.querySelector(".no-matches");
  if (visibleCount === 0) {
    if (!noMatches) {
      const noMatchesElement = document.createElement("div");
      noMatchesElement.className = "no-matches";
      noMatchesElement.textContent = "일치하는 항목 없음";
      statOptions.appendChild(noMatchesElement);
    }
  } else {
    if (noMatches) noMatches.remove();
  }

  toggleStatOptions(true);
}

function toggleStatOptions(show) {
  const statOptions = document.getElementById("stat-options");
  if (statOptions) {
    statOptions.style.display = show ? "block" : "none";

    if (show) {
      statOptions.scrollTop = 0;
    }
  }
}

function searchStats() {
  const input = document.getElementById("search-input");
  const searchText = input.value.trim().toLowerCase();

  if (!searchText && selectedStats.length === 0) {
    alert("검색어를 입력하거나 능력치를 선택해주세요.");
    return;
  }

  if (searchText) {
    const matchingStats = allAvailableStats.filter((stat) =>
      stat.toLowerCase().includes(searchText)
    );

    if (matchingStats.length === 0) {
      alert("일치하는 능력치가 없습니다.");
      return;
    }

    matchingStats.forEach((stat) => {
      if (!selectedStats.includes(stat)) {
        selectedStats.push(stat);
      }
    });

    updateSelectedStatsDisplay();
    input.value = "";
  }

  showSearchResults();
  toggleStatOptions(false);
}

function showSearchResults() {
  if (selectedStats.length === 0) {
    alert("검색할 능력치를 선택해주세요.");
    return;
  }

  const modal = document.getElementById("search-results-modal");
  const resultsContainer = document.getElementById("search-results");
  const summaryStatsContainer = document.getElementById("search-summary-stats");
  const resourceRequirementContainer = document.getElementById(
    "search-resource-requirement"
  );
  const searchedStatsContainer = document.getElementById("searched-stats-list");

  if (
    !modal ||
    !resultsContainer ||
    !summaryStatsContainer ||
    !resourceRequirementContainer ||
    !searchedStatsContainer
  )
    return;

  let results = [];
  const statTotalMaxValues = {};

  selectedStats.forEach((searchStat) => {
    statTotalMaxValues[searchStat] = 0;

    for (const part of parts) {
      const basePart = getBasePartName(part);
      if (!equipmentData[basePart]) continue;

      for (const level of levels) {
        const key = `lv${level.replace("+", "")}`;
        if (!equipmentData[basePart][key]) continue;

        const stats = Object.entries(equipmentData[basePart][key]);
        for (const [statName, maxValue] of stats) {
          const displayName = getDisplayStatName(statName);
          if (displayName === searchStat) {
            const cardId = `${statName}_${part}_${level}_0`;
            const isUnlocked = globalStatState[cardId]?.isUnlocked || false;
            const currentLevel = globalStatState[cardId]?.level || 0;

            statTotalMaxValues[searchStat] += maxValue;

            results.push({
              part: part,
              level: level,
              statName: displayName,
              maxValue: maxValue,
              cardId: cardId,
              isUnlocked: isUnlocked,
              currentLevel: currentLevel,
            });
          }
        }
      }
    }
  });

  if (results.length === 0) {
    resultsContainer.innerHTML = `<div class="no-results">검색 결과가 없습니다.</div>`;
    modal.style.display = "block";
    return;
  }

  const totalResources = calculateTotalResourcesForSearch(results);

  let summaryStatsHtml = "";
  selectedStats.forEach((stat) => {
    const totalMaxValue = statTotalMaxValues[stat] || 0;
    summaryStatsHtml += `<span class="summary-stat-badge">${stat} <strong>최대 +${totalMaxValue}</strong></span>`;
  });
  summaryStatsContainer.innerHTML = summaryStatsHtml;

  resourceRequirementContainer.innerHTML = `
    <div class="resource-req-item">
      <img src="assets/img/gold-button.jpg" alt="황금단추" class="resource-icon-img-small">
      <span>${totalResources.goldButtons}</span>
    </div>
    <div class="resource-req-item">
      <img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="resource-icon-img-small">
      <span>${totalResources.colorBalls}</span>
    </div>
  `;

  let searchedStatsHtml = "";
  selectedStats.forEach((stat) => {
    const statResults = results.filter((result) => result.statName === stat);
    if (statResults.length > 0) {
      searchedStatsHtml += `
        <div class="searched-stat-item" onclick="highlightStatInResults('${stat}')">
          <span class="searched-stat-name">${stat}</span>
          <span class="searched-stat-value">+${statTotalMaxValues[stat]}</span>
        </div>`;
    }
  });
  searchedStatsContainer.innerHTML = searchedStatsHtml;

  const groupedResults = {};
  results.forEach((result) => {
    if (!groupedResults[result.statName]) {
      groupedResults[result.statName] = [];
    }
    groupedResults[result.statName].push(result);
  });

  let resultsHtml = "";
  for (const [statName, statResults] of Object.entries(groupedResults)) {
    resultsHtml += `<div class="compact-group" data-stat="${statName}">
      <h4 class="compact-stat-title">
        ${statName} 
        <span class="stat-info">
          <span class="stat-count">(${statResults.length}곳)</span>
          <span class="stat-total-value">최대 +${statTotalMaxValues[statName]}</span>
        </span>
      </h4>
      <div class="compact-locations">`;

    statResults.sort((a, b) => {
      if (a.part !== b.part) {
        return parts.indexOf(a.part) - parts.indexOf(b.part);
      }
      return (
        parseInt(a.level.replace("+", "")) - parseInt(b.level.replace("+", ""))
      );
    });

    statResults.forEach((loc) => {
      let statusClass = "location-unused";
      let statusText = "미개방";

      if (loc.isUnlocked) {
        statusText = `${loc.currentLevel}/3`;
        statusClass =
          loc.currentLevel === 3 ? "location-complete" : "location-partial";
      }

      resultsHtml += `
        <div class="compact-location ${statusClass}" 
             onclick="selectStatFromSearch('${loc.part}', '${loc.level}')">
          <div class="loc-header">
            <span class="loc-part">${loc.part}</span>
            <span class="loc-level">${loc.level}</span>
          </div>
          <div class="loc-details">
            <span class="loc-max-value">+${loc.maxValue}</span>
          </div>
        </div>`;
    });

    resultsHtml += `</div></div>`;
  }

  resultsContainer.innerHTML = resultsHtml;
  modal.style.display = "block";
}

function calculateTotalResourcesForSearch(results) {
  const partGroups = {};
  let totalGoldButtons = 0;
  let totalColorBalls = 0;

  results.forEach((result) => {
    const key = `${result.part}_${result.level}`;
    if (!partGroups[key]) {
      partGroups[key] = [];
    }
    partGroups[key].push(result);
  });

  Object.values(partGroups).forEach((group) => {
    let hasFirstUnlocked = false;

    group.forEach((stat) => {
      if (stat.isUnlocked) {
        hasFirstUnlocked = true;
      }
    });

    if (!hasFirstUnlocked && group.length > 0) {
      totalColorBalls += 500;

      if (group.length > 1) {
        totalGoldButtons += (group.length - 1) * 500;
        totalColorBalls += (group.length - 1) * 1400;
      }
    } else {
      group.forEach((stat) => {
        const resources = calculateResourcesForStat(stat);
        totalGoldButtons += resources.goldButtons;
        totalColorBalls += resources.colorBalls;
      });
    }
  });

  return {
    goldButtons: totalGoldButtons,
    colorBalls: totalColorBalls,
  };
}

function calculateResourcesForStat(stat) {
  const goldButtons = stat.isUnlocked ? 0 : 500;

  let colorBalls = 0;
  if (stat.isUnlocked) {
    if (stat.currentLevel < 1) colorBalls += 500;
    if (stat.currentLevel < 2) colorBalls += 500;
    if (stat.currentLevel < 3) colorBalls += 500;
  } else {
    colorBalls = 500;
  }

  return {
    goldButtons: goldButtons,
    colorBalls: colorBalls,
  };
}

function closeSearchResults() {
  const modal = document.getElementById("search-results-modal");
  if (modal) {
    modal.style.display = "none";
  }
}

function closeOptimizeResults() {
  const modal = document.getElementById("optimize-results-modal");
  if (modal) {
    modal.style.display = "none";
  }
  optimizationPlan = null;
}

function highlightStatInResults(statName) {
  const allGroups = document.querySelectorAll(".compact-group");
  allGroups.forEach((group) => {
    if (group.dataset.stat === statName) {
      group.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

function selectStatFromSearch(part, level) {
  const partButtons = document.querySelectorAll(".equip-btn");
  let partButton = null;

  for (const btn of partButtons) {
    if (btn.textContent === part) {
      partButton = btn;
      break;
    }
  }

  if (partButton) {
    selectedPart = part;
    highlightSelection(equipmentContainer, partButton, "equip-btn");
  }

  const levelButtons = document.querySelectorAll(".level-btn");
  let levelButton = null;

  for (const btn of levelButtons) {
    const levelText = btn.querySelector(".level-text");
    if (levelText && levelText.textContent === level) {
      levelButton = btn;
      break;
    }
  }

  if (levelButton) {
    selectedLevel = level;
    highlightSelection(levelContainer, levelButton, "level-btn");
  }

  renderStats();

  closeSearchResults();
}

function initUI() {
  const goldButtonInput = document.getElementById("gold-button");
  const colorBallInput = document.getElementById("color-ball");

  if (goldButtonInput) {
    goldButtonInput.addEventListener("change", updateUserResources);
    goldButtonInput.addEventListener("input", updateUserResources);
    userInputGoldButtons = parseInt(goldButtonInput.value) || 10000;
    userGoldButtons = userInputGoldButtons;
  }

  if (colorBallInput) {
    colorBallInput.addEventListener("change", updateUserResources);
    colorBallInput.addEventListener("input", updateUserResources);
    userInputColorBalls = parseInt(colorBallInput.value) || 10000;
    userColorBalls = userInputColorBalls;
  }

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleStatOptions(true);
    });

    searchInput.addEventListener("focus", function () {
      toggleStatOptions(true);
    });

    searchInput.addEventListener("input", function () {
      filterStatOptions(this.value);
    });

    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        searchStats();
      }
    });
  }

  document.addEventListener("click", function (e) {
    const statOptions = document.getElementById("stat-options");
    const searchInput = document.getElementById("search-input");

    if (statOptions && searchInput) {
      if (!searchInput.contains(e.target) && !statOptions.contains(e.target)) {
        toggleStatOptions(false);
      }
    }
  });

  updateResourceDisplay();
  updateResourceSummary();

  parts.forEach((part) => {
    const btn = document.createElement("button");
    btn.className = "selector-btn equip-btn";
    btn.textContent = part;
    btn.addEventListener("click", () => {
      selectedPart = part;
      highlightSelection(equipmentContainer, btn, "equip-btn");
      renderStats();
    });
    equipmentContainer.appendChild(btn);

    if (part === "투구") {
      btn.classList.add("bg-sky-500", "text-white", "font-bold");
    }
  });

  levels.forEach((level) => {
    const btn = document.createElement("button");
    btn.className = "selector-btn level-btn";

    const levelText = document.createElement("div");
    levelText.className = "level-text";
    levelText.textContent = level;
    btn.appendChild(levelText);

    const progressContainer = document.createElement("div");
    progressContainer.className = "level-progress-container";

    const statusText = document.createElement("div");
    statusText.className = "level-status";
    statusText.textContent = "";

    const progressBar = document.createElement("div");
    progressBar.className = "level-progress-bar empty";
    progressBar.style.width = "0%";

    progressContainer.appendChild(statusText);
    progressContainer.appendChild(progressBar);
    btn.appendChild(progressContainer);

    const dotsContainer = document.createElement("div");
    dotsContainer.className = "progress-dots";

    for (let i = 0; i < 4; i++) {
      const dot = document.createElement("span");
      dot.className = "progress-dot gray";
      dotsContainer.appendChild(dot);
    }

    btn.appendChild(dotsContainer);

    btn.addEventListener("click", () => {
      selectedLevel = level;
      highlightSelection(levelContainer, btn, "level-btn");
      renderStats();
    });
    levelContainer.appendChild(btn);

    if (level === "+9") {
      btn.classList.add("bg-emerald-500", "text-white", "font-bold");
    }
  });
}

function handleStatButtonClick(card, button, statName, maxValue, cardId) {
  let currentLevel = parseInt(card.dataset.cardLevel || "0");
  let currentValue = parseInt(card.dataset.value || "0");
  let isUnlocked = card.dataset.isUnlocked === "true";
  let isFirst = card.dataset.isFirst === "true";

  const valueDisplay = card.querySelector("p.value-display");
  const progressDisplay = card.querySelector("p.progress-display");

  const partLevelKey = `${card.dataset.part}_${card.dataset.level}`;

  if (!isUnlocked) {
    let requiredGold = 0;

    if (!firstUnlockedMap[partLevelKey]) {
      requiredGold = 0;
      isFirst = true;
    } else {
      requiredGold = 500;
      isFirst = false;
    }

    if (isFirst) {
      userColorBalls -= 500;
    } else {
      userGoldButtons -= requiredGold;
    }

    isUnlocked = true;

    if (!firstUnlockedMap[partLevelKey]) {
      firstUnlockedMap[partLevelKey] = true;
      button.innerHTML = `<img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="btn-icon"> <span>강화 500</span>`;
      card.dataset.isFirst = "true";
      card.dataset.isUnlocked = "true";

      Array.from(document.querySelectorAll("#stats-display > div")).forEach(
        (otherCard) => {
          if (
            otherCard !== card &&
            otherCard.dataset.part === card.dataset.part &&
            otherCard.dataset.level === card.dataset.level &&
            otherCard.dataset.isUnlocked !== "true"
          ) {
            const otherButton = otherCard.querySelector(".action-btn");
            if (otherButton) {
              otherButton.innerHTML = `<img src="assets/img/gold-button.jpg" alt="황금단추" class="btn-icon"> <span>선택 500</span>`;
            }
          }
        }
      );
    } else {
      currentValue = Math.floor(maxValue / 15);
      button.innerHTML = `<img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="btn-icon"> <span>강화 400</span>`;
      card.dataset.isFirst = "false";
      card.dataset.isUnlocked = "true";
    }

    card.dataset.cardLevel = currentLevel;
    card.dataset.value = currentValue;

    if (valueDisplay)
      valueDisplay.textContent = `${currentValue} / ${maxValue}`;
    if (progressDisplay)
      progressDisplay.textContent = `강화 단계: ${currentLevel}/3`;

    updateStatGlobalState(
      cardId,
      currentLevel,
      currentValue,
      isUnlocked,
      isFirst,
      card.dataset.part,
      card.dataset.level,
      statName,
      maxValue
    );
    updateTotalStats();
    updateStatCardStatus();
    updateLevelButtonIndicators();
    updateResourceSummary();
    return;
  }

  if (currentLevel < 3) {
    let requiredOrbs = 0;

    if (isFirst) {
      requiredOrbs = 500;
    } else {
      if (currentLevel === 0) {
        requiredOrbs = 400;
      } else {
        requiredOrbs = 500;
      }
    }

    userColorBalls -= requiredOrbs;

    currentLevel++;

    if (isFirst) {
      currentValue = Math.floor((maxValue / 3) * currentLevel);
    } else {
      if (currentLevel === 1) {
        const initial = Math.floor(maxValue / 15);
        const diff = Math.floor(maxValue / 3) - initial;
        currentValue = initial + diff;
      } else {
        currentValue += Math.floor(maxValue / 3);
        if (currentValue > maxValue) currentValue = maxValue;
      }
    }

    card.dataset.cardLevel = currentLevel;
    card.dataset.value = currentValue;

    if (valueDisplay)
      valueDisplay.textContent = `${currentValue} / ${maxValue}`;
    if (progressDisplay)
      progressDisplay.textContent = `강화 단계: ${currentLevel}/3`;

    if (currentLevel < 3) {
      const nextOrbCost = currentLevel < 2 ? 500 : 500;
      button.innerHTML = `<img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="btn-icon"> <span>강화 ${nextOrbCost}</span>`;
    } else {
      button.innerHTML = `<span>완료</span>`;
      button.disabled = true;
      button.classList.add("disabled-btn");
    }

    updateStatGlobalState(
      cardId,
      currentLevel,
      currentValue,
      isUnlocked,
      isFirst,
      card.dataset.part,
      card.dataset.level,
      statName,
      maxValue
    );
    updateTotalStats();
    updateStatCardStatus();
    updateLevelButtonIndicators();
    updateResourceSummary();

    if (
      document.getElementById("search-results-modal").style.display === "block"
    ) {
      showSearchResults();
    }
  }
}

function createStatCard(statName, maxValue, container, cardId, statIndex) {
  const statState = globalStatState[cardId] || {
    level: 0,
    value: 0,
    isUnlocked: false,
    isFirst: false,
    part: selectedPart,
    partLevel: selectedLevel,
    statName: statName,
    maxValue: maxValue,
  };

  let currentLevel = statState.level;
  let currentValue = statState.value;
  let isUnlocked = statState.isUnlocked;
  let isFirst = statState.isFirst;

  const displayStatName = getDisplayStatName(statName);

  const card = document.createElement("div");
  card.className = "stat-card";
  card.dataset.statName = statName;
  card.dataset.displayStatName = displayStatName;
  card.dataset.part = selectedPart;
  card.dataset.level = selectedLevel;
  card.dataset.cardId = cardId;
  card.dataset.statIndex = statIndex || 0;

  const cardHeader = document.createElement("div");
  cardHeader.className = "card-header";
  cardHeader.style.display = "flex";
  cardHeader.style.justifyContent = "space-between";
  cardHeader.style.alignItems = "center";

  const title = document.createElement("h3");
  title.className = "text-lg font-bold";
  title.textContent = displayStatName;

  const resetBtn = document.createElement("button");
  resetBtn.innerHTML = "↻";
  resetBtn.className = "redistribute-btn";
  resetBtn.title = "능력치 재분배";

  resetBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    resetStat(cardId, card);
  });

  cardHeader.appendChild(title);
  cardHeader.appendChild(resetBtn);

  const valueDisplay = document.createElement("p");
  valueDisplay.className = "value-display";
  valueDisplay.textContent = `${currentValue} / ${maxValue}`;

  const progressContainer = document.createElement("div");
  progressContainer.className = "progress-container";

  const progressDotsContainer = document.createElement("div");
  progressDotsContainer.className = "progress-dots";

  for (let i = 0; i < 3; i++) {
    const dot = document.createElement("span");
    dot.className = "progress-dot gray";

    if (isUnlocked) {
      if (i < currentLevel) {
        dot.className = "progress-dot blue";
      } else {
        dot.className = "progress-dot yellow";
      }
    }

    progressDotsContainer.appendChild(dot);
  }

  progressContainer.appendChild(progressDotsContainer);

  const progressDisplay = document.createElement("p");
  progressDisplay.className = "progress-display text-sm text-gray-600";
  progressDisplay.textContent = `강화 단계: ${currentLevel}/3`;
  progressContainer.appendChild(progressDisplay);

  const actionButton = document.createElement("button");
  actionButton.className = "action-btn";

  const partLevelKey = `${selectedPart}_${selectedLevel}`;
  const hasFirstUnlocked = firstUnlockedMap[partLevelKey] || false;

  if (isUnlocked) {
    if (currentLevel < 3) {
      const orbCost = isFirst ? 500 : currentLevel === 0 ? 400 : 500;
      actionButton.innerHTML = `<img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="btn-icon"> <span>강화 ${orbCost}</span>`;
    } else {
      actionButton.innerHTML = `<span>완료</span>`;
      actionButton.disabled = true;
      actionButton.classList.add("disabled-btn");
    }
  } else {
    if (hasFirstUnlocked) {
      actionButton.innerHTML = `<img src="assets/img/gold-button.jpg" alt="황금단추" class="btn-icon"> <span>선택 500</span>`;
    } else {
      actionButton.innerHTML = `<img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="btn-icon"> <span>선택 500</span>`;
    }
  }

  actionButton.addEventListener("click", () => {
    handleStatButtonClick(card, actionButton, statName, maxValue, cardId);
  });

  card.dataset.statName = statName;
  card.dataset.maxValue = maxValue;
  card.dataset.cardLevel = currentLevel;
  card.dataset.value = currentValue;
  card.dataset.isFirst = isFirst ? "true" : "false";
  card.dataset.isUnlocked = isUnlocked ? "true" : "false";

  card.appendChild(cardHeader);
  card.appendChild(valueDisplay);
  card.appendChild(progressContainer);
  card.appendChild(actionButton);
  container.appendChild(card);

  return card;
}

function resetStat(cardId, card) {
  const maxValue = parseInt(card.dataset.maxValue || "0");
  const statName = card.dataset.statName;
  const part = card.dataset.part;
  const level = card.dataset.level;

  const partLevelKey = `${part}_${level}`;
  const isUnlocked = card.dataset.isUnlocked === "true";
  const isFirst = card.dataset.isFirst === "true";
  const currentLevel = parseInt(card.dataset.cardLevel || "0");

  if (isFirst && isUnlocked) {
    firstUnlockedMap[partLevelKey] = false;

    if (currentLevel >= 1) userColorBalls += 500;
    if (currentLevel >= 2) userColorBalls += 500;
    if (currentLevel >= 3) userColorBalls += 500;
  } else if (isUnlocked) {
    userGoldButtons += 500;

    if (currentLevel >= 1) userColorBalls += 400;
    if (currentLevel >= 2) userColorBalls += 500;
    if (currentLevel >= 3) userColorBalls += 500;
  }

  delete globalStatState[cardId];

  card.dataset.cardLevel = "0";
  card.dataset.value = "0";
  card.dataset.isFirst = "false";
  card.dataset.isUnlocked = "false";

  const valueDisplay = card.querySelector("p.value-display");
  if (valueDisplay) {
    valueDisplay.textContent = `0 / ${maxValue}`;
  }

  const progressDisplay = card.querySelector("p.progress-display");
  if (progressDisplay) {
    progressDisplay.textContent = `강화 단계: 0/3`;
  }

  let hasFirstUnlockedInPartLevel = false;

  document
    .querySelectorAll(
      `#stats-display > div[data-part="${part}"][data-level="${level}"]`
    )
    .forEach((otherCard) => {
      if (
        otherCard.dataset.isUnlocked === "true" &&
        otherCard.dataset.isFirst === "true"
      ) {
        hasFirstUnlockedInPartLevel = true;
      }
    });

  firstUnlockedMap[partLevelKey] = hasFirstUnlockedInPartLevel;

  document
    .querySelectorAll(
      `#stats-display > div[data-part="${part}"][data-level="${level}"]`
    )
    .forEach((otherCard) => {
      if (otherCard.dataset.isUnlocked !== "true") {
        const otherButton = otherCard.querySelector(".action-btn");
        if (otherButton) {
          if (hasFirstUnlockedInPartLevel) {
            otherButton.innerHTML = `<img src="assets/img/gold-button.jpg" alt="황금단추" class="btn-icon"> <span>선택 500</span>`;
          } else {
            otherButton.innerHTML = `<img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="btn-icon"> <span>선택 500</span>`;
          }
        }
      }
    });

  const actionButton = card.querySelector(".action-btn");
  if (actionButton) {
    if (hasFirstUnlockedInPartLevel) {
      actionButton.innerHTML = `<img src="assets/img/gold-button.jpg" alt="황금단추" class="btn-icon"> <span>선택 500</span>`;
    } else {
      actionButton.innerHTML = `<img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="btn-icon"> <span>선택 500</span>`;
    }
    actionButton.disabled = false;
    actionButton.classList.remove("disabled-btn");
  }

  updateResourceDisplay();
  updateTotalStats();
  updateStatCardStatus();
  updateLevelButtonIndicators();
  updateResourceSummary();

  if (
    document.getElementById("search-results-modal").style.display === "block"
  ) {
    showSearchResults();
  }
}

function updateStatGlobalState(
  cardId,
  level,
  value,
  isUnlocked,
  isFirst,
  part,
  partLevel,
  statName,
  maxValue
) {
  globalStatState[cardId] = {
    level,
    value,
    isUnlocked,
    isFirst,
    part,
    partLevel,
    statName,
    maxValue,
  };
}

function updateTotalStats() {
  const statTotals = {};
  let totalProgress = 0;

  Object.entries(globalStatState).forEach(([cardId, state]) => {
    if (state.value > 0) {
      const displayName = getDisplayStatName(state.statName);

      if (!statTotals[displayName]) statTotals[displayName] = 0;
      statTotals[displayName] += state.value;
      totalProgress += state.level;
    }
  });

  const resources = calculateResources();

  updateSummary(totalProgress, statTotals, resources);
}

function calculateResources() {
  let goldButtons = 0;
  let colorBalls = 0;

  const partLevelGroups = {};

  Object.entries(globalStatState).forEach(([cardId, state]) => {
    if (!state.isUnlocked) return;

    const groupKey = `${state.part}_${state.partLevel}`;
    if (!partLevelGroups[groupKey]) {
      partLevelGroups[groupKey] = [];
    }
    partLevelGroups[groupKey].push(state);
  });

  Object.entries(partLevelGroups).forEach(([groupKey, states]) => {
    const firstStat = states.find((s) => s.isFirst);

    states.forEach((state) => {
      if (state.isFirst) {
        if (state.level >= 1) colorBalls += 500;
        if (state.level >= 2) colorBalls += 500;
        if (state.level >= 3) colorBalls += 500;
      } else {
        goldButtons += 500;

        if (state.level >= 1) colorBalls += 400;
        if (state.level >= 2) colorBalls += 500;
        if (state.level >= 3) colorBalls += 500;
      }
    });
  });

  return { goldButtons, colorBalls };
}

function updateSummary(totalProgress, statTotals, resources) {
  const summaryDisplay = document.getElementById("summary-display");
  if (!summaryDisplay) return;

  let statSummaryHTML = "";

  const sortedStats = Object.entries(statTotals).sort((a, b) => b[1] - a[1]);

  if (sortedStats.length > 0) {
    statSummaryHTML += `<div class="stat-list">`;
    for (const [stat, value] of sortedStats) {
      if (value > 0) {
        statSummaryHTML += `
          <div class="stat-item">
            <span class="stat-name">${stat}</span> 
            <span class="stat-value">+${value}</span>
          </div>`;
      }
    }
    statSummaryHTML += `</div>`;
  } else {
    statSummaryHTML = "<p>능력치가 개방되지 않았습니다.</p>";
  }

  summaryDisplay.innerHTML = `
    <div class="summary-section">
      ${statSummaryHTML}
    </div>
  `;
}

function optimizeStats(preset) {
  let targetStats = [];
  let presetName = "";

  if (preset === "boss") {
    targetStats = BOSS_STATS;
    presetName = "보스용";
  } else if (preset === "pvp") {
    targetStats = PVP_STATS;
    presetName = "PvP용";
  } else {
    alert("유효하지 않은 프리셋입니다.");
    return;
  }

  showPresetSearchResults(presetName, targetStats);
}

function showPresetSearchResults(presetName, targetStats) {
  const modal = document.getElementById("optimize-results-modal");
  const titleElement = document.getElementById("optimize-title");
  const descriptionElement = document.getElementById("optimize-description");
  const resultsContainer = document.getElementById("optimize-results");

  if (!modal || !resultsContainer) return;

  titleElement.textContent = `${presetName} 능력치 조합`;

  let results = [];
  const statMaxValues = {};

  targetStats.forEach((searchStat) => {
    statMaxValues[searchStat] = 0;

    for (const part of parts) {
      const basePart = getBasePartName(part);
      if (!equipmentData[basePart]) continue;

      for (const level of levels) {
        const key = `lv${level.replace("+", "")}`;
        if (!equipmentData[basePart][key]) continue;

        const stats = Object.entries(equipmentData[basePart][key]);
        for (const [statName, maxValue] of stats) {
          const displayName = getDisplayStatName(statName);
          if (displayName === searchStat) {
            const cardId = `${statName}_${part}_${level}_0`;

            const isUnlocked = globalStatState[cardId]?.isUnlocked || false;
            const currentLevel = globalStatState[cardId]?.level || 0;

            statMaxValues[searchStat] += maxValue;

            results.push({
              part: part,
              level: level,
              statName: displayName,
              maxValue: maxValue,
              cardId: cardId,
              isUnlocked: isUnlocked,
              currentLevel: currentLevel,
            });
          }
        }
      }
    }
  });

  if (results.length === 0) {
    resultsContainer.innerHTML = `<div class="no-results">일치하는 능력치가 없습니다.</div>`;
    modal.style.display = "block";
    return;
  }

  const totalResources = calculateTotalResourcesForPreset(results);

  let description = `
    <div class="preset-summary">
      <div class="preset-header">
        <h4>${presetName} 조합 추천 능력치</h4>
        <div class="preset-stats">
          ${targetStats
            .map((stat) => {
              return `<span class="priority-stat">${stat} <strong>최대 +${statMaxValues[stat]}</strong></span>`;
            })
            .join("")}
        </div>
      </div>
      <div class="preset-resources">
        <div class="resource-req-title">모든 능력치 최대 강화 시 필요 자원:</div>
        <div class="resource-req-items">
          <div class="resource-req-item">
            <img src="assets/img/gold-button.jpg" alt="황금단추" class="resource-icon-img-small">
            <span>${totalResources.goldButtons}</span>
          </div>
          <div class="resource-req-item">
            <img src="assets/img/fivecolored-beads.jpg" alt="오색구슬" class="resource-icon-img-small">
            <span>${totalResources.colorBalls}</span>
          </div>
        </div>
      </div>
    </div>
  `;
  descriptionElement.innerHTML = description;

  const groupedByStats = {};
  results.forEach((result) => {
    if (!groupedByStats[result.statName]) {
      groupedByStats[result.statName] = [];
    }
    groupedByStats[result.statName].push(result);
  });

  let html = `<div class="compact-results">`;

  for (const [statName, statResults] of Object.entries(groupedByStats)) {
    html += `<div class="compact-group">
      <h4 class="compact-stat-title">
        ${statName} 
        <span class="stat-info">
          <span class="stat-count">(${statResults.length}곳)</span>
          <span class="stat-total-value">최대 +${statMaxValues[statName]}</span>
        </span>
      </h4>
      <div class="compact-locations">`;

    statResults.sort((a, b) => {
      if (a.part !== b.part) {
        return parts.indexOf(a.part) - parts.indexOf(b.part);
      }
      return (
        parseInt(a.level.replace("+", "")) - parseInt(b.level.replace("+", ""))
      );
    });

    statResults.forEach((loc) => {
      let statusClass = "location-unused";
      let statusText = "미개방";

      if (loc.isUnlocked) {
        statusText = `${loc.currentLevel}/3`;
        statusClass =
          loc.currentLevel === 3 ? "location-complete" : "location-partial";
      }

      html += `
        <div class="compact-location ${statusClass}" 
            onclick="selectStatFromPreset('${loc.part}', '${loc.level}')">
          <div class="loc-header">
            <span class="loc-part">${loc.part}</span>
            <span class="loc-level">${loc.level}</span>
          </div>
          <div class="loc-details">
            <span class="loc-max-value">+${loc.maxValue}</span>
          </div>
        </div>`;
    });

    html += `</div></div>`;
  }

  html += `</div>`;

  resultsContainer.innerHTML = html;

  const applyBtn = document.querySelector(".apply-btn");
  if (applyBtn) {
    applyBtn.textContent = "창 닫기";
    applyBtn.onclick = closeOptimizeResults;
  }

  modal.style.display = "block";
}

function calculateTotalResourcesForPreset(results) {
  const partGroups = {};
  let totalGoldButtons = 0;
  let totalColorBalls = 0;

  results.forEach((result) => {
    const key = `${result.part}_${result.level}`;
    if (!partGroups[key]) {
      partGroups[key] = [];
    }
    partGroups[key].push(result);
  });

  Object.values(partGroups).forEach((group) => {
    let hasFirstUnlocked = false;

    group.forEach((stat) => {
      if (stat.isUnlocked) {
        hasFirstUnlocked = true;
      }
    });

    if (!hasFirstUnlocked && group.length > 0) {
      totalColorBalls += 500;

      if (group.length > 1) {
        totalGoldButtons += (group.length - 1) * 500;
        totalColorBalls += (group.length - 1) * 1400;
      }
    } else {
      group.forEach((stat) => {
        const resources = calculateResourcesForStat(stat);
        totalGoldButtons += resources.goldButtons;
        totalColorBalls += resources.colorBalls;
      });
    }
  });

  return {
    goldButtons: totalGoldButtons,
    colorBalls: totalColorBalls,
  };
}

function selectStatFromPreset(part, level) {
  selectStatFromSearch(part, level);
  closeOptimizeResults();
}

function applyOptimization() {
  closeOptimizeResults();
}

function resetAllStats() {
  Object.keys(globalStatState).forEach((cardId) => {
    delete globalStatState[cardId];
  });

  Object.keys(firstUnlockedMap).forEach((key) => {
    firstUnlockedMap[key] = false;
  });
}

function applyStat(cardId, levelToReach, isFirst) {
  const [statName, part, level, index] = cardId.split("_");
  const basePart = getBasePartName(part);
  const key = `lv${level.replace("+", "")}`;

  if (
    !equipmentData[basePart] ||
    !equipmentData[basePart][key] ||
    !equipmentData[basePart][key][statName]
  ) {
    return;
  }

  const maxValue = equipmentData[basePart][key][statName];
  const partLevelKey = `${part}_${level}`;

  if (isFirst) {
    firstUnlockedMap[partLevelKey] = true;
  }

  let value = 0;

  if (levelToReach === 0) {
    value = 0;
  } else if (isFirst) {
    value = Math.floor((maxValue / 3) * levelToReach);
  } else {
    if (levelToReach === 1) {
      const initial = Math.floor(maxValue / 15);
      const diff = Math.floor(maxValue / 3) - initial;
      value = initial + diff;
    } else {
      value = Math.min(
        maxValue,
        Math.floor(maxValue / 15) +
          Math.floor(maxValue / 3) * (levelToReach - 1)
      );
    }
  }

  globalStatState[cardId] = {
    level: levelToReach,
    value: value,
    isUnlocked: true,
    isFirst: isFirst,
    part: part,
    partLevel: level,
    statName: statName,
    maxValue: maxValue,
  };
}

function openTab(name) {
  alert(`"${name}" 탭은 구현되지 않았습니다.\n필요 시 페이지를 연결하세요.`);
}

document.addEventListener("DOMContentLoaded", function () {
  const goldButtonInput = document.getElementById("gold-button");
  const colorBallInput = document.getElementById("color-ball");

  if (goldButtonInput) {
    goldButtonInput.addEventListener("change", updateUserResources);
    goldButtonInput.addEventListener("input", updateUserResources);
    userInputGoldButtons = parseInt(goldButtonInput.value) || 10000;
    userGoldButtons = userInputGoldButtons;
  }

  if (colorBallInput) {
    colorBallInput.addEventListener("change", updateUserResources);
    colorBallInput.addEventListener("input", updateUserResources);
    userInputColorBalls = parseInt(colorBallInput.value) || 10000;
    userColorBalls = userInputColorBalls;
  }

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("click", function (e) {
      e.stopPropagation();
      toggleStatOptions(true);
    });

    searchInput.addEventListener("focus", function () {
      toggleStatOptions(true);
    });

    searchInput.addEventListener("input", function () {
      filterStatOptions(this.value);
    });

    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        e.preventDefault();
        searchStats();
      }
    });
  }

  document.addEventListener("click", function (e) {
    const statOptions = document.getElementById("stat-options");
    const searchInput = document.getElementById("search-input");

    if (statOptions && searchInput) {
      if (!searchInput.contains(e.target) && !statOptions.contains(e.target)) {
        toggleStatOptions(false);
      }
    }
  });
});

document.addEventListener("touchstart", function () {}, { passive: true });

async function loadChakData() {
  try {
    const data = await getCachedData(
      "chakData",
      async () => {
        return await getFirestoreDocument("chak.json");
      },
      24
    );

    equipmentData = data;
    allAvailableStats = collectAllStatNames();
    initUI();
    populateStatOptions();
    renderStats();
    updateResourceSummary();
  } catch (error) {
    console.error("Failed to load chak data:", error);
    if (statsContainer) {
      statsContainer.innerHTML = `<p class="text-red-500">${
        error.message || "데이터를 불러오는 데 실패했습니다."
      }</p>`;
    }

    // Fallback to local file
    try {
      const response = await fetch("output/chak.json");
      const data = await response.json();
      equipmentData = data;
      allAvailableStats = collectAllStatNames();
      initUI();
      populateStatOptions();
      renderStats();
      updateResourceSummary();
    } catch (fallbackError) {
      console.error("Local fallback also failed:", fallbackError);
      if (statsContainer) {
        statsContainer.innerHTML = `<p class="text-red-500">데이터를 불러오는 데 실패했습니다.</p>`;
      }
    }
  }
}

loadChakData();
