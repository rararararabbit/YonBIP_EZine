# 同机正式 / 测试双环境部署

只维护 **`main` 一个分支**。服务器上仍是两套目录 / 端口 / PM2 / Nginx path。

| | 正式版 | 测试版 |
|---|---|---|
| URL | http://123.56.7.111/YonBIP_EZine/ | http://123.56.7.111/YonBIP_EZine-test/ |
| 目录 | `/var/www/YonBIP_EZine` | `/var/www/YonBIP_EZine-test` |
| 端口 | `3001`（当前 pm2） | `3003`（避开 Yonyou_red_test 的 3002） |
| PM2 | `YonBIP_EZine` | `YonBIP_EZine-test` |
| 发版 | 推送 `main` **自动**部署 | GitHub Actions **手动** Run workflow，选 `test` |

## 日常发版

1. **测一下**：GitHub → Actions → Deploy YonBIP_EZine → Run workflow → environment 选 `test` → 打开 http://123.56.7.111/YonBIP_EZine-test/
2. **上正式**：把改动推到 `main`（或手动 Run workflow 选 `prod`）→ http://123.56.7.111/YonBIP_EZine/

本地构建：

```bash
npm run build:prod
npm run build:test
```

## 服务器一次性配置

在 `123.56.7.111` 上执行（正式版进程可继续跑，但 Nginx 改完需 reload）。

### 1. 目录

```bash
mkdir -p /var/www/YonBIP_EZine-test
```

### 2. Nginx

可直接参考仓库内 [`deploy/nginx-yonbip-ezine.conf`](deploy/nginx-yonbip-ezine.conf)。两套 location 都用带尾斜杠的 `proxy_pass`，把路径前缀剥掉后再转给 Node：

```nginx
location /YonBIP_EZine/ {
  proxy_pass http://127.0.0.1:3001/;
  proxy_http_version 1.1;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}

location /YonBIP_EZine-test/ {
  proxy_pass http://127.0.0.1:3003/;
  proxy_http_version 1.1;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}
```

若仍有全局 `location /api/` 指向正式版，请删除或注释。新前端只请求：

- 正式：`/YonBIP_EZine/api/...`
- 测试：`/YonBIP_EZine-test/api/...`

然后：

```bash
nginx -t && systemctl reload nginx
```

**上线顺序：** 先改 Nginx（两套 location 剥前缀）→ 再部署带 `BASE_URL` 的前端到正式站。否则正式版 API 可能 404。

### 3. 测试版 PM2

第一次由 Actions 手动部署 `test` 时会自动创建；也可手动：

```bash
cd /var/www/YonBIP_EZine-test
PORT=3003 NODE_ENV=production BASE_PATH=/YonBIP_EZine-test/ VITE_BASE_PATH=/YonBIP_EZine-test/ \
  pm2 start dist/server.cjs --name YonBIP_EZine-test
pm2 save
```

正式版若需写入 `BASE_PATH`（服务端拼图片代理 URL），重启一次：

```bash
cd /var/www/YonBIP_EZine
NODE_ENV=production BASE_PATH=/YonBIP_EZine/ VITE_BASE_PATH=/YonBIP_EZine/ \
  pm2 restart YonBIP_EZine --update-env
pm2 save
```

### 4. 环境变量

`GEMINI_API_KEY` 可放在各目录的 `.env`。测试目录若没有，部署脚本会从正式目录复制一份。
