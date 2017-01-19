# joi-enums-extension

Joi extensions for enums mapping.

[![NSP Status](https://nodesecurity.io/orgs/westyler/projects/be6a2f14-db5f-48f1-a9ab-8f74207670e1/badge)](https://nodesecurity.io/orgs/westyler/projects/be6a2f14-db5f-48f1-a9ab-8f74207670e1)
[![Known Vulnerabilities](https://snyk.io/test/github/westyler/joi-enums-extension/badge.svg)](https://snyk.io/test/github/westyler/joi-enums-extension)

Lead Maintainer: [Wes Tyler](https://github.com/westyler)

# Usage

The `.map` method can be chained onto the base Joi number schema:

```js
const BaseJoi = require('joi');
const Enums = require('joi-enums-extension');
const Joi = BaseJoi.extend(Enums);

const schema = Joi.number().map({
    admin : 1,
    vendor: 2,
    client: 3
});
```

# API
See the [API Reference](https://github.com/westyler/joi-enums-extension/blob/master/API.md).