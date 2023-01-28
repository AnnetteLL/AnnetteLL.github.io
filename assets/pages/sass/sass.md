# sass

## 网址
URL： [www.sass.hk](https://www.sass.hk/)
配置： [github.com/ritwickdey/vscode-live-compiler](https://github.com/ritwickdey/vscode-live-sass-compiler)

## 语法
### 选择器嵌套
sass:
```sass
.container {
  width: 1200px;
  margin: 0 auto;
  .header {
    height: 90px;
    line-height: 90px;
    .logo {
      width: 100px;
      height: 60px;
    }
  }
  .center {
    height: 600px;
    background-color: #f00;
  }
  .footer {
    font-size: 16px;
    text-align: center;
  }
}
```
css: 
```css
.container {
  width: 1200px;
  margin: 0 auto;
}
.container .header {
  height: 90px;
  line-height: 90px;
}
.container .header .logo {
  width: 100px;
  height: 60px;
}
.container .center {
  height: 600px;
  background-color: #f00;
}
.container .footer {
  font-size: 16px;
  text-align: center;
}
```
### 父选择器 &
sass: 
```sass
.container {
  width: 1200px;
  margin: 0 auto;
  a {
    color: #333;
    &:hover {
      text-decoration: underline;
      color: #f00;
    }
  }
  .top {
    border: 1px solid #f2f2f2;
    &-left {
      float: left;
      width: 200px;
    }
  }
}
```
css:
```css
.container {
  width: 1200px;
  margin: 0 auto;
}
.container a {
  color: #333;
}
.container a:hover {
  text-decoration: underline;
  color: #f00;
}
.container .top {
  border: 1px solid #f2f2f2;
}
.container .top-left {
  float: left;
  width: 200px;
}/*# sourceMappingURL=sass.css.map */
```
### 属性嵌套
sass:
```sass
.container a {
  color: #333;
  font: {
    size: 14px;
    family: sans-serif;
    weight: bold
  }
}
```
css:
```css
.container a {
  color: #333;
  font-size: 14px;
  font-family: sans-serif;
  font-weight: bold;
}/*# sourceMappingURL=sass.css.map */
```
### 占位符选择器%foo必须通过@extend
有时，需要定义一套样式并不是给某个元素用，而是只通过@extend指令使用，尤其是在制作sass样式库的时候，希望sass能够忽略用不到的样式。
sass: 
```sass
.button%base {
  display: inline-block;
  margin-bottom: 0;
  font-weight: normal;
  text-align: center;
}
.btn-default {
  @extend %base;
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}
.btn-success {
  @extend %base;
  color: #fff;
  background-color: #b5c077;
  border-color: #b5c077;
}
.btn-danger {
  @extend %base;
  color: #fff;
  background-color: #dd7933;
  border-color: #dd7933;
}
```
css:
```css
.button.btn-danger, .button.btn-success, .button.btn-default {
  display: inline-block;
  margin-bottom: 0;
  font-weight: normal;
  text-align: center;
}

.btn-default {
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}

.btn-success {
  color: #fff;
  background-color: #b5c077;
  border-color: #b5c077;
}

.btn-danger {
  color: #fff;
  background-color: #dd7933;
  border-color: #dd7933;
}/*# sourceMappingURL=sass.css.map */
```

## 注释
// 这里不会编译到css中
/* 这里会编译到css中 */