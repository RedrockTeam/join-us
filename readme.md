##  红岩网校 2017 招贤纳士  

### install dependencies

```
    (c)npm install
```

#### dev

```
    npm run dev
```

#### build

```
    npm run build
```

** PS. **
> index.html -> index.html # (替换为 `src/deployment.html`
> index.js -> js/app.js (五个球的文件, 无需更改)
> prospect.js -> js/prospect.js (前景加载文件, 无需更改)
> three.min.js 因为改过, 需要手动 `cp ./src/js/three.min.js ./dist/js`

> 部署版本手动添加 js 文件, 如果不是手机则不加载, 在src/deployment.html中
