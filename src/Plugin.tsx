import { Plugin, PluginOnAnnotationLayerRender } from "@react-pdf-viewer/core";
//import { createRoot } from "react-dom/client";

// Plugins

import icon from "./images/IMG_20230725_152854_464.jpg";

import { motion } from "framer-motion";

import { createRoot } from "react-dom/client";

type Props = {
  layer_x: number;
  layer_y: number;
};

const Customcomponent = ({ layer_x, layer_y }: Props) => {
  const getImagePositionRelativeToPage = (
    e: MouseEvent | TouchEvent | PointerEvent
  ) => {
    const image = e.target as HTMLImageElement;
    const rect = image.getBoundingClientRect();
    const x = rect.left - layer_x;
    const y = rect.top - layer_y;
    console.log(x, y);
  };
  return (
    <motion.img
      src={icon}
      className="img"
      id="draggable"
      style={{
        zIndex: 100,
      }}
      drag
      //track x and y coordinates
      onDrag={(event, _) => {
        getImagePositionRelativeToPage(event);
      }}

      //limit to the page width and document height
    />
  );
};

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

    annotationLayers.forEach((layer, index) => {
      //render annotation layer with the draggableImage component
      layer.style.border = "1px red solid";
      const pos = layer.getBoundingClientRect();
      const y = pos.top;
      const x = pos.left;

      // a temporary fix , maybe I should try using a portal?
      const layerRoot = createRoot(layer!);
      layerRoot.render(<Customcomponent layer_x={x} layer_y={y} />);
    });
  };

  return {
    onAnnotationLayerRender,
  };
};
//create new custom plugin instance
export default customPlugin;
