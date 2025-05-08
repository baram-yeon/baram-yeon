const InfoApp = (function () {
  const STATS_MAPPING = window.CommonData.STATS_MAPPING;
  const CATEGORY_FILE_MAP = window.CommonData.CATEGORY_FILE_MAP;
  const FACTION_ICONS = window.CommonData.FACTION_ICONS;
  const STATS_ORDER = window.CommonData.STATS_ORDER || [];
  const DOCUMENT_MAP = window.CommonData.DOCUMENT_MAP || {};

  function initialize() {
    // console.log("Initializing InfoApp...");
    if (
      typeof window.CommonData === "undefined" ||
      !FACTION_ICONS ||
      !STATS_MAPPING ||
      !STATS_ORDER ||
      !DOCUMENT_MAP ||
      !CATEGORY_FILE_MAP
    ) {
      console.error(
        "Critical Error: CommonData or required properties (FACTION_ICONS, STATS_MAPPING, etc.) not found. Ensure common.js is loaded correctly BEFORE info.js."
      );
      const container = document.getElementById("imageContainer");
      if (container)
        container.innerHTML =
          '<p style="color: red; text-align: center; padding: 20px;">데이터 초기화 오류. 필수 정보가 누락되었습니다.</p>';
      return;
    }

    FirebaseHandler.initFirebase();

    FirebaseHandler.testFirebaseConnectivity().finally(() => {
      // console.log("Firebase check finished. Loading category data...");

      window.DataManager.loadCategoryData().then(() => {
        window.UIRenderer.initUIEvents();
        window.UIRenderer.showCategory("수호");
      });
    });
  }

  return {
    initialize,
  };
})();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", InfoApp.initialize);
} else {
  InfoApp.initialize();
}
