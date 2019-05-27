var handoutFormatter = handoutFormatter || (function() {
    'use strict';
    const blue       = '#063e62';
    const gold       = '#b49e67';
    const red        = `#8f1313`;
    const divstyle   = 'style="color: #eee;width: 90%; border: 1px solid black; background-color: #131415; padding: 5px;"';
    const astyle1    = `'style="text-align:center; border: 1px solid black; margin: 1px; padding: 2px; background-color: ${blue}; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 100px;`;
    const astyle2    = `style="text-align:center; border: 1px solid black; margin: 3px; padding: 2px; background-color: ${blue}; border-radius: 4px;  box-shadow: 1px 1px 1px #707070; width: 150px;`;
    const arrowstyle = `style="border: none; border-top: 3px solid transparent; border-bottom: 3px solid transparent; border-left: 195px solid ${gold}; margin: 5px 0px;"`;
    const headstyle  = `style="color: #fff; font-size: 18px; text-align: left; font-constiant: small-caps; font-family: Times, serif; margin-bottom: 2px;"`;
    const substyle   = 'style="font-size: 11px; line-height: 13px; margin-top: -2px; font-style: italic;"';
    const breaks     = `style="border-color:${gold}; margin: 5px 2px;"`;
    const label      = `style="color: #c9c9c9; display:inline-block; width: 50%"`;
    const label2     = `style="color: #c9c9c9; display:inline-block; width: 32%"`;
    const version    = '1.1';

    const handleInput = (msg) => {
        const args = msg.content.split(" --");
        if (msg.type !== "api") { return; }
        log(args);
        if (args[0] === "!handout") {
            switch(args[1]) {
                case 'create':
                    createHandout();
                    break;
                default :
                     apiMenu();
                     break;
            };
        } else if (args[0] === "!token") {
            if (args[1] === 'link' && msg.selected != undefined) {
                linkTokens(msg.selected);
            } else {
                sendChat('Module Helper', '/w gm <div ' + divstyle + '>' +
                    `<div ${headstyle}>Module Helper</div>` +
                    `<div ${substyle}>Menu (v.${version})</div>` +
                    '<div ' + arrowstyle + '></div>' +
                    `<div style="text-align:center;">No tokens selected.</div>` +
                    '</div>'
                );
            }
        };
    },

    apiMenu = () => {
        sendChat('Module Helper', '/w gm <div ' + divstyle + '>' +
            `<div ${headstyle}>Module Helper</div>` +
            `<div ${substyle}>Menu (v.${version})</div>` +
            '<div ' + arrowstyle + '></div>' +
            `<div style="text-align:center;"><a ${astyle2}" href="!handout --create">Create/Update Handouts</a></div>` +
            `<hr ${breaks} />` +
            `<div style="text-align:center;"><a ${astyle2}" href="!token --link">Link Tokens</a></div>` +
            `<hr ${breaks} />` +
            '</div>'
        );
    },
/*
    <h1 style="text-align:center;"></h1><br><i style="text-align:center;"></i><hr>
    <p style="margin-left: 25px"></p>
    <blockquote><i></i></blockquote>
    <hr><h2></h2>

    <table class="table table-bordered">
        <thead>
            <tr>
                <th>1d12</th>
                <th>Color</th>
                <th>Similar to Potion of...</th>
            </tr>
            <tr>
            </tr>
        </thead> 
        <tbody>
            <tr>
                <td>
                </td>
            </tr>
        </tbody>   
    </table> 
*/

    createHandout = () => {
        const handoutText = 
        {data: [ 
            {
                name: "Mini-Dungeon Monthly - March '19",
                text:`
                    <h1 style="text-align:center;">Mini-Dungeon Monthly - March '19</h1><hr>
                    <h2>Contents</h2>
                    <h3>[Considering Bees]</h3>
                    <p style="margin-left: 25px"><i>An adventure for four characters of 2nd level by Thomas Baumbach.</i></p>
                    <h3>[Umbravania: The Tirade of Doctor Livingstone]</h3>
                    <p style="margin-left: 25px"><i>An adventure for four characters of 2nd level by Thomas Baumbach.</i></p>
                    <h3>[Roots of Yggdrasil]</h3>
                    <p style="margin-left: 25px"><i>An adventure for four characters of 5th to 8th level by Jonathan G. Nelson.</i></p>
                    <h3>[Malice on Jade Mountain]</h3>
                    <p style="margin-left: 25px"><i>An adventure for four characters of 10th to 12th level by Jonathan G. Nelson.</i></p>
                    <h3>[Carnival of the Clown King]</h3>
                    <p style="margin-left: 25px"><i>An adventure for any number of characters of any level by Justin Andrew Mason.</i></p>
                    <hr>
                    <h2>Credits</h2>
                    <u>Cartography</u><br>Justin Andrew Mason<br><br>
                    <u>Art</u><br>Mates Laurentiu<br><br>
                    <u>Layout</u><br>Thomas Baumbach<br><br>
                    <u>Editing</u><br>Endzeitgeist Sigurðr<br><br>
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
                    name: "Carnival of the Clown King",
                    text: `<h1 style="text-align:center;">Carnival of the Clown King</h1>
                    <div style="text-align:center;"><i>i style="text-align:center;">An adventure for any number of characters of any level by Justin Andrew Mason.</i></div><hr>
                    The party has been hired to escort a merchant caravan through a mountain pass. The narrow ravine is dwarfed on either side by towering cliffs, and despite rumors of a bandit chokepoint, it is the only route for the caravan to traverse.<br><br>
                    This adventure is scaled for difficulty based on the level of the characters. The <b>[goblin]s</b> in this adventure were born in servitude, and trained as carnival performers. They escaped when the Clown King, Bigz (<b>[ogre chieftain]</b>), slaughtered the ringmasters and led his goblin friends to freedom in the mountains.<br><br>
                    <b><i>[Goblin]s.</i></b> If the characters are levels 1-5, then there are 20 goblins in the troupe; 50 goblins for levels 6-10, and 75 goblins for levels 11+.<hr>
                    <h2>1. Dancing Dead</h2> As the group nears the mountain pass, the steep ascent on either side forces the caravan to maintain a linear configuration. On either side of the narrow entrance two rotting human corpses have been suspended against the cliffs. Each pair is posed as a dancing couple.<hr>
                    <h2>2. Special Delivery</h2> As the caravan nears the pass entrance, a figure dives off a cliff edge nearly five hundred feet high. As it falls, a pyramidal parachute deploys and it begins to glide directly towards the caravan.<br><br>
                        The base-jumping figure lands a stretch ahead of the adventurers, releasing the cords from its parachute. It is a gnarly and an aged goblin sporting a knee-length, silvery fu manchu.<br><br>
                        Speaking in broken common, the goblin says:<blockquote><i> “Hail trav’lerz! I’ze Smallz, first hand ofz the Clown King, Bigz. Youz be’n robbed, but if you leavez da wagons, wez let you pass a’livin.”</i></blockquote>
                        He finishes with a friendly gesture towards the pass.<br><br>
                        If the characters do anything other than agree, Smallz will attempt to throw two explosive vials he is holding at or near the front wagon before fleeing.<br><br>
                        <p style="margin-left: 25px"><b>Explosive Vials.</b> <i>Ranged Weapon Attack:</i> +4 to hit; range 30/60 ft., one target. <i>Hit:</i> 1 (1d2) slashing damage. Additionally, the vial detonates, and all targets within a 30-ft.-sphere must succeed on a DC 10 [levels 1-5], DC 15 [levels 6-10] or DC 18 [levels 11+] Dexterity saving throw or take 10 (3d6) points of fire damage, or half as much on a successful save.</p><br>
                        Otherwise, they are allowed to enter the pass, but are still attacked later.<hr>
                    <h2>Colorful Run</h2> 
                        As the adventurers traverse the pass, they notice dozens of <b>[goblin]s</b> watching their advance from the cliffs 100 ft. above the road. When the caravan reaches this narrowest point, a hailstorm of sling stones plummets down from above.<br><br>
                        Each exposed creature is subject to 2 sling attacks from the goblins above, which are made with disadvantage:<br><br>
                         <p style="margin-left: 25px"><b>Sling.</b> <i>Ranged Weapon Attack:</i> +4 to hit, range 30/120 ft., one target. <i>Hit:</i> 2 (1d4) bludgeoning damage. The sling stones have all been brightly painted with festive face designs.</p><br><br>
                         The maximum number of goblin attacks is equal to half of the troupe size.<hr>
                    <h2>4. Roly-Poly Goblins</h2> 
                        Suddenly, several large leather patchwork spheres roll down the reclined cliffs. The balls come to rest, blocking the roadway, and the top halves pop off. From each rises a <b>[goblin]</b> armed with a sling and six small acid-filled glass bullets. As Sling attack above, save that the attacks are not made with disadvantage, and the bullets shatter upon impact, dealing an additional 2 (1d4) acid damage on a hit. After unloading their bullets, the goblins charge into combat wielding scimitars. The number of these roly-poly goblins is equal to one fourth the size of the troupe.<hr>
                    <h2>Bobbing Goblis</h2>
                        As the caravan continues, ropes are slung from one cliff to the other, forming a makeshift web overhead. <b>[Goblin]s</b>, secured by elastic sinew cords, dive off the cliffs. The cords allow them to plummet to mere feet above the ground before bouncing them back up towards the supporting web latticework where they will plummet and attack again the following round. If a goblin’s attack misses its target, the target may use its reaction to make an opportunity attack against the goblin. A successful attack that deals acid, fire, piercing, or slashing damage will also sever the goblin’s cord, leaving it prone. The number of bobbing goblins is equal to one fourth the size of the troupe.<hr>
                    <h2>King of Clowns</h2>
                        Nearing the exit of the pass, a massive figure obstructs the road: an extremely large and bulbously fat <b>[ogre chieftain]</b> dressed entirely in clown regalia. His face is brightly painted, and he wears an oversized papier-mâché crown. The Clown King, Bigz, and all remaining <b>[goblin]s</b> advance upon the characters.<br><br>
                        In addition to individual monster treasure, if the cliffs are searched, the characters will find several large stashes of common trade goods with a total market value of 1,000 gp, + 25 gp for each goblin in the troupe.
                    `
                },{
                    name: "Malice on Jade Mountain",
                    text: `<h1 style="text-align:center;">Malice on Jade Mountain</h1><br>
                    <div style="text-align:center;"><i>An adventure for four characters of 10th to 12th level by Jonathan G. Nelson.</i></div><hr>
                    One-thousand years ago, the tunnels of Jade Mountain were used to mine the namesake stone. Once dark, fraught with danger, and frequented by accidental death and murder, haunted spirits now cling to the area. After the mines closed, Ynis, a wealthy, yet incredibly spiritual elven cleric came from the nearby province on a pilgrimage and had what she thought was a vision (actually a ghost). She took this as a sign from her goddess and came to construct a lavish compound, bringing many from her province.<br><br>
                    Just moments before the party arrives, a mining pick is discovered by Ynis under some rocks outside the cave and brought inside, causing the spirits of the slain to awaken (see Areas 5, 6, 7). This cursed mining pick was used long ago by a horrific and unsavory individual who murdered many in cold blood.<br><br>
                    <i>Curse of the Slain.</i> Until this curse is lifted, all living beings roll a d4 and subtract the result from all saving throws in the complex.<hr>
                    <b>1.</b> Two fires burn brightly in this room. There are nine pillars here, each of which has a word carved upon it in elvish. These words combine to form a riddle, the answer of which must be given in order to enter either of the double doors to the west. “A push with no arms, whistle with no breath.” Answer: Wind <hr>
                    <b>2.</b> Ynis, the elven priest kneels before the fire in this room, praying to her goddess. She will welcome the characters into the temple so long as they do no harm. The cursed mining pick rests upon the grey stones surrounding the fire. If touched by a character, they will feel uneasy and have disadvantage on all rolls made within the dungeon. If the mining pick is carried by a character, they have to succeed on a DC 20 Wisdom saving throw every 1d6 rounds or be affected by <i>confusion</i> until the pick is dropped. Ynis is immune to the effects of the pick thanks to the protection of her goddess, but remains praying in this location or cowering with the worshipers in Area 3.<hr>
                    <b>3.</b> A group of 20 worshippers cower here and are completely vulnerable to attacks from roaming undead. Treat each worshipper as AC 10, hp 1, no attacks. Each character will obtain 50 XP per worshiper that survives the module.<hr>
                    <b>4.</b> This room has the temple’s treasure stores. The door is magically locked and can only be opened by answering the riddle carved in elvish “Many ask for me, but when I’m given, most don’t take me”. Answer: Advice. Inside the room are hundreds of religious manuscripts worth over 2,500 gp to any major temple, and two chests filled with gold and gems totaling over 4,500 gp in value. This treasure is the property of a good- aligned religion/church.<hr>
                    <b>5.</b> This door is locked and requires a successful DC 16 Dexterity (thieves’ tools) check to unlock. Originally thought to be statues, the three monuments are actually upright sarcophagi, and each of these holds a mummy lord. One <b>[mummy lord]</b> is released the moment the priest first carries the mining pick into Area 2, which also coincides with the party entering Area 1. The first mummy lord breaks down the room’s door in 1d4+4 rounds (pounding can be heard throughout the temple) and will attack and kill all living beings on sight, continuing this activity in a random direction. <b>Roll 1d4, 1: N, 2: S, 3: E, 4: W</b>. The next two mummy lords do the same once the previous lord has been slain. Once the final mummy lord is killed, maniacal laughter will be heard in Area 7.<hr>
                    <b>6.</b> Once the mining pick enters the room, three <b>[ghost]s</b> float through the wall and two <b>[ghast]s</b> push out old stones and emerge from embedded space within the walls. <b>Roll 1d10, 1-2: undead remain here, 3-4: Roam N, 5-6: Roam N & E, 7-8: Roam W, 9-10: Roam W & N</b>.<hr>
                    <b>7.</b> This room contains different undead each time it is entered. The undead rejuvenate if destroyed within one hour. Roll 1d4. 1 = three <b>[ghost]s</b>, two <b>[ghast]s</b>, 2 = three <b>[revenant]s</b>, 3 = two <b>[wraith]s</b>, two <b>[ghost]s</b>, two <b>[ghast]</b>s, 4 = six </b>[banshee]s</b>. The skeleton of the murderer is embedded in the wall of this room behind some loose stones which are spotted with a DC 18 (or DC 12 if laughter has started) Wisdom (Perception) or Intelligence (Investigation) check. If the skeleton and the associated cursed mining pick are removed from the complex, or destroyed entirely (by striking the bones with the pick), the curse will be lifted, all undead crumble to dust, and the characters obtain 1,000 XP each, as well as the praise and endorsement of the church.
                   `
                },{
                    name: "Roots of Yggdrasil",
                    text: `<h1 style="text-align:center;">Roots of Yggdrasil</h1><br>
                    <div style="text-align:center;"><i>An adventure for four characters of 5th to 8th level by Jonathan G. Nelson.</i></div><hr>
                        The Yggdrasil, a tree so immense that its trunk crosses planar boundaries, roots so deep, they bury themselves in the fog-filled realm of Niflheim. The roots of Yggdrasil are eternally gnawed by the great wyrm Níðhöggr and her voracious offspring.<br><br>
                        <i>Plot Hook.</i> A person important to the party has been kidnapped and is being held deep in the roots of Yggdrasil.<br><br>
                        Entering the roots of Yggdrasil is no easy task as the great wyrm Níðhöggr gnaws a huge section of the roots, thus creating entrances similar to caves. Adventurers will have to come up with a foolproof plan in order to sneak past (with a successful DC 15 Dexterity (Stealth) check) and enter these natural root caves. 
                        <i>Respect your Roots.</i> Dryads fervently protect the roots of Yggdrasil, should the party cause any harm to the roots 1d4+4 <b>[dryads]</b> will show up and attack the party. The dryads can traverse the roots just like individual trees by using their Tree Stride feature. If the GM wants to increase the challenge, they may add 1d2 <b>[green hag]s</b> and 1d4 <b>[twig blight]s</b>.<hr><b>1. Hole in the Roots.</b> The strong smell of earth assaults one's senses. Four shriekers scream out as the group enters. One wood woad stands guard just inside the entrance and won’t allow anyone to pass. A character who reveres nature may make a successful DC 15 Charisma (Persuasion) check and obtain entry for the party. If the party attempts to force their way in, the <b>[wood woad]</b> will attack and 1d4+2 <b>[twig blight]s</b> will attack the party from behind. The wood woad treats the roots as individual trees when using its <i>Tree Stride</i> feature.<hr>
                        <b>2. Engulfed Roots.</b> Roots dangle from the ceiling here; a successful DC 18 Intelligence (Nature) or DC 15 Intelligence (Investigation) check reveals the roots are actually some kind of creature, the wandering roots of Yggdrasil (<b>[shambling mound]</b>). If the creature is not detected, it drops directly onto a random member of the party (roll 1d4), who must succeed on a DC 20 Dexterity saving throw or be grappled and affected by its <i>Engulf</i> feature. If a greater challenge is needed, 1d4 <b>[vine blight]s</b> may emerge from nearby passages and attack the party.<hr>
                        <b>3. Dead Ends.</b> The entrance to each of the dead ends in this area has one <b>[piercer]</b> hiding above, waiting for prey to fall upon. At the end of each root passage is a small pool of liquid. If consumed by a party member or enemy (occupants know of the beneficial effects), they are affected as if drinking one of the following magic potions. Only one liquid may be in effect per target at any given time, and each pool only has enough doses for a single target. If the liquid is bottled or otherwise transported, it becomes normal water.<br><br>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>1d12</th>
                                    <th>Color</th>
                                    <th>Similar to Potion of...</th>
                                </tr>
                            </thead> 
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Brown, silver, and grey layers</td>
                                    <td style="font-style:italic;">Climbing</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Red, glimmering</td>
                                    <td style="font-style:italic;">Healing</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Red, glimmering</td>
                                    <td style="font-style:italic;">Greater Healing</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Red, glimmering</td>
                                    <td style="font-style:italic;">Superior Healing</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Yellow</td>
                                    <td style="font-style:italic;">Clairvoyance</td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>Red with tiny beads of silver</td>
                                    <td style="font-style:italic;">Diminution</td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>Blue, bubbles and steams as if hot</td>
                                    <td style="font-style:italic;">Heroism</td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>Purple with streaks of pink</td>
                                    <td style="font-style:italic;">Mind Reading</td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>Clear with cloudy white impurities</td>
                                    <td style="font-style:italic;">Flying</td>
                                </tr>
                                <tr>
                                    <td>10</td>
                                    <td>Amber</td>
                                    <td style="font-style:italic;">Longevity</td>
                                </tr>
                                <tr>
                                    <td>11</td>
                                    <td>Yellow with black swirls</td>
                                    <td style="font-style:italic;">Speed</td>
                                </tr>
                                <tr>
                                    <td>12</td>
                                    <td>Crimson</td>
                                    <td style="font-style:italic;">Vitality</td>
                                </tr>
                            </tbody>   
                        </table>
                        <hr>
                        <b>4. Root Randomness.</b> Roll 1d4 each time the party passes this spot. 1= 1d2 [wood woads], 2 = 1d2 <b>[green hag]s</b>, 3 = one <b>[earth elemental]</b>, 4 = one <b>[wood woad]</b> & one <b>[green hag]</b>.<hr>
                        <b>5. Slaves for Styx.</b> A <b>[mezzoloth]</b> entered the roots through a two- way gate in order to gather new slaves for her ship on the River Styx. As soon as she sees or hears the party coming, she casts <i>darkness</i> followed by <i>cloudkill</i>, after which she moves in and attempts to overpower the weakest character and drag them down a dead-end passage, through a gate to her ship on the River Styx.<hr>
                        <b>6. Portal to Olympus.</b> A shimmering two-way permanent portal here leads to the plane of Olympus.<hr>
                        <b>7. The Kidnapper.</b> The kidnapper awaits the arrival of the party here. As a GM you may use an existing enemy of the party or a <b>[drow priestess]</b> or <b>[blackguard]</b>.<br><br>
                        <i>Treasure.</i> The enemy has 1d4 magic items or potions, left up to the GM.
                    `
                },{
                    name: "Umbravania: The Tirade of Doctor Livingstone",
                    text: `<h1 style="text-align:center;">Umbravania: The Tirade of Doctor Livingstone</h1><br>
                    <div style="text-align:center;"><i>An adventure for four characters of 2nd level by Thomas Baumbach.</i></div><hr>
                    The graveyards in Darkbriar are being harvested for corpses. The adventurers have been hired to stop the culprit. <br><br>
                    The bodies are being stolen for the mad scientist, Dr. Livingstone who occupies a dilapidated hilltop mansion near the city. The remains are used in his experiments to create animated living-dead servants.<br><br>When staking out a graveyard, two humanoids digging up a grave are discovered; two of Dr. Livingstone’s <b>[golomous prototypes]</b>. One attacks, the other flees to the mansion.
                    <h2>Golomous Creations of Dr. Livingstone</h2>All three types of golomous creations are treated as modified flesh golems sans damage immunities.<br><br>The blood of the creatures has been replaced by a glowing green fluid which is pumped by mechanical hearts that require daily charging. Protruding wires and tubing hint that their animation is scientific rather than arcane in nature. They have the following feature:<br><br>
                    <p style="margin-left: 25px"><b>Hyperstate.</b> On the turn after a golomous creation has taken a total of 10 or more damage, its mechanical heart releases adrenaline, and it enters a hyperstate. This increases the golomous creation’s Strength and Dexterity score by 5 each for one hour, but also doubles all damage the golomous creation takes. Once used, the adrenaline injector in the breast needs to be refilled before the golomous creation can enter hyperstate again. </p><br>
                    <h3>Golomous Hounds</h3>Treat as a <b>[lesser flesh golem]</b> with 12 hp without Multiattack and a single Bite instead of a Slam attack.<br><br>
                    <p style="margin-left: 25px"><b>Bite.</b> <i>Melee Weapon Attack:</i> +5 to hit, reach ft., one target. <i>Hit:</i> 8 (2d4 + 3) piercing damage.</p><br><br>Early experiments, they are made up of parts from various breeds of attack dogs.<br><h3>Golomous Prototype</h3><br>Treat as a <b>[lesser flesh golem]</b> with 25 hp. The groundwork for humanoids, prototypes are an amalgam of parts from various races and genders.<br><br><h3>Golomous Masterpiece</h3>Treat as a <b>[flesh golem]</b>. The first fully cognitive creature Dr. Livingstone has created. Her body was fashioned from the remains of identical twin sisters whose memories have merged to create a unique personality. She is unwilling to do the doctor’s bidding.<hr>
                    <h2>Livingstone Mansion</h2>The mansion is in disrepair and the windows have been boarded. The interior is illuminated by electric incandescent bulbs.<br><br>When the adventurers arrive at the mansion a dozen glowing green eyes glare from the shadows as five <b>[golomous hound]s</b> attack.<blockquote><i>The wind begins to pick up followed by dark rolling clouds in the sky and the distant rumble of thunder.</i></blockquote><b>#1. </b>A large double door provides entry. Inside the adventures are greeted with the sickening aroma of rotting flesh and cankered blood.<blockquote><i>A downpour of rain begins outside.</i></blockquote><hr><b>#2. </b>An open-air courtyard encircled within the mansion. A fountain is filled with algae-tainted water that dances as rain plummets down from above.<blockquote><i>There is a blindingly bright flash accompanied by a loud crackle of thunder.</i></blockquote><hr>
                    <b>#3 & #4. </b> Whatever purpose these rooms once served, they now house refuse and scattered coffins. Various body parts litter the floor and swarms of flies buzz about.<blockquote><i>The roar of rain becomes louder. Lighting erratically flashes and the floor trembles from thunder.</i></blockquote><hr>
                    <b>Rooms A-H. </b>Each room contains two occupied charging bays for prototypes and a machine with two switches. One switch is numbered 3/9. The other is labeled 6/9.The sum of the switch settings determines how much electricity is being drawn from the battery in room #5 and channeled into the bays. If the total of both switches is more than 10, then the prototypes are awake and attack if they see the party. If changed from below 10 to above 10, the bulbs in the room dim. To determine the default settings of a room roll 1d4 for each switch. 1-2 = low number, 3-4 = high number.<hr>
                    <b>#5. </b>Spring-sealed iron doors can be pried open with a combined Strength of 20. Inside is a laboratory, a battery that seems to be harnessing lightning strikes to charge, and a crystalline tube filled with glowing green fluid which suspends a <b>[golomous masterpiece]</b>. The <b>[doctor]</b> scorns the creature for being too willful, and sates that he will “adjust” her behavior. He throws a switch which causes the masterpiece within to writhe in agony as she is electrocuted. When the doctor notices the party, he grabs his electroshot, a coil- mounted crossbow, and begins shooting.<br><br>
                    <p style="margin-left: 25px"><b>Electroshot.</b><i>Ranged Weapon Attack:</i> +2 to hit, range 30/60 ft., one target. <i>Hit:</i> 7 (2d6) lightning damage. If the target is a creature, it must succeed on a DC 20 Constitution saving throw. On a failure, the target is stunned for 1d4 rounds. The electroshot has 6 charges and each shot consumes 1 charge.</p><br>If 5 or more of the machines in Rooms A-H have their switches set to 9, then the battery is drained before the shock treatment drives the masterpiece insane. When released she will become a potential ally. However, if the battery is not drained, the shock treatment drives her insane and she busts from the glass tube and attacks.<br><br>
                    Six syringes of adrenaline can be found on the tables. In addition to refilling a golomous creation, an adrenaline syringe can be injected with a DC 10 Wisdom (Medicine) check into the heart of a living target who has failed their final Death saving throw to gain one extra chance.`
                }, {
                    name: "Considering Bees",
                    text: `<h1 style="text-align:center;">Considering Bees</h1><br>
                    <div style="text-align:center;"><i>An adventure for four characters of 2nd level by Thomas Baumbach.</i></div><hr>
                    Meixiu the Honey Queen was known far and wide to have the sweetest honey in all the empire. The Emperor himself would visit her village to purchase honey, and spend an afternoon with the widow. When the Emperor passed, Meixiu’s villa displayed a white banner, even long after the new boy Emperor had been crowned.<br><br> 
                    Though the placid boy took no notice of the slight, his advisors did. And knowing the influence a secret lover of the former Emperor might wield, they took action. Before long, Meixiu was found dead, seemingly from mishandling her bees.<br><br>
                    Weeks later, the hillside village near Meixiu’s home is now abandoned, from swarms of bees having chased out the inhabitants. Meixiu’s bees, it appears, have gone feral. The boy Emperor has put out a call: Enter the cave where Meixiu kept her bees and burn out the hive. Those responsible for clearing out this pestilence will receive the Emperor’s favor, along with two hundred gold dragons.<hr>
                    <h2>1. A New Hive</h2>
                        <blockquote><i>The walls of this cave are covered in new-made hives, buzzing with activity.</i></blockquote>
                        Entering this room earns the ire of this <b>[swarm of bees]</b>, who’ve never known the care of a beekeeper.<hr>
                    <h2>2. Shrine to Wai’du</h2>
                        <blockquote><i>Meixiu kept a shrine to the former Emperor here, complete with charcoal portrait, candles, and incense.</i></blockquote>
                        Burning the incense pacifies a swarm of angry bees.<hr>
                    <h2>3. Potting Room</h2>
                        <blockquote><i>Rows of stacked and sealed clay pots fill this chamber. Curiously, a number of bees work together to drag a honeycomb into a jar.</i></blockquote>
                        A character who succeeds on a DC 10 Intelligence (Investigation) check discovers that Meixiu once carefully harvested her bees’ honey here. Now, it seems the bees have continued her process of placing entire honeycombs in oblong pots and sealing them with wax. The pots are carefully stacked along the walls. Few empty pots remain. If the heroes disturb the pots, the few lingering bees in this room coalesce into a <b>[swarm]</b> with half hit points.<hr>
                    <h2>4. Hive Chamber</h2> 
                        A successful DC 5 Intelligence (Investigation) check reveals why Meixiu kept her bees in a cave.
                        <blockquote><i>This room, deep within the hillside, is protected from cold weather, yet tiny pockholes allow the bees to enter and exit the cave from above, granting them access to the entire hillside unobstructed. Hive boxes of white bamboo sit in neat rows, filling the room. The hives within have grown wild, spilling out of the boxes, in some cases linking together to form enormous hives. The echo of thousands of buzzing bees reverberates in through the chamber. Several extraordinarily large bees emerge from the conglomeratic hives.</i></blockquote>
                        Three giant bees (as <b>[giant wasps]</b>) move quickly to attack the heroes. As long as the heroes inflict no damage to the hive itself, the other bees here continue to work, ignoring the fight. However, should the hives take damage, a <b>[bee swarm]</b> with maximum hit points forms here. <br>Careful and intrepid characters can collect three jars of royal jelly here with a successful DC 16 Dexterity check. On a failure, the bees consider their hive threatened, as above. Royal jelly works as a <i>[potion of healing]</i>.<hr>
                    <h2>5. Hive Box Storage</h2><blockquote><i> Hive boxes in various stages of disrepair are stacked against the walls here. Only a few bees buzz in this circular chamber.</i></blockquote>Handfuls of bees have begun to use these boxes for their hives, but no swarm forms here if the boxes are disturbed. Instead, a character disturbing these small hives must succeed on a DC 10 Charisma saving throw, taking 1 (1d2) piercing damage on a failure, as the bees express their displeasure at the rough intrusion.<hr>
                    <h2>6. The Queen's Chamber</h2>
                        <blockquote><i>This unadorned room has a sleeping mat and lantern on the floor. An aged woman sits on a stool, contemplating a bee as it dances across her fingers. “The hive has grown strong, has it not? It shall grow stronger still! And the boy who did this will pay!” With that, a swarm of bees pours from Meixiu’s mouth.</i></blockquote>
                        The <b>[swarm of bees]</b> she conjures has only half hit points. Meixiu fights as a <b>[cult fanatic]</b>, with a katana [4 (1d8) slashing damage] in place of a dagger. Additionally, Meixiu has no spellcasting, but instead has this reaction: <b>Swarm Form.</b> As a reaction to taking damage, Meixiu can assume the form of a fully healed swarm of bees with maximum hit points. If the swarm is defeated, she reforms in her humanoid form, retaining her hit points prior to transformation into a swarm. Meixiu can use this feature again after she completes a short or long rest.`
                }
            ]
        };

        const handoutObjects = findObjs({
            _type: 'handout'
        });

        const newHandout = handoutText.data;
        newHandout.forEach((data) => {
            const string = JSON.stringify(data.name);
            if (JSON.stringify(handoutObjects).includes(data.name)) {
                const existingHandout = findObjs({
                    name: `${data.name}`
                });
                const id = JSON.stringify(existingHandout).split(`_id":"`)[1].split(`","`)[0];
                const handout = getObj("handout", id);
                handout.set('gmnotes', data.text);

                log("ID: " + JSON.stringify(id)); 
                log("handout: " + JSON.stringify(handout));
            } else {
                const handout = createObj('handout', {
                    name: data.name
                }); 
                handout.set('gmnotes', data.text);
            };
        });
    },

//This needs to look at a token's linked character sheet. 
    linkTokens = (selected) => {
        selected.forEach((token) => {
            const tokenID = JSON.stringify(token).split(`_id":"`)[1].split(`","`)[0];
            const characterID = getIDsFromTokens(token);
            const hp = getAttrByName([characterID], 'hp', "max");
            const ac = getAttrByName([characterID], 'ac', "current");
            let mods = {}; 

            mods.bar1_value = hp;
            mods.bar1_max = hp;
            mods.bar2_value = ac;
            mods.showname = true;

            log("Token ID: " + JSON.stringify(tokenID) + "," + "Character ID: " + JSON.stringify(characterID));
            log("Mods: " + JSON.stringify(mods)); 

            const tokenGet = getObj("graphic", tokenID);
            const repChar = getObj('character', characterID);

            if (mods) {
                tokenGet.set(mods);
                setDefaultTokenForCharacter(repChar,tokenGet);
            } else {
                log("Mods not found"); 
            }

            sendChat('Module Helper', '/w gm <div ' + divstyle + '>' +
                `<div ${headstyle}>Module Helper</div>` +
                `<div ${substyle}>Menu (v.${version})</div>` +
                '<div ' + arrowstyle + '></div>' +
                `<div style="text-align:center;">HP / HP_Max: ${mods.bar1_value} / ${mods.bar1_max = hp}</div>` +
                `<div style="text-align:center;">AC: ${mods.bar2_value}</div>` +
                `<div style="text-align:center;">Show Name: ${mods.showname}</div>` +
                '</div>'
            );
        });
    },

    //Used to get character attributes for Linking Tokens
    getIDsFromTokens = (selectedToken) => {
        return [selectedToken].map(obj => getObj("graphic", obj._id))
            .filter(x => !!x)
            .map(token => token.get("represents"))
            .filter(id => getObj("character", id || ""));
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