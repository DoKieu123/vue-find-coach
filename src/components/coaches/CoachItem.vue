<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hours</h4>
    <div>
      <!-- mỗi base-badge : sẽ hiển thị một "area" truyền xuống còn props{ type và title: đều : có giá trị là area  } -->
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      ></base-badge>
    </div>
    <div class="actions">
      <base-button link :to="coachContactLink" mode="outline"
        >Contact</base-button
      >
      <base-button link :to="coachDetailLink">View Detail</base-button>
    </div>
  </li>
</template>

<script>
export default {
  name: "CoachItem",
  props: {
    id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    rate: { type: Number, required: true },
    areas: { type: Array, required: true },
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    coachContactLink() {
      // /coaches/c1/contact
      return `/coaches/${this.id}/contact`;
    },
    coachDetailLink() {
      // /coaches/c1
      return `/coaches/${this.id}`;
    },
  },
};
</script>

<style lang="scss" scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
