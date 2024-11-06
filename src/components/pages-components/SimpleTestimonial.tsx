import { cn } from '@/lib/utils';
import React from 'react'
import Marquee from '../ui/marquee';

const reviews = [
    {
      name: "Emma",
      username: "@emma",
      body: "This app has completely transformed my blogging experience. The interface is so intuitive and easy to use. I'm hooked!",
      img: "https://avatar.vercel.sh/emma",
    },
    {
      name: "Liam",
      username: "@liam",
      body: "From drafting to publishing, every step feels effortless. My audience engagement has increased significantly since I started using this app.",
      img: "https://avatar.vercel.sh/liam",
    },
    {
      name: "Sophia",
      username: "@sophia",
      body: "I never knew blogging could be this enjoyable! The minimalist design really helps me focus on my writing.",
      img: "https://avatar.vercel.sh/sophia",
    },
    {
      name: "Mason",
      username: "@mason",
      body: "The dark mode is perfect for late-night writing sessions. This app has everything a modern blogger needs.",
      img: "https://avatar.vercel.sh/mason",
    },
    {
      name: "Olivia",
      username: "@olivia",
      body: "This app is hands down the best blogging platform I've tried. No ads, no distractions, just pure creativity!",
      img: "https://avatar.vercel.sh/olivia",
    },
    {
      name: "Noah",
      username: "@noah",
      body: "I love how customizable everything is! From fonts to themes, it feels like my personal writing space.",
      img: "https://avatar.vercel.sh/noah",
    },
  ];
  

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default function SimpleTestimonial() {
  return (
    <div className='bg-[url("/gb.png")] bg-center bg-cover relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg'>
        <h2 className="text-base">Testimonials</h2>
        <h1 className="mt-3 mb-4 text-3xl px-5 md:px-0 py-3 font-bold lg:text-6xl bg-gradient-to-b from-gray-900 via-black to-gray-600 bg-clip-text text-transparent text-center dark:from-white dark:via-gray-200 dark:to-gray-400">Showcase your reviews</h1>
        <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
            ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  )
}
