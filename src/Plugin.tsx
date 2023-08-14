import { Plugin } from "@react-pdf-viewer/core";

import CustomImageComponent from "./Image";

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

    annotationLayers.forEach((layer) => {
      // a temporary fix , maybe I should try using a portal?
      const layerRoot = createRoot(layer!);

      layerRoot.render(<CustomImageComponent layer={layer} />);
    });
  };

  return {
    onAnnotationLayerRender,
  };
};
//export plugin
export default customPlugin;
