//Rewrite some of the plugin code , current implementation is wrong
import React from "react";
import {
  Plugin,
  PluginFunctions,
  RenderViewer,
  ViewerState,
} from "@react-pdf-viewer/core";

interface ImageInsertPluginProps {
  onImageInsert: () => void;
}

const ImageInsertPlugin: React.FC<ImageInsertPluginProps> = ({
  onImageInsert,
}) => {
  const handleImageInsert = async (
    event: React.ChangeEvent<HTMLInputElement>,
    page: ViewerState["doc"]["page"]
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const imageSrc = URL.createObjectURL(file);
    const x = 100;
    const y = 100;
    const width = 200;
    const height = 200;

    await insertImage(page, imageSrc, x, y, width, height);

    URL.revokeObjectURL(imageSrc);

    if (onImageInsert) {
      onImageInsert();
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(event) => handleImageInsert(event, page)}
      />
    </div>
  );
};
/*

const insertImage = async (page: ViewerState['doc']['page'], imageSrc: string, x: number, y: number, width: number, height: number) => {
    const pdfPage = await page.getPage();

    // Load the image
    const img = await new Promise<HTMLImageElement | null>((resolve) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => resolve(null);
        image.src = imageSrc;
    });

    if (!img) {
        console.error(`Failed to load image from ${imageSrc}`);
        return;
    }

    // Get the PDF canvas and context
    const pdfCanvas = page.getCanvas();
    const pdfContext = pdfCanvas.getContext('2d');

    // Draw the image onto the PDF canvas
    pdfContext.drawImage(img, x, y, width, height);

    // Get the PDF canvas dimensions
    const pdfWidth = pdfCanvas.width;
    const pdfHeight = pdfCanvas.height;

    // Create a new PDF canvas to hold the modified page
    const newPdfCanvas = document.createElement('canvas');
    newPdfCanvas.width = pdfWidth;
    newPdfCanvas.height = pdfHeight;

    // Get the context for the new PDF canvas
    const newPdfContext = newPdfCanvas.getContext('2d');

    // Render the modified page onto the new PDF canvas
    await pdfPage.render({
        canvasContext: newPdfContext!,
        viewport: pdfPage.getViewport({ scale: 1 }),
    });

    // Replace the old PDF canvas with the new one
    pdfCanvas.replaceWith(newPdfCanvas);
};

interface ImageInsertPluginOption {
    onImageInsert: () => void;
}

const imageInsertPlugin = (option: ImageInsertPluginOption): Plugin => {
    const { onImageInsert } = option;

    return {
        install: (pluginFunctions: PluginFunctions) => {
            const { RenderViewer } = pluginFunctions;

            const ImageInsertButton: React.FC<{ page: ViewerState['doc']['page'] }> = ({ page }) => (
                <ImageInsertPlugin onImageInsert={onImageInsert} page={page} />
            );

            const renderViewer: RenderViewer = (props) => {
                const { page } = props.viewerState.doc;

                return <>{props.children}<ImageInsertButton page={page} /></>;
            };

            return {
                renderViewer,
            };
        },
    };
};

export default imageInsertPlugin;*/
