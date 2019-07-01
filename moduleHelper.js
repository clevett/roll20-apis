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
                    <h3>[The Dirge of Centre Street]</h3>
                    <p style="margin-left: 25px"><i>An adventure for four to six characters of 1st to 3rd level by Thilo Graf</i></p>
                    <h3>[A Race Against Time]</h3>
                    <p style="margin-left: 25px"><i>An adventure for four to five characters of 10th-11th level by Stephen Yeardley</i></p>
                    <h3>[Behold a Sea of Stars]</h3>
                    <p style="margin-left: 25px"><i>An adventure for four to five characters of 15th level by Justin Andrew Mason</i></p>
                    <hr>
                    <h2>Credits</h2>
                    <u>Cartography</u><br>Justin Andrew Mason<br><br>
                    <u>Art</u><br>Mates Laurentiu<br><br>
                    <u>Layout</u><br>Thomas Baumbach<br><br>
                    <u>Editing</u><br>Jonathan G. Nelson and Thilo Graf<br><br>
                    <u>Publisher</u><br>Jonathan G. Nelson<br><br>
                    <u>Roll20 Conversion</u><br><a href="support@emeraldproductionsllc.com">Emerald Productions, LLC.</a><hr>
                    <b>Product Identity:</b> The following items are hereby identified as Product Identity, as defined in the Open Game License version 1.0a, Section 1(e), and are not Open Content: All trademarks, registered trademarks, proper names (characters, deities, etc.), dialogue, plots, storylines, locations, characters, artwork, and trade dress. (Elements that have previously been designated as Open Game Content or are in the public domain are not included in this declaration.)<br><br>
                    <b>Open Content:</b> Except for material designated as Product Identity (see above), the game mechanics of this AAW Games LLC game product are Open Game Content, as defined in the Open Game License version 1.0a Section 1(d). No portion of this work other than the material designated as Open Game Content may be reproduced in any form without written permission.<br><br>
                    AAW GAMES LLC<br>
                    Jonathan G Nelson<br>
                    PO Box #92 | Snoqualmie, WA 98065<br>
                    © 2019 AAW Game<hr>
                    <h2>Open Gaming License</h2>
                    OPEN GAME LICENSE
                    The following text is the property of Wizards of the Coast, Inc. and is copyright 2000 Wizards of the Coast, Inc (“Wizards”). All Rights Reserved.<br><br>
                    1. Definitions: (a) “Contributors” means the © and/or trademark owners who have contributed Open Game Content; (b) “Derivative Material” means copyrighted material including derivative works and translations (including into other computer languages), potation, modification, correction, addition, extension, upgrade, improvement, compilation, abridgment or other form in which an existing work may be recast, transformed or adapted; (c) “Distribute” means to reproduce, license, rent, lease, sell, broadcast, publicly display, transmit or otherwise distribute; (d) “Open Game Content” means the game mechanic and includes the methods, procedures, processes and routines to the extent such content does not embody the Product Identity and is an enhancement over the prior art and any additional content clearly identified as Open Game Content by the Contributor, and means any work covered by this License, including translations and derivative works under copyright law, but specifically excludes Product Identity. (e) “Product Identity” means product and product line names, logos and identifying marks including trade dress; artifacts, creatures, characters, stories, storylines, plots, thematic elements, dialogue, incidents, language, artwork, symbols, designs, depictions, likenesses, formats, poses, concepts, themes and graphic, photographic and other visual or audio representations; names and descriptions of characters, spells, enchantments, personalities, teams, personas, likenesses and special abilities; places, locations, environments, creatures, equipment, magical or supernatural abilities or effects, logos, symbols, or graphic designs; and any other trademark or registered trademark clearly identified as Product identity by the owner of the Product Identity, and which specifically excludes the Open Game Content; (f) “Trademark” means the logos, names, mark, sign, motto, designs that are used by a Contributor to identify itself or its products or the associated products contributed to the Open Game License by the Contributor (g) “Use”, “Used” or “Using” means to use, Distribute, copy, edit, format, modify, translate and otherwise create Derivative Material of Open Game Content. (h) “You” or “Your” means the licensee in terms of this agreement.<br><br>
                    2. The License: This License applies to any Open Game Content that contains a notice indicating that the Open Game Content may only be Used under and in terms of this License. You must affix such a notice to any Open Game Content that you Use. No terms may be added to or subtracted from this License except as described by the License itself. No other terms or conditions may be applied to any Open Game Content distributed using this License.<br><br>
                    3. Offer and Acceptance: By Using the Open Game Content You indicate Your acceptance of the terms of this License.<br><br>
                    4. Grant and Consideration: In consideration for agreeing to use this License, the Contributors grant You a perpetual, worldwide, royalty- free, non-exclusive license with the exact terms of this License to Use, the Open Game Content.<br><br>
                    5. Representation of Authority to Contribute: If You are contributing original material as Open Game Content, You represent that Your Contributions are Your original creation and/or You have sufficient rights to grant the rights conveyed by this License.<br><br>
                    6. Notice of License Copyright: You must update the COPYRIGHT NOTICE portion of this License to include the exact text of the COPYRIGHT NOTICE of any Open Game Content You are copying, modifying or distributing, and You must add the title, the © date, and the © holder name to the COPYRIGHT NOTICE of any original Open Game Content you Distribute.<br><br>
                    7. Use of Product Identity: You agree not to Use any Product Identity, including as an indication as to compatibility, except as expressly licensed in another, independent Agreement with the owner of each element of that Product Identity. You agree not to indicate compatibility or co-adaptability with any Trademark or Registered Trademark in conjunction with a work containing Open Game Content except as expressly licensed in another, independent Agreement with the owner of such Trademark or Registered Trademark. The use of any Product Identity in Open Game Content does not constitute a challenge to the ownership of that Product Identity. The owner of any Product Identity used in Open Game Content shall retain all rights, title and interest in and to that Product Identity.<br><br>
                    8. Identification: If you distribute Open Game Content You must clearly indicate which portions of the work that you are distributing are Open Game Content.<br><br>
                    9. Updating the License: Wizards or its designated Agents may publish updated versions of this License. You may use any authorized version of this License to copy, modify and distribute any Open Game Content originally distributed under any version of this License.<br><br>
                    10. Copy of this License: You MUST include a copy of this License with every copy of the Open Game Content You distribute.<br><br>
                    11. Use of Contributor Credits: You may not market or advertise the Open Game Content using the name of any Contributor unless You have written permission from the Contributor to do so.<br><br>
                    12. Inability to Comply: If it is impossible for You to comply with any of the terms of this License with respect to some or all of the Open Game Content due to statute, judicial order, or governmental regulation then You may not Use any Open Game Material so affected.<br><br>
                    13. Termination: This License will terminate automatically if You fail to comply with all terms herein and fail to cure such breach within 30 days of becoming aware of the breach. All sublicenses shall survive the termination of this License.<br><br>
                    14. Reformation: If any provision of this License is held to be unenforceable, such provision shall be reformed only to the extent necessary to make it enforceable.<br><br>
                    15. COPYRIGHT NOTICE<br><br>
                    Open Game License v 1.0a, © 2000, Wizards of the Coast, Inc.; .<br><br>
                    System Reference Document 5.1 Copyright 2016, Wizards of the Coast, Inc.; Authors Mike Mearls, Jeremy Crawford, Chris Perkins, Rodney Thompson, Peter Lee, James Wyatt, Robert J. Schwalb, Bruce R. Cordell, Chris Sims, and Steve Townshend, based on original material by E. Gary Gygax and Dave Arneson.<br><br>
                    <i>Mini-Dungeon Monthly</i> ©2019, AAW Games. <br><br> 
                    End of License
                `
            },{
                name: "A Race Against Time",
                text: `<h1 style="text-align: center;">A RACE AGAINST TIME</h1>
                    <p style="text-align: center;"><em>An adventure for four to five characters of 10th-11th level by Stephen Yeardley</em></p>
                    <hr />
                    <p style="text-align: left;"><em>&ldquo;A chronalmental that experimented with a </em><strong>staff of power</strong><em> to produce&nbsp;</em><em>clockwork creatures went too far when imbuing them with spirit, so its peers&nbsp;</em><em>sent it off through time.&rdquo;</em></p>
                    <p style="text-align: left;">Chasing after a band of 10 cultists and a hostage, the party stumbles upon a problem. Energy from a broken staff and the effects of a magic ring are spreading through a time-and-space-shifting laboratory. As it happens, the laboratory is a surprise to the cultists as well.</p>
                    <p style="text-align: left;"><br />In the tunnels and caves, every 30-ft. stretch that isn&rsquo;t in a light patch has a 25% chance of holding a &ldquo;time puddle&rdquo; that changes very minor aspects of a character being to the past or the future, such as undoing belt buckles (backwards), OR feeling hungry (forwards).</p>
                    <hr />
                    <p style="text-align: left;"><br /><span style="text-decoration: underline;">1. CHASE TUNNEL</span></p>
                    <p style="text-align: left;">First light patch: Two lawful evil <strong>cultists</strong> are undergoing a transformation. A successful DC 15 Intelligence (Arcana) check recognizes the additions to be fiendish &ndash; devilish to be precise. Their agony means they have disadvantage on every roll.</p>
                    <p style="text-align: left;">Second patch: The cult leader had transformed into a <strong>bearded devil</strong>, while three others have become <strong>lemures</strong>.</p>
                    <p style="text-align: left;"><br />Third patch: Here, a cultist is coated in hundreds of red-hot mechanical scraps but fused to the floor. She now functions like a <strong>bearded devil.</strong></p>
                    <hr />
                    <p style="text-align: left;"><span style="text-decoration: underline;">2. TRANSFORMATION CAVE</span><br />This cultist has transformed twice &ndash; to a devil, then a <strong>clockwork abomination</strong>. It contains a brand new <em><strong>ioun stone of&nbsp;</strong></em><em><strong>absorption</strong></em> that absorbs spells cast at the construct, but can be recovered.</p>
                    <p style="text-align: left;"><br />In the laboratory (areas 3-7), those starting their turn in a dark gray area must roll on the following table(no save):</p>
                    <table style="height: 98px; margin-left: auto; margin-right: auto;" border="1" width="193">
                    <tbody>
                    <tr>
                    <td style="width: 72px;"><strong>d20</strong></td>
                    <td style="width: 83px;"><strong>Effect</strong></td>
                    </tr>
                    <tr>
                    <td style="width: 72px;">1-9</td>
                    <td style="width: 83px;"><em>haste</em></td>
                    </tr>
                    <tr>
                    <td style="width: 72px;">10-18</td>
                    <td style="width: 83px;"><em>slow</em></td>
                    </tr>
                    <tr>
                    <td style="width: 72px;">19-20</td>
                    <td style="width: 83px;"><em>time stop</em></td>
                    </tr>
                    </tbody>
                    </table>
                    <p style="text-align: left;"><br />All effects last 1 round. If released, the chronalmental uses them to regain hit points.</p>
                    <hr />
                    <p style="text-align: left;"><span style="text-decoration: underline;">3. ENTRANCE BARRIERS</span><br /><em>Magic trap</em>&nbsp;</p>
                    <p style="text-align: left;"><br />Three pairs of pillars visibly pulse with different energies: Those passing between a pair, or walking within 2 feet of one, are affected by a barrier attack, unless they perform the correct gestures before stepping in reach, which are known via an DC 15 Intelligence (Arcana) check.</p>
                    <p style="text-align: left;"><strong>Barrier Attack</strong>. Melee Spell Attack. +8 to hit, reach 10 ft., one target. <em>Hit</em>: The target must succeed on a saving throw or take the damage noted below, or half as much on a successful saving throw.</p>
                    <table style="height: 103px; width: 521.5px; margin-left: auto; margin-right: auto;" border="1">
                    <tbody>
                    <tr>
                    <td style="width: 87px;"><strong>Column</strong></td>
                    <td style="width: 157px;"><strong>Saving Throw</strong></td>
                    <td style="width: 84px;"><strong>DC</strong></td>
                    <td style="width: 167.5px;"><strong>Damage</strong></td>
                    </tr>
                    <tr>
                    <td style="width: 87px;">#1</td>
                    <td style="width: 157px;">Strength</td>
                    <td style="width: 84px;">14</td>
                    <td style="width: 167.5px;">36 (8d8) force</td>
                    </tr>
                    <tr>
                    <td style="width: 87px;">#2</td>
                    <td style="width: 157px;">Dexterity</td>
                    <td style="width: 84px;">16</td>
                    <td style="width: 167.5px;">22 (5d8) lightning</td>
                    </tr>
                    <tr>
                    <td style="width: 87px;">#3</td>
                    <td style="width: 157px;">Constitution</td>
                    <td style="width: 84px;">16</td>
                    <td style="width: 167.5px;">22 (5d8) thunder</td>
                    </tr>
                    </tbody>
                    </table>
                    <p>&nbsp;</p>
                    <hr />
                    <p><span style="text-decoration: underline;">4. SUMMONING ROOM</span><br />The square marked 4 holds a 5-ft.-diameter glowing copper ring that pulses with conjuration energy every 3d6 rounds [a malfunctioning <em>ring of devils</em> (as a <em>ring of djinni summoning&nbsp;</em>but summons a random devil up to a rating of Challenge 11)]. Summoned devils remain for one minute unless they find a mortal to torment. The ring only works in this room.</p>
                    <hr />
                    <p><span style="text-decoration: underline;">5. CONTAINMENT SANCTUARY</span></p>
                    <p>A <strong>chronalmental</strong> stands in the center of the pillars. It holds a broken <strong><em>staff of&nbsp;</em></strong><strong><em>power</em></strong> (that looks whole). If anything passes through the surrounding pillars, the containment is broken. The energy from the broken staff reaches its usual 30-ft.-radius in one round, but uniquely continues to spread an additional 10 ft. per round until the laboratory (areas 3 &ndash; 7) is flooded. The tunnels remain unaffected.</p>
                    <p><br />Once the energy from the staff spreads past the containment space within the pillars, the chronalmental looks to imbue each pair of pillars (area 3) with the spirit of a victim by having the energy from the pillars kill the creature. If all three pairs are fed a spirit within an hour, the door reseals itself and the laboratory returns to its home plane.&nbsp;</p>
                    <hr />
                    <p><span style="text-decoration: underline;">6. RECHARGE ROOM</span><br />Two cultists have continued the transformation process and become <strong>chain devils</strong>. They are trying to get into the area 7. They have yet to master their new forms and go last in every round.&nbsp;</p>
                    <p>On the wall of the west alcove is a schematic to make a <strong>shield guardian</strong>. If a character gathers every bit of rare metal in the laboratory and a makes a successful DC 22 Intelligence (Investigation) check, they can make a guardian and paired amulet.</p>
                    <hr />
                    <p><span style="text-decoration: underline;">7. MATERIALS ROOM</span></p>
                    <p>&nbsp;The hostage, a CG <strong>veteran</strong> named Ka Thulam, has transformed into a clockwork hunter. She is trapped here, supported by the original guardians, two clockwork hounds. If returned somehow to human form, she stays with the party for three adventures.</p>
                    <p>&nbsp;The walls of this room hold hundreds of boxes containing rare metals suitable for making clockwork creatures.&nbsp;</p>`
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
