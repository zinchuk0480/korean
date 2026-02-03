articleTitle = document.querySelectorAll('.article_title')
lessonLink = document.querySelectorAll('.lesson_link')
article = document.querySelectorAll('article')
menuList = document.querySelector('.menu_list')
menuCaller = document.querySelector('.menu_caller')
containerNav = document.querySelector('.container_nav')


function addMenu(){
	console.log('sldfkj')
    for (let i = 0; i < articleTitle.length; i++){
        menuList.innerHTML += `<li class="menu_element"> ${lessonLink[i].innerText} ${articleTitle[i].innerText} </li>`
    }
}
addMenu()

menuElement = document.querySelectorAll('.menu_element')
for (let i = 0; i < menuElement.length; i++){
  menuElement[i].onclick = function(){
		for (let j = 0; j < menuElement.length; j++){
			menuElement[j].classList.remove('active_menu_element')
			article[j].classList.remove('active_article')
		}
		menuElement[i].classList.add('active_menu_element')
		article[i].classList.add('active_article')
    window.scrollTo(0, articleTitle[i].getBoundingClientRect().y + window.pageYOffset - 100)
    }
}


menuCaller.onclick = function(){
	containerNav.classList.toggle('container_nav_active')
	menuCaller.classList.toggle('menu_caller_active')
}
