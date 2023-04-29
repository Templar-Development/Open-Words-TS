/**
 * Corresponding to Whitaker's Words UNIQUES.LAT file
 * 
 * There are some irregular situations which are not convenient to handle through the general algorithms. 
 * For these a UNIQUES file and procedure was established. The number of these special cases is 
 * less than one hundred, but may increase as new situations arise, 
 * and decrease as algorithms provide better coverage. The user will not see much difference, 
 * except in that no dictionary forms are available for these unique words.
 */

const Uniques: any = [
	{
		senses: ["let them be treated; let it be a matter or question of;"],
		orth: "agantur",
		pos: "V",
		form: "3 1 PRES PASSIVE SUB 3 P  IMPERS",
	},
	{
		senses: ["let it be treated; let it be a matter or question of;"],
		orth: "agatur",
		pos: "V",
		form: "3 1 PRES PASSIVE SUB 3 S  IMPERS",
	},
	{
		senses: [
			"it is necessary/essential/unavoidable/true; it is inevitable/by natural law;"
		],
		orth: "necessest",
		pos: "V",
		form: "5 1 PRES  ACTIVE  IND  3 S IMPERS",
	},
	{
		senses: [
			"be away/absent/distant/missing; be free/removed from; be lacking; be distinct;"
		],
		orth: "aforem",
		pos: "V",
		form: "5 1 IMPF  ACTIVE  SUB  1 S TO_BEING",
	},
	{
		senses: [
			"be away/absent/distant/missing; be free/removed from; be lacking; be distinct;"
		],
		orth: "afores",
		pos: "V",
		form: "5 1 IMPF  ACTIVE  SUB  2 S TO_BEING",
	},
	{
		senses: [
			"be away/absent/distant/missing; be free/removed from; be lacking; be distinct;"
		],
		orth: "aforet",
		pos: "V",
		form: "5 1 IMPF  ACTIVE  SUB  3 S TO_BEING",
	},
	{
		senses: [
			"be away/absent/distant/missing; be free/removed from; be lacking; be distinct;"
		],
		orth: "aforemus",
		pos: "V",
		form: "5 1 IMPF  ACTIVE  SUB  1 P TO_BEING",
	},
	{
		senses: [
			"be away/absent/distant/missing; be free/removed from; be lacking; be distinct;"
		],
		orth: "aforetis",
		pos: "V",
		form: "5 1 IMPF  ACTIVE  SUB  2 P TO_BEING",
	},
	{
		senses: [
			"be away/absent/distant/missing; be free/removed from; be lacking; be distinct;"
		],
		orth: "aforent",
		pos: "V",
		form: "5 1 IMPF  ACTIVE  SUB  3 P TO_BEING",
	},
	{
		senses: [
			"be away/absent/distant/missing; be free/removed from; be lacking; be distinct;"
		],
		orth: "afore",
		pos: "V",
		form: "5 1 FUT  ACTIVE INF  0 X TO_BEING",
	},
	{
		senses: ["do you not see; or consider; (vides-ne);"],
		orth: "viden",
		pos: "V",
		form: "2 1   PRES ACTIVE IND  2 S TRANS",
	},
	{
		senses: ["remember; be mindful of;"],
		orth: "memento",
		pos: "V",
		form: "0 0   PRES ACTIVE IMP  2 S TRANS",
	},
	{
		senses: ["remember; be mindful of;"],
		orth: "mementote",
		pos: "V",
		form: "0 0   PRES ACTIVE IMP  2 P TRANS",
	},
	{
		senses: [
			"give/bring here!/hand over, come (now/here); tell/show us, out with it! behold!"
		],
		orth: "cette",
		pos: "V",
		form: "3 1 PRES ACTIVE IMP  2 P TRANS",
	},
	{
		senses: [
			"give/bring here!/hand over, come (now/here); tell/show us, out with it! behold!"
		],
		orth: "cedo",
		pos: "V",
		form: "3 1 PRES ACTIVE IMP  2 S TRANS",
	},
	{
		senses: ["come hither; (ades dum);"],
		orth: "adesdum",
		pos: "V",
		form: "5 1 PRES ACTIVE IMP  2 S TO_BEING",
	},
	{
		senses: [
			"lyre, harp; tortoise shell (from which lyres were made); tortoise;"
		],
		orth: "chely",
		pos: "N",
		form: "9 9 VOC S F T",
	},
	{
		senses: [
			"lyre, harp; tortoise shell (from which lyres were made); tortoise;"
		],
		orth: "chelyn",
		pos: "N",
		form: "9 9 ACC S F T",
	},
	{
		senses: ["hopeless; (only NOM S);"],
		orth: "exspes",
		pos: "A",
		form: "DJ    3 1 NOM S X POS",
	},
	{
		senses: ["an oath (ius iurandum);"],
		orth: "iusiurandum",
		pos: "N",
		form: "2 1 NOM S N t",
	},
	{
		senses: ["an oath (ius iurandum);"],
		orth: "iurisiurandi",
		pos: "N",
		form: "2 1 GEN S N t",
	},
	{
		senses: ["an oath (ius iurandum);"],
		orth: "iusiurandum",
		pos: "N",
		form: "2 1 ACC S N t",
	},
	{
		senses: ["an oath (ius iurandum);"],
		orth: "iureiurando",
		pos: "N",
		form: "2 1 ABL S N t",
	},
	{
		senses: [
			"this; person/thing present/just mentioned/in this place; ((h)(a)ec); +DEMONS;"
		],
		orth: "ec",
		pos: "P",
		form: "RON 3 1 NOM S F ADJECT",
	},
	{
		senses: [
			"these (pl.); persons/things/conditions present/here/just mentioned; +DEMONS;"
		],
		orth: "ec",
		pos: "P",
		form: "RON 3 1 NOM P N ADJECT",
	},
	{
		senses: [
			"these (pl.); persons/things/conditions present/here/just mentioned; +DEMONS;"
		],
		orth: "ec",
		pos: "P",
		form: "RON 3 1 ACC P N ADJECT",
	},
	{
		senses: ["same, the same, the very same; also; (idem, eadem, idem);"],
		orth: "eadem",
		pos: "P",
		form: "RON 4 2 NOM S F DEMONS",
	},
	{
		senses: ["same, the same, the very same; also; (idem, eadem, idem);"],
		orth: "eadem",
		pos: "P",
		form: "RON 4 2 NOM P N DEMONS",
	},
	{
		senses: ["same, the same, the very same; also; (idem, eadem, idem);"],
		orth: "eadem",
		pos: "P",
		form: "RON 4 2 ACC P N DEMONS",
	},
	{
		senses: ["same, the same, the very same; also; (idem, eadem, idem);"],
		orth: "eundem",
		pos: "P",
		form: "RON 4 2 ACC S M DEMONS",
	},
	{
		senses: ["same, the same, the very same; also; (idem, eadem, idem);"],
		orth: "eodem",
		pos: "P",
		form: "RON 4 2 ABL S X DEMONS",
	},
	{
		senses: ["whoever; every one who; whoever it be; everyone; each;"],
		orth: "quisquis",
		pos: "P",
		form: "RON 1 2 NOM S C ADJECT",
	},
	{
		senses: [
			"whatever, whatsoever; everything which; each one; each; everything; anything;"
		],
		orth: "quidquid",
		pos: "P",
		form: "RON 1 6 NOM S N INDEF",
	},
	{
		senses: [
			"whatever, whatsoever; everything which; each one; each; everything; anything;"
		],
		orth: "quicquid",
		pos: "P",
		form: "RON 1 6 NOM S N INDEF",
	},
	{
		senses: [
			"whatever, whatsoever; everything which; each one; each; everything; anything;"
		],
		orth: "quodquod",
		pos: "P",
		form: "RON 1 7 NOM S N ADJECT",
	},
	{
		senses: ["whomever; every one who; whomever it be; everyone; each;"],
		orth: "quemquem",
		pos: "P",
		form: "RON 1 0 ACC S M ADJECT",
	},
	{
		senses: [
			"whatever, whatsoever; everything which; each one; each; everything; anything;"
		],
		orth: "quidquid",
		pos: "P",
		form: "RON 1 6 ACC S N ADJECT",
	},
	{
		senses: [
			"whatever, whatsoever; everything which; each one; each; everything; anything;"
		],
		orth: "quicquid",
		pos: "P",
		form: "RON 1 6 ACC S N ADJECT",
	},
	{
		senses: [
			"whatever, whatsoever; everything which; each one; each; everything; anything;"
		],
		orth: "quodquod",
		pos: "P",
		form: "RON 1 7 ACC S N ADJECT",
	},
	{
		senses: [
			"whatever; everything/anything (which); valuable merchandise (Souter);"
		],
		orth: "chodchod",
		pos: "P",
		form: "RON 1 7 ACC S N ADJECT",
	},
	{
		senses: [
			"whoever; whatever, whatsoever; every one who; everything which; each one; each;"
		],
		orth: "quoquo",
		pos: "P",
		form: "RON 1 0 ABL S X ADJECT",
	},
	{
		senses: ["any; anything; anything whatsoever;"],
		orth: "quicquam",
		pos: "P",
		form: "RON 1 6 NOM S N ADJECT",
	},
	{
		senses: ["any; anything; anything whatsoever;"],
		orth: "quicquam",
		pos: "P",
		form: "RON 1 6 ACC S N ADJECT",
	},
	{
		senses: [
			"some/any one/thing; unspecified thing/person; certain quanity, a bit; at all;"
		],
		orth: "quippiam",
		pos: "P",
		form: "RON 1 0 NOM S N INDEF",
	},
	{
		senses: [
			"some/any one/thing; unspecified thing/person; certain quanity, a bit; at all;"
		],
		orth: "quippiam",
		pos: "P",
		form: "RON 1 0 ACC S N INDEF",
	},
	{
		senses: ["each one;"],
		orth: "unusquisque",
		pos: "P",
		form: "RON 1 0 NOM S M INDEF",
	},
	{
		senses: ["each one;"],
		orth: "uniuscuiusque",
		pos: "P",
		form: "RON 1 0 GEN S X INDEF",
	},
	{
		senses: ["each one;"],
		orth: "unicuique",
		pos: "P",
		form: "RON 1 0 DAT S X INDEF",
	},
	{
		senses: ["each one;"],
		orth: "unumquodque",
		pos: "P",
		form: "RON 1 0 ACC S M INDEF",
	},
	{
		senses: ["however much/little; as much as; whatever;"],
		orth: "quantumcumque",
		pos: "N",
		form: "2 2 NOM S N T",
	},
	{
		senses: ["however much/little; as much as; whatever;"],
		orth: "quantumcumque",
		pos: "N",
		form: "2 2 ACC S N T",
	},
	{ senses: ["my, mine;"], orth: "mi", pos: "A", form: "DJ 1 1 VOC S M POS" },
	{
		senses: [
			"male; masculine, of the male sex; manly, virile, brave, noble; G:masculine;"
		],
		orth: "mare",
		pos: "A",
		form: "DJ 3 1 NOM S N POS",
	},
	{ senses: ["god;"], orth: "di", pos: "N", form: "2 1 NOM P M p" },
	{ senses: ["god;"], orth: "dii", pos: "N", form: "2 1 NOM P M p" },
	{
		senses: ["god; God!: Oh God;"],
		orth: "deus",
		pos: "N",
		form: "2 1 VOC S M p",
	},
	{ senses: ["god;"], orth: "di", pos: "N", form: "2 1 VOC P M p" },
	{ senses: ["god;"], orth: "dii", pos: "N", form: "2 1 VOC P M p" },
	{ senses: ["god;"], orth: "dis", pos: "N", form: "2 1 ABL P M p" },
	{ senses: ["god;"], orth: "diis", pos: "N", form: "2 1 DAT P M p" },
	{ senses: ["god;"], orth: "dis", pos: "N", form: "2 1 DAT P M p" },
	{ senses: ["god;"], orth: "diis", pos: "N", form: "2 1 ABL P M p" },
	{
		senses: ["ox; bull; cow; cattle (pl.); (odd form of bos or bus);"],
		orth: "boum",
		pos: "N",
		form: "3 1 GEN P C t",
	},
	{
		senses: ["ox; bull; cow; cattle (pl.); (odd form of bos or bus);"],
		orth: "bobus",
		pos: "N",
		form: "3 1 DAT P C t",
	},
	{
		senses: ["ox; bull; cow; cattle (pl.); (odd form of bos or bus);"],
		orth: "bobus",
		pos: "N",
		form: "3 1 ABL P C t",
	},
	{ senses: ["month;"], orth: "mensuum", pos: "N", form: "3 3 GEN P M t" },
	{
		senses: ["of the state/republic; (res publica => the state);"],
		orth: "republicae",
		pos: "N",
		form: "5 1 GEN S F t",
	},
	{
		senses: ["country; ( = in the country); (ancient form carried on);"],
		orth: "rusi",
		pos: "N",
		form: "3 1 LOC S N w",
	},
	{
		senses: ["prefer;"],
		orth: "mavis",
		pos: "V",
		form: "6 2 PRES  ACTIVE  IND  2 S X",
	},
	{
		senses: ["prefer;"],
		orth: "mavult",
		pos: "V",
		form: "6 2 PRES  ACTIVE  IND  3 S X",
	},
	{
		senses: ["prefer;"],
		orth: "mavultis",
		pos: "V",
		form: "6 2 PRES  ACTIVE  IND  2 P X",
	},
	{
		senses: ["be willing; wish;"],
		orth: "vis",
		pos: "V",
		form: "6 2 PRES  ACTIVE  IND  2 S X",
	},
	{
		senses: ["be willing; wish;"],
		orth: "vult",
		pos: "V",
		form: "6 2 PRES  ACTIVE  IND  3 S X",
	},
	{
		senses: ["be willing; wish;"],
		orth: "vultis",
		pos: "V",
		form: "6 2 PRES  ACTIVE  IND  2 P X",
	},
	//  IND
	{
		orth: "sum",
		pos: "V",
		form: "PRES ACTIVE IND 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "es",
		pos: "V",
		form: "PRES ACTIVE IND 2 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "est",
		pos: "V",
		form: "PRES ACTIVE IND 3 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "sumus",
		pos: "V",
		form: "PRES ACTIVE IND 1 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "estis",
		pos: "V",
		form: "PRES ACTIVE IND 2 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "sunt",
		pos: "V",
		form: "PRES ACTIVE IND 3 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "eram",
		pos: "V",
		form: "IMPF ACTIVE IND 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "eras",
		pos: "V",
		form: "IMPF ACTIVE IND 2 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "erat",
		pos: "V",
		form: "IMPF ACTIVE IND 3 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "eramus",
		pos: "V",
		form: "IMPF ACTIVE IND 1 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "eratis",
		pos: "V",
		form: "IMPF ACTIVE IND 1 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "erant",
		pos: "V",
		form: "IMPF ACTIVE IND 1 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "ero",
		pos: "V",
		form: "FUT ACTIVE IND 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "eris",
		pos: "V",
		form: "FUT ACTIVE IND 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "erit",
		pos: "V",
		form: "FUT ACTIVE IND 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "erimus",
		pos: "V",
		form: "FUT ACTIVE IND 1 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "eritis",
		pos: "V",
		form: "FUT ACTIVE IND 1 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "erunt",
		pos: "V",
		form: "FUT ACTIVE IND 1 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fui",
		pos: "V",
		form: "PERF ACTIVE IND 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fuisti",
		pos: "V",
		form: "PERF ACTIVE IND 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fuit",
		pos: "V",
		form: "PERF ACTIVE IND 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fuimus",
		pos: "V",
		form: "PERF ACTIVE IND 1 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fuistis",
		pos: "V",
		form: "PERF ACTIVE IND 1 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fuerunt",
		pos: "V",
		form: "PERF ACTIVE IND 1 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fueram",
		pos: "V",
		form: "PLUP ACTIVE IND 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fueras",
		pos: "V",
		form: "PLUP ACTIVE IND 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fuerat",
		pos: "V",
		form: "PLUP ACTIVE IND 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fueramus",
		pos: "V",
		form: "PLUP ACTIVE IND 1 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fueratis",
		pos: "V",
		form: "PLUP ACTIVE IND 1 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fuerant",
		pos: "V",
		form: "PLUP ACTIVE IND 1 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fuero",
		pos: "V",
		form: "F PERF ACTIVE IND 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fueris",
		pos: "V",
		form: "F PERF ACTIVE IND 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fuerit",
		pos: "V",
		form: "F PERF ACTIVE IND 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fuerimus",
		pos: "V",
		form: "F PERF ACTIVE IND 1 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fueritis",
		pos: "V",
		form: "F PERF ACTIVE IND 1 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fuerunt",
		pos: "V",
		form: "F PERF ACTIVE IND 1 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	//  SUB
	{
		orth: "sim",
		pos: "V",
		form: "PRES ACTIVE SUBJ 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "sis",
		pos: "V",
		form: "PRES ACTIVE SUBJ 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "sit",
		pos: "V",
		form: "PRES ACTIVE SUBJ 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "simus",
		pos: "V",
		form: "PRES ACTIVE SUBJ 1 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "sitis",
		pos: "V",
		form: "PRES ACTIVE SUBJ 1 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "sint",
		pos: "V",
		form: "PRES ACTIVE SUBJ 1 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "essem",
		pos: "V",
		form: "IMPF ACTIVE SUBJ 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "esses",
		pos: "V",
		form: "IMPF ACTIVE SUBJ 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "esset",
		pos: "V",
		form: "IMPF ACTIVE SUBJ 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "essemus",
		pos: "V",
		form: "IMPF ACTIVE SUBJ 1 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "essetis",
		pos: "V",
		form: "IMPF ACTIVE SUBJ 1 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "essent",
		pos: "V",
		form: "IMPF ACTIVE SUBJ 1 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fuerim",
		pos: "V",
		form: "PERF ACTIVE SUBJ 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fueris",
		pos: "V",
		form: "PERF ACTIVE SUBJ 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fuerit",
		pos: "V",
		form: "PERF ACTIVE SUBJ 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fuerimus",
		pos: "V",
		form: "PERF ACTIVE SUBJ 1 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fueritis",
		pos: "V",
		form: "PERF ACTIVE SUBJ 1 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fuerint",
		pos: "V",
		form: "PERF ACTIVE SUBJ 1 P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fuissem",
		pos: "V",
		form: "PLUP ACTIVE SUBJ 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fuisses",
		pos: "V",
		form: "PLUP ACTIVE SUBJ 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fuisset",
		pos: "V",
		form: "PLUP ACTIVE SUBJ 1 S",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fuissemus",
		pos: "V",
		form: "PLUP ACTIVE SUBJ  P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fuissetis",
		pos: "V",
		form: "PLUP ACTIVE SUBJ  P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
	{
		orth: "fuissent",
		pos: "V",
		form: "PLUP ACTIVE SUBJ  P",
		senses: [
			"to be, exist",
			"also used to form verb perfect passive tenses with NOM PERF PPL",
		],
	},
]

export default Uniques;
