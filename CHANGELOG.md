## [0.2.1](https://github.com/textkernel/bem/compare/v0.2.0...v0.2.1) (2019-10-14)



# [0.2.0](https://github.com/textkernel/bem/compare/v0.1.4...v0.2.0) (2019-10-14)


### Bug Fixes

* removed non-existend export from bem ([880d6af](https://github.com/textkernel/bem/commit/880d6afe5363e2793fcfd5056986113e78bc0991))


### Features

* added { debug: true } option to `block` and `elem` functions ([a76a608](https://github.com/textkernel/bem/commit/a76a60856d1a07be51b1f1193966597ce6e4a1bd))



## [0.1.4](https://github.com/textkernel/bem/compare/2174b604fbfc0dff1f27ac12348ffa28bd434978...v0.1.4) (2019-07-01)


### Bug Fixes

* made bem to use a value of classNames dict, not a key ([da247c7](https://github.com/textkernel/bem/commit/da247c7086dd0d9277bee5cc166cd69845d8f60b))
* removed duplicate line of code ([5594169](https://github.com/textkernel/bem/commit/55941694ced4827e27ceff0fff70f02084db951b))


### Features

* implemented bem function ([a70e63e](https://github.com/textkernel/bem/commit/a70e63e050fdfcdeacb5f557441be005fb072545))
* made `block` and `elem` return { classNames: '...' } ([8ea5e2a](https://github.com/textkernel/bem/commit/8ea5e2a16e835d81955fa9b987323a6bc7537a24))
* migrate bem package from textkernel/oneui to separate repo ([2174b60](https://github.com/textkernel/bem/commit/2174b604fbfc0dff1f27ac12348ffa28bd434978))
* removed bemDeprecated ([47f1a93](https://github.com/textkernel/bem/commit/47f1a935db09f8e166e71e1eabce9e1b2edefb84))


### BREAKING CHANGES

* since now `block` and `elem` return { classNames: '...' }
instead of just a string with classes.



