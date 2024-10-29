<div style="text-align: center">

![DevLinks](./public/images/logo-devlinks-readme.svg)

</div>
DevLinks is a customizable link-sharing platform where users can easily manage and share their professional links, projects, and social profiles on a single page. With a QR code for each profile, users can share and access their links with ease. This application leverages modern technologies such as

**Next.js** **TypeScript**, **ShadCN UI**, and **Strapi** to provide a responsive, interactive, and secure experience.
<div style="margin-top: 20px;">

![Links Page Preview](./public/screenshots/Links%20Page.png)
</div>
<div style="margin-top: 20px;">

![Profile Preview Page](./public/screenshots/Preview%20Page.png)
</div>

## 🚀 Features

- **Personalized Link Management**: Add, update, or delete links to social profiles, portfolios, or other resources.
- **Customizable Profile**: Build a branded profile page with your picture, name, and selected links, allowing others to view your portfolio or connect with you on multiple platforms.
- **QR Code Integration**: Automatically generates a unique QR code for each user profile, making it easy to share and scan to access links on mobile devices.
- **Real-Time Updates**: Real-time link previews allow users to instantly see how their links will appear on their profile page.
- **Responsive Design**: Optimized for desktop, tablet, and mobile viewing.
- **Drag-and-Drop Reordering**: Easily organize links in a preferred order.
- **Authentication and Security**: User authentication to ensure secure access to profiles and personal data.

## 🛠️ Tech Stack

### Frontend
- **Next.js**: For server-rendered React pages and optimized web performance.
- **TypeScript**: Ensures type safety and improves code readability.
- **ShadCN UI**: For a modern, responsive UI library to provide seamless user experience and maintainable styling.

### Backend
- **Strapi**: A headless CMS that manages link and profile data, offering a straightforward interface for CRUD operations.

### Additional Integrations
- **QRCode Generator**: Generates a QR code for each profile, allowing users to easily share their profiles offline.

## 🖥️ Installation

### Prerequisites
- Node.js and npm
- [Strapi CMS](https://strapi.io/) setup (you can refer to Strapi documentation for installation)

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/devlinks
   ```
2. Navigate to the frontend folder and install dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Create a `.env.local` file in the root folder and add the following environment variables:
   ```plaintext
   NEXT_PUBLIC_API_URL=your_strapi_api_url
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup (Strapi)
1. Navigate to the backend folder and install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Set up environment variables for Strapi (usually in a `.env` file):
   ```plaintext
   DATABASE_HOST=your_database_host
   DATABASE_PORT=your_database_port
   DATABASE_NAME=your_database_name
   ```
3. Start the Strapi server:
   ```bash
   npm run develop
   ```

### QR Code Generation
Ensure the QR code generation module is correctly integrated within the frontend.

## 📄 Usage

1. **Create a Profile**: Sign up or log in to access your profile page.
2. **Customize Links**: Use the "Add New Link" button to add, update, or delete links.
3. **Organize Links**: Drag and drop links to reorder them as desired.
4. **Preview and Share**: Click on the "Preview" button to view your public profile. Use the "Share Link" button or scan the QR code to access the profile on different devices.

## 📷 Screenshots

### Profile Links Page
![Links Page Screenshot](/public/screenshots/preview.png)

### Profile Preview with QR Code
![Preview Page Screenshot](/public/screenshots/qrCode.png)

## 📚 Resources

- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Strapi Documentation**: [https://strapi.io/documentation](https://strapi.io/documentation)
- **TypeScript**: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)
- **ShadCN UI**: [https://shadcn.dev](https://shadcn.dev)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/your-username/devlinks/issues).

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
