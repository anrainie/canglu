'use strict';

define(['vueLoader'], function (loader) {
    return {
        props: {
            webcode: {},
            guide: ''
        },
        data: function data() {
            return {
                pop: false,
                guides: false,
                guides1: false,
                guides2: false,
                guides3: false,
                guides4: false,
                guides5: false,
                guides6: false,
                guides7: false,
                Heig: 'height:' + document.documentElement.clientHeight + 'px',
                guideStyle: "background:url(images/guide/0-0.png) no-repeat center top -46px;background-size:cover;"
            };
        },
        mounted: function mounted() {
            this.pop = true;
            this.guides = true;
        },

        computed: {
            guidesStyle: function guidesStyle() {
                if (this.guides) {
                    return "top:47%;left:50%;transform:translate(-50%,-50%);";
                } else if (this.guides1) {
                    return "top:2%;left:305px;";
                } else if (this.guides2) {
                    return "top:2%;left:165px;";
                } else if (this.guides3) {
                    return "top:7%;left:555px;";
                } else if (this.guides4) {
                    return "top:13.2%;left:86px";
                } else if (this.guides5) {
                    return "top:2%;right:0;";
                } else if (this.guides6) {
                    return "top:2%;right:0;";
                } else if (this.guides7) {
                    return "top:2%;right:0";
                }
            },
            popShow: function popShow() {
                if (this.guides) {
                    return "display:none";
                } else if (this.guides1) {
                    return "width: 84px;top: 0;left: 290px;";
                } else if (this.guides2) {
                    return "width:180px;left:97px";
                } else if (this.guides3) {
                    return "display:none";
                } else if (this.guides4) {
                    return "display:none";
                } else if (this.guides5) {
                    return "width:80px;left:auto;right:0";
                } else if (this.guides6) {
                    return "width:90px;left:auto;right:160px";
                } else if (this.guides7) {
                    return "width:80px;left:auto;right:250px;";
                }
            }
        },
        methods: {
            noHide: function noHide() {
                this.$parent.guides = false;
                this.$parent.guide = false;
                $('body').css({ 'overflow-y': 'auto' });
                $('.header').css({ 'z-index': '2' });
            },
            yesShow: function yesShow() {
                this.guides1 = true;
                this.guides = false;
            },
            lastStep: function lastStep(num) {
                this['guides' + num] = false;
                if (num - 1 == 0) {
                    this.guides = true;
                } else {
                    this['guides' + (num - 1)] = true;
                }
                if (num == 4) {
                    $('.guide .vmask').css('height', '46px');
                    this.guideStyle = "background:url(images/guide/4.jpg) no-repeat left top -46px;background-size:cover;";
                } else if (num == 5) {
                    $('.guide .vmask').css('height', '46px');
                    this.guideStyle = "background:url(images/guide/5.jpg) no-repeat left top -46px;background-size:cover;";
                } else {
                    $('.guide .vmask').css('height', '100%');
                    this.guideStyle = "background:url(images/guide/0-0.png) no-repeat center top -46px;background-size:cover;";
                }
            },
            nextStep: function nextStep(num) {
                this['guides' + num] = false;
                this['guides' + (num + 1)] = true;
                if (num == 2) {
                    $('.guide .vmask').css('height', '46px');
                    this.guideStyle = "background:url(images/guide/4.jpg) no-repeat left top -46px;background-size:cover;";
                } else if (num == 3) {
                    $('.guide .vmask').css('height', '46px');
                    this.guideStyle = "background:url(images/guide/5.jpg) no-repeat left top -46px;background-size:cover;";
                } else {
                    $('.guide .vmask').css('height', '100%');
                    this.guideStyle = "background:url(images/guide/0-0.png) no-repeat center top -46px;background-size:cover;";
                }
            },
            finishStep: function finishStep() {
                this.$parent.guides = false;
                this.$parent.guide = false;
                this.guides = true;
                this.guides7 = false;
                $('body').css({ 'overflow-y': 'auto' });
                $('.header').css({ 'z-index': '2' });
            }
        }
    };
});