'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: ['module', 'thisModule', 'moduleList', 'addModuleListIndex', 'icon-name'],
        data: function data() {
            return {
                show: false,
                activeName: '1',
                thisModule: '组件',
                showElement: false,
                type: 'tplList',
                showWitch: '0',
                moduleCategoryList: [{
                    name: '组件分类'
                }],
                moduleConfig: [{
                    name: "元素组件",
                    show: true,
                    modules: [{
                        name: '文字',
                        component: 'font',
                        image: 'images/components/icon_wenzi.png',
                        code: ['SHOW', 'B2C', 'B2B2C', 'NEWS'] //区分展示版/商城版
                    }, {
                        name: '图片',
                        component: 'add-picture',
                        image: 'images/components/icon_tupian.png',
                        code: ['SHOW', 'B2C', 'B2B2C', 'NEWS']
                    }, {
                        name: '按钮',
                        component: 'button-type',
                        image: 'images/components/icon_anniu.png',
                        code: ['SHOW', 'B2C', 'B2B2C', 'NEWS']
                    }]
                }, {
                    name: "内容组件",
                    show: true,
                    modules: [{
                        name: '图文组件',
                        component: 'article',
                        image: 'images/components/icon_tuwen.png',
                        code: ['SHOW', 'B2C', 'B2B2C', 'NEWS']
                    }, {
                        name: '列表多图',
                        component: 'imagelist',
                        image: 'images/components/icon_duotu.png',
                        code: ['SHOW', 'B2C', 'B2B2C', 'NEWS']
                    }, {
                        name: '轮播多图',
                        component: 'carousel',
                        image: 'images/components/icon_lunboduotu.png',
                        code: ['SHOW', 'B2C', 'B2B2C', 'NEWS']
                    }, {
                        name: '文章列表',
                        component: 'articlelist',
                        image: 'images/components/icon_wenzlb.png',
                        code: ['SHOW']
                    }, {
                        name: '新闻列表',
                        component: 'articlelistNews',
                        image: 'images/components/icon_wenzlb.png',
                        code: ['B2C', 'B2B2C', 'NEWS']
                    }, {
                        name: '产品展示',
                        component: 'productList',
                        image: 'images/components/icon_cpzs.png',
                        code: ['SHOW']
                    }, {
                        name: '商品列表',
                        component: 'productShowList',
                        image: 'images/components/icon_tupian.png',
                        code: ['B2C', 'B2B2C', 'NEWS']
                    }, {
                        name: '魔方导航',
                        component: 'magicNavi',
                        image: 'images/components/icon_tuwen.png',
                        code: ['SHOW', 'B2C', 'B2B2C', 'NEWS']
                    }]
                }, {
                    name: "容器组件",
                    show: true,
                    modules: [{
                        name: '通栏',
                        type: 'group-container',
                        image: 'images/components/icon_tognlan.png',
                        code: ['SHOW', 'B2C', 'B2B2C', 'NEWS']
                    }, {
                        name: '标签',
                        component: 'tabs',
                        image: 'images/components/icon_biaoqian.png',
                        code: ['SHOW', 'B2C', 'B2B2C', 'NEWS']
                    }]
                }, {
                    name: "功能组件",
                    show: false,
                    modules: [{
                        name: '在线地图',
                        component: 'map',
                        image: 'images/components/icon_zxdt.png',
                        code: ['SHOW', 'B2C', 'B2B2C', 'NEWS']
                    }, {
                        name: '产品搜索',
                        component: 'search',
                        image: 'images/components/icon_chanpss.png',
                        code: ['SHOW', 'B2C', 'B2B2C', 'NEWS']
                    }, {
                        name: '在线客服',
                        component: 'customer-service',
                        image: 'images/components/icon_kefu.png',
                        code: ['SHOW', 'B2C', 'B2B2C', 'NEWS']
                    }, {
                        name: '在线视频',
                        component: 'youku',
                        image: 'images/components/icon_zxsp.png',
                        code: ['SHOW', 'B2C', 'B2B2C', 'NEWS']
                    }, {
                        name: '留言板',
                        component: 'msg-board',
                        image: 'images/components/icon_zxly.png',
                        code: ['SHOW', 'B2C', 'B2B2C', 'NEWS']
                    }]
                }]
            };
        },
        created: function created() {},

        methods: {
            //添加模板切换功能加显示对应的模块列表
            showModuleList: function showModuleList(index, moduleName) {
                app.showModuleList(index, moduleName);
            },
            toggleIcon: function toggleIcon() {
                this.show = false;
                // 修改三个按钮的打开状态
                app.iconName = this.iconName = this.iconName == this.type ? "" : this.type;
                //加载内容的代码转移到此处
            }
        },
        components: {
            'palette-item': loader.load('tools/palette-item')
        }
    };
});