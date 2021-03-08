var SearchInput = document.querySelector('#searchinput'),
    ContainerList  = document.getElementById('search-box'),
    ItensList   = document.getElementById('searchlist')
    ListFilms   = document.querySelector('.row')

const ApiKey   = '', // Your Key - https://www.themoviedb.org/settings/api?language=pt-BR
      BashUrl  = 'https://api.themoviedb.org/3/search/movie?',
      Language = 'pt-BR'

var sav = localStorage.getItem('filmeslist')

if(sav){
    ListFilms.innerHTML = sav
    var movie = document.querySelectorAll('.col')
    RemoveFilm(movie, ListFilms)
}

SearchInput.addEventListener('input', (ev) => {

    let QueryString = SearchInput.value

    if(QueryString !== ''){
       axios.get(`${BashUrl}api_key=${ApiKey}&query=${QueryString}&language=${Language}`).then((response) => {

        ContainerList.style.display = 'contents'

           for (let i = 0; i < 5; i++) {

               const element = response.data.results[i];

               var ListItem  = document.createElement('li')
               var TitleText = document.createElement('h2')
               var FavIcon   = document.createElement('i')

               var Poster = (typeof element.poster_path !== 'undefined' ) ? element.poster_path : 'Not Found'
               var Title  = (typeof element.title !== 'undefined' ) ? element.title : 'Not Found'
               var Vote   = (typeof element.vote_average !== 'undefined' ) ? element.vote_average : 'Not Found'

               TitleText.innerHTML = Title
               FavIcon.classList.add('fa-lg')
               FavIcon.classList.add('fa')
               FavIcon.classList.add('fa-heart')
               FavIcon.classList.add('favicon')

               ListItem.setAttribute('title', Title)
               ListItem.setAttribute('vote', Vote)
               ListItem.setAttribute('poster', Poster)

               ListItem.appendChild(TitleText)
               ListItem.appendChild(FavIcon)
              
               ItensList.appendChild(ListItem)

               ItensList.removeChild(ItensList.firstChild) 

               FavIcon.addEventListener('click', (ev) => {

                var movies = document.querySelectorAll('.info h1')

                   if(Verification(ev.target.parentElement.getAttribute('title'), movies)){
               var FilmTitle = ev.target.parentElement.getAttribute('title'),
                   FilmImage = `https://image.tmdb.org/t/p/w500${ev.target.parentElement.getAttribute('poster')}`,
                   VoteFilm  = ev.target.parentElement.getAttribute('vote')

               var DivCol = document.createElement('div')
                   DivCol.classList.add('col')
                   DivCol.classList.add('col-4')

               var DivMovie = document.createElement('div')
                   DivMovie.classList.add('movie')
                   DivMovie.style.backgroundImage = `url(${FilmImage})`
                   DivMovie.style.backgroundSize = 'cover'           

               var DivInfo = document.createElement('div')
                   DivInfo.classlist.add('info')
               var h1 = document.createElement('h1')
               var p =  document.createElement('p')

               h1.innerHTML = FilmTitle
               p.innerHTML = VoteFilm

               DivInfo.appendChild(h1)
               DivInfo.appendChild(p)
               DivMovie.appendChild(DivInfo)
               DivCol.appendChild(DivMovie)

               DivCol.addEventListener('dblclick', (ev)=>{
                DivCol.remove()
                localStorage.setItem('filmeslist', ListFilms.innerHTML)
              })

               ListFilms.appendChild(DivCol)
               localStorage.setItem('filmeslist', ListFilms.innerHTML)

            }else{
               alert('ja está no seus favoritos!')
            } })
           }
           
       }).catch((err) => {
           console.log(err)
       })
    }else{
        ContainerList.style.display = 'none'
    }

})

function RemoveFilm(MovieList, Storage){

    MovieList.forEach((item, index) => {
        item.addEventListener('dblclick', (ev)=>{
            item.remove()
            localStorage.setItem('filmeslist', Storage.innerHTML)
        })
    });
}

function Verification(Attr , MovieList){
    MovieList.forEach((item, index) => {
        if(item.innerHTML == Attr){
         return false
        }else{
            return true
        }
    })
}