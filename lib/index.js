'use strict';

const Joi = require('joi');

module.exports = {
    name: 'number',
    base: Joi.number(),
    language: {
        map: 'must be a number or one of {{enums}}'
    },
    coerce(value, state, options) {

        if (!value || typeof value === 'number') {
            return value;
        }

        if (options.convert && typeof value === 'string') {
            if (this._map[value] !== undefined) {
                return this._map[value];
            }

            return this.createError('number.map', { value, enums: Object.keys(this._map) }, state, options);
        }

        return value;
    },
    rules: [
        {
            name: 'map',
            description(params) {

                return 'Should map enumerated strings';
            },
            params: {
                map: Joi.object()
            },
            setup(params) {

                this._map = params.map;
            },
            validate(params, value, state, options) {

                return value;
            }
        }
    ]
};
