<template>
  <section>
    <base-dialog></base-dialog>
    <form action="" @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">Your Email</label>
        <input v-model.trim="email" type="email" id="email" />
      </div>
      <div class="form-control">
        <label for="message">Message</label>
        <textarea v-model.trim="message" id="message" rows="5"></textarea>
      </div>
      <p class="errors" v-if="!formIsValid">
        Pleas enter a valid email and non-empty-message!
      </p>
      <div class="actions">
        <base-button> Send Message </base-button>
      </div>
    </form>
  </section>
</template>

<script>
import useRequestsStore from "@/store/modules/requests";
import { mapStores } from "pinia";
export default {
  data() {
    return {
      email: "",
      message: "",
      formIsValid: true,
    };
  },
  computed: {
    ...mapStores(useRequestsStore),
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.message === ""
      ) {
        this.formIsValid = false;
        return;
      }

      this.requestsStore.contactCoach({
        coachId: this.$route.params.id,
        email: this.email,
        message: this.message,
      });

      this.$router.replace("/coaches");
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
