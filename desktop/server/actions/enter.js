'use strict'

const Action = require(`../core/action`)

function Enter (host) {
  Action.call(this, host, 'enter')

  this.docs = 'Enter a visible vessel.'

  this.operate = function (action, params) {
    if (!params) { return this.err_NOPARAM() }

    const target = this.find(params, this.host.siblings(true))

    if (target) {
      this.host.move(target)
      return `<p>You entered the <action>${target.name()}</action>.</p>`
    } else {
      return this.err_NOTARGET(params)
    }
  }
}

module.exports = Enter
