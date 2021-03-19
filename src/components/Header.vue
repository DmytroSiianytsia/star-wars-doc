<template>
  <div class="header">
    <div class="wrapper">
      <div class="header__content">
        <img class="logo" src="@/assets/images/logo.png" alt="Star Wars" />
        <div class="header__actions">
          <div :class="['select-lang', { active: showBurger }]">
            <my-select :data="selectLang" typeSelect="list"></my-select>
          </div>
          <router-link
            :class="['link-login', { active: showBurger }]"
            to="/login"
          >
            Log in
          </router-link>
          <router-link
            :class="['link-signup', { 'hide-signup': showBurger }]"
            to="/signup"
          >
            Sign up
          </router-link>
          <div class="burger" @click="toggleBurger">menu</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MySelect from "./MySelect.vue"

export default {
  components: {
    "my-select": MySelect,
  },

  data() {
    return {
      selectLang: {
        title: "En",
        list: ["En"],
      },
      showBurger: false,
    }
  },

  methods: {
    toggleBurger() {
      this.showBurger = !this.showBurger
    },
  },
}
</script>

<style lang="scss">
.header {
  background: #f2eeee;

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
  }

  .logo {
    width: 104px;
    height: 30px;
  }

  &__actions {
    display: flex;
    width: 336px;
    justify-content: space-between;
    align-items: center;
  }

  .link-login,
  .link-signup {
    text-decoration: none;
    color: black;
  }

  .router-link-active {
    padding: 16px 56px;

    color: #fff;
    background: #ff634a;
    border-radius: 6px;
  }

  .burger {
    display: none;

    font-size: 0;
  }

  @media (max-width: 768px) {
    .link-login,
    .select-lang {
      display: none;
    }

    &__actions {
      width: 140px;
    }

    .burger {
      display: block;
      width: 24px;
      height: 8px;

      border-bottom: 1px solid #000;
      border-top: 1px solid #000;
      cursor: pointer;
    }

    .active {
      display: block;
    }

    .hide-signup {
      display: none;
    }

    .router-link-active {
      padding: 6px 10px;

      color: #fff;
      background: #ff634a;
      border-radius: 6px;
    }
  }
}
</style>
