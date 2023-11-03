$(document).ready(function () {
  let IsSended = false;
  let visible = false;
  
  $("#login-btn").click(function (e) { 
    e.preventDefault();    
    $(".authorization-box #login").slideDown(function(params) {
      $(".authorization-box .make-blur").show();
      $("body").css({
        "overflow" : "hidden"
      });
    });
  });

  $("#register-btn").click(function (e) { 
    e.preventDefault();    
    $(".authorization-box #register").slideDown(function(params) {
      $(".authorization-box .make-blur").show();
      $("body").css({
        "overflow" : "hidden"
      });
    });
  });

  $(".user").click(function (e) { 
    e.preventDefault();
    e.stopPropagation();
    $(".user-actions").toggle();   
  });
  $(".short-hdf-menu .menu-bar").click(function (e) {
    e.preventDefault();
    $(".hdf-short-menu").slideToggle();    
  });

  $(".short-hdf-menu .filter").click(function (e) {
    e.preventDefault();
    $(".hdf-menu").toggle();    
    $("#latest-movies").toggle();    
    $("#upcoming-movies").toggle();    
    $("#filter-visible").toggle();    
  });

  $(document).click(function (e) {
    e.stopPropagation();
    $(".robo-menu").hide();         
    $(".user-actions").hide(); 
    
  });
  $(".make-blur").click(function(params) {
    $("#login").hide();
    $("#register").hide();
    $(this).hide();
  });

  $(".authorization-close").click(function(params) {
    $("#login").hide();
    $("#register").hide();
    $(".make-blur").hide();
  });
  
  $(".robo-category").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).children(".robo-menu").toggle();         
  });

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
      });

    $(this).remove();
  });

  $(".share").click(function (e) {
    e.preventDefault();
    IsSended = Share(this, IsSended);
  });

  $(".commentary-send").click(function (e) {
    e.preventDefault();
    let comment = Send(this);
    $(".comments-box").prepend(comment);

    setTimeout(() => {
       window.location.reload();
    }, 1000);
  });

  $(".checkRobot").click(function (e) {
    e.preventDefault();
    let send = $(this).parent().prev().prev().children(".commentary-send")[0];

    if (this.classList.contains("isRobot")) {
      this.classList.replace("isRobot", "isNotRobot");
      $(send).css({ "pointer-events": "fill", opacity: "1" });
      this.textContent = "Ben robot değilim";
    } else {
      this.classList.replace("isNotRobot", "isRobot");
      $(send).css({ "pointer-events": "none", opacity: ".8" });
      this.textContent = "Ben robotum";
    }
  });

  $(".rate-item .rate").click(function (e) {
    Vote(this);
  });

  $(".rate-list").mouseleave(function () {
    let activeIndex = -1;
    votes = $(this).children();
    $(votes).each(function (index, element) {
      element = $(element).children(".rate");

      if ($(element)[0].classList.contains("active")) {
        activeIndex = $(element).parent().index();
      }
      if (activeIndex == -1) $(element).css({ color: "rgba(255,255,255,.1)" });
      else if (activeIndex <= index)
        $(element).css({ color: "rgba(255,255,255,.1)" });
    });
  });

  $(".rate-item .rate").mouseenter(function () {
    VoteHover(this);
  });

  function Send(element) {
    let text = $(element).prev().val();
    $(element).prev().val("");
    if (!text) {
      alert("Yorumu doldurmak zorunludur");
      return;
    }
    return CreateComment(text);
  }

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
    $(sendBtn).click(function (e) {
      e.preventDefault();
      let content = Send(this);
      let position = $(this).parent()[0];

      while (!position.classList.contains("commentAndEvents"))
        position = $(position).parent()[0];

      $(position).after(content);
    });
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
    formCheckLabel.textContent =
      "Spoiler? (Bir sahne ile ilgili bilgi verecekseniz lütfen işaretleyiniz.)";
    formCheck.append(formCheckLabel);

    //commentary-footer
    let commentaryFooter = document.createElement("div");
    commentaryFooter.classList.add("commentary-footer");
    commentary.append(commentaryFooter);

    let checkRobot = document.createElement("a");
    checkRobot.classList.add("checkRobot", "isRobot");
    checkRobot.setAttribute("href", "#");
    checkRobot.textContent = "Ben robotum";
    $(checkRobot).click(function (e) {
      e.preventDefault();
      let send = $(this).parent().prev().prev().children(".commentary-send")[0];

      if (this.classList.contains("isRobot")) {
        this.classList.replace("isRobot", "isNotRobot");
        $(send).css({ "pointer-events": "fill", opacity: "1" });
        this.textContent = "Ben robot değilim";
      } else {
        this.classList.replace("isNotRobot", "isRobot");
        $(send).css({ "pointer-events": "none", opacity: ".8" });
        this.textContent = "Ben robotum";
      }
    });
    commentaryFooter.append(checkRobot);

    return commentary;
  }

  function Share(element, check) {
    if (!check) check = true;
    else {
      let position = $(element).parent()[0];

      while (!position.classList.contains("commentAndEvents"))
        position = $(position).parent()[0];

      position = $(position).children(".commentary").remove();
      check = false;
      return;
    }
    let commentary = CreateCommentary();
    $(element).parent().before(commentary);
    return check;
  }

  function CreateComment(content) {
    let commentCard = document.createElement("div");
    commentCard.classList.add("comment-card");

    let commentImage = document.createElement("div");
    commentImage.classList.add("comment-image");
    commentCard.append(commentImage);

    let userImage = document.createElement("img");
    userImage.setAttribute("src", "assets/images/avatars/avatar.png");
    userImage.setAttribute("alt", "user");
    commentImage.append(userImage);

    let commentBody = document.createElement("div");
    commentBody.classList.add("comment-body");
    commentCard.append(commentBody);

    let userDate = document.createElement("div");
    userDate.classList.add("userdate");
    commentBody.append(userDate);

    let user = document.createElement("p");
    user.classList.add("user");
    user.textContent = "Orxan";
    userDate.append(user);

    let date = document.createElement("p");
    date.classList.add("date");
    date.textContent = "Now";
    userDate.append(date);

    let commentAndEvents = document.createElement("div");
    commentAndEvents.classList.add("commentAndEvents");
    commentBody.append(commentAndEvents);

    let comment = document.createElement("p");
    comment.classList.add("comment");
    comment.textContent = content;
    commentAndEvents.append(comment);

    let commentEvents = document.createElement("div");
    commentEvents.classList.add("comment-events");
    commentAndEvents.append(commentEvents);

    let like = document.createElement("a");
    like.classList.add("like");
    like.setAttribute("href", "#");
    like.textContent = 0;

    commentEvents.append(like);

    let likeIcon = document.createElement("i");
    likeIcon.classList.add("fa-solid", "mx-1", "fa-fire-flame-curved");
    like.prepend(likeIcon);

    let share = document.createElement("a");
    share.classList.add("share");
    share.setAttribute("href", "#");
    share.textContent = "Cevapla";
    $(share).click(function (e) {
      e.preventDefault();
      IsSended = Share(this, IsSended);
    });
    commentEvents.append(share);

    let shareIcon = document.createElement("i");
    shareIcon.classList.add("fa-solid", "mx-1", "fa-share");
    share.prepend(shareIcon);

    return commentCard;
  }

  function VoteHover(currentElement) {
    let activeIndex = -1;
    let currentIndex = $(currentElement).parent().index();
    let votes = $(currentElement).parent().parent().children();
    $(votes).each(function (index, element) {
      element = $(element).children(".rate");
      if ($(element)[0].classList.contains("active")) {
        activeIndex = $(element).index();
      }
      if (index <= currentIndex) $(element).css({ color: "#dc3545" });
      else $(element).css({ color: "rgba(255,255,255,.1)" });
    });
  }

  function Vote(currentElement) {
    let currentIndex = $(currentElement).parent().index();
    let votes = $(currentElement).parent().parent().children();
    $(votes).each(function (index, element) {
      element = $(element).children(".rate");
      $(element)[0].classList.remove("active");
      if (index <= currentIndex) $(element)[0].classList.add("active");
    });
  }
});
