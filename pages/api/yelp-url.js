const jsdom = require("jsdom");
const { JSDOM } = jsdom;

export default async function handler(req, res) {
  const { url } = req.body;
  const response = await fetch(url);
  const body = await response.text();
  const dom = new JSDOM(body);
  const document = dom.window.document;
  const websiteURL = document.querySelector(
    'a[href^="/biz_redir"]'
  ).textContent;
  return res.status(200).json({ websiteURL });
}
