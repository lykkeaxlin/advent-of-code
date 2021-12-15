import numpy as np
np.set_printoptions(linewidth=320)  # format print


def part_one(rows, cols, coordinates, instruction):
    board = init_board(rows, cols, coordinates)
    dir, value = instruction

    if 'y' in dir:
        board = fold_y(int(value), rows, board)
    else:
        board = fold_x(int(value), cols, board)

    return np.count_nonzero(board)


def part_two(rows, cols, coordinates, instructions):
    board = init_board(rows, cols, coordinates)

    for dir, value in instructions:
        if 'y' in dir:
            board = fold_y(int(value), len(board)-1, board)
        else:
            board = fold_x(int(value), len(board[0])-1, board)

    return np.array(format_board(board))


def init_board(rows, cols, coordinates):
    board = [[0 for _ in range(cols+1)] for _ in range(rows+1)]

    for i, j in coordinates:
        board[j][i] = 1

    return board


def fold_x(x, cols, board):
    new_board = np.copy(board)[::, :x]

    for i in range(len(new_board)):
        for j in range(len(new_board[i])):
            new_board[i][j] += board[i][cols-j]

    return new_board


def fold_y(y, rows, board):
    new_board = np.copy(board)[:y, ::]

    for i in range(len(new_board)):
        for j in range(len(new_board[i])):
            new_board[i][j] += board[rows-i][j]

    return new_board


# format board so it's readable
def format_board(board):
    formatted = [[" " for _ in range(len(board[0])+1)] for _ in range(len(board)+1)]

    for i in range(len(board)):
        for j in range(len(board[i])):
            if board[i][j] > 0:
                formatted[i][j] = "#"
    return formatted


def read_input():
    file = open("input.in", 'r')
    rows, cols, instructions = [], [], []
    line = file.readline().strip()

    while line != '\n':
        splitted = list(map(int, line.strip().split(",")))
        cols.append(splitted[0])
        rows.append(splitted[1])
        line = file.readline()

    for line in file.readlines():
        instructions.append(line.strip().split("="))

    return max(rows), max(cols), list(zip(cols, rows)), instructions


def main():
    template, mappings, coordinates, instructions = read_input()
    print("Part 1:", part_one(template, mappings, coordinates, instructions[0]))
    print("Part 2:\n", part_two(template, mappings, coordinates, instructions))  # RLBCJGLU


main()
