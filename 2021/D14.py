from collections import Counter


def part_one(template, mappings):
    polymer = template

    for _ in range(10):
        next_poly = ""
        for i in range(len(polymer)):
            seq = polymer[i:i+2]
            if seq in mappings:
                first, second = seq[0], mappings.get(seq)
                next_poly += first + second
        polymer = next_poly + template[-1]

    return get_res(polymer)


def get_res(polymer):
    counter = Counter(polymer)
    counts = counter.most_common()
    most = counts[0][1]
    least = counts[-1][1]
    return most - least


def read_input():
    file = open("test.in", 'r')
    template = file.readline().strip()
    mappings = dict()
    file.readline()

    for line in file.readlines():
        splitted = line.strip().split(" -> ")
        mappings[splitted[0]] = splitted[1]

    return template, mappings


def main():
    template, mappings = read_input()
    print(part_one(template, mappings))
    #print(part_two(template, mappings))


main()
