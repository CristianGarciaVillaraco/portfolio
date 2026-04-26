import portfolioData from "@/data/portfolio.json";
import { PortfolioData } from "@/types/portfolio";
import Navbar from "@/components/Navbar";
import Landing from "@/components/Landing";
import StatsStrip from "@/components/StatsStrip";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import HowIWork from "@/components/HowIWork";
import Contact from "@/components/Contact";
import TerminalEgg from "@/components/TerminalEgg";

const data = portfolioData as PortfolioData;

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-14">
        <Landing data={data.personal} />
        <StatsStrip
          personal={data.personal}
          experience={data.experience}
          skills={data.skills}
        />
        <About />
        <div aria-hidden className="relative h-px">
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
        </div>
        <HowIWork />
        <Skills data={data.skills} />
        <Experience data={data.experience} />
        <div aria-hidden className="relative h-px">
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
        </div>
        <Education />
        <Projects data={data.projects} />
        <Contact data={data.personal} />
      </main>
      <footer className="bg-slate-900 text-center text-slate-500 text-sm py-6">
        © {new Date().getFullYear()} {data.personal.name}
      </footer>
      <TerminalEgg />
    </>
  );
}
