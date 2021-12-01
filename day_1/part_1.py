file = open("input.in", 'r')

counter = 0
prev = file.readline()

for line in file.readlines():
    if int(line) > int(prev):
        counter += 1

    prev = line


print(counter)
