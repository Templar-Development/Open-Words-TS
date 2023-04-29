import Parse from './src/parse';

const parse = new Parse();

let output: any = parse.parseLine("quidquid", "lte", true);
let jsonOutput = JSON.stringify(output, null, 2);

console.log(jsonOutput);
