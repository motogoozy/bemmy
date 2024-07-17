import { expect, test } from '@playwright/test';
import bemmy from '../src/index';

test.describe('bemmy', () => {
  const bem = bemmy('test');

  test('returns block class', async () => {
    const className = bem();
    expect(className).toEqual('test');
  });

  test('does not apply block class if no block arg is passed', async () => {
    const makeNoBlock = bemmy();
    const className = makeNoBlock();
    expect(className).toEqual('');
    const className2 = makeNoBlock('element');
    expect(className2).toEqual('__element');
  });

  test('adds element class', async () => {
    const className = bem('element');
    expect(className).toEqual('test__element');
  });

  test('does not add element class if falsy arg is passed', async () => {
    const className = bem(null, '');
    expect(className).toEqual('test');
  });

  test('adds modifier class from string', async () => {
    const className = bem('element', 'tall');
    expect(className).toEqual('test__element test__element--tall');
  });

  test('adds modifier classes from array', async () => {
    const variable = 'amazing';
    const className = bem('element', ['tall', variable, 'green']);
    expect(className).toEqual('test__element test__element--tall test__element--amazing test__element--green');
  });

  test('adds modifier classes from object', async () => {
    const className = bem('element', { tall: true, green: true });
    expect(className).toEqual('test__element test__element--tall test__element--green');
  });

  test('adds modifier class to block when no element is present', async () => {
    const className = bem(null, 'tall');
    expect(className).toEqual('test test--tall');
  });

  test('does not add class from falsy values in modifier objects', async () => {
    const className = bem('element', {
      tall: true,
      red: false,
    });
    expect(className).toEqual('test__element test__element--tall');
  });

  test('does not add class from falsy values in modifier array', () => {
    const a = 'cool';
    const b = '';
    const c = null;
    const d = undefined;
    const className = bem('element', [a, b, c, d]);
    expect(className).toEqual('test__element test__element--cool');
  });

  test('does not add modifiers if falsy arg', async () => {
    const className = bem('element', '');
    expect(className).toEqual('test__element');
  });

  test('does not add modifiers if empty array/object is passed', async () => {
    const className = bem('element', []);
    expect(className).toEqual('test__element');
    const className2 = bem('element', {});
    expect(className2).toEqual('test__element');
  });

  test('allows additional classes to be applied', async () => {
    const className = bem('element', 'modifier', 'one', 'two');
    expect(className).toEqual('test__element test__element--modifier one two');
  });

  test('filters out falsy additional classes', async () => {
    const className = bem('element', 'modifier', undefined, 'two');
    expect(className).toEqual('test__element test__element--modifier two');
  });
});
