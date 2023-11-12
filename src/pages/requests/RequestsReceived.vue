<template>
  <section>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <template #default>
        <p>{{ error }}</p>
      </template>
    </base-dialog>

    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>

        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="!isLoading && hasRequests">
          <request-item
            v-for="req in receivedRequests"
            :key="req.id"
            :email="req.userEmail"
            :message="req.message"
          ></request-item>
        </ul>
        <h3 v-else>
          You haven't received request any requests yet!
        </h3></base-card
      >
    </section>
  </section>
</template>

<script>
import RequestItem from "@/components/requests/RequestItem.vue";
import useRequestsStore from "@/store/modules/requests";
import { mapStores } from "pinia";

export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },

  created() {
    this.loadRequest();
  },

  components: {
    RequestItem,
  },

  computed: {
    ...mapStores(useRequestsStore),
    receivedRequests() {
      return this.requestsStore.allRequests;
    },
    hasRequests() {
      return this.requestsStore.hasRequests;
    },
  },

  methods: {
    async loadRequest() {
      this.isLoading = true;

      try {
        await this.requestsStore.fetchRequests();
      } catch (error) {
        this.error = error || "Something failed!";
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
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
