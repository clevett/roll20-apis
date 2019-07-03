var handoutFormatter = handoutFormatter || (function() {
    'use strict';
    const purple  = '#8a288f', hotpink = '#ed028c', blue = '#03baf2', silver  = '#d5d5d5';
    const divstyle   = 'style="color: #131415;width: 90%; border: 1px solid #d5d5d5; background-color: #d5d5d5; padding: 5px;"';
    const astyle2    = `style="text-align:center; border: 1px solid #707070; margin: 3px; padding: 2px; background-color: ${blue}; border-radius: 4px;  box-shadow: 1px 1px 1px ${hotpink}; line-height: 2em; width: 14em;`;
    const arrowstyle = `style="border: none; border-top: 3px solid transparent; border-bottom: 3px solid transparent; border-left: 195px solid ${hotpink}; margin: 5px 0px;"`;
    const headstyle  = `style="color: #131415; font-size: 18px; text-align: left; font-constiant: small-caps; font-family: Times, serif; margin-bottom: 2px;"`;
    const substyle   = 'style="font-size: 11px; line-height: 13px; margin-top: -2px; font-style: italic;"';
    const breaks     = `style="border-color:${purple}; margin: 5px 2px;"`;
    const label      = `style="color: #c9c9c9; display:inline-block; width: 50%"`;
    const label2     = `style="color: #c9c9c9; display:inline-block; width: 32%"`;
    const centered   = `style="text-align:center;"`;
    const version    = '1';

    const handleInput = (msg) => {
        const args = msg.content.split(" --");
        if (msg.type !== "api") { return; }
        log(args);
        if (args[0] === "!handout") {
            switch(args[1]) {
                case 'links':
                    linksHandout();
                    break;
                default :
                     apiMenu();
                     break;
            };
        } else if (args[0] === "!token") {
            if (args[1] === 'link' && msg.selected != undefined) {
                const supportedSystems =["dd"];
                const system           = args[2];
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
            `<div style="text-align:center;"><a ${astyle2}" href="!handout --links">Handout of Links</a></div>` +
            `<div ${centered}>Creates or updates a handout for linking to other journal items.</div>` +
            `<hr ${breaks} />` +
            `<div ${centered}><strong>Tokens Commands</strong></div>` +
            `<div style="text-align:center;"><a ${astyle2}" href="!token --link --dd">D&D NPC Linker</a></div>` +
            `<div ${centered}>Tokens must be linked to a character sheet.</div>` +
            '</div>'
        );
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
            const represents = getTokenRepresents(token);
            const characterID = getIDsFromTokens(token);
            const characterName = getAttrByName([characterID], 'character_name');
            const prefix        = `<div><span style="color:${purple};font-weight:bold;">`
            const tokenID       = JSON.stringify(token).split(`_id":"`)[1].split(`","`)[0];
            let mods            = {}; 
            let string          = "";

            if (represents[0] != "") {
                if (system === "dd") {
                    const hp   = getAttrByName([characterID], 'hp', "max");
                    const ac   = getAttrByName([characterID], 'npc_ac', "current");
                    const link = getCharacterAttr(characterID, `npc_ac`);

                    if (hp) { mods.bar1_value     = parseInt(hp) };
                    if (hp) { mods.bar1_max       = parseInt(hp) };
                    if (ac) { mods.bar2_value     = parseInt(ac) };
                    if (link[0]) { mods.bar2_link = link[0].id };
                    mods.showname   = true;

                    string += `<div ${centered}><strong>${characterName}</strong></div><hr ${breaks} />`;
                    string += (hp) ? `${prefix} HP / HP_Max:</span> ${mods.bar1_value} / ${mods.bar1_max}</div>` : `${prefix} HP / HP_Max:</span> 'hp_max' value not found. Set the value on the NPC sheet.</div>`;
                    string += (ac) ? `${prefix} AC:</span> ${mods.bar2_value}</div>` : `${prefix} AC:</span> 'npc_ac' value not found. Set the value on the NPC sheet.</div>`;
                    string += (link[0]) ? `${prefix} Link Bar 2:</span> 'npc_ac'</div>` : `${prefix} Link Bar 2:</span> 'npc_ac' attribute not found</div>`;
                    string += `${prefix} Show Name:</span> ${mods.showname}</div>`
                } else {
                    string += `<div ${centered}><strong>Finished (System Not Supported)</strong></div>`
                };

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
            }
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

    //Get the Character's Attribute
    getCharacterAttr = (characterID, name) => {
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
