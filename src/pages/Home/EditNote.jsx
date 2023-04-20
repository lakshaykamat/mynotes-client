import React, { useEffect, useState } from "react";
import { AiFillSave } from "react-icons/ai";
import Spinner from "../../components/common/Spinner";
import axios from "axios";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useParams } from "react-router-dom";
const EditNote = () => {
  const { noteId } = useParams();
  const [noteFields, setNoteFields] = useState({
    title: "",
    body: "",
    tagsString: "#general",
  });
  const [savedNote, setSavedNote] = useState({});
  const [noteTags, setNoteTags] = useState([]);

  useEffect(() => {
    fetchNote();
  }, []);
  const handleChange = (e) => {
    setNoteTags(createTags(noteFields.tagsString));
    setNoteFields((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };


  const createTags = (string) => {
    let text = string;
    const myArray = text.split(" ");
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].charAt(0) != "#") {
        let text = "#" + myArray[i];
        delete myArray[i];
        myArray[i] = text;
      }
    }
    return myArray;
  };


  const getAccessToken = () => {
    console.log("Fetching token...");
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    return JSON.parse(token).accessToken;
  };

  //! UPDATE NOTE API
  let data = JSON.stringify({
    title: noteFields.title,
    body: noteFields.body,
    tags: noteTags,
  });

  let updateNoteConfig = {
    method: "put",
    maxBodyLength: Infinity,
    url: `https://mynotes-server-jznn.onrender.com/api/notes/${noteId}`,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  async function updatingNotes () {
    try {
      const response = await axios.request(updateNoteConfig);
      setSavedNote(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = () => {
    setSavedNote(null);
    updatingNotes();
  };




  //! GETTING NOTE DATA API
  let fetchNotesConfig = {
    method: "get",
    maxBodyLength: Infinity,
    url: `https://mynotes-server-jznn.onrender.com/api/notes/${noteId}`,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };

  async function fetchNote () {
    try {
      const response = await axios.request(fetchNotesConfig);
      setNoteFields({
        title: response.data.title,
        body: response.data.body,
        tagsString: response.data.tags.join(" "),
      });
    } catch (error) {
      console.log(error);
    }
  }
  if (!savedNote) return <Spinner />


  return (
    <>
      <div className="m-6 flex flex-col gap-4">
        <input
          className="text-3xl font-bold w-full border- outline-none"
          type="text"
          name="title"
          onChange={handleChange}
          value={noteFields.title}
          placeholder="Title"
        />
        <ReactTextareaAutosize
          className="text-xl outline-none"
          rows={4}
          name="body"
          onChange={handleChange}
          value={noteFields.body}
          placeholder="Body"
        />
        <div className="bg-slate-200 ">
          <input
            type="text"
            onChange={handleChange}
            className="text-xl font-bold w-full border- outline-none"
            name="tagsString"
            value={noteFields.tagsString}
            placeholder="#tags"
          />
        </div>
      </div>

      <div
        onClick={handleSubmit}
        className="flex bg-slate-200 p-2 cursor-pointer rounded-lg fixed bottom-5 right-5"
      >
        <AiFillSave className="w-9 h-9" />
      <h1>Save Note</h1>
      </div>
    </>
  );
};

export default EditNote;
