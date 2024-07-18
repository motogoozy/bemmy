type Modifiers = string | (string | null | undefined)[] | Record<string, boolean> | null;

/**
 * Creates and returns a function to format CSS classes following the {@link http://getbem.com/naming|BEM Convention}
 * @param [block] - {@link https://getbem.com/naming/#Block:~:text=of%20the%20website.-,Block,-Encapsulates%20a%20standalone|Block name} (standalone entity that is meaningful on its own)
 * @returns {(element?: string, modifiers?: string | Array.<string> | object, ...additionalClasses?:string) => string} Function that accepts {@link https://getbem.com/naming/#Block:~:text=block%20%7B%20color%3A%20%23042%3B%20%7D-,Element,-Parts%20of%20a|element} / {@link https://getbem.com/naming/#Block:~:text=%23042%3B%20%7D-,Modifier,-Flags%20on%20blocks|modifier} name arguments
 * @example
 * ```ts
 * import bemmy from 'bemmy';
 * const bem = bemmy('component')
 *
 * // block
 * bem()
 * // -> 'component'
 *
 * // block + element
 * bem('content')
 * // -> 'component__content'
 *
 * // block + modifier
 * bem(null, 'disabled')
 * // -> 'component component--disabled'
 *
 * // block + element + modifier
 * bem('content', 'disabled')
 * // -> 'component__content component__content--disabled'
 *
 * // multiple modifiers (object or array)
 * bem('content', { tall: true, green: true })
 * // -> 'component__content component__content--tall component__content--green'
 * bem('content', ['tall', 'green'])
 * // -> 'component__content component__content--tall component__content--green'
 *
 * // dynamic modifiers
 * const props = {
 *   tall: false,
 *   green: undefined,
 *   wide: true
 *   custom: 1 > 2 // some expression that resolves to true or false
 * };
 * bem('content', props)
 * // -> 'component__content component__content--wide'
 *
 * // additional classes
 * bem(null, null, 'some-class', 'another-class')
 * // -> 'component some-class another-class'
 * ```
 */
export const bemmy =
  (block = '') =>
  (element?: string | null, modifiers?: Modifiers, ...additionalClasses: (string | undefined)[]) => {
    const _element = element ? `__${element}` : '';
    let _modifiers: string[] = [];

    if (modifiers) {
      if (typeof modifiers === 'string') {
        _modifiers = [modifiers];
      } else if (Array.isArray(modifiers)) {
        _modifiers = modifiers.filter(isValidString);
      } else if (typeof modifiers === 'object' && !Array.isArray(modifiers)) {
        _modifiers = Object.keys(modifiers).filter((key) => modifiers[key]);
      }
    }

    const classArr = [
      `${block}${_element}`,
      ..._modifiers.reduce((acc: string[], modifier) => {
        acc.push(`${block}${_element}--${modifier}`);

        return acc;
      }, []),
      ...additionalClasses.filter(Boolean),
    ];

    return classArr.join(' ');
  };

function isValidString(val: unknown): val is string {
  return typeof val === 'string' && val !== '';
}

export default bemmy;
