import type { RenderPageProps } from "@react-pdf-viewer/core";
import { motion, useDragControls } from "framer-motion";

import { useEffect } from "react";
import icon from "./images/IMG_20230725_152854_464.jpg";

const CustomPageRender: React.FC<{
  renderPageProps: RenderPageProps;
}> = ({ renderPageProps }) => {
  const dragControls = useDragControls();
  useEffect(() => {
    const asyncfn = async () => {
      if (
        renderPageProps.canvasLayerRendered &&
        renderPageProps.textLayerRendered
      ) {
        renderPageProps.markRendered(renderPageProps.pageIndex);
      }
    };
    asyncfn();
  }, [renderPageProps.canvasLayerRendered, renderPageProps.textLayerRendered]);

  return (
    <div className="wrapper">
      {/* Use the canvas and/or text layers */}
      {renderPageProps.canvasLayer.children}

      {/* Your custom components on page ... */}
      <div
        style={{
          padding: "0.25rem",
          width: renderPageProps.width,
          height: renderPageProps.height,

          zIndex: 1,
        }}
        className="container"
      >
        <motion.img
          src={icon}
          drag="x"
          onDrag={(_, info) => {
            console.log(info.point.x, info.point.y);
          }}
          onClick={() => console.log("clicked")}
          dragControls={dragControls}
          style={{
            width: renderPageProps.width / 20,
            height: renderPageProps.height / 20,
          }}
        />
      </div>

      {renderPageProps.annotationLayer.children}
      {renderPageProps.textLayer.children}
    </div>
  );
};
export default CustomPageRender;
