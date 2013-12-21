$(document).foundation();

var onDragEnter = function(event) {
    event.preventDefault();
    $(this).addClass("dragover");
},

onDragOver = function(event) {
    event.preventDefault();
    if(!$(this).hasClass("dragover"))
        $(this).addClass("dragover");
},

onDragLeave = function(event) {
    event.preventDefault();
    $(this).removeClass("dragover");
},

onDrop = function(event) {
    var droppable = $(this);
    $('#text-error-alert').hide();
    event.preventDefault();
    $(this).removeClass("dragover");
    var file = event.originalEvent.dataTransfer.files[0];
    console.log(file);
    var reader = new FileReader();
    reader.onload = function(e) {
      var result = reader.result;

      droppable.data('content', reader.result);
      console.log(result.length);
    }
    reader.readAsText(file);
    $(this).find('.filename').text(file.name);

}

$(document).ready(function () {
  var dropBase = $('#drop-base'),
      dropChanged = $('#drop-changed');
  $('.droparea').on("dragenter", onDragEnter)
    .on("dragover", onDragOver)
    .on("dragleave", onDragLeave)
    .on("drop", onDrop);
});
