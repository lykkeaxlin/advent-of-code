import statistics


def part_one(positions):
    median = int(statistics.median(positions))
    fuel = 0

    for nbr in positions:
        fuel += abs(nbr - median)

    return fuel


# sum of natural numbers: [n(n+1)]/2
def part_two(positions):
    fuels = []

    for x_pos in range(max(positions)):
        fuel = 0

        for pos in positions:
            n = abs(pos - x_pos)
            fuel += n * (n + 1) / 2

        fuels.append(fuel)

    return int(min(fuels))


def read_input():
    file = open("input.in", 'r')
    return list(map(int, file.readline().split(",")))


def main():
    positions = read_input()
    print("Part 1:", part_one(positions))
    print("Part 2:", part_two(positions))


main()
