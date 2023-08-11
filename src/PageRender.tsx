import type { RenderPageProps } from "@react-pdf-viewer/core";

import { useEffect } from "react";
const CustomPageRender: React.FC<{
  renderPageProps: RenderPageProps;
}> = ({ renderPageProps }) => {
  useEffect(() => {
    if (
      renderPageProps.canvasLayerRendered &&
      renderPageProps.textLayerRendered
    ) {
      renderPageProps.markRendered(renderPageProps.pageIndex);
    }
  }, [renderPageProps.canvasLayerRendered, renderPageProps.textLayerRendered]);

  return (
    <div className="wrapper">
      {/* Use the canvas and/or text layers */}
      {renderPageProps.canvasLayer.children}

      {renderPageProps.textLayer.children}
      {/* last layer, images go here ... */}
      {renderPageProps.annotationLayer.children}
    </div>
  );
};
export default CustomPageRender;
