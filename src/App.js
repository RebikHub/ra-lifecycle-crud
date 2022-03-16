import React, { useEffect, useState } from "react";
import Note from "./components/Note";
import NoteForm from "./components/NoteForm";

export default function App() {
  const [notes, setNotes] = useState([])
  const [text, setText] = useState('')
  const back = 'https://react-note-back.herokuapp.com'
  async function fetchGetData() {
    const url = `${back}/notes`
    const resp = await fetch(url)
    const data = await resp.json()
    setNotes(data)
    console.log(data);
  }
  async function fetchPostData(text) {
    const url = `${back}/notes`
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(text)
    })
  }
  async function fetchDeleteData(id) {
    const url = `${back}/notes/${id}`
    await fetch(url, {
      method: 'DELETE',
    })
  }
  function handleInput(ev) {
    setText(ev.target.value)
  }
  function handleSend() {
    if (text !== '') {
      fetchPostData(text)
      setText('')
      fetchGetData()
    }
  }
  function handleRemove(id) {
    fetchDeleteData(id)
    setNotes(notes.filter((el) => el.id !== id))
  }
  useEffect(() => {
    fetchGetData()
  }, [])
  return (
    <div className="notes">
      <header className="notes-head">
        <h4 className="notes-title">Notes</h4>
        <span className="notes-update" onClick={() => fetchGetData()}></span>
      </header>
      <div className="notes-list">
        {notes.map((el) =>
          <Note text={el.text} id={el.id} handleRemove={handleRemove} key={el.id}/>
        )}
      </div>
      <NoteForm text={text} handleInput={handleInput} handleSend={handleSend}/>
    </div>
  );
}
