# 1.0.0 API Reference

- [Rules](#rules)
  - [`.map(map)`](#mapmap)

# Rules

## `.map(map)`

Specifies the enum mapping:
- `map` - object that defines the key-value pairs for mapping.

```js
const enums = {
    admin : 1,
    vendor: 2,
    client: 3
}; 
const schema = Joi.number().map(enums);

schema.validate(1);         // { error: null, value: 1 }
schema.validate('admin');   // { error: null, value: 1 }
schema.validate('client');  // { error: null, value: 3 }
schema.validate(4);         // { error: null, value: 4 }
schema.validate('nonUser'); // ValidationError
```