"use client";

// shadcn
import { Button } from "../ui/button";
// next-auth
import { signIn } from "next-auth/react";

type Props = {
  text: string;
};

const SignInButton: React.FC<Props> = ({ text }) => {
  return (
    <Button variant="outline" onClick={() => signIn("google")} className="w-40">
      {text}
    </Button>
  );
};

export default SignInButton;
