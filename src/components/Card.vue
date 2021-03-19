<template>
  <div class="list-complete-item card" :style="bgImage">
    <div class="person">
      <div class="person__age">{{ person.birth_year }}</div>
      <div class="person__name">{{ person.name }}</div>
      <div class="person__params">
        <div class="person__eye">Eye color: {{ person.eye_color }}</div>
        <div class="person__height">Height: {{ person.height }}</div>
        <div class="person__mass">Mass: {{ person.mass }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    person: {
      type: Object,
    },
  },
  computed: {
    bgImage() {
      return {
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.1) 100%), ${this.inlineBgImage}`,
      }
    },
    inlineBgImage() {
      const img = require(`@/assets/images/personages/${this.person.imgName}`)

      return `url('${img}')`
    },
  },
  methods: {},
}
</script>

<style lang="scss">
.card {
  position: relative;
  width: 608px;
  height: 410px;

  border-radius: 6px;

  .person {
    position: absolute;
    top: 20px;
    left: 20px;

    color: white;

    &__age {
      margin-bottom: 16px;
    }

    &__name {
      margin-bottom: 8px;

      font-size: 24px;
      line-height: 35px;
    }

    &__params {
      display: flex;
    }

    &__eye,
    &__height,
    &__mass {
      margin-right: 24px;

      font-family: "HelveticaThin", sans-serif;
      line-height: 25px;
    }
  }

  @media (max-width: 768px) {
    .card {
      min-width: 339px;
    }
  }
}
</style>
