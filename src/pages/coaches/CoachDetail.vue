<template>
 <section>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hours</h3>
      </base-card>
    </section>
  
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
  
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
  
        <p>{{ description }}</p>
      </base-card>
    </section>
 </section>
</template>

<script>
import useCoachesStore from "@/store/modules/coaches";
import { mapStores } from "pinia";

export default {
  props: ["id"],
  computed: {
    ...mapStores(useCoachesStore),
    fullName() {
      return `${this.selectedCoach.firstName} ${this.selectedCoach.lastName}`;
    },
    rate() {
      return `${this.selectedCoach.hourlyRate}`;
    },
    areas() {
      return this.selectedCoach.areas;
    },
    contactLink() {
      return `/coaches/${this.id}/contact`;
    },
  },
  created() {
    //  tìm kiếm một "huấn luyện viên" cụ thể trong mảng this.coachesStore.
    // allCoaches dựa trên giá trị id và sau đó gán đối tượng huấn luyện viên tìm thấy vào thuộc tính selectedCoach của component
    this.selectedCoach = this.coachesStore.allCoaches.find(
      (coach) => coach.id === this.id
    );
  },

  data() {
    return {
      selectedCoach: null,
    };
  },
};
</script>

<style lang="scss" scoped></style>
