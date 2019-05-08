'use strict';

/**
 * 组件包，这里应该靠用AMD模式来写。
 * @type {{created: myMixin.created, data: (()), methods: {hello: myMixin.methods.hello}}}
 */
window.Component = window.Component || {};

/**
 * 绑定
 * @param el 指定对象的el
 * @param cpt 组定的组件名
 * @returns {*}
 */
Component.bind = function (el, cpt) {
    var x = $('<temp></temp>');
    $(el).append(x);
    var C = cpt.extend({
        el: x.get(0)
    });

    return new C();
};

/**
 * 画板元素
 * @type {*}
 */
Component.PaletteItem = Vue.extend({
    template: '<div>{{model.name}}</div>',
    props: ['model'],
    mixins: [{
        mounted: function mounted() {
            //让画板元素可以被拖拽
            $(this.$el).draggable({
                revert: true
            });
        },

        methods: {
            init: function init(item) {}
        }
    }]
});

/**
 * 画板
 * props:[items]
 * @type {*}
 */
Component.Palatte = Vue.extend({
    template: '<ol><li v-for="(item,index) in items"><pitem class="paletteItem" :model="item" :idx="index"><pitem></pitem></li></ol>',
    mixins: [{
        created: function created() {},
        props: {
            items: {
                type: Array,
                default: []
            }
        },
        data: function data() {
            return {};
        },

        methods: {
            init: function init(item) {}
        },
        components: {
            pitem: Component.PaletteItem
        }
    }]
});

var common = {
    mounted: function mounted() {
        var _this = this;

        var el = $(this.$el);
        var self = this;
        el.draggable({
            containment: 'parent',
            stop: function stop(e) {
                if (self.model.style) for (var s in self.model.style) {
                    self.model.style[s] = $(this).get(0).style[s];
                }
            }
        });
        el.resizable({
            stop: function stop(e) {
                if (self.model.style) for (var s in self.model.style) {
                    self.model.style[s] = $(this).get(0).style[s];
                }
            }
        });

        //双击打开对话框
        el.dblclick(function () {
            window.__dialog = window.__dialog || Component.bind($('#dialog'), Component.Dialog);
            window.__dialog.open(_this);
        });
        //增加Action
        el.bind({
            mouseenter: function mouseenter() {},
            mouseleave: function mouseleave() {}
        });
    },
    setModel: function setModel(model) {
        this.model = model;
    }
};

/**
 * 组件属性编辑对话框
 */
Component.Dialog = Vue.extend({
    template: '<div> <div v-for="(val, key, index) in config" :style="val.style">' + '<span>{{key}}:</span> ' + '<input v-if="val.type==\'Text\'" v-model="model[key]"/>' + '<span v-if="val.type==\'Image\'"><input readonly v-model="model[key]"/><button>选择</button></span>' + '<span v-if="val.type==\'RichText\'"><textarea  style="val.style" v-model="model[key]"/></span>' + '</div></div>',
    mixins: [{
        data: function data() {
            return {
                config: {
                    // key: null,
                },
                model: {},
                owner: {}
            };
        },
        mounted: function mounted() {
            var self = this;
            $(this.$el).dialog({
                autoOpen: false,
                buttons: {
                    '保存': function _() {
                        self.close();
                    },
                    '取消': function _() {
                        $(self.$el).dialog("close");
                    }
                }
            });
        },

        methods: {
            open: function open(owner) {
                this.model = JSON.parse(JSON.stringify(owner.model));
                this.config = owner.propSet[owner.defPropSet];
                this.owner = owner;
                $(this.$el).dialog("open");
            },
            close: function close() {
                this.owner.model = JSON.parse(JSON.stringify(this.model));
                $(this.$el).dialog("close");
            }
        }
    }]
});

/**
 * 图文组件
 */
Component.ImageAndTextCpt = Vue.extend({
    template: '<div class="imageAndTextCpt" style="word-wrap:break-word" :style="model.style">' + '<img align="left" hspace="5" vspace="5" :src="model.image" :style="model.imageStyle"/>' + '{{model.text}}</div>',
    mixins: [{
        props: {
            model: {
                default: {}
            }
        },
        data: function data() {
            return {
                propSet: {
                    0: {
                        image: { type: 'Image' },
                        text: {
                            type: 'RichText', style: {
                                position: 'absolute',
                                height: '100px',
                                width: '200px'
                            }
                        }
                    },
                    1: {}
                },
                defPropSet: 0
            };
        },

        methods: {}
    }, common]
});

Component.ImageListCpt = Vue.extend({
    template: '<div class="ImageListCpt" ><div style="float:left"  :style="model.style" v-for="image in model.images"><img :src="image.src" :style="image.style"/></div></div>',
    mixins: [{
        props: {
            model: {
                default: {}
            }
        },
        methods: {}

    }, common]
});

Component.SwiperCpt = Vue.extend({
    template: '<div class="swiperCpt swiper-container swiper-container-horizontal" :style="model.style">' + '<div class="swiper-wrapper">' + '<div v-for="(image,index) in model.images" class="swiper-slide "><img :src="image.src" :style="image.style">{{index}}</div>' + '</div>' + '<div class="swiper-button-next"></div>' + '<div class="swiper-button-prev"></div>' + '</div>',
    mixins: [{
        props: {
            model: {
                default: {}
            }
        },
        watch: {
            'model.style.width': function modelStyleWidth(w) {
                new Swiper('.swiper-container', {
                    loop: true,
                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                });
            }
        },
        methods: {
            init: function init() {
                new Swiper('.swiper-container', {
                    loop: true,

                    // 如果需要前进后退按钮
                    navigation: {

                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                });
            }
        },
        mounted: function mounted() {
            var _this2 = this;

            //TODO 仅作为测试使用
            setTimeout(function () {
                _this2.init();
            });
        }
    }, common]
});