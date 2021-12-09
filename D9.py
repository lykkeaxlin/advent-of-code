from functools import reduce


def part_one(points):
    low_points, coords = [], []  # coordinates used for part 2

    for i in range(len(points)):
        for j in range(len(points[0])):
            neigh, _ = get_neigh_and_coords(i, j, points)
            if points[i][j] < min(neigh):
                low_points.append(points[i][j]+1)
                coords.append((i, j))

    return sum(low_points), coords


# get neighbours and their corresponding coordinates for a given point
def get_neigh_and_coords(i, j, points):
    top     = (i-1, j) if i > 0 else (None, None)
    bottom  = (i+1, j) if i < len(points)-1 else (None, None)
    left    = (i, j-1) if j > 0 else (None, None)
    right   = (i, j+1) if j < len(points[0])-1 else (None, None)

    coordinates = list(filter(lambda x: x[0] is not None, [top, bottom, left, right]))
    neighbours = [points[coord[0]][coord[1]] for coord in coordinates]

    return neighbours, coordinates


def part_two(points):
    basins = []
    _, low_points_coords = part_one(points)

    for i, j in low_points_coords:
        basins.append(get_basin(i, j, set(), points))

    return get_res(basins)


def get_res(basins):
    return reduce((lambda x, y: x * y), sorted(basins, reverse=True)[:3])


def get_basin(i, j, basin, points):

    # add point if not wall (=9) and not visited
    if points[i][j] != 9 and (i, j) not in basin:
        basin.add((i, j))

        # continue with its neighbours until wall reached for all
        _, coord = get_neigh_and_coords(i, j, points)
        for x, y in coord:
            get_basin(x, y, basin, points)

    return len(basin)


def read_input():
    file = open("input.in", 'r')
    measurements = []

    for line in file.readlines():
        numbers = [int(a) for a in line.strip()]
        measurements.append(numbers)

    return measurements


def main():
    points = read_input()
    print("Part 1:", part_one(points)[0])
    print("Part 2:", part_two(points))


main()
