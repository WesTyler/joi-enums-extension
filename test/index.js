'use strict';

const Lab = require('lab');
const Code = require('code');
const BaseJoi = require('joi');
const Enums = require('../');
const Joi = BaseJoi.extend(Enums);

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('extensions', () => {

    describe('enums', () => {

        it('validates an un-mapped integer', async () => {

            const schema = Joi.number().integer().map({
                a: 1,
                b: 2,
                c: 3
            });

            const value = await schema.validate(5);

            expect(value).to.equal(5);
        });

        it('validates with non-integer numbers', async () => {

            const schema = Joi.number().map({
                a: 1,
                b: 2,
                c: 3
            });

            const value = await schema.validate(3.14);

            expect(value).to.equal(3.14);
        });

        it('validates an enumerated string', async () => {

            const schema = Joi.number().integer().map({
                a: 1,
                b: 2,
                c: 3
            });

            const value = await schema.validate('a');

            expect(value).to.equal(1);
        });

        it('validates when "required"', async () => {

            const schema = Joi.number().integer().map({
                a: 1,
                b: 2,
                c: 3
            }).required();

            const value = await schema.validate('a');

            expect(value).to.equal(1);
        });

        it('does not interfere with non-map number schema coercion', async () => {

            const schema = Joi.number();

            const value = await schema.validate('3');

            expect(value).to.equal(3);

            const err = await expect(schema.validate('nope')).to.reject();

            expect(err.message).to.equal('"value" must be a number');
        });

        it('fails on a non-enumerated string', async () => {

            const schema = Joi.number().integer().map({
                a: 1,
                b: 2,
                c: 3
            });

            const err = await expect(schema.validate('d')).to.reject();

            expect(err.message).to.equal('"value" must be a number or one of [a, b, c]');
        });

        it('fails without convert', async () => {

            const schema = Joi.number().integer().map({
                a: 1,
                b: 2,
                c: 3
            });

            const err = await expect(schema.validate('a', { convert: false })).to.reject();

            expect(err.message).to.equal('"value" must be a number');
        });

        it('fails on missing value', async () => {

            const schema = Joi.number().integer().map({
                a: 1,
                b: 2,
                c: 3
            });

            const err = await expect(schema.validate(null)).to.reject();

            expect(err.message).to.equal('"value" must be a number');
        });

        it('fails on non-number and non-string value', async () => {

            const schema = Joi.number().integer().map({
                a: 1,
                b: 2,
                c: 3
            });

            const err = await expect(schema.validate(true)).to.reject();

            expect(err.message).to.equal('"value" must be a number');
        });

        it('should be described correctly', () => {

            const map = {
                a: 1,
                b: 2,
                c: 3
            };
            const schema = Joi.number().integer().map(map);

            expect(schema.describe()).to.equal({
                type: 'number',
                invalids: [Infinity, -Infinity],
                options: {
                    language: {
                        number: {
                            map: 'must be a number or one of {{enums}}'
                        }
                    }
                },
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
                ],
                flags: {
                    _map: map
                }
            });
        });
    });
});
