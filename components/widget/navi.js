'use strict';

define([], function () {
    return {
        props: {
            model: {
                default: {}
            }
        },
        data: function data() {
            return {
                menuVisible: false,
                hover: false,
                scrollTop: 0
            };
        },

        computed: {
            titleStyle: function titleStyle() {
                var x = {
                    'font-family': '微软雅黑',
                    'font-size': '16px',
                    'text-align': 'center'
                };
                switch (this.model.type) {
                    case 0:
                        x['background-color'] = this.model.color1;
                        x.color = 'white';
                        x['font-family'] = '微软雅黑';
                        break;
                    case 1:
                    case 2:
                    case 3:
                        x['background-color'] = this.model.color1;
                        x.color = 'white';
                        break;
                }

                return x;
            },
            menuStyle: function menuStyle() {
                var x = {
                    'transform': 'translateY( -' + this.scrollTop + 'px)',
                    'font-family': '微软雅黑',
                    'font-size': '14px'
                };
                switch (this.model.type) {
                    case 0:
                        x['background-color'] = 'white';
                        break;
                    case 1:
                        x['background-color'] = this.model.color1;
                        x.color = 'white';
                        break;
                    case 2:
                    case 3:
                        x.color = 'black';
                        x['background-color'] = "#F1f1f1";
                        break;
                }
                return x;
            }
        },
        mounted: function mounted() {
            var _this = this;

            this.scrollTop = app.getScrollTop();
            window.addEventListener('scroll', function (v) {
                _this.scrollTop = app.getScrollTop();
            });
        },

        methods: {
            showMenu: function showMenu() {
                this.menuVisible = !this.menuVisible;
            }
        }
    };
});