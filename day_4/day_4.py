def sum_unmarked(board):
    sum = 0

    for i in range(5):
        for j in range(5):
            if board[i][j] != -1:
                sum += board[i][j]

    return sum


def is_winner_row(board, row):
    for i in range(5):
        if board[row][i] != -1:
            return False

    return True


def is_winner_col(board, col):
    for i in range(5):
        if board[i][col] != -1:
            return False

    return True


def part_one(numbers, boards):
    for n in numbers:
        for board in boards:

            for i in range(5):
                for j in range(5):
                    if board[i][j] == n:
                        board[i][j] = -1

                        if is_winner_row(board, i) or is_winner_col(board, j):
                            return sum_unmarked(board) * n

    return 0


def part_two(numbers, boards):
    winner_score = 0
    winning_boards = set()

    for n in numbers:
        for board_nbr in range(len(boards)):

            if board_nbr not in winning_boards:
                board = boards[board_nbr]

                for i in range(5):
                    for j in range(5):
                        if board[i][j] == n:
                            board[i][j] = -1

                            if is_winner_row(board, i) or is_winner_col(board, j):
                                winning_boards.add(board_nbr)

                                if len(winning_boards) == len(boards):
                                    return sum_unmarked(board) * n

    return winner_score


def parse_line(file):
    return list(map(int, filter(lambda x: x, file.readline().strip().split(" "))))


def read_input():
    file = open("input.in", 'r')
    boards = []
    numbers = list(map(int, file.readline().split(",")))
    _ = file.readline()
    line = parse_line(file)
    board = [[0] * 5 for _ in range(5)]

    while line:

        for i in range(5):
            board[i] = line
            line = parse_line(file)

        boards.append(board)
        board = [[0] * 5 for _ in range(5)]
        line = parse_line(file)

    return numbers, boards


def main():
    numbers, boards = read_input()
    print("Part 1:", part_one(numbers, boards))
    print("Part 2:", part_two(numbers, boards))


main()
