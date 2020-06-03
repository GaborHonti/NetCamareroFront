var app = new Vue({
    el: '#app',
    data: {
        logged: 0 , //por defecto no esta logueado
        valor: '',
        categorias: [],
        localidades: []
    },
    created () { //estas logueado?
       token = localStorage.getItem("token");
       if(token != null){
           this.logged = 1; //esta logged el user
       }
       this.cargaCategorias();
       this.cargaLocalidades();
    },
    methods: {
        salir: function(){
            localStorage.removeItem("token");
            location.reload();
        },
        //Lógica para buscar: >>>> guardamos en el localstorage el criterio y el valor, para en la siguiente página hacer la consulta.
        busca(){
            //obtenemos el valor del select
            var criterio = document.getElementById("selectCriterio").value;
            //obtenemos el valor del input
            var intro = this.valor;
            //guardamos los valores para poder trabajarlos posteriormente
            localStorage.setItem("crit", criterio);
            localStorage.setItem("val", intro);
            //location.replace('/busca');
        },
        buscaCat(category){
            //obtenemos el valor del cat
            var intro = this.valor;
            //guardamos los valores para poder trabajarlos posteriormente
            localStorage.setItem("crit", 'categoria');
            localStorage.setItem("val", category);
            //location.replace('/busca');
        },
        buscaLoc(city){
            //obtenemos el valor del loc
            var intro = this.valor;
            //guardamos los valores para poder trabajarlos posteriormente
            localStorage.setItem("crit", 'localidad');
            localStorage.setItem("val", city);
            //location.replace('/busca');
        },
        cargaCategorias: function(){
            axios
            .get(localStorage.getItem('URL_API') + 'categories')
            .then((response) => {
                this.categorias = response.data.data
            })
        },
        cargaLocalidades: function(){
            axios
            .get(localStorage.getItem('URL_API') + 'cities')
            .then((response) => {
                this.localidades = response.data.data
            })
        },

    }
})
