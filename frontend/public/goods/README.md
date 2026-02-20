# 商品图片（同源托管）

仅**图片**放本目录；**视频**仍由 api.adulthood.me/adulthoodgoods/ 提供。

把以下图片放到**本目录**（与 README.md 同级），部署后通过 `/goods/xxx` 访问：

`1.jpeg` `3.JPG` `5.png` `7.png` `9.png` `11.png`

放好后在 `.env` 或 Vercel 环境变量里设置 **VITE_GOODS_FROM_PUBLIC=true**，重新构建并部署。
