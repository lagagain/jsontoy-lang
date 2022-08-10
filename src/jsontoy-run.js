import {
    excute
} from './jsontoy-core.js';

import {
    readFile
} from 'fs';

import {
    argv,
    exit
} from 'process';

const HELP = `help
---------------------
`;

function printHelp() {
    console.log(HELP);
}

if (argv.length <= 2) {
    printHelp();
    exit(0);
}

const cli_arg = {
    help: false,
    import: [],
    file: undefined,
}

function parseArgv(argv) {
    let i = 2
    while (i < argv.length) {
        if (argv[i] === "--help") {
            cli_arg = true;
        } else if (argv[i] == "--import") {
            if (++i >= argv.length) {
                console.error("missing import name.");
                exit(1);
            }
            cli_arg.import.push(argv[i + 1])
        } else {
            cli_arg.file = cli_arg.file ?? argv[i];
        }
        i += 1;
    }
}

function loadImport(imports) {

}

parseArgv(argv);

if (!cli_arg.file) {
    console.warn("Missing File.");
    printHelp();
    exit();
}

if (cli_arg.help) {
    printHelp();
    exit();
}

loadImport(cli_arg.import);

readFile(cli_arg.file, (err, data) => {
    const code = JSON.parse(data)
    if (err) {
        console.error(err);
        return;
    }
    excute(code)
})