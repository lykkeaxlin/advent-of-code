def part_one(measurements):
    gamma, epsilon, counter = "", "", 0

    for i in range(len(measurements[0])):
        counter = 0

        for measurement in measurements:
            if measurement[i] == '1':
                counter += 1

        if counter >= len(measurements)/2:
            gamma += '1'
            epsilon += '0'
        else:
            gamma += '0'
            epsilon += '1'

    return int(gamma, 2) * int(epsilon, 2)


def part_two(measurements):
    orig_measurements = measurements
    oxygen, co2 = "", ""

    for i in range(len(measurements[0])):
        counter = 0

        for measurement in measurements:

            if measurement[i] == '1':
                counter += 1

        if counter >= len(measurements)/2:
            measurements = list(filter(lambda x: x[i] == '1', measurements))
        else:
            measurements = list(filter(lambda x: x[i] == '0', measurements))

        if len(measurements) == 1:
            oxygen = measurements[0]

    measurements = orig_measurements

    for i in range(len(measurements[0])):
        counter = 0

        for measurement in measurements:

            if measurement[i] == '1':
                counter += 1

        if counter >= len(measurements)/2:
            measurements = list(filter(lambda x: x[i] == '0', measurements))
        else:
            measurements = list(filter(lambda x: x[i] == '1', measurements))

        if len(measurements) == 1:
            co2 = measurements[0]

    return int(oxygen, 2) * int(co2, 2)


def read_input():
    file = open("day_3/input.in", 'r')
    measurements = []

    for line in file.readlines():
        measurements.append(line.strip())

    return measurements


def main():
    measurements = read_input()
    print("Part 1:", part_one(measurements))
    print("Part 2:", part_two(measurements))


main()
