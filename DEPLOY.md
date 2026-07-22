# 同机正式 / 测试双环境部署

| | 正式版 | 测试版 |
|---|---|---|
| URL | http://123.56.7.111/YonBIP_EZine/ | http://123.56.7.111/YonBIP_EZine-test/ |
| 目录 | `/var/www/YonBIP_EZine` | `/var/www/YonBIP_EZine-test` |
| 端口 | 现有（通常 3000） | `3001` |
| PM2 | `YonBIP_EZine` | `YonBIP_EZine-test` |
| 分支 | `main` 自动部署 | `staging` 自动部署 |

## 服务器一次性配置

在 `123.56.7.111` 上执行（正式版进程可继续跑，但 Nginx 改完需 reload）。

### 1. 目录

```bash
mkdir -p /var/www/YonBIP_EZine-test
```

### 2. Nginx

两套 location 都用带尾斜杠的 `proxy_pass`，把路径前缀剥掉后再转给 Node：

```nginx
location /YonBIP_EZine/ {
  proxy_pass http://127.0.0.1:3000/;
  proxy_http_version 1.1;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}

location /YonBIP_EZine-test/ {
  proxy_pass http://127.0.0.1:3001/;
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

**上线顺序：** 先改 Nginx（两套 location 剥前缀）→ 再部署带 `BASE_URL` 的前端到 `main`。否则正式版 API 可能 404。

### 3. 测试版 PM2

第一次可由 GitHub Actions（推 `staging`）自动创建；也可手动：

```bash
cd /var/www/YonBIP_EZine-test
# 确保已有 dist/（先跑一次 staging 部署或手动上传）
PORT=3001 NODE_ENV=production BASE_PATH=/YonBIP_EZine-test/ VITE_BASE_PATH=/YonBIP_EZine-test/ \
  pm2 start dist/server.cjs --name YonBIP_EZine-test
pm2 save
```

正式版 PM2 名称与目录不要改。若正式版也需写入 `BASE_PATH`（服务端拼图片代理 URL），重启一次：

```bash
cd /var/www/YonBIP_EZine
NODE_ENV=production BASE_PATH=/YonBIP_EZine/ VITE_BASE_PATH=/YonBIP_EZine/ \
  pm2 restart YonBIP_EZine --update-env
pm2 save
```

### 4. 环境变量

`GEMINI_API_KEY` 可放在各目录的 `.env`。测试目录若没有，部署脚本会从正式目录复制一份。

## 日常发版

1. 功能合到 `staging` → 自动部署测试站 → 打开 http://123.56.7.111/YonBIP_EZine-test/ 验收  
2. 验收通过后 merge 到 `main` → 自动部署正式站 → http://123.56.7.111/YonBIP_EZine/

本地按环境构建：

```bash
VITE_BASE_PATH=/YonBIP_EZine/ npm run build
VITE_BASE_PATH=/YonBIP_EZine-test/ npm run build
```
