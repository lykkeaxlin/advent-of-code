def part_one(fish, days):
    next_day = []
    counter = 0

    for x in range(days):
        for n in fish:
            if n == 0:
                counter += 1
                next_day.append(6)
            else:
                next_day.append(n - 1)

        for c in range(counter):
            next_day.append(8)

        fish = next_day
        next_day = []
        counter = 0

    return len(fish)


# part one does not terminate for n=256
def part_two(init_fish, days):
    fish = []
    for i in range(9):
        fish.append(init_fish.count(i))

    for _ in range(days):
        new_fish = fish[0]

        for i in range(9):
            if i == 6:
                fish[i] = fish[i+1] + new_fish
            elif i == 8:
                fish[i] = new_fish
            else:
                fish[i] = fish[i+1]

    return sum(fish)


def read_input():
    file = open("input.in", 'r')
    return list(map(int, file.readline().split(",")))


def main():
    input = read_input()
    print("Part 1:", part_one(input, 80))
    print("Part 2:", part_two(input, 256))


main()
