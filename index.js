
let inputSearchValueGlobal = ""; // Declaring a global variable to store the search input value

function init() { // Function to initialize the application
    const usersListDiv = document.getElementById("usersList") // Getting the reference to the users list div
    usersListDiv.style.border = "1px solid black" // Setting some CSS properties for styling purposes
    usersListDiv.style.background = "pink"
    usersListDiv.style.textAlign = "center"
    draw(users) // Drawing the initial list of users
}

function clearUsers() {  // Function to clear the users list
    document.getElementById("usersList").innerHTML = ""; // Clearing the inner HTML of the users list div
}

function draw(ud) { // Function to draw the list of users
    clearUsers() // Clearing the users list first
    const usersData = ud.filter(user => user.name.first.toLowerCase().includes(inputSearchValueGlobal.toLowerCase()) || user.name.last.toLowerCase().includes(inputSearchValueGlobal.toLowerCase())); // Filtering the users based on the search input value
    const uiUsers = usersData.map(user => getSingleUserUI(user));// Mapping the filtered users data to user interface elements
    document.getElementById("usersList").append(...uiUsers); // Appending the UI elements to the users list div
    updateSelectedUsers(usersData.filter(user => user.isSelected === true)); // Updating the selected users count and total result count
    updateTotalResult(usersData.length);
}

function search() { // Function to handle the search operation
    const input = document.getElementById("searchInput") //[input = ELEMENT INPUT FROM DOM] // Getting the search input element
    const searchValue = input.value; // Getting the search value
    inputSearchValueGlobal = input.value; // Updating the global search value
    const newUsersArray = users.filter(user => user.name.first.toLowerCase().includes(searchValue.toLowerCase()) || user.name.last.toLowerCase().includes(searchValue.toLowerCase()));// Filtering the users based on the search value and redrawing the list
    draw(newUsersArray);

}


function resetResult() { // Function to reset the search result
    document.getElementById("searchInput").value = ""; // Clearing the search input value
    inputSearchValueGlobal = ""; // Resetting the global search value
    draw(users); // Redrawing the list with all users

}

function updateTotalResult(lengthOfUsers) { // Function to update the total result count
    document.getElementById("totalResult").innerHTML = `${lengthOfUsers}/${users.length}`// Updating the total result count displayed in the UI

}

function updateSelectedUsers(arrayOfSelectedUsers) { // Function to update the selected users count
    const selectedUsersContainer = document.getElementById("selectedUsersNumber"); // Updating the selected users count displayed in the UI
    selectedUsersContainer.innerText = arrayOfSelectedUsers.length;
}

function getSingleUserUI(userData) { // Function to create a single user UI element
    if (typeof userData !== 'object') return; // making sure there is no bullshit cin the list

    const userContainerDiv = document.createElement("div"); // create the single user container div

    const id = `${userData.name.first.toLowerCase()}-${userData.name.last.toLowerCase()}`;// Generating an id for the user container div
    userContainerDiv.id = id;
    userContainerDiv.className = "user-card";

    const userName = document.createElement("h3"); // Creating and setting up the user name heading
    userName.innerText = `${userData.name.first} ${userData.name.last}`; // insert the name from the Data into UI 

    const gender = document.createElement("h5");
    gender.innerText = `${userData.gender}`;

    const email = document.createElement("a");
    email.href = `mailto:${userData.email}`;
    email.innerText = `${userData.email}`;

    const phone = document.createElement("a");
    phone.href = `tel:${userData.phone}`;
    phone.innerText = `tel:${userData.phone}`;

    const cell = document.createElement("a");
    cell.href = `tel:${userData.cell}`;
    cell.innerText = `tel:${userData.cell}`;

    const picture = document.createElement("img");
    picture.src = userData.picture.large;
    picture.alt = `${userData.name.first} ${userData.name.last}`;

    // const location = document.createElement("h5")
    // location.innerText = `street:${userData.location.street.name}-${userData.location.street.number}, city:${userData.location.city}, state:${userData.location.state}, country:${userData.location.country}, postcode:${userData.location.postcode}`

    function getLocationElement(userData) {
        const locationDiv = document.createElement("div");
        locationDiv.classList.add("user-location");

        const street = document.createElement("p");
        street.innerText = `Street: ${userData.location.street.name} ${userData.location.street.number}`;

        const city = document.createElement("p");
        city.innerText = `City: ${userData.location.city}`;

        const state = document.createElement("p");
        state.innerText = `State: ${userData.location.state}`;

        const country = document.createElement("p");
        country.innerText = `Country: ${userData.location.country}`;

        const postcode = document.createElement("p");
        postcode.innerText = `Postcode: ${userData.location.postcode}`;

        locationDiv.append(street, city, state, country, postcode);
        return locationDiv;
    }

    const location = getLocationElement(userData);

    const dob = document.createElement("h5")
    dob.innerText = `date of birth and time:${userData.dob.date}, age:${userData.dob.age}`


    function getLoginElement(userData) {
        const loginDiv = document.createElement("div");
        loginDiv.classList.add("user-login");

        const uuid = document.createElement("p");
        uuid.innerText = `uuid: ${userData.login.uuid}`;

        const username = document.createElement("p");
        username.innerText = `user name: ${userData.login.username}`;

        const password = document.createElement("p");
        password.innerText = `password: ${userData.login.password}`;

        const salt = document.createElement("p");
        salt.innerText = `salt: ${userData.login.salt}`;

        const md5 = document.createElement("p");
        md5.innerText = `md5: ${userData.login.md5}`;

        const sha1 = document.createElement("p");
        sha1.innerText = `sha1: ${userData.login.sha1}`;

        const sha256 = document.createElement("p");
        sha256.innerText = `sha256: ${userData.login.sha256}`;

        loginDiv.append(uuid, username, password, salt, md5, sha1, sha256);
        return loginDiv;
    }

    const login = getLoginElement(userData);

    const button = document.createElement("button"); // Creating and setting up the select/unselect button
    button.classList.add("btn", "btn-primary")
    if (userData.isSelected === true) { //if the button is allredy selected then add an option to unselect it
        button.innerText = "UnSelect"
        userContainerDiv.style.background = "yellow"
    } else { //otherwise you can select the user
        button.innerText = "Select"
        userContainerDiv.style.background = "pink"
    }
    // you can also write it shorter like this:
    // button.innerText = userData.isSelected ? "Unselect" : "Select";

    button.addEventListener("click", function () { // Toggling the isSelected property of the user
        if (userData.isSelected === true) {
            userData.isSelected = false;
        } else {
            userData.isSelected = true
        }
        // you can also write it shorter like this:
        // userData.isSelected = !userData.isSelected;

        draw(users); // Redrawing the users list
    });

    const buttonDelete = document.createElement("button"); // Creating and setting up the delete button
    buttonDelete.classList.add("btn", "btn-danger")
    buttonDelete.innerText = "🗑️"
    buttonDelete.addEventListener("click", function () {
        const foundIndex = users.findIndex(user => user.name.first.toLowerCase() === userData.name.first.toLowerCase() && user.name.last.toLowerCase() === userData.name.last.toLowerCase()) // Finding the index of the user from the users array to be deleted
        if (foundIndex > -1) { // Removing the user from the users array
            users.splice(foundIndex, 1)
        }
        draw(users) // Redrawing the users list
    })

    // const yearBadge = document.createElement("h1")
    // yearBadge.classList.add("badge", "badge-secondary")
    // yearBadge.innerText = userData.year


    userContainerDiv.append(picture, userName, gender, dob, email, phone, cell, location, login, button, buttonDelete); // Appending the elements to the user container div

    return userContainerDiv;

}
init(); // Initializing the application
