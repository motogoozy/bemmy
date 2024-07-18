# bemmy

Dependency-free utility to compose CSS classnames following the [BEM](https://getbem.com/) convention.

## Installation

```bash
# TODO
```

## Usage

### Basic examples

```ts
import bemmy from 'bemmy';

const bem = bemmy('component')

// block
bem()
// -> 'component'

// block + element
bem('content')
// -> 'component__content'

// block + modifier
bem(null, 'disabled')
// -> 'component component--disabled'

// block + element + modifier
bem('content', 'disabled')
// -> 'component__content component__content--disabled'

// multiple modifiers (object or array)
bem('content', { tall: true, green: true })
// -> 'component__content component__content--tall component__content--green'
bem('content', ['tall', 'green'])
// -> 'component__content component__content--tall component__content--green'

// dynamic modifiers
const props = {
  tall: false,
  green: undefined,
  wide: true
  custom: 1 > 2 // some expression that resolves to true or false
};
bem('content', props)
// -> 'component__content component__content--wide'

// additional classes
bem(null, null, 'some-class', 'another-class')
// -> 'component some-class another-class'
```

### Real-world example (React component)

```ts
// TODO (w/ CSS file showing classes)
```
