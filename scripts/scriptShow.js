var app = new Vue({
    el: '#app',
    data: {
      info: 'LOADING...',
      id: 0,
      esFav: 0,
      miID: '',
      token: '',
      comments: [],
      commentContent: '',
      inicializado: false
    },
    mounted () {
        //LOGIC ---> not logged: -1, not fav= 0, yes fav = 1
        this.token = localStorage.getItem("token");
           axios
          .get(localStorage.getItem('URL_API')+'restaurants/'+this.id)
          .then(response => {
              this.info = response.data.data;
              localStorage.setItem('lat' , this.info.latitud);
              localStorage.setItem('long' , this.info.longitud);
              this.cargaComments();
              if(this.token != null){
              axios.get(localStorage.getItem('URL_API') +'userinfo', {
                headers: {
                    'Accept':'application/json',
                    'Authorization':'Bearer '+this.token}})
                .then((response) => {
                this.miID = response.data.id;
                axios.get(localStorage.getItem('URL_API') + 'restaurants/esFav/'  + this.miID + '/' + this.info.id, {
                    headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.token }
                })
                .then(response => {
                    this.esFav = response.data;
                })
            })
                }else{
                    this.esFav = -1;
                }
          })

          
          //alert(this.esFav);
    },
    created(){
        this.id = localStorage.getItem('id');
    },
    methods: {
        guardaFav: function(){
            axios.post(localStorage.getItem('URL_API') + 'favs', {
               user: this.miID,
               restaurant: this.info.id
            },
            { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.token }})
            .then(response => {
                console.log(response);
                this.esFav = '1';
            })
            .catch(error => {
                console.log(error);
                alert("fallo al crear favoritos");
            });
        },

        quitafav: function(){
            axios.delete(localStorage.getItem('URL_API') + 'restaurants/borraFav/' + this.miID + "/" + this.info.id, {
                 headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.token }
             })
             .then(response => {
                 console.log(response);
                 this.esFav = '0';
             })
             .catch(error => {
                 console.log(error);
                 alert("fallo al borrar favoritos");
             });
        },

        postComment: function(){
            axios.post(localStorage.getItem('URL_API') + 'comments', {
               user: this.miID,
               restaurant: this.info.id,
               content: this.commentContent
            },
            { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.token }})
            .then(response => {
                console.log(response);
                location.reload();
            })
            .catch(error => {
                console.log(error);
                alert("fallo al crear comentario");
            });
        },
        postLike: function(){
            

            axios.post(localStorage.getItem('URL_API') + 'restaurants/like',
                /* Aqui va el contenido a enviar en el PUT */
                { user: this.miID ,
                  restaurant : this.info.id,
                  name: this.info.name},
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.token } })
                .then(response => {
                    console.log(response)
                    if(response.data == 'ya esta liked'){
                        alert(response.data)
                    } else{
                        this.info.likes++;
                    }
                    
                })
                .catch(() => {
                    console.log(response)
                })
        },
        cargaComments: function(){
            axios.get(localStorage.getItem('URL_API') + 'restaurants/comments/' + this.info.id)
             .then(response => {
                 console.log(response.data.data);
                 this.comments = response.data.data;
             })
             .catch(error => {
                 console.log(error);
                 alert("fallo al cargar comentarios");
             });
        },
        salir: function(){
            localStorage.removeItem("token");
            location.reload();
        },
        cargaMapa: function(){
           if( !this.inicializado){

           
            var mymap = L.map('mapid').setView([this.info.latitud, this.info.longitud], 20);

            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiZ2Fib3JsdiIsImEiOiJjazM0OHI2eXcweW1sM25xdWphYzRlNDJiIn0.xaxpVAuxAEvFpS85oZJ-Fg'
            }).addTo(mymap);

            var marker = L.marker([this.info.latitud, this.info.longitud]).addTo(mymap);

            marker.bindPopup(this.info.name + '<br>' + this.info.city.name).openPopup();

            this.inicializado = true;

            }
        }
    },
})


