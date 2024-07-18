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

const bem = bemmy('component');

bem(); // block
// -> 'component'

bem('content'); // block + element
// -> 'component__content'

bem(null, 'disabled'); // block + modifier
// -> 'component component--disabled'

bem('content', 'disabled'); // block + element + modifier
// -> 'component__content component__content--disabled'

bem('content', { tall: true, green: false }); // modifier object
// -> 'component__content component__content--tall

bem('content', ['tall']); // modifier array
// -> 'component__content component__content--tall'

bem(null, null, 'some-class', 'another-class'); // // additional classes
// -> 'component some-class another-class'
```
