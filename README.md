# joi-enums-extension

Joi extensions for enums mapping.

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
See the [API Reference](https://github.com/westyler/joi-enums-extension/master/API.md).