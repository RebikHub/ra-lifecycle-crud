import React from 'react'

export default function NoteForm({text, handleInput, handleSend}) {
  return (
    <form action="" className="new-note">
      <h5 className="new-note-title">New Note</h5>
      <textarea name="" className="new-note-text" value={text} onChange={handleInput}></textarea>
      <button type="button" className="new-note-btn" onClick={handleSend}></button>
    </form>
  )
}
