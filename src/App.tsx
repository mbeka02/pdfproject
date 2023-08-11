import "./App.css";
import { Worker, Viewer } from "@react-pdf-viewer/core";

//pdf document
import pdf from "./pdf/25885762.pdf";

import CustomPageRender from "./PageRender";

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
