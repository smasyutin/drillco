# drillco
Command line tool to convert drl format into another one.

## Installation
1. Install nodejs 5.7.1 or later from [nodejs-link]
2. Clone or download repository code
3. Inside the repository do `npm install`

Now you are ready to use the tool

[nodejs-link]: https://nodejs.org/en/download/stable/

## Usage
From command line you can use it like

`npm start -- --source=test/test.drl --output=result.txt --x-offset=20000 --y-offset=65000`

Please note `--` after `nmp start`, this is critical to pass all the other arguments to the tool.
