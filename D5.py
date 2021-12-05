import numpy as np


def part_one(measurements, dim):
    board = [[0 for _ in range(dim)] for _ in range(dim)]

    for x1, y1, x2, y2 in measurements:
        if x1 == x2:

            for y in range(min(y1, y2), max(y1, y2)+1):
                board[y][x1] += 1

        if y1 == y2:

            for x in range(min(x1, x2), max(x1, x2)+1):
                board[y1][x] += 1

    return np.count_nonzero(np.array(board) > 1)


def get_range(a, b):
    return range(a, b-1, -1) if a > b else range(a, b+1)


def part_two(measurements, dim):
    board = [[0 for _ in range(dim)] for _ in range(dim)]

    for x1, y1, x2, y2 in measurements:
        if x1 == x2:
            for y in range(min(y1, y2), max(y1, y2)+1):
                board[y][x1] += 1

        elif y1 == y2:
            for x in range(min(x1, x2), max(x1, x2)+1):
                board[y1][x] += 1

        else:
            coordinates = tuple(zip(get_range(x1, x2), get_range(y1, y2)))
            for x, y in coordinates:
                board[y][x] += 1

    return np.count_nonzero(np.array(board) > 1)


def read_input():
    file = open("input.in", 'r')
    measurements = []
    dim = 0

    for line in file.readlines():
        coordinates = line.split("->")
        x1, y1 = map(int, coordinates[0].split(","))
        x2, y2 = map(int, coordinates[1].split(","))

        if max(x1, y1, x2, y2) > dim:
            dim = max(x1, y1, x2, y2)

        measurements.append((x1, y1, x2, y2))

    return measurements, dim+1


def main():
    measurements, dim = read_input()
    print("Part 1:", part_one(measurements, dim))
    print("Part 2:", part_two(measurements, dim))


main()
