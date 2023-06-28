import { useState } from "react";
import { CKEditor } from "ckeditor4-react";
import placeHolder from "./placeholder_select/plugin";

const App = () => {
  const [value, setValue] = useState("");

  const placeholdersArray = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antigua &amp; Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bermuda",
    "Bhutan",
    "Bolivia",
    "Bosnia &amp; Herzegovina",
    "Botswana",
    "Brazil",
    "British Virgin Islands",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Cape Verde",
    "Cayman Islands",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Congo",
    "Cook Islands",
    "Costa Rica",
    "Cote D Ivoire",
    "Croatia",
    "Cruise Ship",
    "Cuba",
    "Cyprus",
  ];
  const submitBtn = () => {
    console.log(value);
  };

  return (
    <div className="App">
      <h2>Using CKEditor 5 build in React</h2>
      <CKEditor
        value={value}
        data="<p>Hello from CKEditor 5!</p>"
        onReady={(editor: any) => {
          // You can store the "editor" and use when it is needed.
        }}
        onChange={(e: any) => {
          const data = e.editor.getData();
          setValue(data);
        }}
        onBeforeLoad={(editor: any) => {
          editor.plugins.add("placeholder", placeHolder(editor));
          editor.config = {
            ...editor.config,
            placeholders: placeholdersArray,
            format: "%placeholder%",
          };
          editor.config.extraPlugins = "placeholder";
        }}
        config={{
          toolbar: [
            ["placeholder"],
            ["Bold", "Italic", "Underline", "Link", "Unlink", "Image"],
            [
              "NumberedList",
              "BulletedList",
              "list",
              "indent",
              "blocks",
              "Paragraph",
            ],
          ],
        }}
      />
      <button onClick={submitBtn}>Click</button>
    </div>
  );
};
export default App;
