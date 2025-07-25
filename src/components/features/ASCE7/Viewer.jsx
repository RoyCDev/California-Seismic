import { sections as chapter1 } from "../../../assets/data/ASCE7/CH1/sections.js";
import { sections as chapter2 } from "../../../assets/data/ASCE7/CH2/sections.js";
import { sections as chapter10 } from "../../../assets/data/ASCE7/CH10/sections.js";
import { sections as chapter11 } from "../../../assets/data/ASCE7/CH11/sections.js";
import { sections as chapter12 } from "../../../assets/data/ASCE7/CH12/sections.js";
import { sections as chapter13 } from "../../../assets/data/ASCE7/CH13/sections.js";
import { sections as chapter20 } from "../../../assets/data/ASCE7/CH20/sections.js";

const chapters = {
  1: chapter1,
  2: chapter2,
  10: chapter10,
  11: chapter11,
  12: chapter12,
  13: chapter13,
  20: chapter20,
};

export default function Viewer({ section }) {
  let images = [];
  let title = "Section was not found.";

  const isPicture = section.includes("figure") || section.includes("table");
  if (isPicture) {
    const parts = section.split(/figure|table/);
    const subParts = parts[1].split("-");
    const pictureCurrentChapterNumber = subParts[0].split(".")[0];
    const pictureCurrentChapter = chapters[pictureCurrentChapterNumber];
    if (pictureCurrentChapter) {
      const subsection =
        pictureCurrentChapter[subParts[0]]?.subsections?.[section];
      if (subsection) {
        const baseUrl = process.env.PUBLIC_URL || "";
        const prefix = baseUrl.includes("/ASCE7") ? baseUrl: `${baseUrl}/ASCE7`;
        images = subsection.imgs.map(
          (img) =>
            `${prefix.replace(/\/$/,"")}/CH${pictureCurrentChapterNumber}/${img}`
        );
        title = subsection.title;
      }
    }
  } else {
    const currentChapterNumber = section.split(".")[0];
    const currentChapter = chapters[currentChapterNumber];

    if (currentChapter) {
      const dotCount = section.split(".").length - 1;
      if (dotCount === 1) {
        const sectionData = currentChapter[section];
        if (sectionData && sectionData.imgs) {

          const baseUrl = process.env.PUBLIC_URL || "";
          const prefix = baseUrl.includes("/ASCE7") ? baseUrl: `${baseUrl}/ASCE7`;
          images = sectionData.imgs.map(
            (img) =>
              `${prefix.replace(/\/$/,"")}/CH${currentChapterNumber}/${img}`
          );
          title = sectionData.title;
        }
      } else {
        const [part1, part2] = section.split(".");
        const subsection =
          currentChapter[`${part1}.${part2}`]?.subsections?.[section];
        if (subsection && subsection.imgs) {
          const baseUrl = process.env.PUBLIC_URL || "";
          const prefix = baseUrl.includes("/ASCE7") ? baseUrl: `${baseUrl}/ASCE7`;
          
          images = subsection.imgs.map(
            (img) =>
              `${prefix.replace(/\/$/,"")}/CH${currentChapterNumber}/${img}`
          );
          title = subsection.title;
        } else if (subsection) {
          title = subsection.title;
        }
      }
    }
  }
  return (
    <div className="h-[75vh] overflow-y-auto">
      <h1 className="text-lg">{title}</h1>
      <div className="mt-5">
        {images.map((image, index) => {
          const imageName = image.split("/").pop();
          return (
            <img
              key={index}
              className="w-7/8 mb-5 mx-auto"
              src={image}
              alt={imageName}
            />
          );
        })}
      </div>
    </div>
  );
}
