'use strict';

var CXL = {
    xNavHover: function XnavHover(obj) {
        obj.off('mouseenter').on('mouseenter', function () {
            var _this = $(this);
            var left = 0;
            for (var i = 0; i < _this.index(); i++) {
                left += _this.closest('ul').find("li").eq(i).outerWidth();
            }
            _this.closest('ul').find('li.xian').css({
                "left": left + parseInt(_this.css("padding-left").replace("px", '')),
                "width": _this.find('a').outerWidth()
            });
        });
        obj.eq(0).mouseenter();
    }
};