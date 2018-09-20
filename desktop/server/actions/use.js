"use strict";

const Wildcard = require('../wildcard')

function Use(host)
{
  require(`../action`).call(this,host,"use");

  this.docs = "Trigger a vessel's program."

  this.requires_params = true;
  
  this.operate = function(params)
  {
    let target = this.find(params,this.host.usables());

    if(!target){
      return this.err_NOTARGET(params,"available")
    }

    if(!target.usable()){
      return `<p><action>${target}</action> cannot be used.</p>`
    }

    if(target.data.program.indexOf("@and") > -1){
      let cmds = target.data.program.split("@and")
      for(let id in cmds){
        let cmd = cmds[id].trim()
        this.host.cmd(new Wildcard(this.host,cmd,params).toString(false))
      }
    }
    else{
      this.host.cmd(new Wildcard(this.host,target.data.program,params).toString(false))
    }

    return target.data.reaction ? `<p>${new Wildcard(this.host,target.data.reaction,params).toString(false)}</p>` : `<p>You used <action>${target}</action>.</p>`
  }
}

module.exports = Use