interface LatinDictEntry {
  pos: string;
  n: (string | number)[];
  parts: string[];
  senses: string[];
  form: string;
  orth: string;
  id: number;
}

export default LatinDictEntry;
