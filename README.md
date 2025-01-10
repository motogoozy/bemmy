# bemmy

Dependency-free utility to compose CSS classnames following the [BEM](https://getbem.com/) convention.

## Installation

```bash
npm install bemmy
```

## Usage

### Basic examples

```ts
import bemmy from 'bemmy';

const bem = bemmy('block');

bem();
// -> 'block'

bem('element');
// -> 'block__element'

bem(null, 'modifier');
// -> 'block block--modifier'

bem('element', 'modifier');
// -> 'block__element block__element--modifier'

// modifier object
bem('element', { tall: true, green: true });
// -> 'block__element block__element--tall block__element--green'

// modifier array
bem('element', ['tall', 'green']);
// -> 'block__element block__element--tall block__element--green'

// dynamic modifiers
const props = {
  tall: false,
  wide: true,
  custom: 1 > 2, // some expression that resolves to true or false
};
bem('element', props);
// -> 'block__element block__element--wide'

// additional classes
bem(null, null, 'some-class', 'another-class');
// -> 'block some-class another-class'
```
