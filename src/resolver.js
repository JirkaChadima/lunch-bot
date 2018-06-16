const config = require('./config');
const zomatoDriver = require('./drivers/zomato');
const availableDrivers = {
  zomato: zomatoDriver,
}

let enabledDrivers = {};
let restaurantDriverMapping = {};

for (let driver of config.drivers) {
  if (availableDrivers[driver.name]) {
    enabledDrivers[driver.name] = availableDrivers[driver.name].configure(driver.options);
  }
}

for (let restaurant of config.restaurants) {
  if (enabledDrivers[restaurant.driver]) {
    enabledDrivers[restaurant.driver].addRestaurant(restaurant.name, restaurant.options);
    restaurantDriverMapping[restaurant.name] = enabledDrivers[restaurant.driver];
  }
}

module.exports = {
  resolve: (restaurant) => {
    if (!restaurant) {
      return Object.keys(restaurantDriverMapping).join(', ');
    }
    if (!restaurantDriverMapping[restaurant]) {
      return `**${restaurant}** neumim.`;
    }
    const driver = restaurantDriverMapping[restaurant];
    return driver.getMenu(restaurant);
  }
};