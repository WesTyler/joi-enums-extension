'use strict';

const Lab = require('lab');
const Code = require('code');
const BaseJoi = require('joi');
const Enums = require('../');
const Joi = BaseJoi.extend(Enums);

const lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

describe('enums', () => {});