'use strict';

var domain = 'http://dev.jz.cangluxmt.com/';
var app = new Vue({
    // el: '#app',
    data: function data() {
        return {
            shopNavtStyle: {
                'color': '#333',
                'active-text-color': '#666',
                'font-size': '14px',
                'font-family': '宋体',
                'font-weight': 'normal',
                'font-style': 'normal',
                'text-decoration': 'normal'
            },
            paddingStyle: {
                'padding-left': 10,
                'padding-right': 0
            },
            bgStyle: {
                'background-color': '#fff',
                'background-image': ''
            },
            //中间线
            centerLineShow: false,
            // 单位
            unit: 'px',
            //自由容器默认配置
            groupItemconfig: {
                model: {
                    cpts: [],
                    link: {
                        type: 0,
                        local: '',
                        net: '',
                        open: ''
                    }
                },
                settingConfig: {
                    canvasStyle: {
                        color: '#fff',
                        src: '',
                        repeat: 'no-repeat',
                        size: 'cover',
                        position: 'center',
                        top: '0px'
                    },
                    mobileCanvasStyle: {
                        color: '#66b1ff',
                        src: '',
                        repeat: 'no-repeat',
                        size: 'cover',
                        position: 'center',
                        top: '0px'
                    },
                    mobileFooterStyle: {
                        color: '#fff'
                    },
                    config: {
                        def: 0,
                        bgStyle: 0
                    },
                    style: {
                        height: '200px',
                        padding: '',
                        border: {},
                        margin: ''
                    }
                }

            },
            //标签默认配置
            tabsConfig: {
                barStyle: {
                    height: 70,
                    width: 100,
                    'background-image': '',
                    'border-color': '#CCC',
                    'border-width': 1,
                    'border-style': 'solid',
                    showBorderLeft: true,
                    showBorderRight: true,
                    showBorderTop: true,
                    showBorderBottom: true,
                    hoverColor: '#fff'
                },
                tabStyle: {
                    width: 100,
                    height: 40,
                    'border-radius': 0,
                    'hoverColor': {
                        'background-color': ''
                    },
                    'font-size': 14,
                    'font-family': '微软雅黑',
                    'color': '#000',
                    // 'background-color': '#26ecf1',
                    'background-color': '#f2f2f2',
                    'margin-left': 10,
                    'background-image': ''
                },
                tabSelectedStyle: {
                    'background-color': '#5ca5e2',
                    'color': '#e6ecf3',
                    'background-image': ''
                }
            },
            'z-index': 10,
            contentConfig: {
                backgroundStyle: {
                    useDefault: true,
                    'background-color': '#fff',
                    'background-image': ''
                },
                paddingStyle: {
                    useDefault: true,
                    'padding-top': 0,
                    'padding-bottom': 0,
                    'padding-left': 0,
                    'padding-right': 0
                }
            },
            titleConfig: {
                showMore: {
                    type: 0,
                    visible: false,
                    link: {
                        open: '_blank',
                        local: '',
                        net: ''
                    },
                    color: '#ccc',
                    'font-size': 10,
                    'font-family': '宋体',
                    'font-weight': 'normal',
                    'font-style': 'normal',
                    'text-decoration': '',
                    useDefault: true
                },
                titleBarStyle: {
                    'background-color': '#ffffff',
                    'background-image': '',
                    height: 40,
                    show: true,
                    // 'border-bottom': '',
                    // 'border-color': '',
                    useDefault: true
                },
                titleStyle: {
                    vertical: 1, //0-上 1-居中 2-下
                    horizontal: 0, //0-左 1-居中 2-右
                    color: '#000',
                    'font-size': 14,
                    'font-family': '宋体',
                    'font-weight': 'normal',
                    'font-style': 'normal',
                    'text-decoration': 'normal',
                    useDefault: true
                },
                subTitleStyle: {
                    color: '#666',
                    'font-size': 10,
                    'font-family': '宋体',
                    'font-weight': 'normal',
                    'font-style': 'normal',
                    'text-decoration': 'normal',
                    useDefault: true
                },
                titlePadding: {
                    useDefault: true,
                    'padding-top': '0',
                    'padding-left': '0'
                }
            },
            mobileNav: false,
            // 保存lode
            saveLoading: false,
            // 预览冷却
            toPreivewLoad: false,
            // 当前用户信息
            userInfo: [],
            savePageInfo: {},
            allInfo: {},
            //页面数据缓冲，整页loading
            pageLoaded: false,
            //文章缓存
            aritcleCache: {},
            //文章分类缓存
            aritcleCategoryCache: {},
            pageContent: [], //获取页面信息。保存页面
            /**
             * ------------
             */
            cellList: [],
            firstParentId: [],
            allPageList: [],
            webcode: '',
            hasCallBack: false,
            classyDialogTitle: "",
            firstTime: true,
            /**这里只放一些做通用效果变量 */
            // 局部loading是否显示
            topoLoading: false,
            /**这里只放一些做通用效果变量  end*/
            currentModuleID: '',
            showElement: false,
            font: {},
            /** PC移动端区分 */
            channel: '',
            /**预览模式*/
            isPreview: false,
            isShowPC: true,
            groupContainer: {
                common: {
                    def: false,
                    value: 1200,
                    canvasStyle: {
                        color: '#f2f2f2',
                        src: '',
                        repeat: '',
                        size: '',
                        position: ''
                    },
                    config: {
                        def: 0,
                        bgStyle: 0
                    },
                    conts: {
                        header: {
                            name: '顶栏区',
                            visible: true
                        },
                        banner: {
                            name: '横幅区',
                            visible: true
                        },
                        body: {
                            name: '内容区',
                            visible: true
                        },
                        bottom: {
                            name: '底栏区',
                            visible: true
                        }
                    }
                },
                header: {
                    id: 'head',
                    model: {
                        cpts: []
                    },
                    settingConfig: {
                        canvasStyle: {
                            color: 'rgba(255,255,255,1)',
                            src: '',
                            repeat: '',
                            size: '',
                            position: ''
                        },
                        config: {
                            def: 0,
                            bgStyle: 0
                        },
                        style: {
                            height: '250',
                            padding: '',
                            border: {},
                            margin: ''
                        }
                    },
                    memember: {
                        show: true,
                        btnShow: false,
                        type: 1,
                        modify: 1 //判断数据是否进行修改过,页面显示的数据结构与后台数据结构不一样; 1是没修改 2是修改了
                    }
                },
                navigation: { //读不到数据的时候的默认配置
                    navFixed: false,
                    navShow: true,
                    style: {
                        top: '0px',
                        height: '80px',
                        left: '0px'
                    },
                    'line-height': "80px",
                    'font-size': '14px',

                    'show-underline': false,
                    'activeColor': {
                        color: '#fff',
                        src: 'http://0.ss.faisys.com/image/default/demo.png'
                    },
                    'background-color': '#f2f2f2',
                    'text-color': '#999',
                    'active-text-color': '#ffd04b',
                    'hover-color': '#f12305',
                    navOrders: {}
                },
                banner: {
                    id: 'banner',
                    isAlone: 2, //是否为独立横幅 1是 2否
                    webBanner: {
                        type: 0,
                        carousel: {
                            autoplay: true,
                            interval: 3000
                        },
                        model: {
                            cpts: []
                        },
                        settingConfig: {
                            canvasStyle: {
                                color: 'rgba(255,255,255,1)',
                                src: '',
                                repeat: '',
                                size: '',
                                position: ''
                            },
                            config: {
                                def: 0,
                                bgStyle: 0
                            },
                            style: {
                                height: '450',
                                padding: '',
                                border: {},
                                margin: ''
                            }
                        }
                    }
                },
                body: {
                    id: 'body',
                    model: {
                        cpts: []
                    },
                    settingConfig: {
                        canvasStyle: {
                            color: 'rgba(255,255,255,1)',
                            src: '',
                            repeat: '',
                            size: '',
                            position: ''
                        },
                        config: {
                            def: 0,
                            bgStyle: 0
                        },
                        style: {
                            height: '200px',
                            padding: '',
                            border: {},
                            margin: ''
                        }
                    },
                    pageBanner: {
                        model: {
                            cpts: []
                        },
                        type: 0,
                        carousel: {
                            autoplay: true,
                            interval: 3000
                        },
                        settingConfig: {
                            canvasStyle: {
                                color: '#f2f2f2',
                                src: '',
                                repeat: '',
                                size: '',
                                position: ''
                            },
                            config: {
                                def: 0,
                                bgStyle: 0
                            },
                            style: {
                                height: '450',
                                padding: '',
                                border: {},
                                margin: ''
                            }
                        }
                    }
                },
                bottom: {
                    id: 'bottom',
                    model: {
                        cpts: []
                    },
                    settingConfig: {
                        canvasStyle: {
                            color: 'rgba(51,51,51,1)',
                            src: '',
                            repeat: '',
                            size: '',
                            position: '',
                            'background-color': '#fff',
                            navList: []
                        },

                        config: {
                            def: 0,
                            bgStyle: 0
                        },
                        style: {
                            height: '300px',
                            padding: '',
                            border: {},
                            margin: ''
                        }
                    }
                }
            },
            isInfoPage: false,
            images: {},
            search: {},
            /** 设计--》主题颜色&&内容区 */
            hasSysWeb: false,
            setStyle: false, //设置框是否显示
            resolution: 1200, //内容区域大小
            themecolor: '', //当前主题颜色
            othertheme: '', //自定义颜色
            showhistory: false, //显示历史版本


            /*** 页面管理编辑闪存 用于暂时存储显示当前编辑中的数据 */

            /*** 页面管理编辑闪存 end */
            /* 存为系统模板 */
            saveTemplateisDialogShow: 0, //弹窗开关
            /* 存为系统模板 end*/
            //导航类型
            navType: {},
            iconName: '', //模板名字的
            //添加模板功能
            thisModule: '',
            moduleCategoryList: [], //模块分类列表f
            moduleList: [{
                id: '1',
                moduleCode: '11',
                thumbImage: 'https://w2.hoopchina.com.cn/22/ac/c1/22acc14fc3942a35de4ed28c85315bf8001.jpg'
            }, {}], //模块列表


            reqFirstModuleFlg: 0, //默认只请求一次第一个模块
            addModuleListIndex: -1,
            tplTopLevelArr: [], //模板顶级分类数组
            tplTopLevelCode: '',
            tplTopLevelArrIndex: -1, //模板顶级分类数组
            // tplChildLevelArr: [], //模板二级分类数组
            OnetplLevelArr: [], //模板【可以删除的变量】
            TwotplLevelArr: [], //模板【可以删除的变量】
            ThreetplLevelArr: [], //模板三级分类数组【可以删除的变量】
            secondLevelTpl: [], //二级下拉框要遍历的数组
            webTypeArr: [], //网站类型数组
            tplThemeColorArr: [], //模板类型主题颜色数组

            tplLevelCode: '', //请求网站模板数据时要传网站级别参数(免费或者会员)
            tplWebName: '', //网站名称,
            tplWebInfoList: [], //二级网站列表数组
            items: [],
            /*==================================*/
            general: {
                'bgcolor': '',
                'margintop': 0,
                'marginbottom': 0,
                'bgpic': ' ',
                'if': '',
                'pdtop': '',
                'pdbot': ''
            },
            //自定义模块 高度
            selfDefined: "600",
            userWebId: '',
            // ssid:app.toSessionStorage("ssid"),
            toalType: '',
            navs: [],
            themes: [],
            sites: [],
            elementsName: '',
            industryA: [],
            industryB: [],
            industryC: [],
            title: "上传图片",
            //元素分类
            eleclass: [],
            //元素列表
            elementList: [],
            rows: "",
            modlists: [], //模块列表
            modpics: [],
            rowtemplate: {
                sort: 0,
                sorts: 0,
                name: '',
                sex: '',
                province: '',
                provinces: '',
                link: '',
                placelink: '',
                mode: '',
                srcs: ''
            },
            firstPath: [],
            secondPath: [],
            //我的模板历史记录
            myTemplate: [],
            // currentIndex: 0,
            currentMenuId: 0,
            secondary: false,
            //栏目预览样式
            defaultSelect: [],
            theDefaultSelect: [],
            theDefaultSelects: [],
            theDefaultSelecths: [],
            particulars: true,
            firstVal: "", //内容调取栏目一级菜单
            secondVal: "", //内容调取栏目二级菜单
            obtainNumber: "", //内容调取数量
            contentDraw: {
                'mode': ''
            },
            advertising: {
                proImg: "",
                picheight: '600',
                picwidth: '215'
            },
            firstNavigation: "", //栏目一级菜单
            secondNavigation: "", //栏目二级菜单
            columnsPath: { //栏目链接
                firstval: "请选择", //一级栏目
                secondval: "请选择", //二级栏目
                path: "" //自定义链接
            },
            columntype: '',
            columnName: '',
            Classify: { //分类
                pro: { //产品分类
                    oneClassify: [], //分类一级
                    childsSeconds: [], // 二级分类
                    childsThirds: [] // 三级级分类
                },
                news: { //产品分类
                    oneClassify: [], //分类一级
                    childsSeconds: [], // 二级分类
                    childsThirds: [] // 三级级分类
                }
            },
            sbwUserWebInfo: '',
            isUpdatePage: false,
            isB2c: 'shop', //存储商城用户类型
            b2cImaSrc: 'http://test.image.cangluxmt.com/jcshopimage', //存储商城图片路径
            webName: '', //存储网站名称
            saveParams: { //  存储用户数据
                id: null, //  网站ID
                userId: 1, //  用户ID
                domainUrl: ''
            },
            detailHeight: '' //详情页高度
        };
    },
    created: function created() {
        this.toSessionStorage('domain', domain);
        var channelflag = window.location.href.indexOf('mobile') >= 0;
        this.channel = channelflag ? 2 : 1; // 1：PC 2: 微站
        var url = '';
        var isMobile = this.toSessionStorage('channel');
        if (isMobile == null || isMobile == "" || isMobile == undefined) {
            this.toSessionStorage('channel', this.channel);
        } else {
            if (isMobile != this.channel) {
                this.toSessionStorage('channel', this.channel);
            }
        }

        /**
         * 校验网站是否已经获取到用户信息&&网站信息
         * 作用：记录网站类型，网站id，用户
         */
        if (window.location.href.indexOf('wave2') >= 0 || window.location.href.indexOf('clauthweb') >= 0 || window.location.href.indexOf('web') >= 0 || window.location.href.indexOf('ali') >= 0 || window.location.href.indexOf('8889') >= 0) {
            this.isPreview = false;
            url = domain + 'service/index.html?channel=' + this.channel;
        } else {
            url = domain + 'index.html?domainUrl=' + window.location.host;
            this.isPreview = true;
        }
        this.init(url);
    },

    computed: {
        infoPage: function infoPage() {
            if ((navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('iPhone') > -1) && navigator.userAgent.toLowerCase().match(/MicroMessenger/i) != "micromessenger") {
                if ($(window).width() === 375 && $(window).height() === 812) {
                    return "height: calc(100% - 178px);margin-top:89px;";
                } else {
                    return "height: calc(100% - 120px);margin-top:65px;";
                }
            } else {
                if (app.isInfoPage) {
                    return "margin-top:0px;height:100%;overflow-x: hidden;overflow-y: auto;";
                } else {
                    return "";
                }
            }
        },
        overflow: function overflow() {
            if (app.mobileNav) {
                return 'overflow-y:hidden';
            }
        },
        mobileContent: function mobileContent() {
            if (app.isPreview) {
                return 'height:100vh';
            }
        },
        canvasStyle: function canvasStyle() {
            // 通栏背景设置
            var config = {};
            if (this.groupContainer.common.config === undefined) {
                return false;
            }
            if (this.groupContainer.common.config.def) {
                // 非默认背景
                config = this.groupContainer.common.canvasStyle;
            } else {
                // 默认背景
                config = app.groupItemconfig.settingConfig.canvasStyle;
            }

            if (config != undefined) {
                var cs = config;
                var bg = '';
                // 无src 不添加url()
                if (cs['src'] != undefined && cs['src'] != '') bg = 'url("' + cs.src + '")';
                return {
                    'background-color': app.recoverSymbol(cs.color),
                    'background-image': bg,
                    'background-repeat': cs.repeat,
                    'background-size': cs.size,
                    'background-position': cs.position
                };
            }
        }
    },
    methods: {
        /**
         * head的非空校验
         * @param data 数据 :string
         * @param pointer 指针 需要添加数据的指针(this)
         */
        headerCheck: function headerCheck(data, pointer) {
            var D = JSON.parse(data);
            if (!D.memember) D.memember = pointer.groupContainer.header.memember;
            return D;
        },
        getScrollTop: function getScrollTop() {
            var scrollPos = void 0;
            if (typeof window.pageYOffset != 'undefined') {
                scrollPos = window.pageYOffset;
            } else if (typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
                scrollPos = document.documentElement.scrollTop;
            } else if (typeof document.body != 'undefined') {
                scrollPos = document.body.scrollTop;
            }
            return scrollPos;
        },

        /**
         * 键盘操作坐标
         * @param {需要修改的组件model} model
         */
        fineTurn: function fineTurn(el, model) {
            //微站定义可键盘控制的的组件数组
            var canFineTurn = ['font', 'add-picture', 'button-type'];
            var pos = {
                left: parseInt(model.style.left),
                top: parseInt(model.style.top)
            };
            $(document).off().keydown(function (ev) {
                var v = 0;
                if (ev.ctrlKey) {
                    //按下ctrl，键盘操作偏移1px
                    v = 1;
                }
                if (ev.shiftKey) {
                    //按下shift，键盘操作偏移10px
                    v = 10;
                }
                switch (ev.which) {
                    case 37:
                        pos.left -= v;
                        break;
                    case 38:
                        pos.top -= v;
                        break;
                    case 39:
                        pos.left += v;
                        break;
                    case 40:
                        pos.top += v;
                        break;
                }
                //移动式清空工具条
                $('#toolbar').empty();
                model.style.left = pos.left + 'px';
                model.style.top = pos.top + 'px';
            });
        },

        /**
         * 用于新增配置单属性的更新
         * @param 配置单名称
         */
        naviCheck: function naviCheck(param, self) {
            var config = JSON.parse(param);
            if (config['show-underline'] === undefined) {
                config['show-underline'] = this.groupContainer.navigation["show-underline"];
            }
            if (config['activeColor'] === undefined) {
                config['activeColor'] = this.groupContainer.navigation["activeColor"];
            }
            if (config['navOrders'] === undefined) {
                config['navOrders'] = this.groupContainer.navigation["navOrders"];
            }
            return config;
        },
        navCheck: function navCheck(param, self) {
            //logo
            var config = JSON.parse(param);
            if (config.settingConfig.logo === undefined) {
                config.settingConfig.logo = this.groupContainer.navContainer.settingConfig.logo;
            }
            if (config.settingConfig.config.showSelect === undefined) {
                config.settingConfig.config.showSelect = this.groupContainer.navContainer.settingConfig.config.showSelect;
            }
            if (config.settingConfig.config.showStyle === undefined) {
                config.settingConfig.config.showStyle = this.groupContainer.navContainer.settingConfig.config.showStyle;
            }
            if (config.settingConfig.showStyle === undefined) {
                config.settingConfig.showStyle = this.groupContainer.navContainer.settingConfig.showStyle;
            }

            return config;
        },
        footerNavCheck: function footerNavCheck(param, self) {
            var config = JSON.parse(param);
            return config;
        },
        init: function init(url) {
            var _this = this;
            $.ajax({
                type: "GET",
                url: url,
                dataType: "json",
                async: 'false',
                success: function success(res) {
                    var serviceType = res.data.serviceType; //服务类型(pc+微站、小程序、android、ios、公众号)
                    var status = res.data.status;
                    _this.channel = res.data.channel;
                    if (!res.success) {
                        // 获取用户失败
                        if (res.total == 999) {
                            //登录过期
                            showToast({
                                title: '提示',
                                msg: res.message,
                                cancleBar: '取消',
                                confirmBar: '重新登录',
                                confirm: function confirm(e) {
                                    window.location.href = "http://www.cangluxmt.com/user/index.html";
                                },
                                cancle: function cancle() {}
                            });
                        } else {
                            //此方法用来判断，如果没有启用pc,则自动跳转到微站，如果微站也没有启用，则提示
                            if (_this.channel == 1 && status != undefined && status == 0) {
                                //PC,停用
                                if (serviceType.indexOf("6") != -1 || serviceType.indexOf("7") != -1 || serviceType.indexOf("8") != -1) {
                                    window.location.href = domain + "clauthweb/mobileIndex.html";
                                }
                            }
                            if (_this.channel == 2 && status != undefined && status == 0) {
                                //微站,停用
                                showTips(res.message);
                            }
                        }
                    } else {
                        //如果服务类型中，没有pc建站，则不显示，右上角按钮
                        if (serviceType != undefined && serviceType.indexOf("2") == -1) {
                            _this.isShowPC = false;
                        }
                        /**
                         * 登录成功
                         * */
                        var data = res.data.sbwUserWebInfo;
                        var oid = _this.toSessionStorage('userId');
                        //设置网页title信息,icon信息
                        document.title = data.title == null ? "-" : data.title;
                        var head = document.getElementsByTagName('head')[0];
                        var link = document.createElement('link');
                        link.rel = "icon";
                        if (data.icon != null && data.icon != undefined && data.icon != "") {
                            link.href = app.b2cImaSrc + data.icon;
                        } else {
                            link.href = 'http://image.cangluxmt.com/clwebsite/basic/images/components/canglu.png';
                        }
                        head.appendChild(link);
                        // 校验登录的用户信息
                        // 更换用户
                        if (oid != data.userId) {
                            _this.delSessionStorage('pageid');
                            _this.delSessionStorage('id');
                            _this.delSessionStorage('userId');
                        }
                        _this.toSessionStorage('userId', data.userId);
                        _this.sbwUserWebInfo = data.name;
                        app.toSessionStorage('id', data.id); //存储用户网站ID
                        app.toSessionStorage('userId', data.userId); //存储用户id
                        app.toSessionStorage('uname', res.data.uname); //存储用户名称
                        app.toSessionStorage('domainUrl', data.domainUrl);
                        _this.saveParams.id = data.id;
                        _this.saveParams.userId = data.userId;
                        _this.saveParams.domainUrl = data.domainUrl;
                        _this.webcode = data.themeCode; //网站类型
                        _this.toSessionStorage('webcode', data.themeCode);

                        _this.toWebsessionStorage('userId', data.userId);
                        _this.toWebsessionStorage('domainUrl', data.domainUrl);
                        _this.toWebsessionStorage('sysWebId', data.sysWebId);
                        if (!data.sysWebId) {
                            _this.pageLoaded = true;
                            msgToast({
                                title: '提示',
                                msg: '您未选择模板，请先选择一个模板',
                                confirmBar: '确定',
                                confirm: function confirm(e) {
                                    // 当用户第一进入（未选择模板时），提示用户选择模板
                                    _this.hasSysWeb = false;
                                    _this.toggleIcon('tpl');
                                    $('#tpl').css({
                                        'z-index': '1000'
                                    });
                                    $('.loading_tier').show();
                                }
                            });
                        } else {
                            // 当用户不是第一进入
                            _this.hasSysWeb = true;
                            _this.resolution = data.resolution; //网站的内容区大小
                            if (data.colorStyle == null) {
                                _this.themecolor = 'ff3d30'; //当前主题色
                                _this.othertheme = 'ff3d30'; //自定义主题色
                            } else {
                                _this.themecolor = data.colorStyle; //当前主题色
                                _this.othertheme = data.colorStyle; //自定义主题色
                            }
                        }
                        // 第一次进来渲染页面
                        _this.loadst();
                        //userList();
                        if (!app.isPreview) {
                            //预加载图片---edit by dengxf 20180414
                            _this.loadImage(function (data) {
                                var r = data.picLibs;
                                for (var i = 0; i < r.length; i++) {
                                    _this.cellList.push({
                                        src: r[i].imgPath,
                                        id: r[i].id
                                    });
                                }
                            });
                            //end
                            //页面栏目分类
                            var categoryUrl = 'service/system/column/category.html';
                            var categoryUrlData = {};
                            productPost(categoryUrl, categoryUrlData, function (callback) {
                                app.navType = callback.data.columnList; //栏目类型
                                app.defaultSelect = callback.data.styleList; //所有栏目预设的样式
                            }, function (callback) {});
                            //请求模板分类信息
                            _this.reqTplcategory();
                        }
                    }
                },
                error: function error(e) {
                    console.error(e);
                }
            });
        },
        loadst: function loadst() {
            var _this2 = this;

            var self = this;
            /**
             * 如果需要选择模板时，则不初始化(load)页面
             */
            if (!self.pageLoaded) {
                setTimeout(function () {
                    // 设置30s超时
                    if (!self.pageLoaded) {
                        _this2.$confirm('网络请求超时，请重试', '提示', {
                            confirmButtonText: '重试',
                            cancelButtonText: '取消',
                            type: 'warning',
                            center: true
                        }).then(function () {
                            window.location.reload();
                        }).catch(function () {});
                    }
                }, 30000);
                self.loadAllPages(function (e) {
                    var pageid = '';
                    /**
                     * 优先加载url的pageid 用来做页面跳转
                     */
                    if (window.location.href.indexOf('pageid') == -1 && app.getRequest().pageid != e.data.userPageList["0"].id) {
                        pageid = e.data.userPageList["0"].id;
                        // window.location.href = '?pageid=' + pageid;
                        app.toWebsessionStorage('firstPage', pageid);
                    } else {
                        pageid = app.getRequest().pageid;
                    }
                    var f = self.getFirstParentId(e.data.userPageList);
                    app.firstParentId = f.firstParentId;
                    app.firstTemplate = f.firstTemplatess;
                    //end

                    self.loadPage(pageid, function (e) {
                        self.pageLoaded = true;
                        var info = JSON.parse(_this2.recoverSymbol(JSON.stringify(e.data.userPageInfo)));
                        if (info.columnCode != 'index') {
                            //设置网页title信息
                            document.title = info.name == null ? "-" : info.name;
                        }
                        self.savePageInfo['name'] = info.name;
                        self.savePageInfo['id'] = info.id;
                        self.savePageInfo['columnCode'] = info.columnCode;
                        var header = info.head;
                        var body = info.body;
                        var bottom = info.bottom;
                        var banner = info.webBanner;
                        var navigation = info.navigation;
                        var common = info.bodyStyle;
                        if (common) _this2.groupContainer.common = JSON.parse(common);
                        if (navigation) _this2.groupContainer.navigation = _this2.naviCheck(navigation, self);
                        if (header) _this2.groupContainer.header = _this2.headerCheck(header, self);
                        if (banner) _this2.groupContainer.banner = JSON.parse(banner);
                        if (bottom) _this2.groupContainer.bottom = _this2.footerNavCheck(bottom, self);
                        if (body) _this2.groupContainer.body = JSON.parse(body);
                    });
                });
            }
        },
        getFirstParentId: function getFirstParentId(arr) {
            var firstParentId = [];
            var firstTemplatess = [];
            arr.forEach(function (e) {
                if (e.pageType != 3) {
                    firstParentId.push(e);
                    if (e.pageType == 2) {
                        if (e.columnCode == 'pro') {
                            app.toWebsessionStorage('proId', e.id);
                        }
                    }
                    if (e.parentId == 0) {
                        firstTemplatess.push(e);
                    }
                    if (e.columnCode == "index") {
                        app.pageContent = e;
                        //linkUrl = e.linkUrl;
                    }
                } else {
                    if (e.columnCode == 'newsd') {
                        app.toWebsessionStorage('ndId', e.id);
                    } else if (e.columnCode == 'prod') {
                        app.toWebsessionStorage('pdId', e.id);
                    }
                }
            });
            return {
                firstParentId: firstParentId,
                firstTemplatess: firstTemplatess
            };
        },
        getPageInfo: function getPageInfo(params, callback, errorback) {
            var picsUrl = domain + 'user/page/' + pageId + '.html';
            $.ajax({
                url: picsUrl,
                type: 'POST',
                data: {
                    id: params
                },
                dataType: 'json',
                success: function success(response) {
                    if (response.success && response.data) {
                        callback && callback(response.data.userPageInfo.name);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        //页面切换
        changePage: function changePage(pageId, detailId, allInfo, openType) {
            if (!app.isPreview) {
                app.savePage();
            }
            if (detailId != undefined && detailId != "") {
                app.toSessionStorage('allInfo', JSON.stringify(allInfo));
                if (app.channel == '2') {
                    if (app.getRequest().nav != undefined) {
                        window.location.href = '?pageid=' + pageId + '&detailid=' + detailId + '&nav=0';
                    } else {
                        window.location.href = '?pageid=' + pageId + '&detailid=' + detailId;
                    }
                } else {
                    if (openType == '0') {
                        window.location.href = '?pageid=' + pageId + '&detailid=' + detailId;
                    } else {
                        window.open('?pageid=' + pageId + '&detailid=' + detailId);
                    }
                }
            } else {
                if (app.getRequest().nav != undefined) {
                    window.location.href = '?pageid=' + pageId + '&nav=0';
                } else {
                    if (window.location.href.indexOf('.html') > -1 && app.isPreview) {
                        if (openType == '0') {
                            window.open('http://' + app.toSessionStorage('domainUrl') + '/' + '?pageid=' + pageId);
                        } else {
                            window.location.href = 'http://' + app.toSessionStorage('domainUrl') + '/' + '?pageid=' + pageId;
                        }
                    } else {
                        if (openType == '0') {
                            window.open('?pageid=' + pageId);
                        } else {
                            window.location.href = '?pageid=' + pageId;
                        }
                    }
                }
            }
        },

        //获取地址栏参数
        getRequest: function getRequest() {
            var url = window.location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        },

        /** 用户留言 */
        userMsg: function userMsg(e) {
            var self = this;
            var picsUrl = domain + 'message/save.html';
            var data = {
                domainUrl: app.toSessionStorage('domainUrl'),
                content: e.message,
                contract: e.name,
                telephone: e.phone,
                email: e.email
            };
            $.ajax({
                url: picsUrl,
                type: 'POST',
                data: data,
                dataType: 'json',
                success: function success(response) {
                    if (response.success) showTips('留言成功！');
                },
                error: function error(err) {
                    if (errorback) errorback();else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        //  预览
        toPreivew: function toPreivew() {
            var self = this;
            if (self.toPreivewLoad) return;
            self.toPreivewLoad = true;
            this.savePage(function (res) {
                if (res.success && res.total == 0) {
                    var url = 'service/user/web/save.html';
                    var data = {
                        userActions: 'preview'
                    };
                    productPost(url, data, function (res) {
                        if (res.success && res.total == 0) {
                            setTimeout(function () {
                                self.toPreivewLoad = false;
                                var msg = res.data;
                                app.$notify({
                                    title: '点击这个链接预览',
                                    position: "top-right",
                                    dangerouslyUseHTMLString: true,
                                    message: '<a href="http://' + res.data + '" target="_blank">http://' + res.data + '</a>',
                                    duration: 5000
                                });
                            }, 10000);
                        }
                    }, function (callback) {});
                } else {
                    showTips('网络繁忙，请稍后重试！');
                }
            });
        },

        /**
         * 查询图片库列表
         * @param userId 用户ID（0、表示为系统图片库；传任意数字表示为用户上传的图片）
         */
        loadImage: function loadImage(callback, errorback) {
            var picsUrl = domain + '/picture/libs.html';
            $.ajax({
                url: picsUrl,
                type: 'POST',
                data: {
                    userId: 1
                },
                dataType: 'json',
                success: function success(response) {
                    if (response.success && response.data) {
                        callback && callback(response.data);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 上传图片接口(单张)  注:<input type="file" name="xxx" /> 需给input添加name属性
         * @param userWebId    用户网站id
         * @param param    参数：(page：设计页面 news：新闻 product：产品)
         */
        uploadImage: function uploadImage(params, callback, errorback) {
            var imageUrl = domain + 'user/page/uploadImg.html';
            $.ajax({
                url: imageUrl,
                type: 'POST',
                data: {
                    userWebId: app.saveParams.id,
                    param: params
                },
                dataType: 'json',
                success: function success(response) {
                    if (response.success && response.data) {
                        callback && callback(response.data);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 上传图片接口(多张)  注:<input type="file" name="xxx" /> 需给input添加name属性
         * @param userWebId    用户网站id
         * @param param    参数：(page：设计页面 news：新闻 product：产品)
         */
        uploadImageList: function uploadImageList(params, callback, errorback) {
            var imageListUrl = domain + 'service/user/page/uploadImgList.html';
            $.ajax({
                url: imageListUrl,
                type: 'POST',
                data: {
                    userWebId: app.saveParams.id,
                    param: params
                },
                dataType: 'json',
                success: function success(response) {
                    if (response.success && response.data) {
                        callback && callback(response.data);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 加载文章分类列表
         * @param params： level 分类级别(1、一级分类 2、二级分类 3、三级分类  -1、查询所有分类)
         * @param callback
         */
        loadArticleCate: function loadArticleCate(params, callback, errorback) {
            var loadArticleCateUrl = domain + 'service/newsCate/list.html';
            $.ajax({
                url: loadArticleCateUrl,
                type: 'POST',
                data: params,
                dataType: 'json',
                success: function success(response) {
                    if (response.success && response.data && Array.isArray(response.data.newsCateList)) {
                        callback && callback(response.data.newsCateList);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 根据分类id加载加载文章列表
         * @param param：
         * state    状态（1、查询产品  2、回收站）  --非必填
         * rows    每页显示条数（分页）  --非必填
         * page    页码（分页）  --非必填
         * name    文章名称（查询条件）  --非必填
         * newsCateId    文章分类ID  --必填
         * @param callback
         */
        loadArticles: function loadArticles(params, callback, errorback) {
            //TODO 后台考虑支持-1为所有列表
            if (params.newsCateId != -1) {
                var newsList = app.cacheArticleCatogory(params.newsCateId);
                if (newsList) {
                    callback(newsList);
                    return;
                }
            }
            var loadArticlesUrl = domain + 'service/news/list.html';
            $.ajax({
                url: loadArticlesUrl,
                type: 'POST',
                data: params,
                dataType: 'json',
                success: function success(response) {
                    if (response.success && response.data && Array.isArray(response.data.newsList)) {
                        callback && callback(response.data.newsList);
                        if (response.data.newsList && response.data.newsList.length > 0) app.cacheArticleCatogory(params.newsCateId, response.data.newsList);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 根据分类id加载加载所有文章列表
         * @param ids   文章id  字符串用,(逗号)间隔
         * @param callback
         * @param errorback
         */
        loadArticlesAll: function loadArticlesAll(ids, callback, errorback) {
            var loadArticlesUrl = domain + '/news/allSummary.html';
            $.ajax({
                url: loadArticlesUrl,
                type: 'POST',
                data: {
                    id: ids
                },
                dataType: 'json',
                success: function success(response) {
                    if (response.success && response.data) {
                        callback && callback(response.data.newsList);
                        // if (response.data.newsList && response.data.newsList.length > 0)
                        //     app.cacheArticleCatogory(params.newsCateId, response.data.newsList);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 文章分类下的所有文章缓存
         * @param newsCateId 文章分类id
         * @param newsList 文章分类列表，为空时为读取，不为空时为保存
         */
        cacheArticleCatogory: function cacheArticleCatogory(newsCateId, newsList) {
            if (newsList) {
                app.aritcleCategoryCache[newsCateId] = newsList;
            }
            return app.aritcleCategoryCache[newsCateId];
        },

        /**
         * 查询文章摘要接口
         * @param id 主键ID
         * @param callback
         */
        loadArticleSummary: function loadArticleSummary(params, callback, errorback) {
            if (params.id) {
                var art = app.cacheArticleSummary(params);
                if (art) {
                    callback(art);
                    return;
                }
            }
            var articleSummaryUrl = domain + 'news/summary.html';
            $.ajax({
                url: articleSummaryUrl,
                type: 'POST',
                data: params,
                dataType: 'json',
                // async:false,
                success: function success(response) {
                    if (response.success && response.data) {
                        callback && callback(response.data.news);
                        if (response.data.news) app.cacheArticleSummary(response.data.news.id, response.data.news);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 文章缓存
         * @param id
         * @param news 有内容是保存，没内容是读取
         */
        cacheArticleSummary: function cacheArticleSummary(id, news) {
            if (news) app.aritcleCache[id] = news;
            return app.aritcleCache[id];
        },

        /**
         * 查询文章详情接口
         * @param id 主键ID
         * @param callback
         */
        loadArticleDetail: function loadArticleDetail(params, callback, errorback) {
            var articleDetailUrl = domain + 'news/' + params.id + '.html';
            $.ajax({
                url: articleDetailUrl,
                type: 'POST',
                data: params,
                dataType: 'json',
                success: function success(response) {
                    if (response.success && response.data) {
                        callback && callback(repsonse.data);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 查询文章详情接口
         * @param id 主键ID
         * @param callback
         */
        loadNewsCate: function loadNewsCate(params, callback, errorback) {
            var articleDetailUrl = domain + 'shop/news/newsType.html';
            params['userId'] = app.toSessionStorage('userId');
            $.ajax({
                url: articleDetailUrl,
                type: 'GET',
                data: params,
                dataType: 'json',
                success: function success(response) {
                    if (response.success && response.data) {
                        callback && callback(response.data.newsTypeList);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 根据分类id加载加载文章列表
         * @param params：
         * state    状态（1、查询产品  2、回收站）  --非必填
         * rows    每页显示条数（分页）  --非必填
         * page    页码（分页）  --非必填
         * name    文章名称（查询条件）  --非必填
         * typeId    文章分类ID  --必填
         * @param callback
         */
        loadNewsArticles: function loadNewsArticles(params, callback, errorback) {
            var loadArticlesUrl = domain + 'shop/news/news.html';
            $.ajax({
                url: loadArticlesUrl,
                type: 'GET',
                data: params,
                dataType: 'json',
                success: function success(response) {
                    if (response.success && response.data && Array.isArray(response.data.newsList)) {
                        callback && callback(response.data.newsList);
                        if (response.data.newsList && response.data.newsList.length > 0) app.cacheArticleCatogory(params.newsCateId, response.data.newsList);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 查询文章摘要接口
         * @param  params {newsId:主键ID}
         * @param callback
         */
        loadNewsSummary: function loadNewsSummary(params, callback, errorback) {
            var articleSummaryUrl = domain + 'shop/news/getNews.html';
            $.ajax({
                url: articleSummaryUrl,
                type: 'GET',
                data: params,
                dataType: 'json',
                // async:false,
                success: function success(response) {
                    if (response.success && response.data) {
                        callback && callback(response.data.news);
                        if (response.data.news) app.cacheArticleSummary(response.data.news.id, response.data.news);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 查询文章摘要接口 (商城版)
         * @param params  id ID格式为字符串以,(逗号)间隔
         * @param callback
         */
        loadNewsSummaryAll: function loadNewsSummaryAll(params, callback, errorback) {
            var articleSummaryUrl = domain + '/shop/news/getAllNews.html';
            $.ajax({
                url: articleSummaryUrl,
                type: 'POST',
                data: { id: params },
                dataType: 'json',
                success: function success(response) {
                    if (response.success && response.data) {
                        callback && callback(response.data.newsList);
                        if (response.data.news) app.cacheArticleSummary(response.data.news.id, response.data.news);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 加载商品分类接口
         * */
        loadB2CProductCate: function loadB2CProductCate(params, callback, errorback) {
            var productCateUrl = domain + app.isB2c + '/catelist.html';
            $.ajax({
                url: productCateUrl,
                type: 'GET',
                data: { userId: app.toSessionStorage('userId') },
                dataType: "json",
                success: function success(response) {
                    if (response.success && response.data && Array.isArray(response.data.cateList)) {
                        callback && callback(response.data.cateList);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 加载商品分类所对应列表接口
         * @cateId 商品分类ID
         * */
        loadB2CProductList: function loadB2CProductList(params, callback, errorback) {
            var productCateUrl = domain + app.isB2c + '/productList.html';
            $.ajax({
                url: productCateUrl,
                type: 'GET',
                data: params,
                dataType: "json",
                success: function success(response) {
                    if (response.success && response.data && Array.isArray(response.data.productList)) {
                        callback && callback(response.data.productList);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 加载商品信息接口
         * @productId 商品ID
         * */
        loadB2CProduct: function loadB2CProduct(params, callback, errorback) {
            var productCateUrl = domain + app.isB2c + '/product.html';
            $.ajax({
                url: productCateUrl,
                type: 'GET',
                data: params,
                dataType: "json",
                success: function success(response) {
                    if (response.success && response.data) {
                        callback && callback(response.data.product);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 加载商品信息接口
         * @productId 商品ID 字符串格式 用,(逗号)做间隔
         * */
        loadB2CProductAll: function loadB2CProductAll(params, callback, errorback) {
            var productCateUrl = domain + '/shop/showAllProduct.html';
            $.ajax({
                url: productCateUrl,
                type: 'POST',
                data: { id: params },
                dataType: "json",
                success: function success(response) {
                    if (response.success && response.data) {
                        callback && callback(response.data.productList);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 加载产品分类接口
         * @param param： level 分类级别(1、一级分类 2、二级分类 3、三级分类  -1、查询所有分类)
         * @param callback
         */
        loadProductCate: function loadProductCate(params, callback, errorback) {
            var productCateUrl = domain + 'service/productCate/list.html'; //  产品分类url
            $.ajax({
                url: productCateUrl,
                type: 'POST',
                data: params,
                dataType: "json",
                success: function success(response) {
                    if (response.success && response.data && Array.isArray(response.data.productCateList)) {
                        callback && callback(response.data.productCateList);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 加载产品列表接口
         * @param param：
         * state    状态（1、查询产品  2、回收站）  --非必填
         * rows    每页显示条数（分页）  --非必填
         * page    页码（分页）  --非必填
         * name    文章名称（查询条件）  --非必填
         * productCateId    产品分类ID  --必填
         * @param callback
         */
        loadProductList: function loadProductList(params, callback, errorback) {
            var productListUrl = domain + 'service/product/list.html'; //  产品列表url
            $.ajax({
                url: productListUrl,
                data: params,
                type: 'POST',
                dataType: 'json',
                success: function success(response) {
                    if (response.success && response.data && Array.isArray(response.data.productList)) {
                        callback && callback(response.data.productList);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 查询产品展示接口--只显示产品名称、图片、价格、市场价、编号
         * @param id 主键ID
         * @param callback
         */
        loadProductSummary: function loadProductSummary(params, callback, errorback) {
            var productSummaryUrl = domain + 'product/summary.html';
            $.ajax({
                url: productSummaryUrl,
                type: 'POST',
                data: params,
                dataType: 'json',
                success: function success(response) {
                    if (response.success && response.data) {
                        callback && callback(response.data.product);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 查询产品详情接口
         * @param id 主键ID
         * @param callback
         */
        loadProductDetail: function loadProductDetail(params, callback, errorback) {
            var productDetailUrl = domain + 'product/' + params.id + '.html';
            $.ajax({
                url: productDetailUrl,
                type: 'POST',
                data: params,
                dataType: 'json',
                success: function success(response) {
                    if (response.success && response.data) {
                        callback && callback(response.data);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 查询产品详情接口
         * @param id ID以字符串格式 ,逗号隔开
         * @param callback
         */
        loadProductDetailAll: function loadProductDetailAll(params, callback, errorback) {
            var productDetailUrl = domain + '/product/allSummary.html';
            $.ajax({
                url: productDetailUrl,
                type: 'POST',
                data: { id: params },
                dataType: 'json',
                success: function success(response) {
                    if (response.success && response.data) {
                        callback && callback(response.data.productList);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 加载楼层接口
         * @param param： level 楼层级别(-1、查询所有楼层)
         * @param callback
         */
        loadFloorCate: function loadFloorCate(params, callback, errorback) {
            var productCateUrl = domain + app.isB2c + '/floor.html';
            params['userId'] = app.toSessionStorage('userId');
            $.ajax({
                url: productCateUrl,
                type: 'GET',
                data: params,
                dataType: "json",
                success: function success(response) {
                    if (response.success && response.data && Array.isArray(response.data.floorList)) {
                        callback && callback(response.data.floorList);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 加载对应楼层分类列表接口
         * @param param：
         * @param callback
         */
        loadFloorList: function loadFloorList(params, callback, errorback) {
            var productListUrl = domain + app.isB2c + '/floorClass.html';
            $.ajax({
                url: productListUrl,
                data: params,
                type: 'GET',
                dataType: 'json',
                success: function success(response) {
                    if (response.success && response.data && Array.isArray(response.data.floorClassList)) {
                        callback && callback(response.data.floorClassList);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 加载对应楼层分类列表下商品数据接口
         * @param param：
         * @param callback
         */
        loadGoodsList: function loadGoodsList(params, callback, errorback) {
            var productListUrl = domain + app.isB2c + '/floorData.html';
            $.ajax({
                url: productListUrl,
                data: params,
                type: 'GET',
                dataType: 'json',
                success: function success(response) {
                    if (response.success && response.data && Array.isArray(response.data.floorData)) {

                        callback && callback(response.data.floorData);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 加载商品导航数据接口
         * @param param：
         * @param callback
         */
        loadGoodsNav: function loadGoodsNav(params, callback, errorback) {
            var productListUrl = domain + 'user/promotional.html';
            $.ajax({
                url: productListUrl,
                data: params,
                type: 'GET',
                dataType: 'json',
                success: function success(response) {
                    if (response.success && response.data && Array.isArray(response.data.promotional)) {
                        callback && callback(response.data.promotional);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 加载分类/详情数据接口
         * @param param：
         * @param callback
         */
        loadGoodsInfo: function loadGoodsInfo(params, callback, errorback) {
            var productListUrl = domain + 'user/productCateUrl.html';
            $.ajax({
                url: productListUrl,
                data: params,
                type: 'GET',
                dataType: 'json',
                success: function success(response) {
                    if (response.success && response.data && Array.isArray(response.data.productCateUrl)) {
                        callback && callback(response.data.productCateUrl);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 查询留言板列表
         * @param state    状态（1、正常  2、已删除）--必填
         * userWebId    用户网站--必填
         * rows    每页显示条数（分页）--非必填
         * page    页码（分页）--非必填
         */
        loadMessageList: function loadMessageList(params, callback, errorback) {
            var messageUrl = domain + 'message/list.html';
            $.ajax({
                url: messageUrl,
                data: params,
                dataType: 'json',
                type: 'POST',
                success: function success(response) {
                    if (response.success && response.data && Array.isArray(response.data.userPageList)) {
                        callback && callback(response.data.userPageList);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 保存留言板信息
         * @param content    留言板内容
         * @param company    公司名称
         * @param contract    联系人
         * @param telephone    联系电话
         * @param email    邮箱
         */
        saveMessage: function saveMessage(params, callback, errorback) {
            var saveMessageUrl = domain + 'message/save.html';
            $.ajax({
                url: saveMessageUrl,
                data: params,
                dataType: 'json',
                type: 'POST',
                success: function success(response) {
                    if (response.success) {
                        callback && callback(response);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(err) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 查看留言板详情
         * @param id    主键ID
         */
        showMessageDetail: function showMessageDetail(params, callback, errorback) {
            var messageDetailUrl = domain + 'message/' + params.id + '.html';
            $.ajax({
                url: messageDetailUrl,
                data: params,
                dataType: 'json',
                type: 'POST',
                success: function success(response) {
                    if (response.success) {
                        callback && callback(response);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(errorback) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 保存会员登录条列表
         * @param data  需要保存的数据 type:obj
         * @param callback
         * @param errorback
         *  返回值  Boolean :true成功 false失败
         */
        saveMember: function saveMember(data, callback, errorback) {
            var url = domain + 'service/loginBar/save.html';
            $.ajax({
                url: url,
                data: data,
                dataType: 'json',
                type: 'POST',
                success: function success(response) {
                    if (response.success) {
                        callback && callback(response);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(errorback) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 查询所有会员登录条列表
         * @param callback
         * @param errorback
         *  返回值  sbwLoginBarList :对象
         */
        InquireAllMember: function InquireAllMember(callback, errorback) {
            var url = domain + 'service/loginBar/list.html';
            $.ajax({
                url: url,
                dataType: 'json',
                type: 'POST',
                success: function success(response) {
                    if (response.success) {
                        callback && callback(response);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(errorback) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 查看会员登录条详情(单条)
         * @param id 主键ID
         * @param callback
         * @param errorback
         * 返回值 sbwLoginBar 对象
         */
        inquireMember: function inquireMember(id, callback, errorback) {
            var url = domain + ('service/loginBar/' + id + '.html');
            $.ajax({
                url: url,
                dataType: 'json',
                type: 'POST',
                success: function success(response) {
                    if (response.success) {
                        callback && callback(response);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(errorback) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 删除会员登录条信息
         * @param id  主键ID
         * @param callback
         * @param errorback
         */
        delMember: function delMember(ID, callback, errorback) {
            var data = {
                id: ID
            };
            var url = domain + 'service/loginBar/delete.html';
            $.ajax({
                url: url,
                data: data,
                dataType: 'json',
                type: 'POST',
                success: function success(response) {
                    if (response.success) {
                        callback && callback(response);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(errorback) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },
        getSearch: function getSearch(data, callback, errorback) {
            var url = domain + 'user/page/search.html';
            $.ajax({
                url: url,
                type: 'POST',
                datatype: 'json',
                data: data,
                success: function success(res) {
                    callback && callback(res);
                },
                error: function error(res) {
                    errorback && errorback(res);
                }
            });
        },

        /**
         * 分类目录查询,根据id查询
         */
        classifyLook: function classifyLook(callback, errorback, id) {
            var classifyLookUrl = domain + 'service/catalogue/list.html'; //查询全部数据
            if (id) classifyLookUrl = domain + 'service/catalogue/get.html?id=' + id; //根据id查询数据
            $.ajax({
                url: classifyLookUrl,
                dataType: 'json',
                type: 'GET',
                success: function success(response) {
                    if (response.success) {
                        callback && callback(response);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(errorback) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 分类目录添加与修改
         * @data 数据
         */
        classifyAdd: function classifyAdd(data, callback, errorback) {
            var classifyLookUrl = domain + 'service/catalogue/save.html';
            $.ajax({
                url: classifyLookUrl,
                data: data,
                dataType: 'json',
                type: 'POST',
                success: function success(response) {
                    if (response.success) {
                        callback && callback(response);
                    } else {
                        errorback && errorback(response);
                    }
                },
                error: function error(errorback) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 分类目录删除
         */
        classifyDel: function classifyDel(id, callback, errorback) {
            var url = domain + '/service/catalogue/del.html?id=' + id;
            $.ajax({
                url: url,
                dataType: 'json',
                type: 'GET',
                success: function success(response) {
                    if (response.success) {
                        callback && callback(response);
                    } else {
                        errorback && errorback();
                    }
                },
                error: function error(errorback) {
                    if (errorback) {
                        errorback();
                    } else {
                        showTips('获取数据失败，请稍后再试');
                    }
                }
            });
        },

        /**
         * 存取缓存 先这样写着吧
         *
         * */
        toSessionStorage: function toSessionStorage(key, value) {
            if (value) {
                sessionStorage.setItem(key, value);
            }
            return sessionStorage.getItem(key);
        },
        delSessionStorage: function delSessionStorage(key) {
            sessionStorage.removeItem(key);
        },
        toLocalStorage: function toLocalStorage(key, value) {
            if (value) {
                localStorage.setItem(key, value);
            }
            return localStorage.getItem(key);
        },

        /**
         * 存储web对象
         * */
        toWebsessionStorage: function toWebsessionStorage(key, value) {
            var webInfo = sessionStorage.getItem('webInfo');
            if (typeof webInfo == 'string') webInfo = JSON.parse(webInfo);else if (webInfo == "null" || webInfo == undefined) {
                webInfo = {};
            }
            if (value) {
                var w = void 0;
                webInfo[key] = value;
                w = JSON.stringify(webInfo);
                sessionStorage.setItem('webInfo', w);
            }
            return webInfo[key];
        },

        //去到小后台
        gotoNewPage: function gotoNewPage(shref) {
            window.location.href = shref;
        },

        treefy: function treefy(r) {
            var list = {};
            var result = [];
            r.forEach(function (e) {
                if (list[e.id]) {
                    e.children = list[e.id].children;
                }
                list[e.id] = e;

                if (e.parentId == 0) {
                    if (e.checked != false) {
                        result.push(e);
                    }
                } else {
                    if (list[e.parentId]) {
                        if (list[e.parentId].children == null) {
                            if (list[e.parentId].checked != false) {
                                list[e.parentId].children = [];
                            }
                        }
                    } else {
                        if (list[e.parentId].checked != false) {
                            list[e.parentId] = {
                                children: []
                            };
                        }
                    }
                    if (e.checked != false) {
                        list[e.parentId].children.push(e);
                    }
                }
            });
            return result;
        },
        mallTreefy: function mallTreefy(r) {
            var list = {};
            var result = [];
            r.forEach(function (e) {
                if (list[e.id]) {
                    e.children = list[e.id].children;
                }
                list[e.id] = e;

                if (e.pid == 0) {
                    if (e.checked != false) {
                        result.push(e);
                    }
                } else {
                    if (list[e.pid]) {
                        if (list[e.pid].children == null) {
                            if (list[e.pid].checked != false) {
                                list[e.pid].children = [];
                            }
                        }
                    } else {
                        if (list[e.pid].checked != false) {
                            list[e.pid] = {
                                children: []
                            };
                        }
                    }
                    if (e.checked != false) {
                        list[e.pid].children.push(e);
                    }
                }
            });
            return result;
        },

        //自定义模块高度
        selfDefindHeightChange: function selfDefindHeightChange() {
            var _this = this;
            $(".boxEdit .containment").css({
                height: _this.selfDefined + "px"
            });
        },
        // 局部loading是否显示 1 为显示 0或者任何值为隐藏
        TopoLoadingFlag: function TopoLoadingFlag(flag) {
            if (flag == '1') {
                this.topoLoading = true;
            } else {
                this.topoLoading = false;
            }
        },
        getsecondSelect: function getsecondSelect(_this) {
            this.selectClassify.CateId = '';
            this.selectClassify.haveChildsSeconds = false;
            this.selectClassify.haveChildsThirds = false;
            this.selectClassify.CateId = this.selectClassify.oneClassifyClassfiyId;
            if (this.selectClassify.childsSeconds.length > 0) {
                for (var i = 0; i < this.selectClassify.childsSeconds.length; i++) {
                    if (this.selectClassify.childsSeconds[i].parentId == this.selectClassify.oneClassifyClassfiyId) {
                        this.selectClassify.haveChildsSeconds = true;
                    }
                }
            }
        },
        getchildsThirds: function getchildsThirds(_this) {
            this.selectClassify.CateId = '';
            this.selectClassify.CateId = this.selectClassify.SecondClassifyClassfiyId;
            if (this.selectClassify.childsThirds.length > 0) {
                for (var i = 0; i < this.selectClassify.childsThirds.length; i++) {
                    if (this.selectClassify.childsThirds[i].parentId == this.selectClassify.SecondClassifyClassfiyId) {
                        this.selectClassify.haveChildsThirds = true;
                    }
                }
            }
        },

        getCateId: function getCateId(_this) {
            this.selectClassify.CateId = $(_this.srcElement).find('option:selected').attr('data-CateId');
        },
        classify: function classify() {
            var _this = this;
            var url = domain + 'service/' + this.selectClassify.type + 'Cate/list.html';
            var data = {
                userWebId: app.toSessionStorage("id")
            };
            _this.TopoLoadingFlag(1);
            $.ajax({
                url: url,
                data: data,
                dataType: "json",
                type: "POST",
                success: function success(data) {
                    var list = [];
                    if (app.selectClassify.type == 'news') {
                        list = data.data.newsCateList;
                        app.classifys = data.data.newsCateList;
                    } else if (app.selectClassify.type == 'product') {
                        list = data.data.productCateList;
                        app.classifys = data.data.productCateList;
                    } else {
                        showTips('获取分类失败');
                        return;
                    }
                    _this.TopoLoadingFlag(0);
                },
                error: function error(msg) {}
            });
        },

        //《---- 这部分是头部设置 主题信息
        setStyleFn: function setStyleFn() {
            if (this.setStyle) {
                this.setStyle = !this.setStyle;
                return false;
            }
            closeDialog(); //所有弹窗
            // 点击设计打开/关闭主题信息设置
            this.setStyle = !this.setStyle;
        },
        closeHistory: function closeHistory() {
            this.showhistory = false;
        },
        closeDialog: function closeDialog(flag) {
            var _this = this;
            switch (flag) {
                case 'showPages':
                    // 关闭页面管理，所有相关弹窗也应该关闭
                    _this.showPages = false;
                    _this.addPage = false;
                    _this.alterDialog = '';
                    break;
                case 'alterDialog':
                    // 关闭页面管理
                    _this.alterDialog = '';
                    break;
                case 'addPage':
                    // 关闭页面管理
                    _this.addPage = false;
                    break;
                case 'saveTemplate':
                    _this.saveTemplateisDialogShow = 0;
                    break;
                case 'updateFoot':
                    _this.updateFootNav = false;
                    _this.updateHeadNav = false;
                    break;
            }
        },
        // ---》 这部分是头部设置 end 主题信息
        // ---> 页面管理
        alterPage: function alterPage(id) {
            if (this.alterPageId == id) {
                this.alterPageId = ' ';
                return false;
            }
            this.alterPageId = id;
            this.addPage = false;
        },

        NavHide: function NavHide() {
            //导航开关
            // nav.navFlag = !nav.navFlag;
        },

        newPageNext: function newPageNext() {
            // 下一步
            var info = this.pageInfo,
                flag = this.checkEmpty();
            if (flag) {
                // 校验通过
                this.pageInfo.newPageStep = 2;
            }
        },
        newPageBack: function newPageBack() {
            // 上一步
            this.pageInfo.newPageStep = 1;
        },

        checkPagelist: function checkPagelist(code, isMobile) {
            //isMobile 判断是否修改头部或者底部导航
            var info = void 0;
            if (isMobile) {
                info = this.footInfo;
            } else {
                info = this.pageInfo;
            }
            info.empty = true;
            // 选择预设样式
            if (info.styleCode == code) {
                info.styleCode = '';
                return false;
            }
            info.styleCode = code;
        },
        hasChildPage: function hasChildPage(menuId) {
            //校验当前选中导航是否有下级导航
            var hasChild = true;
            for (var i = 0; i < this.firstParentId.length; i++) {
                if (this.firstParentId[i].parentId == menuId) {
                    hasChild = false;
                }
            }
            return hasChild;
        },

        checkEmpty: function checkEmpty() {
            // 表单校验 非空校验
            var info = this.pageInfo,
                checkout = true,
                _this = this,
                typeName = _this.pageInfo.pageType == 'pro' ? '产品分类' : '文章分类';

            if (info.newPageStep == 2) {
                if (Trim(info.styleCode) == '') {
                    info.msg = '请选择一个预设样式';
                    info.empty = false;
                    checkout = false;
                }
            } else {
                if (Trim(info.pageType) == '') {
                    info.msg = '请选择一个栏目类型'; //当前修改导航的类型
                    info.empty = false;
                    checkout = false;
                } else if (Trim(info.pageName) == '') {
                    info.msg = '栏目名称是必填项'; //当前填写页面名称
                    info.empty = false;
                    checkout = false;
                } else if (info.pageType == 'pro' || info.pageType == 'news') {
                    if (_this.checkClassifys.length == 0) {
                        info.msg = '请选择一个' + typeName; //当前填写页面名称
                        info.empty = false;
                        checkout = false;
                    }
                }
            }
            return checkout;
        },

        //修改微站导航弹窗
        navPop: function navPop(event, ishead) {
            var _this = this;
            if (ishead) {
                _this.updateHeadNav = true;
            } else {
                _this.updateFootNav = true;
            }
        },

        // ---> 页面管理 end
        // <--- 添加为系统模板

        openTplDialog: function openTplDialog() {
            closeDialog();
            this.destroyOldInfoT();
            this.saveTemplateisDialogShow = '1';
        },
        destroyOldInfoT: function destroyOldInfoT() {
            this.saveTemplate = {
                themeCode: '', //网站类型
                industryCode: '', //行业分类
                firstCode: '', //选中的一级分类
                colorCode: '', //主题色系
                levelCode: '', //等级
                name: '', //名称
                msg: '', //校验提示
                thumbImage: '' //缩略图
            };
            $("#tplthumbImg").parent().resetForm();
            $("#thumbImg").attr('src', "");
        },
        // 添加为系统模板 end --- >

        //选择元素类型
        elementClass: function elementClass(code) {
            elementDrap(code);
        },
        Splaceholder: function Splaceholder() {
            //编辑搜索按钮
            var newBtnName = app.$data.search.btnname;
            var newPlaceholder = app.$data.search.placeholder;
            $('.edit input[type=text]').attr('placeholder', newPlaceholder);
            if (newPlaceholder != undefined) {
                $('.edit input[type=text]').attr('placeholder', newPlaceholder);
            }
            if (newBtnName != undefined) {
                $('.edit .search-btn').text(newBtnName);
            }
        },

        //请求模板分类
        reqTplcategory: function reqTplcategory() {
            var self = this;
            var url = "service/system/web/category.html",
                data = {};

            function errorfn() {}

            productPost(url, data, function successfn(res) {
                var allCategoryArr = res.data.industry; //网站类型
                self.webTypeArr = res.data.theme; //主题
                self.tplThemeColorArr = res.data.color; //主题颜色
                for (var i = 0, len = allCategoryArr.length; i < len; i++) {
                    if (allCategoryArr[i].parentCode == 0) {
                        self.tplTopLevelArr.push(allCategoryArr[i]);
                    } else {
                        self.tplChildLevelArr.push(allCategoryArr[i]);
                    }
                }
            }, errorfn);
        },

        //请求行业模板列表
        showTplIndustry: function showTplIndustry() {
            var self = this;
            var url = "service/system/web/list.html";
            self.tempaltesData.themeCode = self.webcode;
            var data = self.tempaltesData;

            function successfn(res) {
                self.tplWebInfoList = res.data.sysWebList;
            }

            function errorfn() {}

            productPost(url, data, successfn, errorfn);
        },
        // 搜索筛选
        tplSearch: function tplSearch() {
            this.showTplIndustry();
            $(".tplDownDialog").slideUp();
        },

        //请求模块分类列表
        reqmoduleList: function reqmoduleList() {
            var self = this;
            var url = "service/module/category.html",
                data = {
                themeCode: self.webcode
            };

            function successfn(res) {
                self.moduleCategoryList = res.data.module;
            }

            function errorfn() {}

            productPost(url, data, successfn, errorfn);
        },
        //添加模板切换功能加显示对应的模块列表
        showModuleList: function showModuleList(index, moduleName) {
            // 背景高亮
            var self = this;
            self.thisModule = self.moduleCategoryList[index].name;
            this.addModuleListIndex = index;
            if (moduleName == 'basics') {
                this.showElement = false;
                if (self.reqFirstModuleFlg == 1) {
                    self.reqFirstModuleFlg++;
                    edit();
                }
            } else {
                this.showElement = true;
                // 请求模块数据
                this.reqModule(moduleName);
            }
        },
        //请求具体的模块数据
        reqModule: function reqModule(moduleName) {
            var self = this;
            var url = "service/module/list.html",
                data = {
                moduleCode: moduleName,
                themeCode: _this.webcode
            };

            function successfn(res) {
                //这是是放关闭局部loading函数(公共函数)
                self.moduleList = res.data.ModuleList;
            }

            function errorfn() {}

            productPost(url, data, successfn, errorfn);
        },

        navModification: function navModification(orders) {
            var $t = orders;
            var str = [];
            for (var i = 0; i <= $t.length - 1; i++) {
                var id = $t[i].id;
                var name = $t[i].name;
                /*let menuId = $t[i].menuid;
                let parentId = $t[i].parentid;
                let columnCode = $t[i].columncode;
                let linkUrl = $t[i].linkurl;
                let target = $t[i].target;*/
                var useYn = $t[i].useYn;
                var sort = i + 1;
                var datasd = {
                    id: id,
                    name: name,
                    /*userWebId: userWebId,
                    menuId: menuId,
                    parentId: parentId,
                    columnCode: columnCode,
                    linkUrl: linkUrl,
                    target: target,*/
                    useYn: useYn,
                    sort: sort
                };
                str.push(datasd);
            }
            var SbwUserPageInfo = JSON.stringify(str);
            var data = {
                paramJson: SbwUserPageInfo
            };
            var url = 'service/user/page/batchSave.html';
            productPost(url, data, function (callback) {
                if (callback.success == true) {
                    showTips("保存成功！");
                }
                $("#headNavPopup").hide();
            }, function (callback) {
                showTips("保存失败！");
            });
        },

        //新增页面---
        addPage: function addPage(d, callback) {
            var data = {
                channel: app.channel,
                linkUrl: d.linkUrl,
                linkType: d.linkType,
                name: d.name, //文本输入
                columnCode: d.columnCode, //栏目类型下拉框
                target: d.target, //打开方式（1、本窗口  2、新窗口）
                parentId: d.parentId, //父级菜单ID
                userWebId: app.toSessionStorage("id"), //用户网站ID
                selectedLinkType: d.selectedLinkType //选中的栏目类型
            };
            app.saveAllPage(data, callback);
        },
        //修改页面
        updatePage: function updatePage(d, callback) {
            var data = {
                channel: app.channel,
                linkUrl: d.linkUrl,
                linkType: d.linkType,
                id: d.id,
                name: d.name, //文本输入
                columnCode: d.columnCode, //栏目类型下拉框
                target: d.target, //打开方式（1、本窗口  2、新窗口）
                parentId: d.parentId, //父级菜单ID
                userWebId: app.toSessionStorage("id"), //用户网站ID
                selectedLinkType: d.selectedLinkType //选中的栏目类型
            };
            app.saveAllPage(data, callback);
        },
        //右上角保存页面信息
        savePage: function savePage(callback) {
            app.saveLoading = true;
            var data = {
                id: app.savePageInfo.id,
                name: app.savePageInfo.name,
                columnCode: app.savePageInfo.columnCode,
                colorStyle: app.themecolor,
                head: JSON.stringify(app.groupContainer.header),
                webBanner: JSON.stringify(app.groupContainer.banner),
                bottom: JSON.stringify(app.groupContainer.bottom),
                body: JSON.stringify(app.groupContainer.body),
                userWebId: app.toSessionStorage("id"), //用户网站ID
                navigation: JSON.stringify(app.groupContainer.navigation),
                bodyStyle: JSON.stringify(app.groupContainer.common)
            };
            app.saveAllPage(data, function (res) {
                if (callback) callback(res);
                var msg = '保存成功';
                app.saveLoading = false;
                if (res.message) msg = res.message;
                app.$message({
                    message: msg,
                    type: 'info',
                    iconClass: ' ',
                    center: true,
                    duration: 2000
                });
            });
        },
        saveAllPage: function saveAllPage(data, callback) {
            $.ajax({
                type: "POST",
                data: data,
                url: domain + 'service/user/page/save.html',
                dataType: "json",
                success: function success(t1) {
                    if (!t1.success && t1.total) {
                        callback(t1);
                        return false;
                    }
                    if (t1.success && callback) {
                        callback(t1);
                        app.toWebsessionStorage('webName', t1.data.name);
                    }
                    if (!t1.success && !t1.total) {
                        showTips(t1.message);
                    }
                },
                error: function error(e) {}
            });
        },
        //删除页面
        deletePage: function deletePage(d, callback) {
            var data = {
                id: d.id
            };
            $.ajax({
                type: "POST",
                data: data,
                url: domain + 'service/user/page/d.html',
                dataType: "json",
                success: function success(t1) {
                    if (!t1.success && t1.total) {
                        console.error(t1);
                        return false;
                    }
                    callback(t1);
                },
                error: function error(e) {}
            });
        },
        //加载所有页面信息
        loadAllPages: function loadAllPages(callback) {
            var data = void 0;
            if (this.firstParentId[0]) {
                callback(this.firstParentId, 1);
            } else {
                data = {
                    userWebId: app.toSessionStorage("id")
                };
                $.ajax({
                    type: "POST",
                    data: data,
                    url: domain + 'user/page/list.html',
                    dataType: "json",
                    success: function success(t1) {
                        if (!t1.success && t1.total) {
                            console.error(t1);
                            return false;
                        }
                        callback(t1, 0);
                        app.toWebsessionStorage('allPageList', t1.data.userPageList);
                    },
                    error: function error(e) {
                        console.error(e);
                    }
                });
            }
        },

        //查询单个页面详情
        loadPage: function loadPage(pageId, callback) {
            var data = {
                id: pageId
            };
            $.ajax({
                type: "POST",
                data: data,
                url: domain + 'user/page/' + pageId + '.html',
                dataType: "json",
                success: function success(t1) {
                    if (!t1.success && t1.total) {
                        console.error(t1);
                        return false;
                    }
                    /*if(pageId==app.toWebsessionStorage('ndId')||pageId==app.toWebsessionStorage('pdId')){
                     app.isInfoPage=true;
                     }*/
                    if (app.getRequest().nav != undefined) {
                        app.isInfoPage = true;
                    }
                    callback(t1);
                },
                error: function error(e) {}
            });
        },
        /**
         * 特殊转义 < > ( )
         * @param value 需转换的值
         */
        recoverSymbol: function recoverSymbol(value) {
            if (value == null) return null;
            if (typeof value == 'number') return value;
            value = value.replace(/\[lt\]/g, "\<").replace(/\[gt\]/g, ">");
            value = value.replace(/\[#40\]/g, "(").replace(/\[#41\]/g, ")");
            value = value.replace(/\[#39\]/g, "'");
            value = value.replace(/clscrptxmt/g, "script");
            return value;
        },
        //点击按钮(3个按钮)
        toggleIcon: function toggleIcon(name) {
            var _this = this;
            if (_this.iconName !== name) {
                _this.iconName = name;
                switch (name) {
                    case "myTpl":
                        _this.httpMytpl();
                        break;
                }
            } else {
                _this.iconName = '';
                if (_this.iconName == "tpl") {
                    $(".tplDownDialog").slideUp();
                }
            }
        },
        mobileFit: function mobileFit(val) {
            var res = val;
            if (app.isPreview && app.channel == 2) {
                if (res.indexOf('rem') > -1) {
                    res = res;
                } else {
                    var fz = 16;
                    if (typeof res == "number") {
                        res = res / fz + 'rem';
                    } else {
                        if (res.indexOf('px') > -1) {
                            res = res.replace(/px/, '') / fz + 'rem';
                        } else {
                            res = res / fz + 'rem';
                        }
                    }
                }
            }
            return res;
        }
    }
});
app.$watch(function () {
    // 监听其他主题色实时修改
    return this.othertheme;
}, function (newVal, oldVal) {
    if (newVal.length > 2) {
        app.themecolor = newVal;
    }
});

//加载页面 获取用户内容
function userList(isAddpage) {
    var userUrl = domain + 'user/page/list.html';
    var userData = {};
    httpPost(userUrl, userData, function (callback) {
        var firstParentId = [];
        var firstTemplatess = [];
        var nav = callback.userPageList;
        nav.forEach(function (e) {
            if (e.pageType != 3) {
                firstParentId.push(e);
                if (e.pageType == 2) {
                    if (e.columnCode == 'pro') {
                        app.toWebsessionStorage('proId', e.id);
                    }
                }
                if (e.parentId == 0) {
                    firstTemplatess.push(e);
                }
                if (e.columnCode == "index") {
                    app.pageContent = e;
                    //linkUrl = e.linkUrl;
                }
            } else {
                if (e.columnCode == 'newsd') {
                    app.toWebsessionStorage('ndId', e.id);
                } else if (e.columnCode == 'prod') {
                    app.toWebsessionStorage('pdId', e.id);
                }
            }
        });
        app.firstParentId = firstParentId;
        app.firstTemplate = firstTemplatess;
    }, function (callback) {});
}

/**
 *后台跳转add by dengxf 20180418
 */
function remoteLogin() {
    var newurl = void 0,
        scmanage_url = void 0,
        seller_url = void 0,
        b2c_url = void 0,
        type = void 0,
        token = void 0;
    var name = app.toSessionStorage('uname');
    var newTab = window.open('about:blank');
    $.ajax({
        url: domain + "/getToken.html",
        type: 'post',
        dataType: 'json',
        data: { name: name },
        success: function success(data) {
            if (data && null != data.success && data.success == true) {
                type = data.data.type;
                token = data.data.token;
                if (type == undefined) {
                    $.messager.alert('提示', "未开通商城版应用");
                    return;
                } else if (type == 1) {
                    //多商家
                    scmanage_url = data.data.scmanage_url;
                    newurl = scmanage_url + "/admin/doLoginFromCL.html?name=" + name + "&verifyToken=" + token;
                    newTab.location.href = newurl;
                } else if (type == 2) {
                    //单商家
                    seller_url = data.data.seller_url;
                    newurl = seller_url + "/seller/doLoginFromCL.html?name=" + name + "&verifyToken=" + token;
                    newTab.location.href = newurl;
                } else if (type == 3) {
                    //B2C系统
                    b2c_url = data.data.b2c_url;
                    newurl = b2c_url + "/shop/doLoginFromCL.html?name=" + name + "&verifyToken=" + token;
                    newTab.location.href = newurl;
                }
            } else {
                if (data.message != '') {
                    showTips(data.message);
                    return;
                }
            }
        }
    });
}

function remoteLogin() {
    var newurl = void 0,
        scmanage_url = void 0,
        seller_url = void 0,
        b2c_url = void 0,
        type = void 0,
        token = void 0;
    var name = app.toSessionStorage('uname');
    var newTab = window.open('about:blank');
    $.ajax({
        url: domain + "/getToken.html",
        type: 'post',
        dataType: 'json',
        data: { name: name },
        success: function success(data) {
            if (data && null != data.success && data.success == true) {
                type = data.data.type;
                token = data.data.token;
                if (type == undefined) {
                    $.messager.alert('提示', "未开通商城版应用");
                    return;
                } else if (type == 1) {
                    //多商家
                    scmanage_url = data.data.scmanage_url;
                    newurl = scmanage_url + "/admin/doLoginFromCL.html?name=" + name + "&verifyToken=" + token;
                    newTab.location.href = newurl;
                } else if (type == 2) {
                    //单商家
                    seller_url = data.data.seller_url;
                    newurl = seller_url + "/seller/doLoginFromCL.html?name=" + name + "&verifyToken=" + token;
                    newTab.location.href = newurl;
                } else if (type == 3) {
                    //B2C系统
                    b2c_url = data.data.b2c_url;
                    newurl = b2c_url + "/shop/doLoginFromCL.html?name=" + name + "&verifyToken=" + token;
                    newTab.location.href = newurl;
                }
            } else {
                if (data.message != '') {
                    showTips(data.message);
                    return;
                }
            }
        }
    });
}

function membtnt() {
    app.groupContainer.header.memember.btnShow = true;
}

function membtnf() {
    setTimeout(function () {
        app.groupContainer.header.memember.btnShow = false;
    }, 200);
}

define(['qrcode'], function (qrcode) {
    return app;
});