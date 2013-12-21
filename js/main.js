$(document).foundation();

var colorLineNumbers = function () {
  $("#diffoutput td").each(function(){
    $(this).siblings().addClass($(this).attr("class"));
  });
};

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
    var reader = new FileReader();
    reader.onload = function(e) {
      var result = reader.result;

      droppable.data('content', reader.result);
      if ($("#drop-base").data('content') && $("#drop-changed").data('content')) {
        displayDiff($("#drop-base").data('content'),
                    $("#drop-changed").data('content'),
                    {"viewType": 1}); // 0 - side by side, 1 - inline
        colorLineNumbers();
        $('#diff-results').show();
        window.location.hash = "diff-results";
      }
    }
    reader.readAsText(file);
    $(this).find('.filename').text(file.name);
},

diffUsingJS = function(opts) {
  "use strict";
  var viewType         = opts["viewType"] || 0,
    baseText           = opts["baseText"],
    newText            = opts["newText"],
    outputDiv          = opts["outputDiv"],
    baseTextName       = opts["baseTextName"] || "Base Text",
    newTextName        = opts["newTextName"] || "New Text";

  var base = difflib.stringAsLines(baseText),
    newtxt = difflib.stringAsLines(newText),
    sm = new difflib.SequenceMatcher(base, newtxt),
    opcodes = sm.get_opcodes();

  return diffview.buildView({
    baseTextLines: base,
    newTextLines: newtxt,
    opcodes: opcodes,
    baseTextName: baseTextName,
    newTextName: newTextName,
    contextSize: 15,
    viewType: viewType
  });
},

displayDiffInDiv = function(diff, outputDivId) {
  $(outputDivId).html(diff);
},

displayDiff = function(baseText, newText, opts) {
  var defaults = {
    "baseText": baseText,
    "newText": newText,
  };
  var mergedOpts = $.extend({}, defaults, opts);
  var diffOutputDiv = opts["diffOutputDiv"] || "#diffoutput";
  var diff = diffUsingJS(mergedOpts);
  displayDiffInDiv(diff, diffOutputDiv);
},

displayDiffById = function(baseId, newId, opts) {
  var baseText = $(baseId).val();
  var newText = $(newId).val();
  displayDiff(baseText, newText, opts);
};

$(document).ready(function () {
  var dropBase = $('#drop-base'),
      dropChanged = $('#drop-changed');
  $('.droparea').on("dragenter", onDragEnter)
    .on("dragover", onDragOver)
    .on("dragleave", onDragLeave)
    .on("drop", onDrop);
});
