document.addEventListener("mouseup", function (e) {
  var notification = document.querySelector(".notification");
  if (notification) {
    if (!notification.contains(e.target)) {
      document.querySelector(".notification .show-noti").classList.add("none");
      Array.from(document.querySelectorAll(".show-noti .fa-circle")).forEach(
        (noti) => {
          if (!noti.classList.contains("hidden")) {
            noti.classList.add("hidden");
          }
        }
      );
    }
  }
});
document.addEventListener("mouseup", function (e) {
  var infoOption = document.querySelector(".account");
  if (infoOption) {
    if (!infoOption.contains(e.target)) {
      document
        .querySelector(".account .show-info-option")
        .classList.add("none");
    }
  }
});
function showList(e, element) {
  if (document.querySelector(element).classList.contains("none")) {
    document.querySelector(element).classList.remove("none");
  } else {
    document.querySelector(element).classList.add("none");
    Array.from(document.querySelectorAll(element + " .fa-circle")).forEach(
      (noti) => {
        if (!noti.classList.contains("hidden")) {
          noti.classList.add("hidden");
        }
      }
    );
  }
  if (e.target.classList.contains("alerted")) {
    e.target.classList.remove("alerted");
  }
}
