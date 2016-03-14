# drillco
Command line tool to convert drl format into another one.

## Installation
1. Install nodejs 5.7.1 or later from [nodejs site]
2. Clone or download repository code
3. Inside the repository do `npm install --production`

Now you are ready to use the tool

[nodejs site]: https://nodejs.org/en/download/stable/

## Usage

- Auto-scaling to default offset (25000, 63000)

`node drillco.js --source=test/test.drl --target=result.txt`

- Auto-scaling with *different* offset (29000, 65000)

`node drillco.js --source=test/test.drl --target=result.txt --x=29000 --y=65000`

- No auto-scaling with default offset (25000, 63000)

`node drillco.js --source=test/test.drl --target=result.txt --auto-scale=false`

- No auto-scaling with *different* offset (29000, 65000)

`node drillco.js --source=test/test.drl --target=result.txt --auto-scale=false --x=29000 --y=65000`

