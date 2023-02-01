# sass

## 网址
URL： [www.sass.hk](https://www.sass.hk/)
配置： [github.com/ritwickdey/vscode-live-compiler](https://github.com/ritwickdey/vscode-live-sass-compiler)
```json
  "liveSassCompile.settings.autoprefix": [
    "> 1%",
    "last 2 versions"
  ],
  "liveSassCompile.settings.formats":[
    {
        "format": "expanded", // nested - 嵌套格式   expanded - 展开格式    compact - 紧凑格式    compressed - 压缩格式
        "extensionName": ".css",
        "savePath": null // null表示当前目录
    }
  ],
  // 排除目录
  "liveSassCompile.settings.excludeList": [ 
    // "**/node_modules/**",
    // ".vscode/**" 
  ],
  // 是否添加兼容前缀，如： --webkit- -moz- 等
  "liveSassCompile.settings.generateMap": true
```

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


## 定义
1. 变量以$开头
2. \$border-color与\$border_color相同，后定义的覆盖前定义
3. 变量一定要先定义，后使用
4. !global可以定义全局变量

sass:
```sass
$color: #f00;
$border-color: #f2f2f2;
$border_color: #f00;
.container {
  color: $color;
  border-color: $border-color;
  $font-size: 16px !global;
  font-size: $font-size;
}
.footer {
  font-size: $font-size;
}
```
css:
```css
.container {
  color: #f00;
  border-color: #f00;
  font-size: 16px;
}
.footer {
  font-size: 16px;
}/*# sourceMappingURL=sass.css.map */
```
