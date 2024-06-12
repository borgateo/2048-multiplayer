import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react-hooks';
import usePrevProps from './use-prev-props';

describe('usePrevProps', () => {
  it('should return the previous value', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevProps(value),
      {
        initialProps: { value: 1 },
      }
    );

    expect(result.current).toBe(undefined);

    rerender({ value: 2 });
    expect(result.current).toBe(1);

    rerender({ value: 3 });
    expect(result.current).toBe(2);
  });

  it('should return undefined for the first render', () => {
    const { result } = renderHook(() => usePrevProps(1));

    expect(result.current).toBe(undefined);
  });

  it('should update previous value when value changes', () => {
    const { result, rerender } = renderHook(
      ({ value }) => usePrevProps(value),
      {
        initialProps: { value: 'a' },
      }
    );

    expect(result.current).toBe(undefined);

    rerender({ value: 'b' });
    expect(result.current).toBe('a');

    rerender({ value: 'c' });
    expect(result.current).toBe('b');
  });

  it('should return the previous value when unmounted', () => {
    const { result, rerender, unmount } = renderHook(
      ({ value }) => usePrevProps(value),
      {
        initialProps: { value: 1 },
      }
    );

    expect(result.current).toBe(undefined);

    rerender({ value: 2 });
    expect(result.current).toBe(1);

    unmount();
    expect(result.current).toBe(1);
  });
});
