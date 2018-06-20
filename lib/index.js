'use strict';

const Joi = require('joi');

module.exports = [
    {
        name    : 'number',
        base    : Joi.number(),
        language: {
            map: 'must be a number or one of {{enums}}'
        },
        coerce(value, state, options) {

            if (!value || typeof value === 'number') {
                return value;
            }

            if (this._flags.map && options.convert && typeof value === 'string') {
                if (this._flags.map[value] !== undefined) {
                    return this._flags.map[value];
                }

                return this.createError('number.map', { value, enums: Object.keys(this._flags.map) }, state, options);
            }

            return value;
        },
        rules   : [
            {
                name  : 'map',
                params: {
                    map: Joi.object()
                },
                setup(params) {

                    this._flags.map = params.map;
                }
            }
        ]
    },
    {
        name: 'any',
        base: Joi.any(),
        language: {
            map: 'must be one of {{map}}'
        },
        coerce(value, state, options) {

            if (this._flags.map) {
                if (this._flags.map[value] !== undefined) {
                    return this._flags.map[value];
                }

                return this.createError('any.map', { value, map: Object.keys(this._flags.map) }, state, options);
            }

            return value;
        },
        rules: [
            {
                name: 'map',
                params: {
                    map: Joi.object()
                },
                setup(params) {

                    this._flags.map = params.map;
                }
            }
        ]
    }
];
