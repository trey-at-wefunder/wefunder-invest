const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

let browser;

async function scrapeWefunderProfile(slug) {
  const url = `https://wefunder.com/${slug}`;

  // Use axios and cheerio for static content
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const subtitle = $('#company-profile-2021 > header > div.flex-grow.max-w-screen-md > h2').text().trim();
  console.log('Subtitle:', subtitle);

  let highlights = [];
  $('#profile-content-container > div').each((index, element) => {
    const highlight = $(element).find('div.flex-grow.ml-4.flex.align-middle.items-center.text-sm.md\\:text-base').text().trim();
    if (highlight) {
      highlights.push(highlight);
    }
  });

  console.log('Highlights:', highlights);

  // Reuse Puppeteer browser instance
  if (!browser) {
    browser = await puppeteer.launch();
  }
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });

    const videoUrl = await page.evaluate(() => {
      const videoElement = document.querySelector('#wf-video > div > div > div > div:nth-child(2) > div > video');
      return videoElement ? videoElement.src : undefined;
    });

    console.log('Video URL:', videoUrl);

    await page.close();

    return {
      subtitle,
      videoUrl,
      highlights
    };
  } catch (error) {
    console.error('Error scraping Wefunder profile:', error);
    await page.close();
    return null;
  }
}

// Ensure browser instance is closed gracefully on exit
process.on('exit', async () => {
  if (browser) {
    await browser.close();
  }
});

module.exports = scrapeWefunderProfile;
