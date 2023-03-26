import React from "react";

const NoteCard = ({ title, body, tags }) => {
  const limitedBody = body.length > 150 ? `${body.slice(0, 150)}...` : body;

  return (
    <div className="bg-slate-300 hover:bg-slate-400 transition outline outline-1 outline-slate-900  rounded-lg shadow-md p-6">
      <h2 className="text-lg font-medium mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{limitedBody}</p>
      <div className="flex flex-wrap">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 rounded-full text-gray-700 text-sm px-3 py-1 mr-2 mb-2"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default NoteCard;
