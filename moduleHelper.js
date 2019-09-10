var handoutFormatter = handoutFormatter || (function() {
    'use strict';
    const blue = '#063e62', gold = '#b49e67', red = `#8f1313`;
    const divstyle   = 'style="color: #eee;width: 90%; border: 1px solid black; background-color: #131415; padding: 5px;"';
    const astyle1    = `style="text-align:center; border: 1px solid black; margin: 1px; padding: 2px; background-color: ${blue}; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 100px;`;
    const astyle2    = `style="text-align:center; border: 1px solid black; margin: 3px; padding: 2px; background-color: ${blue}; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 150px;`;
    const arrowstyle = `style="border: none; border-top: 3px solid transparent; border-bottom: 3px solid transparent; border-left: 195px solid ${gold}; margin: 5px 0px;"`;
    const headstyle  = `style="color: #fff; font-size: 18px; text-align: left; font-constiant: small-caps; font-family: Times, serif; margin-bottom: 2px;"`;
    const substyle   = 'style="font-size: 11px; line-height: 13px; margin-top: -2px; font-style: italic;"';
    const breaks     = `style="border-color:${gold}; margin: 5px 2px;"`;
    const label      = `style="color: #c9c9c9; display:inline-block; width: 50%"`;
    const label2     = `style="color: #c9c9c9; display:inline-block; width: 32%"`;
    const centered   = `style="text-align:center;`;
    const version    = '1.45';

    const handleInput = (msg) => {
        const args = msg.content.split(" --");
        if (msg.type !== "api") { return; }
        log(args);
        if (args[0] === "!handout") {
            switch(args[1]) {
                case 'create':
                    createHandout();
                    break;
                case 'links':
                    linksHandout();
                    break;
                default :
                     apiMenu();
                     break;
            };
        } else if (args[0] === "!token") {
            if (args[1] === 'link' && msg.selected != undefined) {
                const supportedSystems =["dd", "myz"];
                const system = args[2];
                (supportedSystems.includes(system)) ? linkTokens(msg.selected, system) : chatMessage(`<div ${centered}>Game system was not provided. Use !helper for menu.</div>`);
            } else {
                sendChat('Module Helper', '/w gm <div ' + divstyle + '>' +
                    `<div ${headstyle}>Module Helper</div>` +
                    `<div ${substyle}>Menu (v.${version})</div>` +
                    `<div ${arrowstyle}></div>` +
                    `<div ${centered}>No tokens selected.</div>` +
                    '</div>'
                );
            };
        } else if (args[0] === "!helper") {
            apiMenu();
        };
    },

    apiMenu = () => {
        sendChat('Module Helper', '/w gm <div ' + divstyle + '>' +
            `<div ${headstyle}>Module Helper</div>` +
            `<div ${substyle}>Menu (v.${version})</div>` +
            `<div ${arrowstyle}></div>` +
            `<div ${centered}><strong>Handouts Commmands</strong></div>` +
            `<div ${centered}><a ${astyle2}" href="!handout --create">Create/Update Handouts</a></div>` +
            `<div style="text-align:center;"><a ${astyle2}" href="!handout --links">Handout of Links</a></div>` +
            `<div ${centered}>Creates or updates a handout for linking to other journal items.</div>` +
            `<hr ${breaks} />` +
            `<div ${centered}><strong>Tokens Commands</strong></div>` +
            `<div ${centered}><a ${astyle2}" href="!token --link --dd">Link Tokens (D&D)</a></div>` +
            `<div ${centered}><a ${astyle2}" href="!token --link --myz">Link Tokens (MYZ)</a></div>` +
            `<div ${centered}>Tokens must be linked to a character sheet.</div>` +
            `<hr ${breaks} />` +
            '</div>'
        );
    },

    createHandout = () => {
        const handoutText = 
        [{
                name: "Mini-Dungeon Monthly - April '19",
                text:`
                    <h1 ${centered}>Mini-Dungeon Monthly - March '19</h1><hr>
                    <h2>Contents</h2>
                    <h3>[Avarice of the Svirfneblin Whistle Punks]</h3>
                    <p style="margin-left: 25px"><i>An adventure for four level 1 characters by Jonathan G. Nelson</i></p>
                    <h3>[The Temple of Sorrows]</h3>
                    <p style="margin-left: 25px"><i>An adventure for four to six characters of 1st to 3rd level by Thilo Graf</i></p>
                `
            },{
                name: "A Race Against Time",
                text: `<h1 style="text-align: center;">A RACE AGAINST TIME</h1>
                    <p style="text-align: center;"><em>An adventure for four to five characters of 10th-11th level by Stephen Yeardley</em></p>
                    <hr />
                    <p style="text-align: left;"><em>&ldquo;A chronalmental that experimented with a </em><strong>staff of power</strong><em> to produce&nbsp;</em><em>clockwork creatures went too far when imbuing them with spirit, so its peers&nbsp;</em><em>sent it off through time.&rdquo;</em></p>`
            }];

        const handoutObjects = findObjs({
            _type: 'handout'
        });

        let feedback = "", handoutsCreated = 0, handoutsUpdated = 0;
        handoutText.forEach((data) => {
            const name = data.name, notes = 'gmnotes', text = data.text;
            const string = JSON.stringify(data.name);
            if (JSON.stringify(handoutObjects).includes(data.name)) {
                existingHandout(name, notes, text);
                handoutsUpdated += 1;
            } else {
                newHandout(name, notes, text);
                handoutsCreated += 1;
            };
        });

        chatMessage(`<div ${centered}>Created ${handoutsCreated} handouts, Updated ${handoutsUpdated}</div>`);
    },

    //== Create a handout full of links
    linksHandout = () => {
        const handoutObjects = findObjs({_type: 'handout'});
        let handoutText      = "<h1>Handout Links</h1><hr>";
        handoutText += journalItemsTitles("handout");
        handoutText += "<hr>";
        handoutText += journalItemsTitles("character");
        
        const name   = "Handout Links", notes = 'notes', text = handoutText;
        let feedback = "";
        if (JSON.stringify(handoutObjects).includes("Handout Links")) {
            existingHandout(name, notes, text);
            feedback += "Updating Handout Links handout"
        } else {
            newHandout(name, notes, text);
            feedback += "Creating Handout Links"
         };

        chatMessage(`<div ${centered}>${feedback}</div>`);
    },

    //== Create lists for the Linking handout
    journalItemsTitles = (type) => {
        const journalObjects = findObjs({_type: type});
        let sortArray        = [];
        let text             = "";

        text += `<h2>${type.charAt(0).toUpperCase()}${type.slice(1)}s</h2>`;
        journalObjects.forEach((data) => {
            if (data.attributes.name && data.attributes.name != "Handout Links") {
                sortArray.push(`[${data.attributes.name}] <br>`);
            } else {
                log("Journal item lacked a name"); 
            };
        });
        const sorted = sortArray.sort();
        sorted.forEach((title) => { text += title; });
        return text
    },

    //== Update a Handout 
    existingHandout = (name, notes, text) => {
        const existingHandout = findObjs({
            name: name
        });
        const id      = JSON.stringify(existingHandout).split(`_id":"`)[1].split(`","`)[0];
        const handout = getObj("handout", id);
        handout.set(notes, text);
    },

    //== Createe a new Handout
    newHandout = (name, notes, text) => {
        const avatar  = "https://s3.amazonaws.com/files.d20.io/images/35666065/0hOTGz_lbcziK4anAuVROw/max.png?1499526251";
        const handout = createObj('handout', {
            name: name,
            avatar: avatar
        }); 
        handout.set(notes, text);
    },

    //== This looks at a Token's Linked character Sheet and set a number of defaults 
    linkTokens = (selected, system) => {
        selected.forEach((token) => {
            const represents    = getTokenRepresents(token);
            const tokenID       = JSON.stringify(token).split(`_id":"`)[1].split(`","`)[0];
            const characterID   = getIDsFromTokens(token);
            const characterName = getAttrByName([characterID], 'character_name');
            let mods          = {}; 
            let string        = "";
            
            if (represents[0] != "") {
                if (system === "dd") {
                    const hp   = getAttrByName([characterID], 'hp', "max");
                    const ac   = getAttrByName([characterID], 'npc_ac', "current");
                    const link = getCharacterAttr(characterID, `npc_ac`);
                    const prefix = `<div><span style="color:${blue};font-weight:bold;">`
                    mods.bar1_value = hp;
                    mods.bar1_max   = hp;
                    mods.bar2_value = ac;
                    mods.bar2_link  = (link[0]) ? link[0].id : "";
                    mods.showname   = true;

                    string += (characterName) ? `<div ${centered}><strong>${characterName}</strong></div><hr ${breaks} />` : `<div ${centered}><strong>No character sheet selected in Token settings. API needs restarted. Go to API settings and click "Restart API Sandbox"</strong></div><hr ${breaks} />`;
                    string += (hp) ? `${prefix} HP / HP_Max:</span> ${mods.bar1_value} / ${mods.bar1_max}</div>` : `${prefix} HP / HP_Max:</span> 'hp_max' not found</div>`;
                    string += (ac) ? `${prefix} AC:</span> ${mods.bar2_value}</div>` : `${prefix} AC:</span> 'npc_ac' not found</div>`;
                    string += (link[0]) ? `${prefix} Link Bar 2:</span> 'npc_ac'</div>` : `${prefix} Link Bar 2:</span> 'npc_ac' not found</div>`;
                    string += `${prefix} Show Name:</span> ${mods.showname}</div>`
                } else if (system === "myz") {
                    const attributes = ["strength", "agility", "mutation"];
                    attributes.forEach((attr) => {
                        //Linking bars requires the attribute ID
                        const link  = getCharacterAttr(characterID, `${attr}`);
                        const ID    = (link.length === 0) ? false : link[0].id;
                        //Set value and max of the attribute
                        const value = getAttrByName([characterID], `${attr}`);
                        const max   = getAttrByName([characterID], `${attr}`, `${attr}_max`);
                        //Determien the bar based on the position in array
                        const num   = parseInt(attributes.indexOf(`${attr}`)) + 1;

                        mods[`bar${num}_value`] = value || 0;
                        mods[`bar${num}_max`]   = (attr === "mutation") ? 10 : max || 0;
                        (ID) ? mods[`bar${num}_link`]  = ID : log(`Linked attribute not found for bar${num}`);
                    });

                    mods.showname         = true;
                    mods.showplayers_bar1 = true;
                    mods.showplayers_bar2 = true;

                    string += `<div ${centered}><strong>${characterName}</strong></div><div ${centered}>Str: ${mods.bar1_value} / ${mods.bar1_max}</div><div ${centered}>Agi: ${mods.bar2_value} / ${mods.bar2_max}</div><div ${centered}>Mutation Points: ${mods.bar3_value} / ${mods.bar3_max}</div><div ${centered}>Show Name: ${mods.showname}</div><div ${centered}>Show Bar 1: ${mods.showplayers_bar1}</div><div ${centered}>Show Bar 2: ${mods.showplayers_bar2}</div><div ${centered}>Link Bar 1: Strength</div><div ${centered}>Link Bar 2: Agility</div><div ${centered}>Link Bar 3: Mutation</div>`
                } else {
                    string += `<div ${centered}><strong>Finished (System Not Supported)</strong></div>`
                };

                //log("Mods: " + JSON.stringify(mods));

                //Set the default token for the represented character sheet
                const tokenGet = getObj("graphic", tokenID);
                const repChar  = getObj('character', characterID);

                if (mods) {
                    tokenGet.set(mods);
                    setDefaultTokenForCharacter(repChar,tokenGet);
                } else {
                    log("Mods not found"); 
                };

                chatMessage(`${string}`);
            } else {
                chatMessage(`<div>Token does not represents a character. Set a character in the Token settings.</div>`);
            };
        });
    },

    //Used to verify a token represents a character before trying to Link Tokens.
    getTokenRepresents = (selectedToken) => {
        return [selectedToken].map(obj => getObj("graphic", obj._id))
            .map(token => token.get("represents"));
    },

    //Used to get character attributes for Linking Tokens
    getIDsFromTokens = (selectedToken) => {
        return [selectedToken].map(obj => getObj("graphic", obj._id))
            .filter(x => !!x)
            .map(token => token.get("represents"))
            .filter(id => getObj("character", id || ""));
    },

    getCharacterAttr = (characterID, name) => {
        //Example of the Return
        //{"name":"strength","current":4,"max":"4","_id":"-Lid09nn5flQ33p58Fca","_type":"attribute","_characterid":"-Lid09m7JRjcMFyO2wGO"}
        return findObjs({   
            characterid : characterID,
            "name": name
        });
    },

    chatMessage = (feedback) => {
        sendChat('Module Helper', '/w gm <div ' + divstyle + '>' +
            `<div ${headstyle}>Module Helper</div>` +
            `<div ${substyle}>Menu (v.${version})</div>` +
            '<div ' + arrowstyle + '></div>' +
            feedback +
            '</div>'
        );
    },

    registerEventHandlers = () => {
        on('chat:message', handleInput);
    };

    return {
        RegisterEventHandlers: registerEventHandlers
    };

}());

on("ready",() => {
    'use strict';
    handoutFormatter.RegisterEventHandlers();
});
