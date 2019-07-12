const fetch = require('node-fetch');

const restaurants = {};
let options = {};

const BASE_URL = 'https://developers.zomato.com/api/v2.1/dailymenu?res_id=';

const processResult = (displayName, dailyMenus) => {
  const result = {
    displayName,
  };
  if (!dailyMenus || !dailyMenus.length) {
    return result;
  }
  result.dishes = [];
  for (const dish of dailyMenus[0].daily_menu.dishes) {
    result.dishes.push({
      name: dish.dish.name,
      price: dish.dish.price,
    });
  }
  return result;
};

const zomatoClient = (opts) => {
  options = Object.assign(options, opts);
  return {
    addRestaurant: (name, config) => {
      restaurants[name] = config;
    },
    getMenu: async (name) => {
      if (!restaurants[name]) {
        throw new Error(`Unknown restaurant ${name}`);
      }
      const data = await fetch(BASE_URL + restaurants[name].id, {
        headers: {
          // eslint-disable-next-line camelcase
          user_key: options.apiKey,
        },
      });
      return processResult(restaurants[name].displayName, (await data.json()).daily_menus);
    },
  };
};

module.exports = {
  configure: (options) => {
    return zomatoClient(options);
  },
};
