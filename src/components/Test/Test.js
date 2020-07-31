import React from "react";
import ReactDOM from "react-dom";
import Button from "components/CustomButtons/Button.js";

import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";



class FileDialogue extends React.Component {
  constructor(props) {
    // highlight-range{3}
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    // highlight-range{3}
    event.preventDefault();
    console.log(this.fileInput.current.files);

    alert(`Selected file - ${this.fileInput.current.files[0].name}`);

    // Create a root reference
    var storageRef = firebase.storage().ref();

    var file=this.fileInput.current.files[0];
    var uploadTask = storageRef.child('testimage.png')
      .put(file).then(function(snapshot) {
        console.log('Uploaded a blob or file!');
      });


      console.log(uploadTask);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default FileDialogue;
