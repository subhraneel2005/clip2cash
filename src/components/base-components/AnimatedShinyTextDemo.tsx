import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import AnimatedShinyText from "@/components/ui/animated-shiny-text";
import Link from "next/link";

export function AnimatedShinyTextDemo() {
  return (

    <Link href="https://getstart.site/" target='_blank' className='lg:mt-[50px]'>
        <div className="z-10 flex min-h-12 items-center justify-center">
        <div
            className={cn(
            "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
            )}
        >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out">
            <span>✨ Made with Getstart</span>
            <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
        </div>
        </div>
    </Link>
  );
}
