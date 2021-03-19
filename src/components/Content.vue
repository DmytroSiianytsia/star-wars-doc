<template>
  <div class="content">
    <div class="wrapper">
      <h1 class="content__title">People</h1>
      <div class="content__actions">
        <div class="filters">
          <my-select
            v-for="filter in filters"
            :key="filter.title"
            :data="filter"
            @passParam="passParam"
            @rangeFilter="rangeFilter"
            :typeSelect="filter.title === 'Eye color' ? 'list' : 'range'"
          ></my-select>
        </div>
        <div class="sort">
          <my-select
            :data="sort"
            @passParam="passParam"
            typeSelect="sort"
          ></my-select>
        </div>
        <div class="burger" @click="showBurger = !showBurger">
          <ul :class="['burger-sort', { 'show-burger': showBurger }]">
            <li
              class="burger-sort__item"
              v-for="item in sort.list"
              :key="item"
              @click="sortParam = item"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
      <transition-group class="content__cards" name="list-complete" tag="div">
        <app-card
          v-for="person in filteredPeople"
          :key="person.name"
          :person="person"
        ></app-card>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { fetchData } from "../api"
import MySelect from "./MySelect"
import Card from "./Card"
import { toggleExistElemInArr } from "../utils/helperFunctions"

export default {
  components: {
    "my-select": MySelect,
    "app-card": Card,
  },
  data() {
    return {
      people: [],
      filters: {
        eyeColor: {
          title: "Eye color",
          list: ["blue", "blue-gray", "brown", "red", "yellow"],
        },
        height: {
          title: "Height",
          list: [],
        },
        age: {
          title: "Age",
          list: [],
        },
      },
      sort: {
        title: "Sort",
        list: ["age", "mass", "height"],
      },
      sortParam: "",
      filterColorEye: [],
      filterMinHeight: null,
      filterMaxHeight: null,
      filterMinAge: null,
      filterMaxAge: null,
      filteredPeople: [],
      showBurger: false,
    }
  },
  async created() {
    this.people = await fetchData("people")
    window.history.pushState(null, document.title, window.location.pathname)
  },
  watch: {
    people() {
      this.filters.height.list = [
        { minRange: this.minHeightOfHero },
        { maxRange: this.maxHeightOfHero },
      ]
      this.filters.age.list = [
        { minRange: this.minAgeOfHero },
        { maxRange: this.maxAgeOfHero },
      ]
      this.filterMinHeight = this.minHeightOfHero
      this.filterMaxHeight = this.maxHeightOfHero
      this.filterMinAge = this.minAgeOfHero
      this.filterMaxAge = this.maxAgeOfHero
    },

    sortParam() {
      this.sortPeople()
      this.addInfoToUrl()
    },

    peopleWithImg() {
      this.filterByParams()
    },

    filterColorEye() {
      this.filterByParams()
    },
  },
  computed: {
    peopleWithImg() {
      return this.people.map((person) => {
        const imgName = {
          imgName: person.name.split(" ").join("-") + ".jpg",
        }
        return Object.assign(person, imgName)
      })
    },

    minHeightOfHero() {
      return Math.min(...this.people.map((item) => item.height))
    },

    maxHeightOfHero() {
      return Math.max(...this.people.map((item) => item.height))
    },

    minAgeOfHero() {
      return Math.min(
        ...this.people.map((item) => this.getAgeFromString(item.birth_year))
      )
    },

    maxAgeOfHero() {
      return Math.max(
        ...this.people.map((item) => this.getAgeFromString(item.birth_year))
      )
    },
  },

  methods: {
    getAgeFromString(str) {
      return Number.parseFloat(str === "unknown" ? 0 : str)
    },

    sortPeople() {
      if (this.sortParam === "age") {
        return this.filteredPeople.sort(
          (a, b) =>
            this.getAgeFromString(b.birth_year) -
            this.getAgeFromString(a.birth_year)
        )
      }
      return this.filteredPeople.sort(
        (a, b) => b[this.sortParam] - a[this.sortParam]
      )
    },

    filterByParams() {
      this.filteredPeople = this.people.filter((person) => {
        return (
          +person.height >= this.filterMinHeight &&
          +person.height <= this.filterMaxHeight
        )
      })

      this.filteredPeople = this.filteredPeople.filter((person) => {
        return (
          this.getAgeFromString(person.birth_year) >= this.filterMinAge &&
          this.getAgeFromString(person.birth_year) <= this.filterMaxAge
        )
      })

      if (this.filterColorEye.length === 0) {
        return this.filteredPeople
      }
      this.filteredPeople = this.filteredPeople.filter((person) =>
        this.filterColorEye.some(
          (param) => person.eye_color.toLowerCase() === param
        )
      )

      this.addInfoToUrl()
    },

    addInfoToUrl() {
      window.history.pushState(
        null,
        document.title,
        `${window.location.pathname}?sort=${this.sortParam}&filter=${this.filterColorEye},minHeight:${this.filterMinHeight},maxHeight:${this.filterMaxHeight},minAge:${this.filterMinAge},maxAge:${this.filterMaxAge}`
      )
    },

    rangeFilter({ min, max, filtrName }) {
      if (filtrName === "Age") {
        this.filterMinAge = min
        this.filterMaxAge = max
      } else {
        this.filterMinHeight = min
        this.filterMaxHeight = max
      }
      this.filterByParams()
      this.addInfoToUrl()
    },

    passParam(param) {
      if (this.sort.list.includes(param)) {
        this.sortParam = param
      } else if (this.filters.eyeColor.list.includes(param)) {
        toggleExistElemInArr(this.filterColorEye, param)
      }
    },
  },
}
</script>

<style lang="scss">
.content {
  min-width: 375px;
  min-height: calc(100vh - 275px);

  &__title {
    margin-top: 64px;

    font-size: 32px;
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    margin-bottom: 48px;
    position: sticky;
    top: 20px;
    z-index: 99;
  }

  .filters {
    display: flex;
    justify-content: space-between;
    width: 240px;
  }

  .burger {
    display: none;
  }

  &__cards {
    margin-bottom: 112px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 16px;
  }

  @media (max-width: 768px) {
    .sort {
      display: none;
    }

    .burger {
      position: relative;
      display: block;
      width: 21px;
      height: 11px;

      cursor: pointer;
      border-top: 1px solid #000;

      &::before,
      &::after {
        content: "";
        position: absolute;
        height: 1px;

        background: #000;
      }

      &::before {
        width: 70%;
        top: 4px;
      }

      &::after {
        width: 30%;
        top: 8px;
      }
    }

    .burger-sort {
      position: absolute;
      display: none;
      justify-content: space-between;
      width: 140px;
      top: 10px;
      right: 10px;

      transition: all 0.3s;
      list-style: none;
    }

    .show-burger {
      display: flex;
    }
  }
}

.list-complete-item {
  transition: all 1s;
  display: inline-block;
}
.list-complete-enter,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
