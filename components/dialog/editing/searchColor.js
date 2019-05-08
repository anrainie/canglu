'use strict';

define(['vueLoader'], function (loader) {
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
    },
    components: {},
    methods: {},
    mounted: function mounted() {}
  };
});