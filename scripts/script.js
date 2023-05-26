Date.prototype.getWeekOfMonth = function () {
  var dayOfMonth = this.getDay();
  var month = this.getMonth();
  var year = this.getFullYear();
  var checkDate = new Date(year, month, this.getDate());
  var checkDateTime = checkDate.getTime();
  var currentWeek = 0;

  for (var i = 1; i < 32; i++) {
    var loopDate = new Date(year, month, i);

    if (loopDate.getDay() == dayOfMonth) {
      currentWeek++;
    }

    if (loopDate.getTime() == checkDateTime) {
      return currentWeek;
    }
  }
};

function updateModalClass() {
  var modalElement = document.getElementById("modal-1");
  var screenWidth = window.innerWidth;

  if (screenWidth < 768) {
    modalElement.classList.add("modal_s");
    modalElement.classList.remove("modal_m", "modal_l");
  } else if (screenWidth >= 768 && screenWidth < 1024) {
    modalElement.classList.add("modal_m");
    modalElement.classList.remove("modal_s", "modal_l");
  } else {
    modalElement.classList.add("modal_l");
    modalElement.classList.remove("modal_s", "modal_m");
  }
}

window.addEventListener("load", updateModalClass);
window.addEventListener("resize", updateModalClass);
