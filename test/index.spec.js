/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const request = require('supertest');
const config = require('../src/config');

// Test configuration
 config.drivers = [{
  name: 'zomato',
}];
config.restaurants = [{
  name: 'sedleri',
  driver: 'zomato',
  options: {
    id: '16506111',
  },
}];

describe('API', function () {
  let server;
  beforeEach(() => {
    server = require('../src/index');
  });
  afterEach(() => {
    server.close();
  });

  describe('GET /', () => {
    it('should return version', async () => {
      await request(server)
        .get('/')
        .expect((res) => {
          expect(res.body).to.have.property('app', 'lunch-bot');
          expect(res.body).to.have.property('version');
        })
        .expect(200);
    });
  });
  
  describe('POST /', () => {
    it('should return help with no slack message', async () => {
      await request(server)
        .post('/')
        .type('form')
        .field('command', '/obed')
        .expect((res) => {
          expect(res.text).to.match(/sedleri/i);
        })
        .expect(200);
    });

    it('should return no data for an unknown restaurant', async () => {
      await request(server)
        .post('/')
        .type('form')
        .field('command', '/obed')
        .field('text', 'alcron')
        .expect((res) => {
          expect(res.text).to.match(/neumim/i);
        })
        .expect(200);
    });

    it('should return data for a known restaurant', async () => {
      await request(server)
        .post('/')
        .type('form')
        .field('command', '/obed')
        .field('text', 'sedleri')
        .expect((res) => {
          expect(res.text).to.match(/menu/i);
        })
        .expect(200);
    });
  });
});
