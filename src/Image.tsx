import { motion } from "framer-motion";
import icon from "./images/IMG_20230725_152854_464.jpg";
//import { useState } from "react";

type Props = {
  layer_x: number;
  layer_y: number;
};

const Customcomponent = ({ layer_x, layer_y }: Props) => {
  // const [isDragging, setIsDragging] = useState(false);
  // const [isResizing, setIsResizing] = useState(false);
  const getImagePositionRelativeToPage = (
    e: MouseEvent | TouchEvent | PointerEvent
  ) => {
    const image = e.target as HTMLImageElement;
    const rect = image.getBoundingClientRect();
    const x = rect.left - layer_x;
    const y = rect.top - layer_y;
    console.log(x, y);
  };
  return (
    <motion.img
      src={icon}
      className="img"
      id="draggable"
      style={{
        zIndex: 100,
      }}
      drag
      //track x and y coordinates
      onDrag={(event, _) => {
        getImagePositionRelativeToPage(event);
      }}

      //limit to the page width and document height
    />
  );
};
export default Customcomponent;
