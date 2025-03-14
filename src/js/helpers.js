// import { async } from "regenerator-runtime"; As of the latest version of Parcel (Parcel 2.x), the bundler no longer relies on regenerator-runtime by default for handling async functions in JavaScript, thanks to its shift away from Babel as the primary transpiler. Instead, Parcel now uses SWC (Speedy Web Compiler), a Rust-based compiler, for transpiling JavaScript, TypeScript, and JSX. SWC is significantly faster than Babel and handles modern JavaScript features like async/await natively without requiring runtime polyfills like regenerator-runtime in many cases. --Grok

import { TIMEOUT_SEC } from "./config";

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${sec} second`));
    }, sec * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  try {
    const fetchProm = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData),
    });

    const res = await Promise.race([fetchProm, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
