def part_one(measurements, days):
    next_day = []
    counter = 0

    for x in range(days):
        for n in measurements:
            if n == 0:
                counter += 1
                next_day.append(6)
            else:
                next_day.append(n - 1)

        for c in range(counter):
            next_day.append(8)

        measurements = next_day
        next_day = []
        counter = 0

    return len(measurements)


# part one does not terminate for n=256
def part_two(init_fish, days):
    days_remaining = []
    for i in range(9):
        days_remaining.append(init_fish.count(i))

    for i in range(days):
        new_fish = days_remaining[0]

        for x in range(9):
            if x == 6:
                days_remaining[x] = days_remaining[x+1] + new_fish
            elif x == 8:
                days_remaining[x] = new_fish
            else:
                days_remaining[x] = days_remaining[x+1]

    return sum(days_remaining)


def read_input():
    file = open("input.in", 'r')
    return list(map(int, file.readline().split(",")))


def main():
    input = read_input()
    print("Part 1:", part_one(input, 80))
    print("Part 2:", part_two(input, 256))


main()
