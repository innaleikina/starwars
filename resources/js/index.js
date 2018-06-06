let fighters = [{
        selector: $("#obi"),
        selectorHealth: $("#health-obi"),
        selectorAttack: $("#attack-obi"),
        name: "Obi",
        id: "obi",
        health: 120,
        attack: 12,
        attackNew: 12
    },
    {
        selector: $("#luke"),
        selectorHealth: $("#health-luke"),
        selectorAttack: $("#attack-luke"),
        name: "Luke",
        id: "luke",
        health: 100,
        attack: 13,
        attackNew: 13

    },
    {
        selector: $("#darth-s"),
        selectorHealth: $("#health-darth-s"),
        selectorAttack: $("#attack-darth-s"),
        name: "Darth S",
        id: "darth-s",
        health: 150,
        attack: 7,
        attackNew: 7
    },
    {
        selector: $("#darth-m"),
        selectorHealth: $("#health-darth-m"),
        selectorAttack: $("#attack-darth-m"),
        name: "Darth M",
        id: "darth-m",
        health: 180,
        attack: 15,
        attackNew: 15
    }
]


let fighterChosen = false;
let enemyChosen = false;
let fighter;
let enemy;
let fighterObj;
let enemyObj;
let fighterHealthNew;


function printStats() {
    for (var i = 0; i < fighters.length; i++) {
        fighters[i].selectorHealth.text(fighters[i].health);
        fighters[i].selectorAttack.text(fighters[i].attackNew);
    }
}
printStats();


//puts chosen fighters into correct divs
$(".fighter-container").click(function () {
    // console.log(this);
    if (!fighterChosen) {
        $(this).appendTo(".chosen-fighter");
        //makes choosing a new fighter impossible, because the fighterChosen is now true
        fighterChosen = true;
        fighter = $(".chosen-fighter").children(".fighter-container");
    } else if (!enemyChosen) {
        $(this).appendTo(".enemy");
        //makes choosing a new fighter impossible, because the enemyChosen is now true
        enemyChosen = true;
        enemy = $(".enemy").children(".fighter-container");
    }
});


//_________________ ON ATTACK CLICK_____________
$("#attack").click(function () {
    if (!fighterChosen || !enemyChosen) {
        alert("please choose your characters");
    }

    //save chosen fighters inside a variable
    for (var i = 0; i < fighters.length; i++) {
        if ((fighter.attr("id") == fighters[i].id)) {
            fighterObj = fighters[i];
            //  console.log(fighterObj);
        } else if (enemy.attr("id") == fighters[i].id) {
            enemyObj = fighters[i];
            // console.log(enemyObj);
        }
    }

     //fight container info populates dynamically
    $("#fighter-damage").text(fighterObj.name + " damaged " +  enemyObj.name + " for " + fighterObj.attackNew + " points!");
    $("#enemy-damage").text(enemyObj.name + " damaged " +  fighterObj.name + " for " + enemyObj.attackNew + " points!");

    //all the health related functions
    function subtractHealth() {
        fighterObj.health = fighterObj.health - enemyObj.attackNew;
        enemyObj.health = enemyObj.health - fighterObj.attackNew;
        fighterObj.attackNew = fighterObj.attackNew + fighterObj.attack;

        if(fighterObj.health <= 0){
            console.log("you lost!")
        }

        if(enemyObj.health <= 0){
            console.log("enemy is dead!");
            $(".enemy").empty();
            enemyChosen = false;
        }
    }



    subtractHealth();
    printStats();

});

//______________________ END OF ATTACK CLICK