const DataManager = (function () {
  const CATEGORY_FILE_MAP = window.CommonData.CATEGORY_FILE_MAP;
  const FACTION_ICONS = window.CommonData.FACTION_ICONS;
  const STATS_MAPPING = window.CommonData.STATS_MAPPING;
  const STATS_ORDER = window.CommonData.STATS_ORDER || [];
  const SPECIAL_STAT_CLASSES = window.CommonData.SPECIAL_STAT_CLASSES;
  let mobData = { 수호: [], 탑승: [], 변신: [] };

  async function loadCategoryData() {
    let allLoaded = true;

    for (const [category, files] of Object.entries(CATEGORY_FILE_MAP)) {
      try {
        let registrationData = await FirebaseHandler.getFirestoreDocument(
          files.registration
        );
        let bindData = await FirebaseHandler.getFirestoreDocument(files.bind);

        let registrationArray = Array.isArray(registrationData)
          ? registrationData
          : registrationData?.data || [];
        let bindArray = Array.isArray(bindData)
          ? bindData
          : bindData?.data || [];

        if (!Array.isArray(registrationArray)) {
          console.error(
            `Invalid registration data format for ${category}: Expected array, got ${typeof registrationArray}. Using empty array.`
          );
          registrationArray = [];
          allLoaded = false;
        }
        if (!Array.isArray(bindArray)) {
          console.error(
            `Invalid bind data format for ${category}: Expected array, got ${typeof bindArray}. Using empty array.`
          );
          bindArray = [];
          allLoaded = false;
        }

        if (registrationArray.length === 0 && files.registration) {
          console.warn(
            `No registration data loaded for category: ${category} from file ${files.registration}.json`
          );
        }

        const mergedData = mergeData(registrationArray, bindArray);
        mobData[category] = mergedData;
      } catch (err) {
        console.error(
          `Failed to load or process data for category ${category}:`,
          err
        );
        mobData[category] = [];
        allLoaded = false;
      }
    }

    if (!allLoaded) {
      console.error("One or more categories failed to load data properly.");
    }

    if (!FACTION_ICONS) {
      console.error("FACTION_ICONS data is missing from CommonData!");
    }

    return mobData;
  }

  function mergeData(registrationArray, bindArray) {
    return registrationArray
      .map((regItem) => {
        if (!regItem || typeof regItem !== "object" || !regItem.name) {
          return null;
        }

        const bindItem = bindArray.find((b) => b && b.name === regItem.name);
        const regStats = Array.isArray(regItem.stats) ? regItem.stats : [];
        const bindStats =
          bindItem && Array.isArray(bindItem.stats) ? bindItem.stats : [];

        const mergedStats = Array.from({ length: 26 }, (_, i) => {
          const level = i;
          const regLevelStat = regStats.find((s) => s && s.level === level);
          const bindLevelStat = bindStats.find((s) => s && s.level === level);

          return {
            level: level,
            registrationStat: regLevelStat?.registrationStat || {},
            bindStat: bindLevelStat?.bindStat || {},
          };
        });

        return {
          ...regItem,
          stats: mergedStats,
          influence: regItem.influence || "정보없음",
        };
      })
      .filter((item) => item !== null);
  }

  function checkSpiritStats(spirit) {
    if (!spirit || !spirit.stats)
      return { hasFullRegistration: false, hasFullBind: false };

    const hasFullRegistration = checkAllLevelsHaveEffect(
      spirit.stats,
      "registrationStat"
    );
    const hasFullBind = checkAllLevelsHaveEffect(spirit.stats, "bindStat");

    return { hasFullRegistration, hasFullBind };
  }

  function checkAllLevelsHaveEffect(stats, effectType) {
    if (!stats || !Array.isArray(stats) || stats.length === 0) return false;

    for (let i = 0; i <= 25; i++) {
      const levelStat = stats.find((s) => s && s.level === i);
      if (
        !levelStat ||
        !levelStat[effectType] ||
        typeof levelStat[effectType] !== "object" ||
        Object.keys(levelStat[effectType]).length === 0
      ) {
        return false;
      }
    }
    return true;
  }

  function hasLevel25BindStats(item) {
    if (!item || !Array.isArray(item.stats)) return false;
    const level25Stat = item.stats.find((s) => s && s.level === 25);
    return (
      level25Stat &&
      level25Stat.bindStat &&
      typeof level25Stat.bindStat === "object" &&
      Object.keys(level25Stat.bindStat).length > 0
    );
  }

  function getData(category) {
    return mobData[category] || [];
  }

  function getAllData() {
    return mobData;
  }

  return {
    loadCategoryData,
    getData,
    getAllData,
    checkSpiritStats,
    checkAllLevelsHaveEffect,
    hasLevel25BindStats,
    FACTION_ICONS,
    STATS_MAPPING,
    STATS_ORDER,
    SPECIAL_STAT_CLASSES,
  };
})();

window.DataManager = DataManager;
