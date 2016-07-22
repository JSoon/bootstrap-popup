(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        // AMD is used - Register as an anonymous module.
        define(['jquery', 'bootstrap'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'), require('bootstrap'));
    } else {
        // Neither AMD nor CommonJS used. Use global variables.
        if (typeof jQuery === 'undefined') {
            throw new Error('bootstrap-popup requires jQuery to be loaded first');
        } else if (typeof (jQuery.fn.modal) === 'undefined') {
            throw new Error('bootstrap-popup requires Bootstrap to be loaded first');
        }
        factory(jQuery, jQuery.fn.modal);
    }
} (function ($, modal) {
    'use strict';
    //    console.log('jQuery: ' + $.fn.jquery);
    //    console.log('Bootstrap: ' + $.fn.modal.Constructor.VERSION);
    $.bs = $.bs || {};
    var popup = function () {
        var that = {};
        var id, html, // modal id and dom
            message, // prompt中输入的信息
            dialogE, // 对话框jQuery对象
            dialogOk, dialogCancel;

        var randomNum = function (scope) {
            var scope = scope || 100000; // 默认随机数范围 0 到 100,000
            return Math.floor(Math.random() * scope);
        };

        /**
         * Toast dialog
         * @param {object} opts - title, info and width
         */
        that.toast = function (opts, callback) {
            id = 'J_PopupToast' + randomNum();
            html = '<div id="' + id + '" class="modal "' + opts.animated + ' tabindex="-1">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                '<h4 class="modal-title">' + opts.title + '</h4>' +
                '</div>' +
                '<div class="modal-body">' +
                '<p>' + opts.info + '</p>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'; // 模态框 html 代码片段
            var delay = arguments[2] ? arguments[2] : 3000; // 模态框消失的时间
            $('body').append(html);
            dialogE = $('#' + id);
            dialogE.find('.modal-dialog').css('width', opts.width);
            dialogE.on('shown.bs.modal', function () {
                typeof (callback) === 'function' ? callback(dialogE) : null;
                var that = this,
                    t = setTimeout(function () {
                        $(that).modal('hide');
                    }, delay);
            }).modal('show');
            // 隐藏后删除 modal 节点
            dialogE.on('hidden.bs.modal', function () {
                $(this).remove();
            });
        };

        /**
         * Confirm dialog
         * @param {object}   opts     - title, info and width
         * @param {function} callback - dialog object of jQuery
         */
        that.confirm = function (opts, callback) {
            id = 'J_PopupConfirm' + randomNum();
            html = '<div id="' + id + '" class="modal "' + opts.animated + ' tabindex="-1">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                '<h4 class="modal-title">' + opts.title + '</h4>' +
                '</div>' +
                '<div class="modal-body">' +
                '<p>' + opts.info + '</p>' +
                '</div>' +
                '<div class="modal-footer">' +
                '<button type="button" class="btn btn-default J_Cancel">取消</button>' +
                '<button type="button" class="btn btn-primary J_Ok">确定</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'; // 模态框 html 代码片段
            $('body').append(html);
            dialogE = $('#' + id);
            dialogE.find('.modal-dialog').css('width', opts.width);
            dialogE.modal('show');
            // 定义确定和取消函数
            dialogOk = dialogE.find('.J_Ok');
            dialogCancel = dialogE.find('.J_Cancel');
            dialogOk.on('click', function () {
                typeof (callback) === 'function' ? callback(dialogE) : null;
            });
            dialogCancel.on('click', function () {
                dialogE.modal('hide');
            });
            // 隐藏后删除 modal 节点
            dialogE.on('hidden.bs.modal', function () {
                $(this).remove();
            });
        };

        /**
         * Prompt dialog
         * @param {object}   opts     - title, info and width
         * @param {function} callback - dialog object of jQuery and input message
         */
        that.prompt = function (opts, callback) {
            id = 'J_PopupPrompt' + randomNum();
            html = '<div id="' + id + '" class="modal "' + opts.animated + ' tabindex="-1">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                '<h4 class="modal-title">' + opts.title + '</h4>' +
                '</div>' +
                '<div class="modal-body">' +
                '<p>' + opts.info + '</p>' +
                '<input type="text" class="form-control J_Message" placeholder="' + opts.info + '">' +
                '</div>' +
                '<div class="modal-footer">' +
                '<button type="button" class="btn btn-default J_Cancel">取消</button>' +
                '<button type="button" class="btn btn-primary J_Ok">确定</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'; // 模态框 html 代码片段
            $('body').append(html);
            dialogE = $('#' + id);
            dialogE.find('.modal-dialog').css('width', opts.width);
            dialogE.modal('show');
            // 定义确定和取消函数
            dialogOk = dialogE.find('.J_Ok');
            dialogCancel = dialogE.find('.J_Cancel');
            dialogOk.on('click', function () {
                message = dialogE.find('.J_Message').eq(0).val();
                typeof (callback) === 'function' ? callback(dialogE, message) : null;
            });
            dialogCancel.on('click', function () {
                dialogE.modal('hide');
            });
            // 隐藏后删除 modal 节点
            dialogE.on('hidden.bs.modal', function () {
                $(this).remove();
            });
        };

        /**
         * Custom popup
         * @param {object}   opts     - title and dom
         * @param {function} callback - dialog object of jQuery
         */
        that.custom = function (opts, callback) {
            id = 'J_PopupCustom' + randomNum();
            html = '<div id="' + id + '" class="modal "' + opts.animated + ' tabindex="-1">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                '<h4 class="modal-title">' + opts.title + '</h4>' +
                '</div>' +
                '<div class="modal-body">' + opts.dom + '</div>' +
                '</div>' +
                '</div>' +
                '</div>'; // 模态框 html 代码片段
            $('body').append(html);
            dialogE = $('#' + id);
            dialogE.find('.modal-dialog').css('width', opts.width);
            dialogE.modal('show');
            typeof (callback) === 'function' ? callback(dialogE) : null;
            // 隐藏后删除 modal 节点
            dialogE.on('hidden.bs.modal', function () {
                $(this).remove();
            });
        };

        return that;
    };
    $.bs.popup = popup();
}));
