import numpy as np


ROWS, COLS = 10, 10


def flash(row, col, flashed, matrix, counter=0):
    neighbours = get_neighbours(row, col)

    for row, col in neighbours:
        if (row, col) not in flashed:
            matrix[row][col] += 1

            if matrix[row][col] > 9:
                flashed.add((row, col))
                matrix[row][col] = 0
                counter = 1 + flash(row, col, flashed, matrix, counter)

    return counter


def increment_all(matrix):
    for row in range(ROWS):
        for col in range(COLS):
            matrix[row][col] += 1


def get_neighbours(row, col):
    coordinates = []
    x_min, x_max = max(0, row - 1), min(ROWS - 1, row + 1)
    y_min, y_max = max(0, col - 1), min(COLS - 1, col + 1)

    for x in range(x_min, x_max + 1):
        for y in range(y_min, y_max + 1):
            if not (x == row and col == y):
                coordinates.append((x, y))

    return coordinates


def part_one(matrix):
    counter = 0

    for _ in range(100):
        increment_all(matrix)
        flashed = set()

        for row in range(ROWS):
            for col in range(COLS):
                if matrix[row][col] > 9:
                    flashed.add((row, col))
                    matrix[row][col] = 0
                    counter = 1 + flash(row, col, flashed, matrix, counter)

    return counter


def has_all_flashed(matrix):
    return not np.any(np.array(matrix))


def part_two(matrix):
    step = 0

    while not has_all_flashed(matrix):
        increment_all(matrix)
        flashed = set()

        for row in range(ROWS):
            for col in range(COLS):
                if matrix[row][col] > 9:
                    flashed.add((row, col))
                    matrix[row][col] = 0
                    flash(row, col, flashed, matrix)
        step += 1

    return step


def read_input():
    file = open("input.in", 'r')
    input = []

    for line in file.readlines():
        numbers = [int(a) for a in line.strip()]
        input.append(numbers)

    return input


def main():
    print("Part 1:", part_one(read_input()))
    print("Part 2:", part_two(read_input()))


main()
