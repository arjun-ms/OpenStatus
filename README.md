<h1 align="center">Open Status</h1>

## Introduction

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites

Before running this project, make sure you have the following software installed on your system:

- Node.js (v22.12.0 or higher)
- pnpm (v9.15 or higher)

## Get Started

To get started with the app, you will need to clone this repository and install the dependencies. You can do this by running the following commands in your terminal:

```sh
git clone https://github.com/yyyyyy/xxxxxxx.git
cd xxxxxxx
```

## Setting Environment Variables

In root directory, create a file `.env`

Add the following in the file.

```sh
DATABASE_URL = *******************

KINDE_CLIENT_ID=*******************
KINDE_CLIENT_SECRET=*******************
KINDE_ISSUER_URL=https://*******************
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/monitors
```

## Installation

**To install pnpm globally on your device**:

```sh
npm install -g pnpm@latest
```

Install the dependencies by running the following commands in your terminal:

```sh

```

## Usage

Once you have installed the dependencies and set the environment variables, you can run the program by running the following command from the root directory:

```sh
pnpm run dev
```

This will start the project and open the app in your default browser at localhost:3000 .
