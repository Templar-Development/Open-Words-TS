import json

with open ('output.json') as json_file:
    data = json.load(json_file)
    """
    for uniques
    print(data[0]["defs"][0]["w"]["senses"])
    """
