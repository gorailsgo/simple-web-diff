$(document).ready(function () {
  function diffUsingJS(opts={}) {
    "use strict";
    var viewType = opts["viewType"] || 0,
      baseId = opts["baseId"],
      newId = opts["newId"],
      contextSizeInputId = opts["contextSizeInputId"],
      outputDiv = opts["outputDiv"],
      baseTextName = opts["baseTextName"] || "Base Text";
      newTextName = opts["newTextName"] || "New Text";

    var base = difflib.stringAsLines($(baseId).val()),
      newtxt = difflib.stringAsLines($(newId).val()),
      sm = new difflib.SequenceMatcher(base, newtxt),
      opcodes = sm.get_opcodes(),
      diffoutputdiv = $(outputDiv)[0],
      contextSize = $(contextSizeInputId).val();

    diffoutputdiv.innerHTML = "";
    contextSize = contextSize || null;

    diffoutputdiv.appendChild(diffview.buildView({
      baseTextLines: base,
      newTextLines: newtxt,
      opcodes: opcodes,
      baseTextName: baseTextName,
      newTextName: newTextName,
      contextSize: contextSize,
      viewType: viewType
    }));
  };

  function displayDiff() {
    diffUsingJS({"baseId": "#baseText",
                 "newId": "#newText",
                 "contextSizeInputId": "#contextSize"
                 "outputDiv": "#diffoutput"
    });
  };

  $("#baseText, #newText").bind("input propertychange", displayDiff);
  displayDiff();
});
