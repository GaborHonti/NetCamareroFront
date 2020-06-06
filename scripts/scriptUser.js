var app = new Vue({
    el: '#app',
    data: {
      info: 'LOADING...',
      token: '',
      favs: [],
      logged: 0,
      nombreNew: '',
      esAdmin: 0,
      imgURL: ''
    },
    created() {
        $('.editP').click();
        //logica de sacar el token y autenticar el usuario
        var existeToken = this.comprobarExistenciaToken();
        if(existeToken){
            this.sacarDatosUser();
            //this.getFavs();
        }else {
            this.info = "sin acceso";
        }
        this.imgURL = localStorage.getItem('URL_API_IMG');
    },
    methods: {
        comprobarExistenciaToken: function(){

            var hayToken = false;
            this.token = localStorage.getItem("token");
            console.log(this.logged);
            if(this.token != null){
                hayToken =  true;
                this.logged = 1;
                console.log(this.logged);
            }

            return hayToken;

        },
        sacarDatosUser: function(){
            axios.get(localStorage.getItem('URL_API') + 'userinfo', {
                headers: {
                    'Accept':'application/json',
                    'Authorization':'Bearer '+this.token}})
            .then((response) => {
                this.info = response.data
                localStorage.setItem('esAdmin' , this.info.esAdmin);
                this.esAdmin = localStorage.getItem('esAdmin');
                axios.get(localStorage.getItem('URL_API') + 'myFavs/' + this.info.id, {
                headers: {
                    'Accept':'application/json',
                    'Authorization':'Bearer '+this.token}})
                .then(response => (this.favs = response.data.data))
            })
        },
        updateName: function(){
            if(this.nombreNew.trim() != ''){
                axios.put(localStorage.getItem('URL_API') + 'cambianombre',
                /* Aqui va el contenido a enviar en el PUT */
                { "name": this.nombreNew ,
                  "id" : this.info.id},
                { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.token } })
                .then(response => {
                    console.log(response)
                    this.info.name = this.nombreNew;
                })
                .catch(() => {
                    console.log(response)
                })
            }else{
                alert("Por Favor introduce un nombre")
            }
        },
        /*getFavs: function(){
            alert(this.info)
            axios.get('/api/myFavs/' + this.info.id, {
                headers: {
                    'Accept':'application/json',
                    'Authorization':'Bearer '+this.token}})
            .then(response => (this.favs = response.data))
        },*/
        salir: function(){
            localStorage.removeItem("token");
            localStorage.removeItem("esAdmin");
            location.reload();
        },
        moveURL : function(id){
            console.log(id);
            localStorage.setItem('id',id);
            location.href='show.html';
        },
    },
})
