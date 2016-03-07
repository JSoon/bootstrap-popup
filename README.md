# bootstrap-popup
A enhanced window popup widget based on twitter bootstrap modal.

------
##Usage

First of all, you should import bootstrap-popup, which is dependent on jquery and bootstrap.js:
```html
<script src="//cdn.bootcss.com/jquery/2.2.0/jquery.min.js"></script>
<script src="//cdn.bootcss.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script src="dist/bootstrap-popup.min.js"></script>
```

### Toast
![此处输入图片的描述][1]
> $.bs.popup.toast(opts, callback);
```javascript
$.bs.popup.toast({
    title: 'Title',
    info: 'This is a toast.'
}, function(dialogE) {
    // todos here
});
```

### Confirm
![此处输入图片的描述][2]
> $.bs.popup.confirm(opts, callback);
```javascript
$.bs.popup.confirm({
    title: 'Title',
    info: 'Do you want to confirm?'
}, function(dialogE) {
    // todos here
});
```

### Prompt
![此处输入图片的描述][3]
> $.bs.popup.prompt(opts, callback);
```javascript
$.bs.popup.prompt({
    title: 'Title',
    info: 'Input your name, please.'
}, function(dialogE, message) {
    // todos here
});
```

### Custom
![此处输入图片的描述][4]
> $.bs.popup.custom(opts, callback);
```javascript
$.bs.popup.custom({
    title: 'Title',
    dom: '<div class="custom"><h1>This is a custom DOM.</h1></div>',
    width: '200px'
}, function(dialogE) {
    // todos here
});
```

## Documents
For more usage, please check bootstrap-popup.html.


  [1]: https://raw.githubusercontent.com/JSoon/bootstrap-popup/master/pics/1_toast.png
  [2]: https://raw.githubusercontent.com/JSoon/bootstrap-popup/master/pics/2_confirm.png
  [3]: https://raw.githubusercontent.com/JSoon/bootstrap-popup/master/pics/3_prompt.png
  [4]: https://raw.githubusercontent.com/JSoon/bootstrap-popup/master/pics/4_custom.png
