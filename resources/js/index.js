$(document).ready(function () {

    let fighters = [{
            img: "./resources/images/obi.jpg",
            name: "Obi-Wan Kenobi",
            id: "obi",
            idHealth: "health-obi",
            idAttack: "attack-obi",
            health: 120,
            healthConst: 120,
            attack: 8,
            attackNew: 8
        },
        {
            img: "./resources/images/luke.jpg",
            name: "Luke Skywalker",
            id: "luke",
            idHealth: "health-luke",
            idAttack: "attack-luke",
            health: 100,
            healthConst: 100,
            attack: 5,
            attackNew: 5

        },
        {
            img: "./resources/images/sidius.jpg",
            name: "Darth Sidious",
            id: "darth-s",
            idHealth: "health-darth-s",
            idAttack: "attack-darth-s",
            health: 150,
            healthConst: 150,
            attack: 20,
            attackNew: 20
        },
        {
            img: "./resources/images/maul.jpg",
            name: "Darth Maul",
            id: "darth-m",
            idHealth: "health-darth-m",
            idAttack: "attack-darth-m",
            health: 180,
            healthConst: 180,
            attack: 25,
            attackNew: 25
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
            // fighterHealth.text(fighters[i].health);
            fighterContainer.append(fighterHealth);

            var fighterAttack = $("<p>");
            fighterAttack.addClass("attack");
            fighterAttack.attr("id", fighters[i].idAttack);
            // fighterAttack.text(fighters[i].attack);
            fighterContainer.append(fighterAttack);

            $("#" + fighters[i].idHealth).text(fighters[i].name + "'s" + " health is " + fighters[i].healthConst);
            $("#" + fighters[i].idAttack).text(fighters[i].name + "'s" + " attack is " + fighters[i].attack);

            fighters[i].attackNew = Number(fighters[i].attack);
            fighters[i].health = Number(fighters[i].healthConst);
        }

        fighterChosen = false;
        enemyChosen = false;
        defeatedFighters = [];
        $(".info-pop-up").css("display", "none");
        $("#resetLoose").css("display", "none");
        $(".info-pop-up-text").css("color", "white");
        
        


    }

    setUp();
  

    // $("#health-obi").text(fighters[0].name + "'s" + " health is " + fighters[0].health);

    function printStats() {
        for (var i = 0; i < fighters.length; i++) {
            // console.log(fighters[i].selectorHealth);
            $("#" + fighters[i].idHealth).text(fighters[i].name + "'s" + " health is " + fighters[i].health);
            $("#" + fighters[i].idAttack).text(fighters[i].name + "'s" + " attack is " + fighters[i].attackNew);
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

            // if ($(window).width() < 690) {
            //     $("#attack-desktop").hide();
            //     $("#attack-mobile").show();
   
            //  }
            //  else if ($(window).width() > 691) {
            //     $("#attack-mobile").hide();
            //     $("#attack-desktop").show();
               
            //  }
             
        }

        //fight container info populates dynamically
        function printFightInfo(){
        $(".fighter-damage").text(fighterObj.name + " damaged " + enemyObj.name + " for " + fighterObj.attackNew + " points!");
        $(".enemy-damage").text(enemyObj.name + " damaged " + fighterObj.name + " for " + enemyObj.attackNew + " points!");
        $(".attack-info-all").css("border", "1px black solid");
        }

        //all the health related functions
        function subtractHealth() {
            fighterObj.health = fighterObj.health - enemyObj.attackNew;
            enemyObj.health = enemyObj.health - fighterObj.attackNew;
            fighterObj.attackNew = fighterObj.attackNew + fighterObj.attack;

        



            if (fighterObj.health <= 0) {
                //console.log("you lost!")
                $(".info-pop-up-text").text(enemyObj.name + " killed you!");
                $("#resetLoose").css("display", "block");
                $(".info-pop-up").css("display", "flex");
          
            }

            if (enemyObj.health <= 0) {
                $(".enemy-display").empty();
                $(".info-pop-up-text").text(enemyObj.name + " is dead! Pick your next enemy!");
                $(".info-pop-up").css("display", "flex");
                setTimeout(function () {
                    $(".info-pop-up").css("display", "none");
                }, 2500);

                $(".enemyDisplay").empty();
                enemyChosen = false;
                defeatedFighters.push(enemyObj);
                //console.log(defeatedFighters);
            }

            if (defeatedFighters.length == 3) {
                $(".info-pop-up-text").css("color", "red");
                $(".ultimate-win").css("display", "flex");
                $(".info-pop-up").css("display", "none");
                $(".ultimate-win-text").text(" You are the supreme winner");

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