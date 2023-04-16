import React, { useState } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { AiFillSave } from "react-icons/ai";
import axios from "axios";
import Spinner from "../../components/common/Spinner";
import Navbar from "../../components/common/Navbar";
import ToggleButton from "./ToggleButton";
const CreateNote = () => {
  const [noteFields, setNoteFields] = useState({
    title: "",
    body: "",
    tagsString: "#general",
  });
  const [noteTags, setNoteTags] = useState([]);
  const [savedNote, setSavedNote] = useState({});
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

  let data = JSON.stringify({
    title: noteFields.title,
    body: noteFields.body,
    tags: noteTags[0] == "#" ? ["#general"] : noteTags,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://mynotes-server-jznn.onrender.com/api/notes/",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  async function makeRequest () {
    try {
      const response = await axios.request(config);
      setSavedNote(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async () => {
    if(!noteFields.title){
      alert("Title is required")
    }else{
      setSavedNote(null);
      makeRequest();
    }
  };
  if (!savedNote) {
    return (
      <>
        <Navbar />
        <Spinner />
      </>
    )
  }
  return (
    <>
      <Navbar />
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
        className=" drop-shadow-md bg-slate-200 p-2 cursor-pointer rounded-lg fixed bottom-5 right-5"
      >
        <AiFillSave className="w-9 h-9" />
      </div>
    </>
  );
};

export default CreateNote;
