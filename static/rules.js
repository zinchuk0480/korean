articleTitle = document.querySelectorAll('.article_title')
lessonLink = document.querySelectorAll('.lesson_link')
menuList = document.querySelector('.menu_list')

function addMenu(){
    for (let i = 0; i < articleTitle.length; i++){
        menuList.innerHTML += `<li class="menu_element"> ${lessonLink[i].innerText} ${articleTitle[i].innerText} </li>`
    }
}

addMenu()