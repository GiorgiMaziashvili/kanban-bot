# 🛠️ Discord Kanban Bot 123

A Discord bot that manages Kanban-style tasks via a prompt channel and emoji-based workflow.

## 📦 Features

- Automatically creates a structured Kanban board for each team (Front, Back, App)
- Parses task lists from a central `#kanban-prompt` channel
- Adds reaction emojis to manage task status
- Moves messages between channels based on emoji (🟨 🔄 ✅ 🧪 🛠️ 🗑️)
- Restricts users from manually posting in Kanban channels

---

## 🚀 Setup

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/discord-kanban-bot.git
cd discord-kanban-bot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file based on `.env.example`:

```env
DISCORD_TOKEN=your_discord_bot_token
GUILD_ID=your_server_id
PROMPT_CHANNEL_ID=your_kanban_prompt_channel_id
PORT=3000
```

### 4. Run the Bot (Dev Mode)

```bash
npm run dev
```

Or in production:

```bash
npm start
```

---

## 📂 Project Structure

```
discord-kanban-bot/
├── server.js               # Express server + bot loader
├── .env.example           # Environment template
├── src/
│   ├── index.js           # Discord bot entrypoint
│   ├── setup/
│   │   └── createStructure.js
│   ├── logic/
│   │   ├── handlePrompt.js
│   │   ├── handleReactions.js
│   │   └── restrictChannels.js
```

---

## 🧠 Task Format Example

In `#kanban-prompt`, paste:

```
* FRONT: Fix navbar
* APP: Implement login flow
* back: Add database migration script
```

Each will be routed to its respective `#to-do` channel with emoji reactions attached.

---

## 📌 Reaction Behavior

| Emoji | Meaning     | Action                   |
| ----- | ----------- | ------------------------ |
| 🟨    | TODO        | Move to `#to-do`         |
| 🔄    | In Progress | Move to `#in-progress`   |
| ✅    | Done        | Move to `#done`          |
| 🧪    | Test        | Move to `#test`          |
| 🛠️    | Fixed       | Move to `#fixed`         |
| 🗑️    | Delete      | Remove the task entirely |

---

## 🛡️ Restrictions

- Users cannot send messages directly into `#to-do`, `#in-progress`, etc.
- Bot deletes any manual posts in Kanban lanes

---
