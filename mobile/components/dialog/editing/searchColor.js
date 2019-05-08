'use strict';

define([], function () {
  return {
    data: function data() {
      return {};
    },

    props: {
      model: {
        type: Object,
        default: {
          image: {}
        }
      },
      key: {
        default: 'image'
      },
      config: {
        type: Object,
        default: {
          text: '图片样式'
        }
      }
    }
  };
});