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
        }
        postReview(review)
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
        .catch(error => console.log(error))
    }


    //DOM REVIEW POST
    function buildReview(review){
        // let form = document.createElement('form')
        let div = document.createElement('div')
        let rName = document.createElement('h2')
        let fName = document.createElement('h3')
        // let rReview = document.createElement('textarea')
        // let userN = document.createElement('h4')

        let delbtn = document.createElement('button')
        // // let updbtn = document.createElement('button')

        // form.className = 'review'

        rName.innerText = review.restaurant_name
        fName.innerText = review.food_name
        // rReview.innerText = review.food_review
        // userN.innerText = review.user.name

        // updbtn.innerText = 'UPDATE'
        delbtn.innerText = 'DELETE'
 

        // ul.append(rName, fName, rReview, userN)

        // form.appendChild(ul)
        // form.append(delbtn) //updbtn

        // main.appendChild(form)

 

        delbtn.addEventListener('click',(e) => deleteRev(e, review.id))

        // updbtn.addEventListener('click', (e) => updateRev(e, review.id))

        let updForm = document.createElement('form')
        // let rlabel = document.createElement('label')
        let rinput = document.createElement('textarea')
        let subinput = document.createElement('input')


        //UPDATE FORM
        updForm.className = 'review'
        // updForm.id = review.id

        rinput.innerText = review.food_review
        rinput.name = "name"
        subinput.type = "submit"
        subinput.value = "Submit"

        updForm.append(rName, fName, rinput, subinput)
        main.append(updForm, delbtn)

        updForm.addEventListener('submit', (event) => updateRev(event, review.id))
        // console.log(review.id)
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

})


