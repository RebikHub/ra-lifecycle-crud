import React from "react";
import Note from "./components/Note";
import NoteForm from "./components/NoteForm";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      textNote: null,
      idNote: null,
      update: false
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
    .catch((error) => console.log(error))
  };

  fetchDeleteData = (id) => {
    fetch(process.env.REACT_APP_SERVER + id, {
      method: 'DELETE',
    })
    .catch((error) => console.log(error))
  };

  handleSend = (text) => {
    this.setState({
      textNote: text
    });
  };

  handleRemove = (id) => {
    this.setState({
      idNote: id
    });
  };

  handleUpdate = () => {
    this.setState({
      update: true
    });
  };

  componentDidMount() {
    this.fetchGetData();
  };

  componentDidUpdate() {

    if (this.state.textNote !== null) {
      this.fetchPostData(this.state.textNote);
      this.fetchGetData();
      this.setState({
        textNote: null
      });
    };

    if (this.state.idNote !== null) {
      const id = this.state.idNote;
      this.fetchDeleteData(this.state.idNote);
      this.setState((state) => {
        return {
          notes: state.notes.filter((el) => el.id !== id),
          idNote: null
        };
      });
    };

    if (this.state.update) {
      this.fetchGetData();
      this.setState({
        update: false
      });
    };
  };

  componentWillUnmount() {
    console.log('unmount');
    this.setState({
      notes: [],
      textNote: null,
      idNote: null,
      update: false
    });
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
