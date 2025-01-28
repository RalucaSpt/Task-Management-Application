### Task Management Application Documentation

#### Descriere
Task Management Application este o aplicație dezvoltată pentru a gestiona sarcinile personale sau de echipă. Aplicația permite utilizatorilor să creeze, vizualizeze, editeze și șteargă sarcini, beneficiind de o interfață intuitivă și de notificări în timp real. Este construită utilizând Angular pentru front-end și ASP.NET Core pentru back-end, împreună cu o bază de date MongoDB pentru stocare.

#### Specificații Funcționale
- **Adăugare de sarcini:** Utilizatorii pot adăuga sarcini noi utilizând un formular simplu.
- **Vizualizare sarcini:** Sarcinile sunt afișate într-o listă sau grilă, cu opțiuni de filtrare și sortare pe categorii.
- **Editare sarcini:** Sarcinile pot fi modificate direct din interfață utilizând butonul de editare.
- **Ștergere sarcini:** Utilizatorii pot elimina sarcini folosind butonul de ștergere asociat fiecărei sarcini.
- **Validare form:** Validarea datelor este realizată pentru a asigura integritatea informațiilor introduse.
- **Notificări în timp real:** Orice modificare în lista de sarcini este transmisă utilizatorilor conectați prin SignalR.

#### Specificații Tehnice
- **Frontend:**
  - Angular standalone components.
  - Routing pentru navigare internă.
  - Formulare reactive pentru validarea datelor.
  - Integrare cu servicii pentru manipularea sarcinilor.
- **Backend:**
  - ASP.NET Core pentru implementarea API-urilor REST.
  - SignalR pentru comunicare bidirecțională în timp real.
- **Baza de date:**
  - MongoDB utilizată pentru stocarea persistentă a datelor.
  - Schema personalizată pentru entitatea "Task."
- **Comunicare:**
  - HTTP pentru operații CRUD.
  - WebSockets (prin SignalR) pentru notificări în timp real.
- **Biblioteci Adiționale:**
  - uuid pentru generarea ID-urilor unice.
  - RxJS pentru gestionarea fluxurilor de date și notificări.

#### Diagrama Arhitecturală a Sistemului

![image](https://github.com/user-attachments/assets/b8f8f9c1-eb26-484b-b854-c92df001b6c2)



#### Procedura de Instalare (pentru backend)
1. **Instalare Dependințe:**
   - Asigură-te că ai instalat:
     - .NET SDK (minim versiunea 6.0).
     - MongoDB Server.
     - Node.js (pentru gestionarea frontend-ului).

2. **Clonare Repozitoriu:**
   ```bash
   git clone https://github.com/RalucaSpt/Task-Management-Application
   cd Task-Management-Application/Backend
   ```

3. **Configurare MongoDB:**
   - Creează o bază de date numită `TaskManager`.
   - Configurația string-ului de conexiune poate fi actualizată în `appsettings.json`:
     ```json
     "ConnectionStrings": {
       "MongoDB": "mongodb://localhost:27017/TaskManager"
     }
     ```

4. **Restaurare Pachete:**
   ```bash
   dotnet restore
   ```

5. **Pornire Server:**
   ```bash
   dotnet run
   ```
   Backend-ul va fi disponibil la `https://localhost:5001`.

#### Instalare Frontend
1. **Navigare la Directorul Frontend:**
   ```bash
   cd Task-Management-Application/Frontend
   ```

2. **Instalare Dependințe:**
   ```bash
   npm install
   ```

3. **Pornire Server de Dezvoltare:**
   ```bash
   ng serve
   ```
   Aplicația va fi disponibilă la `http://localhost:4200`.

#### Diagrama Flux de Date

![image](https://github.com/user-attachments/assets/b34dd368-fdb7-4f36-8518-168299673611)



