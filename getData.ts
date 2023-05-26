import { UseData } from './src/useData';

const data = new UseData();

let output: string[] = data.getEnglishWords({sortBy: "lengthReverse"});
let jsonOutput = JSON.stringify(output, null, 2);

console.log(jsonOutput);
console.log(jsonOutput.length);