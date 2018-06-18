$(document).ready(function () {

    let fighters = [{
            img: "./resources/images/obi.jpg",
            name: "Obi-Wan Kenobi",
            id: "obi",
            idHealth: "health-obi",
            idAttack: "attack-obi",
            idCounter: "counter-obi",
            health: 120,
            healthConst: 120,
            attack: 8,
            attackNew: 8,
            counterAttack: 15,

        },
        {
            img: "./resources/images/luke.jpg",
            name: "Luke Skywalker",
            id: "luke",
            idHealth: "health-luke",
            idAttack: "attack-luke",
            idCounter: "counter-luke",
            health: 100,
            healthConst: 100,
            attack: 15,
            attackNew: 15,
            counterAttack: 5

        },
        {
            img: "./resources/images/sidius.jpg",
            name: "Darth Sidious",
            id: "darth-s",
            idHealth: "health-darth-s",
            idAttack: "attack-darth-s",
            idCounter: "counter-darth-s",
            health: 150,
            healthConst: 150,
            attack: 5,
            attackNew: 5,
            counterAttack: 20,
        },
        {
            img: "./resources/images/maul.jpg",
            name: "Darth Maul",
            id: "darth-m",
            idHealth: "health-darth-m",
            idAttack: "attack-darth-m",
            idCounter: "counter-darth-m",
            health: 180,
            healthConst: 180,
            attack: 3,
            attackNew: 3,
            counterAttack: 25
        }
    ]


    let fighterChosen = false;
    let enemyChosen = false;
    let fighter;
    let enemy;
    let fighterObj;
    let enemyObj;
    let defeatedFighters = [];



    function setUp() {


        for (var i = 0; i < fighters.length; i++) {

            var fighterContainer = $("<div>");
            fighterContainer.addClass("fighter-container");
            fighterContainer.attr("id", fighters[i].id)
            $(".fighters").append(fighterContainer);

            var fighterName = $("<p>");
            fighterName.addClass("name-style");

            fighterName.text(fighters[i].name);
            fighterContainer.append(fighterName);

            var fighterImg = $("<img>");
            fighterImg.addClass("fighter-img");
            fighterImg.attr("src", fighters[i].img);
            fighterContainer.append(fighterImg);


            fighterHealth = $("<p>");
            fighterHealth.addClass("health");
            fighterHealth.attr("id", fighters[i].idHealth);
            fighterContainer.append(fighterHealth);

            var fighterCounter = $("<p>");
            fighterCounter.addClass("attack");
            fighterCounter.attr("id", fighters[i].idAttack);
            fighterContainer.append(fighterCounter);

            var fighterAttack = $("<p>");
            fighterAttack.addClass("counterAttack");
            fighterAttack.attr("id", fighters[i].idCounter);
            fighterContainer.append(fighterAttack);

            $("#" + fighters[i].idHealth).text(fighters[i].name + "'s" + " health is " + fighters[i].healthConst);
            $("#" + fighters[i].idAttack).text(fighters[i].name + "'s" + " attack is " + fighters[i].attack);
            $("#" + fighters[i].idCounter).text(fighters[i].name + "'s" + " counter attack is " + fighters[i].counterAttack);

            fighters[i].attackNew = Number(fighters[i].attack);
            fighters[i].health = Number(fighters[i].healthConst);
        }

        fighterChosen = false;
        enemyChosen = false;
        defeatedFighters = [];
        $(".info-pop-up").css("display", "none");
        $("#resetLoose").css("display", "none");
        $(".info-pop-up-text").css("color", "white");
        $(this).css("pointer-events", "auto")
        $("#reset").css("display", "block");



    }

    setUp();


    function printStats() {
        for (var i = 0; i < fighters.length; i++) {
            // console.log(fighters[i].selectorHealth);
            $("#" + fighters[i].idHealth).text(fighters[i].name + "'s" + " health is " + fighters[i].health);
        }
    }

    $(".resetWin").click(function () {

        $(".fighter-display").empty();
        $(".enemy-display").empty();
        $(".fighters").empty();
        $(".ultimate-win").css("display", "none");
        $(".attack-info-all").hide();
        $(".attack-info-all").css("border", "none")
        setUp();
    })


    //puts chosen fighters into correct divs
    $(document).on('click', '.fighter-container', function () {

        if (!fighterChosen) {
            $(this).appendTo(".fighter-display");
            $(this).css("pointer-events", "none")
            $(this).hover(function () {
                $(this).css("cursor", "auto");

            });
            $("#pick").text("PICK AN ENEMY");
            //makes choosing a new fighter impossible, because the fighterChosen is now true
            fighterChosen = true;
            // console.log(fighterChosen)
             fighter = $(".fighter-display").children(".fighter-container");
          
            //console.log("this is the fighter" + fighter);
        } else if (!enemyChosen) {
            $(this).appendTo(".enemy-display");
            $(this).hover(function () {
                $(this).css("cursor", "auto");

            });
            //makes choosing a new fighter impossible, because the enemyChosen is now true
            enemyChosen = true;
            // console.log(enemyChosen)
            enemy = $(".enemy-display").children(".fighter-container");
        }
    });


    //_________________ ON ATTACK CLICK_____________
    $(document).on('click', '.attack-btn', function () {
        if (!fighterChosen || !enemyChosen) {
            alert("please choose your characters");
        } else {
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
            function printFightInfo() {
                $("#" + fighterObj.idCounter).css("display", "none");
                $("#" + fighterObj.idAttack).text(fighterObj.name + "'s" + " attack is " + fighterObj.attackNew);
                $(".fighter-damage").text(fighterObj.name + " damaged " + enemyObj.name + " for " + fighterObj.attackNew + " points!");


                $("#" + enemyObj.idAttack).css("display", "none");
                $("#" + enemyObj.idAttack).text(enemyObj.name + "'s" + " counter attack is " + enemyObj.counterAttack);
                $(".enemy-damage").text(enemyObj.name + " damaged " + fighterObj.name + " for " + enemyObj.counterAttack + " points!");
                $(".attack-info-all").css("border", "1px black solid");

            }

            //all the health related functions
            function subtractHealth() {
                fighterObj.health = fighterObj.health - enemyObj.counterAttack;
                enemyObj.health = enemyObj.health - fighterObj.attackNew;
                fighterObj.attackNew = fighterObj.attackNew + fighterObj.attack;





                if (fighterObj.health <= 0) {
                    $(".info-pop-up-text").text(enemyObj.name + " killed you!");
                    $("#resetLoose").css("display", "block");
                    $(".info-pop-up").css("display", "flex");


                }

                if (enemyObj.health <= 0) {
                    $(".enemy-display").empty();
                    $(".info-pop-up-text").text(enemyObj.name + " is dead! Pick your next enemy!");
                    $(".info-pop-up").css("display", "flex");
                    $(".resetWin").css("display", "none");
                    setTimeout(function () {
                        $(".info-pop-up").css("display", "none");

                    }, 2500);

                    $(".enemyDisplay").empty();
                    enemyChosen = false;
                    defeatedFighters.push(enemyObj);
                }

                if (defeatedFighters.length == 3) {
                    $(".info-pop-up-text").css("color", "red");
                    $(".ultimate-win").css("display", "flex");
                    $(".info-pop-up").css("display", "none");
                    $(".ultimate-win-text").text(" You are the supreme winner");
                    $(".resetWin").css("display", "flex");

                }
            }


            $(".attack-info-all").show();
            printFightInfo();
            subtractHealth();
            printStats();

        }

    });

    //______________________ END OF ATTACK CLICK

    $("#rules").click(function () {
        $(".rules-pop-up").toggle();
    })

    $("#x").click(function () {
        $(".rules-pop-up").toggle();
    })
})