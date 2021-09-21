


const projects = [
    {
        query: "jntuh_track",
        name:  "JNTUH Track",
        matter: "This app allows you to calculate percentage,CGPA,SGPA for R16/R18 Results i.e. BTech only.Only Applicable for CSE,ECE,EEE,IT,CIVIL,AE,ME which tracks all the academic percentage of semesters that you will enter. The values are automatically updated i.e. CGPA,Percentage,SGPA.",
        // github: "https://github.com/homeSaloon",
        image: "assets/images/project_images/jntuh_track.png",
        applink:"https://play.google.com/store/apps/details?id=com.dark_everest.jntuh_track",
        // apilink:"https://api.covid19india.org/",
        techUsed:
        [
            {iconName: "fab fa-google",techname:"Flutter"},
            {iconName: "fab fa-google",techname:"Firebase"},
            {iconName: "fab fa-google",techname:"Admob"},
          

        ]

    },
    {
        query: "digitalSaloon",
        name: "Digital Saloon",
        matter: "This application i have build with React-Native. This project got selected for IBM NASSCOM Hackathon 2020 for the title 'Crack the COVID 2019'.",
        github: "https://github.com/homeSaloon",
        image: "assets/images/project_images/digital-saloon.gif",
        // applink:"https://prabhuchira.github.io/covid-tracker-india-jquery/",
        // apilink:"https://api.covid19india.org/",
        techUsed:
        [
            {iconName: "fab fa-html5",techname:"HTML"},
            {iconName: "fab fa-css3-alt",techname:"CSS"},
            {iconName: "fab fa-js",techname:"Javascript"},
            {iconName: "fab fa-react",techname:"React-Native"},
            {iconName: "fab fa-react",techname:"Redux"},
            {iconName: "fas fa-map-marker-alt",techname:"Google Maps"},
            {iconName: "fab fa-node",techname:"NodeJS"},
            {iconName: "fas fa-database",techname:"MongoDB"},
            {iconName: "fab fa-js",techname:"Express JS"},

        ]

    },
    {
        query: "calculator",
        name: "React Calculator",
        matter: "When learning React I have made this application what makes it differs from other calculator applications is its not gonna work like 'press 1 for addition,press 2 for subtraction' it just works out of the box.User can see his history etc.?",
        github: "https://github.com/prabhuchira/CalculatorReact",
        image: "assets/images/project_images/calculator-react.gif",
        techUsed:
            [
                {iconName: "fab fa-html5",techname:"HTML"},
                {iconName: "fab fa-css3-alt",techname:"CSS"},
                {iconName: "fab fa-react",techname:"React"}
            ]
    },

    {
        query: "covid",
        name: "Covid tracker india Jquery",
        matter: "This application i have build when im learning jquery.This uses api.covid19india.org api to fetch all the covid cases in india.",
        github: "https://github.com/prabhuchira/covid-tracker-india-jquery",
        image: "assets/images/project_images/covid-tracker.gif",
        applink:"https://prabhuchira.github.io/covid-tracker-india-jquery/",
        apilink:"https://api.covid19india.org/",
        techUsed:
        [
            {iconName: "fab fa-html5",techname:"HTML"},
            {iconName: "fab fa-css3-alt",techname:"CSS"},
            {iconName: "fab fa-js",techname:"Jquery"}
        ]

    },
    
    {
        query: "level",
        name: "Level - Todo App",
        matter: "This application i have build with React.In this i mainly focused on the UI along with providing many features that are similar to commercial todo applications'.",
        github: "https://github.com/https://github.com/prabhuchira/Level-A-todo-React-App-",
        image: "assets/images/project_images/level.gif",
        // applink:"https://prabhuchira.github.io/covid-tracker-india-jquery/",
        // apilink:"https://api.covid19india.org/",
        techUsed:
        [
            {iconName: "fab fa-html5",techname:"HTML"},
            {iconName: "fab fa-css3-alt",techname:"CSS"},
            {iconName: "fab fa-js",techname:"Javascript"},
            {iconName: "fab fa-react",techname:"React-Native"},
            {iconName: "fab fa-react",techname:"Redux"},
        

        ]

    },
    {
        query: "flames",
        name: "Flames",
        matter: "Flames is a relationship calculating algorithm famous between the youngsters. At the time of graduation everyone might heard about this and many of them tried out this secretly. Some took this as very serious also. So what FLAMES stance for?",
        github: "https://github.com/prabhuchira/flames",
        image: "assets/images/project_images/flames.gif",
        // applink:"https://prabhuchira.github.io/covid-tracker-india-jquery/",
        // apilink:"https://api.covid19india.org/",
        techUsed:
        [
            {iconName: "fab fa-html5",techname:"HTML"},
            {iconName: "fab fa-css3-alt",techname:"CSS"},
            {iconName: "fab fa-js",techname:"Javascript"},
           

        ]

    },
   



]



const queryString = window.location.search
const urlParams = new URLSearchParams(queryString);

const project = urlParams.get("projectName")
console.log(project)

const projectDOM = (i) => {
    document.getElementById("projectDrone").append(i.name);
    document.getElementById("projectImage").src = i.image;
    document.getElementById("projectImage").style.display="block";
    document.getElementById("matter").append(i.matter)

    i.techUsed.map((i)=>{
        console.log(i)
        
        const li = document.createElement("li");
        
        const icon = document.createElement("i");
        icon.className=i.iconName;
        li.append(icon);
        const span = document.createElement("span")
        span.append(i.techname)
        li.append(span);
        document.getElementById("tech-used").append(li)
    })
   
    if(i.github){
        document.getElementById("github-link").style.display = "block";
        document.getElementById("projectg-link").href=i.github;
        document.getElementById("projectg-link").innerText=i.github;
        document.getElementById("projectg-link").style.fontSize="20px"
    
    }
 
    if(i.applink){
        
        document.getElementById("app-link-container").style.display="block";
        document.getElementById("app-link").style.fontSize="20px"
        document.getElementById("app-link").append(i.applink)
    }

    if(i.apilink){
        
        document.getElementById("api-link-container").style.display="block";
        document.getElementById("api-link").style.fontSize="20px"
        document.getElementById("api-link").append(i.apilink)
    }


}

projects.forEach(i => i.query == project ? projectDOM(i) : null)

