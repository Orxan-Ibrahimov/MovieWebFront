$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 3,
      },
      1000: {
        items: 5,
      },
    },
  });

  $(".read-btn").click(function (e) {
    e.preventDefault();
    $("footer .about-us").removeClass("makeBlur");
    $(".read-btn").remove();
  });

  $(".spoiler-box").click(function (e) {
    e.preventDefault();
    $(this)
      .parent()
      .find(".comment-body")
      .each(function (indexInArray, valueOfElement) {
        $(valueOfElement).children(".spoiler").removeClass("spoiler");
        console.log($(valueOfElement).children(".spoiler"));
      });

    $(this).remove();
  });

  $(".share").click(function (e) {
    e.preventDefault();
    let commentary = CreateCommentary();
    $(this).parent().append(commentary);
  });
});

function CreateCommentary() {
  let commentary = document.createElement("form");
  commentary.classList.add("commentary");

  let commentaryHeader = document.createElement("div");
  commentaryHeader.classList.add("commentary-header");
  commentary.append(commentaryHeader);

  let commentaryUserImage = document.createElement("img");
  commentaryUserImage.classList.add("commentary-user");
  commentaryUserImage.setAttribute("src", "assets/images/avatars/avatar.png");
  commentaryUserImage.setAttribute("alt", "user");
  commentaryHeader.append(commentaryUserImage);

  let comment = document.createElement("input");
  comment.classList.add("form-control", "mx-3");
  comment.setAttribute("type", "text");
  comment.setAttribute("placeholder", "Düşüncelerini paylaş...");
  commentaryHeader.append(comment);

  let sendBtn = document.createElement("a");
  sendBtn.classList.add("commentary-send");
  sendBtn.textContent = "Gönder";
  sendBtn.setAttribute("href", "#");
  commentaryHeader.append(sendBtn);

  //commentary-body
  let commentaryBody = document.createElement("div");
  commentaryBody.classList.add("commentary-body");
  commentary.append(commentaryBody);

  let formCheck = document.createElement("div");
  formCheck.classList.add("form-check");
  formCheck.classList.add("form-switch");
  commentaryBody.append(formCheck);

  let formCheckInput = document.createElement("input");
  formCheckInput.classList.add("form-check-input");
  formCheckInput.setAttribute("type", "checkbox");
  formCheckInput.setAttribute("role", "switch");
  formCheckInput.setAttribute("id", "flexSwitchCheckDefault");
  formCheck.append(formCheckInput);

  let formCheckLabel = document.createElement("label");
  formCheckLabel.classList.add("form-check-label");
  formCheckLabel.setAttribute("for", "flexSwitchCheckDefault");
  formCheckLabel.textContent = "Spoiler? (Bir sahne ile ilgili bilgi verecekseniz lütfen işaretleyiniz.)";
  formCheck.append(formCheckLabel);

  //commentary-footer
  let commentaryFooter = document.createElement("div");
  commentaryFooter.classList.add("commentary-footer");
  commentary.append(commentaryFooter);

  let checkRobot = document.createElement("input");
  checkRobot.classList.add("btn-check");
  checkRobot.setAttribute("type", "checkbox");
  checkRobot.setAttribute("autocomplete", "off");
  checkRobot.setAttribute("id", "btn-check-2-outlined");
  commentaryFooter.append(checkRobot);

  let checkRobotLabel = document.createElement("label");
  checkRobotLabel.classList.add("btn", "btn-outline-warning");
  checkRobotLabel.setAttribute("for", "btn-check-2-outlined");
  checkRobotLabel.textContent = "Ben robot değilim";
  commentaryFooter.append(checkRobotLabel);

  let br = document.createElement("br");
  commentaryFooter.append(br);
  return commentary;
}
