import React from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import NoteItem from "../components/NoteItem";

const Notes = ({ notes }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [text, setText] = useState("");
  const [filteredNotes, setFilterNotes] = useState(notes);

  const handleSearch = () => {
    setFilterNotes(
      notes.filter((note) => {
        if (note.title.toLowerCase().match(text.toLocaleLowerCase())) {
          return note;
        }
      })
    );
  };

  useEffect(handleSearch, [text]);
  return (
    <section>
      <header className="notes__header">
        {!showSearch && <h2>My Notes</h2>}
        {showSearch && (
          <input
            type="text"
            autoFocus
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              handleSearch();
            }}
            placeholder="Keyword..."
          />
        )}
        <button
          className="btn"
          onClick={() => setShowSearch((prevState) => !prevState)}
        >
          {showSearch ? <MdClose /> : <CiSearch />}
        </button>
      </header>

      <div className="notes__container">
        {filteredNotes.length === 0 && (
          <p className="empty__notes">No notes found.</p>
        )}
        {filteredNotes.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}
      </div>

      <Link to="/create-note" className="btn add__btn">
        <BsPlusLg className="notes__icon" />
      </Link>
    </section>
  );
};

export default Notes;
