'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: {
            model: {
                default: {}
            },
            callback: {}
        },
        methods: {
            addlink: function addlink() {
                loader.loadLinkDialog({ model: this.model, callback: this.callback });
            }
        }
    };
});