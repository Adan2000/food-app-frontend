const BASE_URL = "http://localhost:3000"
const USER_URL = `http://localhost:3000/users`
const REVIEW = `http://localhost:3000/reviews`

document.addEventListener('DOMContentLoaded', () => {

    getReviews()

    function getReviews(){
        fetch(REVIEW)
        .then(resp => resp.json())
        .then(resp => console.log(resp))
    }
     
    const submitForm = document.querySelector('.submit')

    // submitForm.addEventListener('submit', function(e){
    //     e.preventDefault()
    //     let review = {
    //         "user": review.target.name
    //     }
    // })


})

