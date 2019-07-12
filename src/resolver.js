const config = require('./config');
const zomatoDriver = require('./drivers/zomato');
const pricnyRezDriver = require('./drivers/pricny-rez');
const availableDrivers = {
  zomato: zomatoDriver,
  pricnyRez: pricnyRezDriver,
};

const enabledDrivers = {};
const restaurantDriverMapping = {};

for (const driver of config.drivers) {
  if (availableDrivers[driver.name]) {
    enabledDrivers[driver.name] = availableDrivers[driver.name].configure(driver.options);
  }
}

for (const restaurant of config.restaurants) {
  if (enabledDrivers[restaurant.driver]) {
    enabledDrivers[restaurant.driver].addRestaurant(restaurant.name, restaurant.options);
    restaurantDriverMapping[restaurant.name] = enabledDrivers[restaurant.driver];
  }
}

const formatDailyMenu = (dailyMenu) => {
  const today = new Date();
  const formattedResult = [`*${dailyMenu.displayName}* - ${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}`];
  if (!dailyMenu.dishes) {
    formattedResult.push('Pro dnešek zatím nevíme...');
  } else {
    for (const dish of dailyMenu.dishes) {
      if (!dish.price) {
        formattedResult.push('\r\n');
        formattedResult.push(`_${dish.name}_`);
      } else {
        formattedResult.push(`${dish.name} - ${dish.price}`);
      }
    }
  }

  return formattedResult.join('\r\n');
};

module.exports = {
  _enabledDrivers: enabledDrivers,
  resolve: async (restaurant) => {
    if (!restaurant) {
      return Object.keys(restaurantDriverMapping).join(', ');
    }
    if (!restaurantDriverMapping[restaurant]) {
      return `**${restaurant}** neumim.`;
    }
    const driver = restaurantDriverMapping[restaurant];
    return formatDailyMenu(await driver.getMenu(restaurant));
  },
};
