var app = new Vue({
    el: '#app',
    data: {
        logged: 0 , //por defecto no esta logueado
        valor: '',
        rsdo : [],
        queEs: '',
        esAdmin: 0,
        imgURL: ''
    },
    created () {
        this.cargaFiltro();
        //estas logueado?
        token = localStorage.getItem("token");
        if(token != null){
            this.logged = 1; //esta logged el user
        }
        this.queEs = localStorage.getItem("val");
        this.esAdmin = localStorage.getItem('esAdmin');
        this.imgURL = localStorage.getItem('URL_API_IMG');
    },
    methods: {
        salir: function(){
            localStorage.removeItem("token");
            localStorage.removeItem("esAdmin");
            location.reload();
        },
        cargaFiltro: function(){
            axios.get(localStorage.getItem('URL_API') + localStorage.getItem("crit") + '/' + localStorage.getItem("val"))
            .then(response => {
                this.rsdo = response.data;
                console.log(this.rsdo);
            })
            .catch(error => {
                console.log(error);
                //alert("fallo al crear favoritos");
            });
        },
        moveURL : function(id){
            console.log(id);
            localStorage.setItem('id',id);
            location.href='show.html';
        },
    }
})
