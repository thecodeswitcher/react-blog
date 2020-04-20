const testItalics = '*This should be in italics* This will not';

const textToBeItalicized = /(\*.+\*)/g
const regexResult = testItalics.match(textToBeItalicized);

console.log(regexResult);

