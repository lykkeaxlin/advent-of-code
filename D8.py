def part_one(outputs):
    counter = 0

    for output in outputs:
        for signal in output:
            if len(signal) == 2 or len(signal) == 4 or len(signal) == 3 or len(signal) == 7:
                counter += 1

    return counter


def sort_signal(signal):
    return ''.join(sorted(signal))


def decode(signal):
    decoded_numbers, encoded_numbers = dict(), dict()

    for sig in signal:
        if len(sig) == 2:
            decoded_numbers[1] = sort_signal(sig)
        elif len(sig) == 3:
            decoded_numbers[7] = sort_signal(sig)
        elif len(sig) == 4:
            decoded_numbers[4] = sort_signal(sig)
        elif len(sig) == 7:
            decoded_numbers[8] = sort_signal(sig)
        elif len(sig) == 6:  # candidates for 0, 6 and 9
            encoded_numbers.setdefault(6, []).append(sort_signal(sig))
        else:  # candidates for 2, 3 and 5
            encoded_numbers.setdefault(5, []).append(sort_signal(sig))

    # find 0, 6 and 9 (len == 6)
    for number in encoded_numbers.get(6):
        if is_substring(number, decoded_numbers.get(4)):    # 4 is substring of 9
            decoded_numbers[9] = sort_signal(number)
        elif is_substring(number, decoded_numbers.get(1)):  # 1 is substring of 0
            decoded_numbers[0] = sort_signal(number)
        else:
            decoded_numbers[6] = sort_signal(number)        # else 6

    bottom_left = remove_substring(decoded_numbers.get(8), decoded_numbers.get(9))

    # find 2, 3 and 5 (len == 5)
    for number in encoded_numbers.get(5):
        if is_substring(number, decoded_numbers.get(1)):    # 1 is substring of 3
            decoded_numbers[3] = sort_signal(number)
        elif is_substring(number, bottom_left):             # 2 contains bottom left piece
            decoded_numbers[2] = sort_signal(number)
        else:
            decoded_numbers[5] = sort_signal(number)        # else 5

    return decoded_numbers


def remove_substring(signal, characters):
    for char in characters:
        signal = signal.replace(char, '')

    return signal


def is_substring(signal, characters):
    for char in characters:
        if char not in signal:
            return False

    return True


def part_two(signals, outputs):
    sum, value = 0, ""

    for i, signal in enumerate(signals):
        decoded = dict((v, k) for k, v in decode(signal).items())  # invert key, value

        for output in outputs[i]:
            value += str(decoded.get(sort_signal(output)))

        sum += int(value)
        value = ""

    return sum


def read_input():
    file = open("input.in", 'r')
    outputs = []
    signals = []

    for line in file.readlines():
        sig, out = line.strip().split("|")
        sig = [x for x in sig.split(" ") if x]
        out = [x for x in out.split(" ") if x]
        outputs.append(out)
        signals.append(sig)

    return signals, outputs


def main():
    signals, outputs = read_input()
    print("Part 1:", part_one(outputs))
    print("Part 2:", part_two(signals, outputs))


main()
