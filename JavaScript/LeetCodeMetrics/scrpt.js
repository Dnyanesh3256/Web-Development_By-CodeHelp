document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById("searchBtn");
    const userInput = document.getElementById("userInput");

    const statsContainer = document.querySelector(".statsContainer");

    const easyProgressCircle = document.querySelector(".easyProgress");
    const mediumProgressCircle = document.querySelector(".mediumProgress");
    const hardProgressCircle = document.querySelector(".hardProgress");

    const easyLabel = document.getElementById("easyLabel");
    const mediumLabel = document.getElementById("mediumLabel");
    const hardLabel = document.getElementById("hardLabel");

    const cardStatsContainer = document.querySelector(".statsCard");


    function validateUsername(username){
        if(username.trim() === ""){
            alert("Username should not be empty!!");
            return false;
        }

        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);

        if(!isMatching){
            alert("Invalid Username!!");
        }

        return isMatching;
    }

    async function fetchUserDetails(username){

        try{
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;

            const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
            const targetUrl = 'https://leetcode.com/graphql/';
            const myHeaders = new Headers();
            myHeaders.append("content-type", "application/json");

            const graphql = JSON.stringify({
                query: "\n    query userSessionProgress($username: String!) {\n    allQuestionsCount {\n    difficulty\n    count\n  }\n   matchedUser(username: $username) {\n    submitStats {\n    acSubmissionNum{\n    difficulty\n    count\n submissions\n   }\n totalSubmissionNum  {\n difficulty\n    count\n submissions\n   }\n }\n }\n }\n ",
                variables:  {"username":  `${username}`}
            })

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: graphql,
                redirect: "follow"
            };

            const response = await fetch(proxyUrl+targetUrl, requestOptions);

            if(!response.ok){
                throw new Error("Unable to access User Data!!");
            }

            const parsedData = await response.json();
            console.log("Logging data : ", parsedData);

            displayUserData(parsedData);
        }
        catch(error){
            statsContainer.innerHTML = `<p> ${error.message} </p>`;
        }
        finally{
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function updateProgress(solved, total, label, circle){
        const progressDegree = (solved/total)*100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);

        label.textContent = `${solved}/${total}`;

        const cardsData = [
            {
                label: "Overall Submissions : ", 
                value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[0].submissions
            },
            {
                label: "Overall Easy Submissions : ", 
                value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[1].submissions
            },
            {
                label: "Overall Medium Submissions : ", 
                value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[2].submissions
            },
            {
                label: "Overall Hard Submissions : ", 
                value: parsedData.data.matchedUser.submitStats.totalSubmissionNum[3].submissions
            }
        ];

        cardStatsContainer.innerHTML = cardsData.map(
            data => {
                return `<div class="card">
                            <h3>${data.label}</h3>
                            <p>${data.value}</p>
                        </div>`
            }
        )
    }

    function displayUserData(parsedData){
        const totalQues = parsedData.data.allQuestionsCount[0].count;
        const totalEasyQues = parsedData.data.allQuestionsCount[1].count;
        const totalMediumQues = parsedData.data.allQuestionsCount[2].count;
        const totalHardQues = parsedData.data.allQuestionsCount[3].count;

        const solvedTotalQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[0].count;
        const solvedTotalEasyQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[1].count;
        const solvedTotalMediumQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[2].count;
        const solvedTotalHardQues = parsedData.data.matchedUser.submitStats.acSubmissionNum[3].count;

        updateProgress(solvedTotalEasyQues, totalEasyQues, easyLabel, easyProgressCircle);
        updateProgress(solvedTotalMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);
        updateProgress(solvedTotalHardQues, totalHardQues, hardLabel, hardProgressCircle);
    }

    searchButton.addEventListener('click', function(){
        const username = userInput.value;
        console.log("Username : ", username);
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    })
})