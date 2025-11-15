# n2p(news-to-podcast) - web

**n2p(news-to-podcast)** 프로젝트는 최신 기술 뉴스를 HackerNews와 GeekNews에서 수집하여, 이를 요약하고 음성으로 변환하여 팟캐스트 형식으로 제공하는 서비스입니다.

**n2p(news-to-podcast)** project scrapes the latest tech news from HackerNews and GeekNews, summarizes the articles, converts them to speech, and delivers them in podcast format.

![Next.js Badge](https://img.shields.io/badge/nextjs-16-blue?logo=Next.js&logoColor=black&labelColor=white) ![pnpm Badge](https://img.shields.io/badge/pnpm-latest-blue?logo=pnpm&labelColor=white)

![GitHub Actions: ci.yml](https://img.shields.io/github/actions/workflow/status/gymynnym/n2p-web/release-build.yml?logo=github&label=ci.yml)![GitHub Actions: release-build.yml](https://img.shields.io/github/actions/workflow/status/gymynnym/n2p-web/release-build.yml?logo=github&label=release-build.yml) ![GitHub Tag](https://img.shields.io/github/v/tag/gymynnym/n2p-web?logo=github)

## Demo

https://github.com/user-attachments/assets/bc6f2a36-cb1c-442e-b9db-ae9728129166

## Installation

### Using pnpm: Local Development

```bash
$ git clone git@github.com:gymynnym/n2p-web.git
$ cd n2p-web
$ pnpm install --frozen-lockfile
# - setup .env file
$ pnpm dev
```

### Using Docker

```bash
$ docker pull ghcr.io/gymynnym/n2p-web:latest
$ docker run -d -p 8000:8000 ghcr.io/gymynnym/n2p-web:latest
```

## Environment Variables: `.env`

| Variable Name| Description   | 
|:--------------|:--------------|
|`API_HOST`|API server host|
|`NEXT_PUBLIC_API_HOST`|API server host|

## Routes

| Endpoint |  Description |
|:---------|:------------|
|`/`|Redirect to `/hackernews`|
|`/hackernews`|Top stories and podcasts from HackerNews|
|`/geeknews`|Top stories and podcasts from GeekNews|