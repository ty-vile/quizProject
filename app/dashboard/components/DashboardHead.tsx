import getCurrentUser from "@/app/actions/getUser/getCurrentUser";
import { Button } from "@/app/components/ui/button";
import PageHeading from "@/app/components/utility/text/PageHeading";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const DashboardHead = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="w-full flex items-center justify-between gap-4 flex-wrap">
      <div className="flex basis-12/12 lg:basis-6/12 items-center gap-4">
        <Image
          src={currentUser?.image as string}
          alt="User Image"
          height={80}
          width={80}
          className="rounded-full"
        />
        <PageHeading heading={`Welcome ${currentUser?.name as string}`} />
      </div>
      <div className="flex w-full basis-12/12 lg:basis-6/12 xl:basis-3/12 items-center justify-start lg:justify-end gap-2">
        <Link href={"/quiz/create"} className="grow">
          <Button className="grow w-full">Create Quiz</Button>
        </Link>
        <Link href={"/profile"} className="grow">
          <Button variant="outline" className="grow w-full">
            My Profile
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHead;
