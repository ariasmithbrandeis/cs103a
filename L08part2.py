def letter_count(string):
    letterSet = set(string)
    newdict = {l:string.count(l) for l in letterSet}

    return newdict

print(letter_count("aria"))