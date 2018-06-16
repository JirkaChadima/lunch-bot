module.exports = {
  drivers: [
    {
      name: 'zomato',
      options: {
        apiKey: process.env.ZOMATO_API_KEY,
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
      name: 'krajina',
      driver: 'zomato',
      options: {
        id: '16506026',
        displayName: 'Jiná krajina',
      },
    },
  ],
};
