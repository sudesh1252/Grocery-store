# 🚀 SPRING BOOT SETUP GUIDE

## Complete Setup Instructions for Shree Grocery Store

---

## 📋 WHAT'S BEEN CREATED:

### Project Structure:
```
backend-springboot/
├── pom.xml                                    ✅ Maven configuration
├── README.md                                  ✅ Complete documentation
└── src/
    └── main/
        └── resources/
            ├── application.yml                ✅ Main config
            ├── application-dev.yml            ✅ Dev config
            └── application-prod.yml           ✅ Prod config
```

### Configuration Files:
1. **pom.xml** - Maven dependencies and build configuration
2. **application.yml** - Main application configuration
3. **application-dev.yml** - Development profile
4. **application-prod.yml** - Production profile
5. **README.md** - Complete documentation

---

## 🎯 NEXT STEPS TO COMPLETE:

### I need to create (in next response):

#### 1. Main Application Class:
- `ShreeGroceryApplication.java`

#### 2. Entity Classes (5 files):
- `User.java`
- `Invoice.java`
- `InvoiceItem.java`
- `Product.java`
- `StockMovement.java`

#### 3. Repository Interfaces (5 files):
- `UserRepository.java`
- `InvoiceRepository.java`
- `ProductRepository.java`
- `StockMovementRepository.java`

#### 4. DTO Classes (10+ files):
- Request DTOs
- Response DTOs

#### 5. Service Classes (4 files):
- `AuthService.java`
- `InvoiceService.java`
- `InventoryService.java`
- `ReportService.java`

#### 6. Controller Classes (4 files):
- `AuthController.java`
- `InvoiceController.java`
- `InventoryController.java`
- `ReportController.java`

#### 7. Security Classes (4 files):
- `SecurityConfig.java`
- `JwtTokenProvider.java`
- `JwtAuthenticationFilter.java`
- `UserDetailsServiceImpl.java`

#### 8. Exception Handling (3 files):
- `GlobalExceptionHandler.java`
- `ResourceNotFoundException.java`
- `CustomExceptions.java`

#### 9. Configuration Classes (3 files):
- `SwaggerConfig.java`
- `CorsConfig.java`
- `JwtConfig.java`

#### 10. Utility Classes (2 files):
- `ResponseUtil.java`
- `DateUtil.java`

**Total: ~45 Java files to create**

---

## 🛠️ INSTALLATION STEPS:

### STEP 1: Install Prerequisites

#### Install Java 17:
**Windows:**
1. Download from: https://adoptium.net/
2. Install and set JAVA_HOME
3. Verify: `java -version`

**Linux:**
```bash
sudo apt update
sudo apt install openjdk-17-jdk
java -version
```

#### Install Maven:
**Windows:**
1. Download from: https://maven.apache.org/download.cgi
2. Extract and add to PATH
3. Verify: `mvn -version`

**Linux:**
```bash
sudo apt install maven
mvn -version
```

#### Install MySQL:
Already installed ✅

---

### STEP 2: Setup Project

#### Option A - Using IDE (Recommended):

**IntelliJ IDEA:**
1. Open IntelliJ IDEA
2. File → Open → Select `backend-springboot` folder
3. Wait for Maven to download dependencies
4. Right-click `pom.xml` → Maven → Reload Project

**Eclipse:**
1. Open Eclipse
2. File → Import → Maven → Existing Maven Projects
3. Select `backend-springboot` folder
4. Finish

#### Option B - Command Line:
```bash
cd backend-springboot
mvn clean install
```

---

### STEP 3: Configure Database

#### Create Database:
```sql
CREATE DATABASE shree_grocery;
```

#### Update Configuration:
Edit `src/main/resources/application-dev.yml`:
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/shree_grocery
    username: root
    password: YOUR_MYSQL_PASSWORD  # Change this!
```

---

### STEP 4: Run Application

#### Using IDE:
1. Find `ShreeGroceryApplication.java`
2. Right-click → Run

#### Using Maven:
```bash
mvn spring-boot:run
```

#### Using JAR:
```bash
mvn clean package
java -jar target/shree-grocery-store-2.0.0.jar
```

---

### STEP 5: Verify Installation

#### Check Server:
```
http://localhost:8080
```

Should see: Welcome message

#### Check Swagger:
```
http://localhost:8080/swagger-ui.html
```

Should see: API documentation

#### Check Health:
```
http://localhost:8080/actuator/health
```

Should see: `{"status":"UP"}`

---

## 📊 COMPARISON: Node.js vs Spring Boot

### Current (Node.js):
```
Port: 5000
Start: npm run dev
Config: .env file
ORM: Sequelize
Auth: Custom JWT
Docs: Manual
Tests: Jest
```

### New (Spring Boot):
```
Port: 8080
Start: mvn spring-boot:run
Config: application.yml
ORM: Spring Data JPA
Auth: Spring Security + JWT
Docs: Swagger (Auto-generated)
Tests: JUnit 5
```

---

## 🔄 MIGRATION STRATEGY:

### Option 1: Parallel Run (Recommended)
- Keep Node.js backend running (port 5000)
- Run Spring Boot backend (port 8080)
- Test Spring Boot thoroughly
- Switch frontend to port 8080
- Retire Node.js backend

### Option 2: Direct Switch
- Stop Node.js backend
- Start Spring Boot backend
- Update frontend API URL to port 8080
- Test everything

### Option 3: Gradual Migration
- Run both backends
- Migrate endpoints one by one
- Use API gateway to route requests
- Complete migration over time

---

## 🎯 ADVANTAGES OF SPRING BOOT:

### 1. Type Safety:
```java
// Compile-time error detection
public Invoice createInvoice(InvoiceDTO dto) {
    // IDE autocomplete
    // Type checking
    // Refactoring support
}
```

### 2. Built-in Features:
- ✅ Security (Spring Security)
- ✅ Validation (Bean Validation)
- ✅ Transactions (Spring TX)
- ✅ Caching (Spring Cache)
- ✅ Scheduling (Spring Scheduler)
- ✅ Testing (Spring Test)

### 3. Enterprise Ready:
- ✅ Production-grade
- ✅ Scalable
- ✅ Maintainable
- ✅ Well-documented
- ✅ Large community

### 4. Performance:
- ✅ Multi-threading
- ✅ Connection pooling
- ✅ JVM optimizations
- ✅ Better for CPU-intensive tasks

### 5. Career Benefits:
- ✅ High demand
- ✅ Better salaries
- ✅ Enterprise jobs
- ✅ Fortune 500 companies

---

## 📚 LEARNING RESOURCES:

### Official Documentation:
- Spring Boot: https://spring.io/projects/spring-boot
- Spring Security: https://spring.io/projects/spring-security
- Spring Data JPA: https://spring.io/projects/spring-data-jpa

### Tutorials:
- Baeldung: https://www.baeldung.com/spring-boot
- Spring Guides: https://spring.io/guides
- YouTube: Spring Boot Tutorial

### Books:
- "Spring Boot in Action"
- "Pro Spring Boot 2"
- "Spring Microservices in Action"

---

## 🐛 TROUBLESHOOTING:

### Issue 1: Port Already in Use
```
Error: Port 8080 is already in use
```

**Solution:**
```yaml
# Change port in application.yml
server:
  port: 8081
```

### Issue 2: Database Connection Failed
```
Error: Cannot connect to MySQL
```

**Solution:**
1. Check MySQL is running
2. Verify credentials in application-dev.yml
3. Check database exists
4. Check firewall

### Issue 3: Maven Dependencies Not Downloading
```
Error: Could not resolve dependencies
```

**Solution:**
```bash
mvn clean install -U
# Or delete .m2/repository and retry
```

### Issue 4: Java Version Mismatch
```
Error: Unsupported class file major version
```

**Solution:**
- Install Java 17
- Set JAVA_HOME
- Verify: `java -version`

---

## ✅ CHECKLIST:

Before running:
- [ ] Java 17 installed
- [ ] Maven installed
- [ ] MySQL running
- [ ] Database created
- [ ] Configuration updated
- [ ] Dependencies downloaded

After running:
- [ ] Server starts without errors
- [ ] Port 8080 accessible
- [ ] Swagger UI loads
- [ ] Health check passes
- [ ] Can create user
- [ ] Can login
- [ ] Can access protected endpoints

---

## 🎉 SUCCESS INDICATORS:

### Console Output:
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.5)

2026-05-08 10:30:00 - Started ShreeGroceryApplication in 5.234 seconds
```

### Browser:
- http://localhost:8080 → Welcome message
- http://localhost:8080/swagger-ui.html → API docs
- http://localhost:8080/actuator/health → {"status":"UP"}

---

## 🚀 NEXT ACTIONS:

### Immediate:
1. **Create all Java files** (I'll do this next)
2. **Test compilation**
3. **Run application**
4. **Test APIs**

### Short-term:
1. **Update frontend** to use port 8080
2. **Test all features**
3. **Write tests**
4. **Deploy to production**

### Long-term:
1. **Add caching**
2. **Add monitoring**
3. **Add CI/CD**
4. **Scale horizontally**

---

## 💡 TIPS:

### Development:
- Use IntelliJ IDEA (best for Spring Boot)
- Enable auto-reload (Spring DevTools)
- Use Postman for API testing
- Check Swagger for API docs

### Production:
- Use environment variables
- Enable HTTPS
- Set up monitoring
- Configure logging
- Use connection pooling

### Performance:
- Enable caching
- Optimize queries
- Use pagination
- Enable compression
- Monitor metrics

---

## 📞 SUPPORT:

If you need help:
1. Check README.md
2. Check Swagger docs
3. Check Spring Boot docs
4. Ask me for help!

---

**Ready to create all the Java files?**

Say "yes" and I'll create:
- ✅ All entity classes
- ✅ All repository interfaces
- ✅ All service classes
- ✅ All controller classes
- ✅ All security classes
- ✅ All configuration classes
- ✅ All DTO classes
- ✅ Exception handling
- ✅ Utility classes

**Total: ~45 professional, production-ready Java files!**

---

**Made with ❤️ for Shree Grocery Store**
