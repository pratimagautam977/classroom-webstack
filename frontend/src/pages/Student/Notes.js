import Masonry from "masonry-layout";
import React from "react";
import Helmet from "react-helmet";

class Note extends React.Component {
  render() {
    var style = { backgroundColor: this.props.color };
    return (
      <div className="note" style={style}>
        <span className="delete-note" onClick={this.props.onDelete}>
          {" "}
          ×{" "}
        </span>
        {this.props.children}
      </div>
    );
  }
}

class NoteEditor extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      color: "#FFA726",
    };
  }

  handleTextChange = (event) => {
    this.setState({ text: event.target.value });
  };

  handleNoteAdd = () => {
    var newNote = {
      text: this.state.text,
      color: this.state.color,
      id: Date.now(),
    };

    this.props.onNoteAdd(newNote);
    this.setState({ text: "" });
  };

  handleColorChange = (event) => {
    this.setState({ color: event.target.value });
  };

  render() {
    return (
      <div className="note-editor">
        <textarea
          placeholder="Enter your note here..."
          rows={5}
          className="textarea"
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <div className="color-picker" onChange={this.handleColorChange}>
          <input type="radio" name="color-pick" value="#F06292" id="color1" />
          <label
            htmlFor="color1"
            style={{ backgroundColor: "#F06292" }}
          ></label>
          <input type="radio" name="color-pick" value="#BA68C8" id="color2" />
          <label
            htmlFor="color2"
            style={{ backgroundColor: "#BA68C8" }}
          ></label>
          <input type="radio" name="color-pick" value="#FFD54F" id="color3" />
          <label
            htmlFor="color3"
            style={{ backgroundColor: "#FFD54F" }}
          ></label>
          <input type="radio" name="color-pick" value="#4FC3F7" id="color4" />
          <label
            htmlFor="color4"
            style={{ backgroundColor: "#4FC3F7" }}
          ></label>
          <input type="radio" name="color-pick" value="#AED581" id="color5" />
          <label
            htmlFor="color5"
            style={{ backgroundColor: "#AED581" }}
          ></label>
        </div>
        <button className="add-button" onClick={this.handleNoteAdd}>
          Add
        </button>
      </div>
    );
  }
}

class NotesGrid extends React.Component {
  constructor(props) {
    super(props);
    this.gridRef = React.createRef();
  }

  componentDidMount() {
    // var grid = this.refs.grid;
    this.msnry = new Masonry(this.gridRef.current, {
      itemSelector: ".note",
      columnWidth: 200,
      gutter: 10,
      isFitWidth: true,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.notes.length !== prevProps.notes.length) {
      this.msnry.reloadItems();
      this.msnry.layout();
    }
  }

  render() {
    var onNoteDelete = this.props.onNoteDelete;

    return (
      <div className="notes-grid" ref={this.gridRef}>
        {this.props.notes.map(function (note) {
          return (
            <Note
              key={note.id}
              onDelete={onNoteDelete.bind(null, note)}
              color={note.color}
            >
              {note.text}
            </Note>
          );
        })}
      </div>
    );
  }
}

class NoteSearch extends React.Component {
  handleSearch = (event) => {
    this.props.onSearch(event.target.value.toLowerCase());
  };

  render() {
    return (
      <input
        type="search"
        className="search-input"
        placeholder="Search..."
        onChange={(event) => {
          this.handleSearch(event);
        }}
      />
    );
  }
}

export default class NotesApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      searchValue: "",
      filteredNotes: [],
    };
  }
  componentDidMount() {
    var localNotes = JSON.parse(localStorage.getItem("notes"));
    // Axios.get("http://localhost:3000/student/notes", {
    //   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    // }).then((notes) => {
    //   if (notes !== null) {
    //     this.setState({
    //       notes: JSON.stringify(notes),
    //       filteredNotes: JSON.stringify(notes),
    //     });
    //   }
    //   // this.setState({ notes: localNotes, filteredNotes: localNotes });
    // });
    if (localNotes) {
      this.setState({ notes: localNotes, filteredNotes: localNotes });
    }
  }

  // componentDidUpdate(prevProps, prevState) {//this seems not working because the updates on change takes place here
  //   if (prevState.filteredNotes !== this.state.filteredNotes) {
  //     this._updateLocalStorage();
  //     if (this.state.searchValue !== "") {
  //       this.setState({
  //         filteredNotes: this.state.notes.filter(
  //           note =>
  //             note.text
  //               .toLowerCase()
  //               .indexOf(this.state.searchValue.toLowerCase()) !== -1
  //         )
  //       });
  //     } else {
  //       this.setState({
  //         filteredNotes: this.state.notes
  //       });
  //     }
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    this._updateLocalStorage();
    if (
      this.state.searchValue !== "" &&
      this.state.searchValue !== prevState.searchValue
    ) {
      this.setState({
        filteredNotes: this.state.notes.filter(
          (note) =>
            note.text
              .toLowerCase()
              .indexOf(this.state.searchValue.toLowerCase()) !== -1
        ),
      });
    } else if (this.state.filteredNotes === this.state.notes) {
      //do nothing
    } else if (this.state.searchValue === "") {
      this.setState({
        filteredNotes: this.state.notes, //this was trying to call unlimited times
      });
    }
  }

  handleNoteDelete = (note) => {
    var noteId = note.id;
    var newNotes = this.state.notes.filter(function (note) {
      return note.id !== noteId;
    });
    this.setState({ notes: newNotes });
  };

  handleNoteAdd = (newNote) => {
    var newNotes = this.state.notes.slice();
    newNotes.unshift(newNote);
    this.setState({ notes: newNotes });
  };

  handleSearch = (text) => {
    this.setState({ searchValue: text });
  };

  render() {
    return (
      <>
        <Helmet>
          <style>{`
        #mount-point {
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -webkit-flex-direction: column;
              -ms-flex-direction: column;
                  flex-direction: column;
          -webkit-box-align: center;
          -webkit-align-items: center;
              -ms-flex-align: center;
                  align-items: center;
      }
      
      .note {
          width: 200px;
          min-height: 50px;
          height: auto;
          float: left;
          background-color: yellow;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
          border-radius: 2px;
          padding: 10px;
          margin-bottom: 10px;
          -webkit-transition: box-shadow .3s;
          transition: box-shadow .3s;
          white-space: pre-wrap;
          white-space: -moz-pre-wrap;
          white-space: -pre-wrap;
          white-space: -o-pre-wrap;
          word-wrap: break-word;
      }
      
      .note:hover {
          box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
      }
      
      .delete-note {
          position: absolute;
          top:5px;
          right:5px;
          display: none;
          color: rgba(0,0,0,0.6);
          cursor: pointer;
      }
      
      .note:hover .delete-note {
          display: block;
      }
      
      .note-editor {
          width: 100%;
          max-width: 800px;
          padding: 16px;
          margin: 16px auto;
          background-color: white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
          border-radius: 2px;
          display: -webkit-box;
          display: -webkit-flex;
          display: -ms-flexbox;
          display: flex;
          -webkit-box-orient: vertical;
          -webkit-box-direction: normal;
          -webkit-flex-direction: column;
              -ms-flex-direction: column;
                  flex-direction: column;
      }
      
      .textarea {
          width: 100%;
          resize: none;
          margin: 5px;
          font-size: 14px;
          border: none;
          font-weight: 300;
      }
      
      .textarea:focus {
          outline: 0;
      }
      
      .add-button {
          -webkit-align-self: flex-end;
              -ms-flex-item-align: end;
                  align-self: flex-end;
          width: 100px;
          background-color:#44c767;
          border-radius:28px;
          border:1px solid #18ab29;
          cursor:pointer;
          color:#ffffff;
          font-size:14px;
          padding:8px 8px;
          text-transform: uppercase;
          text-decoration:none;
          text-shadow:0px 1px 0px #2f6627;
          height: 35px;
      }
      
      .add-button:hover {
          background-color:#5cbf2a;
          
      }
      
      .add-button:active {
          position:relative;
          top:1px;
      }
      
      .add-button:focus {
          outline: 0;
      }
      
      .notes-grid {
          margin: 0 auto;
      }
      
      .notes-app {
          max-width: 960px;
          width: 100%;
          min-height: 600px;
      }
      
      .app-header {
          text-align: center;
          font-weight: 500;
          color: grey;
          text-shadow: 0px 2px 3px rgba(255,255,255,0.5);
      }
      
      .color-picker {
        width: 50%;
        margin-bottom: -35px;
      }
      .color-picker input {
        visibility: hidden;
        width: 0;
        margin: 0;
      }
      .color-picker label {
        display: inline-block;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        margin-right: 5px;
        position: relative;
        cursor: pointer;
      }
      .color-picker input[type="radio"]:checked+label:after { 
        content: "";
        position: absolute;
        transform: rotate(45deg);
        left: 10px;
        top: 6px;
        opacity: .5;
        width: 5px;
        height: 10px;
        border-right: 1px solid;
        border-bottom: 1px solid;
      } 
      .search-input {
        margin: auto;
        display: block;
        padding: 7px 20px;
        font-size: 18px;
        line-height: 1;
        outline: none;
        border-radius: 17px;
        border: 1px solid rgba(0,0,0,0.24);
      }
        `}</style>
        </Helmet>
        <div className="notes-app">
          <NoteSearch onSearch={(text) => this.handleSearch(text)} />
          <NoteEditor onNoteAdd={this.handleNoteAdd} />
          <NotesGrid
            //the issue is either it renders notes or filterednotes and here filternotes should be there but unfortunelty this is not updaating in thestate
            notes={this.state.filteredNotes} //this.state.filteredNotes
            onNoteDelete={this.handleNoteDelete}
          />
        </div>
      </>
    );
  }

  _updateLocalStorage = () => {
    var notes = JSON.stringify(this.state.notes);
    localStorage.setItem("notes", notes);
    // Axios.get(
    //   "http://localhost:3000/student/notes",
    //   { notes: JSON.stringify(this.state.notes) },
    //   {
    //     headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    //   }
    // ).then((notes) => {
    //   console.log("success");
    // });
  };
}
