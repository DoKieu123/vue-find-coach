<template>
  <section>
    <base-card>
      <h2>Register as coach now!</h2>
      <!-- nhận dữ liệu gửi lên qua hàm $emit -->
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from "@/components/coaches/CoachForm.vue";
import useCoachesStore from "@/store/modules/coaches";
import { mapStores } from "pinia";

export default {
  components: {
    CoachForm,
  },
  computed: {
    ...mapStores(useCoachesStore),
  },
  methods: {
    //data chính là dữ liệu nhận bên CoachForm truyền xuống qua $emit 
    saveData(data) {
      // truyền dữ liệu sang bên active.js (coaches)
      this.coachesStore.registerCoach(data); 
      this.$router.replace("/coaches");
    },
  },
};
</script>

<style lang="scss" scoped></style>
