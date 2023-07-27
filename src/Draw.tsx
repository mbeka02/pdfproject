import {
  LayerRenderStatus,
  Plugin,
  PluginOnCanvasLayerRender,
  Viewer,
} from "@react-pdf-viewer/core";

//use hard-coded image
import imgUrl from "./images/IMG_20230725_152854_464.jpg";

//props
interface DrawCanvasExampleProps {
  fileUrl: string;
}

const DrawCanvasExample: React.FC<DrawCanvasExampleProps> = ({ fileUrl }) => {
  //custom plugin for the canvas layer
  const customCanvasPlugin = (): Plugin => {
    const onCanvasLayerRender = (e: PluginOnCanvasLayerRender) => {
      // Return if the canvas isn't rendered completely
      if (e.status !== LayerRenderStatus.DidRender) {
        return;
      }

      //canvas element
      const canvas = e.ele;

      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

      const img = new Image();
      img.src = imgUrl;
      img.onload = () => {
        //create bitmap after image has succesfully loaded

        createImageBitmap(img)
          .then(function (imageBitmap) {
            //const width = imageBitmap.width;
            //const height = imageBitmap.height;
            //use bitmap as canvasImageSource ,dx, dy , dWidth , DHeight
            ctx.drawImage(imageBitmap, 10, 10, 250, 250);
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
  //create new custom plugin instance
  const customCanvasPluginInstance = customCanvasPlugin();

  return <Viewer fileUrl={fileUrl} plugins={[customCanvasPluginInstance]} />;
};

export default DrawCanvasExample;
