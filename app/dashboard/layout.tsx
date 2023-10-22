import Container from "@/app/components/utility/Container";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-[80vh] min-w-screen flex flex-col pt-8 pb-8 bg-background duration-300">
      <Container>{children}</Container>
    </main>
  );
}
