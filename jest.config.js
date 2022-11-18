module.exports = {
    testEnvironment: "jsdom",
    testPathIgnorePatterns: ["/lib/", "/node_modules/"],
    modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
    testRegex: '(/src/__test__.*\\.(test|spec))\\.(ts|tsx|js)$',
    moduleNameMapper: {
        '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules',
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    },
    transform: {
      "^.+\\.(ts|tsx)?$": "ts-jest",
      "^.+\\.(js|jsx)$": "babel-jest",
      ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform",
      "\\.(jpg|jpeg|png|gif|webp|svg)$": "jest-transform-file",
    },
    "verbose": true,
"bail": true
  };