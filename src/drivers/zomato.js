const zomatoClient = (options) => {
  return {
    addRestaurant: (name, config) => {
      
    },
    getMenu: (name) => {
      return 'menu';
    },
  };
};

module.exports = {
  configure: (options) => {
    return zomatoClient(options);
  },
};
