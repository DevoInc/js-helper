'use strict';

require('should');

const config = require('../lib/config.js');

const FROM = '2018-07-09T09:00Z';
const TO = '2018-07-09T09:30Z';
const QUERY =
  'select eventdate, sessionid, level from demo.ecommerce.data';
const QUERY_ID = '1234566789';
const API_KEY =
  'fakekey';
const API_SECRET =
  'fakesecret';
const TOKEN = 'faketoken';

describe('Config validation', () => {

  it('parses empty config', () => {
    const opc = config.create({}).parseQuery({});
    config.validate(opc).should.equal(false);
  });

  it('parses valid config', () => {
    const opc = config.create({
      apiKey: API_KEY,
      apiSecret: API_SECRET,
    }).parseQuery({
      dateFrom: FROM,
      dateTo: TO,
      query: QUERY,
    });
    config.validate(opc).should.equal(true);
  });

  it('parses invalid config without auth', () => {
    const opc = config.create({}).parseQuery({
      dateFrom: FROM,
      dateTo: TO,
      queryId: '123456',
    });
    config.validate(opc).should.equal(false);
  });

  it('parses invalid config without query or queryId', () => {
    const opc = config.create({
      apiKey: API_KEY,
      apiSecret: API_SECRET,
    }).parseQuery({
      dateFrom: FROM,
      dateTo: TO,
    });
    config.validate(opc).should.equal(false);
  });

  it('parses valid config with query param and apikey', () => {
    const opc = config.create({
      apiKey: API_KEY,
      apiSecret: API_SECRET,
    }).parseQuery({
      dateFrom: FROM,
      dateTo: TO,
      query: QUERY,
    });
    config.validate(opc).should.equal(true);
  });

  it('parses valid config with query param and token', () => {
    const opc = config.create({
      token: TOKEN,
    }).parseQuery({
      dateFrom: FROM,
      dateTo: TO,
      query: QUERY,
    });
    config.validate(opc).should.equal(true);
  });

  it('parses valid config with queryId param and apikey', () => {
    const opc = config.create({
      apiKey: API_KEY,
      apiSecret: API_SECRET,
    }).parseQuery({
      dateFrom: FROM,
      dateTo: TO,
      queryId: QUERY_ID,
    });
    config.validate(opc).should.equal(true);
  });

  it('parses valid config with queryId param and token', () => {
    const opc = config.create({
      token: TOKEN,
    }).parseQuery({
      dateFrom: FROM,
      dateTo: TO,
      queryId: QUERY_ID,
    });
    config.validate(opc).should.equal(true);
  });
});

