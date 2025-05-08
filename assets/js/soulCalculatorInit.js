document.addEventListener("DOMContentLoaded", function () {
  SoulCalculator.initialize();

  var isMobile = window.innerWidth <= 768;
  localStorage.setItem("isMobileView", isMobile);

  function debounce(func, wait) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    };
  }

  window.addEventListener(
    "resize",
    debounce(function () {
      var wasMobile = localStorage.getItem("isMobileView") === "true";
      var isMobile = window.innerWidth <= 768;

      if (wasMobile !== isMobile) {
        localStorage.setItem("isMobileView", isMobile);
        location.reload();
      }
    }, 250)
  );
});

function openReportSheet() {
  window.open("https://forms.gle/v1F41Dq2GxhbJKmBA", "_blank");
}
