## Demo: [https://bounty-ideas-generator-production.up.railway.app/](https://bounty-ideas-generator-production.up.railway.app/)

## Prerequisites

Before running this project, ensure you have:

- **Node.js** (>=14.x recommended)
- **npm** package manager

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/whtsupbab3/bounty-ideas-generator.git
cd bounty-ideas-generator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### 4. Build and Export for Production

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## Environment Variables

Create a `.env.local` file at the root of the project to store environment variables:

```
OPENAI_API_KEY='sk-proj-...'
NEXT_PUBLIC_BOUNTIES_NUM='3'
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Happy coding! 🚀
