import { Plugin, PluginOnAnnotationLayerRender } from "@react-pdf-viewer/core";

// Plugins

import icon from "./images/IMG_20230725_152854_464.jpg";

import { motion } from "framer-motion";

import ReactDOM from "react-dom";
//use hard-coded image
//import imgUrl from "./images/IMG_20230725_152854_464.jpg";

const draggableImage = () => {
  return (
    <motion.img
      src={icon}
      className="img"
      id="draggable"
      drag
      dragConstraints={{ left: 0, top: 600, right: 250, bottom: 600 }}
    />
  );
};

const customPlugin = (): Plugin => {
  const onAnnotationLayerRender = (e: PluginOnAnnotationLayerRender) => {
    /*if (e.status !== LayerRenderStatus.DidRender) {
      return;
    }*/

    const annotationLayer = document.querySelectorAll(
      ".rpv-core__annotation-layer"
    ) as NodeListOf<HTMLElement>;

    annotationLayer.forEach((layer) => {
      //render annotation layer with the draggableImage component
      ReactDOM.render(draggableImage(), layer);
      const domNode = layer.querySelector("#draggable");
      console.log(domNode);
    });
  };

  return {
    onAnnotationLayerRender,
  };
};
//create new custom plugin instance
export default customPlugin;
