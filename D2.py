def part_one(measurements):
    horizontal, depth = 0, 0

    for direction, value in measurements:
        if direction.startswith("f"):
            horizontal += value
        elif direction.startswith("d"):
            depth += value
        elif direction.startswith("u"):
            depth -= value

    return horizontal * abs(depth)


def part_two(measurements):
    horizontal, depth, aim = 0, 0, 0

    for direction, value in measurements:
        if direction.startswith("f"):
            horizontal += value
            depth -= aim * value
        elif direction.startswith("d"):
            aim += value
        elif direction.startswith("u"):
            aim -= value

    return horizontal * abs(depth)


def read_input():
    file = open("day_2/input.in", 'r')
    measurements = []

    for line in file.readlines():
        direction, value = line.split()
        measurements.append((direction, int(value)))

    return measurements


def main():
    measurements = read_input()
    print("Part 1:", part_one(measurements))
    print("Part 2:", part_two(measurements))


main()
