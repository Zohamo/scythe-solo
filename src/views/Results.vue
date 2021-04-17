<template>
  <div class="results">
    <div class="filters">
      <input
        type="radio"
        id="best"
        value="best"
        v-model="typeResults"
        checked
      />
      <label for="best">Best</label>
      <input type="radio" id="worst" value="worst" v-model="typeResults" />
      <label for="worst">Worst</label>
      <input type="radio" id="average" value="average" v-model="typeResults" />
      <label for="average">Average</label>
    </div>
    <Table :factions="factions" :results="results" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Table from "@/components/Table.vue";
import { Faction, Game } from "@/types";
import FactionService from "@/services/FactionService";
import GameService from "@/services/GameService";

export default defineComponent({
  name: "Results",
  components: {
    Table,
  },
  data() {
    return {
      factions: [] as Faction[],
      games: [] as Game[],
      results: [] as { [key: string]: any },
      typeResults: "best",
      bestResults: [] as { [key: string]: any },
      worstResults: [] as { [key: string]: any },
      averageResults: [] as { [key: string]: any },
    };
  },
  watch: {
    typeResults(val) {
      switch (val) {
        case "worst":
          if (!this.worstResults.length) {
            this.worstResults = this.getWorstResults();
          }
          this.results = this.worstResults;
          break;
        case "average":
          if (!this.averageResults.length) {
            this.averageResults = this.getAverageResults();
          }
          this.results = this.averageResults;
          break;
        case "best":
        default:
          this.results = this.bestResults;
      }
    },
  },
  created() {
    this.factions = FactionService.getFactions();
    this.games = GameService.getGames();
    this.bestResults = this.getBestResults();
    this.results = this.bestResults;
  },
  methods: {
    getBestResults() {
      const results: { [key: string]: any } = [];
      this.games.forEach((game) => {
        if (!results[game.automa.faction]) {
          results[game.automa.faction] = [];
        }
        if (
          !results[game.automa.faction][game.human.faction] ||
          game.human.score >
            results[game.automa.faction][game.human.faction].human.score
        ) {
          results[game.automa.faction][game.human.faction] = game;
        }
      });
      return results;
    },
    getWorstResults() {
      const results: { [key: string]: any } = [];
      this.games.forEach((game) => {
        if (!results[game.automa.faction]) {
          results[game.automa.faction] = [];
        }
        if (
          !results[game.automa.faction][game.human.faction] ||
          game.human.score <
            results[game.automa.faction][game.human.faction].human.score
        ) {
          results[game.automa.faction][game.human.faction] = game;
        }
      });
      return results;
    },
    getAverageResults() {
      const results: { [key: string]: any } = [];
      this.games.forEach((game) => {
        if (!results[game.automa.faction]) {
          results[game.automa.faction] = [];
        }
        if (!results[game.automa.faction][game.human.faction]) {
          results[game.automa.faction][game.human.faction] = [];
        }
        results[game.automa.faction][game.human.faction].push({
          human: game.human.score,
          automa: game.automa.score,
        });
      });
      for (const automaFaction in results) {
        for (const humanFaction in results[automaFaction]) {
          const scores = [...results[automaFaction][humanFaction]];
          let humanScores = 0;
          let automaScores = 0;
          scores.forEach((score) => {
            humanScores += score.human;
            automaScores += score.automa;
          });
          const humanAverage = Math.round(humanScores / scores.length);
          const automaAverage = Math.round(automaScores / scores.length);
          results[automaFaction][humanFaction] = {};
          results[automaFaction][humanFaction].human = {
            faction: humanFaction,
            score: humanAverage,
            winner: humanAverage > automaAverage,
          };
          results[automaFaction][humanFaction].automa = {
            faction: automaFaction,
            score: automaAverage,
            winner: automaAverage > humanAverage,
          };
        }
      }
      return results;
    },
  },
});
</script>
