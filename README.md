# vue-countdown

[![Build Status](https://badgen.net/travis/seiwhale/vue-cutdown/master)](https://travis-ci.org/seiwhale/vue-cutdown)
[![NPM Download](https://badgen.net/npm/dm/@crv/vue-cutdown)](https://www.npmjs.com/package/@crv/vue-cutdown)
[![NPM Version](https://badgen.net/npm/v/@crv/vue-cutdown)](https://www.npmjs.com/package/@crv/vue-cutdown)
[![NPM License](https://badgen.net/npm/license/@crv/vue-cutdown)](https://github.com/seiwhale/vue-cutdown/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/seiwhale/vue-countdown/pulls)
[![Automated Release Notes by gren](https://img.shields.io/badge/%F0%9F%A4%96-release%20notes-00B2EE.svg)](https://github-tools.github.io/github-release-notes/)

## Table of Contents

- [Introduction](#introduction)
- [Demo](#demo)
- [Usage](#usage)
- [Links](#links)
- [Install](#install)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

## Introduction

📦 This is a vue plugin base on Vue2.x

## Demo

[Overview](https://seiwhale.github.io/vue-countdown/)

## Usage

### Porps

| Prop name      | Type    | Default        | Description                      |
| -------------- | ------- | -------------- | -------------------------------- |
| currentTime    | number  | now            | Current time(server time better) |
| startTime      | number  | now            | Countdown start time               |
| endTime        | number  | now            | Countdown end time                 |
| startText      | string  | Distance Start | text before countdown              |
| runningText    | string  | Distance End   | text running countdown             |
| endText        | string  | It's over      | text after countdown               |
| dayTxt         | string  | day(s)         | day_text                         |
| hourTxt        | string  | :              | hour_text                        |
| minutesTxt     | string  | :              | minutes_text                     |
| secondsTxt     | string  | :              | seconds_text                     |
| showTip        | boolean | true           | tip message display              |
| showTimeBefore | boolean | true           | before countdown show time         |
| showTimeAfter  | boolean | true           | after countdown show time          |

### Events

| Event name | Type     | Description            |
| ---------- | -------- | ---------------------- |
| onStart    | Function | countdown start callback |
| onEnd      | Function | countdown end callback   |

## Links

- [docs](https://github.io/seiwhale/vue-countdown/)

## Install

```
$ npm i @crv/vue-countdown
```

## Contributing

For those who are interested in contributing to this project, such as:

- report a bug
- request new feature
- fix a bug
- implement a new feature

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

[MIT](./LICENSE)
