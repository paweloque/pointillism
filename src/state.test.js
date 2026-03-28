import { describe, it, expect, vi, beforeEach } from 'vitest';
import { state, set, getDefaults, resetState, resetGroup, onChange } from './state.js';

beforeEach(() => {
  resetState();
});

describe('state', () => {
  it('has default values', () => {
    expect(state.bgColor).toBe('#000');
    expect(state.stride).toBe(3);
    expect(state.dotSize).toBe(0.4);
    expect(state.dotShape).toBe('circle');
    expect(state.breathing).toBe(false);
  });

  it('getDefaults returns a copy', () => {
    const d = getDefaults();
    d.stride = 99;
    expect(state.stride).toBe(3);
  });
});

describe('set', () => {
  it('updates state', () => {
    set('stride', 5);
    expect(state.stride).toBe(5);
  });

  it('emits change with resample tier for stride', () => {
    const fn = vi.fn();
    const unsub = onChange(fn);
    set('stride', 7);
    expect(fn).toHaveBeenCalledWith('stride', 'resample');
    unsub();
  });

  it('emits change with resample tier for threshold', () => {
    const fn = vi.fn();
    const unsub = onChange(fn);
    set('threshold', 0.1);
    expect(fn).toHaveBeenCalledWith('threshold', 'resample');
    unsub();
  });

  it('emits change with repaint tier for bgColor', () => {
    const fn = vi.fn();
    const unsub = onChange(fn);
    set('bgColor', '#fff');
    expect(fn).toHaveBeenCalledWith('bgColor', 'repaint');
    unsub();
  });

  it('does not emit when value unchanged', () => {
    const fn = vi.fn();
    const unsub = onChange(fn);
    set('stride', 3); // already default
    expect(fn).not.toHaveBeenCalled();
    unsub();
  });
});

describe('resetState', () => {
  it('restores all defaults', () => {
    set('stride', 10);
    set('bgColor', '#fff');
    set('breathing', true);
    resetState();
    expect(state.stride).toBe(3);
    expect(state.bgColor).toBe('#000');
    expect(state.breathing).toBe(false);
  });
});

describe('resetGroup', () => {
  it('resets only the specified group', () => {
    set('stride', 10);
    set('bgColor', '#fff');
    resetGroup('dots');
    expect(state.stride).toBe(3); // reset
    expect(state.bgColor).toBe('#fff'); // untouched
  });

  it('does nothing for unknown group', () => {
    set('stride', 10);
    resetGroup('nonexistent');
    expect(state.stride).toBe(10);
  });
});

describe('onChange', () => {
  it('returns unsubscribe function', () => {
    const fn = vi.fn();
    const unsub = onChange(fn);
    unsub();
    set('stride', 9);
    expect(fn).not.toHaveBeenCalled();
  });
});
