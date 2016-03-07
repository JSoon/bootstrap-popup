/**
 * bootstrap-popup v1.0.0
 * Copyright 2016 jsoon
 * Licensed under the MIT license
 */
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'bootstrap'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'), require('bootstrap'));
    } else {
        if (typeof jQuery === 'undefined') {
            throw new Error('bootstrap-popup requires jQuery to be loaded first');
        } else if (typeof (jQuery.fn.modal) === 'undefined') {
            throw new Error('bootstrap-popup requires Bootstrap to be loaded first');
        }
        factory(jQuery, jQuery.fn.modal);
    }
}(function ($, modal) {
    'use strict';
    $.bs = $.bs || {};
    var popup = function () {
        var that = {};
        var id, html, 
            message, 
            dialogE, 
            dialogOk, dialogCancel;

        var randomNum = function (scope) {
            var scope = scope || 100000; 
            return Math.floor(Math.random() * scope);
        };

        that.toast = function (opts, callback) {
            id = 'J_PopupToast' + randomNum();
            html = '<div id="' + id + '" class="modal fade" tabindex="-1">' +
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
                '</div>'; 
            var delay = arguments[2] ? arguments[2] : 3000; 
            $('body').append(html);
            dialogE = $('#' + id);
            dialogE.find('.modal-dialog').css('width', opts.width);
            dialogE.on('shown.bs.modal', function () {
                typeof (callback) === 'function' ? callback(dialogE): null;
                var that = this,
                    t = setTimeout(function () {
                        $(that).modal('hide');
                    }, delay);
            }).modal('show');
            dialogE.on('hidden.bs.modal', function () {
                $(this).remove();
            });
        };

        that.confirm = function (opts, callback) {
            id = 'J_PopupConfirm' + randomNum();
            html = '<div id="' + id + '" class="modal fade" tabindex="-1">' +
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
                '</div>'; 
            $('body').append(html);
            dialogE = $('#' + id);
            dialogE.find('.modal-dialog').css('width', opts.width);
            dialogE.modal('show');
            dialogOk = dialogE.find('.J_Ok');
            dialogCancel = dialogE.find('.J_Cancel');
            dialogOk.on('click', function () {
                typeof (callback) === 'function' ? callback(dialogE): null;
            });
            dialogCancel.on('click', function () {
                dialogE.modal('hide');
            });
            dialogE.on('hidden.bs.modal', function () {
                $(this).remove();
            });
        };

        that.prompt = function (opts, callback) {
            id = 'J_PopupPrompt' + randomNum();
            html = '<div id="' + id + '" class="modal fade" tabindex="-1">' +
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
                '</div>'; 
            $('body').append(html);
            dialogE = $('#' + id);
            dialogE.find('.modal-dialog').css('width', opts.width);
            dialogE.modal('show');
            dialogOk = dialogE.find('.J_Ok');
            dialogCancel = dialogE.find('.J_Cancel');
            dialogOk.on('click', function () {
                message = dialogE.find('.J_Message').eq(0).val();
                typeof (callback) === 'function' ? callback(dialogE, message): null;
            });
            dialogCancel.on('click', function () {
                dialogE.modal('hide');
            });
            dialogE.on('hidden.bs.modal', function () {
                $(this).remove();
            });
        };

        that.custom = function (opts, callback) {
            id = 'J_PopupCustom' + randomNum();
            html = '<div id="' + id + '" class="modal fade" tabindex="-1">' +
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                '<h4 class="modal-title">' + opts.title + '</h4>' +
                '</div>' +
                '<div class="modal-body">' + opts.dom + '</div>' +
                '</div>' +
                '</div>' +
                '</div>'; 
            $('body').append(html);
            dialogE = $('#' + id);
            dialogE.find('.modal-dialog').css('width', opts.width);
            dialogE.modal('show');
            typeof (callback) === 'function' ? callback(dialogE): null;
            dialogE.on('hidden.bs.modal', function () {
                $(this).remove();
            });
        };

        return that;
    };
    $.bs.popup = popup();
}));
