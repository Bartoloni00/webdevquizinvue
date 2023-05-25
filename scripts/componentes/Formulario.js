Vue.component('form-preguntas',{
    props:['puntaje'],
    data:function(){
        return{
                "questions": [
                  {
                    "question": "¿Cuál de los siguientes lenguajes se utiliza principalmente en el desarrollo del lado del servidor en la programación web?",
                    "answers": [
                      { "text": "Java", "correct": false },
                      { "text": "JavaScript", "correct": false },
                      { "text": "Python", "correct": false },
                      { "text": "PHP", "correct": true }
                    ],
                    selectedAnswer: null
                  },
                  {
                    "question": "¿Cuál de las siguientes opciones NO es un framework de desarrollo web ampliamente utilizado?",
                    "answers": [
                      { "text": "React", "correct": false },
                      { "text": "Swift", "correct": true },
                      { "text": "Laravel", "correct": false },
                      { "text": "Vue", "correct": false }
                    ],
                    selectedAnswer: null
                  },
                  {
                    "question": "¿Qué tecnología se utiliza para almacenar y organizar datos en el navegador web?",
                    "answers": [
                      { "text": "HTML", "correct": false },
                      { "text": "LocalStorage", "correct": true },
                      { "text": "CSS", "correct": false },
                      { "text": "XML", "correct": false }
                    ],
                    selectedAnswer: null
                  },
                  {
                    "question": "¿Cuál de las siguientes opciones NO es un método HTTP utilizado para enviar datos desde un cliente a un servidor en una solicitud web?",
                    "answers": [
                      { "text": "GET", "correct": false },
                      { "text": "POST", "correct": false },
                      { "text": "DELETE", "correct": false },
                      { "text": "UPDATE", "correct": true }
                    ],
                    selectedAnswer: null
                  },
                  {
                    "question": "¿Cuál de las siguientes opciones es un lenguaje de marcado utilizado para estructurar y presentar contenido en la web?",
                    "answers": [
                      { "text": "HTML", "correct": true },
                      { "text": "CSS", "correct": false },
                      { "text": "JavaScript", "correct": false },
                      { "text": "Python", "correct": false }
                    ],
                    selectedAnswer: null
                  },
                  {
                    "question": "¿Cuál de las siguientes opciones es un lenguaje de programación utilizado para agregar interactividad a una página web?",
                    "answers": [
                      { "text": "JavaScript", "correct": true },
                      { "text": "HTML", "correct": false },
                      { "text": "CSS", "correct": false },
                      { "text": "Python", "correct": false }
                    ],
                    selectedAnswer: null
                  },
                  {
                    "question": "¿Cuál de las siguientes opciones NO es una tecnología utilizada para realizar solicitudes asíncronas al servidor y actualizar el contenido de una página sin recargarla por completo?",
                    "answers": [
                      { "text": "AJAX", "correct": false },
                      { "text": "XML", "correct": false },
                      { "text": "Fetch API", "correct": false },
                      { "text": "jQuery", "correct": true }
                    ],
                    selectedAnswer: null
                  },
                  {
                    "question": "¿Cuál de las siguientes opciones NO es un estándar de diseño responsivo en el desarrollo web?",
                    "answers": [
                      { "text": "Media Queries", "correct": false },
                      { "text": "Flexbox", "correct": false },
                      { "text": "Grid Layout", "correct": false },
                      { "text": "MVC", "correct": true }
                    ],
                    selectedAnswer: null
                  },
                  {
                    "question": "¿Qué término se utiliza para describir una técnica en la programación web que permite reutilizar y combinar componentes de interfaz de usuario?",
                    "answers": [
                      { "text": "Inheritance", "correct": false },
                      { "text": "Polymorphism", "correct": false },
                      { "text": "Composition", "correct": true },
                      { "text": "Abstraction", "correct": false }
                    ],
                    selectedAnswer: null
                  },
                  {
                    "question": "¿Cuál de las siguientes opciones NO es un estándar de seguridad para proteger una aplicación web contra ataques?",
                    "answers": [
                      { "text": "SSL/TLS", "correct": false },
                      { "text": "JWT", "correct": false },
                      { "text": "OAuth", "correct": false },
                      { "text": "SQL", "correct": true }
                    ],
                    selectedAnswer: null
                  }
                ],
              }
    },
    template: `
    <div>
      <div v-for="(pregunta, i) in questions" :key="pregunta.question">
        <fieldset>
          <legend>{{ pregunta.question }}</legend>
          <div v-for="(opcion, j) in pregunta.answers" :key="opcion.text" class="opcion">
            <input
              type="radio"
              :id="i + '-' + j"
              :name="i"
              :value="opcion.text"
              v-model="pregunta.selectedAnswer"
              @change="updateScore(pregunta)"
              :disabled="pregunta.selectedAnswer && pregunta.selectedAnswer !== opcion.text"
            >
            <label
              :for="i + '-' + j"
              :class="{ correct: pregunta.selectedAnswer === pregunta.answers.find(answer => answer.correct).text && pregunta.selectedAnswer !== null && opcion.text === pregunta.selectedAnswer, incorrect: pregunta.selectedAnswer !== pregunta.answers.find(answer => answer.correct).text && pregunta.selectedAnswer !== null && opcion.text === pregunta.selectedAnswer }"
            >
              {{ opcion.text }}
            </label>
          </div>
        </fieldset>
      </div>
    </div>
  `,
  methods: {
    updateScore(pregunta) {
      if (
        pregunta.selectedAnswer &&
        pregunta.selectedAnswer === pregunta.answers.find(answer => answer.correct).text
      ) {
        this.$emit('puntaje-actualizado', 1); // Emitimos el evento con el puntaje actualizado
      }
    }
  }
});

Vue.component('form-contenedor', {
  data() {
    return {
      titulo: 'Ingrese su nombre',
      usuario: null,
      puntaje: 0,
      enviado: false,
    }
  },
  template: `
    <div class="contenedor">
      <form v-on:submit.prevent="guardar" novalidate v-if="!enviado">
        <div class="contenedorNombre-img">
          <div>
            <label for="usuario">{{titulo}}:</label>
            <input type="text" v-model="usuario" :placeholder="titulo" name="usuario" />
            <span>Este campo es obligatorio si desea aparecer en el ranking</span>
          </div>
          <img src="img/home-img-min.png" alt="dibujo de un chico en la pc">
        </div>
        <form-preguntas @puntaje-actualizado="actualizarPuntaje($event)" :puntaje="puntaje" />
        <button>Enviar</button>
      </form>
      <div v-else>
        <div v-if="puntaje >=6">
          <p class="resultado">Felicidades, {{ usuario }}! Has respondido correctamente {{ puntaje }} preguntas.</p>
          <img src="img/ganaste.svg" alt="Ganaste el QuizDev Game" class="resultado-img">
        </div>
        <div v-else>
          <p class="resultado">Deberias avergonzarte {{ usuario }}! Has respondido mal {{ 10 - puntaje }} preguntas.</p>
          <img src="img/jajaperdiste.svg" alt="Perdiste el QuizDev Game" class="resultado-img">
        </div>
      <button class="reiniciar" @click="reiniciar">Volver a jugar</button>
      </div>
    </div>
  `,
    methods:{
        guardar:function(){
            //console.log(e) //evento del submit
        //validacion
           //queremos evaluar que los mensajes se muestren solo cuando se ejecute la funcion
           this.errores=[] //vaciamos el array de errores
                 
          if (!this.usuario) {
              console.log(!this.usuario)
               this.errores.push('El usuario es obligatorio.');
           
          }
          if(this.usuario && this.usuario.length < 3) {
            this.errores.push('Debe tener mas de 3 caracteres.');
             
          }
              	
     if(this.errores.length == 0){
        this.enviado = true;
        nuevoObj = {
                        usuario: this.usuario,
                        puntaje: this.puntaje
                        }
               
         if(!localStorage.dato){
                       this.arr=[]
                   }else{
                       this.arr=JSON.parse(localStorage.getItem("dato"))
                   }
   
                   this.arr.push(nuevoObj)
                   localStorage.setItem("dato",JSON.stringify(this.arr))
              }
   },
   actualizarPuntaje(puntos) {
    this.puntaje += puntos; // Actualizamos el puntaje en el componente padre
  },
  reiniciar(){
    this.enviado = false;
  }
   
   }, //cierre de methods
})