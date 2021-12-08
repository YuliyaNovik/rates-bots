const formatInlineKeyboard = (buttonNames, rowLength) => {
    const buttons = [];
    for (let i = 0; i < buttonNames.length; i+= rowLength) {
        buttons.push(buttonNames.slice(i, i + rowLength));
    }

    return buttons;
}

module.exports = { formatInlineKeyboard }