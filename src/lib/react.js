import {
  h as createElement,
  Fragment,
  signal,
  computed,
  effect
} from "./core.js";

const state = (x) => {
  let d = signal(x);
  return [d, (v) => (d.value = v)];
};
const useCallback = (f, _) => f;
const useEffect = (f, _) => effect(f);
const useMemo = (f, _) => computed(f);
const useRef = (x = null) => {
  return { current: x };
};

const React = {
  createElement,
  Fragment,
  useState: state,
  useRef,
  useCallback,
  useMemo,
  useEffect: effect,
  useLayoutEffect: effect
};

export {
  createElement,
  Fragment,
  state as useState,
  useRef,
  useCallback,
  useMemo,
  useEffect,
  useEffect as useLayoutEffect
};

export default React;
