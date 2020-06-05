var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      logged: 0,
    },
    created(){
        this.getRestaurantes(1);
        token = localStorage.getItem("token");
        if(token != null){
           this.logged = 1; //esta logged el user
        }
    },
    /*mounted () {
        axios
          .get('api/restaurants')
          .then(response => {(this.message = response.data.restaurantes.data),
        this.pagination = response.data.pagination})
    },*/
    methods: {
        getRestaurantes: function(page){
            axios
            .get(localStorage.getItem('URL_API') + 'categories')
            .then(response => {(this.message = response.data.data)
          })
        },
        salir: function(){
            localStorage.removeItem("token");
            location.reload();
        }
    },
   
})
