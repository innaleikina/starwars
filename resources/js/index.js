$(document).ready(function () {

    let fighters = [{
            img: "url('resources/images/obi.jpg')",
            name: "Obi-Wan Kenobi",
            id: "obi",
            health: 120,
            attack: 5,
            attackNew: 12
        },
        {
            img: "url('resources/images/luke.jpg')",
            name: "Luke Skywalker",
            id: "luke",
            health: 100,
            attack: 4,
            attackNew: 13

        },
        {
            img: "url('resources/images/sidius.jpg')",
            name: "Darth Sidious",
            id: "darth-s",
            health: 150,
            attack: 7,
            attackNew: 7
        },
        {
            img: "url('resources/images/maul.jpg')",
            name: "Darth Maul",
            id: "darth-m",
            health: 180,
            attack: 3,
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
    let defeatedFighters = [];



    for (var i = 0; i < fighters.length; i++) {

        var fighterContainer = $("<div>");
        console.log(fighterContainer);
        fighterContainer.addClass("fighter-container");
        fighterContainer.text(fighters[i].name);
        $("fighters").append(fighterContainer);

    }

    // function printStats() {
    //     for (var i = 0; i < fighters.length; i++) {
    //         fighters[i].selectorHealth.text(fighters[i].name + "'s" + " health is " + fighters[i].health);
    //         fighters[i].selectorAttack.text(fighters[i].name + "'s" + " attack is " + fighters[i].attackNew);
    //     }
    // }
    // printStats();

    function reset() {
        $(".fighter-container").appendTo(".fighters");

        $(".attack-info-all").empty();
        $(".attack-info-all").css("border", "none");
        fighterChosen = false;
        enemyChosen = false;
        $(".fighter-container").hover(function () {
            $(".fighter-container").css("cursor", "pointer");
        });

    }

    $("#reset").click(function () {
        reset();
    });

    $(".resetWin").click(function () {
        $(".ultimate-win").css("display", "none");
        reset();


    })


    //puts chosen fighters into correct divs
    $(".fighter-container").click(function () {
        // console.log(this);
        if (!fighterChosen) {
            // $(".fighter-container").appendTo(".enemy");
            $(this).appendTo(".chosen-fighter");
            $(this).hover(function () {
                $(this).css("cursor", "auto");
            });
            $("#pick").text("PICK AN ENEMY");
            //makes choosing a new fighter impossible, because the fighterChosen is now true
            fighterChosen = true;
            fighter = $(".chosen-fighter").children(".fighter-container");
        } else if (!enemyChosen) {
            $(this).appendTo(".enemyDisplay");
            $(this).hover(function () {
                $(this).css("cursor", "auto");
            });
            //makes choosing a new fighter impossible, because the enemyChosen is now true
            enemyChosen = true;
            enemy = $(".enemyDisplay").children(".fighter-container");
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
        $("#fighter-damage").text(fighterObj.name + " damaged " + enemyObj.name + " for " + fighterObj.attackNew + " points!");
        $("#enemy-damage").text(enemyObj.name + " damaged " + fighterObj.name + " for " + enemyObj.attackNew + " points!");
        $(".attack-info-all").css("border", "1px black solid");

        //all the health related functions
        function subtractHealth() {
            fighterObj.health = fighterObj.health - enemyObj.attackNew;
            enemyObj.health = enemyObj.health - fighterObj.attackNew;
            fighterObj.attackNew = fighterObj.attackNew + fighterObj.attack;

            if (fighterObj.health <= 0) {
                console.log("you lost!")
                $(".info-pop-up-text").text(enemyObj.name + " killed you!");
                $("#resetLoose").css("display", "block");
                $(".info-pop-up").css("display", "flex");
            }

            if (enemyObj.health <= 0) {
                $(".info-pop-up-text").text(enemyObj.name + " is dead! Pick your next enemy!");
                $(".info-pop-up").css("display", "flex");
                setTimeout(function () {
                    $(".info-pop-up").css("display", "none");
                }, 2500);

                $(".enemyDisplay").empty();
                enemyChosen = false;
                defeatedFighters.push(enemyObj);
                console.log(defeatedFighters);
            }

            if (defeatedFighters.length == 3) {
                $(".info-pop-up-text").css("color", "red");
                $(".ultimate-win").css("display", "flex");
                $(".ultimate-win-text").text(" You are the supreme winner");

            }
        }



        subtractHealth();
        printStats();

    });

    //______________________ END OF ATTACK CLICK

    $("#rules").click(function () {
        $(".rules-pop-up").toggle();
    })

    $("#x").click(function () {
        $(".rules-pop-up").toggle();
    })
})