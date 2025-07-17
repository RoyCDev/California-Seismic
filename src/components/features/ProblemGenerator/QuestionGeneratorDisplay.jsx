import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import Question from "./Question";
import Tooltip from "../../common/Tooltip";
import fundamentalPeriodIcon from "./categoryIcons/fundamentalPeriod.png";
import nonstructuralComponentIcon from "./categoryIcons/nonstructuralComponent.png";
import baseShearIcon from "./categoryIcons/baseShear.png";
import randomIcon from "./categoryIcons/random.png";

const QuestionGeneratorDisplay = () => {
  const categories = [
    { title: "Fundamental Period", icon: fundamentalPeriodIcon },
    { title: "Nonstructural Component", icon: nonstructuralComponentIcon },
    { title: "Base Shear", icon: baseShearIcon },
    { title: "Random", icon: randomIcon }
  ];
  const [category, setCategory] = useState("Fundamental Period");
  const [answeredCorrect, setAnsweredCorrect] = useState(0);
  const [bestScore, setBestScore] = useState(
    localStorage.getItem("bestScore")
      ? parseInt(JSON.parse(localStorage.getItem("bestScore")))
      : 0
  );
  useEffect(() => {
    if (answeredCorrect > bestScore) {
      setBestScore(answeredCorrect);
    }
  }, [answeredCorrect]);
  useEffect(() => {
    localStorage.setItem("bestScore", JSON.stringify(bestScore));
  }, [bestScore]);

  return (
    <div className="text-start flex flex-col lg:flex-row gap-6 px-4 mx-auto my-8 max-w-screen-xl">
      <div className="text-sm text-gray-500 flex flex-col flex-shrink-0">
        <p className="mb-1">Category</p>
        {categories.map(({ title, icon }) => (
          <div
            key={title}
            className={`flex items-center gap-3 p-3 pr-5 rounded-lg cursor-pointer ${category === title ? " bg-yellow-50 text-black" : ""}`}
            onClick={() => setCategory(title)}
          >
            <img src={icon} className="size-8" />
            {title}
          </div>
        ))}

        <div className="text-black mt-4 lg:mt-auto">
          <Tooltip content="Timer for 2:45 mins. Changes to red color after specified time.">
            <Timer />
          </Tooltip>
          <div className="flex justify-around">
            <Tooltip content="Streak of correctly answered in current session.">
              <div className="flex items-center gap-5">
                <p className="text-gray-500">Current</p>
                <p className="font-bold">{answeredCorrect}</p>
              </div>
            </Tooltip>
            <Tooltip content="Best streak of correctly answered in all sessions.">
              <div className="flex items-center gap-5">
                <p className="text-gray-500">Best</p>
                <p className="font-bold">{bestScore}</p>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>

      <Question category={category} answeredCorrect={setAnsweredCorrect} />
    </div>
  );
};

export default QuestionGeneratorDisplay;