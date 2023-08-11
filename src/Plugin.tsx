import { Plugin } from "@react-pdf-viewer/core";
//import { createRoot } from "react-dom/client";
import Customcomponent from "./Image";

// Plugins

import { createRoot } from "react-dom/client";

const customPlugin = (): Plugin => {
  const onAnnotationLayerRender = () => {
    /*if (e.status !== LayerRenderStatus.DidRender) {
      return;
    }*/
    //const layer = e.container;
    //layer.style.border = "1px red solid";
    //layer.style.zIndex = "1";

    const annotationLayers = document.querySelectorAll(
      ".rpv-core__annotation-layer"
    ) as NodeListOf<HTMLElement>;
    /*const innerPageLayers = document.querySelectorAll(
      ".rpv-core__inner-page"
    ) as NodeListOf<HTMLElement>;
    const pageLayers = document.querySelectorAll(
      ".rpv-core__page-layer"
    ) as NodeListOf<HTMLElement>;*/

    /*  innerPageLayers.forEach((layer) => {
      layer.style.position = "static";
      layer.style.transform = "none";
    });
    pageLayers.forEach((layer) => {
      layer.style.position = "static";
    });*/

    annotationLayers.forEach((layer) => {
      //render annotation layer with the draggableImage component
      //layer.style.border = "1px red solid";
      //layer.style.height = "100%";
      //layer.style.zIndex = "10";

      // a temporary fix , maybe I should try using a portal?
      const layerRoot = createRoot(layer!);

      layerRoot.render(<Customcomponent layer={layer} />);
      //createPortal(<Customcomponent layer={layer} />, layer);
    });
  };

  return {
    onAnnotationLayerRender,
  };
};
//create new custom plugin instance
export default customPlugin;
