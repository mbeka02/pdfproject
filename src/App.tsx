import "./App.css";
import { Worker } from "@react-pdf-viewer/core";
//import { useEffect } from "react";
import pdf from "./pdf/assembly_tutorial.pdf";
import DrawCanvasExample from "./Draw";

// basic styling
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

function App() {
  return (
    <>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <DrawCanvasExample fileUrl={pdf} />
      </Worker>
    </>
  );
}

export default App;
