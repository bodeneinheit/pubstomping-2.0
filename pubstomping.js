//params
//make sure kill, death and streak counters are enabled
const autoLogInOut = false; //true = autologs in and out, false does not
const selectedModes = true; //true = leaves if gamemodes is not in the array below
const gameModes = ["ffa", "shrp", "krank", "bhffa", "depoffa", "chs"]; //gamemodes as array
const autoPick = true; // true = autopicks class below
const weaponClass = 2; // pick value from below
//0 = ak, 1 = sniper, 2 = smg, 3 = lmg, 4 = shotgun, 5 = rev, 6 = semi, 7 = rpg
//8 = uzi, 9 = runner, 11 = cbow, 12 = famas, 13 = trooper, 15 = charge rifle

const leaveOnDeath = true; // true = leaves when dying; false = doesnt leave when dying
const leavetime = 100; // enter time to leave at (in seconds) when no kills were made
const stayNuke = false; // true = always stay when nuked
const stayDoubleNuke = false; // true = always stay when doublenuked

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

    //checks for nuke
    if (streak == '25') nuke = true;
    //checks for doublenuke
    if (streak == '50') doubleNuke = true;
    //checks for nukes
    if (!(stayNuke && nuke) && !(stayDoubleNuke && doubleNuke)) {
        //checks for deaths and lowtime
        if ((leaveOnDeath && deaths == '1') || (leavetime > lobbyRestTime && kills == 0)) {
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
				}, 500)
			}, 500)
		}, 500)
	}
	if (autoPick) selectClass(weaponClass); //picks class
}, 5000)





