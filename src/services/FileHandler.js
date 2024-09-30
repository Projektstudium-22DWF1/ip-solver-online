import { fileOpen, fileSave } from "browser-fs-access";

export const openProblemFile = async () => {
  const file = await fileOpen({
    //mimeTypes: ["text/plain"], // Nur Textdateien zulassen
    //extensions: ['.txt'], // TODO define sesible File Input Formats
    description: "Text-Dateien",
  });
  const text = await file.text();
  console.log(text);
  return text;
};

// Speichern einer Datei
export const saveProblemToFile = async (content) => {
  const blob = new Blob([content], { type: "text/plain" });
  await fileSave(blob, {
    fileName: "LP.txt", //TODO define sensible standard output name
    extensions: [".txt"],
  });
};
