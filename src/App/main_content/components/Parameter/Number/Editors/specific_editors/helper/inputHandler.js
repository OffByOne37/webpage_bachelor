export const handleInput = (inp) => {
    const inputValue = inp.trim();
    const isValidInput = /^[-0-9]+$/.test(inputValue);
    return isValidInput ? parseInt(inputValue) : undefined;
};