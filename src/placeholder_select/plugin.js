const placeHolder = (parentEditor) => {
	return ({
            requires: "richcombo",
            init: function (editor) {
              editor.widgets.add("placeholder"); //Imp for using placeholder plugin
              var placeholders = [];

              var defaultConfig = {
                ...parentEditor.config,
              };

              for (var i = 0; i < defaultConfig.placeholders.length; i++) {
                var placeholder = defaultConfig.format.replace(
                  "%placeholder%",
                  defaultConfig.placeholders[i]
                );
                placeholders.push([placeholder]);
              }

              // add the menu to the editor
              editor.ui.addRichCombo("placeholder", {
                label: "Select",
                title: "Select placeholder",
                className: "cke_format",
                multiSelect: true,
                panel: {
                  css: [
                    "https://cdn.ckeditor.com/4.21.0/standard-all/skins/moono-lisa/editor.css?t=N2M9",
                  ].concat(editor.config.contentsCss),
                },

                init: function () {
                  //this.startGroup(`<input type="text" class="dropdown-search" id="dropdownSearch"/>`);
                  for (var i in placeholders) {
                    this.add(placeholders[i] + i, placeholders[i]);
                  }
                },

                onClick: function (value) {
                  editor.focus();
                  editor.fire("saveSnapshot");
                  editor.insertHtml(
                    generatePlaceholder(parentEditor, editor, value)
                  );
                  editor.fire("saveSnapshot");
                },
              });
            },
          })
}

const generatePlaceholder = (editor, editor1, text) => {
    var widgetWrapper = null,
      innerElement = new editor.htmlParser.element("span", {
        class: "cke_placeholder",
      });

    // Adds placeholder identifier as innertext.
    innerElement.add(new editor.htmlParser.text(text));
    
    widgetWrapper = editor1.widgets.wrapElement(innerElement, "placeholder");

    // Return outerhtml of widget wrapper so it will be placed
    // as replacement.
    return widgetWrapper.getOuterHtml();
  };

export default placeHolder;
