'use strict';

define(['vueLoader', 'util'], function (loader, util) {
    return {
        props: ['model', 'cancleEmpty'],
        data: function data() {
            return {
                tplThemeColorArr: [],
                tplTopLevelArr: [],
                saveTemplate: {
                    themeCode: '', //网站类型
                    industryCode: '', //行业分类
                    firstCode: '', //选中的一级分类
                    colorCode: '', //主题色系
                    levelCode: '', //等级
                    name: '', //名称
                    msg: '' //校验提示
                }
            };
        },
        mounted: function mounted() {
            var self = this;
            if (!self.tplThemeColorArr.lenght > 0) app.reqTplcategory();
            self.tplThemeColorArr = app.tplThemeColorArr; //主题颜色
            self.tplTopLevelArr = app.tplTopLevelArr; //网站类型
        },

        methods: {
            themeColorSaveT: function themeColorSaveT(color) {
                this.saveTemplate.msg = '';
                this.saveTemplate.colorCode = color;
            },
            changeFirstCodeT: function changeFirstCodeT() {
                this.saveTemplate.msg = '';
                this.saveTemplate.industryCode = '';
            },
            closeDialog: function closeDialog() {
                app.saveTemplateisDialogShow = !app.saveTemplateisDialogShow;
            },
            openTplDialog: function openTplDialog() {
                this.destroyOldInfoT();
                this.saveTemplateisDialogShow = true;
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
            counterSaveTpl: function counterSaveTpl() {
                var _ref = [this, $("#tplthumbImg")],
                    self = _ref[0],
                    $dom = _ref[1];

                if (this.emptyTpl()) {
                    self.saveTemplate.msg = '';
                    loadToate();
                    var option = {
                        type: "POST",
                        url: domain + "service/uploadTemplate.html",
                        data: $dom.parents('form').serialize(),
                        dataType: "json",
                        success: function success(path) {
                            self.saveTemplate.thumbImage = path;
                            productPost('service/user/web/saveForTemplate.html', self.saveTemplate, function (res) {
                                if (res.success) {
                                    loadClear();
                                    showTips('添加成功');
                                    self.destroyOldInfoT();
                                } else {
                                    loadClear();
                                    showTips(res.message);
                                }
                            }, function (res) {
                                loadClear();
                                showTips('网络不给力，请重试');
                            });
                        },
                        error: function error() {
                            loadClear();
                            showTips('数据加载失败！');
                        }
                    };
                    $dom.parent().ajaxSubmit(option);
                }
            },

            emptyTpl: function emptyTpl() {
                // 非空判断
                var _ref2 = [this.saveTemplate, true],
                    tpl = _ref2[0],
                    flag = _ref2[1];

                if (tpl.themeCode === '') {
                    tpl.msg = "请选择一个网站类型";
                    flag = false;
                } else if (tpl.industryCode === '') {
                    tpl.msg = "请选择一个行业分类";
                    flag = false;
                } else if (tpl.colorCode === '') {
                    tpl.msg = "请选择一个主题颜色";
                    flag = false;
                } else if (tpl.name === '') {
                    tpl.msg = "请填写模板名称";
                    flag = false;
                } else if ($('#tplthumbImg').val() === '') {
                    tpl.msg = "需要上传一张缩略图";
                    flag = false;
                }
                return flag;
            }
        }
    };
});