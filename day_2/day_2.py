import math


def read_input():
    file = open("input.in", 'r')
    horizontal = 0
    depth = 0
    aim = 0

    for line in file.readlines():
        direction = line.split()[0]
        value = int(line.split()[1])

        if direction.startswith("f"):
            horizontal += value
            depth -= aim*value
        elif direction.startswith("d"):
            aim += value
        elif direction.startswith("u"):
            aim -= value

    return horizontal * math.fabs(depth)


def main():
    print(read_input())


main()
