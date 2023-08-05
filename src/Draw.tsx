import {
  LayerRenderStatus,
  Plugin,
  PluginOnCanvasLayerRender,
  PluginOnTextLayerRender,
  PluginOnDocumentLoad,
  PluginOnAnnotationLayerRender,
  Viewer,
} from "@react-pdf-viewer/core";

// Plugins

import icon from "./images/IMG_20230725_152854_464.jpg";
import { motion } from "framer-motion";

// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
//use hard-coded image
//import imgUrl from "./images/IMG_20230725_152854_464.jpg";

const customPlugin = (): Plugin => {
  const onAnnotationLayerRender = (e: PluginOnAnnotationLayerRender) => {
    /*if (e.status !== LayerRenderStatus.DidRender) {
      return;
    }*/

    // const layer = e.container;

    let image = document.createElement("img");
    //insert motion.img that can be dragged
    //image = motion.img;

    image.draggable = true;
    image.id = "draggable";
    //image.ondrag = (e) => e.
    image.onclick = (e) => console.log("click");
    image.ondragstart = (e) => console.log("dragstart");
    image.ondragend = (e) => console.log("dragend");
    image.ondragover = (e) => console.log("dragover");
    image.ondragenter = (e) => console.log("dragenter");
    image.ondragleave = (e) => console.log("dragleave");
    image.ondrop = (e) => console.log("drop");
    //track x and y coordinates
    image.onmousemove = (e) => {
      console.log("x: " + e.clientX + " y: " + e.clientY);
    };
    image.src = icon;
    image.className = "img";
    const annotationLayer = document.querySelectorAll(
      ".rpv-core__annotation-layer"
    ) as NodeListOf<HTMLElement>;

    annotationLayer.forEach((layer) => {
      layer.appendChild(image);
    });

    // Return if the canvas isn't rendered completely
    /*if (e.status !== LayerRenderStatus.DidRender) {
        return;
      }
      
    

      //canvas element
      const canvas = e.ele;

      const ctx = canvas.getContext("") as CanvasRenderingContext2D;

      const img = new Image();
      //img.src = imgUrl;
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
      };*/
  };

  return {
    onAnnotationLayerRender,
  };
};
//create new custom plugin instance
export default customPlugin;
