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
        watch: {
            model: {
                deep: true,
                handler: function handler(v) {
                    this.cpts = {};
                    this.cpts = v.model.cpts;
                }
            }
        },
        data: function data() {
            return {
                selected: {},
                cpts: [],
                onSrc: '',
                inx: -1,
                loading: false
            };
        },

        methods: {
            setSelection: function setSelection(im, n) {
                im.selected = im.selected ? false : true;
                var src = im.settingConfig.canvasStyle.src;
                this.onSrc = src;
                this.inx = n;
                if (im.selected) {
                    this.selected = im;
                    this.selected['src'] = src;
                } else if (src === this.selected.src) {
                    this.selected = {};
                    this.onSrc = '';
                    for (var i = 0; i < this.cpts.length; i++) {
                        var s = this.cpts[i];
                        if (s.selected) {
                            this.selected = s;
                            break;
                        }
                    }
                }
                this.$forceUpdate();
            },
            sorted: function sorted(e) {
                this.model.model.cpts = this.cpts;
            },
            selectAll: function selectAll() {
                this.cpts.forEach(function (e, i) {
                    e.selected = true;
                });
                this.$forceUpdate();
            },
            deselectAll: function deselectAll() {
                this.cpts.forEach(function (e) {
                    e.selected = false;
                });
                this.$forceUpdate();
            },
            deleteImage: function deleteImage() {
                var _this = this;

                this.onSrc = '';
                this.inx = -1;
                for (var i = 0; i < this.cpts.length;) {
                    if (this.cpts[i].selected) {
                        this.model.model.cpts.splice(i, 1);
                    } else i++;
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
                        self.onSrc = '';
                        setTimeout(function () {
                            self.onSrc = model.src;
                        }, 100);
                        self.model.model.cpts[self.inx].settingConfig.canvasStyle.src = model.src;
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
                                var mod = JSON.parse(JSON.stringify(app.groupItemconfig));
                                mod.settingConfig.config.def = 1;
                                mod.settingConfig.canvasStyle.src = e.src;
                                self.model.model.cpts.push(JSON.parse(JSON.stringify(mod)));
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
            addLink: function addLink(model) {
                var lk = this.model.model.cpts[this.inx].model;
                lk['link'] = model.link;
            }
        },
        mounted: function mounted() {
            window.imp = this;
        },


        components: {
            addlink: loader.load('dialog/editing/addlink'),
            draggable: draggable
        }
    };
});