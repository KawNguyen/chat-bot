import { Toaster } from "sonner";
import ChatBotContainer from "./components/chatbot/chatbot-container";
import { AdminDashboard } from "./components/admin/admin-dashboard";

const App = () => {
  return (
    <main className="container mx-auto p-4">
      <Toaster position="top-right" richColors />
      <AdminDashboard />
      <div className="absolute bottom-4 right-4">
        <ChatBotContainer />
      </div>
    </main>
  );
};

export default App;
