var iniobj = {
    to: [],
    check: '',
    idx: 0
};

var inicheck = function() {
    iniobj.po = iniobj.to;
    iniobj.to = JSON.parse(Campaign().get('turnorder'));
    iniobj.check = _.find(iniobj.to, (obj) => { return obj.custom == 'Initiative Pass'});
    iniobj.idx = iniobj.to.indexOf(iniobj.check);
};

var addini = function(oTurnOrder) {
    oTurnOrder.unshift({
        id: '-1',
        pr: '1',
        custom: 'Initiative Pass'
    });
    Campaign().set("turnorder", JSON.stringify(oTurnOrder));
};

on('chat:message', (msg) => {
    // Check for "!ini" command
    if(msg.type == 'api' && msg.content.indexOf('ini') !== -1) {
        //Open Tracker if not open
        if(Campaign().get('initiativepage') === false) {
            Campaign().set('initiativepage', true);
        };
        //Setup iniobj
        inicheck();
        //Create "Initiative Pass" if it doesn't exist
        if(iniobj.check === undefined){
            addini(iniobj.to);
        }
        //Otherwise start a new turn
        else{
            iniobj.to.splice(iniobj.idx, 1);
            addini(iniobj.to);
        };
    };
});


//Check for iniobj to make it to top of tracker
on('change:campaign:turnorder', () => {
    inicheck();
    if(iniobj.idx === 0 && (_.isArray(iniobj.to) && _.isArray(iniobj.po) && !_.isEqual(iniobj.to[0],iniobj.po[0]) ) || (_.isArray(iniobj.to) && ! _.isArray(iniobj.po))){
        iniobj.to[0].pr++;
        for (var i = 1; i < iniobj.to.length; i++) {
            iniobj.to[i].pr-=10;
            iniobj.to[i].pr = iniobj.to[i].pr < 0 ? 0 : iniobj.to[i].pr;
        };
        Campaign().set("turnorder", JSON.stringify(iniobj.to));
    };
});
