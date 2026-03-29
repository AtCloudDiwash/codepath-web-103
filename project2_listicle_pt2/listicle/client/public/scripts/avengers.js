if (document.getElementById('main-content')) {

    const heroSection = document.getElementById("hero-section");
    const avengersSection = document.getElementById("avengers-section");
    const heroTextRegion = document.getElementById("hero-text-region");

    const exploreStudioButton = document.createElement("button");
    exploreStudioButton.classList.add("explore-studion-btn");
    exploreStudioButton.textContent = "Explore Studio";

    exploreStudioButton.addEventListener("click", () => {
        window.location.href = "#avengers-section";
    });

    heroTextRegion.appendChild(exploreStudioButton);

    const cardWrapper = document.createElement("div");
    cardWrapper.classList.add("card-wrapper");
    avengersSection.appendChild(cardWrapper);

    const renderAvengers = async () => {
        const url = '/avengers';
        const response = await fetch(url);
        const data = await response.json();
        const mainContent = document.getElementById('main-content');

        cardWrapper.innerHTML = '';

        if (data && data.length > 0) {
            data.map(avenger => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.style.setProperty('--card-bg', `url("${avenger.image}")`);

                cardWrapper.appendChild(card);

                const topContainer = document.createElement('div');
                topContainer.classList.add('top-container');
                card.appendChild(topContainer);

                const avengerName = document.createElement("h3");
                avengerName.classList.add("avenger-name");
                avengerName.innerText = avenger.name;
                topContainer.appendChild(avengerName);

                const bottomContainer = document.createElement("div");
                bottomContainer.classList.add('bottom-container');
                card.appendChild(bottomContainer);

                const readMoreButton = document.createElement("button");
                readMoreButton.classList.add("read-more-btn");
                readMoreButton.innerText = "Read More";
                bottomContainer.appendChild(readMoreButton);

                readMoreButton.addEventListener("click", () => {
                    location.href = `/avengers/${avenger.id}`;
                });

            })
        }
        else {
            const noDataMsg = document.createElement("h2");
            noDataMsg.textContent = "No Avengers Found 😞";
            cardWrapper.appendChild(noDataMsg);
        }
    }



    renderAvengers();

}

if (document.getElementById("avenger-content")) {
    const avengerContent = document.getElementById("avenger-content");
    const avengerProfileCard = document.createElement("div");
    avengerProfileCard.classList.add("profile-card");
    avengerContent.appendChild(avengerProfileCard);

    const avengerName = document.createElement("h2");
    avengerName.innerText = "";
    avengerName.classList.add("avenger-name");
    avengerProfileCard.appendChild(avengerName);

    const avengerDescription = document.createElement("p");
    avengerDescription.innerText = "";
    avengerDescription.classList.add("avenger-description");
    avengerProfileCard.appendChild(avengerDescription);

    const avengerFavorite = document.createElement("p");
    avengerFavorite.innerText = "";
    avengerFavorite.classList.add("avenger-favorite");
    avengerProfileCard.appendChild(avengerFavorite);

    const avengerImage = document.createElement("img");
    avengerImage.src = ""
    avengerImage.classList.add("avenger-image");
    avengerProfileCard.appendChild(avengerImage);

    const renderAvenger = async (requestedId = "") => {
        const requestedID = window.location.href.split('/').pop();
        const response = await fetch(`/avengers/api/${requestedID}`);
        let avenger = await response.json();
        avenger = avenger[0];

        if (avenger) {
            document.querySelector(".avenger-image").src = avenger.image
            document.querySelector(".avenger-name").innerText = 'Name: ' + avenger.name;
            document.querySelector(".avenger-description").innerText = 'Description: ' + avenger.description;
            document.querySelector(".avenger-favorite").innerText = 'Favorite Food: ' + avenger.favoritefood;
            document.title = `Marvel - ${avenger.name}`
        }
        else {
            window.location.href = '../404.html';
        }
    }

    const requestedUrl = window.location.href.split('avengers/').pop();
    if (requestedUrl) {
        renderAvenger();
    } else {
        window.location.href = '../404.html';
    }

}

window.addEventListener('avengerSearch', async (e) => {
    const response = await fetch(`/avengers/api/search/${e.detail}`);
    if (response.status === 404) {
        window.location.href = '../404.html';
    } else if (response.status === 200) {
        const avenger = await response.json();
        window.location.href = `/avengers/${avenger[0].id}`;
    }
});


