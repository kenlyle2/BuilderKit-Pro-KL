# AI Interior Design by [Builderkit.ai](https://www.builderkit.ai)

`nextjs` `typescript` `replicate` `supabase` `tailwindcss` `shadcn`

## Introduction

The AI Interior Design Generator is a tool that leverages Replicate's API to generate interior design ideas based on user input. Users can specify the type of room, theme, and upload a reference image to receive AI-generated designs. This tool uses Supabase for database management.

<a href="https://interior-design.builderkit.ai/generate" target="_blank" rel="noopener">
  <picture>
    <img alt="AI Interior Design" src="https://interior-design.builderkit.ai/github-cover.webp" />
  </picture>
</a>

## Features

- 🖼️ Generate room designs using AI based on prompts, themes, and reference images.
- 🔄 Real-time updates on design generation status and results.
- 💻 Responsive and user-friendly interface.
- 🔗 Secure user authentication with OAuth support.

## Quickstart Guide

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/1811-Labs-LLC/BuilderKit.git

   cd builderkit

   git checkout interior-design-generator
   ```

2. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Environment Variables:**

   Create a `.env.local` file in the root directory and add the following variables:

   ```plaintext
   NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
   REPLICATE_API_TOKEN=<your-replicate-api-key>
   NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY=<your-google-analytics-key>
   ```

4. **Sync Supabase Types:**

   This will sync the table schema locally from Supabase. Run the below commands to login to supabase and sync the schema type.

   ```sh
   supabase login

   npx supabase gen types typescript --project-id <project-id> --schema public > src/types/supabase.ts
   ```

### Running the Application

1. **Run the development server:**

   ```sh
   npm run dev
   # or
   yarn dev
   ```

   This will start the development server on `http://localhost:3000`.

2. **Build for production:**

   ```sh
   npm run build
   # or
   yarn build
   ```

   This command compiles the application for production usage.

3. **Start the production server:**

   ```sh
   npm start
   # or
   yarn start
   ```

   This will start the application in production mode.

### Additional Scripts

- **Prepare Husky for Git hooks:**

  ```sh
  npm run prepare
  ```

- **Validate the code with Linting, Formatting & Typecheck:**

  ```sh
  npm run validate
  ```

## Requirements

- **Node.js**: Download and install from [here](https://nodejs.org/).
- **Supabase**: Create an account and a new project on [Supabase](https://supabase.com/). Obtain the `SUPABASE_URL` and `SUPABASE_ANON_KEY` from your project settings.
- **Replicate API Key**: Create an account on [Replicate](https://replicate.com/) to get the api token.

## License

This project is licensed under the MIT License. See the [LICENSE](https://www.builderkit.ai/license) file for details.

## Contact

For any inquiries or issues, please open an issue on the [GitHub repository](https://github.com/1811-Labs-LLC/BuilderKit) or contact the author at [vatsal1811@gmail.com](mailto:vatsal1811@gmail.com).
