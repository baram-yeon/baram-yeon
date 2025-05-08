window.ImageHandler = (function () {
  return {
    loadCategoryData: function () {
      return window.DataManager.loadCategoryData();
    },
    initUIEvents: function () {
      return window.UIRenderer.initUIEvents();
    },
    showCategory: function (category) {
      return window.UIRenderer.showCategory(category);
    },
    displayAllPets: function (category, container) {
      return window.UIRenderer.displayAllPets(category, container);
    },
    displayPetsByInfluence: function (category, container) {
      return window.UIRenderer.displayPetsByInfluence(category, container);
    },
    createInfluenceGroup: function (category, influence, itemsInCategory) {
      return window.UIRenderer.createInfluenceGroup(
        category,
        influence,
        itemsInCategory
      );
    },
    checkSpiritStats: function (spirit) {
      return window.DataManager.checkSpiritStats(spirit);
    },
    checkAllLevelsHaveEffect: function (stats, effectType) {
      return window.DataManager.checkAllLevelsHaveEffect(stats, effectType);
    },
    hasLevel25BindStats: function (item) {
      return window.DataManager.hasLevel25BindStats(item);
    },
    showInfo: function (category, imagePath, influence) {
      if (window.ModalHandler) {
        return window.ModalHandler.showInfo(category, imagePath, influence);
      }
    },
  };
})();
