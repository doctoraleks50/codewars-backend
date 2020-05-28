const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const jwt = require('jsonwebtoken');
const superTest = require('supertest');
const assert = require('assert');
const config = require('../config/config.json');

const token = jwt.sign({
    id: 1
}, config.secret.cookieKey);

chai.use(chaiHttp);

module.exports = {
    chai,
    chaiRequest: chai.request(app),
    token,
    superTest: superTest(app),
    assert,
};