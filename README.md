# Getting Started 

##To work on SuiBot, you must have nodeJS already installed on your computer

https://nodejs.org/en/download


##Install the dependancies from NPM using:##

`$ .\install.bat`


##Running tests:##

1. Install mocha to your computer

: `$ npm install -g mocha`


2. Compile everything in src folder to out folder:

: `$ tsc`

3. Run the tests

: `$ mocha .\out\tests\test-sui`


##Running SuiBot:##

1. Compile everything in src folder to out folder:

: `$ tsc`


2. Run

: `$ .\run.bat`
