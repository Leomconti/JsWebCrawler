const { JSDOM } = require("jsdom");

function normalizeURL(url) {
    const urlObj = new URL(url);
    let path = `${urlObj.host}${urlObj.pathname}`;
    if (path.length > 0 && path.slice(-1) === "/") {
        path = path.slice(0, -1); // remove the last / from the path
    }
    return path;
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const aTags = dom.window.document.querySelectorAll("a");
    const hrefs = [];
    aTags.forEach((tag) => {
        const href = tag.getAttribute("href");
        if (baseURL != null) {
            hrefs.push(`${baseURL}${href}`);
        } else {
            hrefs.push(href);
        }
    });

    return hrefs;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
};
