//LiteLoaderScript Dev Helper
/// <reference path="f:\mc\lllib/Library/JS/Api.js" /> 
var PluginName = "pSurvivalFly";
var PluginIntroDuction = "生存飞行";
var PluginVersion = [1,0,0];
var PluginOtherInformation = { "插件作者": "phj233" };
ll.registerPlugin(PluginName, PluginIntroDuction, PluginVersion, PluginOtherInformation);

var price = 60;

mc.listen("onServerStarted", () => {
    let cmd = mc.newCommand("psfly", "§4pfly§3生存飞行",PermType.Any);
    cmd.setAlias("psf");
    cmd.setEnum("ac", ["gui","mgr"]);
    cmd.mandatory("action", ParamType.Enum, "ac");
    cmd.overload("ac");
    cmd.setCallback((_cmd, _ori,_out, res) => {
        switch (res.action) {
            case "gui":
                p_Gui(_ori.player);
            default:

                break;
        }
    });
    cmd.setup();
});
function p_Gui(player){
    let playerGui = mc.newCustomForm();
    playerGui.setTitle("§4§lpSurvivalFly");
    playerGui.addInput("您需要的飞行时长(分)：","","5");
    playerGui.addLabel(`§e目前单价"${price}"金币`);
    player.sendForm(playerGui,(player,data) => {
        if(data!=0){

        }

    })
}

function mgr_Gui(player){
    let mgrGui = mc.newCustomForm();
    let onlinePlayer=[];
    let olPlayerData=mc.getOnlinePlayers();
    j=olPlayerData.length;
    for(let i=0;i<j;i++){
        onlinePlayer.push(olPlayerData[i].realName);
    }
    mgrGui.setTitle("§4§lpsFly-mgr");
    mgrGui.addDropdown("选择一个玩家让他飞行",onlinePlayer);
    mgrGui.addInput("飞行时间(分)","5");
    player.sendForm(mgrGui,(player,data)=>{
        if(data!=null){

        } else{

        }
    })
}

function playerFly(pl,time){

}


