<template>
  <div class="results">
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
    };
  },
  created() {
    this.factions = FactionService.getFactions();
    this.games = GameService.getGames();
    this.results = this.getResults();
  },
  methods: {
    getResults() {
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
  },
});
</script>
