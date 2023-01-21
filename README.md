# scrambler-web

Scrambler website

![screenshot](https://i.imgur.com/aChnsDI.jpg)

## Usage

### Prerequisites

- elixir & mix
- npm
- [iosevka fonts](https://github.com/be5invis/Iosevka)

### Backend

Clone [scrambler_api](https://github.com/q-cubing/scrambler_api).

Get deps.

```
mix deps.get
```

Configure using `scrambler_api/config/config.exs`.

Run HTTP server.

```
mix run --no-halt
```

### The website

Get deps.

```
npm i
```

Run this for [tailwindcss](https://github.com/tailwindlabs/tailwindcss) to work.

```
npm run dev
```

Go to `localhost:your_port`.
