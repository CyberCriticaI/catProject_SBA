const apiKey = 'live_j9WiroNHYOWAcY6Ut7lZo3Bq37cnCrwA1ELG57MpJkHXtAexzZW7ewM5YIyQb4NC';
const apiUrl = 'https://api.thecatapi.com/v1/images/search';

document.addEventListener('DOMContentLoaded', () => {
    const catImgElement = document.getElementById('cat-img');
    const likeBtn = document.getElementById('like-btn');
    const dislikeBtn = document.getElementById('dislike-btn');
    const likedFeed = document.getElementById('liked-feed');
    const mainContent = document.getElementById('main-content');
    const viewMainBtn = document.getElementById('view-main');
    const viewFeedBtn = document.getElementById('view-feed');

    // API //

    let currentCatImage = '';
    let likedImages = [];

    async function fetchCatImage() {
        try {
            const response = await fetch(apiUrl, {
                headers: {
                    'x-api-key': apiKey
                }
            });
            const data = await response.json();
            if (data && data[0] && data[0].url) {
                currentCatImage = data[0].url;
                catImgElement.src = currentCatImage;
            } else {
                console.error('Unexpected data format:', data);
            }
        } catch (error) {
            console.error('Error fetching cat image:', error);
        }
    }

// Functions //

    function animateButton(button) {
        button.classList.add('clicked');
        setTimeout(() => button.classList.remove('clicked'), 300);
    }

    function addToLikedFeed(imageUrl) {
        likedImages.push(imageUrl);
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        likedFeed.appendChild(imgElement);
    }

    function showMainContent() {
        mainContent.classList.remove('hidden');
        likedFeed.classList.add('hidden');
    }

    function showLikedFeed() {
        mainContent.classList.add('hidden');
        likedFeed.classList.remove('hidden');
    }

    fetchCatImage();

    likeBtn.addEventListener('click', async () => {
        console.log('Cat liked!');
        animateButton(likeBtn);
        addToLikedFeed(currentCatImage);
        await fetchCatImage();
    });

    dislikeBtn.addEventListener('click', async () => {
        console.log('Cat disliked!');
        animateButton(dislikeBtn);
        await fetchCatImage();
    });

    viewMainBtn.addEventListener('click', showMainContent);
    viewFeedBtn.addEventListener('click', showLikedFeed);
});