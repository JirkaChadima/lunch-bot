module.exports = {
  drivers: [
    {
      name: 'zomato',
      options: {
        apiKey: process.env.ZOMATO_API_KEY,
      },
    },
    {
      name: 'pricnyRez',
      options: {
        url: 'http://www.pricnyrez.cz/cz/poledni-menu',
      },
    },
  ],
  restaurants: [
    {
      name: 'sedleri',
      driver: 'zomato',
      options: {
        id: '16506111',
        displayName: 'U Sedlerů',
      },
    },
    {
      name: 'sumava',
      driver: 'zomato',
      options: {
        id: '16506684',
       displayName: 'U Šumavy',
      }
    },
    {
      name: 'krajina',
      driver: 'zomato',
      options: {
        id: '16506026',
        displayName: 'Jiná krajina',
      },
    },
    {
      name: 'rez',
      driver: 'pricnyRez',
      options: {
        displayName: 'Příčný řez',
      },
    },
  ],
};
