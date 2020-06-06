var elemento = new Vue({
    el: '.app',
    data: {
        menu:0,
        datos: [],
        comments: [],
        respuestaBorrado: "",
        editRestaurant: [],
        editCity: [],
        editCat: [],
        borraCity: [],
        borraCat: [],
        borraRestaurant: [],
        borraComentario: [],
        cities: [],
        categories: [],
        buscaIdCity: '0',
        buscaIdCat: '0',
        newCity: '0',
        newCat: '0',
        newCityName: 'Introduce ID',
        newCatName: 'Introduce ID',
        newTel: '',
        newDesc: '',
        newName: '',
        newNameCity: '',
        newNameCat: '',
        previewImage: null,
        fileName: '',
        selectedFile: '',
        finalFileName: '',
        token: '',
        latitud: 0,
        longitud: 0
    },
    created: function(){
        this.cargaRestaurantes();
        this.cargaCities();
        this.cargaCats();
        this.cargaComentarios();
        this.token = localStorage.getItem("token"); 
    },
    methods:{
        //GENERA UN RANDOM STRING
        makeRandName(){
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < 5; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        },
        uploadImage(e){
            this.selectedFile = event.target.files[0]
            const image = e.target.files[0];
            var name = document.getElementById('fileInput');
            //alert('Selected file: ' + name.files.item(0).name);
            this.fileName = name.files.item(0).name;
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e =>{
                this.previewImage = e.target.result;
                console.log(this.previewImage);
            };
            //GENERAMOS EL NOMBRE RANDOM
            this.finalFileName = this.makeRandName() + this.selectedFile.name;
            alert(this.finalFileName);
        },
        onUpload() {
            const formData = new FormData();
            formData.append('image', this.selectedFile, this.finalFileName);
            axios.post(localStorage.getItem('URL_API') + 'uploadFile',
                formData,
                {headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.token }})
        },
        cargaRestaurantes: function(){
            axios
            .get(localStorage.getItem('URL_API') + 'restaurantsAll')
            .then((response) => {
                this.datos = response.data.data
                this.editRestaurant = response.data.data[0];
            })
        },

        sendDataRestaurants: function(){
            var data = [];
            var labels = [];
            var contador = 0;
            for(var i= 0; i < this.categories.length; i++){
                for(var j= 0; j < this.datos.length; j++){
                    if(this.datos[j].category.name == this.categories[i].name){
                        contador++;
                    }
                }
                data.push(contador);
                labels.push(this.categories[i].name);
                contador = 0;
            }
            this.renderChartRestaurants(data, labels);

        },

        sendDataCiudades: function(){
            var data = [];
            var labels = [];
            var contador = 0;
            for(var i= 0; i < this.cities.length; i++){
                for(var j= 0; j < this.datos.length; j++){
                    if(this.datos[j].city.name == this.cities[i].name){
                        contador++;
                    }
                }
                data.push(contador);
                labels.push(this.cities[i].name);
                contador = 0;
            }
            this.renderChartCities(data, labels);

        },

        sendData: function(){
            data = [this.datos.length, this.cities.length, this.categories.length, this.comments.length];
            labels =  ['Restaurantes', 'Ciudades', 'Categorías', 'Comentarios'];
            this.renderChart(data, labels);
        },

        renderChartRestaurants: function(data, labels){
            var ctx = document.getElementById("myChartRest").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Restaurantes por Categorías',
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                    }
            });
        },

        renderChartCities: function(data, labels){
            var ctx = document.getElementById("myChartCity").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Restaurantes por Ciudades',
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                    }
            });
        },

        renderChart: function(data, labels){
            var ctx = document.getElementById("myChart").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Elementos Por Barras',
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                    }
            });
            var ctx = document.getElementById("myChart2").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Total de elementos',
                        data: data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                    }
            });
        },

        cargaComentarios: function(){
            axios
            .get(localStorage.getItem('URL_API') + 'comments')
            .then((response) => {
                this.comments = response.data.data
            })
        },
        cargaCities: function(){
            axios
            .get(localStorage.getItem('URL_API') + 'cities')
            .then((response) => {
                this.cities = response.data.data
                this.editCity = response.data.data[0];
            })
        },
        cargaCats: function(){
            axios
            .get(localStorage.getItem('URL_API') + 'categories')
            .then((response) => {
                this.categories = response.data.data
            })
        },
        borra: function(id){
            console.log(id);
            axios
            .delete(localStorage.getItem('URL_API') + 'restaurants/' + id,
            { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.token }})
            .then((response) => {
                this.respuestaBorrado = response.data
                alert(this.respuestaBorrado);
                //this.cargaRestaurantes();
                for(var i= 0; i < this.datos.length; i++){
                if(id == this.datos[i].id){
                    this.datos.splice( i , 1);
                    break;
                }
            }
                $('#modalBorrar').modal('hide');
            })
        },
        borraCiudad: function(id){
            console.log(id);
            axios
            .delete(localStorage.getItem('URL_API') + 'cities/' + id, 
            { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.token }})
            .then((response) => {
                this.respuestaBorrado = response.data
                alert(this.respuestaBorrado);
                //this.cargaRestaurantes();
                for(var i= 0; i < this.cities.length; i++){
                if(id == this.cities[i].id){
                    this.cities.splice( i , 1);
                    break;
                }
            }
                $('#modalBorrarCity').modal('hide');
            })
        },
        rellenainput: function(id){
            for(var i= 0; i < this.datos.length; i++){
                if(id == this.datos[i].id){
                    this.editRestaurant = this.datos[i];
                    this.buscaIdCity = this.editRestaurant.city.id;
                    this.buscaIdCat = this.editRestaurant.category.id;
                    break;
                }
            }
        },
        rellenaborra: function(id){
            for(var i= 0; i < this.datos.length; i++){
                if(id == this.datos[i].id){
                    this.borraRestaurant = this.datos[i];
                    break;
                }
            }
        },
        rellenaborraComment: function(id){
            for(var i= 0; i < this.comments.length; i++){
                if(id == this.comments[i].id){
                    this.borraComentario = this.comments[i];
                    break;
                }
            }
        },
        borraComment: function(id){
            console.log(id);
            axios
            .delete(localStorage.getItem('URL_API') + 'comments/' + id,
            { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.token }})
            .then((response) => {
                this.respuestaBorrado = response.data
                alert(this.respuestaBorrado);
                //this.cargaRestaurantes();
                for(var i= 0; i < this.comments.length; i++){
                if(id == this.comments[i].id){
                    this.comments.splice( i , 1);
                    break;
                }
            }
                $('#modalBorrarComment').modal('hide');
            })
        },
        //OPERACIONES DE CITY----------------------------------------------------------------------------------------------------
        rellenainputCity: function(id){
            for(var i= 0; i < this.cities.length; i++){
                if(id == this.cities[i].id){
                    this.editCity = this.cities[i];
                    break;
                }
            }
        },
        rellenaborraCity: function(id){
            for(var i= 0; i < this.cities.length; i++){
                if(id == this.cities[i].id){
                    this.borraCity = this.cities[i];
                    break;
                }
            }
        },
        guardaCambiosCity: function(id, nombre){
            //CAMBIAR ORDEN
                    axios.put(localStorage.getItem('URL_API') + 'cities/' + id, {
                        name: nombre
                    },
                    { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.token }})
                    .then(response => {
                        console.log(response);
                        //this.cargaRestaurantes();
                        for(var i= 0; i < this.cities.length; i++){
                            if(id == this.cities[i].id){
                                //alert("update");
                                this.cities[i].name = nombre;
                                alert(name);
                                break;
                            }
                        }
                        for(var i= 0; i < this.datos.length; i++){
                            if(id == this.datos[i].city.id){
                                this.datos[i].city.name = nombre;
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        alert("fallo al actualizar");
                    });
            $('#modalEditarCity').modal('hide');
        },
        //OPERACIONES CATEGORIA ----------------------------------------------------------------------------------------------------
        rellenaborraCat: function(id){
            for(var i= 0; i < this.categories.length; i++){
                if(id == this.categories[i].id){
                    this.borraCat = this.categories[i];
                    break;
                }
            }
        },
        rellenainputCat: function(id){
            for(var i= 0; i < this.categories.length; i++){
                if(id == this.categories[i].id){
                    this.editCat = this.categories[i];
                    break;
                }
            }
        },
        borraCategoria: function(id){
            console.log(id);
            axios
            .delete(localStorage.getItem('URL_API') + 'categories/' + id,
            { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.token }})
            .then((response) => {
                this.respuestaBorrado = response.data
                alert(this.respuestaBorrado);
                for(var i= 0; i < this.categories.length; i++){
                if(id == this.categories[i].id){
                    this.categories.splice( i , 1);
                    break;
                }
            }
                $('#modalBorrarCat').modal('hide');
            })
        },
        guardaCambiosCat: function(id, nombre){
            //CAMBIAR ORDEN
                    axios.put(localStorage.getItem('URL_API') + 'categories/' + id, {
                        name: nombre
                    },
                    { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.token }})
                    .then(response => {
                        console.log(response);
                        for(var i= 0; i < this.categories.length; i++){
                            if(id == this.categories[i].id){
                                //alert("update");
                                this.categories[i].name = nombre;
                                alert(name);
                                break;
                            }
                        }
                        for(var i= 0; i < this.datos.length; i++){
                            if(id == this.datos[i].category.id){
                                this.datos[i].category.name = nombre;
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        alert("fallo al actualizar");
                    });
            $('#modalEditarCat').modal('hide');
        },
        //NUEVO RESTAURANTE
        createNew: function(nombre, categoria, ciudad, descripcion, telefono, lat, long){

            var idCity;
            var idCat;

            for(var i = 0; i < this.cities.length; i++){
                if(this.cities[i].name == ciudad){
                    idCity = this.cities[i].id;
                }
            }

            for(var i = 0; i < this.categories.length; i++){
                if(this.categories[i].name == categoria){
                    idCat = this.categories[i].id;
                }
            }

            alert(lat + ' , ' + long)

            axios.post(localStorage.getItem('URL_API') + 'restaurants', {
                        name: nombre,
                        category: idCat,
                        city: idCity,
                        description: descripcion,
                        phonenumber: telefono,
                        photo: this.finalFileName,
                        latitud: lat,
                        longitud: long
                    },
                    { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.token }})
                    .then(response => {
                        console.log(response);
                        $('#modalNewRestaurant').modal('hide');
                        this.cargaRestaurantes();
                    })
                    .catch(error => {
                        console.log(error);
                        alert("fallo al crear restaurante, faltan datos");
                    });

                    this.onUpload();
        },
        createNewCity: function(nombre){
            axios.post(localStorage.getItem('URL_API') + 'cities', {
                        name: nombre,
                    },
                    { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.token }})
                    .then(response => {
                        console.log(response);
                        $('#modalNewCity').modal('hide');
                        this.cargaCities();
                    })
                    .catch(error => {
                        console.log(error);
                        alert("fallo al crear restaurante, faltan datos");
                    });
        },
        createNewCat: function(nombre){
            axios.post(localStorage.getItem('URL_API') + 'categories', {
                        name: nombre,
                    },
                    { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.token }})
                    .then(response => {
                        console.log(response);
                        $('#modalNewCat').modal('hide');
                        this.cargaCats();
                    })
                    .catch(error => {
                        console.log(error);
                        alert("fallo al crear categoria, faltan datos");
                    });
        },
        guardaCambios: function(id, nombre, categoria, ciudad, desc){
            //CAMBIAR ORDEN
                    axios.put(localStorage.getItem('URL_API') + 'restaurants/' + id, {
                        name: nombre,
                        category: categoria,
                        city: ciudad,
                        description: desc
                    },
                    { headers: { 'Accept': 'application/json', 'Authorization': 'Bearer ' + this.token }})
                    .then(response => {
                        console.log(response);
                        for(var i= 0; i < this.datos.length; i++){
                            if(id == this.datos[i].id){
                                //alert("update");
                                this.datos[i].name = nombre;
                                //this.datos[i].category.name = categoria;
                                //this.datos[i].city.id = ciudad;
                                alert(ciudad);
                                break;
                            }
                        }
                        this.cargaRestaurantes();
                    })
                    .catch(error => {
                        console.log(error);
                        alert("fallo al actualizar");
                    });
            $('#modalEditar').modal('hide');
        },

        busca: function(){
            //coger city
            console.log(this.buscaIdCity);
            for(var i= 0; i < this.cities.length; i++){
                if(this.buscaIdCity == this.cities[i].id){
                    this.editRestaurant.city = this.cities[i];
                    break;
                }
            }
        },
        buscav2: function(){
            //coger categoria
            console.log(this.buscaIdCat);
            for(var i= 0; i < this.categories.length; i++){
                if(this.buscaIdCat == this.categories[i].id){
                    this.editRestaurant.category = this.categories[i];
                    break;
                }
            }
        },
        buscav3: function(){
            //coger city
            //console.log(this.buscaIdCity);
            for(var i= 0; i < this.cities.length; i++){
                if(this.newCity == this.cities[i].id){
                    this.newCityName = this.cities[i].name;
                    break;
                }
            }
        },
        buscav4: function(){
            //coger categoria
            //console.log(this.buscaIdCat);
            for(var i= 0; i < this.categories.length; i++){
                if(this.newCat == this.categories[i].id){
                    this.newCatName = this.categories[i].name;
                    break;
                }
            }
        },
    }
})


