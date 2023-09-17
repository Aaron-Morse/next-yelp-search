const puppeteer = require("puppeteer");

const scrapper = async (domain) => {
  let contactEmail = "";
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });
  const page = await browser.newPage();

  await page.goto(`https://${domain}`, {
    waitUntil: "networkidle0",
  });

  const getMailToLink = async () => {
    // Trying to grab a mailto link from the homepeage
    const mailToLink = await page.$("a[href^='mailto:']");

    if (mailToLink) {
      // Extrating the href attribute value
      const hrefValue = await page.evaluate(
        (mailToLink) => mailToLink.getAttribute("href"),
        mailToLink
      );
      // Spliiting the value href value at the colon and grabbing the email and assigning it to the contactEmail variable
      contactEmail = hrefValue.split(":")[1].toLowerCase();
    }
  };

  await getMailToLink();
  if (contactEmail) {
    await browser.close();
    return contactEmail;
  }

  // Getting all a tags because the mailto selector failed
  const aTags = await page.$$("a");

  for (const link of aTags) {
    // Extracting the href value from the anchor tag to evaluate below
    const hrefValue = await page.evaluate(
      (link) => link.getAttribute("href"),
      link
    );
    // Checking to see if the value includes contact
    if (hrefValue.includes("contact")) {
      await page.goto(`https://${domain}${hrefValue}`);
      await getMailToLink();
      if (contactEmail) {
        await browser.close();
        return contactEmail;
      }
      break;
    }
  }

  await browser.close();
  contactEmail = "Not found";
  return contactEmail;
};

export default async function handler(req, res) {
  const { URL } = req.body;
  const contactEmail = await scrapper(URL);
  return res.status(200).json({ contactEmail });
}
