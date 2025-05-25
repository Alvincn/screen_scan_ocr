export function getDiffText(prevTextData: string, parsedText: string): string {
  let i = 0;
  while (
    i < prevTextData.length &&
    i < parsedText.length &&
    prevTextData[i] === parsedText[i]
  ) {
    i++;
  }
  return parsedText.slice(i);
}
