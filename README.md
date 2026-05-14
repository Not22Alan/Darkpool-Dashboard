# Darkpool-Dashboard
Dark pool trading dashboard in React with real-time stock market pricing via Finnhub API

## Tech Stack

- React (Frontend UI)
- Vite (Build tool / dev server)
- Tailwind CSS (Styling)
- Recharts (Data visualization)
- Finnhub API (Market data)

## Installation and configuration
On Linux (Ubuntu/Debian) after cloneing the repo

```python
cd darkpool-dashboard
sudo apt install nodejs npm -y
npm install
npm install recharts
npm install -D tailwindcss postcss autoprefixer
```

Get a free API key from finnhub.io
Create .env file and add API
```python
VITE_FINNHUB_API_KEY="Api Key"
```
run the project
```python
npm run dev
```

## Current Limitations
No real institutional dark pool feed
No real-time WebSocket streaming