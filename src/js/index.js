/// <reference types="../@types/jquery" />
///////////////////////////////////////////////////////
// start navbar
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', function () {
    mobileMenu.classList.toggle('hidden');
});
$("nav li a").on("click", function () {
    $("nav li a").removeClass("active")
    $(this).addClass("active")
    getApi(this.innerText.toLowerCase())
})
// end navbar
let loading = document.querySelector(".loading");
let gamesData = document.getElementById("gamesData");

let details = document.getElementById("details")
let Category = document.getElementById("Category")
let Platform = document.getElementById("Platform")
let Status = document.getElementById("Status")
let closeIcon = document.getElementById("close")
let home = document.getElementById("home")
let gameTitle = document.getElementById("gameTitle")
let description = document.getElementById("description")
let detailsphoto = document.getElementById("detailsphoto")
let goToGameUrl = document.getElementById("goToGameUrl")




let gamesList = []

async function getApi(search) {
    $(".loading").removeClass("hidden").addClass("flex")
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '64cbea3a02msh961deea081c2e68p113e49jsnfaad423a768a',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${search}`, options)
    const response = await api.json();
    gamesList = response;
    // console.log(gamesList)
    displayGames()
    $(".loading").removeClass("flex").addClass("hidden")
}
getApi("mmorpg")


let gameDetails = {}
let allCols;

function displayGames() {
    let contain = ``
    for (var i = 0; i < gamesList.length; i++) {
        contain += `
                        <div data-id="${gamesList[i].id}"
                        class="card cursor-pointer border hover:scale-[1.05] transition-transform duration-[0.5s]  border-gray-700 rounded all-cols group">
                        <div class="card-body h-[calc(100%-39.94px)]">
                            <img src="${gamesList[i].thumbnail}"
                                class="w-full p-[16px] grayscale-[50%] group-hover:grayscale-[0%] transition-all duration-[0.5s]"
                                alt="${gamesList[i].title} thumbnail">
                            <div class="caption p-[16px]">
                                <div class=" flex justify-between items-center">
                                    <h3 class="text-white text-[14px] mb-[8px]">${gamesList[i].title}</h3>
                                    <span
                                        class="bg-[#0d6efd] rounded-[10px] p-[8px] text-[12px] text-white font-semibold grayscale-[50%] group-hover:grayscale-[0%] transition-all duration-[0.5s]">Free</span>
                                </div>
                                <p class="text-center text-[14px] text-[#939598]">${gamesList[i].short_description}</p>
                            </div>
                        </div>
                        <div
                            class="border-t-[1px] border-gray-700 text-[10.5px] font-semibold text-white flex justify-between py-[8px] px-[16px]">
                            <span class="bg-[#32383e] p-[3.6px] rounded-[5px]">${gamesList[i].genre}</span>
                            <span class="bg-[#32383e] p-[3.6px] rounded-[5px]">${gamesList[i].platform}</span>
                        </div>
                    </div>
                `
    }
    gamesData.innerHTML = contain;
    allCols = document.querySelectorAll(".all-cols");
    allCols.forEach(element => {
        element.addEventListener("click", function () {
            // console.log(this.getAttribute("data-id"));


            async function getDetails(num) {
                loading.classList.replace("hidden", "flex")
                const options = {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': '64cbea3a02msh961deea081c2e68p113e49jsnfaad423a768a',
                        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
                    }
                };
                const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${num}`, options)
                const response = await api.json();
                gameDetails = response;
                // console.log(gameDetails);
                detailsphoto.innerHTML = `<img src="${gameDetails.thumbnail}" class="w-100" alt="${gameDetails.title} thumbnail">`
                gameTitle.innerHTML = `Title: ${gameDetails.title}`
                Category.innerHTML = gameDetails.genre
                Platform.innerHTML = gameDetails.platform
                Status.innerHTML = gameDetails.status
                description.innerHTML = gameDetails.description
                goToGameUrl.setAttribute("href", `${gameDetails.game_url}`);
                try {
                    $("#graphics").text(gameDetails.minimum_system_requirements.graphics)
                    $("#memory").text(gameDetails.minimum_system_requirements.memory)
                    $("#os").text(gameDetails.minimum_system_requirements.os)
                    $("#processor").text(gameDetails.minimum_system_requirements.processor)
                    $("#storage").text(gameDetails.minimum_system_requirements.storage)
                } catch (error) {
                    $("#graphics").text("unknown")
                    $("#memory").text("unknown")
                    $("#os").text("unknown")
                    $("#processor").text("unknown")
                    $("#storage").text("unknown")
                }
                details.classList.remove("hidden")
                home.classList.add("hidden")
                $("body").css("background-color", "#27282b")
                loading.classList.replace("flex", "hidden")
            }
            getDetails(this.getAttribute("data-id"))
        })
    });
}
/////////

// start links



// end links




$("#close").on("click",function(){
    details.classList.add("hidden")
    $("body").css("background-color", "#272b30")
    home.classList.remove("hidden")
})








