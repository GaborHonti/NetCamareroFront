var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!',
      logged: 0,
      esAdmin: 0,
      pagination:{
        'total': 0,
        'current_page': 0,
        'per_page': 0,
        'last_page': 0,
        'from': 0,
        'to': 0,
      },
    },
    created(){
        this.getRestaurantes(1);
        token = localStorage.getItem("token");
        if(token != null){
           this.logged = 1; //esta logged el user
        }
        this.esAdmin = localStorage.getItem('esAdmin');
    },
    /*mounted () {
        axios
          .get('api/restaurants')
          .then(response => {(this.message = response.data.restaurantes.data),
        this.pagination = response.data.pagination})
    },*/
    methods: {
        moveURL : function(id){
            console.log(id);
            localStorage.setItem('id',id);
            location.href='show.html';
        },
        changePage: function(page){
            this.pagination.current_page = page;
            this.getRestaurantes(page);
        },
        getRestaurantes: function(page){
            axios
            .get(localStorage.getItem('URL_API') + 'restaurants?page='+page)
            .then(response => {(this.message = response.data.restaurantes.data),
          this.pagination = response.data.pagination})
        },
        salir: function(){
            localStorage.removeItem("token");
            localStorage.removeItem("esAdmin");
            location.reload();
        }
    },
    computed: {
        isActived: function(){
            return this.pagination.current_page;
        },
        pagesNumber: function(){
            if(!this.pagination.to){
                return [];
            }

            var from = this.pagination.current_page - 2; //TODO offset
            if(from < 1){
                from = 1;
            }

            var to = from + (2*2); //TODO offset
            if(to >= this.pagination.last_page){
                to = this.pagination.last_page;
            }

            var pagesArray = [];
            while(from <= to){
                pagesArray.push(from);
                from++;
            }

            return pagesArray;
        }
    }
})
