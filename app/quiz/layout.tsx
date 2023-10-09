import Container from "@/components/utility/Container";

export default async function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="h-fit min-w-screen flex flex-col pt-8 pb-[50px] bg-background duration-300">
      <Container>{children}</Container>
    </main>
  );
}
