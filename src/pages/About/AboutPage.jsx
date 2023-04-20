import React from "react";
import Navbar from "../../components/common/Navbar";

const AboutPage = () => {
  return (
    <>
    <div className="flex flex-col items-center mt-8 mx-3">
      <h1 className="text-4xl font-bold mb-4">About us</h1>
      <p className="text-gray-600 text-lg mb-8">
        Welcome to Notes App, a simple and intuitive way to keep track of your notes!
      </p>
      <div className="max-w-md">
        <h2 className="text-2xl font-bold mb-2">Features</h2>
        <ul className="list-disc list-inside">
          <li className="text-gray-600 mb-2">
            Create, edit, and delete notes with a user-friendly interface.
          </li>
          <li className="text-gray-600 mb-2">
            Categorize your notes with different tags to easily organize and find them later.
          </li>
          <li className="text-gray-600 mb-2">Search notes by title or content.</li>
          <li className="text-gray-600 mb-2">
            Sort notes by date, title, or tag for convenient access to your notes.
          </li>
        </ul>
        <h2 className="text-2xl font-bold mt-6 mb-2">Technologies Used</h2>
        <ul className="list-disc list-inside">
          <li className="text-gray-600 mb-2">React.js for building the user interface.</li>
          <li className="text-gray-600 mb-2">Tailwind CSS for styling the app.</li>
          <li className="text-gray-600 mb-2">Redux for state management.</li>
        </ul>
      </div>
    </div>
    </>
  );
};

export default AboutPage;
