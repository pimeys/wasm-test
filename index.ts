import { Grafbase } from './dist/wasm_test';

// This we export
const g = new Grafbase();

const user = g.model("User", {
  name: g.string(),
  age: g.int(),
  // can we make this typesafe, so we have to pass a string?
  // lol: 3,
});

console.log(user);
