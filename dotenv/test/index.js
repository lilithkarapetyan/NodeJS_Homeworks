const { expect } = require('chai');
const dotenv = require('../dotenv');
dotenv.config('./test/.env');

describe('dotenv', function () {
    describe('config', function () {
        it('should put teh variables of .env-test on proccess.env', function () {
            expect(process.env).to.have.property('hello', '1');
            expect(process.env).to.have.property('world', 'earth');
        });
    });
});