const BASE_URL = "http://localhost:3000"
const USER_URL = `http://localhost:3000/users`
const REVIEW = `http://localhost:3000/reviews`
let currentUser = {id:1}


document.addEventListener('DOMContentLoaded', () => {

    //FETCHING REVIEWS
    function getReviews(){
        fetch(REVIEW)
        .then(resp => resp.json())
        .then(reviews => {
            reviews.forEach(review => {
                buildReview(review)
            })
        })
    }

    function getUsers(){
        fetch(USER_URL)
        .then(resp => resp.json())
        .then(users => {
            users.forEach(user => {
                buildDrop(user)
            })
        })
    }

    getUsers()
    getReviews()

    //SUBMIT FORM
    let submitForm = document.querySelector('.submit')
    //USER FORM
    let userForm = document.querySelector('.user-name')
    //REVIEW POST
    let main = document.querySelector('main')

    //SUBMIT EVENT LISTENTER
    submitForm.addEventListener('submit',submitF)
    //USER EVENT LISTENER 
    userForm.addEventListener('submit',userF)

    //SETTING REVIEW VALUES
    function submitF(e){
        e.preventDefault()
        let review = {
            "restaurant_name": e.target.restaurant.value,
            "food_name": e.target.food.value,
            "food_review": e.target.review.value,
            "user_id": e.target.users.value
        }
        console.log()
        postReview(review)
    }


    function buildDrop(user) {
        let dropdown = document.getElementById('users')
            let options = document.createElement('option')
            options.innerText = user.name
            options.value = user.id
            dropdown.appendChild(options)
    }




    //SETTING USER VALUES
    function userF(e){
        e.preventDefault()
        let user = {
            "user_name": e.target.name.value
        }
        saveUser(user)
    }

    //POST (REVIEW)
    function postReview(review){
        fetch(REVIEW, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({review})//same as {review:review}
        })
        .then(res => res.json())
        .then(review => {
            buildReview(review)
        })
        .catch(error => console.log(error))
    }
    //DELETE(REVIEW)
    function deleteRev(e, review_id){
        e.preventDefault()
        fetch(REVIEW + `/${review_id}`, {
            method: 'DELETE'
            })
        .then(resp => resp.json())
        .then(() => {
            let oldRev = document.querySelector('.review')
            oldRev.remove()
        })
        }
    //POST (USER)
    function saveUser(user){
        fetch(USER_URL, {
            method: 'POST',
            headers: {
                'Content-type':'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(error => console.log(error))
    }

        //PATCH REVIEW
    function updateRev(e, id){
        e.preventDefault()
        const newReview = e.target[0].value
        const updateR = {
            "food_review": newReview
        }
        fetch(REVIEW + `/${id}`,{
            method: 'PATCH',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(updateR)
        })
        .then(res => res.json())
    }

    //DOM REVIEW POST
    function buildReview(review){

        let restName = document.createElement('h2')
        let foodName = document.createElement('h3')
        let delbtn = document.createElement('button')
        let usern = document.createElement('h3')

        usern.innerText = `from: ${review.user.name}`
        restName.innerText = review.restaurant_name
        foodName.innerText = review.food_name
        delbtn.innerText = 'DELETE'
        
    
 

        delbtn.addEventListener('click',(e) => deleteRev(e, review.id))



        let updForm = document.createElement('form')
        let restinput = document.createElement('textarea')
        let subbtn = document.createElement('input')


        //UPDATE FORM
        updForm.className = 'review'

        restinput.innerText = review.food_review
        restinput.name = "name"
        subbtn.type = "submit"
        subbtn.value = "Submit"

        updForm.append(restName, foodName, restinput, subbtn, usern)
        main.append(updForm, delbtn)

        updForm.addEventListener('submit', (event) => updateRev(event, review.id))
    }


})


