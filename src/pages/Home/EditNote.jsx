import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import { AiFillSave } from "react-icons/ai";
import Spinner from "../../components/common/Spinner";
import axios from "axios";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const EditNote = ({ server_url }) => {
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
    tags: noteTags.length !==0 && noteTags,
  });

  let config = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${server_url}/api/notes/${noteId}`,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      "Content-Type": "application/json",
    },
    data: data,
  };

  async function updatingNotes () {



    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          const response = await axios.request(config);
          setSavedNote(response.data);
          console.log(response.data)
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

  const handleSubmit = () => {
    // setSavedNote(null);
    updatingNotes();
  };




  //! GETTING NOTE DATA API
  let config2 = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${server_url}/api/notes/${noteId}`,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };

  async function fetchNote () {
    try {
      const response = await axios.request(config2);
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

export default EditNote;
