import numpy as np


def hex_to_bin(hex):
    return bin(int(hex, 16))[2:]


def get_bits_nbr(packet, bits):
    return int(packet[:bits], 2), packet[bits:]


def get_bits_str(packet, bits):
    return packet[:bits], packet[bits:]


def parse_literal(packets):
    packet = ""
    while packets[0] == "1":
        pkt, packets = packets[1:5], get_bits_nbr(packets, 5)[1]
        packet += pkt
    pkt, packets = packets[1:5], get_bits_nbr(packets, 5)[1]
    packet += pkt
    return int(packet, 2), packets


def part_one(packets):
    versions_sum, packets = get_bits_nbr(packets, 3)
    type, packets = get_bits_nbr(packets, 3)

    if type == 4:
        packets = parse_literal(packets)[1]
    else:
        mode, packets = get_bits_nbr(packets, 1)
        if mode == 0:
            length, packets = get_bits_nbr(packets, 15)
            sub_packet, packets = get_bits_str(packets, length)

            while sub_packet:
                sub_version, sub_packet = part_one(sub_packet)
                versions_sum += sub_version
        else:
            length, packets = get_bits_nbr(packets, 11)
            for _ in range(length):
                sub_version, packets = part_one(packets)
                versions_sum += sub_version

    return versions_sum, packets


def part_two(packets):
    version, packets = get_bits_nbr(packets, 3)
    type, packets = get_bits_nbr(packets, 3)
    values_sum = 0

    if type == 4:
        values_sum, packets = parse_literal(packets)
    else:
        values = []
        mode, packets = get_bits_nbr(packets, 1)
        if mode == 0:
            length, packets = get_bits_nbr(packets, 15)
            sub_packet, packets = get_bits_str(packets, length)

            while sub_packet:
                sub_version, sub_packet, sub_value = part_two(sub_packet)
                version += sub_version
                values.append(sub_value)
        else:
            length, packets = get_bits_nbr(packets, 11)
            for _ in range(length):
                sub_version, packets, sub_value = part_two(packets)
                version += sub_version
                values.append(sub_value)

        values_sum = op(values, values_sum, type)
    return version, packets, values_sum


def op(values, value, type):
    if type == 0:
        value = sum(values)
    elif type == 1:
        value = np.prod(values)
    elif type == 2:
        value = min(values)
    elif type == 3:
        value = max(values)
    elif type == 5:
        value = 1 if values[0] > values[1] else 0
    elif type == 6:
        value = 1 if values[0] < values[1] else 0
    elif type == 7:
        value = 1 if values[0] == values[1] else 0

    return value


def read_input():
    file = open("input.in", 'r')
    return file.readline().strip()


def main():
    input = read_input()
    print("Part 1:", part_one(hex_to_bin(input))[0])
    print("Part 2:", part_two(hex_to_bin(input))[2])


main()
