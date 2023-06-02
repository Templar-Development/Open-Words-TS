/**
 * How principle parts are found:
 *
 * All first declension nouns  - N 1 1
 * Ex: aqu aqu  =>  aqua aquae
 *
 * Second declension neuter nouns - N 2 2
 * Ex: bell bell => bellum belli
 *
 * Second declension nouns in "er" whether of not the "er" in base - N 2 3
 * Ex: puer puer => puer pueri
 *
 * Early (BC) 2nd declension nouns in ius/ium (not filius-like)  - N 2 4
 * for the most part formed GEN S in 'i', not 'ii'   --  G+L 33 R 1
 * Dictionaries often show as ...(i)i
 * N 2 4 uses GENDER discrimination to reduce to single VAR
 * Ex: radius rad(i)i  => radi radi        M
 * Ex: atrium atr(i)i  =>  atri atri       N
 *
 * Mostly used for names - N 2 5
 * Ex: aegidi aegidi => aegidius aegidi
 *
 * Mostly used for plant names - N 2 6
 * Ex: adips adips => adipsos adipsi
 *
 * Various very rare nouns - N 2 7
 * EX: chelys chely => chelysos chelysi
 *
 * Various rare nouns - N 2 8
 * Ex: butyr butyr => butyron butyri
 *
 * Only one word - N 2 9
 * Ex: Panth Panth => Panthus Panthi
 *
 * Third declension M or F nouns whose stems end in a consonant - N 3 1
 * Ex: rex reg  => rex regis
 * Ex: soror soror  => soror sororis
 * Ex: frater fratr  => frater fratris
 * All third declension that have the endings -udo, -io, -tas, -x
 * Ex: pulchritudo pulchritudin  => pulchritudo pulchritudinis
 * Ex: legio legion  => legio legionis
 * EX: varietas varietat  => varietas varietatis
 *
 * Third declension  N nouns with stems ending in a consonant - N 3 2
 * Ex: nomen nomen  => nomen nomenis
 * Ex: iter itiner  => iter itineris
 *
 * Third declension nouns  I-stems (M + F)     - N 3 3
 * Ex: hostis host  => hostis hostis
 * Ex: finis fin  => finis finis
 * Consonant i-stems
 * Ex: urbs urb  => urbs urbis
 * Ex: mons mont  => mons montis
 * Also use this for present participles (-ns) used as substantives in M + F
 *
 * Third declension nouns  I-stems (N)    - N 3 4
 * Ex: mare mar  => mare maris                    --  ending in "e"
 * Ex: animal animal  => animal animalis          --  ending in "al"
 * Ex: exemplar exemplar  => exemplar exemplaris  --  ending in "ar"
 * Also use this for present participles (-ns) used as substantives in N
 *
 * Fourth declension nouns M + F in "us"  - N 4 1
 * Ex: pass pass  => passus passus
 * Ex: man man => manus manus
 *
 * Fourth declension nouns N in "u"  - N 4 2
 * Ex: gen gen  => genu genus
 * Ex: corn corn  => cornu cornus
 *
 * Jesus - N 4 3
 * Ex: jes jes => jesus jesu
 *
 * All fifth declension nouns  - N 5 1
 * Ex: di di  => dies diei
 * Ex: r r  => res rei
 *
 *
 *
 * Adjectives will mostly only be POS and have only the first two stems
 * ADJ X have four stems, zzz stands for any unknown/non-existent stem
 *
 * Adjectives of first and second declension (-us in NOM S M)  - ADJ 1 1
 * Two stems for POS, third is for COMP, fourth for SUPER
 * Ex: mal mal pei pessi => malus mala malum
 * Ex: alt alt alti altissi => altus alta altum
 *
 * Adjectives of first and second declension (-er) - ADJ 1 2
 * Ex: miser miser miseri miserri => miser misera miserum
 * Ex: sacer sacr zzz  sacerri => sacer sacra sacrum     --  no COMP
 * Ex: pulcher pulchr pulchri pulcherri => pulcher pulchra pulchrum
 *
 * Adjectives of third declension - one ending  - ADJ 3 1
 * Ex: audax audac audaci audacissi => audax (gen) audacis
 * Ex: prudens prudent prudenti prudentissi => prudens prudentis
 *
 * Adjectives of third declension - two endings   - ADJ 3 2
 * Ex: brev brev brevi brevissi => brevis breve
 * Ex: facil facil facili facilli => facil facil
 *
 * Adjectives of third declension - three endings  - ADJ 3 3
 * Ex: celer celer celeri celerri => celer celeris  celere
 * Ex: acer acr acri acerri => acer acris acre
 *
 *
 *
 * Verbs are mostly TRANS or INTRANS, but X works fine
 * Depondent verbs must have DEP
 * Verbs have four stems
 * The first stem is the first principal part (dictionary entry) - less 'o'
 * For 2nd decl, the 'e' is omitted, for 3rd decl i-stem, the 'i' is included
 * Third principal part always ends in 'i', this is omitted in stem
 * Fourth part in dictionary ends in -us (or -um), this is omitted
 * DEP verbs omit (have zzz) the third stem
 *
 * Verbs of the first conjugation  --  V 1 1
 * Ex: voc voc vocav vocat => voco vocare vocavi vocatus
 * Ex: port port portav portat => porto portare portavi portatus
 *
 * Verbs of the second conjugation   -  V 2 1
 * The characteristic 'e' is in the inflection, not carried in the stem
 * Ex: mon mon monu monit => moneo monere monui monitum
 * Ex: hab hab habu habit => habeo habere habui habitus
 * Ex: del del delev delet => deleo delere delevi deletus
 * Ex: iub iub iuss iuss => iubeo iubere iussi iussus
 * Ex: vid vid vid vis => video videre vidi visus
 *
 * Verbs of the third conjugation, variant 1  - V 3 1
 * Ex: reg reg rex rect => rego regere rexi rectum
 * Ex: pon pon posu posit => pono ponere posui positus
 * Ex: capi cap cep capt => capio capere cepi captus        --  I-stem too w/KEY
 *
 * Verbs of the third conjugation, variant 2  - V 3 2
 * Ex: confer confer contul conlat => confero conferre contuli conlatus
 * Ex: affer affer attul allat => affero afferre attuli allatus
 *
 * Verbs of the third conjugation, variant 3  - V 3 3
 * Ex: benefi benef zzz benefact => benefacio beneferi benefactus
 *
 * Verbs of the third conjugation, variant 4  - V 3 4
 * Ex: biparti bipart bipartiv bipartit => bipartio bipartire bipartivi bipartitus
 *
 * Verbs like to be - coded as V 5 1
 * Ex: s . fu fut => sum esse fui futurus
 * Ex: ads ad adfu adfut => adsum adesse adfui adfuturus
 *
 * Verbs like to be - coded as V 5 2
 * Ex: poss pot potu zzz => possum posse potui
 */

import PrinciplePartFinderData from "../types/PrinciplePartFinderData";

class PrinciplePartFinder {
  constructor() {}

  //TODO: 2 4 needs gender if M add us if N add um

  public findPrincipleParts(props: PrinciplePartFinderData): string[] {
    const { pos, n, parts } = props;
    let principleParts: string[] = [];

    //!!!: return after a match is found, it is not possible to have more than 1 per word list.
    //TODO: do testing on the group if statemetns, make sure the n[0] and either n[1] must both be true
    if (pos === "N") {
      if (n[0] === 1 && n[1] === 1) {
        principleParts.push(parts[0] + "a");
        principleParts.push(parts[1] + "ae");
      } else if (n[0] === 2 && n[1] === 1) {
        principleParts.push(parts[0] + "us");
        principleParts.push(parts[1] + "i");
      } else if (n[0] === 2 && n[1] === 2) {
        principleParts.push(parts[0] + "um");
        principleParts.push(parts[1] + "i");
      } else if (n[0] === 2 && n[1] === 3) {
        principleParts.push(parts[0]);
        principleParts.push(parts[1] + "i");
      } else if (n[0] === 2 && n[1] === 5) {
        principleParts.push(parts[0] + "us");
        principleParts.push(parts[1]); // might need to add an i, not sure
      } else if ((n[0] === 2 && n[1] === 6) || n[1] === 7) {
        principleParts.push(parts[0] + "os");
        principleParts.push(parts[1] + "i");
      } else if (n[0] === 2 && n[1] === 8) {
        principleParts.push(parts[0] + "on");
        principleParts.push(parts[1] + "i");
      } else if (n[0] === 2 && n[1] === 9) {
        principleParts.push(parts[0] + "us");
        principleParts.push(parts[1] + "i");
      } else if (
        (n[0] === 3 && n[1] === 1) ||
        n[1] === 2 ||
        n[1] === 3 ||
        n[1] === 4
      ) {
        principleParts.push(parts[0]);
        principleParts.push(parts[1] + "is");
      } else if (n[0] === 4 && n[1] === 1) {
        principleParts.push(parts[0] + "us");
        principleParts.push(parts[1] + "us");
      } else if (n[0] === 4 && n[1] === 2) {
        principleParts.push(parts[0] + "u");
        principleParts.push(parts[1] + "us");
      } else if (n[0] === 4 && n[1] === 3) {
        principleParts.push(parts[0] + "us");
        principleParts.push(parts[1] + "u");
      } else if (n[0] === 5 && n[1] === 1) {
        principleParts.push(parts[0] + "es");
        principleParts.push(parts[1] + "ei");
      }
    }

    if (pos === "ADJ") {
    }

    if (pos === "V" || pos === "VPAR") {
      if (n[0] === 1 && n[1] === 1) {
        principleParts.push(parts[0] + "o");
        principleParts.push(parts[1] + "are");
        if (parts[2] !== "zzz") principleParts.push(parts[2] + "i");
        if (parts[3] !== "zzz") principleParts.push(parts[3] + "us");
      } else if (n[0] === 3 && n[1] === 2) {
        principleParts.push(parts[0] + "o");
        principleParts.push(parts[1] + "re");
        if (parts[2] !== "zzz") principleParts.push(parts[2] + "i");
        if (parts[3] !== "zzz") principleParts.push(parts[3] + "us");
      } else if (n[0] === 3 && n[0] === 3) {
        principleParts.push(parts[0] + "o");
        principleParts.push(parts[1] + "eri");
        if (parts[2] !== "zzz") principleParts.push(parts[2] + "i");
        if (parts[3] !== "zzz") principleParts.push(parts[3] + "us");
      } else if (n[0] === 3 && n[1] === 4) {
        principleParts.push(parts[0] + "o");
        principleParts.push(parts[1] + "ire");
        if (parts[2] !== "zzz") principleParts.push(parts[2] + "i");
        if (parts[3] !== "zzz") principleParts.push(parts[3] + "us");
      } else if (n[0] === 5 && n[1] === 2) {
        principleParts.push(parts[0] + "um");
        principleParts.push(
          parts[1].substring(0, parts[1].length - 1) + "esse"
        );
        if (parts[2] !== "zzz") principleParts.push(parts[2] + "i");
        if (parts[3] !== "zzz") principleParts.push(parts[3]);
      }
    }

    return principleParts;
  }
}

export { PrinciplePartFinder };
