<template>
  <div class="my-select" :class="{ 'my-select_active': isShowSelect }">
    <span class="my-select__title" @click="toggleIsShowSelect">
      {{ data.title }}
    </span>
    <div class="range" v-if="typeSelect === 'range' && isShowSelect">
      <div class="range__inputs">
        <input class="range__min-input" type="text" v-model="minRange" />
        <input class="range__max-input" type="text" v-model="maxRange" />
      </div>
      <div class="range__values">
        <span class="range__min">{{ minRange }} cm</span>
        <span class="range__max">{{ maxRange }} cm</span>
      </div>
      <div class="range__slider">
        <range-slider
          :min="getMinRange"
          :max="getMaxRange"
          @sliderUpdate="sliderUpdate"
        ></range-slider>
      </div>
    </div>
    <template v-else>
      <ul class="my-select__list" v-if="isShowSelect">
        <li
          class="my-select__item"
          :class="{
            'my-select__item_active':
              selectedElement === item || selectedElements.includes(item),
          }"
          v-for="(item, idx) in data.list"
          :key="item"
          @click="passParam(item, idx)"
        >
          {{ item }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import RangeSlider from "./RangeSlider"
import { toggleExistElemInArr } from "../utils/helperFunctions"

export default {
  components: {
    "range-slider": RangeSlider,
  },

  props: {
    data: {
      type: Object,
      required: true,
    },
    typeSelect: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      isShowSelect: false,
      selectedElement: "",
      selectedElements: [],
      minRange: null,
      maxRange: null,
    }
  },

  computed: {
    getMinRange() {
      if (this.typeSelect === "range") {
        return this.data.list[0].minRange
      }
      return ""
    },

    getMaxRange() {
      if (this.typeSelect === "range") {
        return this.data.list[1].maxRange
      }
      return ""
    },
  },

  methods: {
    toggleIsShowSelect() {
      this.isShowSelect = !this.isShowSelect
    },

    passParam(param) {
      this.$emit("passParam", param)
      this.selectElem(param)
    },

    selectElem(el) {
      if (this.typeSelect === "sort") {
        this.selectedElement = el
      } else {
        toggleExistElemInArr(this.selectedElements, el)
      }
      this.toggleIsShowSelect()
    },

    sliderUpdate([min, max]) {
      const filtrName = this.data.title
      this.minRange = min
      this.maxRange = max
      this.$emit("rangeFilter", { min, max, filtrName })
    },
  },
}
</script>

<style lang="scss">
.my-select {
  position: relative;
  display: inline-block;
  margin-right: 16px;
  z-index: 99;

  &::after {
    content: "";
    position: absolute;
    width: 4px;
    height: 4px;
    top: 50%;

    border-left: 1px solid black;
    border-bottom: 1px solid black;
    transform: translate(10px, -50%) rotate(-45deg);
  }

  &__title {
    font-size: 14px;
    font-weight: 400;

    cursor: pointer;
  }

  &__list,
  .range {
    position: absolute;
    width: 101px;
    top: 30px;
    left: 95%;
    padding: 12px 20px;

    font-family: "HelveticaRegular", sans-serif;

    background: #fff;
    box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.04);
    border-radius: 6px;
    list-style: none;
    transform: translateX(-50%);

    &::before {
      content: "";
      position: absolute;
      width: 9px;
      height: 9px;
      top: 0;
      left: 50%;

      background: white;
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }

  .range {
    width: 249px;
    height: 132px;
    padding: 20px;
    box-sizing: border-box;

    &__inputs {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }

    &__min-input,
    &__max-input {
      width: 100px;
      height: 42px;
      padding: 12px;
      box-sizing: border-box;

      font-family: "HelveticaThin", sans-serif;
      font-size: 14px;

      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: 6px;
      color: rgba(0, 0, 0, 0.8);
      transition: all 0.3s;

      &:focus {
        outline: none;
        border-color: rgba(0, 0, 0, 0.3);
      }
    }

    &__values {
      display: flex;
      justify-content: space-between;
    }

    &__min,
    &__max {
      margin-bottom: 11px;

      font-family: "HelveticaThin", sans-serif;
      line-height: 25px;

      color: rgba(0, 0, 0, 0.8);
    }

    &__slider {
      position: relative;
      text-align: center;
    }
  }

  &__item {
    margin-bottom: 8px;

    font-family: "HelveticaThin", sans-serif;
    line-height: 25px;
    letter-spacing: 0.07em;

    cursor: pointer;
  }

  &__item_active {
    color: #ff634a;
  }
}
</style>
