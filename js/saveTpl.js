'use strict';

var vm = new Vue({
    el: '#box',
    data: function data() {
        return {
            name: '',
            userId: '',
            userWebId: '',
            themeCode: '',
            channel: '',
            colorCode: '',
            industryCode: '',
            webTypeArr: [],
            tplThemeColorArr: [],
            tplTopLevelArr: [],
            imgSrc: '',
            domain: 'http://dev.jz.cangluxmt.com/',
            loading: false
        };
    },
    mounted: function mounted() {
        var self = this;
        self.reqTplcategory();
    },

    methods: {
        reqTplcategory: function reqTplcategory() {
            var self = this,
                url = 'service/system/web/category.html';

            var data = {
                userWebId: this.userWebId,
                channel: this.channel
            };
            $.ajax({
                type: "POST",
                data: data,
                url: this.domain + url,
                dataType: "json",
                success: function success(res) {
                    var allCategoryArr = res.data.industry; //网站类型
                    self.webTypeArr = res.data.theme; //主题
                    self.tplThemeColorArr = res.data.color; //主题颜色
                    for (var i = 0, len = allCategoryArr.length; i < len; i++) {
                        self.tplTopLevelArr.push(allCategoryArr[i]);
                    }
                },
                error: function error() {}
            });
        },
        cancleEmpty: function cancleEmpty(event) {
            this.themeCode = event.target.value;
        },
        counterSaveTpl: function counterSaveTpl() {
            this.loading = true;
            if (!this.loading) return false;
            if (!this.detection()) {
                showTips('请填写必要条件');
                return false;
            }
            var _ref = [this, $("#tplthumbImg")],
                self = _ref[0],
                dom = _ref[1];

            var saveTemplate = {};
            saveTemplate.msg = '';
            var option = {
                type: "POST",
                url: self.domain + "service/uploadTemplate.html",
                data: dom.parents('form').serialize(),
                dataType: "json",
                success: function success(path) {
                    var url = 'user/web/saveForTemplate.html';
                    saveTemplate = {
                        thumbImage: path,
                        name: self.name,
                        userId: self.userId,
                        userWebId: self.userWebId,
                        channel: self.channel,
                        themeCode: self.themeCode,
                        industryCode: self.industryCode
                    };
                    $.ajax({
                        type: "GET",
                        data: saveTemplate,
                        url: self.domain + url,
                        dataType: "json",
                        success: function success(res) {
                            if (res.success) {
                                showTips('添加成功');
                                self.destroyOldInfoT();
                                self.loading = false;
                            } else {
                                showTips(res.message);
                            }
                        },
                        error: function error() {
                            showTips('网络不给力，请重试');
                        }
                    });
                },
                error: function error() {
                    showTips('数据加载失败！');
                }
            };
            dom.parent().ajaxSubmit(option);
        },

        // 非空检测
        detection: function detection() {
            var self = this;
            if (self.name === '') return false;
            if (self.themeCode === '') return false;
            if (self.industryCode === '') return false;
            if (self.webTypeArr === '') return false;
            if (self.tplThemeColorArr === '') return false;
            if (self.tplTopLevelArr === '') return false;
            if ($("#tplthumbImg")[0].value === undefined) return false;
            return true;
        },
        destroyOldInfoT: function destroyOldInfoT() {
            $("#tplthumbImg")[0].value = '';
            this.name = '';
            this.userId = '';
            this.userWebId = '';
            this.themeCode = '';
            this.industryCode = '';
            this.webTypeArr = '';
            this.tplThemeColorArr = '';
            this.tplTopLevelArr = '';
        }
    }
});