# 前端更新后必须重新构建并部署

商品列表、顺序、媒体文件（1–12 对应产品1–6）都在代码里改好了。  
**如果线上还是只显示 3 个产品、产品1 的视频还是以前的、顺序不对或图片加载失败，说明线上跑的是旧前端，必须用新构建覆盖部署。**

## 操作步骤

1. **本地构建**
   ```bash
   cd frontend
   npm run build
   ```

2. **确认构建里已是新顺序（可选）**  
   在 `frontend/dist/assets/` 里随便打开一个 `.js` 文件，搜索 **`9.jpg`** 或 **`adulthoodgoods/9`**。  
   能搜到说明产品5（9、10）已在构建里；若只有 `1.png`、`3.jpeg` 等，说明构建用的不是当前代码。

3. **用新构建覆盖线上**
   - 把 **`frontend/dist` 里的全部内容** 上传到网站根目录，**完整覆盖** 原有静态文件（不要只覆盖部分）。
   - Nginx 托管：把 dist 里的文件拷到 Nginx 的 root 目录。
   - 对象存储/CDN：上传 dist 全部文件并覆盖同名文件。

4. **清缓存后再访问**
   - 浏览器：**Ctrl+Shift+R**（或 Cmd+Shift+R）强制刷新，或开无痕窗口访问。
   - 若用了 Cloudflare：在控制台对该域名做一次「清除缓存」。
   - 确认页面是 **6 个商品**，且第一个商品的视频是 **2.MP4**（原产品2），第五个是 **9、10**（原产品1）。

## 当前产品与文件对应关系

| 展示名 | 图片 | 视频 |
|--------|------|------|
| 产品1 | 1.jpeg | 2.MP4 |
| 产品2 | 3.JPG | 4.MP4 |
| 产品3 | 5.png | 6.MP4 |
| 产品4 | 7.png | 8.MP4 |
| 产品5 | 9.png | 10.MP4 |
| 产品6 | 11.png | 12.MP4 |

服务器 `adulthoodgoods/` 目录下需有上述 12 个文件，否则对应产品会“图片/视频加载失败”。

---

## 可选：用同源托管图/视（避免 api 域名加载失败）

若 api.adulthood.me 的图片/视频一直 404 或加载失败，可改为**和前端同域名**托管：

1. 把商品图、视频按文件名放到 **`frontend/public/goods/`**（见该目录下 README.md）。
2. 在 **Vercel** 或本地 **`.env`** 里增加：**`VITE_GOODS_FROM_PUBLIC=true`**。
3. 重新构建并部署前端（或 push 到 GitHub 触发 Vercel 部署）。

之后**图片**从 `https://www.adulthood.me/goods/1.jpeg` 等加载，**视频**仍从 api.adulthood.me/adulthoodgoods/ 加载。

---

## 图片/视频不显示时逐项检查

**图片（1、3、5、7、9、11）不显示：**

1. **文件名必须与代码一致**（区分大小写）：  
   `frontend/public/goods/` 下要有：`1.jpeg`、`3.JPG`、`5.png`、`7.png`、`9.png`、`11.png`。
2. **确认图片已提交到 GitHub**：在仓库里点进 `frontend/public/goods/`，能看到上述 6 个文件（不能只在本机有、没 push）。
3. **Vercel 环境变量**：在 Vercel 项目里设置 **`VITE_GOODS_FROM_PUBLIC=true`**，保存后重新部署（Redeploy）。
4. **Vercel 构建目录**：若仓库根目录不是 frontend，在 Vercel 的 **Root Directory** 填 `frontend`，**Build Output** 为 `dist`，这样构建后线上才有 `/goods/` 目录。
5. 部署完成后用无痕或 **Ctrl+Shift+R** 强刷，直接打开 `https://你的域名/goods/1.jpeg` 看能否打开图片。

**视频（2、4、6、8、10、12）不显示：**

1. **云服务器** `adulthoodgoods/` 目录下要有：`2.MP4`、`4.MP4`、`6.MP4`、`8.MP4`、`10.MP4`、`12.MP4`（扩展名大写 **MP4**，Linux 区分大小写）。
2. **Node 服务**：`sudo systemctl status adulthood-api` 为 active，`curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/adulthoodgoods/2.MP4` 返回 200。
3. **Cloudflare**：SSL 模式选 **Flexible**（源站只开 80 时），否则易 521；必要时清除缓存。
4. **前端环境变量**：Vercel 里 **`VITE_API_URL`** 为 `https://api.adulthood.me`，否则视频地址会错。
