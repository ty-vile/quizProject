"use client";

// shadcn
import { Button } from "../ui/button";
// sign in
import { toast } from "react-toastify";
// next-auth
import { signIn } from "next-auth/react";

type Props = {
  text: string;
};

const SignInButton: React.FC<Props> = ({ text }) => {
  const handleSignIn = () => {
    signIn("google");
  };

  return (
    <Button variant="outline" onClick={handleSignIn} className="w-40 p-0">
      {text}
    </Button>
  );
};

export default SignInButton;
