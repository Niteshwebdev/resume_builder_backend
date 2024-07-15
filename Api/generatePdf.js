const puppeteer = require('puppeteer');

const generatePdf = async (htmlContent) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: true,
  });
  
  const page = await browser.newPage();
  
  // Set viewport for better rendering
  await page.setViewport({ width: 1200, height: 800 });
  
  // Set the HTML content for the page with network idle
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  // Generate the PDF
  const pdfBuffer = await page.pdf({
    format: 'A4',
    timeout: 60000,
    printBackground: true,
  });

  await browser.close();

  return pdfBuffer;
};

module.exports = generatePdf;
