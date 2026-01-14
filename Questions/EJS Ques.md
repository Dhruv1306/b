# EJS (Embedded JavaScript) - Practice Questions

**Date**: September 11, 2025  
**Topic**: Comprehensive Question Bank for Mastery

---

## 📚 Table of Contents

1. [Solutions & Explanations Guide](#solutions--explanations-guide)
2. [Progressive Learning Path](#progressive-learning-path)
3. [Easy Level Questions](#easy-level-questions)
4. [Medium Level Questions](#medium-level-questions)
5. [Hard Level Questions](#hard-level-questions)
6. [Copilot's Recommendations](#copilots-recommendations)

---

## 🎓 Solutions & Explanations Guide

### **How to Approach These Questions**

1. **Easy Questions**: Focus on syntax, basic templating, and simple data rendering
2. **Medium Questions**: Integrate with Express.js, handle complex data structures, implement authentication
3. **Hard Questions**: Build full applications, optimize performance, implement advanced features
4. **Copilot's Recommendations**: Think like a full-stack developer, consider scalability and maintainability

### **Key Areas to Focus While Solving**

- **Template Syntax**: Master all EJS tags and their proper usage
- **Data Handling**: Efficiently pass and manipulate data from server to views
- **Partials & Layouts**: Create reusable components for better code organization
- **Security**: Prevent XSS attacks and handle user input safely
- **Performance**: Optimize rendering speed and minimize server load
- **Integration**: Seamlessly work with Express.js, databases, and APIs

### **Study Tips**

1. **Start with Easy**: Master basic syntax before building complex applications
2. **Build Everything**: Don't just read - create actual web applications
3. **Test Thoroughly**: Always test your templates with different data scenarios
4. **Study Real Projects**: Analyze open-source projects using EJS
5. **Practice Integration**: Focus on Express.js + EJS combinations

---

## 📈 Progressive Learning Path

```
Week 1: Easy Questions (Q1-Q20) + Basic EJS Syntax
   ↓
Week 2: Medium Questions (Q21-Q40) + Express Integration
   ↓
Week 3: Hard Questions (Q41-Q60) + Full Applications
   ↓
Week 4: Copilot's Recommendations (CR1-CR15)
   ↓
Week 5: Portfolio Projects & Code Reviews!
```

### **🏆 Mastery Checklist**

- [ ] Can set up EJS with Express.js from scratch
- [ ] Master all EJS syntax patterns and tags
- [ ] Can create and use partials effectively
- [ ] Understand data flow from routes to templates
- [ ] Can handle forms and user input securely
- [ ] Know how to implement authentication with EJS
- [ ] Can optimize EJS performance for production
- [ ] Understand template caching and compilation
- [ ] Can debug EJS template errors effectively
- [ ] Can integrate EJS with databases and APIs

---

## 🟢 Easy Level Questions

_Covers all fundamental concepts and sub-concepts_

### **🌐 Platform Practice Links - Easy Level**

**📚 FreeCodeCamp:**

- [Build a Personal Portfolio Webpage](https://www.freecodecamp.org/learn/responsive-web-design/responsive-web-design-projects/build-a-personal-portfolio-webpage) - Practice template rendering
- [Build a Technical Documentation Page](https://www.freecodecamp.org/learn/responsive-web-design/responsive-web-design-projects/build-a-technical-documentation-page) - Template structure

**🎯 Frontend Mentor:**

- [Profile Card Component](https://www.frontendmentor.io/challenges/profile-card-component-cfArpWshJ) - Data rendering practice
- [FAQ Accordion Card](https://www.frontendmentor.io/challenges/faq-accordion-card-XlyjD0Oam) - Conditional rendering

**🏗️ Frontend Practice:**

- [Simple Landing Page](https://www.frontendpractice.com/projects/manage) - Basic templating
- [Article Preview Component](https://www.frontendpractice.com/projects/article-preview-component) - Data display

**💻 Exercism:**

- [JavaScript Track - Hello World](https://exercism.org/tracks/javascript/exercises/hello-world) - Basic setup
- [JavaScript Track - Two Fer](https://exercism.org/tracks/javascript/exercises/two-fer) - String templating logic

### **EJS Setup & Basic Syntax**

**Q1.** Set up a basic Express.js application with EJS as the view engine. Create a simple "Hello World" page that displays the current date and time.

**Q2.** **[Very Common]** Explain the difference between `<%= %>`, `<% %>`, and `<%- %>` tags in EJS. Provide examples for each.

**Q3.** Create an EJS template that displays a welcome message using data passed from an Express route. The route should pass: username, age, and current date.

**Q4.** **[Most Popular]** Write code to demonstrate how to include a partial in EJS. Create header.ejs and footer.ejs partials and include them in your main template.

**Q5.** Create an EJS template that renders a list of 5 fruits using a forEach loop. Pass the fruits array from your Express route.

### **Data Rendering & Variables**

**Q6.** **[Very Common]** What will be the output of this EJS template? Explain your answer.

```ejs
<% let name = "John"; %>
<% let age = 25; %>
<h1>Hello <%= name %></h1>
<p>Age: <%= age + 5 %></p>
<p>Message: <%- "<strong>Welcome!</strong>" %></p>
```

**Q7.** Create an EJS template that displays student information (name, roll number, grades) passed from an Express route as an object.

**Q8.** Write an EJS template that conditionally displays "Good Morning", "Good Afternoon", or "Good Evening" based on the current hour passed from the server.

**Q9.** **[Common Interview]** Create an EJS template that safely handles undefined or null values when displaying user data.

**Q10.** Build a simple product listing page using EJS that displays product name, price, and availability status for an array of products.

### **Basic Control Structures**

**Q11.** **[Most Popular]** Create an EJS template with if-else conditions to display different messages based on user login status.

**Q12.** Write an EJS template that displays a numbered list of items using a for loop (not forEach).

**Q13.** Create a template that displays "No items found" when an array is empty, otherwise displays the items in a table format.

**Q14.** **[Very Common]** Build an EJS template that displays different navigation menus based on user role (admin, user, guest).

**Q15.** Create an EJS template that generates a multiplication table for a number passed from the server.

### **Forms & Basic Interaction**

**Q16.** Create a simple contact form using EJS and handle both GET (display form) and POST (process form) requests in Express.

**Q17.** **[Common Problem]** Build a login form with EJS that displays error messages when login fails and redirects to dashboard when successful.

**Q18.** Create a registration form that validates user input and displays appropriate error or success messages using EJS.

**Q19.** Build a simple calculator using EJS forms where users can input two numbers and select an operation.

**Q20.** **[Popular Exercise]** Create a todo list application where users can add new tasks through a form and view all tasks on the same page.

---

## 🟡 Medium Level Questions

_Integration of concepts with practical applications_

### **🌐 Platform Practice Links - Medium Level**

**🏆 HackerRank:**

- [Node.js Challenges](https://www.hackerrank.com/domains/tutorials/10-days-of-javascript) - Server-side JavaScript
- [SQL Challenges](https://www.hackerrank.com/domains/sql) - Database integration practice

**🔥 LeetCode:**

- [Design Browser History](https://leetcode.com/problems/design-browser-history/) - Navigation logic
- [Design Log Storage System](https://leetcode.com/problems/design-log-storage-system/) - Data handling patterns

**🎯 Frontend Mentor:**

- [Ecommerce Product Page](https://www.frontendmentor.io/challenges/ecommerce-product-page-UPsZ9MJp6) - Complex data display
- [GitHub User Search App](https://www.frontendmentor.io/challenges/github-user-search-app-Q09YOgaH6) - API integration

**💪 Coderbyte:**

- [REST API Challenges](https://coderbyte.com/challenges) - Filter by Node.js
- [Full Stack Challenges](https://coderbyte.com/challenges) - Complete applications

**🎨 CSS Battle:**

- [Daily Targets](https://cssbattle.dev/targets) - Styling practice for templates

**🏗️ Frontend Practice:**

- [Audiophile E-commerce](https://www.frontendpractice.com/projects/audiophile) - Complex layouts
- [Art Gallery Website](https://www.frontendpractice.com/projects/galleria) - Dynamic content

### **Advanced Data Handling**

**Q21.** **[Very Popular Interview]** Create an EJS template that displays nested object data (user with address, hobbies, and preferences). Include proper error handling for missing properties.

**Q22.** Build a blog listing page that displays posts with author information, publication date, and truncated content. Include pagination controls.

**Q23.** **[Common Challenge]** Create an EJS template that formats and displays different data types: currency, dates, percentages, and phone numbers.

**Q24.** Build a dashboard template that displays charts data (passed as JSON) and renders it using Chart.js integration with EJS.

**Q25.** Create a search results page that highlights search terms in the results and displays "No results found" with search suggestions.

### **Express.js Integration**

**Q26.** **[Most Popular]** Build a complete user authentication system with EJS templates for login, register, dashboard, and profile pages.

**Q27.** Create a middleware that passes common data (site title, navigation items, user info) to all EJS templates automatically.

**Q28.** **[Interview Favorite]** Build a file upload feature where users can upload images and display them in an EJS gallery template.

**Q29.** Create a RESTful API documentation page using EJS that dynamically generates endpoint documentation from a JSON configuration.

**Q30.** Build a real-time chat application interface using EJS with Socket.io integration for message display.

### **Advanced Partials & Layouts**

**Q31.** **[Advanced Concept]** Create a layout system using EJS partials that includes header, sidebar, main content, and footer. Make the sidebar content dynamic based on the current page.

**Q32.** Build a reusable card component partial that accepts parameters (title, content, image, buttons) and can be used across different pages.

**Q33.** **[Popular Problem]** Create a breadcrumb navigation partial that dynamically generates breadcrumbs based on the current route path.

**Q34.** Build a modal component using EJS partials that can display different content types (alerts, forms, image galleries).

**Q35.** Create a responsive navigation partial that changes layout based on device type information passed from the server.

### **Database Integration**

**Q36.** **[Very Common]** Connect your EJS application to MongoDB and create templates to display, add, edit, and delete user records.

**Q37.** Build a blog application with EJS that supports creating, editing, and deleting posts with rich text content.

**Q38.** Create an e-commerce product catalog with EJS that includes filtering, sorting, and search functionality.

**Q39.** **[Popular Project]** Build a student management system with EJS templates for viewing grades, attendance, and course information.

**Q40.** Create a social media feed using EJS that displays posts, comments, likes, and user interactions from a database.

---

## 🔴 Hard Level Questions

_Advanced concepts, optimization, and real-world scenarios_

### **🌐 Platform Practice Links - Hard Level**

**🚀 CodeForces:**

- [Problem Sets](https://codeforces.com/problemset) - Algorithm optimization for backend
- [Contests](https://codeforces.com/contests) - Time-complex problem solving

**🏅 TopCoder:**

- [Single Round Matches](https://www.topcoder.com/challenges?tracks%5BDS%5D=true&tracks%5BDes%5D=true&tracks%5BDev%5D=true) - Advanced algorithms
- [Marathon Matches](https://www.topcoder.com/challenges?types%5B%5D=MM) - Optimization challenges

**🎯 AlgoMaster:**

- [System Design Questions](https://algomaster.io/problems) - Architecture patterns
- [Advanced Data Structures](https://algomaster.io/problems) - Performance optimization

**💻 HackerEarth:**

- [Web Development Challenges](https://www.hackerearth.com/challenges/competitive/web-development/) - Full-stack problems
- [Machine Learning Challenges](https://www.hackerearth.com/challenges/competitive/machine-learning/) - AI integration

**🔥 NeetCode:**

- [System Design](https://neetcode.io/roadmap) - Scalable architecture
- [Advanced Patterns](https://neetcode.io/roadmap) - Design patterns

**🎨 Codewell:**

- [Advanced Projects](https://www.codewell.cc/challenges) - Complex UI implementations
- [Full Stack Projects](https://www.codewell.cc/challenges) - End-to-end applications

**📚 FreeCodeCamp:**

- [APIs and Microservices](https://www.freecodecamp.org/learn/apis-and-microservices/) - Backend mastery
- [Quality Assurance](https://www.freecodecamp.org/learn/quality-assurance/) - Testing & optimization

### **Performance & Optimization**

**Q41.** **[Advanced Interview]** Implement EJS template caching for a high-traffic application. Measure and compare performance with and without caching.

**Q42.** Create a server-side pagination system with EJS that efficiently handles large datasets without loading all data into memory.

**Q43.** **[Performance Challenge]** Build an EJS application that implements lazy loading for images and content sections to improve page load times.

**Q44.** Optimize an EJS application to minimize the number of database queries by implementing efficient data fetching strategies.

**Q45.** **[System Design]** Create a multi-tenant EJS application where templates and styling change based on the tenant/organization.

### **Security & Error Handling**

**Q46.** **[Security Focus]** Implement comprehensive XSS prevention in EJS templates, including input sanitization and output encoding.

**Q47.** Create robust error handling in EJS templates that gracefully handles server errors, network issues, and missing data.

**Q48.** **[Advanced Security]** Build a content security policy (CSP) compliant EJS application with proper script and style handling.

**Q49.** Implement rate limiting and CSRF protection in an EJS application with proper user feedback.

**Q50.** **[Production Ready]** Create comprehensive logging and monitoring for an EJS application to track template rendering performance and errors.

### **Advanced Features**

**Q51.** **[Complex Integration]** Build a multi-language (i18n) EJS application that dynamically switches languages and content direction.

**Q52.** Create a theme switching system where users can change the entire look and feel of EJS templates dynamically.

**Q53.** **[Advanced Problem]** Implement server-side rendering with EJS for a single-page application (SPA) to improve SEO and initial load time.

**Q54.** Build a dynamic form generator using EJS that creates forms based on JSON schema definitions.

**Q55.** **[Master Level]** Create a CMS (Content Management System) with EJS that allows non-technical users to create and edit page layouts.

### **Real-World Applications**

**Q56.** **[Full Stack Project]** Build a complete e-learning platform with EJS that includes course listings, video players, quizzes, and progress tracking.

**Q57.** Create a project management tool with EJS that supports task management, team collaboration, and real-time updates.

**Q58.** **[Enterprise Level]** Build a reporting dashboard with EJS that generates PDF reports, exports data, and handles complex data visualizations.

**Q59.** Create a booking system (hotel/appointment) with EJS that handles availability calendars, reservations, and payment integration.

**Q60.** **[Capstone Project]** Build a social networking platform with EJS that includes user profiles, messaging, news feeds, and content sharing.

---

## 🎯 Copilot's Recommendations

_Special questions that enhance understanding and prepare for real-world scenarios_

### **Advanced Development Patterns**

**CR1.** **Component Architecture**: Design a component-based architecture for EJS where reusable components can be composed together with proper data flow and event handling.

**CR2.** **Template Inheritance**: Implement a template inheritance system similar to Django templates, where child templates can extend and override sections of parent templates.

**CR3.** **Micro-Frontend Integration**: Create an EJS application that can embed and integrate with React/Vue components for specific sections while maintaining SSR benefits.

**CR4.** **API-First Development**: Build an EJS application that consumes multiple external APIs and handles different response formats, error states, and loading indicators.

### **DevOps & Production Scenarios**

**CR5.** **Containerization Challenge**: Dockerize an EJS application with proper environment configuration, health checks, and optimized image sizes for production deployment.

**CR6.** **CI/CD Pipeline**: Set up automated testing, building, and deployment pipeline for an EJS application with proper staging and production environments.

**CR7.** **Monitoring & Analytics**: Implement comprehensive application monitoring including template rendering times, error tracking, and user analytics in an EJS application.

**CR8.** **Load Testing**: Design and execute load testing scenarios for an EJS application to identify bottlenecks and optimize for high concurrent users.

### **Advanced Integration Challenges**

**CR9.** **Headless CMS Integration**: Build an EJS application that integrates with a headless CMS (Strapi, Contentful) for dynamic content management with preview capabilities.

**CR10.** **GraphQL Integration**: Create an EJS application that efficiently fetches data from GraphQL APIs with proper error handling and caching strategies.

**CR11.** **Microservices Architecture**: Design an EJS frontend that communicates with multiple microservices and handles service discovery, fallbacks, and circuit breakers.

**CR12.** **Real-time Features**: Implement advanced real-time features like collaborative editing, live notifications, and presence indicators using EJS with WebSockets.

### **Innovation & Future-Proofing**

**CR13.** **Progressive Web App**: Convert an EJS application into a PWA with offline capabilities, push notifications, and app-like experience while maintaining server-side rendering.

**CR14.** **AI Integration**: Build an EJS application that integrates with AI services for content generation, image recognition, or natural language processing with proper UI feedback.

**CR15.** **Accessibility Excellence**: Create an EJS application that exceeds WCAG 2.1 AAA standards with proper ARIA labels, keyboard navigation, and screen reader support.

---

### **🌟 Bonus Challenges**

**BC1.** **Template Engine Comparison**: Build the same application using EJS, Pug, and Handlebars, then compare development experience, performance, and maintainability.

**BC2.** **Legacy Migration**: Create a migration strategy and tooling to convert a legacy PHP application to Node.js with EJS while maintaining existing functionality.

**BC3.** **Performance Benchmarking**: Conduct comprehensive performance testing comparing EJS with other template engines and client-side rendering approaches.

---

### **📝 Project Portfolio Suggestions**

1. **E-commerce Platform** - Complete online store with admin panel
2. **Blog CMS** - Content management system with rich text editor
3. **Social Network** - User profiles, messaging, and content sharing
4. **Learning Management System** - Course creation and student tracking
5. **Project Management Tool** - Team collaboration and task management

---

**💡 Pro Tip**: After completing each difficulty level, try to refactor your solutions using modern JavaScript features (ES6+, async/await) and best practices. This will prepare you for real-world development scenarios!

**Happy Coding! 🚀**

---

## 📋 Quick Reference

### **Essential EJS Syntax**

```ejs
<% // JavaScript code (no output) %>
<%= variable // Escaped output %>
<%- htmlContent // Unescaped output %>
<%# Comment %>
<%- include('partial') %>
```

### **Common Patterns**

```ejs
<% if (condition) { %>
  <!-- content -->
<% } else { %>
  <!-- other content -->
<% } %>

<% array.forEach(function(item) { %>
  <!-- item content -->
<% }); %>
```

### **Error Prevention Tips**

- Always check if variables exist before using them
- Use escaped output (`<%= %>`) for user input
- Handle array/object properties safely
- Test templates with various data scenarios
- Validate data in routes before passing to templates
