const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];


// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
// const KEY = '20324498-2e78cac124312b57986ec341c';

// add enter key-----------------
document.getElementById('search').addEventListener('keypress', function(event) {
    if (event.key == 'Enter') {
        searchBtn.click();
    }
});


// Search image by name-------------------
searchBtn.addEventListener('click', function() {
    document.querySelector('.main').style.display = 'none';
    clearInterval(timer);
    const search = document.getElementById('search');
    getImages(search.value)
    sliders.length = 0;
})

// Calling API from pixabay.com----------------
const getImages = (query) => {

    fetch(`https://pixabay.com/api/?key=20324498-2e78cac124312b57986ec341c&q=${query}&image_type=photo`)
        .then(response => response.json())
        .then(data => showImages(data.hits))
        .catch(err => console.log(err))
}

// Show image on the UI------------
const showImages = (images) => {
        imagesArea.style.display = 'block';
        gallery.innerHTML = '';
        // show gallery title
        galleryHeader.style.display = 'flex';
        images.forEach(image => {

            let div = document.createElement('div');
            div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
            div.innerHTML = ` <img id="image-popup" class="img-fluid img-thumbnail"  onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
            gallery.appendChild(div)
        })
    }
    // SelectIem---------
let slideIndex = 0;
const selectItem = (event, img) => {
    let element = event.target;
    let item = sliders.indexOf(img);
    element.classList.toggle('added');
    if (item === -1) {
        sliders.push(img);

    } else {

        sliders.splice(item, 1);
    }
}


// set timer--------
var timer;
const createSlider = () => {
    // check slider image length
    if (sliders.length < 2) {
        alert('Select at least 2 image.')
        return;
    }
    // crate slider previous next area
    sliderContainer.innerHTML = '';
    const prevNext = document.createElement('div');
    prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
    prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

    sliderContainer.appendChild(prevNext)
    document.querySelector('.main').style.display = 'block';
    // hide image aria
    imagesArea.style.display = 'none';
    const duration = document.getElementById('duration').value || 3000;
    sliders.forEach(slide => {
        let item = document.createElement('div')
        item.className = "slider-item";
        item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
        sliderContainer.appendChild(item)
    })


    if (duration >= 0) {
        changeSlide(0)
        timer = setInterval(function() {
            slideIndex++;
            changeSlide(slideIndex);
        }, duration);

    } else {
        alert('please set valid  duration');
    }

}

// change slider index-------------- 
const changeItem = index => {
    changeSlide(slideIndex += index);

}

// change slide item---------------
const changeSlide = (index) => {
    const items = document.querySelectorAll('.slider-item');
    if (index < 0) {
        slideIndex = items.length - 1
        index = slideIndex;
    };

    if (index >= items.length) {
        index = 0;
        slideIndex = 0;
    }
    items.forEach(item => {
        item.style.display = "none"
    })
    items[index].style.display = "block"
}

sliderBtn.addEventListener('click', function() {
    createSlider()
})

// -------End ------------