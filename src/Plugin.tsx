import { Plugin, PluginOnAnnotationLayerRender } from "@react-pdf-viewer/core";
//import { createRoot } from "react-dom/client";
import Customcomponent from "./Image";

// Plugins

import { createRoot } from "react-dom/client";

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
