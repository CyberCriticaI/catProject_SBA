const apiKey = 'live_j9WiroNHYOWAcY6Ut7lZo3Bq37cnCrwA1ELG57MpJkHXtAexzZW7ewM5YIyQb4NC';
const apiUrl = 'https://api.thecatapi.com/v1/images/search';

document.addEventListener('DOMContentLoaded', () => {
    const catImgElement = document.getElementById('cat-img');
    const likeBtn = document.getElementById('like-btn');
    const dislikeBtn = document.getElementById('dislike-btn');

    async function fetchCatImage() {
        try {
            const response = await fetch(apiUrl, {
                headers: {
                    'x-api-key': apiKey
                }
            });
            const data = await response.json();
            if (data && data[0] && data[0].url) {
                catImgElement.src = data[0].url;
            } else {
                console.error('Unexpected data format:', data);
            }
        } catch (error) {
            console.error('Error fetching cat image:', error);
        }
    }

    function animateButton(button) {
        button.classList.add('clicked');
        setTimeout(() => button.classList.remove('clicked'), 300);
    }

    fetchCatImage();

    likeBtn.addEventListener('click', async () => {
        console.log('Cat liked!');
        animateButton(likeBtn);
        await fetchCatImage();
    });

    dislikeBtn.addEventListener('click', async () => {
        console.log('Cat disliked!');
        animateButton(dislikeBtn);
        await fetchCatImage();
    });
});