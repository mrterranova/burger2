   var url = window.location.search;
    console.log(url)
    console.log(window.location.href)
    

    if (url.indexOf("?burger_id=") !== -1) {
      burgerId = url.split("=")[1];
      console.log(burgerId)
      getComments(burgerId);
    }
    // If there's no authorId we just get all posts as usual
    else {
      window.location.href="/comments?burger_id=1";
      getComments(1)
    }

    function getComments(burgerId) {
        $.get("/api/burgers/"+burgerId, data => {
            $(".nameBurger").html(data.burger_name);
            tableComments="";
            for(var i=0; i < data.Comments.length; i++){
              tableComments+= "Customer: "+data.Comments[i].customer+"<br>";
              tableComments +="Comment: "+data.Comments[i].comment+"<br>";
              tableComments += "Rating: "+data.Comments[i].stars+" stars<br><br>";
            }

            $(".burger-ready").prepend(tableComments);

            $(".commentButton").on("click", newComment => {
              url = window.location.href="/comments?burger_id="+burgerId;
              
              commentCustomer = $(".name").val().trim();
              console.log("You have clicked the button")
              commentBody = $(".body").val().trim();
              commentRate = $(".stars").val().trim();
              
              newComment = {
                customer: commentCustomer,
                comment: commentBody,
                stars: commentRate, 
                BurgerId: burgerId
              }

              console.log("newComment", newComment)
              
              $.post("/api/comment", newComment).then(results, function () {
                console.log(results)
                console.log("In the Promise")
              });
            });
          });
        };