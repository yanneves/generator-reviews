'use strict'
var yeoman = require('yeoman-generator').Base
var chalk = require('chalk')
var yosay = require('yosay')

module.exports = yeoman.extend({
  prompting: function () {
    let done = this.async()

    // Have Yeoman greet the user.
    this.log(yosay(
      `Welcome to the impressive ${chalk.red('reviews')} generator!`
    ))

    let prompts = [{
      type: 'input',
      name: 'author',
      message: 'Who should be named the author of these reviews?',
      default: 'Anonymous'
    }]

    this.prompt(prompts, props => {
      this.props = props
      done()
    })
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('_AUTHOR'),
      this.destinationPath('AUTHOR'),
      this.props
    )
  }
})
