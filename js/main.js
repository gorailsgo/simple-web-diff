$(document).ready(function () {
  function diffUsingJS(opts={}) {
    "use strict";
    var viewType         = opts["viewType"] || 0,
      baseText           = opts["baseText"],
      newText            = opts["newText"],
      contextSizeInputId = opts["contextSizeInputId"],
      outputDiv          = opts["outputDiv"],
      baseTextName       = opts["baseTextName"] || "Base Text",
      newTextName        = opts["newTextName"] || "New Text";

    var base = difflib.stringAsLines(baseText),
      newtxt = difflib.stringAsLines(newText),
      sm = new difflib.SequenceMatcher(base, newtxt),
      opcodes = sm.get_opcodes(),
      contextSize = $(contextSizeInputId).val();

    contextSize = contextSize || null;

    return diffview.buildView({
      baseTextLines: base,
      newTextLines: newtxt,
      opcodes: opcodes,
      baseTextName: baseTextName,
      newTextName: newTextName,
      contextSize: contextSize,
      viewType: viewType
    });
  };

  function displayDiffInDiv(diff, outputDivId) {
    $(outputDivId).html(diff);
  }

  function displayDiff(baseText, newText) {
    var diff = diffUsingJS({
      "baseText": baseText,
      "newText": newText,
      "contextSizeInputId": "#contextSize"
    });
    displayDiffInDiv(diff, "#diffoutput");
  };

  var lazyDisplayDiff = _.debounce(displayDiff, 500);

  function displayDiffById(baseId, newId) {
    var baseText = $(baseId).val();
    var newText = $(newId).val();
    lazyDisplayDiff(baseText, newText)
  }

  $("#baseText, #newText").bind("input propertychange", function() {
    displayDiffById("#baseText", "#newText");
  });
  displayDiffById("#baseText", "#newText");
});
