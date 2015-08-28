var Thingy = require('./test');

class Test {
  test() {
    console.log('test');
  }
}

var test = new Test();
test.test();

var thingy = new Thingy();
console.log(thingy);
console.log(thingy.getList());
