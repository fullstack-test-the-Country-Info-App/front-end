# Cities Information Frontend

This project is a frontend application built with **Next.js** and **Chakra UI**, designed to display a list of available cities and allow users to navigate to the country page of each city. The project includes server-side rendering (SSR) for fetching the list of cities from an API and features a clean and responsive user interface.

## Features

- **Cities Listing**: Displays a list of cities with their respective country codes.
- **Country Navigation**: Users can click on a city to navigate to the country page for more detailed information.
- **Server-Side Rendering (SSR)**: The cities list is fetched using SSR for better performance and SEO.
- **Error and Loading States**: Visual feedback is provided during data fetching, with a loading spinner and error messages.
- **Responsive Design**: The layout is responsive and adapts to different screen sizes.

## Technologies

- **Next.js**: React framework with server-side rendering and static site generation capabilities.
- **Chakra UI**: Component library for building beautiful and responsive user interfaces with ease.
- **JavaScript (ES6)**: Modern JavaScript features for clean and maintainable code.
- **API Fetching**: Using the `fetch` API to get data from the backend.

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/cities-frontend.git
cd cities-frontend
```

### 2. Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) installed. Then run the following command to install the project dependencies:

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root of the project with the following content:

```bash
NEXT_PUBLIC_API_URL=<your-backend-api-url>
```

Replace `<your-backend-api-url>` with the URL of your backend API that provides city and country information.

### 4. Run the Development Server

To start the development server, run:

```bash
npm run dev
```

The application will be running at `http://localhost:3000`.

### 5. Build for Production

To build the application for production, run:

```bash
npm run build
```

This will create an optimized production build of the application.

### 6. Start the Production Server

After building the application, you can start the production server with:

```bash
npm start
```

The production server will run at `http://localhost:3000`.

## Usage

### Cities Page

The homepage (`/`) lists all available cities fetched from the backend API. Each city is displayed in a card format with a button to navigate to the country page. When clicking on a city, you will be redirected to the country-specific information page.

### Navigation

- Click on a city's name or the "View Country" button to navigate to that country's detailed page.
- The country page shows more detailed information about the selected city and its country.

### Error Handling

- If there is an issue fetching data from the API, an error message will be displayed on the homepage.
- During the data fetching process, a spinner will indicate the loading state.

## Project Structure

```
├── components      # Reusable UI components (if applicable)
├── pages           # Next.js page routes
│   ├── index.tsx   # Main page that lists cities
│   └── country     # Dynamic page that shows information for a selected country
├── public          # Public assets
├── styles          # Global styles
├── .env.local      # Environment variables (not included in the repository)
├── package.json    # Project dependencies and scripts
├── README.md       # Project documentation
└── next.config.js  # Next.js configuration
```

## Contributing

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

This README provides an overview of the project, how to set it up, and how to contribute. It includes instructions for installation, running the development server, and building for production.
