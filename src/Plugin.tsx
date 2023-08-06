import { Plugin, PluginOnAnnotationLayerRender } from "@react-pdf-viewer/core";
//import { createRoot } from "react-dom/client";

// Plugins

import icon from "./images/IMG_20230725_152854_464.jpg";

import { motion } from "framer-motion";

import ReactDOM from "react-dom";

/*const getImagePositionRelativeToPage = (
  e: MouseEvent | TouchEvent | PointerEvent
) => {
  const image = e.target as HTMLImageElement;
  const rect = image.getBoundingClientRect();
  const x = rect.left;
  const y = rect.top;
  console.log(x, y);
};*/

const customPlugin = (): Plugin => {
  const onAnnotationLayerRender = (e: PluginOnAnnotationLayerRender) => {
    /*if (e.status !== LayerRenderStatus.DidRender) {
      return;
    }*/
    //const layer = e.container;
    //layer.style.border = "1px red solid";
    //layer.style.zIndex = "1";

    const annotationLayers = document.querySelectorAll(
      ".rpv-core__annotation-layer"
    ) as NodeListOf<HTMLElement>;

    annotationLayers.forEach((layer) => {
      //render annotation layer with the draggableImage component
      layer.style.border = "1px red solid";
      //const root_layer = createRoot(layer!);
      //root_layer.render(draggableImage());
      //temporary fix
      ReactDOM.render(
        <motion.img
          src={icon}
          className="img"
          id="draggable"
          drag
          //track x and y coordinates
          onDrag={(event, info) => {
            // console.log(info.point.x, info.point.y);
            // getImagePositionRelativeToPage(event);
          }}
          //limit to the page width and document height
        />,
        layer
      );

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
