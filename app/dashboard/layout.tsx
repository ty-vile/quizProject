import Container from "@/components/utility/Container";
import { bungee } from "../layout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen min-w-screen pt-40 bg-background duration-300 ">
      <Container>{children}</Container>
    </main>
  );
}
