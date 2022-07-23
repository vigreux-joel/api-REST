interface String {
    ucfirst(): string;
}

/**
 * Returns a string with the first character of string capitalized, if that character is alphabetic.
 * @return {string}
 **/
String.prototype.ucfirst = function (): string {
    return this.charAt(0).toUpperCase() + this.slice(1)
};