// Api/convertPdfToPng.js
const pdfjsLib = require('pdfjs-dist');
const { createCanvas, loadImage } = require('canvas');

const convertPdfToPng = async (pdfBuffer) => {
  const uint8Array = new Uint8Array(pdfBuffer);

  const loadingTask = pdfjsLib.getDocument({ data: uint8Array });
  const pdf = await loadingTask.promise;
  const page = await pdf.getPage(1);

  const viewport = page.getViewport({ scale: 1.5 });
  const canvas = createCanvas(viewport.width, viewport.height);
  const context = canvas.getContext('2d');

  const renderContext = {
    canvasContext: context,
    viewport: viewport,
  };

  await page.render(renderContext).promise;

  // Convert the canvas to a PNG buffer
  const pngBuffer = canvas.toBuffer('image/png');

  return pngBuffer;
};

module.exports = { convertPdfToPng };
