def run(x_range, y_range):
    max_y, hits = 0, 0

    for vel_x in range(1, max(x_range)+1):
        for vel_y in range(min(y_range), abs(min(y_range))):
            hit, current_y = find_max_y(vel_x, vel_y, x_range, y_range)

            if hit:
                hits += 1
                max_y = max(max_y, current_y)

    return max_y, hits


def find_max_y(vel_x, vel_y, x_range, y_range):
    max_y, x, y = 0, 0, 0

    while True:
        x += vel_x
        y += vel_y
        vel_y -= 1

        if vel_x > 0:
            vel_x -= 1
        elif vel_x < 0:
            vel_x += 1

        max_y = max(y, max_y)

        if x in x_range and y in y_range:
            return True, max_y
        elif y < min(y_range) or x > max(x_range):
            return False, -1
        else:
            continue


def read_input():
    file = open("input.in", 'r')
    line = file.readline().split(" ")
    x = list(map(int, line[2].strip().replace("=", "").replace(",", "").replace("x", "").split("..")))
    y = list(map(int, line[3].strip().replace("=", "").replace(",", "").replace("y", "").split("..")))
    return range(x[0], x[1]+1), range(y[0], y[1]+1)


def main():
    x_range, y_range = read_input()
    max_y, hits = run(x_range, y_range)
    print("Part 1:", max_y)
    print("Part 2:", hits)


main()
