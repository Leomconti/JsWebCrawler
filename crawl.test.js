const { test, expect } = require("@jest/globals");
const { normalizeURL, getURLsFromHTML } = require("./crawl");

test("normalizeURL basic test", () => {
    const input = "http://teste.leo.com/leo";
    const actual = normalizeURL(input);
    const expected = "teste.leo.com/leo";
    expect(actual).toEqual(expected);
});

test("normalizeURL slashes in the end", () => {
    const input = "http://teste.leo.com/leo/";
    const actual = normalizeURL(input);
    const expected = "teste.leo.com/leo";
    expect(actual).toEqual(expected);
});

test("normalizeURL capital letters", () => {
    const input = "http://tESTe.leo.cOm/leo";
    const actual = normalizeURL(input);
    const expected = "teste.leo.com/leo";
    expect(actual).toEqual(expected);
});

test("normalizeURL https", () => {
    const input = "https://teste.leo.com/leo";
    const actual = normalizeURL(input);
    const expected = "teste.leo.com/leo";
    expect(actual).toEqual(expected);
});

test("getURLSFromHTML getting a url", () => {
    const baseUrl = null;
    const input = `<html>
            <body>
                <a href="teste.leo.com/leo"><span>Test Case 1</span></a>
            </body>
        </html>
        `;

    const actual = getURLsFromHTML(input, baseUrl);
    const expected = ["teste.leo.com/leo"];
    expect(actual).toEqual(expected);
});

test("getURLSFromHTML getting multiple urls", () => {
    const baseUrl = null;
    const input = `<html>
            <body>
                <a href="teste.leo.com/leo"><span>Test Case 1</span></a>
                <a href="leo.teste.com/teste"><span>Test Case 1.1</span></a>
            </body>
        </html>
        `;

    const actual = getURLsFromHTML(input, baseUrl);
    const expected = ["teste.leo.com/leo", "leo.teste.com/teste"];
    expect(actual).toEqual(expected);
});

test("getURLSFromHTML using baseUrl", () => {
    const baseUrl = "teste.leo.com";
    const input = `<html>
            <body>
                <a href="/leo"><span>Test Case 1</span></a>
                <a href="/teste"><span>Test Case 1.1</span></a>
            </body>
        </html>
        `;

    const actual = getURLsFromHTML(input, baseUrl);
    const expected = ["teste.leo.com/leo", "teste.leo.com/teste"];
    expect(actual).toEqual(expected);
});
