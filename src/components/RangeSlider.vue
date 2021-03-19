<template>
  <veeno
    connect
    :range="{ min, max }"
    :handles="[min, max]"
    :step="1"
    @update="sliderUpdate"
  />
</template>

<script>
import veeno from "veeno"
import "nouislider/distribute/nouislider.min.css"

export default {
  components: {
    veeno,
  },

  props: {
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },

  methods: {
    sliderUpdate(event) {
      this.$emit("sliderUpdate", event.values)
    },
  },
}
</script>

<style lang="scss">
.noUi-target {
  border: 0;
  border-radius: 0;
}
.noUi-base {
  background-color: grey;
}
.noUi-horizontal {
  height: 3px;
}
/*.noUi-vertical { width: 3px; }*/
.noUi-horizontal .noUi-handle,
.noUi-vertical .noUi-handle {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  box-shadow: none;
  background-color: #ff634a;
  border: none;
  top: -6px;
  outline-width: 0;
  cursor: pointer;
}
html:not([dir="rtl"]) .noUi-horizontal .noUi-handle {
  right: -7px;
  left: auto;
}
.noUi-handle:before {
  content: none;
}
.noUi-handle:after {
  content: none;
}
.noUi-tooltip {
  /*display: none;*/
  border: 0;
  background: none;
  color: inherit;
  padding-top: 2px;
  padding-bottom: 0px;
  font-size: 0.6em;
  transition: font-size 0.2s ease-out;
}
.noUi-active .noUi-tooltip {
  font-size: 0.8em;
}

.noUi-horizontal .noUi-handle,
.noUi-vertical .noUi-handle,
.noUi-connect {
  background: #ff634a;
}
</style>
