import { PanInfo, motion } from "framer-motion";

import { useState } from "react";

type Props = {
  layer: HTMLElement;
};

const Customcomponent = ({ layer }: Props) => {
  const [isDragging, setIsDragging] = useState(true);
  // const [isResizing, setIsResizing] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: 200,
    height: 200,
  });
  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
  });
  /*const images = [
    "/image1.jpg",
    "/image2.jpg",
    "/image3.jpg",
    "/image4.jpg",
    "/image5.jpg",
    "image6.jpg",
  ];*/
  // const randomImage = images[Math.floor(Math.random() * images.length)];
  const getImagePositionRelativeToPage = (
    e: MouseEvent | TouchEvent | PointerEvent
  ) => {
    //for the layer
    const pos = layer.getBoundingClientRect();
    const layer_x = pos.left;
    const layer_y = pos.top;
    //perhaps I should also consider any offset caused by the scroll bar
    //for the image
    const image = e.target as HTMLImageElement;
    const rect = image.getBoundingClientRect();
    const x = rect.left - layer_x;
    const y = rect.top - layer_y;
    setCoordinates({ x, y });
    console.log(x, y);
  };
  const resizeImage = (info: PanInfo) => {
    setDimensions({
      width: dimensions.width + info.delta.x,
      height: dimensions.height + info.delta.y,
    });
  };

  return (
    <motion.img
      src="/image2.jpg"
      className="img"
      id="draggable"
      style={{
        zIndex: 100,
        cursor: isDragging ? "pointer" : "grab",
        width: dimensions.width,
        height: dimensions.height,
      }}
      drag
      //track x and y coordinates
      onDrag={(event, info) => {
        isDragging ? getImagePositionRelativeToPage(event) : resizeImage(info);
      }}
      onDoubleClick={() => setIsDragging((prev) => !prev)}
      dragConstraints={
        isDragging
          ? false
          : {
              //placeholder for now , the idea is to limit the movement of the image when it is not being dragged while retaining the same position
              left: coordinates.x,
              top: coordinates.y,
              right: coordinates.x,
              bottom: coordinates.y,
            }
      }

      //limit to the page width and document height
    />
  );
};
export default Customcomponent;
