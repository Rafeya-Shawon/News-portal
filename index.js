    const dataLoad = () => {
    const url = "https://openapi.programming-hero.com/api/news/categories"
    fetch(url)
        .then(res => res.json())
        .then(data => Category(data.data.news_category))
        .catch(error => console.log(error));

}

    const Category = (categories) => {
    const ul = document.getElementById("container-ul");

    categories.forEach(category => {
        const {category_id, category_name } = category;
        const li = document.createElement('li');
        li.classList.add('inline-block')
        li.innerHTML = ` <li class="d-inline-block"><button onclick="loadCategory(${category_id} , 
        '${category_name}')" class="background">${category_name}</button> </li>`
        ul.appendChild(li);
    })
}

    const loadCategory = async (id, name) => {
    
    const spinner = document.getElementById('spinnerLoad');
    spinner.classList.remove('d-none')
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data, name))
        .catch(error => console.log(error));
}

    const displayCategory = (allNews, name) => {
    const allDatas = [...allNews]
    const newNews = allDatas.sort((x, y) => {
        return y.total_view - x.total_view;
    })
    const foundItem = document.getElementById('foundNewsNumber');
    foundItem.innerHTML = ``;
    const newsLength = newNews.length;
    foundItem.innerHTML = `<h6 class="bg-white p-3 rounded" > ${newsLength} items found 
    for category ${name}</h6> `

    const noFound = document.getElementById('noNews')
    noFound.innerHTML = ``
    if (newsLength === 0) {
        noFound.innerHTML = `<h1 class="bg-white text-center p-3" >No News available</h1> `
    }

    const spinner = document.getElementById('spinnerLoad');
    spinner.classList.add('d-none');
    const containerCard = document.getElementById('containerCard')
    containerCard.innerHTML = ` `;
    newNews.forEach(news => {
        const {_id, title, details, image_url, total_view} = news;
        const divCard = document.createElement('div');
        divCard.innerHTML = `
        <div class="card mb-3 w-100" style="min-width: 200px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${image_url}" class="img-fluid rounded-start h-100" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title fs-3">${title}</h5>
                    <p class="card-text">${details.length > 400 ? details.slice(0, 400) + '...' : details}</p>
                    <div class="d-flex mb-3 align-items-center justify-content-evenly">
                        <div class="p-1">
                            <img class="author-pic" src="${news.author.img}" alt="">
                        </div>
                        <div>
                            <p class="d-inline">${news.author.name ? news.author.name : 'No Information'}</p> <br>
                            <p class="d-inline">${news.author.published_date ? news.author.published_date : 'Data Not Found'}</p> <br>
                        </div>
                    
                        <div class="p-3">
                        <i class="bi bi-eye-fill"></i> <span class="px-2">${total_view ? total_view : 'No Information'}</span>
                    
                        </div>
                        <div class="p-3 text-dark d-none d-md-block">
                        <i class="bi bi-star-half"></i>
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                        <i class="bi bi-star"></i>
                        </div>                  
                        <button onclick="loadDetails('${_id}')"  type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#seeDetailsModal">Details</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
        `

        containerCard.appendChild(divCard)

    })


}


const loadDetails = (newsid) => {

    const url = `https://openapi.programming-hero.com/api/news/${newsid}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showDetails(data.data[0]))
        .catch(error => console.log(error));


}

const showDetails = (detailsNews) => {
    const {title, details, thumbnail_url, total_view } = detailsNews;
    const titleModal = document.getElementById('seeDetailsModalLabel')
    titleModal.innerHTML = `${title}`
    const bodyModal = document.getElementById('bodyModal');
    bodyModal.innerHTML = ``;
    const cardDiv = document.createElement('div')
    cardDiv.innerHTML = `
    <div class="card" style="width:100%">
        <img src="${thumbnail_url}" class=" modal-pic" alt="...">
            <div class="card-body">
            <p class="card-text">${details.length > 400 ? details.slice(0, 400) + '...' : details}</p>
                <div class="d-flex mb-1 align-items-center justify-content-evenly">
                        <div class="p-1">
                            <img class="author-pic" src="${detailsNews.author.img}" alt="">
                        </div>
                        <div>
                            <p class="d-inline">${detailsNews.author.name ? detailsNews.author.name : 'No Information'}</p> <br>
                            <p class="d-inline">${detailsNews.author.published_date ? detailsNews.author.published_date : 'No Information'}</p> <br>
                        </div>
                        <div class="p-1">
                        <i class="bi bi-eye"></i><span class="px-2">${total_view ? total_view : 'No Information'}</span>
                        </div>
                    </div>
  </div>
</div>`
bodyModal.appendChild(cardDiv)
}
dataLoad();