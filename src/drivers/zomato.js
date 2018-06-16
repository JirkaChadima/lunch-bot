const zomatoClient = (options) => {
  return {
    addRestaurant: (name, config) => {
      return;
    },
    getMenu: (name) => {
      return 'menu';
    }
  };
}

module.exports = {
  configure: (options) => {
    return zomatoClient(options);
  }
}