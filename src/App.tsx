import "./App.css";
import { Worker, Viewer } from "@react-pdf-viewer/core";
//import { useEffect } from "react";
import pdf from "./pdf/ID.pdf";
//import DrawCanvasExample from "./Draw";
//import ThumbnailExample from "./Thumbnails";
import CustomPageRender from "./Rendering";
import customPlugin from "./Plugin";

// basic styling
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

function App() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const customPluginInstance = customPlugin();

  return (
    <>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer
          fileUrl={pdf}
          plugins={[defaultLayoutPluginInstance, customPluginInstance]}
          renderPage={(props) => <CustomPageRender renderPageProps={props} />}
        />
      </Worker>
    </>
  );
}

export default App;
