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


});
