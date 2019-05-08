'use strict';

/**
 * Created by an on 2018/6/2.
 */
define([], function () {
    var MAX = 5;
    var count = 0;
    window.queue = [];

    window.loading = 0;
    window.loaded = 0;
    window.invoke = 0;
    var load = function load(v, callback) {
        invoke++;
        //如果处理数超出上限，入队等待处理
        if (count >= MAX) {
            queue.push({ v: v, callback: callback });
            // console.log('queue:',queue)
        } else {
            count++;
            loading++;
            if (v.constructor === Array) {
                var j = 0;
                setTimeout(function () {
                    for (; j < v.length; j++) {
                        var i = new Image();
                        i.onload = function () {
                            callback();
                            // console.log('loaded: ', count, v);
                            count--;
                            clearQueue();
                            loaded++;
                        };
                        i.src = v[j];
                    }
                });
            } else {
                setTimeout(function () {
                    var i = new Image();
                    i.onload = function () {
                        callback();
                        // console.log('loaded: ', count, v);
                        count--;
                        clearQueue();
                        loaded++;
                    };
                    i.src = v;
                });
            }
        }
        // console.log('loading:', count, v);
        //返回默认的图片
        return '';
    };

    //清理队列
    var clearQueue = function clearQueue() {
        while (count < MAX && queue.length > 0) {
            var top = queue[0];
            queue.splice(0, 1);
            if (top) load(top.v, top.callback);
        }
    };

    return {
        load: load
    };
});