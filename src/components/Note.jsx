import React from 'react'

export default function Note({text, id, handleRemove}) {
  return (
    <div className="note">
      <p className="note-text">{text}</p>
      <span className="note-remove" onClick={() => handleRemove(id)}></span>
    </div>
  )
}
