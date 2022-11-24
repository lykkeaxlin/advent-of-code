from collections import defaultdict


def part_one(graph, small_caves):
    return find_all_paths("start", graph, small_caves)


def find_all_paths(current, graph, small_caves, small_visited=None):
    total_paths = 0

    if small_visited is None:
        small_visited = set()
    elif current in small_visited:
        return 0
    elif current == "end":
        return 1
    elif current in small_caves:
        small_visited.add(current)

    for neighbour in graph[current]:
        if neighbour != 'start':
            total_paths += find_all_paths(neighbour, graph, small_caves, small_visited)

    if current in small_visited:
        small_visited.remove(current)

    return total_paths


def part_two(numbers, boards):
    return 0


def read_input():
    file = open("input.in", 'r')
    graph = defaultdict(list)
    small_caves = set()

    for line in file.readlines():
        splitted = line.strip().split("-")
        e1, e2 = splitted[0], splitted[1]

        graph[e1].append(e2)
        graph[e2].append(e1)

        if e1.islower():
            small_caves.add(e1)

        if e2.islower():
            small_caves.add(e2)

    return graph, small_caves


def main():
    graph, small_caves = read_input()
    print("Part 1:", part_one(graph, small_caves))
    print("Part 2:", part_two(graph, small_caves))


main()
