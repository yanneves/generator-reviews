'use strict'
var yeoman = require('yeoman-generator').Base
var chalk = require('chalk')
var yosay = require('yosay')
var _ = require('lodash')
var moment = require('moment')

module.exports = yeoman.extend({
  constructor: function () {
    yeoman.apply(this, arguments)
    this.argument('name', { type: String, required: true })
    this.name = this.name
    this.option('product')
  },

  prompting: function () {
    let done = this.async()

    // Have Yeoman greet the user.
    this.log(yosay(
      `Welcome! Reviewing.. \n ${chalk.red(this.name)} \n now for a few questions:`
    ))

    let prompts = [{
      type: 'list',
      name: 'rating',
      message: `What is your overall star rating of this ${this.options.product ? 'product' : 'location'}?`,
      choices: Array.apply(null, new Array(5)).map((x, i) => new Array(i + 2).join('\u2605'))
    }, {
      type: 'input',
      name: 'when',
      message: `When (and with whom) did you ${this.options.product ? 'purchase' : 'visit'}?`
    }, {
      type: 'input',
      name: 'experience',
      message: 'What was your experience?'
    }, {
      type: 'input',
      name: 'negatives',
      message: 'Any negatives?'
    }, {
      type: 'input',
      name: 'tips',
      message: 'Any tips?'
    }, {
      type: 'list',
      name: 'month',
      message: 'Finally, in which month does your review take place?',
      choices: Array.apply(null, new Array(12)).map((x, i) => moment().month(i).format('MMMM'))
    }, {
      type: 'list',
      name: 'year',
      message: 'And in which year?',
      choices: Array.apply(null, new Array(10)).map((x, i) => moment().subtract(i, 'years').format('YYYY'))
    }]

    this.prompt(prompts, props => {
      this.props = props
      done()
    })
  },

  writing: function () {
    let timestamp = `${this.props.year}_${_.camelCase(this.props.month)}`
    let slug = _.snakeCase(this.name)
    this.fs.copyTpl(
      this.templatePath('_{timestamp}-{slug}.txt'),
      this.destinationPath(`${timestamp}-${slug}.txt`),
      _.assign(this.props, { name: this.name })
    )
  }
})
