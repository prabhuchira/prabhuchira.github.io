




(


    function () {

        const data = [
            {lang: "HTML", perc: 100,iconName:"fab fa-html5"},
            {lang: "CSS", perc: 100,iconName:"fab fa-css3-alt"},
            {lang: "Javascript", perc: 100,iconName:"fab fa-js"},
            {lang: "Jquery", perc: 100,iconName:"fab fa-node-js"},
            {lang: "React", perc: 90,iconName:"fab fa-react"},
            {lang: "R-Native", perc: 90,iconName:"fab fa-react"},
            {lang: "R-Native", perc: 90,iconName:"fab fa-react"},
            {lang: "NodeJS", perc: 80,iconName:"fab fa-node"},
            {lang: "MongoDB", perc: 70,iconName:"fas fa-database"},
            {lang: "Flutter", perc: 95,iconName:"fab fa-gitter"},


        ]


        data.forEach(function (i) {
            const outerDiv = document.createElement("div");
            outerDiv.style.display = "flex";
            outerDiv.style.alignItems="center";
            const langC = document.createElement("div");
            // langC.style.marginRight = "20px"
            langC.style.display="flex";
            langC.style.flexDirection="column";
            langC.style.alignItems="center";
            langC.style.width = "65px"
            langC.style.marginRight = "20px"
            const langText =document.createElement("div");
            

            // langC.append("Windows");
            const icon = document.createElement("i")
            // icon.href="#";
            // icon.style.width = "50px"
            icon.style.marginTop="20px"
            // icon.style.marginBottom="20px"
            icon.className=i.iconName;

            

         

            icon.style.color="black"
            icon.style.fontSize = "40px"
            // if(i.iconName =="jquery"){
            //     icon.style.fontStyle = "normal"
            //     icon.style.fontSize = "17px"
            //     icon.style.fontWeight = "bold"
                
            //     icon.append("Jquery")
                
            // }
            
            langC.appendChild(icon);

            langText.style.fontSize = "12px"
            langText.append(i.lang.toString());
            // langText.style.transform="rotateZ(90deg)"

            
            langC.append(langText);    

            langC.style.fontFamily = "Segoe UI"

         
            const progressC = document.createElement("div");
            progressC.className = "progress"
            progressC.style.flex = 1;
            progressC.style.margin = "auto";

            const progressB = document.createElement("div");
            progressB.className = "progress-bar progress-bar-striped progress-bar-animated"
            progressB.setAttribute("role", "progressBar")
            progressB.setAttribute("aria-valuenow", "60")
            progressB.setAttribute("aria-valuemin", "0")
            progressB.setAttribute("aria-valuemax", "100")
            progressB.style.width = i.perc+"%";

            progressB.style.backgroundColor = "#424242"


            progressB.append(i.perc + "%");

            progressC.appendChild(progressB);

            outerDiv.appendChild(langC);
            outerDiv.appendChild(progressC);

            document.getElementById("web-statistics").appendChild(outerDiv);

        }

        )




    }

    

)()




// (()=>{
//     data.forEach(i=>{

//         <div style="display: flex;">
//       <div style="margin-right: 20px;">{i.lang}</div>
//       <div class="progress" style="flex:1">
//           <div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0"
//               aria-valuemax="100" style="width: 60%;">
//               {i.perc+"%"}
//           </div>
//       </div>

//       <br />
//       </div>

//       return  document.getElementById('web-statistics').appendChild(


//       );

//     })
// })();



$('.git-btn').on('click', function (e) {
    e.preventDefault()
    console.log("YO");
    $('html, body').animate(
      {
        scrollTop: $("#projectContainer").offset().top - 160,
      },
      500,
      'linear'
    )
  })

//   $('a').on('click', function (e) {
//     e.preventDefault()
//     console.log("YO");
//     $('html, body').animate(
//       {
//         scrollTop: $("#projectContainer").offset().top - 160,
//       },
//       500,
//       'linear'
//     )
//   })


  document.getElementById("lets-do-this").addEventListener("click",()=>{
      window.location.href="/form.html";
  })


  $(".sliding-link").click(function(e) {
    e.preventDefault();
    var aid = $(this).attr("href");
    $('html,body').animate({scrollTop: $(aid).offset().top -160 },'slow');
});


