/* splice formula from: https://stackoverflow.com/questions/4364881/inserting-string-at-position-x-of-another-string/4364902 */
if (String.prototype.splice === undefined) {
    /**
     * Splices text within a string.
     * @param {int} offset The position to insert the text at (before)
     * @param {string} text The text to insert
     * @param {int} [removeCount=0] An optional number of characters to overwrite
     * @returns {string} A modified string containing the spliced text.
     */
    String.prototype.splice = function (offset, text, removeCount = 0) {
        let calculatedOffset = offset < 0 ? this.length + offset : offset;
        return this.substring(0, calculatedOffset) + text + this.substring(calculatedOffset + removeCount);
    };
}

/* Global Variable */
let regex = new RegExp(/(\#\d+)/, "ig");

const submit = (isReplace = false) => {
    const input = document.getElementById("textarea-input").value;
    const parsed = parseInput(input, isReplace);

    document.getElementById("textarea-output").innerText = parsed;
};

const parseInput = (input, isReplace) => {
    const formattedString = isReplace ? parseReplace(input) : parseDefault(input);

    return formattedString;
};

const parseReplace = (input) => {
    const formatted = input.replaceAll(regex, "\n"); // FIXME: not sure how to insert new line without replacing

    return formatted;
};

const parseDefault = (input) => {
    let formatted;
    let match;
    let count = 0;

    while ((match = regex.exec(input)) !== null) {
        typeof formatted === "undefined" ? (formatted = input) : (formatted = formatted.splice(match.index + count - 1, "\n"));
        count += 1;
    }

    return formatted;
};
