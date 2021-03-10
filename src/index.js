const BASE_URL = "http://localhost:3000"
const USER_URL = `http://localhost:3000/users`
const REVIEW = `http://localhost:3000/reviews`
let currentUser = {id:1}


document.addEventListener('DOMContentLoaded', () => {


    //FETCHING REVIEWS
    function getReviews(){
        fetch(REVIEW)
        .then(resp => resp.json())
        .then(resp => console.log(resp))
    }
    getReviews()
    //SUBMIT FORM
    let submitForm = document.querySelector('.submit')
    //USER FORM
    let userForm = document.querySelector('.user-name')

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
        }
        console.log(review)
        // postReview(review)
    }
    //SETTING USER VALUES
    function userF(e){
        e.preventDefault()
        let user = {
            "user_name": e.target.name.value
        }
        console.log(e.target.name.value)
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
        .then(console.log)
        .catch(error => console.log(error))
    }

    function saveUser(user){
        fetch(USER_URL, {
            method: 'POST',
            headers: {
                'Content-type':'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(console.log)
        .catch(error => console.log(error))
    }

})


