<template>
  <div class="table">
    <table>
      <thead>
        <tr>
          <th>Human \ Automa</th>
          <th v-for="(faction, i) in factions" :key="i">
            {{ faction.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(factionHuman, i) in factions" :key="i">
          <th>{{ factionHuman.name }}</th>
          <td
            v-for="(factionAutoma, j) in factions"
            :key="j"
            :class="{
              'bg-red':
                results[factionAutoma.slug] &&
                results[factionAutoma.slug][factionHuman.slug] &&
                !results[factionAutoma.slug][factionHuman.slug].human.winner,
            }"
          >
            <template v-if="i !== j">
              <template
                v-if="
                  results[factionAutoma.slug] &&
                  results[factionAutoma.slug][factionHuman.slug]
                "
              >
                {{ results[factionAutoma.slug][factionHuman.slug].human.score }}
                \
                {{
                  results[factionAutoma.slug][factionHuman.slug].automa.score
                }}
              </template>
              <template v-else> - </template>
            </template>
            <template v-else> x </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Faction, Game } from "@/types";
import FactionService from "@/services/FactionService";
import GameService from "@/services/GameService";

export default defineComponent({
  name: "Table",
  props: {},
  data: () => {
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

<style scoped>
table {
  margin: 0 auto;
}
th,
td {
  padding: 0.5rem 0.75rem;
}
td.disabled {
  background-color: #dadada;
}
.bg-red {
  background-color: #ffb9b9;
}
</style>
