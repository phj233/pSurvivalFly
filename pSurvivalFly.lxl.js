//LiteLoaderScript Dev Helper
/// <reference path="f:\mc\lllib/Library/JS/Api.js" /> 

var PluginName = "pSurvivalFly";
var PluginIntroDuction = "生存飞行";
var PluginVersion = [1,0,0];
var PluginOtherInformation = { "插件作者": "phj233" };
ll.registerPlugin(PluginName, PluginIntroDuction, PluginVersion, PluginOtherInformation);
 
if(!File.exists(`.\\plugins\\${PluginName}\\config.json`)){
    var conf = new JsonConfigFile(`.\\plugins\\${PluginName}\\config.json`);
    conf.init("price",60);
}

mc.listen("onServerStarted", () => {
    let cmd = mc.newCommand("psfly", "§6pfly§e生存飞行",PermType.Any);
    cmd.setAlias("psf");
    cmd.setEnum("ac", ["gui","mgr"]);
    cmd.mandatory("action", ParamType.Enum, "ac",1);
    cmd.overload(["ac"]);
    cmd.setCallback((_cmd, _ori,_out,res) => {
        switch (res.action) {
            case "gui":
                p_Gui(_ori.player);
                break;
            case "mgr":
                if(_ori.player.isOP()){
                    mgr_Gui(_ori.player);
                } else{
                    _ori.player.sendToast("你妹有权限捏","你没资格啊，你没资格啊，你没资格啊");
                }
                break;
            default:
                p_Gui(_ori.player);
                break;
        }
    });
    cmd.setup();
});

function getolplayerarr(){
    let onlinePlayer=[];
    let olPlayerData=mc.getOnlinePlayers();
    j=olPlayerData.length;
    for(let i=0;i<j;i++){
        onlinePlayer.push(olPlayerData[i].realName);
    }
    return onlinePlayer;
}

function p_Gui(player){
    let playerGui = mc.newCustomForm();
    playerGui.setTitle("§6§lpSurvivalFly");
    playerGui.addInput("您需要的飞行时长(分)：","","5");
    playerGui.addLabel("§6目前每分钟§e-"+conf.get(price)+"-§6金币");
    player.sendForm(playerGui,(player,data) => {
        if(data!=0){
            playerFly(player,data[0]);
        } else{
            player.tell("请输入数值",4);
        }
    })
}

function mgr_Gui(player){
    let mgrGui = mc.newCustomForm();
    let onlinePlayer=getolplayerarr();
    mgrGui.setTitle("§6§lpsFly-mgr");
    mgrGui.addDropdown("选择一个玩家让他飞行",onlinePlayer);
    mgrGui.addInput("飞行时间(分)","1");
    mgrGui.addInput("修改飞行金币",`${conf.get(price)}`);
    player.sendForm(mgrGui,(player,data)=>{
        if(data[1]!=null){
            playerFly(data[0],data[1])
        } else{
            player.tell("请输入飞行时间",4);
        }
        if(data[2]!=null){
            conf.set("price",data[2]);
            conf.reload();
        }
    })
}

function playerFly(pl,data){
    let time = getNumber(data);
    time=Number(time);
    let player = pl.realName;
    if(!pl.isOP()){
        money.reduce(pl.xuid,time*price);    
    }
    mc.runcmd(`ability ${player} mayfly true`);
    setTimeout(function(){
        mc.runcmd(`ability ${player} mayfly false`);
        if(pl.inAir){
            mc.runcmd(`effect ${player} slow_falling 35`);
        }
    },time*60*1000);
}

function getNumber(data) {
    return JSON.parse(data);
}

