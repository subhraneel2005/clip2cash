// All these pages will show on the website
import Navbar from "@/components/base-components/Navbar";
import EmailPage from "@/components/pages-components/Email-Page";
import Particles from "@/components/ui/particles";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <Navbar/>
      <EmailPage/>
    </div>
  );
}