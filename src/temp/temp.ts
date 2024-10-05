export type A = "ab" | number;
export type B = "ab" | "cd" | number;
export type C = string | number;

export type TT = A extends B ? true : false;

type TA = { a: number };
type TB = { b: string };

export const a: TA = { a: 1 };
export const b: TB = { b: "asdf" };
const ab = { ...a, ...b } satisfies TAB;

function fta(x: TA) {
  return x;
}
function ftb(x: TB) {
  return x;
}
function ftab(x: TAB) {
  return x;
}

type UU = string & boolean;

console.info(fta(a), ftb(b), ftab(ab)); // OK
console.info(ftb(a), fta(b), ftab(a), ftab(b)); // fails
// console.info()

type TAB = { a: number; b: string };
type TABU = TA | TB;
type TABI = TA & TB;
let abu: TABU = { a: 1 };
abu = { b: "hie" };

export type TUUU = TAB extends TABI ? true : false;
export type TUUO = TABI extends TAB ? true : false;

export const ab1: TAB = { a: 1, b: "hi" };
export const ab2: TAB = { a: 2, b: "hi" };
let aa: TA;
aa = ab1;
aa = ab2;

const aaa: TA = ab1;
const aaaa: TA = { a: 3, b: "hi" };
console.info(aa, aaa, aaaa);

console.info(aa.a, aaa.a, ab1.a, ab1.b);

let abi: TABI = { a: 1, b: "hi" };
abi = { b: "hie", a: 0 };

console.info(abu, abi);

type TTT = TAB extends TA ? true : false; // TRUE
type TTTT = TA extends TAB ? true : false; // FALSE

let s: string;
s = "hi";
s = "hi" as const;

console.info(s);

type TV1 = void extends unknown ? true : false;
type TV2 = unknown extends void ? true : false;
type TV3 = void extends never ? true : false;
type TV4 = never extends void ? true : false;
type TV5 = void extends string ? true : false;

type TV6 = undefined extends null ? true : false;
type TV7 = null extends undefined ? true : false;

type TV8 = void extends undefined ? true : false;
type TV88 = void extends null ? true : false;
type TV9 = undefined extends void ? true : false;
type TV99 = null extends void ? true : false;

type TO1 = object extends { a: number } ? true : false;
type TO2 = { a: number } extends object ? true : false;

type TF1 = Function extends object ? true : false;
type TF2 = object extends Function ? true : false;

type TO3 = {};

const vv1: TO3 = "";
const vv2: TO3 = { a: 1 };
const vv3: TO3 = null;
const vv4: TO3 = undefined;
const vv5: TO3 = void 0;

type TO5 = { a: number } | { b: string } extends object ? true : false;
type TO6 = { a: number } | { b: string } extends {} ? true : false;
type TO7 = { a: number } | "" extends {} ? true : false;
type TO8 = { a: number } | null extends {} ? true : false;
