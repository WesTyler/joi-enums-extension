'use strict';

const Lab = require('lab');
const BaseJoi = require('joi');
const Enums = require('../');
const Joi = BaseJoi.extend(Enums);

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Lab.expect;

describe('enums', () => {

    it('validates an un-mapped integer', (done) => {

        const schema = Joi.number().integer().map({
            a: 1,
            b: 2,
            c: 3
        });
        schema.validate(5, (err, value) => {

            expect(err).to.be.null();

            done();
        });
    });

    it('validates with non-integer numbers', (done) => {

        const schema = Joi.number().map({
            a: 1,
            b: 2,
            c: 3
        });
        schema.validate(3.14, (err, value) => {

            expect(err).to.be.null();

            done();
        });
    });

    it('validates an enumerated string', (done) => {

        const schema = Joi.number().integer().map({
            a: 1,
            b: 2,
            c: 3
        });
        schema.validate('a', (err, value) => {

            expect(err).to.be.null();
            expect(value).to.equal(1);

            done();
        });
    });

    it('fails on a non-enumerated string', (done) => {

        const schema = Joi.number().integer().map({
            a: 1,
            b: 2,
            c: 3
        });
        schema.validate('d', (err, value) => {

            expect(err).to.not.be.null();
            expect(err.message).to.equal('"value" must be a number or one of [a, b, c]');

            done();
        });
    });

    it('fails without convert', (done) => {

        const schema = Joi.number().integer().map({
            a: 1,
            b: 2,
            c: 3
        });
        schema.validate('a', { convert: false }, (err, value) => {

            expect(err).to.not.be.null();
            expect(err.message).to.equal('"value" must be a number');

            done();
        });
    });

    it('fails on missing value', (done) => {

        const schema = Joi.number().integer().map({
            a: 1,
            b: 2,
            c: 3
        });
        schema.validate(null, (err, value) => {

            expect(err).to.not.be.null();
            expect(err.message).to.equal('"value" must be a number');

            done();
        });
    });

    it('fails on non-number and non-string value', (done) => {

        const schema = Joi.number().integer().map({
            a: 1,
            b: 2,
            c: 3
        });
        schema.validate(true, (err, value) => {

            expect(err).to.not.be.null();
            expect(err.message).to.equal('"value" must be a number');

            done();
        });
    });

    it('should be described correctly', (done) => {

        const schema = Joi.number().integer().map({
            a: 1,
            b: 2,
            c: 3
        });
        expect(schema.describe()).to.equal({
            type: 'number',
            invalids: [Infinity, -Infinity],
            rules: [
                {
                    name: 'integer'
                },
                {
                    name: 'map',
                    arg: {
                        map: {
                            a: 1,
                            b: 2,
                            c: 3
                        }
                    },
                    description: 'Should map enumerated strings'
                }
            ]
        });
        done();
    });
});
