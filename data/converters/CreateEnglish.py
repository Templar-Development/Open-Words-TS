with open("EWDSLIST.GEN", "r") as f:
    lines = f.readlines()

english_data = []
for line in lines:
    # Check if line contains at least 6 elements
    if len(line.split()) >= 6:
        orth, wid, pos, source, semi, compound, frequency = line.split()[:7]
        english_data.append({
            "orth": orth,
            "wid": int(wid),
            "pos": pos,
            "frequencyType": source,
            "frequency": int(frequency),
            "compound": int(compound),
            "semi": int(semi),
        })

with open("english.ts", "w") as f:
    f.write("const English: any = [\n")
    for data in english_data:
        f.write(f"\t{str(data)},\n")
    f.write("]\n")
