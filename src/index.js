const BASE_URL = "http://localhost:3000"
const USER_URL = `http://localhost:3000/users`
const REVIEW = `http://localhost:3000/reviews`
let currentUser = {id:1}


document.addEventListener('DOMContentLoaded', () => {

    getReviews()


z
    function getReviews(){
        fetch(REVIEW)
        .then(resp => resp.json())
        .then(resp => console.log(resp))
    }
     
    //selecting form
    let submitForm = document.querySelector('.submit')
    //adding event listener
    submitForm.addEventListener('submit',submitF)
    
    //setting the value
    function submitF(e){
        e.preventDefault()
        let review = {
            "restaurant_name": e.target.restaurant.value,
            "food_name": e.target.food.value,
            "food_review": e.target.review.value, 
            "user_id": currentUser.id 
        }
        console.log(review)
        postReview(review)
    }

    //POST
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

})


