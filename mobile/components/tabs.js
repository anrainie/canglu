'use strict';

// 标签组件
define(['vueLoader'], function (loader) {

    return {
        props: {
            model: {
                default: {
                    tabs: [{
                        title: '标签1',
                        name: '0',
                        group: JSON.parse(JSON.stringify(app.groupItemconfig))
                    }, {
                        title: '标签2',
                        name: '1',
                        group: JSON.parse(JSON.stringify(app.groupItemconfig))
                    }],
                    def: {
                        defHeight: true,
                        defbackground: true,
                        defHoverColor: true,
                        height: 70,
                        defborder: true,
                        'background-image': '',
                        showBorderLeft: true,
                        showBorderRight: true,
                        showBorderTop: true,
                        showBorderBottom: true,
                        tabFont: true,
                        tabSelectedFont: true,
                        tabWidth: true,
                        tabHeight: true,
                        tabBg: true,
                        tabSelectedBg: true,
                        tabMargin: true

                    },
                    font: {},
                    backgroundStyle: {
                        useDefault: true,
                        'background-color': '#fff',
                        'background-image': ''
                    },
                    titleBarStyle: {
                        'background-color': '#inherit',
                        'background-image': '',
                        height: 40,
                        show: false,
                        useDefault: true
                    },
                    style: {
                        width: '100%',
                        height: '400px'
                    },
                    barStyle: JSON.parse(JSON.stringify(app.tabsConfig.barStyle)),
                    tabStyle: JSON.parse(JSON.stringify(app.tabsConfig.tabStyle)),
                    tabSelectedStyle: JSON.parse(JSON.stringify(app.tabsConfig.tabSelectedStyle)),
                    type: 0
                }
            },
            editingConfig: {
                default: {
                    needInitial: false,
                    title: '标签页',
                    pages: {
                        '常规': {
                            tabs: {
                                component: 'dialog/editing/tabsEdit'
                            }
                        },
                        '样式': {
                            type: {
                                config: [{
                                    image: 'images/components/tabsType1.png'
                                }],
                                component: 'dialog/setting/tabsType'
                            }
                        }
                    }
                }
            }
        },
        data: function data() {
            var self = this;
            return {
                HC: '',
                activePanel: '0',
                settingConfig: function settingConfig() {
                    loader.createVue('dialog/setting/tabs-setting-dialog', function (dialogVue) {
                        self.editDialog = dialogVue;
                        self.editDialog.setModel(self.model);
                        //这句别删，会影响功能
                        self.editDialog.setConfig(self.setting);
                        self.editDialog.setParent(self);
                        loader.fill("#tempdialog", dialogVue);
                        self.editDialog.open(function (model) {});
                    });
                }
            };
        },

        computed: {
            barStyle: function barStyle() {
                return {
                    'height': this.model.type == 0 ? this.model.barStyle.height + 'px' : '100%',
                    'background-color': this.model.barStyle['background-color'],
                    'background-image': this.model.barStyle['background-image'],
                    'border-left': this.model.barStyle.showBorderLeft ? this.borderStyle : '0',
                    'border-right': this.model.barStyle.showBorderRight ? this.borderStyle : '0',
                    'border-top': this.model.barStyle.showBorderTop ? this.borderStyle : '0',
                    'border-bottom': this.model.barStyle.showBorderBottom ? this.borderStyle : '0'
                };
            },
            borderStyle: function borderStyle() {
                return this.model.barStyle['border-width'] + 'px ' + this.model.barStyle['border-style'] + ' ' + this.model.barStyle['border-color'];
            },
            groupH: function groupH() {
                var h = this.model.type == 0 ? this.model.style.height.replace(/px/, '') - this.model.barStyle.height : parseInt(this.model.style.height);
                return h;
            },
            groupL: function groupL() {
                var l = this.model.type == 0 ? '0' : '180px';
                return l;
            }
        },
        watch: {
            'model': {
                handler: function handler(val, oldValue) {},
                deep: true
            }
        },
        mounted: function mounted() {},

        methods: {
            filter: function filter(e) {
                switch (e) {
                    case 'tabs':
                        alert("不支持组件" + e);
                        return false;
                }
                return true;
            },
            setSelection: function setSelection(item) {
                this.activePanel = item.name;
            },
            tabStyle: function tabStyle(name) {
                if (!this.model.tabStyle) this.model.tabStyle = {};
                if (!this.model.tabSelectedStyle) this.model.tabSelectedStyle = {};
                var r = {
                    width: this.model.type == 0 ? this.model.tabStyle.width + 'px' : '180px',
                    height: this.model.type == 0 ? this.model.tabStyle.height + 'px' : this.model.barStyle.height + 'px',
                    'font-size': this.model.tabStyle['font-size'] + 'px',
                    'font-family': this.model.tabStyle['font-family'],
                    'margin-left': this.model.type == 0 ? this.model.tabStyle['margin-left'] + 'px' : 0,
                    'border-radius': this.model.tabStyle['border-radius'] / 100 * this.model.tabStyle.height + 'px'
                };
                r['color'] = name == this.activePanel ? this.model.tabSelectedStyle['color'] : this.model.tabStyle['color'];
                r['background-color'] = name == this.activePanel ? this.model.tabSelectedStyle['background-color'] : this.model.tabStyle['background-color'];
                this.HC = this.model.tabSelectedStyle['background-color'];
                if (null == this.model.tabSelectedStyle['background-image']) this.model.tabSelectedStyle['background-image'] = '';

                if (null == this.model.tabStyle['background-image']) this.model.tabStyle['background-image'] = '';

                r['background-image'] = name == this.activePanel ? this.model.tabSelectedStyle['background-image'] : this.model.tabStyle['background-image'];

                return r;
            },
            dropped: function dropped() {},

            // random() {
            //     return Math.ceil(Math.random() * 17 * 19 * 31);
            // },
            // addTab() {
            //     let id = this.random() + '';
            //     let item = {
            //         title: '标签' + id,
            //         name: id,
            //         group: JSON.parse(JSON.stringify(app.groupItemconfig))
            //     };
            //     this.model.tabs.push(item);
            //
            //     this.activePanel = item.name;
            //
            // },
            removeTab: function removeTab(targetName) {
                var tabs = this.model.tabs;
                var activeName = this.activePanel;
                if (activeName === targetName) {
                    tabs.forEach(function (tab, index) {
                        if (tab.name === targetName) {
                            var nextTab = tabs[index + 1] || tabs[index - 1];
                            if (nextTab) {
                                activeName = nextTab.name;
                            }
                        }
                    });
                }
                this.activePanel = activeName;
                this.model.tabs = tabs.filter(function (tab) {
                    return tab.name !== targetName;
                });
            },
            hover: function hover(e) {
                //                let ele=$(e.target).parent()
                //                if(this.model.tabStyle.hoverColor["background-color"]===undefined) this.model.tabStyle.hoverColor["background-color"]='';
                //                let color=this.model.tabStyle.hoverColor["background-color"]
                //                if (ele.hasClass('tabsHover')) {
                //                    this.HC = ele.css('background-color');
                //                    ele.css({
                //                        'background-color':color
                //                    });
                //                }
            },
            out: function out(e) {
                var ele = $(e.target).parent();
                ele.css({
                    'background-color': this.HC
                });
            }
        }
    };
});