var aplicacion = new Vue({
    el: '.app',
    data: {
        token: "no hay token",
        nombre: "",
        mail: "",
        passwd: "",
        confPass: ""
    },
    methods: {
        enviar: function(){
            //alert(this.nombre + ' , ' + this.mail + ' , ' + this.passwd)
            axios.post('http://netcamareroapi.test/api/registro/', {
                name: this.nombre,
                email: this.mail,
                password: this.passwd,
                c_password: this.confPass
            })
            .then(response => {
                console.log(response);
                this.token = response.data.success.token
                localStorage.setItem("token", this.token);
                location.replace('profile.html');
            })
            .catch(error => {
                console.log(error);
                alert("¡fallo al registrar, revisa tu contraseña y correo!");
            });
        }
    }
})
