/**
 * getStems
 * 
 * Small helper function to get a list of unique stems from the inflects data
 */

import Inflects from "../data/inflects";

const getStems = (word: string, inflects = Inflects): string[] => {
  const stems: string[] = [word];

  // Sort by length of ending
  inflects.sort((a, b) => a['ending'].length - b['ending'].length);

  if (!inflects) {
    console.log("Error importing inflects");
  }

  for (const inflect of inflects) {
    if (word.endsWith(inflect['ending'])) {
      const stem = word.replace(new RegExp(inflect['ending'] + "$"), "");
      if (word !== stem && !stems.includes(stem)) {
        stems.push(stem);
      }
    }
  }

  return stems;
}

export default getStems;
