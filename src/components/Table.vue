<template>
  <div class="table">
    <table>
      <thead>
        <tr>
          <th></th>
          <th v-for="(factionCol, i) in factions" :key="i">
            {{ factionCol.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(factionRow, i) in factions" :key="i">
          <th>{{ factionRow.name }}</th>
          <td v-for="(factionDiv, j) in factions" :key="j">
            <template v-if="i !== j"> - </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FactionService from "@/services/FactionService";
import { Faction } from "@/types";

export default defineComponent({
  name: "Table",
  props: {},
  data: () => {
    return {
      factions: [] as Faction[],
    };
  },
  created() {
    this.factions = FactionService.getFactions();
    console.log("factions", this.factions);
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
</style>
