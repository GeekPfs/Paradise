"use strict";

const Vessel = require('./vessel')

function Paradise()
{
  this.game = require('./game')
  this.client = null;

  this.reset = function()
  {
    // Default World
    this.import([
      {name:"ghost",parent:1,owner:0,note:"Well, well, hello there."},
      {name:"library",attr:"ceramic",parent:1,owner:1,note:`Hi @full, welcome to the @_full, a persistent vessel and stem to this world. Type "<action data='learn'>learn</action>" to get started.`},
      {name:"map",parent:0,owner:0,note:"A basic map", trigger:`passive`, reaction:'THE @STEM'},
    ]);
  }

  this.load = function()
  {
    let previous = this.game.load()
    
    if(previous){
      console.info("Loaded world")
      this.import(previous)
    }
    else{
      console.info("New world")
      this.reset();
    }
  }
  
  // Start

  this.import = function(json)
  {
    let a = []
    for(let id in json){
      let vessel = new Vessel(json[id])
      a.push(vessel)
    }
    this.world = a;
  }

  this.export = function()
  {
    let a = []

    for(let id in this.world){
      let json = this.world[id].to_h()
      a.push(json)
    }
    return JSON.stringify(a)
  }

  this.add = function(vessel)
  {
    if(this.exists(vessel)){
      return false;
    }
    this.world.push(vessel)
    this.update()
    return true;
  }

  this.exists = function(target)
  {
    for(let id in this.world){
      let v = this.world[id]
      if(v.data.name != target.data.name){ continue; }
      if(v.data.attr != target.data.attr){ continue; }
      if(v.data.parent != target.data.parent){ continue; }
      return true
    }
    return false
  }

  this.query = function(id = 0,q = "look")
  {
    this.game.save(this)

    if(this.ghost(id)){
      return this.ghost(id).cmd(q)  
    }
  }

  this.update = function()
  {
    // Connect IDs
    for(let id in this.world){
      this.world[id].paradise = this
      this.world[id].id = parseInt(id)
    }
  }

  this.ghost = function(id = this.client.id)
  {
    this.update()
    return this.world[id];
  }

  this.random = function()
  {
    let id = Math.floor((Math.random() * this.world.length));
    return this.world[id]
  }

  this.to_h = function()
  {
    let a = []
    // Connect IDs
    for(let id in this.world){
      a.push(this.world[id].to_h())
    }
    return a
  }

  this.load();
}

module.exports = Paradise