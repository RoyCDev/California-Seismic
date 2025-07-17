import React, { useState, useEffect, useRef } from "react";
import generatorLogic from "./GeneratorLogic";
import problemIcon from "./problemIcon.png"
import { ForwardIcon, ArrowPathIcon, XMarkIcon } from "@heroicons/react/24/solid";

const valuesEqual = (val1, val2) => {
  if (Array.isArray(val1) && Array.isArray(val2)) {
    if (val1.length !== val2.length) return false;
    for (let i = 0; i < val1.length; i++) {
      if (val1[i] !== val2[i]) return false;
    }
    return true;
  }
  return val1 === val2;
};

const Question = ({ category, answeredCorrect }) => {
  const [question, setQuestion] = useState({
    question: ``,
    choices: [],
    answer: "",
  });
  const [showSolution, setShowSolution] = useState(false);
  const [viewSolution, setViewSolution] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [chosen, setChosen] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const colorRef = useRef();
  useEffect(() => {
    setQuestion(generatorLogic(category));
    setChosen(null);
    setViewSolution(false);
    setShowSolution(false);
    setSubmitted(false);
  }, [category]);

  const handleSubmit = () => {
    setShowSolution(true);
    setSubmitted(true);
    if (valuesEqual(question.answer, chosen)) {
      answeredCorrect((prev) => prev + 1);
      setIsCorrect(true);
      colorRef.current.classList.remove("bg-slate-200");
      colorRef.current.classList.add("bg-green-200");
    } else {
      answeredCorrect(0);
      colorRef.current.classList.remove("bg-slate-200");
      colorRef.current.classList.add("bg-red-200");
    }
  };

  const handleRegenerate = () => {
    setShowSolution(false);
    setChosen(null);
    setQuestion(generatorLogic(category));
    if (!submitted) {
      answeredCorrect(0);
    }
    setSubmitted(false);
    setViewSolution(false);
  }

  return (
    <div className="lg:flex space-y-6 lg:space-y-0 relative">
      <div className={`flex-1 ${viewSolution ? "lg:mr-[399px]" : ""}`}>
        <div className="flex items-center gap-2 mb-3">
          <img src={problemIcon} alt="problem icon" />
          <p className="font-semibold text-2xl text-sky-800">Random Problem Generator</p>
        </div>

        <p>{question.question}</p>
        <img
          src={question.image}
          alt="question pic"
          className="w-96 block mx-auto"
        />

        <p className="mt-5 mb-3">Please choose one of the following answers:</p>
        <table className="w-full border">
          <tbody className="divide-y divide-solid">
            {question.choices.map((choice, ind) => {
              const isSelected = valuesEqual(choice, chosen);
              return (
                (
                  <tr
                    key={ind}
                    ref={isSelected ? colorRef : null}
                    className={isSelected ? "bg-slate-200" : ""}
                  >
                    <td hidden>
                      <input
                        type="radio"
                        name="choice"
                        id={ind}
                        value={choice}
                        checked={isSelected}
                        disabled={showSolution}
                        onClick={() => setChosen(isSelected ? null : choice)}
                      />
                    </td>
                    <td>
                      <label
                        htmlFor={ind}
                        className={`block px-4 py-2.5 ${showSolution ? "" : "cursor-pointer"}`}>
                        <span className="font-semibold mr-3">{String.fromCharCode(ind + 65)}.</span>
                        {Array.isArray(choice) ? `[${choice.join(', ')}]` : choice} {question.label}
                      </label>
                    </td>
                  </tr>
                )
              )
            })}
          </tbody>
        </table>

        <div className="flex justify-end items-center mt-8 gap-5">
          <button
            className={`font-semibold bg-slate-200 w-44 p-2.5 rounded ${showSolution ? "cursor-pointer" : "pointer-events-none text-gray-500"}`}
            onClick={() => setViewSolution(!viewSolution)}
          >
            {viewSolution ? "Hide Solution" : "View Solution"}
          </button>

          {(!chosen || showSolution) ? (
            <button
              className="flex justify-center items-center gap-2 font-semibold bg-slate-700 text-white w-44 p-2.5 rounded"
              onClick={handleRegenerate}
            >
              Regenerate <ArrowPathIcon className="h-5 w-5" />
            </button>
          ) : (
            <button
              className="font-semibold bg-slate-700 text-white w-44 p-2.5 rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>

      {viewSolution &&
        <div className="lg:w-[375px] text-sm bg-slate-200 p-5 rounded right-0 lg:absolute h-full lg:overflow-y-scroll">
          <button
            className="sticky top-0 float-right bg-slate-200"
            onClick={() => setViewSolution(!viewSolution)}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
          {question.solution}
        </div>
      }
    </div>
  );
};

export default Question;