/**
 *  The MIT License (MIT)
 *
 *  Copyright (c) 2015 Toni Sučić
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

import _ from 'underscore'

/**
 * A checker is an object with the following form:
 *  { pattern: /something/, points: 1 }
 * or if the pattern only matches code near the top of a given file:
 *  { pattern: /something/, points: 2, nearTop: true }
 *
 * Key: Language name.
 * Value: Array of checkers.
 *
 * N.B. An array of checkers shouldn't contain more regexes than
 * necessary as it would inhibit performance.
 *
 * Points scale:
 *  2 = Bonus points:   Almost unique to a given language.
 *  1 = Regular point:  Not unique to a given language.
 * -1 = Penalty point:  Does not match a given language.
 * Rare:
 * -50 = Bonus penalty points: Only used when two languages are mixed together,
 *  and one has a higher precedence over the other one.
 */
let languages = {
  'JavaScript': [
    // undefined keyword
    {pattern: /undefined/g, points: 2},
    // console.log('ayy lmao')
    {pattern: /console\.log( )*\(/, points: 2},
    // Variable declaration
    {pattern: /(var|const|let)( )+\w+( )*=?/, points: 2},
    // Array/Object declaration
    // eslint-disable-next-line
    {pattern: /(('|").+('|")( )*|\w+):( )*[{\[]/, points: 2},
    // === operator
    {pattern: /===/g, points: 1},
    // !== operator
    {pattern: /!==/g, points: 1},
    // Function definition
    // eslint-disable-next-line
    {pattern: /function\*?(( )+[\$\w]+( )*\(.*\)|( )*\(.*\))/g, points: 1},
    // null keyword
    {pattern: /null/g, points: 1},
    // lambda expression
    {pattern: /\(.*\)( )*=>( )*.+/, points: 1},
    // (else )if statement
    {pattern: /(else )?if( )+\(.+\)/, points: 1},
    // while loop
    {pattern: /while( )+\(.+\)/, points: 1},
    // C style variable declaration.
    {pattern: /(^|\s)(char|long|int|float|double)( )+\w+( )*=?/, points: -1},
    // pointer
    {pattern: /(\w+)( )*\*( )*\w+/, points: -1},
    // HTML <script> tag
    {pattern: /<(\/)?script( type=('|")text\/javascript('|"))?>/, points: -50}
  ],

  'Python': [
    // Function definition
    {pattern: /def( )+\w+\(.*\)( )*:/, points: 2},
    // while loop
    {pattern: /while (.+):/, points: 2},
    // from library import something
    // eslint-disable-next-line
    {pattern: /from [\w\.]+ import (\w+|\*)/, points: 2},
    // class keyword
    {pattern: /class( )*\w+(\(( )*\w+( )*\))?( )*:/, points: 2},
    // if keyword
    {pattern: /if( )+(.+)( )*:/, points: 2},
    // elif keyword
    {pattern: /elif( )+(.+)( )*:/, points: 2},
    // else keyword
    {pattern: /else:/, points: 2},
    // for loop
    {pattern: /for (\w+|\(?\w+,( )*\w+\)?) in (.+):/, points: 2},
    // Python variable declaration.
    {pattern: /\w+( )*=( )*\w+(?!;)(\n|$)/, points: 1},
    // import something
    // eslint-disable-next-line
    {pattern: /import ([[^\.]\w])+/, points: 1, nearTop: true},
    // print statement/function
    {pattern: /print((( )*\(.+\))|( )+.+)/, points: 1},
    // &&/|| operators
    {pattern: /(&{2}|\|{2})/, points: -1}
  ],

  'HTML': [
    {pattern: /<!DOCTYPE (html|HTML PUBLIC .+)>/, points: 2, nearTop: true},
    // Tags
    {pattern: /<[a-z0-9]+(( )*[\w]+=('|").+('|")( )*)?>.*<\/[a-z0-9]+>/g, points: 2},
    // Properties
    // eslint-disable-next-line
    {pattern: /[a-z\-]+=("|').+("|')/g, points: 2},
    // PHP tag
    {pattern: /<\?php/, points: -50}
  ],

  'CSS': [
    // Properties
    // eslint-disable-next-line
    {pattern: /[a-z\-]+:(?!:).+;/, points: 2},
    // <style> tag from HTML
    {pattern: /<(\/)?style>/, points: -50}
  ],

  'Unknown': []
}

function getPoints (language, lineOfCode, checkers) {
  return _.reduce(_.map(checkers, function (checker) {
    if (checker.pattern.test(lineOfCode)) {
      return checker.points
    }
    return 0
  }), function (memo, num) {
    return memo + num
  }, 0)
}

export default function (snippet, options) {
  let opts = _.defaults(options || {}, {
    heuristic: true,
    statistics: false
  })

  let linesOfCode = snippet
    .replace(/\r\n?/g, '\n')
    .replace(/\n{2,}/g, '\n')
    .split('\n')

  function nearTop (index) {
    if (linesOfCode.length <= 10) {
      return true
    }
    return index < linesOfCode.length / 10
  }

  if (opts.heuristic && linesOfCode.length > 500) {
    linesOfCode = linesOfCode.filter(function (lineOfCode, index) {
      if (nearTop(index)) {
        return true
      }
      return index % Math.ceil(linesOfCode.length / 500) === 0
    })
  }

  let pairs = _.keys(languages).map(function (key) {
    return {language: key, checkers: languages[key]}
  })

  let results = _.map(pairs, function (pairs) {
    let language = pairs.language
    let checkers = pairs.checkers

    if (language === 'Unknown') {
      return {language: 'Unknown', points: 1}
    }

    let pointsList = linesOfCode.map(function (lineOfCode, index) {
      if (!nearTop(index)) {
        return getPoints(language, lineOfCode, _.reject(checkers, function (checker) {
          return checker.nearTop
        }))
      } else {
        return getPoints(language, lineOfCode, checkers)
      }
    })

    let points = _.reduce(pointsList, function (memo, num) {
      return memo + num
    })

    return {language: language, points: points}
  })

  let bestResult = _.max(results, function (result) {
    return result.points
  })

  if (opts.statistics) {
    let statistics = {}

    for (let _i = 0; _i < results.length; _i++) {
      let result = results[_i]
      statistics[result.language] = result.points
    }

    return {detected: bestResult.language, statistics: statistics}
  }

  return bestResult.language
}
