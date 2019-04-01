const fetch = require('node-fetch');
const parser = require('node-html-parser');

let restaurants = {};
let options = {};

const processResult = (displayName, pageContent) => {
  let result = {
    displayName,
    dishes: [],
  };
  const root = parser.parse(pageContent);
  const items = root.querySelectorAll('.innerLeft .menuItem');
  for (let i = 0; i < items.length; i++) {
    const nazev = items[i].querySelector('.nazev');
    const cena = items[i].querySelector('.cena');
    result.dishes.push({
      name: nazev && nazev.text,
      price: cena && cena.text,
    });
  }
  return result;
};

const pricnyRezClient = (opts) => {
  options = Object.assign(options, opts);
  return {
    addRestaurant: (name, config) => {
      restaurants[name] = config;
    },
    getMenu: async (name) => {
      if (!restaurants[name]) {
        throw new Error(`Unknown restaurant ${name}`);
      }
      const data = await fetch(options.url);
      return processResult(restaurants[name].displayName, await data.text());
    },
  };
};

module.exports = {
  configure: (options) => {
    return pricnyRezClient(options);
  },
};
