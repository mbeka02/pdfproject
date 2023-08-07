import { PanInfo, motion } from "framer-motion";
import icon from "./images/IMG_20230725_152854_464.jpg";
import { useState } from "react";

type Props = {
  layer_x: number;
  layer_y: number;
};

const Customcomponent = ({ layer_x, layer_y }: Props) => {
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
  const getImagePositionRelativeToPage = (
    e: MouseEvent | TouchEvent | PointerEvent
  ) => {
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
      src={icon}
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
              right: coordinates.x + dimensions.width,
              bottom: coordinates.y + dimensions.height,
            }
      }

      //limit to the page width and document height
    />
  );
};
export default Customcomponent;
