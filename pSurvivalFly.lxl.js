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
    cmd.setCallback((_cmd, _ori,_out,res) => {
        switch (res.action) {
            case "gui":
                p_Gui(_ori.player);
                break;
            case "mgr":
                if(_ori.player.isOP()){
                    mgr_Gui(_ori.player);
                    break;
                } else{
                    _ori.player.sendToast("你妹有权限捏","你没资格啊，你没资格啊，你没资格啊");
                }
            default:
                p_Gui(_ori.player);
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
    playerGui.setTitle("§4§lpSurvivalFly");
    playerGui.addInput("您需要的飞行时长(分)：","","5");
    playerGui.addLabel(`§e目前单价"${price}"金币`);
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
    onlinePlayer=getolplayerarr();
    mgrGui.setTitle("§4§lpsFly-mgr");
    mgrGui.addDropdown("选择一个玩家让他飞行",onlinePlayer);
    mgrGui.addInput("飞行时间(分)","5");
    player.sendForm(mgrGui,(player,data)=>{
        if(data!=null){
            playerFly(player,data[1])
        } else{

        }
    })
}

function playerFly(pl,time){

}


