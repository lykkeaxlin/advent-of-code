import statistics


def part_one(positions):
    median = int(statistics.median(positions))
    fuel = 0

    for pos in positions:
        fuel += abs(pos - median)

    return fuel


def part_two(positions):
    fuels = []

    for x_pos in range(max(positions)):
        fuel = 0

        for pos in positions:
            n = abs(pos - x_pos)
            fuel += n * (n + 1) / 2  # sum of natural numbers: [n(n+1)]/2

        fuels.append(int(fuel))

    return min(fuels)


def read_input():
    file = open("input.in", 'r')
    return list(map(int, file.readline().split(",")))


def main():
    positions = read_input()
    print("Part 1:", part_one(positions))
    print("Part 2:", part_two(positions))


main()
