import fs from 'fs';

const scripts = fs.readdirSync('./src/controller/').filter((value) => {
  return !['base.js'].includes(value);
});
const controller = scripts.slice().map((value) => value.split('.')[0]);
const list = scripts.map(value => require('../src/controller/' + value));
const loader = {};

controller.forEach((value, index)=> {
  loader[value] = list[index];
});

export default loader;