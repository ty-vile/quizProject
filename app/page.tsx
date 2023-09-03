// ui
import { Button } from "@/components/ui/button";
import Container from "@/components/utility/Container";
// font
import { bungee } from "./layout";
// actions
import getCurrentUser from "./actions/getCurrentUser";
// navigation
import { redirect } from "next/navigation";

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    return redirect("/dashboard");
  }

  return (
    <main className="min-h-screen min-w-screen flex items-center justify-center transition-all duration-300 ">
      <Container>
        <div className="flex flex-col gap-8">
          <h1
            className={`bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent text-6xl w-full ${bungee.className}`}
          >
            WELCOME TO QUIZIFY
          </h1>
          <h4 className={`text-3xl ${bungee.className}`}>
            Quizify is an app that allows you to create and share quizzes with
            your friends!
          </h4>
          <Button className="w-3/12">Test</Button>
        </div>
      </Container>
    </main>
  );
}
