import { Toaster } from "react-hot-toast";
import AppRouter from "./routes/AppRouter";
import { AuthInitializer } from "./features/auth/AuthInitializer";

function App() {
  return (
    <AuthInitializer>
      <AppRouter />
      <Toaster position="top-center" />
    </AuthInitializer>
  );
}

export default App;
