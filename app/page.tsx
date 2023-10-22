// ui
import { Button } from "@/components/ui/button";
import Container from "@/components/utility/Container";
// actions
import getCurrentUser from "./actions/getUser/getCurrentUser";
// navigation
import { redirect } from "next/navigation";
import Image from "next/image";
import PageHeading from "@/components/utility/text/PageHeading";
import Link from "next/link";
import HomepageCard from "@/components/ui/homepage-card";

export default async function Home() {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    return redirect("/dashboard");
  }

  return (
    <main className="min-h-screen h-fit min-w-screen  transition-all duration-300 pb-4 lg:pb-12 overflow-hidden">
      <Container>
        {/* section - banner*/}
        <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center gap-8 h-[100vh] lg:h-[95vh] mt-10 overflow-hidden">
          {/* banner container left */}
          <div className="flex flex-col justify-center gap-8 w-full lg:w-6/12 bg-background z-10">
            <PageHeading heading="Welcome To Quizify" />
            <h4 className={`text-xl md:text-2xl lg:text-3xl font-josefin`}>
              Quizify is an app that allows you to create and share quizzes with
              your friends!
            </h4>
            <Button
              variant="outline"
              className="w-full lg:w-6/12 xl:w-3/12 font-josefin z-10 bg-background"
            >
              GET STARTED
            </Button>
          </div>
          {/* banner container right */}
          <div className="flex flex-col items-center justify-center h-[400px] lg:h-[50vh] w-full lg:w-6/12 relative">
            <Image
              src="/quiz.svg"
              fill
              alt="Quiz Image"
              className="z-10 p-10 "
            />
            <Image
              src="/bannerBlob.svg"
              height={1500}
              width={1500}
              alt="Banner Blog"
              className="absolute -top-3/12 right-0 -z-1 lg:p-0"
            />
          </div>
        </div>
        {/* section - how to */}
        <div className="flex flex-col items-center w-full h-full mx-auto relative">
          <Image
            src="/howBlobThree.svg"
            height={1000}
            width={1000}
            alt="Banner Blog"
            className="absolute left-24 top-64 lg:-bottom-64 -z-1 lg:p-0"
            priority
          />
          <div className="mb-20">
            <PageHeading heading="How to use Quizify" />
          </div>
          <div className="flex w-full items-center justify-center">
            <HomepageCard
              step="1"
              title="Create Quiz"
              content=" Create your quiz - here you can choose how many questions a quiz
                has - select a name a name & category and then begin creating
                your quiz. Each quiz question can either have a single answer -
                or be multiple choice and have 4 answers. Once you have
                completed your creation, you confirm the quiz and then it get's
                saved to the database for other users to access."
            />
          </div>
          <div className="h-[50px] lg:h-[200px] w-2 bg-primary bg-black dark:bg-white z-10"></div>
          <HomepageCard
            step="2"
            title="Take Quiz"
            content="  You can take other users quizzes and test your knowledge against
              there created quizzes. Once you have taken the quiz and
              confirmed your answers. You submit the quiz and the data gets
              saved to the database. You can then see your score on the quiz
              and have the option to view the user's profile and follow them
              or take more of their quizzes."
          />

          <div className="h-[50px] lg:h-[200px] w-2 bg-primary bg-black dark:bg-white z-10"></div>
          <HomepageCard
            step="3"
            title="Your Quizzes"
            content="See quizzes you have made and view basic information about who
            has taken your quiz, there average scores and scores for each
            specific answer."
          />

          <div className="h-[50px] lg:h-[200px] w-2 bg-primary bg-black dark:bg-white z-10"></div>
          <HomepageCard
            step="4"
            title="User Profile"
            content=" You can see your profile or another users and get some basic
            information about their quiz results and how many quizzes they
            have created."
          />
        </div>
        {/* section - technology */}
        <div className="flex flex-col items-center w-full h-full mx-auto relative">
          <div className="mt-60 mb-20 text-center">
            <PageHeading heading="Technology Used" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 items-center justify-between">
            <div className="rounded-full border-2 border-gray-600 dark:border-gray-300 shadow-1 p-12 relative h-36 w-36 bg-white">
              <Image
                fill
                src="/nextLogo.svg"
                alt="NextJS logo"
                className="p-6"
              />
            </div>
            <div className="rounded-full border-2 border-gray-600 dark:border-gray-300 shadow-1 p-12 relative h-36 w-36 bg-white">
              <Image
                fill
                src="/tailwindLogo.svg"
                alt="Tailwind logo"
                className="p-6"
              />
            </div>
            <div className="rounded-full border-2 border-gray-600 dark:border-gray-300 shadow-1 p-12 relative h-36 w-36 bg-white">
              <Image
                fill
                src="/typescriptLogo.svg"
                alt="TypeScript logo"
                className="p-8"
              />
            </div>
            <div className="rounded-full border-2 border-gray-600 dark:border-gray-300 shadow-1 p-12 relative h-36 w-36 bg-white">
              <Image
                fill
                src="/prismaLogo.svg"
                alt="Prisma logo"
                className="p-4"
              />
            </div>
            <div className="rounded-full border-2 border-gray-600 dark:border-gray-300 shadow-1 p-12 relative h-36 w-36 bg-white">
              <Image
                fill
                src="/mySQLlogo.svg"
                alt="MySQL logo"
                className="p-8"
              />
            </div>
            <div className="rounded-full border-2 border-gray-600 dark:border-gray-300 shadow-1 p-12 relative h-36 w-36 bg-white">
              <Image
                fill
                src="/planetScale.svg"
                alt="PlanetScale logo"
                className="p-8"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 items-center justify-center w-full h-full bg-gradient-to-r from-primary to-secondary max-w-[1000px] mt-60 mx-auto p-20 rounded-lg text-center">
          <h2 className="font-bungee text-6xl text-white">CONTACT ME</h2>
          <Link href="mailto:ty.jvile@gmail.com">
            <h4 className="text-3xl font-josefin text-white">
              ty.jvile@gmail.com
            </h4>
          </Link>
        </div>
      </Container>
    </main>
  );
}
