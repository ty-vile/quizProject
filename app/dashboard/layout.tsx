import Container from "@/components/utility/Container";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen min-w-screen flex flex-col pt-32 bg-background duration-300">
      <Container>{children}</Container>
    </main>
  );
}
