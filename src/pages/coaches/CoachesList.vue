<template>
  <section>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>

    <section>
      <section>
        <!--  nhận dữ liệu gửi lên từ coachFiletr  -->
        <coach-filter @change-filter="setFilter"></coach-filter>
      </section>
      <base-card>
        <div class="controls">
          <base-button @click="loadCoaches(true)">Refresh</base-button>
          <base-button link to="/register" v-if="!isCoach"
            >Register as Coach
          </base-button>
        </div>

        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          >
          </coach-item>
        </ul>
        <h3 v-else>No Coach Found!</h3>
      </base-card>
    </section>
  </section>
</template>

<script>
// import { useCounterStore } from '@/stores/counter'
import CoachItem from "@/components/coaches/CoachItem.vue";
import useCoachesStore from "@/store/modules/coaches";
import CoachFilter from "@/components/coaches/CoachFilter.vue";
import { mapStores } from "pinia";

export default {
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilter: { frontend: true, backend: true, career: true },
    };
  },
  components: {
    CoachItem,
    CoachFilter,
  },
  created() {
    this.loadCoaches();
  },

  computed: {
    ...mapStores(useCoachesStore),

    filteredCoaches() {
      const coaches = this.coachesStore.allCoaches;

      return coaches.filter((coach) => {
        if (this.activeFilter.frontend && coach.areas.includes("frontend")) {
          return true;
        }
        if (this.activeFilter.backend && coach.areas.includes("backend")) {
          return true;
        }
        if (this.activeFilter.career && coach.areas.includes("career")) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.coachesStore.hasCoaches;
    },
    isCoach() {
      return this.coachesStore.isCoach;
    },
  },

  methods: {

    setFilter(updatedFilters) {
      this.activeFilter = updatedFilters;
    },

    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.coachesStore.loadCoaches({ forceRefresh: refresh });
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },

    handleError() {
      this.error = null;
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
