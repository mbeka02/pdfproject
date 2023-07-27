import {
  Plugin,
  Viewer,
  PluginOnCanvasLayerRender,
  LayerRenderStatus,
} from "@react-pdf-viewer/core";

import imgUrl from "../images/IMG_20230725_152854_464.jpg";

const img = new Image();
img.src = imgUrl;

const CustomPlugin = (): Plugin => {
  const onCanvasLayerRender = (e: PluginOnCanvasLayerRender) => {
    //evt occurs when canvas layer is rendered

    //if the canvas hasn't rendered properly
    if (e.status !== LayerRenderStatus.DidRender) {
      //console.log("no render");
      return;
    }

    //canvas element
    const canvas = e.ele;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    img.onload = () => {
      //create bitmap after image has succesfully loaded
      createImageBitmap(img)
        .then((imageBitmap) => {
          const width = imageBitmap.width;
          const height = imageBitmap.height;
          ctx.drawImage(imageBitmap, 3, 4, 100, 100);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  };

  return {
    onCanvasLayerRender,
  };
};

export default CustomPlugin;
