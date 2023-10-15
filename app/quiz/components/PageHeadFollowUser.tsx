"use client";

// components
import { Button } from "@/components/ui/button";
import PageHeading from "@/components/utility/text/PageHeading";
import { toast } from "react-toastify";
// types
import { User } from "@prisma/client";
// images
import Image from "next/image";
// icons
import { FaUserFriends } from "react-icons/fa";

type Props = {
  user: User;
  currentUser: User;
  isFollowing: Boolean;
};

const PageHeadFollowUser: React.FC<Props> = ({
  user,
  currentUser,
  isFollowing,
}) => {
  const submitFollow = () => {
    const userData = {
      userId: currentUser.id,
      followingId: user.id,
    };

    try {
      fetch("/api/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then(() => {
          toast.success("Following User");
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-10">
      <div className="flex grow w-full items-center gap-4">
        <Image
          src={user?.image!}
          height={60}
          width={60}
          className="rounded-full"
          alt="User Image"
        />
        <PageHeading heading={`${user?.name}`} createdBy={true} />
      </div>
      <div className="flex w-full basis-12/12  items-center justify-start lg:justify-end gap-2">
        {!isFollowing ? (
          <Button className="grow" onClick={submitFollow}>
            Follow User
          </Button>
        ) : (
          <Button className="grow w-fit flex items-center justify-center gap-4 cursor-default">
            <h2>Friends</h2>
            <FaUserFriends className="bg-primary text-5xl p-2" />
          </Button>
        )}
        <Button variant="outline" className="grow">
          View Profile
        </Button>
      </div>
    </div>
  );
};

export default PageHeadFollowUser;
