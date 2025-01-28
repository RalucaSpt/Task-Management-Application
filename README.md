### Task Management Application - Documentation

#### Description
This task management application is designed to help users efficiently manage their daily tasks. The application is developed using Angular for the user interface, ASP.NET Core for the backend, and MongoDB as the database. Real-time notifications are implemented with SignalR, and the API is documented using Swagger UI.

#### Functional Specifications
1. **Task Management:**
   - Add new tasks.
   - View the task list.
   - Edit existing tasks.
   - Delete tasks.
2. **Categories and Statuses:**
   - Tasks can be organized by category and have a status (To Do, In Progress, Done).
3. **Real-Time Notifications:**
   - Users are instantly notified when a task is created or modified.
4. **Validation:**
   - Field validation when filling out forms.
5. **Navigation:**
   - Integrated routing system for seamless transitions between sections.
6. **API Documentation:**
   - Swagger UI provides detailed documentation for the API endpoints.

#### Technical Specifications
- **Frontend:**
  - Angular 16
  - Reactive forms for validation
  - Responsive design
- **Backend:**
  - ASP.NET Core 7
  - RESTful API design
  - SignalR for real-time communication
- **Database:**
  - MongoDB
  - Custom database schema for tasks
- **API Documentation:**
  - Swagger UI for detailed endpoint descriptions

#### System Architecture Diagram
![image](https://github.com/user-attachments/assets/b8f8f9c1-eb26-484b-b854-c92df001b6c2)


#### Installation Procedure (Backend)

1. **Prerequisites:**
   - Install .NET SDK 7.0 or later.
   - Set up MongoDB and ensure it is running locally or remotely.
   - Install Node.js and npm for managing frontend dependencies.

2. **Clone the Repository:**
   ```bash
   git clone https://github.com/RalucaSpt/Task-Management-Application.git
   cd Task-Management-Application/Backend
   ```

3. **Restore Dependencies:**
   ```bash
   dotnet restore
   ```

4. **Configure the Application:**
   - Open the `appsettings.json` file.
   - Set the MongoDB connection string under the `ConnectionStrings` section.

5. **Run the Application:**
   ```bash
   dotnet run
   ```

6. **Verify API Documentation:**
   - Open your browser and navigate to `http://localhost:5140/swagger` to access Swagger UI.

7. **Test API Endpoints:**
   - Use tools like Postman or Swagger UI to test the endpoints.

8. **Frontend Setup:**
   - Navigate to the frontend directory.
   - Install dependencies with `npm install`.
   - Run the frontend application using `npm start`.
  
   ![image](https://github.com/user-attachments/assets/b34dd368-fdb7-4f36-8518-168299673611)


The backend will handle API requests, and the frontend will consume the APIs to manage tasks efficiently. Real-time updates and notifications will be handled by SignalR.

