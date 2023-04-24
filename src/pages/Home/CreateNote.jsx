import React, { useMemo, useState } from "react";
import axios from "axios";
import ReactTextareaAutosize from "react-textarea-autosize";
import { AiFillSave } from "react-icons/ai";

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "../../components/common/Spinner";
import { useNavigate } from "react-router-dom";
const CreateNote = ({server_url}) => {
  const navigate = useNavigate()
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
  const createTags = (str) => {
  // Replace all whitespace with `#`
  const tags = str.replace(/\s+/g, "#");

  // Add `#` to the beginning of the string if it doesn't already have it
  const formattedTags = tags.startsWith("#") ? tags : `#${tags}`;

  // Split the string into an array of tags
  const tagsArray = formattedTags.split("#").filter((tag) => tag !== "");

  // Add `#` to the beginning of each tag if it doesn't already have it
  const taggedArray = tagsArray.map((tag) => (tag.startsWith("#") ? tag : `#${tag}`));

  return taggedArray;
  };

let token;
  const getAccessToken = useMemo(() => {
    console.log("Fetching token...",token);
    token = localStorage.getItem("token");
    if (!token) navigate("/login");
    return JSON.parse(token).accessToken;
  },[token])



  async function saveNoteToDB () {
    //! Save Note
    let data = JSON.stringify({
      title: noteFields.title,
      body: noteFields.body,
      tags: noteTags.length !== 0 && noteTags,
      // tags: noteTags[0] == "#" ? ["#general"] : noteTags,
    });
    let saveNoteConfig = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${server_url}/api/notes/`,
      headers: {
        Authorization: `Bearer ${getAccessToken}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const response = await axios.request(saveNoteConfig);
          console.log(response.data)
          setSavedNote(response.data);
          resolve("OKAY")
        } catch (error) {
          reject(error);
        }
      }),
      {
        pending: "Saving...",
        success: "Saved",
        error: "Failed to Save",
        duration: 5000,
        onClose: () => {
          console.log("Toast closed");
        },
      }
    );

  }

  const handleSubmit = async () => {

    if (!noteFields.title) {
      alert("Title is required")
    } else {
      saveNoteToDB();
    }
  };
  if (!savedNote) {
    return (
      <Spinner />
    )
  }
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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
        className="flex flex-row-reverse justify-center items-center font-bold drop-shadow-md bg-slate-200 gap-3 p-2 cursor-pointer rounded-lg fixed bottom-5 right-5"
      >
      <h1>SAVE</h1>
        <AiFillSave className="w-9 h-9" />
      </div>
    </>
  );
};

export default CreateNote;
