"use strict";

define(["vueLoader"], function (loader) {
  return {
    props: {
      model: {
        type: Object,
        default: {}
      },
      save: {
        type: Function
      }
    },
    data: function data() {
      return {};
    }
  };
});