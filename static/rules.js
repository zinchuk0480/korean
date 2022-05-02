articleTitle = document.querySelectorAll('.article_title')
lessonLink = document.querySelectorAll('.lesson_link')
menuList = document.querySelector('.menu_list')

function addMenu(){
    for (let i = 0; i < articleTitle.length; i++){
        menuList.innerHTML += `<li class="menu_element"> ${lessonLink[i].innerText} ${articleTitle[i].innerText} </li>`
    }
}
addMenu()

menuElement = document.querySelectorAll('.menu_element')
for (let i = 0; i < menuElement.length; i++){
    menuElement[i].onclick = function(){
        window.scrollTo(articleTitle[i].getBoundingClientRect().y + window.pageYOffset - 100)
    }
}