# joi-enums-extension

Joi extensions for enums and value mapping.

[![Build Status](https://travis-ci.org/WesTyler/joi-enums-extension.svg?branch=master)](https://travis-ci.org/WesTyler/joi-enums-extension)
[![NSP Status](https://nodesecurity.io/orgs/westyler/projects/be6a2f14-db5f-48f1-a9ab-8f74207670e1/badge)](https://nodesecurity.io/orgs/westyler/projects/be6a2f14-db5f-48f1-a9ab-8f74207670e1)
[![Known Vulnerabilities](https://snyk.io/test/github/westyler/joi-enums-extension/badge.svg)](https://snyk.io/test/github/westyler/joi-enums-extension)

Lead Maintainer: [Wes Tyler](https://github.com/westyler)

# Usage

This extension provides 2 flavors of `.map` methods.

  1. The first can be chained onto the base Joi "any" schema and can map any key/value pairs:

```js
const BaseJoi = require('joi');
const Maps = require('joi-enums-extension');
const Joi = BaseJoi.extend(Maps);

const schema = Joi.any().map({
    1     : 'mapped value',
    next  : 2,
    object: { inner: 'items' }
});

schema.validate(1); // error: null, value: 'mapped value'
schema.validate('next'); // error: null, value: 2
schema.validate('object'); // error: null, value: { inner: 'items' }
schema.validate('anything else'); // ValidationError: "value" must be one of [1, next, object]
```

  2. The second can be chained onto the base Joi number schema and maps keys to numbers:

```js
const BaseJoi = require('joi');
const Maps = require('joi-enums-extension');
const Joi = BaseJoi.extend(Maps);

const schema = Joi.number().map({
    admin : 1,
    vendor: 2,
    client: 3
});

schema.validate(1); // error: null, value: 1
schema.validate('admin'); // error: null, value: 1
schema.validate(17); // error: null, value: 17
schema.validate('anything else'); // ValidationError: "value" must be a number or one of [admin, vendor, client]
```
