export interface Prompt {
  id: string;
  title: string;
  description: string;
  fullPrompt: string;
  likes: number;
  category: "Backend" | "Frontend" | "DevOps" | "Design" | "Image Generation";
  rating: number;
}

export const prompts: Prompt[] = [
  {
    id: "code-review-assistant",
    title: "Code Review Assistant",
    description: "Get detailed code reviews with suggestions for improvements, best practices, and potential bugs.",
    fullPrompt: `You are an expert code reviewer. Please review the following code and provide:

1. A summary of what the code does
2. Potential bugs or issues
3. Security vulnerabilities if any
4. Performance optimization suggestions
5. Best practices and code quality improvements
6. Readability and maintainability suggestions

Be specific with line numbers and provide examples of improved code where applicable.

Code to review:
[PASTE YOUR CODE HERE]`,
    likes: 342,
    category: "Backend",
    rating: 4.9,
  },
  {
    id: "api-documentation-generator",
    title: "API Documentation Generator",
    description: "Automatically generate comprehensive API documentation from your code comments and endpoints.",
    fullPrompt: `Generate comprehensive API documentation for the following endpoints. Include:

1. Endpoint URL and HTTP method
2. Description of what the endpoint does
3. Request parameters (path, query, body)
4. Request body schema with types
5. Response schema with status codes
6. Example requests and responses
7. Authentication requirements
8. Rate limiting information
9. Error codes and their meanings

Format the documentation in Markdown with clear sections.

API Code:
[PASTE YOUR API CODE HERE]`,
    likes: 298,
    category: "Backend",
    rating: 4.8,
  },
  {
    id: "bug-debugger-pro",
    title: "Bug Debugger Pro",
    description: "Analyze error messages and stack traces to identify root causes and suggest fixes.",
    fullPrompt: `I'm encountering an error in my application. Please help me debug it by:

1. Analyzing the error message and stack trace
2. Identifying the root cause
3. Explaining why this error occurs
4. Providing step-by-step solutions
5. Suggesting how to prevent similar errors
6. Recommending debugging strategies

Error details:
- Error message: [PASTE ERROR MESSAGE]
- Stack trace: [PASTE STACK TRACE]
- Context: [DESCRIBE WHAT YOU WERE DOING]
- Environment: [DESCRIBE YOUR ENVIRONMENT]`,
    likes: 276,
    category: "DevOps",
    rating: 4.9,
  },
  {
    id: "sql-query-optimizer",
    title: "SQL Query Optimizer",
    description: "Optimize your database queries for better performance and explain execution plans.",
    fullPrompt: `Analyze and optimize the following SQL query:

1. Explain what the current query does
2. Identify performance bottlenecks
3. Suggest optimized version of the query
4. Explain the improvements made
5. Recommend appropriate indexes
6. Provide execution plan analysis
7. Estimate performance gains

Include before/after comparisons and explain the reasoning behind each optimization.

SQL Query:
[PASTE YOUR SQL QUERY HERE]

Database: [PostgreSQL/MySQL/etc]
Table schemas: [DESCRIBE YOUR TABLES]`,
    likes: 245,
    category: "Backend",
    rating: 4.7,
  },
  {
    id: "react-component-builder",
    title: "React Component Builder",
    description: "Generate React components with TypeScript, proper prop types, and accessibility features.",
    fullPrompt: `Create a React component with the following requirements:

Component specifications:
[DESCRIBE YOUR COMPONENT]

Requirements:
1. Use TypeScript with proper type definitions
2. Include all necessary props with types
3. Implement proper accessibility (ARIA labels, keyboard navigation)
4. Add responsive design considerations
5. Include error handling
6. Write clean, maintainable code
7. Add JSDoc comments
8. Follow React best practices and hooks guidelines

Additional features needed:
[LIST ANY SPECIFIC FEATURES]

Styling: [Tailwind CSS/CSS Modules/Styled Components]`,
    likes: 234,
    category: "Frontend",
    rating: 4.8,
  },
  {
    id: "git-commit-message-writer",
    title: "Git Commit Message Writer",
    description: "Create meaningful, conventional commit messages based on your code changes.",
    fullPrompt: `Generate a conventional commit message for the following code changes:

Follow the Conventional Commits specification:
- Type: feat, fix, docs, style, refactor, test, chore
- Scope (optional): component or file affected
- Description: brief summary
- Body (optional): detailed explanation
- Footer (optional): breaking changes, issue references

Code changes:
[PASTE YOUR GIT DIFF OR DESCRIBE CHANGES]

Generate:
1. A concise commit title (max 72 characters)
2. A detailed commit body explaining why and how
3. Any relevant issue references
4. Breaking change notes if applicable`,
    likes: 221,
    category: "DevOps",
    rating: 4.6,
  },
  {
    id: "test-case-generator",
    title: "Test Case Generator",
    description: "Generate comprehensive unit and integration tests for your functions and components.",
    fullPrompt: `Generate comprehensive test cases for the following code:

Test requirements:
1. Unit tests covering all functions/methods
2. Edge cases and boundary conditions
3. Error scenarios
4. Mock external dependencies
5. Integration test scenarios
6. Test descriptions following BDD style (Given/When/Then)
7. Setup and teardown procedures
8. Assertion examples

Testing framework: [Jest/Mocha/Vitest/etc]

Code to test:
[PASTE YOUR CODE HERE]

Generate tests with:
- Clear test descriptions
- Proper test organization (describe/it blocks)
- Complete code coverage
- Meaningful assertions`,
    likes: 198,
    category: "Backend",
    rating: 4.7,
  },
  {
    id: "ui-component-designer",
    title: "UI Component Designer",
    description: "Design beautiful, accessible UI components with Tailwind CSS and best practices.",
    fullPrompt: `Design a UI component with the following specifications:

Component type: [Button/Card/Form/Navigation/etc]
Description: [DESCRIBE WHAT YOU NEED]

Requirements:
1. Modern, clean design
2. Fully responsive (mobile, tablet, desktop)
3. Accessibility features (WCAG 2.1 AA compliant)
4. Tailwind CSS classes
5. Multiple variants/states (default, hover, active, disabled)
6. Color scheme: [SPECIFY COLORS]
7. Animations and transitions
8. Dark mode support (optional)

Generate:
- React/HTML component code
- Tailwind CSS classes
- Variants and states
- Usage examples
- Accessibility considerations explained`,
    likes: 187,
    category: "Design",
    rating: 4.8,
  },
  {
    id: "ai-image-generator",
    title: "AI Image Prompt Creator",
    description: "Generate detailed prompts for AI image generation tools like Midjourney, DALL-E, and Stable Diffusion.",
    fullPrompt: `Create a detailed image generation prompt based on my description:

My image idea:
[DESCRIBE WHAT YOU WANT TO CREATE]

Generate a comprehensive prompt including:
1. Main subject and composition
2. Art style and medium (e.g., digital art, oil painting, 3D render)
3. Lighting conditions and atmosphere
4. Color palette and mood
5. Camera angle and perspective
6. Level of detail and quality descriptors
7. Artist references or style influences
8. Technical parameters (resolution, aspect ratio)

Provide:
- A complete prompt optimized for [Midjourney/DALL-E/Stable Diffusion]
- Variations with different styles
- Negative prompts (what to avoid)
- Parameter suggestions`,
    likes: 289,
    category: "Image Generation",
    rating: 4.9,
  },
  {
    id: "logo-design-prompt",
    title: "Logo Design Prompt Generator",
    description: "Create professional prompts for AI-generated logo designs with brand consistency.",
    fullPrompt: `Generate an AI prompt for logo design with these specifications:

Brand/Company name: [YOUR BRAND NAME]
Industry: [YOUR INDUSTRY]
Brand personality: [DESCRIBE BRAND PERSONALITY]

Create a prompt that specifies:
1. Logo style (minimalist, vintage, modern, abstract, etc.)
2. Color scheme and psychology
3. Symbols or imagery to include
4. Typography style
5. Overall mood and feeling
6. Vector/scalable requirements
7. Background (transparent, solid color, etc.)

Generate:
- Main logo prompt
- Alternative variations
- Color palette suggestions
- File format recommendations`,
    likes: 156,
    category: "Image Generation",
    rating: 4.7,
  },
];

// Helper function to get a prompt by ID
export const getPromptById = (id: string): Prompt | undefined => {
  return prompts.find(prompt => prompt.id === id);
};

// Helper function to get prompts by category
export const getPromptsByCategory = (category: Prompt["category"]): Prompt[] => {
  return prompts.filter(prompt => prompt.category === category);
};

// Helper function to get top prompts
export const getTopPrompts = (limit: number = 6): Prompt[] => {
  return prompts.slice(0, limit);
};
