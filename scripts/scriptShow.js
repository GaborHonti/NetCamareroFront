var app = new Vue({
    el: '#app',
    data: {
      info: 'LOADING...',
      id: 0,
      esFav: 0,
      miID: '',
      token: '',
      comments: [],
      commentContent: ''
    },
    mounted () {
        //LOGIC ---> not logged: -1, not fav= 0, yes fav = 1
        this.token = localStorage.getItem("token");
           axios
          .get('http://netcamareroapi.test/api/restaurants/'+this.id)
          .then(response => {
              this.info = response.data.data;
              this.cargaComments();
              if(this.token != null){
              axios.get('http://netcamareroapi.test/api/userinfo/', {
                headers: {
                    'Accept':'application/json',
                    'Authorization':'Bearer '+this.token}})
                .then((response) => {
                this.miID = response.data.id;
                axios.get('http://netcamareroapi.test/api/restaurants/esFav/'  + this.miID + '/' + this.info.id)
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
            axios.post('http://netcamareroapi.test/api/favs/', {
               user: this.miID,
               restaurant: this.info.id
            })
            .then(response => {
                console.log(response);
                this.esFav = '1';
            })
            .catch(error => {
                console.log(error);
                alert("fallo al crear favoritos");
            });
        },
        postComment: function(){
            axios.post('http://netcamareroapi.test/api/comments/', {
               user: this.miID,
               restaurant: this.info.id,
               content: this.commentContent
            })
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
            

            axios.post('http://netcamareroapi.test/api/restaurants/like',
                /* Aqui va el contenido a enviar en el PUT */
                { "user": this.miID ,
                  "restaurant" : this.info.id},
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.token } })
                .then(response => {
                    console.log(response)
                    if(response.data == 'ya esta liked'){
                        alert(response.data)
                    } else{
                        location.reload();
                    }
                    
                })
                .catch(() => {
                    console.log(response)
                })
        },
        cargaComments: function(){
            axios.get('http://netcamareroapi.test/api/restaurants/comments/' + this.info.id)
             .then(response => {
                 console.log(response.data.data);
                 this.comments = response.data.data;
             })
             .catch(error => {
                 console.log(error);
                 alert("fallo al cargar comentarios");
             });
        }
    },
})
