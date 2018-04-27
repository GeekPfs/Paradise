function Become(host)
{
  require(`../action`).call(this,host,"become");

  this.docs = "Become a visible vessel."
  
  this.operate = function(params)
  {
    var target = this.find_target(params,this.host.siblings());

    if(target){
      this.host.cmd(target.data.program)
      return `<p>You became <action>${target}</action>.</p>`
    }
    else{
      return this.err_NOTARGET(params)
    }
  }

  this.change_vessel = function(params)
  {
    var target = this.find_target(params,this.host.siblings());

    return target.id;
  }
}

module.exports = Become