let commandProcessor = (function() {
    let text = '';
    return {
        append: (newText) => text += newText,
        removeStart: (count) => text = text.slice(count),
        removeEnd: (count) => text =
            text.slice(0, text.length - count),
        print: () => console.log(text)
    }
})();

function processCommands(commands) {
    // let commandProcessor = (function(){})();
    for (let cmd of commands) {
        let [cmdName, arg] = cmd.split(' ');
        commandProcessor[cmdName](arg);
    }
}

processCommands([
    'append hello',
    'append again',
    'removeStart 3',
    'removeEnd 4',
    'print'
]);

processCommands(['append 123', 'append 45', 'removeStart 2', 'removeEnd 1', 'print']);