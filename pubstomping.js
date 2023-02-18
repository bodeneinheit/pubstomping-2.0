//params
//make sure kill, death and streak counters are enabled
const autoLogInOut = false; //true = autologs in and out, false does not
const selectedModes = true; //true = leaves if gamemodes is not in the array below
const gameModes = ["ffa", "shrp", "krank", "depoffa", "chs", "tdm"]; //gamemodes as array
const autoPick = true; // true = autopicks class below - !!autoloading the loadout presets will override this!!
const weaponClass = 0; // pick value from below
const autoLoadLoadout = true; //true = will automatically equip/load the loadout entered below
const loadout = "drip"; //change to the loadout you want to have equipped on gameload
//0 = ak, 1 = sniper, 2 = smg, 3 = lmg, 4 = shotgun, 5 = rev, 6 = semi, 7 = rpg
//8 = uzi, 9 = runner, 11 = cbow, 12 = famas, 13 = trooper, 15 = charge rifle

const leaveOnDeath = false; // true = leaves when dying; false = doesnt leave when dying
const leaveOnLowTime = false; // true = leaves once time is lower than the one entered in the line below
const leaveTime = 10; // enter time to leave at (in seconds) when no kills were made  - set to a negative value to never leave
const stayNuke = true; // true = always stay when nuked
const stayDoubleNuke = true; // true = always stay when doublenuked
const minimumKDR = 5; //minimum required kdr

/*----------------------------------------------------------------------------------*/
//dont touch anything below here
/*----------------------------------------------------------------------------------*/
let nuke = false;
let doubleNuke = false;

//leave and logout stuff
setInterval(() => {
    //gets streak
    const streak = document.getElementById("streakVal").innerText;

    //gets time and converts to array
    const time = document.getElementById("timerVal").innerText.split(':');
    //converts array to s
    const lobbyRestTime = Number(time[0]) * 60 + Number(time[1]);

    //counts deaths
    const deaths = document.getElementById("deathsVal").innerText;

    //count kills
    const kills = document.getElementById("killsVal").innerText;

    //calcualte kd
    const killperdeath = kills / deaths;

    //checks for nuke
    if (streak == '25') nuke = true;
    //checks for doublenuke
    if (streak == '50') doubleNuke = true;
    //checks for nukes
    if (!(stayNuke && nuke) && !(stayDoubleNuke && doubleNuke)) {
        //checks for deaths and lowtime
        if ((leaveOnDeath && deaths == '1') || (leaveOnLowTime && kills == 0 && leavetime > lobbyRestTime) || (minimumKDR >= killperdeath)) {
            //logout
            if (autoLogInOut) logoutAcc();
            //open krunker
            setTimeout(() => {
                location.href = 'https://krunker.io';
            }, 100)
        }
    }
}, 1000); //interval at which deaths etc are checked; adjust to your liking

//login stuff (pageload)
setTimeout(() => {
    const gameInfo = document.getElementById("mapInfo").innerText.split("_")[0]; //gets gamemode from mapInfo
    if (selectedModes && !(gameModes.includes(gameInfo))) {
        //logout
        logoutAcc();
        //open krunker
        setTimeout(() => {
            location.href = 'https://krunker.io';
        }, 100)
    }
	if (autoLogInOut) {
		document.getElementsByClassName("frvr-button genericPromptButton")[1].click() //remove guest gift popup

		setTimeout(() => {
			document.getElementById("accManagerBtn").click() //opens alt manager

			setTimeout(() => {
				document.getElementsByClassName("altlistelement")[0].click() //clicks on first account in alt manager

				setTimeout(() => {
					loginAcc() //login with entered credentials (from alt manager)
					
					setTimeout(() => {
                            			//loads loadout
                            			if (autoLoadLoadout) {
                                			showWindow(3)
                                			document.getElementById("loadoutSelect").value = loadout;
                                			windows[2].action(0)
                           			}
                        		}, 1000)
				}, 500)
			}, 500)
		}, 500)
	}
	if (autoPick) selectClass(weaponClass); //picks class
}, 5000)





