
const searchPhone = () => {
    // To get search input value
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = "";

    // hiding error
    document.getElementById('error-message1').style.display = 'none';

    // showing error
    if (searchText == '') {
        document.getElementById('error-message1').style.display = 'block';
    }
    else {

        // fetching all phones
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data))
    }
}
const displaySearchResult = datas => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    // hiding error
    document.getElementById('error-message2').style.display = 'none';

    // showing error
    if (datas.length == 0) {
        document.getElementById('error-message2').style.display = 'block';
    }
    else {

        // slicing the object
        const items = datas.slice(0, 20)
        items.forEach(data => {
            const div = document.createElement('div')
            div.classList.add('col');
            // Showing results
            div.innerHTML = `
        <div class="card p-3 d-flex justify-content-center align-items-center rounded-3 shadow m-2">
        <img src="${data.image}" class="card-img-top img-fluid mx-auto" alt="..." style="width:220px;height:280px;">
        <div class="card-body">
            <h5 class="card-title">${data.brand}</h5>
            <h5 class="card-title">${data.phone_name}</h5>
        </div>
        <div>
        <button onclick="loadPhoneDetail('${data.slug}')" class="btn btn-success" type="button" id="button-search">Details</button>
        </div>
         </div>
        `;
            searchResult.appendChild(div);
        })
    }
}

// fetching details
const loadPhoneDetail = phoneId => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetails(data.data))
}

// Details section
const displayPhoneDetails = phone => {

    // adding eventlishener
    const phoneDetails = document.getElementById('phone-details')
    const div = document.createElement('div')
    phoneDetails.textContent = '';
    div.classList.add('card')

    // Checking Release Date
    const releaseDate = phone?.releaseDate;
    let dateGiven = '';
    if (releaseDate == '') {
        dateGiven = "Will be available soon";
    }
    else {
        dateGiven = releaseDate;
    }

    // Checking others property
    const others = phone?.others;
    let othersGiven = [];
    if (others) {
        othersGiven = others;
    }
    else {
        othersGiven = phone.others = { WLAN: 'Not given', Bluetooth: 'Not given', GPS: 'Not given', NFC: 'Not given', Radio: 'Not given', USB: 'Not given' }
    }

    // Showing the details section
    div.innerHTML = `
        <div class="shadow  d-flex justify-content-center align-items-center">
            <div class="col-md-4 p-5">
                <img src="${phone.image}" class="img-fluid mx-auto my-auto" alt="..." style="width:220px;height:280px;">
            </div>
            <div class="card-body list-group-item">
                <h5 class="card-title">${phone.brand}</h5>
                <h5 class="card-title">${phone.name}</h5>
                <p class="card-text"><span class="fw-bold">Release Date: </span>${dateGiven}</p>
                <p class="card-text"><span class="fw-bold">Main Features</p>
                <p class="card-text"><span >Sensors: </span>${phone.mainFeatures.sensors}</p>
                <p class="card-text"><span >Display: </span>${phone.mainFeatures.displaySize}</p>
                <p class="card-text"><span >Chipset: </span>${phone.mainFeatures.chipSet}</p>
                <p class="card-text"><span >Memory: </span>${phone.mainFeatures.memory}</p>
                <p class="card-text"><span >Storage: </span>${phone.mainFeatures.storage}</p>
                <p class="card-text"><span class="fw-bold">Other Features</p>
                <p class="card-text"><span >WLAN: </span>${othersGiven.WLAN}</p>
                <p class="card-text"><span >Bluetooth: </span>${othersGiven.Bluetooth}</p>
                <p class="card-text"><span >Radio: </span>${othersGiven.Radio}</p>
                <p class="card-text"><span >USB: </span>${othersGiven.USB}</p>
                <p class="card-text"><span >GPS: </span>${othersGiven.GPS}</p>
                <p class="card-text"><span >NFC: </span>${othersGiven.NFC}</p>
            </div>
                
                
        </div>
        `


    phoneDetails.appendChild(div)
    document.documentElement.scrollTop = 0;
}
