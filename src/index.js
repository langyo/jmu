class Test {
  test = () => (console.log('test'), 'test2');
}

let t = new Test();

console.log(t.test());
console.log('test3');