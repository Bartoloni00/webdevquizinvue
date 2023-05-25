Vue.component("ranking", {
	data:function(){
			return {
				local:[],
				sin_datos: ""
			}
	},
	template:`
			<div>
				<h2>Ranking</h2>
				<div v-if="local.length <= 0 " class="no-data-contenedor">
					<p>{{sin_datos}}</p>
					<img src="img/nodata.svg" :alt="sin_datos">
				</div>
				<table v-else>
				<thead>
					<tr>
					<th>posicion</th>
					<th>Usuario</th>
					<th>Puntaje</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(jugador,index) in local">
					<td>{{index + 1}}</td>
					<td>{{jugador.usuario}}</td>
					<td>{{jugador.puntaje}}</td>
					</tr>
				</tbody>
				</table>
				</div>
		`,

	mounted:function(){
		this.ver_local();
		this.local = this.ordenarPorPuntaje(this.local)
	},
	
	methods:{
		ver_local:function(){
			
		if(localStorage.dato){
			this.local=JSON.parse(localStorage.getItem("dato"))	
		}else{	
			this.sin_datos = "No posees datos de partidas anteriores, Tienes que jugar"
		}
		console.log( this.$route.path)//Devuelve la ruta en la que estamos
	},
	ordenarPorPuntaje: function(local) {
		local.sort(function(a, b) {
			// Comparamos los puntajes de los objetos
			return b.puntaje - a.puntaje;
		  });
		  return local;
	}


	}});