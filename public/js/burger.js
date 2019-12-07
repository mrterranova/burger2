$(document).ready(function () {

    getburgers();

    function getburgers() {
        $.get("/api/burgers", data => {
            //show all devoured burgers that were not "deleted" on the menu
            var eatenBurgers = "";
            console.log(data)
            for (var i = 0; i < data.length; i++) {
                if (data[i].devoured) {
                    if (data[i].deleted == false) {
                        eatenBurgers += "<div class = 'rowEatenBurgers'>" + data[i].burger_name + "<div class='rowButtons'><button id='deleteBurger-button'>Delete Burger</button>" +
                            "<a href='./comments?burger_id='"+data[i].id+"><button id='comment-button'>Comments</button></a></div></div><br>";
                    }
                }
            }
            if (eatenBurgers !== "") {
                $(".burger-devoured").prepend(eatenBurgers);
            } else {
                $(".burger-devoured").html("<h2 class='emptylog'>You'll have to Order Up!</h2>");
            }

            //show all ordered burgers that were newly added to the window
            var prepareBurger = "";
            for (var i = 0; i < data.length; i++) {
                if(data[i].devoured ===false){
                    prepareBurger += "<div class = 'rowEatenBurger'>" + data[i].burger_name + "<div class='rowButtons'><button id='editBurger-button'>Edit Order</button>" +
                    "<button id='getOrder-button'>Devour Burger</button></div></div><br>";
                }
            }
            $(".burger-orderPlaced").prepend(prepareBurger);

            $("#burgerOrderButton").on("click", newBurger => {
                burgerName = $(".field").val().trim();
                console.log(burgerName)
                var allCap = burgerName.toUpperCase();
                console.log(allCap)
                var arrayBurger = allCap.split(" ");
                var finalBurger = "";
                // console.log(arrayBurger);
                if (burgerName !== "") {
                    if (arrayBurger[arrayBurger.length - 1] !== "BURGER") {
                        for (var i = 0; i < arrayBurger.length; i++) {
                            finalBurger += arrayBurger[i] + " "
                            if (i == arrayBurger.length-1){
                                finalBurger += " BURGER"
                            }
                        }
                    } else {
                        for (var i = 0; i < arrayBurger.length; i++) {
                            finalBurger += arrayBurger[i] + " "
                        }
                    }
                }
                // } else {
                //     $("#Warning").show();
                //     $("#Warning").html("<h2 class='NoInfo'>Sorry this entry is invalid! If you click continue, we will randomize your burger from our customer base for you.</h2>")
                // }

                compareBurger = finalBurger.trim();
                var burgerLocated = false;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].burger_name === compareBurger) {
                        alert(data[i].burger_name)
                        burgerLocated = true;
                    }
                }
                if (burgerLocated) {
                    editBurger();
                } else {
                    newBurger = {
                        burger_name: compareBurger,
                        devoured: false,
                        deleted: false
                    }
                }
                $.post("/api/burgers", newBurger).then(results, function () {
                    console.log(results)
                });
            });
        });
    }

    // function editBurger(burger) {
    $(this).on("click", "#editBurger-button", burger => {
        alert("I pushed the edit button");
        console.log("this", burger)
        $.ajax({
            method: "PUT",
            url: "/api/burgers",
            devoured: 1
        }).then(
        );
    });
    // }
});