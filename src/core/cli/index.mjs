import 'dotenv/config'

const commands = {}

if (process.argv.length === 2) {
    console.error('Expected at least one argument!');
    process.exit(1);
}


process.argv.slice(2).forEach(function (val, index, array) {
if (!Object.keys(commands).includes(val.trim())) {
    console.error('Command not exist:', val)
} else {
    commands[val]()
}
process.exit(1)
});