
const assert = require('assert');

const students = ['Pedro Henrique', 'Miguel', 'Maria Clara'];
const grades = [[9, 8, 10, 7, 5], [10, 9, 9, 10, 8], [10, 7, 10, 8, 9]];


function studentAverage() {
  // escreva seu código aqui
  return students.map((value, index) => ({name: value, average: (grades[index].reduce((initial, nextValue) => initial + nextValue) / grades[index].length)}));
}

const expected = [
  { name: 'Pedro Henrique', average: 7.8 },
  { name: 'Miguel', average: 9.2 },
  { name: 'Maria Clara', average: 8.8 },
];

console.log(studentAverage());

assert.deepStrictEqual(studentAverage(), expected);