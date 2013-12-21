$(document).ready(function () {
  function diffUsingJS(opts={}) {
    "use strict";
    var viewType = opts["viewType"],
      baseId = opts["baseId"],
      newId = opts["newId"],
      outputDiv = opts["outputDiv"];

    var base = difflib.stringAsLines($(baseId).val()),
      newtxt = difflib.stringAsLines($(newId).val()),
      sm = new difflib.SequenceMatcher(base, newtxt),
      opcodes = sm.get_opcodes(),
      diffoutputdiv = $(outputDiv)[0],
      contextSize = $("#contextSize").val();

    diffoutputdiv.innerHTML = "";
    contextSize = contextSize || null;

    diffoutputdiv.appendChild(diffview.buildView({
      baseTextLines: base,
      newTextLines: newtxt,
      opcodes: opcodes,
      baseTextName: "Base Text",
      newTextName: "New Text",
      contextSize: contextSize,
      viewType: viewType
    }));
  };

  function displayDiff() {
    diffUsingJS({"viewType": 0,
                 "baseId": "#baseText",
                 "newId": "#newText",
                 "outputDiv": "#diffoutput"
    });
  };

  $("#baseText, #newText").bind("input propertychange", displayDiff);
  displayDiff();
});

