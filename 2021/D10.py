import statistics


def part_one(input):
    pairs = {'(': ')', '[': ']', '{': '}', '<': '>'}
    points = {')': 3, ']': 57, '}': 1197, '>': 25137}
    error = 0

    for line in input:
        openings = []

        for char in line:
            if char in pairs:
                openings.append(char)
            else:
                wanted = pairs[openings[-1]]
                del openings[-1]
                if char != wanted:
                    error += points[char]
                    break

    return error


def get_incomplete(input):
    pairs = {'(': ')', '[': ']', '{': '}', '<': '>'}
    incomplete = []

    for line in input:
        openings = []

        for char in line:
            if char in pairs:
                openings.append(char)
            else:
                wanted = pairs[openings[-1]]
                del openings[-1]
                if char != wanted:
                    openings = []
                    break

        if len(openings) != 0:
            incomplete.append(openings)

    return incomplete


def part_two(input):
    points = {'(': 1, '[': 2, '{': 3, '<': 4}
    results = []

    for incomplete in get_incomplete(input):
        score = 0

        for char in reversed(incomplete):
            score *= 5
            score += points[char]

        results.append(score)

    return statistics.median(sorted(results))


def read_input():
    file = open("input.in", 'r')
    input = []

    for line in file.readlines():
        input.append(line.strip())

    return input


def main():
    points = read_input()
    print("Part 1:", part_one(points))
    print("Part 2:", part_two(points))


main()
