"use client";

import React from "react";
import { Spotlight } from "./components/ui/Spotlight";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Boxes } from "./components/ui/background-boxes";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AlertDestructive } from "./components/AlertDestructive";
import { Toaster, toast } from "sonner";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [url, setUrl] = React.useState<string>("");
  const router = useRouter();

  const isValidGitHubUrl = (url: string) => {
    const githubUrlPattern = /^https:\/\/github.com\/[A-Za-z0-9._%+-]+\/[A-Za-z0-9._%+-]+\/?$/;
    return githubUrlPattern.test(url);
  };

  const handleUrlChange = (e: { target: { value: string } }) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
  };

  const handleOnclick = async () => {
    if ((url && !isValidGitHubUrl(url)) || url === "") {
      toast.error("Event has not been created");
      return;
    } else {
      toast.success("creating documentation ");
    }
    setIsLoading(true);
    try {
      const result = await axios.post("/api/generate", { url });
      const data = result.data;

      if (result.status === 200) {
        router.push(`/docs/docs_${data?.userId}`);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error generating documentation:", error);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col md:items-center md:justify-center bg-slate-950 antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="top-40 left-0 md:left-60 md:-top-20 h-full"
        fill="white"
      />
      <Toaster richColors />
      <div className="flex-grow p-4 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0">
        <Boxes className="h-full" />
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-11">
              <div className="space-y-2 flex flex-col justify-center items-center m-5 gap-3 relative">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-cyan-50">
                  Created Documentation for your Repositories.
                </h1>
                <p className="max-w-[700px] text-slate-50 md:text-xl">
                  Generate accurate and complete documentation for your code
                  repositories in minutes. code repositories in minutes, making
                  it easier to access and understand your your projects!
                </p>
              </div>
              <div className="space-x-2 gap-2 relative flex justify-center">
                {isLoading ? (
                  <div className="loader">
                    <div className="loader-square"></div>
                    <div className="loader-square"></div>
                    <div className="loader-square"></div>
                    <div className="loader-square"></div>
                    <div className="loader-square"></div>
                    <div className="loader-square"></div>
                    <div className="loader-square"></div>
                  </div>
                ) : (
                  <>
                    <Input
                      onChange={handleUrlChange}
                      value={url}
                      className="max-w-lg flex-1 w-96"
                      placeholder="Ingresa la URL de tu GitHub"
                      type="text"
                    />
                    <Button
                      onClick={handleOnclick}
                      className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
                      type="submit"
                    >
                      Crear documentación
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full flex justify-center items-center  pt-16">
          <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-3 justify-center items-center">
            <div className="grid gap-4 justify-center items-center relative">
              <PuzzleIcon className="h-8 w-8 text-cyan-50 text-center" />
              <h3 className="text-lg font-bold text-slate-50">
                Explore Modules and Components
              </h3>
              <p className="text-slate-50">
                Discover a variety of modules and components available in our
                documentation. our documentation.
              </p>
            </div>
            <div className="grid gap-4 justify-center items-center relative">
              <CogIcon className="h-8 w-8 text-cyan-50" />
              <h3 className="text-lg font-bold text-slate-50">
                Customize Your Experience
              </h3>
              <p className="text-slate-50">
                Consult the documentation to learn how to configure and
                customize our platform according to your needs.
              </p>
            </div>
            <div className="grid gap-4 relative">
              <BookIcon className="h-8 w-8 text-cyan-50 text-center" />
              <h3 className="text-lg font-bold text-slate-50">
                Master With Our Guides
              </h3>
              <p className="text-slate-50">
                Access step-by-step guides and tutorials based on our
                documentation to master our documentation to master our
                platform.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function BookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function CogIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      color="white"
    >
      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" />
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M12 2v2" />
      <path d="M12 22v-2" />
      <path d="m17 20.66-1-1.73" />
      <path d="M11 10.27 7 3.34" />
      <path d="m20.66 17-1.73-1" />
      <path d="m3.34 7 1.73 1" />
      <path d="M14 12h8" />
      <path d="M2 12h2" />
      <path d="m20.66 7-1.73 1" />
      <path d="m3.34 17 1.73-1" />
      <path d="m17 3.34-1 1.73" />
      <path d="m11 13.73-4 6.93" />
    </svg>
  );
}

function PuzzleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925a2.501 2.501 0 1 0-3.214 3.214c.446.166.855.497.925.968a.979.979 0 0 1-.276.837l-1.61 1.61a2.404 2.404 0 0 1-1.705.707 2.402 2.402 0 0 1-1.704-.706l-1.568-1.568a1.026 1.026 0 0 0-.877-.29c-.493.074-.84.504-1.02.968a2.5 2.5 0 1 1-3.237-3.237c.464-.18.894-.527.967-1.02a1.026 1.026 0 0 0-.289-.877l-1.568-1.568A2.402 2.402 0 0 1 1.998 12c0-.617.236-1.234.706-1.704L4.23 8.77c.24-.24.581-.353.917-.303.515.077.877.528 1.073 1.01a2.5 2.5 0 1 0 3.259-3.259c-.482-.196-.933-.558-1.01-1.073-.05-.336.062-.676.303-.917l1.525-1.525A2.402 2.402 0 0 1 12 1.998c.617 0 1.234.236 1.704.706l1.568 1.568c.23.23.556.338.877.29.493-.074.84-.504 1.02-.968a2.5 2.5 0 1 1 3.237 3.237c-.464.18-.894.527-.967 1.02Z" />
    </svg>
  );
}
function isValidGitHubUrl(newUrl: any) {
  throw new Error("Function not implemented.");
}
