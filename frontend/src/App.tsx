import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Login } from "./pages/Login";

const queryClient = new QueryClient();

function App() {
//ezmire jo az app.tsx
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ModeToggle />
        <Login />
        <div>
          asdaskasdlkal
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
