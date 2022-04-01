import React from 'react'

export default class Note extends React.Component {
  render() {
    return (
      <div className="note">
        <p className="note-text">{this.props.text}</p>
        <span className="note-remove"
          onClick={() => this.props.handleRemove(this.props.id)}></span>
      </div>
    );
  };
};
