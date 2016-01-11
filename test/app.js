'use strict'
var path = require('path')
var assert = require('yeoman-assert')
var helpers = require('yeoman-generator').test

describe('generator-reviews:app', () => {
  before(done => {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({someOption: true})
      .withPrompts({someAnswer: true})
      .on('end', done)
  })

  it('creates files', () => {
    assert.file([
      'AUTHOR'
    ])
  })
})
