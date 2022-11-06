import { h, Fragment, api } from "uele";
import { signal, computed, effect, batch, Signal } from "usignal";

// api settings for usignal
api.effect = effect;
api.memo = computed;
api.is = (v) => v instanceof Signal; // or preact signals
api.get = (v) => v.value;

const render = (fn, el) => el.append(fn);
export { h, Fragment, signal, computed, effect, batch, render };
