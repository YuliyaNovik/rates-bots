const formatInlineKeyboard = (keyNames, rowLength) => {
    const keys = keyNames.map(generateKey);
    return formatRows(keys, rowLength);
};

const generateKey = (name) => {
    return {
        text: name,
        callback_data: name
    }
};

const formatRows = (keys, rowLength) => {
    const keyboard = [];

    for (let i = 0; i < keys.length; i += rowLength) {
        keyboard.push(keys.slice(i, i + rowLength));
    }

    return keyboard;
}

module.exports = { formatInlineKeyboard };
