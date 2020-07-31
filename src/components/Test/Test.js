import React from "react";
import ReactDOM from "react-dom";
import Button from "components/CustomButtons/Button.js";

function buildFileSelector() {
  const fileSelector = document.createElement("input");
  fileSelector.setAttribute("type", "file");
  fileSelector.setAttribute("multiple", "multiple");
  return fileSelector;
}

class FileDialogue extends React.Component {
  componentDidMount() {
    this.fileSelector = buildFileSelector();
  }

  handleFileSelect = (e) => {
    e.preventDefault();
    this.fileSelector.click();
    //   var uploadTask = storageRef.child('images/yii.jpg').put(file, metadata);
  };

  handleFileSelected = (e) => {
    console.log(this.fileSelector);
    //   var uploadTask = storageRef.child('images/yii.jpg').put(file, metadata);
  };

  render() {
    return (
      <div>
        <a className="button" href="" onClick={this.handleFileSelect}>
          Select files
        </a>

        <a className="button" href="" onClick={this.handleFileSelected}>
             nowSelect files
        </a>
      </div>
    );
  }
}

export default FileDialogue;
