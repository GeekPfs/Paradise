"use strict";

function Learn(host)
{
  require(`../action`).call(this,host,"learn");

  this.knowledge = {
    paradoxes: "<b>Paradoxes</b> are vessels folded onto themselves, existing within their own space. One could argue that Paradise itself is a paradox.",
    passive: "The <b>Passive</b> <action data='learn to trigger'>trigger</action>, is used to add dynamic content to the interface."
  }

  this.operate = function(action,params)
  {
    let parts = params.split(" ")
    let target = parts[parts.length-1].toLowerCase()

    try{
      let a = require(`./${target}`);
      let obj = new a()
      return `<img src='media/graphics/${obj.name}.png'/><p>${obj.docs}</p>`
    }
    catch(err){
      return this.default(target)
    }
  }

  this.default = function(key)
  {
    if(key){
      if(this.knowledge[key]){
        return `<p>${this.knowledge[key]}</p>`;
      }
      else{
        return `Unknown term '${key}'.`  
      }
    }
    else{
      return this.general();
    }
  }

  this.general = function()
  {
    let docs = this.documentation()
    let count = Object.keys(docs).length
    let list = ""
    let index = 2
    for(let id in docs){
      if(id == "learn"){ continue; }
      list += `<action data='learn to ${id}'>${id.capitalize()}</action>${index == count-1 ? ' or ' : (index == count ? '. ' : ', ')} `
      index += 1
    }
    return `<img src='media/graphics/default.png'/><p>Which action would you like to <aciton data='learn'>learn</action>? ${list}</p>`
  }

  this.documentation = function()
  {
    let actions = {}
    let _actions = {

      create:require('./actions/create'),
      become:require('./actions/become'),
      enter:require('./actions/enter'),
      leave:require('./actions/leave'),

      warp:require('./actions/warp'),
      take:require('./actions/take'),
      drop:require('./actions/drop'),
      move:require('./actions/move'),

      learn:require('./actions/learn'),
      note:require('./actions/note'),
      transform:require('./actions/transform'),
      inspect:require('./actions/inspect'),

      trigger:require('./actions/trigger'),
      program:require('./actions/program'),
      use:require('./actions/use'),
      cast:require('./actions/cast'),
    }
    for(let id in _actions){
      let action = new _actions[id]
      actions[id] = action.docs
    }
    return actions
  }
}

module.exports = Learn