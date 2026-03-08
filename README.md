# Termux Remote Dashboard (Frontend)

A modern, responsive React-based dashboard for remote Android device management. This interface allows you to monitor status and control hardware features of your Android device from any web browser.

## 🔗 Required Backend

This frontend requires the **[termux-api-http](https://github.com/Alchemist-Aloha/termux-api-http)** backend to be running on your Android device within Termux.

## ✨ Features

- **System Monitoring:** Real-time battery status, network info, device details, and GPS location.
- **Hardware Control:** Remotely toggle the torch, adjust screen brightness, trigger vibration, and manage volume streams.
- **Communications:** Read/send SMS messages, view call logs, and access contacts.
- **UI Interaction:** Send toast notifications, use Text-to-Speech (TTS), and manage the system clipboard.
- **Notification Management:** View active notifications and send new ones to the device.

## 🚀 Quick Start

### Using Docker (Recommended)

1. Clone this repository.
2. Edit `docker-compose.yml` or set environment variables to point to your device's IP.
3. Start the container:
   ```bash
   docker-compose up -d
   ```
4. Access the dashboard at `http://localhost:8080`.

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file based on `.env.example`:
   ```env
   VITE_API_URL=http://YOUR_DEVICE_IP:43333/api
   VITE_API_KEY=your_optional_key
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## ⚙️ Configuration

The application is configured via environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | The base URL of your `termux-api-http` server. | `http://localhost:43333/api` |
| `VITE_API_KEY` | The API key configured on your server (if any). | (empty) |

## 🛠️ Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **Deployment:** Docker (Nginx)

## 🏗️ Architecture

`Web Dashboard (React) <---> HTTP API (Node.js/Termux) <---> Termux API <---> Android System`

---
Built with ❤️ for the Termux community.
