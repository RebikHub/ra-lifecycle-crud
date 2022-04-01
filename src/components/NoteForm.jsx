import React from 'react'

export default class NoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  handleInput = (ev) => {
    this.setState({
      text: ev.target.value
    })
  };

  render() {
    return (
      <form action="" className="new-note">
        <h5 className="new-note-title">New Note</h5>
        <textarea name="" className="new-note-text"
          value={this.state.text}
          onChange={this.handleInput}></textarea>
        <button type="button" className="new-note-btn"
          onClick={() => {
              this.props.handleSend(this.state.text)
              this.setState({
                text: ''
              })
            }}></button>
      </form>
    );
  };
};
