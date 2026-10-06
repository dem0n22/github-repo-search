import { LanguageColors, Colors } from "../constants/colors.js"

export function getColor(language) {
  if(LanguageColors[language]) return LanguageColors[language];

  let hash = 0;
  for(const char of language ) {
    hash += char.charCodeAt(0);
  }

  return Colors[hash % Colors.length];
}
