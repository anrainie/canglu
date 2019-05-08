'use strict';

define(['vueLoader', 'vuedraggable'], function (loader, draggable) {
    return {
        props: {
            model: {
                default: {}
            },
            key: {
                default: ''
            }
        },
        data: function data() {
            return {
                selected: {},
                loading: false
            };
        },

        methods: {
            setLink: function setLink(model) {
                this.model.image.link = model;
            },
            setSelection: function setSelection(im) {
                im.selected = im.selected ? false : true;
                if (im.selected) this.selected = im;else if (im === this.selected) {
                    this.selected = {};
                    for (var i = 0; i < this.model[this.key].length; i++) {
                        var s = this.model[this.key][i];
                        if (s.selected) {
                            this.selected = s;
                            break;
                        }
                    }
                }
                this.$forceUpdate();
            },
            sort: function sort(e) {
                return $.inArray(e, this.model.images);
            },
            sorted: function sorted(e) {},
            selectAll: function selectAll() {
                this.model[this.key].forEach(function (e, i) {
                    e.selected = true;
                });
                this.$forceUpdate();
            },
            deselectAll: function deselectAll() {
                this.model[this.key].forEach(function (e) {
                    e.selected = false;
                });
                this.$forceUpdate();
            },
            deleteImage: function deleteImage() {
                var _this = this;

                for (var i = 0; i < this.model[this.key].length;) {
                    if (this.model[this.key][i].selected) this.model[this.key].splice(i, 1);else i++;
                }
                this.loading = true;
                setTimeout(function () {
                    _this.loading = false;
                }, 500);
            },
            change: function change() {

                var self = this;
                loader.loadImageDialog({
                    model: {},
                    callback: function callback(model) {
                        self.selected.src = model.src;
                        if (!self.selected.hsrc) self.selected.hsrc = '';
                        self.$forceUpdate();
                    },
                    selectChanged: function selectChanged(selected, item, index) {},

                    multiselect: false
                });
            },
            add: function add() {
                var temp = {
                    images: []
                };
                var self = this;
                loader.loadImageDialog({
                    model: {},
                    callback: function callback() {
                        if (temp.images) {
                            temp.images.forEach(function (e) {
                                if (self.model[self.key].length < 8) {
                                    var img = JSON.parse(JSON.stringify(e));

                                    img.link = {
                                        type: 0,
                                        local: '',
                                        open: '_blank',
                                        net: ''
                                    };
                                    img.hsrc = '';

                                    self.model[self.key].push(img);
                                }
                            });
                        }
                        self.$forceUpdate();
                    },
                    selectChanged: function selectChanged(selected, item, index) {
                        if (selected && item.src) {
                            item.selected = false;
                            temp.images.push(item);
                        } else {
                            temp.images.splice($.inArray(item, temp.images), 1);
                        }
                    },

                    multiselect: true
                });
            },
            addLink: function addLink(model) {}
        },
        mounted: function mounted() {
            window.imp = this;
            this.model.borderStyle['border-color'] = "#0094ff";
        },


        components: {
            addlink: loader.load('dialog/editing/addlink'),
            draggable: draggable
        }
    };
});