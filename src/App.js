import React, { useEffect, useState } from "react";

export default function App() {
  const [note, setNote] = useState(['hi'])
  useEffect(() => {
    async function fetchData() {
      const url = 'http://localhost:7777/notes'
      const resp = await fetch(url)
      const data = await resp.json()
      console.log(data);
      setNote((prev) => ([...prev, ...data]))
      console.log(note);
    }
    fetchData()
  }, [])
  return (
    <div className="App">
      {note}
    </div>
  );
}
