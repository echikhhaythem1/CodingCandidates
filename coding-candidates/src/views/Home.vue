<template>
  <div>
    <v-card class="mb-0">
      <v-card-text>
        <v-flex sm1 offset-sm5>
          <v-card color="blue lighten-1">
            <center>
              <Timer></Timer>
            </center>
          </v-card>
        </v-flex>
      </v-card-text>
    </v-card>
    <v-stepper v-model="e1">
      <v-stepper-items>
        <v-stepper-content
                           v-for="n in steps"
                           :key="`${n}-content`"
                           :step="n">
          <v-card
                  class="mb-0"
                  color="blue lighten-4"
                  flat
                  height="360px">
            <v-layout>
              <v-flex sm3 offset-sm0>
                <v-card color="blue lighten-4" height="181%">
                  <v-card-title>
                    <div>
                      <span>Objectif : Ecrire un programme C# servant à calculer la valeur absolue
                        d'un nombre réel x à partir de la définition de la valeur absolue. La valeur
                        absolue du nombre réel x est le nombre réel |x| :</span><br>
                    </div>
                  </v-card-title>
                </v-card>
              </v-flex>
              <v-flex sm6 offset-sm0>
                <v-textarea
                            label="Code ici"
                            style="max-width: 650px;"
                            value="using System;
namespace CsExosAlgo1 {
class ApplicationValAbsolue1 {
static void Main(string[ ] args) {
double x;
System.Console.Write(Entrez un nombre x = );
x = Double.Parse( System.Console.ReadLine( ) ) ;
if (x<0) System.Console.WriteLine(|x| = +(-x));
else System.Console.WriteLine(|x| = +x);
}
}
}">
                </v-textarea>
              </v-flex>
              <v-flex sm3 offset-sm0>
                <v-btn color="green" class="mb-0">Run</v-btn>
                <v-textarea
                            auto-grow>
                </v-textarea>
              </v-flex>
            </v-layout>
          </v-card>
          <v-btn color="green">soumettre</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>
<script>
import Timer from '../views/Timer.vue'
export default {
  components: {
    Timer: Timer
  },
  data () {
    return {
      e1: 1,
      steps: 1
    }
  },
  watch: {
    steps (val) {
      if (this.e1 > val) {
        this.e1 = val
      }
    }
  },
  methods: {
    onInput (val) {
      this.steps = parseInt(val)
    },
  }
}
</script>
