const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const { PDFDocument } = require('pdf-lib');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ensure PDFs directory exists
const pdfsDir = path.join(__dirname, 'pdfs');
fs.mkdir(pdfsDir, { recursive: true }).catch(console.error);

// Platform-specific scraping functions
const scrapePlatforms = {
  instagram: async (username, password) => {
    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    try {
      const page = await browser.newPage();
      
      // Navigate to Instagram
      await page.goto('https://www.instagram.com/accounts/login/', {
        waitUntil: 'networkidle2'
      });


      await page.type('input[name="username"]', username);
      await page.type('input[name="password"]', password);
      await page.click('button[type="submit"]');

      await page.waitForNavigation({ 
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      const screenshotPath = path.join(pdfsDir, `instagram_${username}_screenshot.png`);
      await page.screenshot({ path: screenshotPath });

      // Create PDF from screenshot
      const pdfDoc = await PDFDocument.create();
      const page1 = pdfDoc.addPage();
      const imgBytes = await fs.readFile(screenshotPath);
      const img = await pdfDoc.embedPng(imgBytes);
      
      const { width, height } = img.scale(0.5);
      page1.drawImage(img, {
        x: 50,
        y: 50,
        width,
        height
      });

      const pdfBytes = await pdfDoc.save();
      const pdfPath = path.join(pdfsDir, `instagram_${username}_login.pdf`);
      await fs.writeFile(pdfPath, pdfBytes);

      await browser.close();

      return {
        pdfPath: `/pdfs/instagram_${username}_login.pdf`,
        message: 'Scraping completed'
      };

    } catch (error) {
      console.error('Instagram Scraping Error:', error);
      await browser.close();
      throw error;
    }
  },

  facebook: async (username, password) => {
    return { 
      pdfPath: '', 
      message: 'Facebook scraping not implemented' 
    };
  },

  x: async (username, password) => {
    // Similar implementation for X (Twitter)
    return { 
      pdfPath: '', 
      message: 'X scraping not implemented' 
    };
  }
};

app.post('/api/scrape', async (req, res) => {
  const { username, password, platform } = req.body;

  try {
    if (!scrapePlatforms[platform]) {
      return res.status(400).json({ error: 'Unsupported platform' });
    }

    const result = await scrapePlatforms[platform](username, password);
    
    res.json({
      success: true,
      ...result
    });

  } catch (error) {
    console.error('Scraping Error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Serve PDF files statically
app.use('/pdfs', express.static(pdfsDir));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});