# _Bike-API_

#### _Application demonstrating use of API calls using async functions_

#### By **Laura Hope, Qian Li, Max Betich**_

## Technologies Used

* _HTML_
* _CSS_
* _JavaScript_
* _Webpack v4.46.0_
* _Node.js v16.13.1_

## Description

_This application allows user to search the bike index via Bike Index API to obtain a list of criteria based on keywords. List includes all stolen and non stolen bikes in a certain proximity within the last week, in addition to displaying information on the most-frequently stolen type of bike by manufacturer in a given area._

## Setup/Installation Requirements

* _Clone “bike-API“ from the repository to your desktop_
* _Navigate to "bike-API" directory via your local terminal command line_
* _Open the directory in VS code by typing 'code .' in the command line_
* _Add .env file to root of directory to store API key by typing "touch .env"_
* _Get an API key* by creating an account on https://bikeindex.org/oauth/applications_
* _Copy API key and store in .env file using the variable "API-KEY"_
* _Run 'npm install' in the command line to install all packages_
* _Run 'npm run build' to build the project via webpack_
* _Run 'npm run lint' to lint all JS files_
* _Run 'npm run test' to test files via Jest_
* _Run 'npm run start' to start a development server_

_* API key will be a unique combination of numbers and letters, allowing full access to application_
_* API key MUST be stored in variable "API-KEY" within .env file - example: API-KEY=3dedc43fe425992c27b353e950b9e942_

## Known Bugs

* _Any known issues_

## License

MIT License

Copyright (c) [2023] [Laura Hope, Qian Li, Max Betich]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

_If you run into any issues or have questions, ideas or concerns, please reach out via email: lauramhope.dpt@gmail.com.  Contributions to the code are highly encouraged._
