export class TextAnalysis {

  static findWords = (text:string) => {
    return text.trim().split(' ').length;
  };
  static findChars = (text:string) => {
    return text.replace(/[^a-zA-Z0-9&]/g, '').length;
  };
  static findSentences = (text:string) => {
    return text.trim().split('.').length;
  };
  static findParagraphs = (text:string) => {
    return text.trim().split('\n').length;
  }
  static findLongestWords = (text:string) => {
    return text.trim().replace(/\./g,'').split(' ').reduce((a, b) => a.length > b.length?a:b).length;
  }
}
