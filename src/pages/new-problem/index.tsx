import { firestore } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

import React, { useState } from "react";

type NewProblemProps = {};

const INPUTS_INITIAL_VALUE = {
  id: "",
  title: "",
  difficulty: "",
  category: "",
  videoId: "",
  link: "",
  order: 0,
  likes: 0,
  dislikes: 0,
};

const NewProblem: React.FC<NewProblemProps> = () => {
  const [inputs, setInputs] = useState(INPUTS_INITIAL_VALUE);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputs.id || !inputs.title || !inputs.difficulty || !inputs.category) {
      alert("fill all mandatory fields");
      return;
    }
    const newProblem = {
      ...inputs,
      order: Number(inputs.order),
    };
    try {
      await setDoc(doc(firestore, "problems", inputs.id), newProblem);
      setInputs(INPUTS_INITIAL_VALUE);
      alert("saved to db");
    } catch (error) {
      alert("failed to save on db");
    }
  };

  return (
    <main className="flex bg-dark-layer-2 min-h-screen justify-center">
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          fontSize: 24,
          alignSelf: "center",
        }}
        onSubmit={handleSubmit}
      >
        <input
          value={inputs.id}
          onChange={handleInputChange}
          type="text"
          placeholder="problem id"
          name="id"
        />
        <input
          value={inputs.title}
          onChange={handleInputChange}
          type="text"
          placeholder="title"
          name="title"
        />
        <input
          value={inputs.difficulty}
          onChange={handleInputChange}
          type="text"
          placeholder="difficulty"
          name="difficulty"
        />
        <input
          value={inputs.category}
          onChange={handleInputChange}
          type="text"
          placeholder="category"
          name="category"
        />
        <input
          value={inputs.order}
          onChange={handleInputChange}
          type="number"
          placeholder="order"
          name="order"
        />
        <input
          value={inputs.videoId}
          onChange={handleInputChange}
          type="text"
          placeholder="videoId?"
          name="videoId?"
        />
        <input
          value={inputs.link}
          onChange={handleInputChange}
          type="text"
          placeholder="link?"
          name="link?"
        />
        <button className="bg-olive w-full mt-4">save to db</button>
      </form>
    </main>
  );
};

export default NewProblem;
