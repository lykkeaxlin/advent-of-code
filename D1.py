def count_one(measurements):
    prev = measurements[0]
    counter = 0

    for num in measurements[1:]:
        if num > prev:
            counter += 1
        prev = num

    return counter


def count_window(measurements):
    counter = 0

    for i in range(len(measurements)):
        sum_fst_window = sum(measurements[i:i+3])
        sum_snd_window = sum(measurements[i+1:i+4])

        if sum_snd_window > sum_fst_window:
            counter += 1

    return counter


def read_input():
    file = open("day_1/input.in", 'r')
    measurements = []

    for line in file.readlines():
        measurements.append(int(line))

    return measurements


def main():
    measurements = read_input()
    print(count_one(measurements))
    print(count_window(measurements))


main()
