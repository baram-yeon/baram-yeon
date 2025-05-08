document.addEventListener("DOMContentLoaded", function () {
  InfoApp.initialize();
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
  const helpBtn = document.getElementById("helpBtn");
  const helpTooltip = document.getElementById("helpTooltip");
  const closeHelp = document.getElementById("closeHelp");

  helpBtn.addEventListener("click", function () {
    helpTooltip.style.display =
      helpTooltip.style.display === "block" ? "none" : "block";
  });

  closeHelp.addEventListener("click", function () {
    helpTooltip.style.display = "none";
  });

  document.addEventListener("click", function (event) {
    const isClickInsideHelp =
      helpTooltip.contains(event.target) || helpBtn.contains(event.target);
    if (!isClickInsideHelp && helpTooltip.style.display === "block") {
      helpTooltip.style.display = "none";
    }
  });
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
