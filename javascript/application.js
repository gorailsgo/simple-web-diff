$(document).ready(function () {
  $("#baseText, #newText").bind("input propertychange", function() {
    diffUsingJS(0);
  });
});
