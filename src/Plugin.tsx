/*const MyPlugin: Plugin = () => {
  const renderAnnotationLayer = (props: RenderAnnotationLayerProps) => {
    const { pageIndex, scale } = props;
    const img = document.createElement("img");
    img.src = `https://picsum.photos/200/300?random=${pageIndex}`;
    img.width = 200;
    img.height = 300;
    img.style.position = "absolute";
    img.style.left = "100px";
    img.style.top = "100px";
    img.style.transform = `scale(${scale})`;
    img.style.transformOrigin = "0 0";
    img.style.pointerEvents = "none";
    const annotationLayer = document.querySelector(
      ".rpv-core__annotation-layer"
    ) as HTMLElement;
    annotationLayer.appendChild(img);
    return <></>;
  };

  return {
    renderAnnotationLayer,
  };
};*/
