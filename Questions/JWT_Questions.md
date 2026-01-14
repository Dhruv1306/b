# JWT (JSON Web Tokens) - Practice Questions

**Date**: September 14, 2025  
**Topic**: Comprehensive Question Bank for JWT Mastery

---

## 📚 Table of Contents

1. [Progressive Learning Path](#progressive-learning-path)
2. [Easy Level Questions](#easy-level-questions)
3. [Medium Level Questions](#medium-level-questions)
4. [Hard Level Questions](#hard-level-questions)
5. [Platform Practice Links](#platform-practice-links)

---

## 📈 Progressive Learning Path

```
Week 1: Easy Questions (Q1-Q15) + JWT Basics & Structure
   ↓
Week 2: Medium Questions (Q16-Q30) + Authentication Systems
   ↓
Week 3: Hard Questions (Q31-Q45) + Security & Advanced Patterns
   ↓
Week 4: Production Implementation & Best Practices
```

---

## 🟢 Easy Level Questions

### **🌐 Platform Practice Links - Easy Level**

**📚 FreeCodeCamp:**

- [Information Security](https://www.freecodecamp.org/learn/information-security/information-security-with-helmetjs/) - Security basics
- [APIs and Microservices](https://www.freecodecamp.org/learn/apis-and-microservices/mongodb-and-mongoose/) - Authentication patterns

**💻 Exercism:**

- [JavaScript Track - Crypto Square](https://exercism.org/tracks/javascript/exercises/crypto-square) - Cryptography concepts
- [JavaScript Track - Secret Handshake](https://exercism.org/tracks/javascript/exercises/secret-handshake) - Token concepts

**🎯 Coderbyte:**

- [Security Challenges](https://coderbyte.com/challenges) - Authentication basics
- [Encryption Problems](https://coderbyte.com/challenges) - Token handling

**🏗️ Frontend Practice:**

- [Login Systems](https://www.frontendpractice.com/) - Authentication UI

### **JWT Structure & Basics**

**Q1.** Explain the structure of a JWT token. What are the three parts and what does each contain?

**Q2.** **[Very Common]** Create a simple JWT token manually and decode it to understand its structure.

**Q3.** Write a Node.js function that creates a basic JWT token with a user ID and email.

**Q4.** **[Popular]** Create a function that verifies and decodes a JWT token.

**Q5.** Demonstrate the difference between signed and unsigned tokens with examples.

### **Basic JWT Operations**

**Q6.** **[Common Interview]** Implement basic JWT creation using the jsonwebtoken library in Node.js.

**Q7.** Write a function that extracts the payload from a JWT token without verification.

**Q8.** Create a JWT token with custom claims (role, permissions, expires).

**Q9.** **[Practical]** Build a simple login system that returns a JWT token upon successful authentication.

**Q10.** Implement JWT token verification middleware for Express.js routes.

### **Token Lifecycle**

**Q11.** **[Important]** Create JWT tokens with different expiration times and demonstrate token expiry.

**Q12.** Implement a function that checks if a JWT token is expired.

**Q13.** Write code to refresh an expired JWT token.

**Q14.** **[Common]** Create a logout functionality that invalidates JWT tokens.

**Q15.** Build a system that tracks active JWT tokens.

---

## 🟡 Medium Level Questions

### **🌐 Platform Practice Links - Medium Level**

**🏆 HackerRank:**

- [Security Challenges](https://www.hackerrank.com/domains/security) - Advanced security concepts
- [Algorithms](https://www.hackerrank.com/domains/algorithms) - Cryptographic algorithms

**🔥 LeetCode:**

- [Design Authentication Manager](https://leetcode.com/problems/design-authentication-manager/) - Token management
- [Encode and Decode TinyURL](https://leetcode.com/problems/encode-and-decode-tinyurl/) - Token-based systems

**🎯 Frontend Mentor:**

- [Todo App](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW) - User authentication
- [Kanban Task Management](https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB) - Role-based access

**💪 Coderbyte:**

- [Authentication Systems](https://coderbyte.com/challenges) - Complete auth flows
- [Security Patterns](https://coderbyte.com/challenges) - Token security

### **Authentication Systems**

**Q16.** **[RESTful Auth]** Build a complete authentication system with register, login, and protected routes using JWT.

**Q17.** Implement role-based authentication where JWT contains user roles and permissions.

**Q18.** **[Token Refresh]** Create a robust token refresh mechanism with refresh tokens.

**Q19.** Build a multi-device login system that tracks JWT tokens across different devices.

**Q20.** **[Social Auth]** Implement social media authentication (Google, Facebook) that returns JWT tokens.

### **Advanced JWT Features**

**Q21.** **[Custom Claims]** Create JWT tokens with custom claims for different application features.

**Q22.** Implement JWT token encryption for sensitive data protection.

**Q23.** **[Asymmetric Keys]** Use RS256 algorithm with public/private key pairs for JWT signing.

**Q24.** Create JWT tokens with audience and issuer claims for multi-service authentication.

**Q25.** **[Token Blacklisting]** Implement a token blacklist system for revoked tokens.

### **Security & Validation**

**Q26.** **[Input Validation]** Implement comprehensive JWT payload validation and sanitization.

**Q27.** Create protection against JWT timing attacks and token replay attacks.

**Q28.** **[CSRF Protection]** Implement CSRF protection for JWT-based authentication.

**Q29.** Build rate limiting for JWT token generation to prevent abuse.

**Q30.** **[Security Headers]** Implement proper security headers for JWT token transmission.

---

## 🔴 Hard Level Questions

### **🌐 Platform Practice Links - Hard Level**

**🚀 CodeForces:**

- [Cryptography Problems](https://codeforces.com/problemset?tags=implementation) - Advanced cryptographic concepts
- [String Algorithms](https://codeforces.com/problemset?tags=strings) - Token processing algorithms

**🏅 TopCoder:**

- [Security Challenges](https://www.topcoder.com/challenges?tracks%5BDS%5D=true) - Enterprise security
- [Algorithm Optimization](https://www.topcoder.com/challenges?tracks%5BDS%5D=true) - Performance optimization

**🎯 AlgoMaster:**

- [System Design](https://algomaster.io/problems) - Authentication architecture
- [Security Design](https://algomaster.io/problems) - Secure token systems

**💻 HackerEarth:**

- [Distributed Systems](https://www.hackerearth.com/practice/algorithms/) - Multi-service authentication
- [Security](https://www.hackerearth.com/challenges/competitive/machine-learning/) - Advanced security patterns

### **Enterprise-Level Security**

**Q31.** **[Zero Trust]** Implement a zero-trust authentication system with JWT and continuous verification.

**Q32.** Create a distributed JWT validation system across multiple microservices.

**Q33.** **[Key Rotation]** Implement automatic JWT signing key rotation with graceful key transitions.

**Q34.** Build JWT-based single sign-on (SSO) system for multiple applications.

**Q35.** **[Breach Response]** Design and implement a security breach response system for compromised JWT keys.

### **Performance & Scalability**

**Q36.** **[High Performance]** Optimize JWT verification for high-traffic applications with caching strategies.

**Q37.** Implement distributed JWT token storage with Redis cluster for scalability.

**Q38.** **[Load Balancing]** Design JWT authentication that works seamlessly with load balancers.

**Q39.** Create JWT token compression techniques for reducing payload size.

**Q40.** **[Database Optimization]** Optimize database queries for JWT-based user lookup and authorization.

### **Advanced Integration Patterns**

**Q41.** **[Microservices]** Implement JWT-based authentication in a microservices architecture with service-to-service communication.

**Q42.** Create JWT integration with API gateways and rate limiting systems.

**Q43.** **[Mobile Apps]** Design JWT authentication flow for mobile applications with biometric authentication.

**Q44.** Build JWT-based authentication for IoT devices with limited computational resources.

**Q45.** **[Blockchain Integration]** Implement JWT authentication with blockchain-based identity verification.

---

## 🎯 JWT Security Best Practices

### **Token Security**

- Always use HTTPS for token transmission
- Set appropriate token expiration times
- Use strong, unique signing keys
- Implement proper key management

### **Payload Security**

- Never store sensitive data in JWT payload
- Validate all claims before processing
- Use the principle of least privilege
- Implement proper audience validation

### **Storage Security**

- Store tokens securely on client-side
- Implement proper token cleanup
- Use httpOnly cookies when possible
- Avoid localStorage for sensitive tokens

### **Error Handling**

- Don't expose internal errors in responses
- Implement proper logging for security events
- Use generic error messages for failed authentication
- Monitor for suspicious authentication patterns

---

## 📝 Real-World Projects

1. **Enterprise SSO System** - Single sign-on for multiple applications
2. **Multi-Tenant SaaS** - Tenant-aware authentication with JWT
3. **Mobile Banking App** - High-security authentication with biometrics
4. **IoT Device Management** - Lightweight authentication for devices
5. **Microservices Platform** - Distributed authentication architecture

---

## 🛠️ JWT Libraries & Tools

### **Node.js Libraries**

- **jsonwebtoken** - Standard JWT implementation
- **jose** - Comprehensive JOSE implementation
- **passport-jwt** - Passport strategy for JWT
- **express-jwt** - Express middleware for JWT

### **Security Tools**

- **JWT.io** - Online JWT debugger
- **Auth0** - Authentication as a service
- **KeyCloak** - Open source identity management
- **Firebase Auth** - Google's authentication service

### **Testing Tools**

- **Postman** - API testing with JWT
- **Insomnia** - REST client with JWT support
- **Artillery** - Load testing with authentication
- **OWASP ZAP** - Security testing

---

## 📚 JWT Claims Reference

### **Registered Claims**

- **iss** (issuer) - Who issued the token
- **sub** (subject) - Who the token is about
- **aud** (audience) - Who the token is intended for
- **exp** (expiration) - When the token expires
- **nbf** (not before) - When the token becomes valid
- **iat** (issued at) - When the token was issued
- **jti** (JWT ID) - Unique identifier for the token

### **Custom Claims**

- **role** - User role in the application
- **permissions** - Array of user permissions
- **tenant** - Multi-tenant identifier
- **device** - Device identifier for tracking

---

## 🔐 JWT vs Other Authentication Methods

### **JWT vs Sessions**

- **JWT**: Stateless, scalable, cross-domain
- **Sessions**: Server-side storage, immediate revocation

### **JWT vs OAuth**

- **JWT**: Token format and structure
- **OAuth**: Authorization framework (can use JWT)

### **JWT vs API Keys**

- **JWT**: Time-limited, contains claims
- **API Keys**: Long-lived, simple authentication

---

## ⚠️ Common JWT Security Vulnerabilities

### **Algorithm Confusion**

- Always specify and validate the algorithm
- Never use "none" algorithm in production
- Validate algorithm matches expected value

### **Token Leakage**

- Secure token storage and transmission
- Implement proper token cleanup
- Monitor for token exposure in logs

### **Weak Secrets**

- Use cryptographically strong keys
- Implement proper key rotation
- Never hardcode secrets in source code

### **Missing Validation**

- Always validate token signature
- Check expiration and not-before claims
- Validate audience and issuer claims

---

**💡 Pro Tip**: JWT is a powerful tool for authentication, but it's not a silver bullet. Always consider your specific security requirements and use JWT as part of a comprehensive security strategy!

**Happy Coding! 🚀**
