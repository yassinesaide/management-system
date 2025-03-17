const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// ANSI color codes for better terminal output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
};

console.log(
  `${colors.bright}${colors.blue}=== School Management System Setup ===${colors.reset}\n`
);

// Check if .env.local exists, if not create it from example
try {
  if (!fs.existsSync(path.join(__dirname, ".env.local"))) {
    console.log(`${colors.yellow}Creating .env.local file${colors.reset}`);

    const envContent = `# Database Configuration
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=school_management

# Authentication
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d`;

    fs.writeFileSync(path.join(__dirname, ".env.local"), envContent);
    console.log(`${colors.green}✓ Created .env.local file${colors.reset}`);
  } else {
    console.log(
      `${colors.green}✓ .env.local file already exists${colors.reset}`
    );
  }
} catch (error) {
  console.error(
    `${colors.red}Error creating .env.local file:${colors.reset}`,
    error
  );
}

// Install dependencies
try {
  console.log(`\n${colors.yellow}Installing dependencies...${colors.reset}`);
  execSync("npm install", { stdio: "inherit" });
  console.log(
    `${colors.green}✓ Dependencies installed successfully${colors.reset}`
  );
} catch (error) {
  console.error(
    `${colors.red}Error installing dependencies:${colors.reset}`,
    error
  );
  process.exit(1);
}

// Check MySQL
console.log(`\n${colors.yellow}Checking MySQL connectivity...${colors.reset}`);
try {
  // Try to require mysql2 to check if it's installed
  require("mysql2");
  console.log(`${colors.green}✓ MySQL client is available${colors.reset}`);

  console.log(
    `${colors.cyan}Important: Don't forget to run the database schema from src/lib/schema.sql${colors.reset}`
  );
} catch (error) {
  console.log(
    `${colors.red}⨯ MySQL client is not available. Will be installed when you run npm install.${colors.reset}`
  );
}

console.log(`\n${colors.bright}${colors.green}Setup completed!${colors.reset}`);
console.log(`\n${colors.cyan}Next steps:${colors.reset}`);
console.log(`1. Update your .env.local file with your database credentials`);
console.log(
  `2. Run the database schema: source path/to/src/lib/schema.sql in MySQL client`
);
console.log(`3. Start the development server: npm run dev`);
console.log(`4. Open http://localhost:3000 in your browser`);
console.log(`\n${colors.bright}${colors.blue}Happy coding!${colors.reset}\n`);
