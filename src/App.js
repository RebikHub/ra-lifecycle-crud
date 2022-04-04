import React from "react";
import Note from "./components/Note";
import NoteForm from "./components/NoteForm";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
  };

  fetchGetData = () => {
    fetch(process.env.REACT_APP_SERVER)
      .then((response) => response.json())
      .then((getNotes) => {
        this.setState({
          notes: getNotes
        })
      })
      .catch((error) => console.log(error))
  };

  fetchPostData = (text) => {
    fetch(process.env.REACT_APP_SERVER, {
      method: 'POST',
      body: JSON.stringify(text)
    })
    .then(() => this.fetchGetData())
    .catch((error) => console.log(error))
  };

  fetchDeleteData = (id) => {
    fetch(process.env.REACT_APP_SERVER + id, {
      method: 'DELETE',
    })
    .then(() => this.fetchGetData())
    .catch((error) => console.log(error))
  };

  handleSend = (text) => {
    this.fetchPostData(text);
  };

  handleRemove = (id) => {
    this.fetchDeleteData(id);
  };

  handleUpdate = () => {
    this.fetchGetData();
  };

  componentDidMount() {
    this.fetchGetData();
  };

  render() {
    return (
      <div className="notes">
        <header className="notes-head">
          <h4 className="notes-title">Notes</h4>
          <span className="notes-update"
            onClick={this.handleUpdate}></span>
        </header>
        <div className="notes-list">
          {this.state.notes.map((el) =>
            <Note
              text={el.text}
              id={el.id}
              handleRemove={this.handleRemove}
              key={el.id}/>
          )}
        </div>
        <NoteForm handleSend={this.handleSend}/>
      </div>
    );
  };
};
