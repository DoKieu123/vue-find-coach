<template>
  <form id="user_auth_form" @submit.prevent="submitForm">
    <base-card>
      <h2>{{ formTitle }}</h2>
      <div class="form-control">
        <label for="email"> E-mail </label>
        <input
          type="email"
          id="email"
          placeholder="Enter email..."
          v-model.trim="email"
        />
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          autocomplete="on"
          placeholder="Enter password..."
          v-model.trim="password"
        />
      </div>

      <p v-if="!formIsValid" class="errors">
        Please enter a valid email and password (must be at least 6 characters
        long)!
      </p>

      <base-button>{{ submitButtonCaption }}</base-button>

      <base-button type="button" mode="flat" @click="switchAuthMode">
        {{ switchModeButtonCaption }}
      </base-button>
    </base-card>
  </form>
</template>

<script>
import useAuthStore from "@/store/modules/auth";

import { mapStores } from "pinia";

export default {
  data() {
    return {
      mode: "login",
      formIsValid: true,
      email: "",
      password: "",
    };
  },

  watch: {
    mode(current, next) {
      let title = this.$route.meta.title;

      if (next === "login") {
        title = "Sign Up | Auth";
      } else {
        title = "Login | Auth";
      }
      document.title = title;
    },
  },

  computed: {
    submitButtonCaption() {
      if (this.mode === "login") return "Login";
      else return "Signup";
    },

    switchModeButtonCaption() {
      if (this.mode === "login") return "Signup in instead";
      else return "Login in instead";
    },

    formTitle() {
      if (this.mode === "login") return "Login";
      else return "Sign Up";
    },

    ...mapStores(useAuthStore),
  },

  methods: {
    submitForm() {
      this.formIsValid = true;
      if (
        !this.email ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      if (this.mode === "login") {
        // ...
      } else {
        this.authStore.signUp({
          email: this.email,
          password: this.password,
        });
      }
    },

    switchAuthMode() {
      if (this.mode === "login") {
        this.mode = "signup";
      } else {
        this.mode = "login";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  margin: 1rem;
  padding: 1rem;

  h2 {
    text-align: center;
  }
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
  padding: 12px 8px;
  // padding: 0.15rem;
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
