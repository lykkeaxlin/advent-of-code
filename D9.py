from functools import reduce


def part_one(points):
    lows = []

    for i in range(len(points)):
        for j in range(len(points[0])):
            neigh, _ = get_neigh_and_coords(i, j, points)
            if points[i][j] < min(neigh):
                lows.append(points[i][j])

    return sum(lows) + len(lows)


# get neighbours and their corresponding coordinates for a given point
def get_neigh_and_coords(i, j, points):
    neighbours = []

    top     = (i-1, j) if i > 0 else (None, None)
    bottom  = (i+1, j) if i < len(points)-1 else (None, None)
    left    = (i, j-1) if j > 0 else (None, None)
    right   = (i, j+1) if j < len(points[0])-1 else (None, None)

    coordinates = list(filter(lambda x: x[0] is not None, [top, bottom, left, right]))

    for i, j in coordinates:
        neighbours.append(points[i][j])

    return neighbours, coordinates


# same as part one but returns coordinates instead of value
def get_low_points_coord(points):
    lows = []

    for i in range(len(points)):
        for j in range(len(points[0])):
            neigh, _ = get_neigh_and_coords(i, j, points)
            if points[i][j] < min(neigh):
                lows.append((i, j))

    return lows


def part_two(points):
    basins = []
    low_points_coords = get_low_points_coord(points)

    # go through all low points
    for i, j in low_points_coords:
        basins.append(get_basin(i, j, set(), points))

    return get_res(basins)


def get_res(basins):
    return reduce((lambda x, y: x * y), sorted(basins, reverse=True)[:3])


def get_basin(i, j, current_basin, points):

    # add point if not wall (=9) and not visited
    if points[i][j] != 9 and (i, j) not in current_basin:
        current_basin.add((i, j))

        # continue with its neighbours until wall reached for all
        _, coord = get_neigh_and_coords(i, j, points)
        for x, y in coord:
            get_basin(x, y, current_basin, points)

    return len(current_basin)


def read_input():
    file = open("input.in", 'r')
    measurements = []

    for line in file.readlines():
        numbers = [int(a) for a in line.strip()]
        measurements.append(numbers)

    return measurements


def main():
    points = read_input()
    print("Part 1:", part_one(points))
    print("Part 2:", part_two(points))


main()
