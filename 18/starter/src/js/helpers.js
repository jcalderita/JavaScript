import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async (url, recipe = undefined) => {
  try {
    const res = await Promise.race([recipe ? fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(recipe) }) : fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data.data;
  } catch (err) {
    throw err;
  }
};

/* export const getJSON = async url => {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const res = await AJAX(url);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data.data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async (url, recipe) => {
  try {
    const res = await Promise.race([fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(recipe) }), timeout(TIMEOUT_SEC)]);
    const res = await AJAX(url, recipe);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data.data;
  } catch (err) {
    throw err;
  }
}; */
