import { fileOpen, fileSave } from "browser-fs-access";

// Import
export const openProblemFile = async () => {
  const file = await fileOpen({
    description: "Text",
  });
  const text = await file.text();
  return text;
};

// Export
export const saveProblemToFile = async (content) => {
  const blob = new Blob([content], { type: "text/plain" });
  await fileSave(blob, {
    fileName: "LP.txt",
    extensions: [".txt"],
  });
};
