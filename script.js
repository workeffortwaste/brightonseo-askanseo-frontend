let question;
let answerbox = document.getElementById('answer');

document.getElementById('question').focus();
// Allow the button to query the API.
document.getElementById("button").addEventListener("click", function(event){
    event.preventDefault();
    question = document.getElementById('question').value;
    fetchAnswer();
});

function updateAnswer(response){
    answerbox.innerText = response
}

function fetchAnswer() {
    document.getElementById('hiddenanswer').classList.add('revealanswer');
    document.getElementById('answer').innerText = '..';
    fetch('https://api.askanseo.dev/?question=' + question)
        .then(response => {
            // Throw an error if we didn't receive a valid 200 response.
            if (!response.ok) {
                throw Error();
            }
            // If we received a valid 200 response then pass on the json data.
            return response.json();
        })
        .then(json => {
            updateAnswer(json.answer);
        })
        .catch(error => {
            // We didn't receive a valid 200 response. Handle our error.
        });
}
function updatePlaceholder(){
    let w = document.documentElement.clientWidth || document.body.clientWidth || window.innerWidth ;
    console.log(w);
    if (w < 410) {
        document.getElementById('question').placeholder='Your question.';
    } else {
        document.getElementById('question').placeholder='Ask an SEO a question.';
    }
}
window.addEventListener('resize', function() {
    updatePlaceholder();
});
updatePlaceholder();
